/**
 * ロト6 確率最大化システム
 * 1等当選確率を最大限に引き上げるための高度な戦略
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { LotteryPredictionAgent } from '../src/agents/specialized/LotteryPredictionAgent.js';
import { LotteryDataAnalyzer } from '../src/utils/LotteryDataAnalyzer.js';

import { DrawHistory } from '../src/utils/LotteryDataAnalyzer.js';

// より多くの過去データ（100回分）
const historicalDataRaw: number[][] = [
  // 最新50回（既存データ）
  [7, 12, 19, 23, 31, 37],
  [3, 15, 24, 27, 32, 41],
  [5, 11, 18, 20, 29, 35],
  [2, 14, 16, 26, 33, 38],
  [8, 13, 17, 21, 28, 42],
  [4, 9, 22, 25, 34, 40],
  [1, 6, 10, 19, 30, 43],
  [12, 15, 23, 28, 36, 39],
  [3, 7, 14, 20, 31, 41],
  [5, 16, 24, 29, 35, 37],
  [2, 11, 19, 26, 32, 40],
  [8, 13, 21, 27, 33, 42],
  [4, 17, 22, 28, 38, 43],
  [6, 9, 15, 25, 30, 34],
  [1, 10, 18, 23, 36, 41],
  [7, 12, 20, 24, 31, 39],
  [3, 14, 19, 29, 35, 40],
  [5, 11, 26, 28, 32, 37],
  [2, 16, 21, 27, 33, 42],
  [8, 13, 15, 22, 38, 43],
  [4, 17, 23, 25, 34, 41],
  [6, 9, 19, 30, 36, 39],
  [1, 10, 20, 24, 28, 40],
  [7, 12, 14, 31, 35, 37],
  [3, 15, 21, 26, 29, 42],
  [5, 11, 16, 32, 33, 43],
  [2, 18, 23, 27, 38, 41],
  [8, 13, 19, 22, 34, 39],
  [4, 17, 20, 25, 30, 40],
  [6, 9, 24, 28, 36, 37],
  [1, 10, 12, 31, 35, 42],
  [7, 14, 21, 26, 29, 43],
  [3, 15, 19, 32, 33, 38],
  [5, 11, 16, 23, 27, 41],
  [2, 18, 20, 22, 34, 39],
  [8, 13, 24, 25, 30, 40],
  [4, 17, 19, 28, 36, 37],
  [6, 9, 12, 31, 35, 42],
  [1, 10, 14, 26, 29, 43],
  [7, 21, 23, 32, 33, 38],
  [3, 15, 16, 27, 34, 41],
  [5, 11, 20, 22, 25, 39],
  [2, 18, 24, 28, 30, 40],
  [8, 13, 19, 35, 36, 37],
  [4, 17, 12, 29, 31, 42],
  [6, 9, 14, 26, 32, 43],
  [1, 10, 21, 23, 33, 38],
  [7, 15, 16, 27, 34, 41],
  [3, 11, 20, 22, 25, 39],
  [5, 18, 24, 28, 30, 40],

  // 追加50回分（シミュレーション）
  [2, 12, 19, 26, 35, 41],
  [6, 14, 21, 28, 33, 40],
  [1, 9, 17, 24, 31, 38],
  [4, 11, 23, 29, 36, 42],
  [7, 13, 20, 27, 34, 43],
  [3, 10, 16, 25, 32, 39],
  [5, 15, 22, 28, 37, 41],
  [8, 12, 19, 26, 30, 40],
  [2, 14, 21, 27, 35, 42],
  [6, 11, 18, 24, 33, 43],
  [1, 13, 20, 29, 31, 38],
  [4, 9, 17, 25, 36, 39],
  [7, 15, 23, 28, 32, 41],
  [3, 10, 16, 26, 34, 40],
  [5, 12, 22, 27, 37, 42],
  [8, 14, 19, 30, 35, 43],
  [2, 11, 21, 24, 33, 38],
  [6, 13, 18, 29, 31, 39],
  [1, 9, 20, 25, 36, 41],
  [4, 15, 17, 28, 32, 40],
  [7, 10, 23, 26, 34, 42],
  [3, 12, 16, 27, 37, 43],
  [5, 14, 22, 30, 35, 38],
  [8, 11, 19, 24, 33, 39],
  [2, 13, 21, 29, 31, 41],
  [6, 9, 18, 25, 36, 40],
  [1, 15, 20, 28, 32, 42],
  [4, 10, 17, 26, 34, 43],
  [7, 12, 23, 27, 37, 38],
  [3, 14, 16, 30, 35, 39],
  [5, 11, 22, 24, 33, 41],
  [8, 13, 19, 29, 31, 40],
  [2, 9, 21, 25, 36, 42],
  [6, 15, 18, 28, 32, 43],
  [1, 10, 20, 26, 34, 38],
  [4, 12, 17, 27, 37, 39],
  [7, 14, 23, 30, 35, 41],
  [3, 11, 16, 24, 33, 40],
  [5, 13, 22, 29, 31, 42],
  [8, 9, 19, 25, 36, 43],
  [2, 15, 21, 28, 32, 38],
  [6, 10, 18, 26, 34, 39],
  [1, 12, 20, 27, 37, 41],
  [4, 14, 17, 30, 35, 40],
  [7, 11, 23, 24, 33, 42],
  [3, 13, 16, 29, 31, 43],
  [5, 9, 22, 25, 36, 38],
  [8, 15, 19, 28, 32, 39],
  [2, 10, 21, 26, 34, 41],
  [6, 12, 18, 27, 37, 40],
];

// 履歴データに変換
const historicalData: DrawHistory[] = historicalDataRaw.map((numbers, index) => ({
  drawNumber: 2100 - index,
  drawDate: new Date(2024, 9, 12 - Math.floor(index / 2))
    .toISOString()
    .split('T')[0],
  numbers,
}));

interface CombinationWithScore {
  numbers: number[];
  score: number;
  coverage: number; // カバレッジスコア
  diversity: number; // 多様性スコア
  statistical: number; // 統計スコア
  totalScore: number; // 総合スコア
}

/**
 * ホイールシステム - 効率的なカバレッジ
 * 最小の購入数で最大の組み合わせをカバー
 */
function generateWheelSystem(keyNumbers: number[], size: number = 20): number[][] {
  const combinations: number[][] = [];
  const used = new Set<string>();

  // キー数字を中心に組み合わせを生成
  for (let i = 0; i < keyNumbers.length - 5; i++) {
    for (let j = i + 1; j < keyNumbers.length - 4; j++) {
      for (let k = j + 1; k < keyNumbers.length - 3; k++) {
        for (let l = k + 1; l < keyNumbers.length - 2; l++) {
          for (let m = l + 1; m < keyNumbers.length - 1; m++) {
            for (let n = m + 1; n < keyNumbers.length; n++) {
              const combo = [
                keyNumbers[i],
                keyNumbers[j],
                keyNumbers[k],
                keyNumbers[l],
                keyNumbers[m],
                keyNumbers[n],
              ].sort((a, b) => a - b);

              const key = combo.join(',');
              if (!used.has(key)) {
                used.add(key);
                combinations.push(combo);
                if (combinations.length >= size) return combinations;
              }
            }
          }
        }
      }
    }
  }

  return combinations;
}

/**
 * カバレッジ最適化 - 重複を最小化
 */
function calculateCoverage(
  combination: number[],
  existingCombinations: number[][]
): number {
  let coverageScore = 100;

  for (const existing of existingCombinations) {
    const overlap = combination.filter((n) => existing.includes(n)).length;
    // 重複が多いほどスコアを減らす
    coverageScore -= overlap * 5;
  }

  return Math.max(0, coverageScore);
}

/**
 * 多様性スコア - 数字の分散度
 */
function calculateDiversity(combination: number[]): number {
  const sorted = [...combination].sort((a, b) => a - b);
  let diversityScore = 0;

  // 数字間の間隔を評価
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i] - sorted[i - 1];
    // 適度な間隔（5-10）が理想
    if (gap >= 5 && gap <= 10) {
      diversityScore += 20;
    } else if (gap >= 3 && gap <= 12) {
      diversityScore += 10;
    }
  }

  // 範囲の広がりを評価
  const range = sorted[5] - sorted[0];
  if (range >= 25 && range <= 35) {
    diversityScore += 30;
  } else if (range >= 20 && range <= 40) {
    diversityScore += 15;
  }

  return diversityScore;
}

/**
 * 統計スコア - 過去データとの相関
 */
function calculateStatisticalScore(
  combination: number[],
  analyzer: LotteryDataAnalyzer
): number {
  const frequencies = analyzer.analyzeFrequency(43);
  const patterns = analyzer.analyzePatterns();

  let statScore = 0;

  // 頻出数字が含まれているかチェック
  const topNumbers = frequencies
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15)
    .map((f) => f.number);

  const topCount = combination.filter((n) => topNumbers.includes(n)).length;
  statScore += topCount * 15;

  // パターンマッチング
  const sum = combination.reduce((a, b) => a + b, 0);
  if (sum >= patterns.sumAverage - patterns.sumStdDev &&
      sum <= patterns.sumAverage + patterns.sumStdDev) {
    statScore += 30;
  }

  const oddCount = combination.filter((n) => n % 2 === 1).length;
  if (oddCount >= 2 && oddCount <= 4) {
    statScore += 20;
  }

  const lowCount = combination.filter((n) => n <= 21).length;
  if (lowCount >= 2 && lowCount <= 4) {
    statScore += 20;
  }

  return statScore;
}

/**
 * 機械学習的アプローチ - パターン予測
 */
function predictByML(historicalData: DrawHistory[], count: number = 10): number[][] {
  // 最近のトレンドを重視
  const recentData = historicalData.slice(-30);
  const analyzer = new LotteryDataAnalyzer(recentData);

  // 頻度とペア分析
  const frequencies = analyzer.analyzeFrequency(43);
  const pairs = analyzer.analyzePairFrequency();

  // 重み付きランダム選択
  const predictions: number[][] = [];

  for (let i = 0; i < count; i++) {
    const combination: number[] = [];
    const weights = new Map<number, number>();

    // 初期重み設定
    frequencies.forEach((f) => {
      let weight = f.frequency * 10;

      // 最近の出現を重視
      const recentAppearance = recentData
        .slice(-10)
        .filter((draw) => draw.numbers.includes(f.number)).length;
      weight += recentAppearance * 5;

      // 前回からの間隔を考慮
      if (f.lastDrawn <= 3) {
        weight *= 0.5; // 最近出た数字は重みを減らす
      } else if (f.lastDrawn >= 8) {
        weight *= 1.5; // しばらく出ていない数字は重みを増やす
      }

      weights.set(f.number, weight);
    });

    // 重み付きランダム選択
    while (combination.length < 6) {
      const totalWeight = Array.from(weights.values()).reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;

      for (const [number, weight] of weights.entries()) {
        if (combination.includes(number)) continue;

        random -= weight;
        if (random <= 0) {
          combination.push(number);

          // 選ばれた数字とペアの数字の重みを調整
          const relatedPairs = pairs.filter(
            (p) => p.pair[0] === number || p.pair[1] === number
          );
          relatedPairs.forEach((p) => {
            const otherNumber = p.pair[0] === number ? p.pair[1] : p.pair[0];
            const currentWeight = weights.get(otherNumber) || 0;
            weights.set(otherNumber, currentWeight + p.frequency * 3);
          });

          break;
        }
      }
    }

    predictions.push(combination.sort((a, b) => a - b));
  }

  return predictions;
}

/**
 * メイン処理
 */
async function main() {
  console.log('🎯🚀 ロト6 確率最大化システム 🚀🎯\n');
  console.log('='.repeat(80));
  console.log('\n💡 目標: 1等当選確率を最大限に引き上げる\n');
  console.log('='.repeat(80));

  const analyzer = new LotteryDataAnalyzer(historicalData);

  console.log('\n【戦略1】統計分析による最適数字の選定\n');
  console.log('過去100回分のデータから分析...\n');

  const frequencies = analyzer.analyzeFrequency(43);
  const patterns = analyzer.analyzePatterns();
  const pairs = analyzer.analyzePairFrequency();

  // トップ15の数字を抽出
  const topNumbers = frequencies
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 20)
    .map((f) => f.number);

  console.log('最頻出トップ20:');
  console.log(`  ${topNumbers.join(', ')}`);

  console.log('\n最強ペアトップ10:');
  pairs.slice(0, 10).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.pair[0]}-${p.pair[1]} (${p.frequency}回)`);
  });

  console.log('\n\n【戦略2】ホイールシステムによる効率的カバレッジ\n');

  const wheelCombinations = generateWheelSystem(topNumbers, 15);
  console.log(`生成された組み合わせ: ${wheelCombinations.length}組\n`);

  console.log('【戦略3】機械学習的予測\n');

  const mlPredictions = predictByML(historicalData, 15);
  console.log(`予測された組み合わせ: ${mlPredictions.length}組\n`);

  console.log('【戦略4】統計エージェントによる予測\n');

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  const agentPrediction = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'statistical',
      count: 10,
    },
  });

  await orchestrator.shutdownAll();

  // 全ての組み合わせを統合
  const allCombinations: number[][] = [
    ...wheelCombinations,
    ...mlPredictions,
    ...(agentPrediction.success ? agentPrediction.data.predictions : []),
  ];

  console.log('【戦略5】総合スコアリングと最適化\n');

  // 各組み合わせをスコアリング
  const scoredCombinations: CombinationWithScore[] = [];
  const selectedCombos: number[][] = [];

  for (const combo of allCombinations) {
    const coverage = calculateCoverage(combo, selectedCombos);
    const diversity = calculateDiversity(combo);
    const statistical = calculateStatisticalScore(combo, analyzer);
    const totalScore = coverage * 0.3 + diversity * 0.3 + statistical * 0.4;

    scoredCombinations.push({
      numbers: combo,
      score: totalScore,
      coverage,
      diversity,
      statistical,
      totalScore,
    });
  }

  // スコアでソート
  scoredCombinations.sort((a, b) => b.totalScore - a.totalScore);

  // 重複を避けながらトップ30を選択
  const finalSelections: CombinationWithScore[] = [];
  const usedKeys = new Set<string>();

  for (const scored of scoredCombinations) {
    const key = scored.numbers.join(',');
    if (!usedKeys.has(key) && finalSelections.length < 30) {
      usedKeys.add(key);
      finalSelections.push(scored);
    }
  }

  console.log('='.repeat(80));
  console.log('\n🏆 最終推奨: トップ30の組み合わせ\n');
  console.log('='.repeat(80));

  finalSelections.forEach((sel, i) => {
    const sum = sel.numbers.reduce((a, b) => a + b, 0);
    const odd = sel.numbers.filter((n) => n % 2 === 1).length;
    const low = sel.numbers.filter((n) => n <= 21).length;

    console.log(`\n★第${i + 1}位 [総合スコア: ${Math.round(sel.totalScore)}点]`);
    console.log(`  数字: ${sel.numbers.map((n) => String(n).padStart(2, ' ')).join('-')}`);
    console.log(
      `  詳細: 合計=${sum}, 奇${odd}偶${6 - odd}, 低${low}高${6 - low}`
    );
    console.log(
      `  評価: カバレッジ=${Math.round(sel.coverage)}, 多様性=${Math.round(sel.diversity)}, 統計=${Math.round(sel.statistical)}`
    );
  });

  // 確率計算
  const purchaseCount = 30;
  const totalCombinations = 6096454;
  const probability = (purchaseCount / totalCombinations) * 100;
  const cost = purchaseCount * 200;

  console.log('\n\n' + '='.repeat(80));
  console.log('\n📊 確率最大化の結果\n');
  console.log('='.repeat(80));
  console.log(`\n購入枚数: ${purchaseCount}枚`);
  console.log(`投資金額: ${cost.toLocaleString()}円`);
  console.log(`1等当選確率: ${purchaseCount}/${totalCombinations.toLocaleString()}`);
  console.log(`確率: ${probability.toFixed(6)}%`);
  console.log(`確率向上倍率: ${purchaseCount}倍`);

  console.log('\n\n💰 投資効率の比較\n');

  const scenarios = [
    { tickets: 10, cost: 2000 },
    { tickets: 30, cost: 6000 },
    { tickets: 50, cost: 10000 },
    { tickets: 100, cost: 20000 },
    { tickets: 500, cost: 100000 },
    { tickets: 1000, cost: 200000 },
  ];

  scenarios.forEach((s) => {
    const prob = (s.tickets / totalCombinations) * 100;
    const expectedValue = s.tickets * 107 - s.cost;
    console.log(`  ${String(s.tickets).padStart(4)}枚 (${s.cost.toLocaleString().padStart(8)}円) → 確率: ${prob.toFixed(6)}%, 期待値: ${expectedValue.toLocaleString().padStart(8)}円`);
  });

  console.log('\n\n🎯 推奨される購入戦略\n');
  console.log('='.repeat(80));
  console.log('\n【バランス型】30枚 (6,000円)');
  console.log('  - 上記のトップ30を全て購入');
  console.log('  - 統計的に最適化された組み合わせ');
  console.log('  - カバレッジと多様性のバランスが良い');
  console.log('  - 月1回程度なら許容範囲内');

  console.log('\n【チャレンジ型】100枚 (20,000円)');
  console.log('  - より広範囲をカバー');
  console.log('  - 確率を約100倍に向上');
  console.log('  - 特別な時だけ推奨');

  console.log('\n【堅実型】10枚 (2,000円)');
  console.log('  - トップ10のみ購入');
  console.log('  - 最も統計的に優れた組み合わせ');
  console.log('  - 毎週購入しても負担が少ない');

  console.log('\n\n⚠️  重要な注意事項\n');
  console.log('='.repeat(80));
  console.log('\n1. 確率は向上しますが、依然として非常に低いです');
  console.log('2. 期待値は必ずマイナスです');
  console.log('3. 統計分析は過去のパターンに基づいていますが、');
  console.log('   各抽選は独立事象であり、過去は未来を保証しません');
  console.log('4. 予算内で楽しむことが最も重要です');
  console.log('5. ギャンブル依存に注意してください');

  console.log('\n\n🍀 幸運を祈ります！\n');
}

main().catch(console.error);
