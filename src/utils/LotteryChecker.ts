/**
 * LotteryChecker - 当選番号のチェックと結果管理
 */

export interface PurchasedTicket {
  id: string;
  purchaseDate: string;
  lotteryType: 'loto6' | 'numbers3' | 'numbers4';
  numbers: number[] | string;
  drawType?: string;
  cost: number;
}

export interface DrawResult {
  drawNumber: number;
  drawDate: string;
  winningNumbers: number[] | string;
  bonusNumber?: number;
}

export interface CheckResult {
  ticketId: string;
  matched: boolean;
  matchCount?: number; // ロト6用
  prize: number;
  prizeRank?: string;
  details: string;
}

export class LotteryChecker {
  /**
   * ロト6の当選チェック
   */
  checkLoto6(
    ticket: number[],
    winningNumbers: number[],
    bonusNumber?: number
  ): CheckResult {
    const matchCount = ticket.filter((num) => winningNumbers.includes(num)).length;
    const hasBonus = bonusNumber ? ticket.includes(bonusNumber) : false;

    let prize = 0;
    let prizeRank = '';

    if (matchCount === 6) {
      prize = 200000000; // 2億円（概算）
      prizeRank = '1等';
    } else if (matchCount === 5 && hasBonus) {
      prize = 15000000; // 1500万円
      prizeRank = '2等';
    } else if (matchCount === 5) {
      prize = 500000; // 50万円
      prizeRank = '3等';
    } else if (matchCount === 4) {
      prize = 10000; // 1万円
      prizeRank = '4等';
    } else if (matchCount === 3) {
      prize = 1000; // 1000円
      prizeRank = '5等';
    }

    const details =
      prize > 0
        ? `🎉 ${prizeRank}当選！ ${matchCount}個一致${hasBonus ? ' + ボーナス' : ''} - ${prize.toLocaleString()}円`
        : `❌ 残念！ ${matchCount}個一致`;

    return {
      ticketId: '',
      matched: prize > 0,
      matchCount,
      prize,
      prizeRank,
      details,
    };
  }

  /**
   * ナンバーズ3の当選チェック
   */
  checkNumbers3(
    ticket: string,
    winningNumber: string,
    drawType: 'straight' | 'box' | 'mini'
  ): CheckResult {
    let prize = 0;
    let matched = false;
    let details = '';

    switch (drawType) {
      case 'straight':
        if (ticket === winningNumber) {
          prize = 90000;
          matched = true;
          details = '🎉 ストレート当選！ 90,000円';
        } else {
          details = '❌ ストレート外れ';
        }
        break;

      case 'box':
        const ticketDigits = ticket.split('').sort().join('');
        const winningDigits = winningNumber.split('').sort().join('');
        if (ticketDigits === winningDigits) {
          // 数字の組み合わせによって賞金が変わる（簡略版）
          prize = 15000;
          matched = true;
          details = '🎉 ボックス当選！ 15,000円';
        } else {
          details = '❌ ボックス外れ';
        }
        break;

      case 'mini':
        if (ticket.slice(-2) === winningNumber.slice(-2)) {
          prize = 9000;
          matched = true;
          details = '🎉 ミニ当選！ 9,000円';
        } else {
          details = '❌ ミニ外れ';
        }
        break;
    }

    return {
      ticketId: '',
      matched,
      prize,
      prizeRank: matched ? drawType : '',
      details,
    };
  }

  /**
   * ナンバーズ4の当選チェック
   */
  checkNumbers4(
    ticket: string,
    winningNumber: string,
    drawType: 'straight' | 'box'
  ): CheckResult {
    let prize = 0;
    let matched = false;
    let details = '';

    switch (drawType) {
      case 'straight':
        if (ticket === winningNumber) {
          prize = 900000;
          matched = true;
          details = '🎉 ストレート当選！ 900,000円';
        } else {
          details = '❌ ストレート外れ';
        }
        break;

      case 'box':
        const ticketDigits = ticket.split('').sort().join('');
        const winningDigits = winningNumber.split('').sort().join('');
        if (ticketDigits === winningDigits) {
          prize = 37500; // 簡略版
          matched = true;
          details = '🎉 ボックス当選！ 37,500円';
        } else {
          details = '❌ ボックス外れ';
        }
        break;
    }

    return {
      ticketId: '',
      matched,
      prize,
      prizeRank: matched ? drawType : '',
      details,
    };
  }

  /**
   * 複数チケットを一括チェック
   */
  checkMultipleTickets(
    tickets: PurchasedTicket[],
    drawResult: DrawResult
  ): Array<CheckResult & { ticket: PurchasedTicket }> {
    return tickets.map((ticket) => {
      let result: CheckResult;

      if (ticket.lotteryType === 'loto6' && Array.isArray(ticket.numbers)) {
        result = this.checkLoto6(
          ticket.numbers,
          drawResult.winningNumbers as number[],
          drawResult.bonusNumber
        );
      } else if (ticket.lotteryType === 'numbers3' && typeof ticket.numbers === 'string') {
        result = this.checkNumbers3(
          ticket.numbers,
          drawResult.winningNumbers as string,
          ticket.drawType as 'straight' | 'box' | 'mini'
        );
      } else if (ticket.lotteryType === 'numbers4' && typeof ticket.numbers === 'string') {
        result = this.checkNumbers4(
          ticket.numbers,
          drawResult.winningNumbers as string,
          ticket.drawType as 'straight' | 'box'
        );
      } else {
        result = {
          ticketId: ticket.id,
          matched: false,
          prize: 0,
          details: 'エラー: 無効なチケット形式',
        };
      }

      return {
        ...result,
        ticketId: ticket.id,
        ticket,
      };
    });
  }

  /**
   * 当選結果のサマリーを生成
   */
  generateSummary(results: Array<CheckResult & { ticket: PurchasedTicket }>): {
    totalTickets: number;
    winningTickets: number;
    totalCost: number;
    totalPrize: number;
    netResult: number;
    roi: number;
    breakdown: Map<string, number>;
  } {
    const totalTickets = results.length;
    const winningTickets = results.filter((r) => r.matched).length;
    const totalCost = results.reduce((sum, r) => sum + r.ticket.cost, 0);
    const totalPrize = results.reduce((sum, r) => sum + r.prize, 0);
    const netResult = totalPrize - totalCost;
    const roi = totalCost > 0 ? (netResult / totalCost) * 100 : 0;

    // 等級別の当選数
    const breakdown = new Map<string, number>();
    results.forEach((r) => {
      if (r.matched && r.prizeRank) {
        breakdown.set(r.prizeRank, (breakdown.get(r.prizeRank) || 0) + 1);
      }
    });

    return {
      totalTickets,
      winningTickets,
      totalCost,
      totalPrize,
      netResult,
      roi,
      breakdown,
    };
  }
}
