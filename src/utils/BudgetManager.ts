/**
 * BudgetManager - 購入予算管理システム
 */

export interface BudgetConfig {
  monthlyBudget: number;
  weeklyLimit?: number;
  dailyLimit?: number;
  alertThreshold?: number; // 予算の何%で警告するか
}

export interface Purchase {
  id: string;
  date: string;
  lotteryType: string;
  amount: number;
  ticketCount: number;
  numbers: any;
}

export interface BudgetStatus {
  period: 'daily' | 'weekly' | 'monthly';
  budget: number;
  spent: number;
  remaining: number;
  usagePercentage: number;
  isOverBudget: boolean;
  alert: boolean;
}

export class BudgetManager {
  private config: BudgetConfig;
  private purchases: Purchase[] = [];

  constructor(config: BudgetConfig) {
    this.config = {
      ...config,
      alertThreshold: config.alertThreshold || 80, // デフォルト80%
    };
  }

  /**
   * 購入を記録
   */
  recordPurchase(purchase: Omit<Purchase, 'id'>): Purchase {
    const newPurchase: Purchase = {
      id: `purchase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...purchase,
    };

    this.purchases.push(newPurchase);
    return newPurchase;
  }

  /**
   * 期間別の支出を計算
   */
  private getSpentInPeriod(startDate: Date, endDate: Date): number {
    return this.purchases
      .filter((p) => {
        const purchaseDate = new Date(p.date);
        return purchaseDate >= startDate && purchaseDate <= endDate;
      })
      .reduce((sum, p) => sum + p.amount, 0);
  }

  /**
   * 今日の支出を取得
   */
  getDailySpent(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.getSpentInPeriod(today, tomorrow);
  }

  /**
   * 今週の支出を取得
   */
  getWeeklySpent(): number {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

    return this.getSpentInPeriod(firstDayOfWeek, lastDayOfWeek);
  }

  /**
   * 今月の支出を取得
   */
  getMonthlySpent(): number {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return this.getSpentInPeriod(firstDayOfMonth, lastDayOfMonth);
  }

  /**
   * 日次予算の状況
   */
  getDailyStatus(): BudgetStatus {
    const budget = this.config.dailyLimit || this.config.monthlyBudget / 30;
    const spent = this.getDailySpent();
    const remaining = budget - spent;
    const usagePercentage = (spent / budget) * 100;

    return {
      period: 'daily',
      budget,
      spent,
      remaining,
      usagePercentage,
      isOverBudget: spent > budget,
      alert: usagePercentage >= this.config.alertThreshold!,
    };
  }

  /**
   * 週次予算の状況
   */
  getWeeklyStatus(): BudgetStatus {
    const budget = this.config.weeklyLimit || this.config.monthlyBudget / 4;
    const spent = this.getWeeklySpent();
    const remaining = budget - spent;
    const usagePercentage = (spent / budget) * 100;

    return {
      period: 'weekly',
      budget,
      spent,
      remaining,
      usagePercentage,
      isOverBudget: spent > budget,
      alert: usagePercentage >= this.config.alertThreshold!,
    };
  }

  /**
   * 月次予算の状況
   */
  getMonthlyStatus(): BudgetStatus {
    const budget = this.config.monthlyBudget;
    const spent = this.getMonthlySpent();
    const remaining = budget - spent;
    const usagePercentage = (spent / budget) * 100;

    return {
      period: 'monthly',
      budget,
      spent,
      remaining,
      usagePercentage,
      isOverBudget: spent > budget,
      alert: usagePercentage >= this.config.alertThreshold!,
    };
  }

  /**
   * 購入可能かチェック
   */
  canPurchase(amount: number): {
    allowed: boolean;
    reason?: string;
    suggestion?: string;
  } {
    const daily = this.getDailyStatus();
    const weekly = this.getWeeklyStatus();
    const monthly = this.getMonthlyStatus();

    // 月次予算チェック
    if (monthly.spent + amount > monthly.budget) {
      return {
        allowed: false,
        reason: '月次予算を超過します',
        suggestion: `今月の残り予算: ${monthly.remaining}円`,
      };
    }

    // 週次予算チェック
    if (this.config.weeklyLimit && weekly.spent + amount > weekly.budget) {
      return {
        allowed: false,
        reason: '週次予算を超過します',
        suggestion: `今週の残り予算: ${weekly.remaining}円`,
      };
    }

    // 日次予算チェック
    if (this.config.dailyLimit && daily.spent + amount > daily.budget) {
      return {
        allowed: false,
        reason: '日次予算を超過します',
        suggestion: `今日の残り予算: ${daily.remaining}円`,
      };
    }

    // 警告レベルチェック
    if ((monthly.spent + amount) / monthly.budget * 100 >= this.config.alertThreshold!) {
      return {
        allowed: true,
        reason: '予算の警告レベルに達しています',
        suggestion: '計画的な購入を心がけましょう',
      };
    }

    return { allowed: true };
  }

  /**
   * 購入履歴を取得
   */
  getPurchaseHistory(limit?: number): Purchase[] {
    const sorted = [...this.purchases].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return limit ? sorted.slice(0, limit) : sorted;
  }

  /**
   * 統計情報を取得
   */
  getStatistics(): {
    totalPurchases: number;
    totalSpent: number;
    averagePurchase: number;
    mostFrequentType: string;
    purchasesByType: Map<string, number>;
  } {
    const totalPurchases = this.purchases.length;
    const totalSpent = this.purchases.reduce((sum, p) => sum + p.amount, 0);
    const averagePurchase = totalPurchases > 0 ? totalSpent / totalPurchases : 0;

    const purchasesByType = new Map<string, number>();
    this.purchases.forEach((p) => {
      purchasesByType.set(p.lotteryType, (purchasesByType.get(p.lotteryType) || 0) + p.amount);
    });

    const mostFrequentType =
      Array.from(purchasesByType.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || 'なし';

    return {
      totalPurchases,
      totalSpent,
      averagePurchase,
      mostFrequentType,
      purchasesByType,
    };
  }

  /**
   * 実績に基づく期待値を計算
   */
  calculateRealExpectedValue(winnings: number[]): {
    totalInvestment: number;
    totalWinnings: number;
    netResult: number;
    roi: number;
    expectedValuePerTicket: number;
    breakEvenTickets: number;
  } {
    const totalInvestment = this.purchases.reduce((sum, p) => sum + p.amount, 0);
    const totalWinnings = winnings.reduce((sum, w) => sum + w, 0);
    const netResult = totalWinnings - totalInvestment;
    const roi = totalInvestment > 0 ? (netResult / totalInvestment) * 100 : 0;

    const totalTickets = this.purchases.reduce((sum, p) => sum + p.ticketCount, 0);
    const expectedValuePerTicket = totalTickets > 0 ? netResult / totalTickets : 0;

    // 損益分岐点（何枚買えば±0になるか）
    const avgTicketCost = totalTickets > 0 ? totalInvestment / totalTickets : 200;
    const breakEvenTickets =
      expectedValuePerTicket < 0
        ? Math.ceil(Math.abs(netResult) / Math.abs(expectedValuePerTicket))
        : 0;

    return {
      totalInvestment,
      totalWinnings,
      netResult,
      roi,
      expectedValuePerTicket,
      breakEvenTickets,
    };
  }

  /**
   * レポートを生成
   */
  generateReport(): string {
    const daily = this.getDailyStatus();
    const weekly = this.getWeeklyStatus();
    const monthly = this.getMonthlyStatus();
    const stats = this.getStatistics();

    let report = '=== 購入予算管理レポート ===\n\n';

    report += '📊 期間別予算状況:\n';
    report += `  今日: ${daily.spent.toLocaleString()}円 / ${daily.budget.toLocaleString()}円 (${daily.usagePercentage.toFixed(1)}%)${daily.isOverBudget ? ' ⚠️ 超過' : ''}\n`;
    report += `  今週: ${weekly.spent.toLocaleString()}円 / ${weekly.budget.toLocaleString()}円 (${weekly.usagePercentage.toFixed(1)}%)${weekly.isOverBudget ? ' ⚠️ 超過' : ''}\n`;
    report += `  今月: ${monthly.spent.toLocaleString()}円 / ${monthly.budget.toLocaleString()}円 (${monthly.usagePercentage.toFixed(1)}%)${monthly.isOverBudget ? ' ⚠️ 超過' : ''}\n`;

    report += '\n📈 統計情報:\n';
    report += `  総購入回数: ${stats.totalPurchases}回\n`;
    report += `  総支出: ${stats.totalSpent.toLocaleString()}円\n`;
    report += `  平均購入額: ${Math.round(stats.averagePurchase).toLocaleString()}円\n`;
    report += `  最も購入している種類: ${stats.mostFrequentType}\n`;

    report += '\n💰 種類別支出:\n';
    Array.from(stats.purchasesByType.entries()).forEach(([type, amount]) => {
      report += `  ${type}: ${amount.toLocaleString()}円\n`;
    });

    return report;
  }
}
