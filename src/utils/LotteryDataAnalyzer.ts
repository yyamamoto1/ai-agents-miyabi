/**
 * LotteryDataAnalyzer - 宝くじの過去データを分析するユーティリティ
 */

export interface DrawHistory {
  drawNumber: number;
  drawDate: string;
  numbers: number[];
  bonusNumber?: number; // ロト6のボーナス数字
}

export interface FrequencyAnalysis {
  number: number;
  frequency: number;
  percentage: number;
  lastDrawn: number; // 何回前に出たか
}

export interface PatternAnalysis {
  consecutivePairs: Array<{ pair: [number, number]; frequency: number }>;
  oddEvenRatio: { odd: number; even: number };
  lowHighRatio: { low: number; high: number }; // 低い数字/高い数字
  sumAverage: number;
  sumStdDev: number;
}

export interface PredictionStrength {
  hot: number[]; // 過去10回で頻出
  warm: number[]; // 過去20回で頻出
  cold: number[]; // 長期間出ていない
  overdue: number[]; // 平均以上に出ていない
}

export class LotteryDataAnalyzer {
  private history: DrawHistory[];

  constructor(history: DrawHistory[]) {
    this.history = history.sort((a, b) => b.drawNumber - a.drawNumber); // 新しい順
  }

  /**
   * 各数字の出現頻度を分析
   */
  analyzeFrequency(maxNumber: number = 43): FrequencyAnalysis[] {
    const frequencyMap = new Map<number, number>();
    const lastDrawnMap = new Map<number, number>();

    // 初期化
    for (let i = 1; i <= maxNumber; i++) {
      frequencyMap.set(i, 0);
      lastDrawnMap.set(i, this.history.length); // 全く出ていない場合
    }

    // カウント
    this.history.forEach((draw, drawIndex) => {
      draw.numbers.forEach((num) => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);

        // 最後に出た回を記録（まだ記録されていない場合のみ）
        if (lastDrawnMap.get(num) === this.history.length) {
          lastDrawnMap.set(num, drawIndex);
        }
      });
    });

    // 結果を配列に変換
    const totalDraws = this.history.length;
    const results: FrequencyAnalysis[] = [];

    for (let i = 1; i <= maxNumber; i++) {
      const frequency = frequencyMap.get(i) || 0;
      results.push({
        number: i,
        frequency,
        percentage: totalDraws > 0 ? (frequency / totalDraws) * 100 : 0,
        lastDrawn: lastDrawnMap.get(i) || this.history.length,
      });
    }

    return results.sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * パターン分析
   */
  analyzePatterns(): PatternAnalysis {
    const consecutivePairsMap = new Map<string, number>();
    let totalOdd = 0;
    let totalEven = 0;
    let totalLow = 0;
    let totalHigh = 0;
    const sums: number[] = [];

    this.history.forEach((draw) => {
      const sorted = [...draw.numbers].sort((a, b) => a - b);

      // 連続する数字のペアを検出
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] - sorted[i] === 1) {
          const pairKey = `${sorted[i]}-${sorted[i + 1]}`;
          consecutivePairsMap.set(pairKey, (consecutivePairsMap.get(pairKey) || 0) + 1);
        }
      }

      // 奇数・偶数のカウント
      draw.numbers.forEach((num) => {
        if (num % 2 === 0) {
          totalEven++;
        } else {
          totalOdd++;
        }

        // 低い数字（1-21）と高い数字（22-43）
        if (num <= 21) {
          totalLow++;
        } else {
          totalHigh++;
        }
      });

      // 合計値
      const sum = draw.numbers.reduce((acc, num) => acc + num, 0);
      sums.push(sum);
    });

    // 連続ペアを配列に変換
    const consecutivePairs = Array.from(consecutivePairsMap.entries())
      .map(([pairStr, frequency]) => {
        const [n1, n2] = pairStr.split('-').map(Number);
        return { pair: [n1, n2] as [number, number], frequency };
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10); // トップ10

    // 合計値の平均と標準偏差
    const sumAverage = sums.reduce((a, b) => a + b, 0) / sums.length;
    const variance =
      sums.reduce((acc, sum) => acc + Math.pow(sum - sumAverage, 2), 0) / sums.length;
    const sumStdDev = Math.sqrt(variance);

    return {
      consecutivePairs,
      oddEvenRatio: { odd: totalOdd, even: totalEven },
      lowHighRatio: { low: totalLow, high: totalHigh },
      sumAverage: Math.round(sumAverage),
      sumStdDev: Math.round(sumStdDev),
    };
  }

  /**
   * 予測強度の分析
   */
  analyzePredictionStrength(maxNumber: number = 43): PredictionStrength {
    const recentDraws = this.history.slice(0, 10);
    const mediumTermDraws = this.history.slice(0, 20);

    // 短期（10回）の頻出数字
    const recentFreq = this.getFrequencyFromDraws(recentDraws, maxNumber);
    const hot = recentFreq.slice(0, 7).map((f) => f.number);

    // 中期（20回）の頻出数字
    const mediumFreq = this.getFrequencyFromDraws(mediumTermDraws, maxNumber);
    const warm = mediumFreq.slice(0, 10).map((f) => f.number);

    // 長期間出ていない数字（COLD）
    const allFreq = this.analyzeFrequency(maxNumber);
    const cold = allFreq.filter((f) => f.lastDrawn > 15).slice(0, 7).map((f) => f.number);

    // 平均以上に出ていない数字（Overdue）
    const avgFrequency = allFreq.reduce((sum, f) => sum + f.frequency, 0) / allFreq.length;
    const overdue = allFreq
      .filter((f) => f.frequency < avgFrequency * 0.8)
      .slice(0, 10)
      .map((f) => f.number);

    return { hot, warm, cold, overdue };
  }

  /**
   * 特定の抽選回からの頻度を取得
   */
  private getFrequencyFromDraws(draws: DrawHistory[], maxNumber: number): FrequencyAnalysis[] {
    const frequencyMap = new Map<number, number>();

    for (let i = 1; i <= maxNumber; i++) {
      frequencyMap.set(i, 0);
    }

    draws.forEach((draw) => {
      draw.numbers.forEach((num) => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
      });
    });

    const results: FrequencyAnalysis[] = [];
    for (let i = 1; i <= maxNumber; i++) {
      results.push({
        number: i,
        frequency: frequencyMap.get(i) || 0,
        percentage: draws.length > 0 ? ((frequencyMap.get(i) || 0) / draws.length) * 100 : 0,
        lastDrawn: 0,
      });
    }

    return results.sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * 数字の出現間隔を分析
   */
  analyzeDrawInterval(targetNumber: number): {
    intervals: number[];
    average: number;
    min: number;
    max: number;
    prediction: string;
  } {
    const intervals: number[] = [];
    let lastIndex = -1;

    this.history.forEach((draw, index) => {
      if (draw.numbers.includes(targetNumber)) {
        if (lastIndex !== -1) {
          intervals.push(index - lastIndex);
        }
        lastIndex = index;
      }
    });

    if (intervals.length === 0) {
      return {
        intervals: [],
        average: 0,
        min: 0,
        max: 0,
        prediction: '十分なデータがありません',
      };
    }

    const average = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const min = Math.min(...intervals);
    const max = Math.max(...intervals);

    // 最後に出た回からの経過
    const sinceLastDrawn = lastIndex >= 0 ? lastIndex : this.history.length;

    let prediction = '';
    if (sinceLastDrawn < average * 0.5) {
      prediction = '最近出たばかりなので、しばらく出ない可能性が高い';
    } else if (sinceLastDrawn > average * 1.5) {
      prediction = '平均より長く出ていないので、そろそろ出る可能性がある';
    } else {
      prediction = '平均的な出現ペース';
    }

    return {
      intervals,
      average: Math.round(average * 10) / 10,
      min,
      max,
      prediction,
    };
  }

  /**
   * 数字の組み合わせ（ペア）の出現頻度
   */
  analyzePairFrequency(): Array<{ pair: [number, number]; frequency: number }> {
    const pairMap = new Map<string, number>();

    this.history.forEach((draw) => {
      const sorted = [...draw.numbers].sort((a, b) => a - b);

      // 全てのペアを生成
      for (let i = 0; i < sorted.length - 1; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const pairKey = `${sorted[i]}-${sorted[j]}`;
          pairMap.set(pairKey, (pairMap.get(pairKey) || 0) + 1);
        }
      }
    });

    return Array.from(pairMap.entries())
      .map(([pairStr, frequency]) => {
        const [n1, n2] = pairStr.split('-').map(Number);
        return { pair: [n1, n2] as [number, number], frequency };
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20); // トップ20
  }

  /**
   * 統計レポートを生成
   */
  generateReport(maxNumber: number = 43): string {
    const frequency = this.analyzeFrequency(maxNumber);
    const patterns = this.analyzePatterns();
    const strength = this.analyzePredictionStrength(maxNumber);

    let report = '=== 統計分析レポート ===\n\n';

    report += `📊 分析対象: 過去${this.history.length}回の抽選\n\n`;

    // 頻度トップ10
    report += '🔥 出現頻度トップ10:\n';
    frequency.slice(0, 10).forEach((f, i) => {
      report += `  ${i + 1}位: ${f.number}番 (${f.frequency}回, ${f.percentage.toFixed(1)}%)\n`;
    });

    // 長期間出ていない数字
    report += '\n❄️  長期間出ていない数字（15回以上）:\n';
    frequency
      .filter((f) => f.lastDrawn >= 15)
      .slice(0, 10)
      .forEach((f) => {
        report += `  ${f.number}番 (${f.lastDrawn}回前に出現)\n`;
      });

    // パターン分析
    report += `\n📈 パターン分析:\n`;
    report += `  奇数/偶数比: ${patterns.oddEvenRatio.odd}:${patterns.oddEvenRatio.even}\n`;
    report += `  低い数字/高い数字比: ${patterns.lowHighRatio.low}:${patterns.lowHighRatio.high}\n`;
    report += `  合計値の平均: ${patterns.sumAverage} ± ${patterns.sumStdDev}\n`;

    // 連続番号
    if (patterns.consecutivePairs.length > 0) {
      report += `\n🔗 よく出る連続番号:\n`;
      patterns.consecutivePairs.slice(0, 5).forEach((cp) => {
        report += `  ${cp.pair[0]}-${cp.pair[1]} (${cp.frequency}回)\n`;
      });
    }

    // 予測強度
    report += `\n🎯 予測数字:\n`;
    report += `  HOT (過去10回で頻出): ${strength.hot.join(', ')}\n`;
    report += `  WARM (過去20回で頻出): ${strength.warm.join(', ')}\n`;
    report += `  COLD (長期未出現): ${strength.cold.join(', ')}\n`;
    report += `  OVERDUE (平均以下): ${strength.overdue.slice(0, 7).join(', ')}\n`;

    return report;
  }

  /**
   * データをCSVとしてエクスポート
   */
  exportToCSV(): string {
    let csv = '抽選回,日付,数字1,数字2,数字3,数字4,数字5,数字6,ボーナス\n';

    this.history.forEach((draw) => {
      const numbers = draw.numbers.join(',');
      const bonus = draw.bonusNumber || '';
      csv += `${draw.drawNumber},${draw.drawDate},${numbers},${bonus}\n`;
    });

    return csv;
  }
}
