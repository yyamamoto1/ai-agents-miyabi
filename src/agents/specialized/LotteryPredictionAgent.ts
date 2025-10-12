/**
 * LotteryPredictionAgent - 宝くじ予測・期待値計算の専門エージェント
 * ロト6、ナンバーズ3、ナンバーズ4の予測と期待値計算を行う
 */

import { BaseAgent, AgentTask, AgentConfig } from '../../core/BaseAgent.js';

export type LotteryType = 'loto6' | 'numbers3' | 'numbers4';
export type PredictionMethod = 'random' | 'frequency' | 'hot-cold' | 'statistical';
export type Numbers3DrawType = 'straight' | 'box' | 'set-straight' | 'set-box' | 'mini';
export type Numbers4DrawType = 'straight' | 'box' | 'set';

export interface LotteryPredictionInput {
  lotteryType: LotteryType;
  predictionMethod?: PredictionMethod;
  count?: number; // 予測する組み合わせの数
  historicalData?: number[][]; // 過去の当選番号データ
  numbers3DrawType?: Numbers3DrawType;
  numbers4DrawType?: Numbers4DrawType;
}

export interface Loto6Result {
  predictions: number[][];
  statistics: {
    totalCombinations: number;
    probability: number;
    expectedValue: number;
  };
  analysis: {
    hotNumbers: number[]; // よく出る数字
    coldNumbers: number[]; // 出にくい数字
    consecutiveNumbers: number; // 連番の数
  };
}

export interface Numbers3Result {
  predictions: string[];
  drawType: Numbers3DrawType;
  statistics: {
    totalCombinations: number;
    probability: number;
    expectedValue: number;
    prize: {
      straight?: number;
      box?: number;
      mini?: number;
    };
  };
}

export interface Numbers4Result {
  predictions: string[];
  drawType: Numbers4DrawType;
  statistics: {
    totalCombinations: number;
    probability: number;
    expectedValue: number;
    prize: {
      straight?: number;
      box?: number;
    };
  };
}

export class LotteryPredictionAgent extends BaseAgent {
  constructor() {
    const config: AgentConfig = {
      name: 'Lottery Prediction Agent',
      role: '宝くじ予測・期待値計算の専門家',
      category: 'specialized',
      description: 'ロト6、ナンバーズ3・4の予測と期待値計算を行う',
      capabilities: [
        'ロト6予測',
        'ナンバーズ3予測',
        'ナンバーズ4予測',
        '期待値計算',
        '統計分析',
        '出現頻度分析',
      ],
      maxRetries: 2,
      timeout: 30000,
    };
    super(config);
  }

  protected async setup(): Promise<void> {
    this.log('Lottery Prediction Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as LotteryPredictionInput;

    this.log(`Predicting ${input.lotteryType} numbers using ${input.predictionMethod || 'random'} method`);

    switch (input.lotteryType) {
      case 'loto6':
        return await this.predictLoto6(input);
      case 'numbers3':
        return await this.predictNumbers3(input);
      case 'numbers4':
        return await this.predictNumbers4(input);
      default:
        throw new Error(`Unknown lottery type: ${input.lotteryType}`);
    }
  }

  /**
   * ロト6の予測
   * 1-43から6つの数字を選ぶ
   */
  private async predictLoto6(input: LotteryPredictionInput): Promise<Loto6Result> {
    const count = input.count || 5;
    const predictions: number[][] = [];

    // 過去データからの統計分析
    const analysis = this.analyzeLoto6History(input.historicalData || []);

    // 予測方法に応じて数字を生成
    for (let i = 0; i < count; i++) {
      let numbers: number[];

      switch (input.predictionMethod) {
        case 'frequency':
          numbers = this.generateByFrequency(analysis.hotNumbers);
          break;
        case 'hot-cold':
          numbers = this.generateByHotCold(analysis.hotNumbers, analysis.coldNumbers);
          break;
        case 'statistical':
          numbers = this.generateByStatistical(input.historicalData || []);
          break;
        default:
          numbers = this.generateRandomLoto6();
      }

      predictions.push(numbers.sort((a, b) => a - b));
    }

    // 期待値計算
    const statistics = this.calculateLoto6ExpectedValue();

    return {
      predictions,
      statistics,
      analysis,
    };
  }

  /**
   * ナンバーズ3の予測
   * 000-999の3桁の数字
   */
  private async predictNumbers3(input: LotteryPredictionInput): Promise<Numbers3Result> {
    const count = input.count || 5;
    const drawType = input.numbers3DrawType || 'straight';
    const predictions: string[] = [];

    for (let i = 0; i < count; i++) {
      const number = this.generateNumbers3();
      predictions.push(number);
    }

    const statistics = this.calculateNumbers3ExpectedValue(drawType);

    return {
      predictions,
      drawType,
      statistics,
    };
  }

  /**
   * ナンバーズ4の予測
   * 0000-9999の4桁の数字
   */
  private async predictNumbers4(input: LotteryPredictionInput): Promise<Numbers4Result> {
    const count = input.count || 5;
    const drawType = input.numbers4DrawType || 'straight';
    const predictions: string[] = [];

    for (let i = 0; i < count; i++) {
      const number = this.generateNumbers4();
      predictions.push(number);
    }

    const statistics = this.calculateNumbers4ExpectedValue(drawType);

    return {
      predictions,
      drawType,
      statistics,
    };
  }

  // ===== ロト6関連の内部メソッド =====

  private generateRandomLoto6(): number[] {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 43) + 1);
    }
    return Array.from(numbers);
  }

  private generateByFrequency(hotNumbers: number[]): number[] {
    const numbers = new Set<number>();

    // まず頻出数字から3つ選ぶ
    const shuffledHot = [...hotNumbers].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(3, shuffledHot.length); i++) {
      numbers.add(shuffledHot[i]);
    }

    // 残りはランダム
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 43) + 1);
    }

    return Array.from(numbers);
  }

  private generateByHotCold(hotNumbers: number[], coldNumbers: number[]): number[] {
    const numbers = new Set<number>();

    // ホット数字から4つ
    const shuffledHot = [...hotNumbers].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(4, shuffledHot.length); i++) {
      numbers.add(shuffledHot[i]);
    }

    // コールド数字から2つ
    const shuffledCold = [...coldNumbers].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(2, shuffledCold.length); i++) {
      numbers.add(shuffledCold[i]);
    }

    // 足りなければランダム
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 43) + 1);
    }

    return Array.from(numbers);
  }

  private generateByStatistical(historicalData: number[][]): number[] {
    if (historicalData.length === 0) {
      return this.generateRandomLoto6();
    }

    // 各数字の出現頻度を計算
    const frequency = new Map<number, number>();
    for (let i = 1; i <= 43; i++) {
      frequency.set(i, 0);
    }

    historicalData.forEach(draw => {
      draw.forEach(num => {
        frequency.set(num, (frequency.get(num) || 0) + 1);
      });
    });

    // 重み付きランダム選択
    const numbers = new Set<number>();
    const totalFreq = Array.from(frequency.values()).reduce((a, b) => a + b, 0);

    while (numbers.size < 6) {
      let random = Math.random() * totalFreq;
      for (const [num, freq] of frequency.entries()) {
        random -= freq;
        if (random <= 0 && !numbers.has(num)) {
          numbers.add(num);
          break;
        }
      }
    }

    return Array.from(numbers);
  }

  private analyzeLoto6History(historicalData: number[][]): {
    hotNumbers: number[];
    coldNumbers: number[];
    consecutiveNumbers: number;
  } {
    if (historicalData.length === 0) {
      // デフォルトの分析結果
      return {
        hotNumbers: [7, 12, 19, 23, 31, 37, 41],
        coldNumbers: [2, 5, 11, 17, 29, 35, 42],
        consecutiveNumbers: 1,
      };
    }

    // 各数字の出現回数をカウント
    const frequency = new Map<number, number>();
    for (let i = 1; i <= 43; i++) {
      frequency.set(i, 0);
    }

    historicalData.forEach(draw => {
      draw.forEach(num => {
        frequency.set(num, (frequency.get(num) || 0) + 1);
      });
    });

    // 出現頻度でソート
    const sorted = Array.from(frequency.entries()).sort((a, b) => b[1] - a[1]);

    const hotNumbers = sorted.slice(0, 7).map(([num]) => num);
    const coldNumbers = sorted.slice(-7).map(([num]) => num);

    // 連番の分析（簡易版）
    let consecutiveCount = 0;
    historicalData.forEach(draw => {
      const sorted = [...draw].sort((a, b) => a - b);
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] - sorted[i] === 1) {
          consecutiveCount++;
        }
      }
    });
    const avgConsecutive = historicalData.length > 0 ? consecutiveCount / historicalData.length : 1;

    return {
      hotNumbers,
      coldNumbers,
      consecutiveNumbers: Math.round(avgConsecutive),
    };
  }

  private calculateLoto6ExpectedValue() {
    // ロト6の確率と賞金（2024年概算）
    const totalCombinations = this.combination(43, 6); // 6,096,454通り
    const ticketPrice = 200;

    // 各等の当選確率と平均賞金
    const prizes = {
      first: { probability: 1 / totalCombinations, prize: 200000000 }, // 2億円
      second: { probability: 6 / totalCombinations, prize: 15000000 }, // 1500万円
      third: { probability: 216 / totalCombinations, prize: 500000 }, // 50万円
      fourth: { probability: 9990 / totalCombinations, prize: 10000 }, // 1万円
      fifth: { probability: 155400 / totalCombinations, prize: 1000 }, // 1000円
    };

    // 期待値計算
    let expectedPrize = 0;
    Object.values(prizes).forEach(({ probability, prize }) => {
      expectedPrize += probability * prize;
    });

    const expectedValue = expectedPrize - ticketPrice;
    const overallProbability = 1 / totalCombinations;

    return {
      totalCombinations,
      probability: overallProbability,
      expectedValue,
    };
  }

  // ===== ナンバーズ3関連 =====

  private generateNumbers3(): string {
    const num = Math.floor(Math.random() * 1000);
    return num.toString().padStart(3, '0');
  }

  private calculateNumbers3ExpectedValue(drawType: Numbers3DrawType) {
    const ticketPrice = 200;
    let totalCombinations = 1000;
    let probability = 1 / 1000;

    const prize: any = {};

    switch (drawType) {
      case 'straight':
        prize.straight = 90000;
        probability = 1 / 1000;
        break;
      case 'box':
        // 全て異なる数字の場合
        prize.box = 15000;
        probability = 6 / 1000;
        break;
      case 'set-straight':
        prize.straight = 45000;
        probability = 1 / 1000;
        break;
      case 'set-box':
        prize.box = 7500;
        probability = 6 / 1000;
        break;
      case 'mini':
        prize.mini = 9000;
        probability = 10 / 1000;
        break;
    }

    const expectedPrize = probability * (prize.straight || prize.box || prize.mini || 0);
    const expectedValue = expectedPrize - ticketPrice;

    return {
      totalCombinations,
      probability,
      expectedValue,
      prize,
    };
  }

  // ===== ナンバーズ4関連 =====

  private generateNumbers4(): string {
    const num = Math.floor(Math.random() * 10000);
    return num.toString().padStart(4, '0');
  }

  private calculateNumbers4ExpectedValue(drawType: Numbers4DrawType) {
    const ticketPrice = 200;
    const totalCombinations = 10000;
    let probability = 1 / 10000;

    const prize: any = {};

    switch (drawType) {
      case 'straight':
        prize.straight = 900000;
        probability = 1 / 10000;
        break;
      case 'box':
        // 全て異なる数字の場合
        prize.box = 37500;
        probability = 24 / 10000;
        break;
      case 'set':
        prize.straight = 450000;
        prize.box = 18750;
        probability = 1 / 10000;
        break;
    }

    const expectedPrize = probability * (prize.straight || prize.box || 0);
    const expectedValue = expectedPrize - ticketPrice;

    return {
      totalCombinations,
      probability,
      expectedValue,
      prize,
    };
  }

  // ===== ユーティリティ =====

  /**
   * 組み合わせの数を計算 nCr
   */
  private combination(n: number, r: number): number {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;

    let result = 1;
    for (let i = 0; i < r; i++) {
      result *= (n - i) / (i + 1);
    }
    return Math.round(result);
  }

  protected async cleanup(): Promise<void> {
    this.log('Lottery Prediction Agent cleanup completed');
  }
}
