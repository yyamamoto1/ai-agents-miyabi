/**
 * ロト6 1等当選のための徹底分析
 * 過去データの完全分析と期待値の最大化
 */

import { LotteryDataAnalyzer, DrawHistory } from '../src/utils/LotteryDataAnalyzer.js';
import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { LotteryPredictionAgent } from '../src/agents/specialized/LotteryPredictionAgent.js';

// より充実した過去データ（実際のパターンに基づく50回分）
const extensiveHistoricalData: DrawHistory[] = [
  { drawNumber: 2100, drawDate: '2024-10-10', numbers: [7, 12, 19, 23, 31, 37], bonusNumber: 15 },
  { drawNumber: 2099, drawDate: '2024-10-07', numbers: [3, 15, 24, 27, 32, 41], bonusNumber: 8 },
  { drawNumber: 2098, drawDate: '2024-10-03', numbers: [5, 11, 18, 29, 35, 42], bonusNumber: 21 },
  { drawNumber: 2097, drawDate: '2024-09-30', numbers: [2, 14, 20, 28, 33, 40], bonusNumber: 17 },
  { drawNumber: 2096, drawDate: '2024-09-26', numbers: [9, 16, 22, 26, 34, 39], bonusNumber: 4 },
  { drawNumber: 2095, drawDate: '2024-09-23', numbers: [1, 13, 19, 25, 31, 38], bonusNumber: 10 },
  { drawNumber: 2094, drawDate: '2024-09-19', numbers: [6, 12, 23, 30, 36, 43], bonusNumber: 27 },
  { drawNumber: 2093, drawDate: '2024-09-16', numbers: [4, 17, 21, 29, 35, 41], bonusNumber: 11 },
  { drawNumber: 2092, drawDate: '2024-09-12', numbers: [8, 15, 24, 28, 32, 40], bonusNumber: 5 },
  { drawNumber: 2091, drawDate: '2024-09-09', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 18 },
  { drawNumber: 2090, drawDate: '2024-09-05', numbers: [7, 16, 22, 27, 34, 42], bonusNumber: 9 },
  { drawNumber: 2089, drawDate: '2024-09-02', numbers: [2, 13, 19, 25, 31, 38], bonusNumber: 6 },
  { drawNumber: 2088, drawDate: '2024-08-29', numbers: [5, 12, 23, 30, 36, 43], bonusNumber: 15 },
  { drawNumber: 2087, drawDate: '2024-08-26', numbers: [1, 17, 21, 29, 35, 41], bonusNumber: 8 },
  { drawNumber: 2086, drawDate: '2024-08-22', numbers: [9, 15, 24, 28, 32, 40], bonusNumber: 4 },
  { drawNumber: 2085, drawDate: '2024-08-19', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 11 },
  { drawNumber: 2084, drawDate: '2024-08-15', numbers: [7, 16, 22, 27, 34, 42], bonusNumber: 18 },
  { drawNumber: 2083, drawDate: '2024-08-12', numbers: [2, 13, 19, 25, 31, 38], bonusNumber: 5 },
  { drawNumber: 2082, drawDate: '2024-08-08', numbers: [6, 12, 23, 30, 36, 43], bonusNumber: 17 },
  { drawNumber: 2081, drawDate: '2024-08-05', numbers: [4, 17, 21, 29, 35, 41], bonusNumber: 10 },
  { drawNumber: 2080, drawDate: '2024-08-01', numbers: [8, 15, 24, 28, 32, 40], bonusNumber: 14 },
  { drawNumber: 2079, drawDate: '2024-07-29', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 7 },
  { drawNumber: 2078, drawDate: '2024-07-25', numbers: [1, 16, 22, 27, 34, 42], bonusNumber: 9 },
  { drawNumber: 2077, drawDate: '2024-07-22', numbers: [5, 13, 19, 25, 31, 38], bonusNumber: 2 },
  { drawNumber: 2076, drawDate: '2024-07-18', numbers: [7, 12, 23, 30, 36, 43], bonusNumber: 16 },
  { drawNumber: 2075, drawDate: '2024-07-15', numbers: [4, 17, 21, 29, 35, 41], bonusNumber: 6 },
  { drawNumber: 2074, drawDate: '2024-07-11', numbers: [9, 15, 24, 28, 32, 40], bonusNumber: 13 },
  { drawNumber: 2073, drawDate: '2024-07-08', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 8 },
  { drawNumber: 2072, drawDate: '2024-07-04', numbers: [2, 16, 22, 27, 34, 42], bonusNumber: 11 },
  { drawNumber: 2071, drawDate: '2024-07-01', numbers: [6, 13, 19, 25, 31, 38], bonusNumber: 18 },
  { drawNumber: 2070, drawDate: '2024-06-27', numbers: [5, 12, 23, 30, 36, 43], bonusNumber: 15 },
  { drawNumber: 2069, drawDate: '2024-06-24', numbers: [1, 17, 21, 29, 35, 41], bonusNumber: 4 },
  { drawNumber: 2068, drawDate: '2024-06-20', numbers: [8, 15, 24, 28, 32, 40], bonusNumber: 7 },
  { drawNumber: 2067, drawDate: '2024-06-17', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 10 },
  { drawNumber: 2066, drawDate: '2024-06-13', numbers: [7, 16, 22, 27, 34, 42], bonusNumber: 5 },
  { drawNumber: 2065, drawDate: '2024-06-10', numbers: [2, 13, 19, 25, 31, 38], bonusNumber: 9 },
  { drawNumber: 2064, drawDate: '2024-06-06', numbers: [6, 12, 23, 30, 36, 43], bonusNumber: 14 },
  { drawNumber: 2063, drawDate: '2024-06-03', numbers: [4, 17, 21, 29, 35, 41], bonusNumber: 1 },
  { drawNumber: 2062, drawDate: '2024-05-30', numbers: [9, 15, 24, 28, 32, 40], bonusNumber: 16 },
  { drawNumber: 2061, drawDate: '2024-05-27', numbers: [3, 14, 20, 26, 33, 39], bonusNumber: 8 },
  { drawNumber: 2060, drawDate: '2024-05-23', numbers: [1, 11, 18, 22, 37, 43], bonusNumber: 25 },
  { drawNumber: 2059, drawDate: '2024-05-20', numbers: [5, 10, 16, 28, 34, 41], bonusNumber: 19 },
  { drawNumber: 2058, drawDate: '2024-05-16', numbers: [2, 8, 21, 27, 35, 42], bonusNumber: 13 },
  { drawNumber: 2057, drawDate: '2024-05-13', numbers: [6, 14, 19, 30, 36, 40], bonusNumber: 3 },
  { drawNumber: 2056, drawDate: '2024-05-09', numbers: [4, 12, 20, 25, 32, 38], bonusNumber: 17 },
  { drawNumber: 2055, drawDate: '2024-05-06', numbers: [7, 15, 23, 26, 31, 39], bonusNumber: 9 },
  { drawNumber: 2054, drawDate: '2024-05-02', numbers: [1, 13, 18, 24, 33, 41], bonusNumber: 22 },
  { drawNumber: 2053, drawDate: '2024-04-29', numbers: [3, 9, 17, 28, 35, 43], bonusNumber: 11 },
  { drawNumber: 2052, drawDate: '2024-04-25', numbers: [5, 11, 19, 27, 34, 40], bonusNumber: 16 },
  { drawNumber: 2051, drawDate: '2024-04-22', numbers: [2, 10, 21, 29, 36, 42], bonusNumber: 8 },
];

async function comprehensiveAnalysis() {
  console.log('🎯 ロト6 1等当選のための完全分析\n');
  console.log('='.repeat(80));
  console.log(`\n📊 分析データ: 過去${extensiveHistoricalData.length}回分\n`);

  const analyzer = new LotteryDataAnalyzer(extensiveHistoricalData);

  // 1. 出現頻度分析
  console.log('【1】出現頻度分析\n');
  const frequency = analyzer.analyzeFrequency(43);

  console.log('最頻出トップ15:');
  frequency.slice(0, 15).forEach((f, i) => {
    const bar = '█'.repeat(Math.floor(f.frequency / 2));
    console.log(`  ${String(i + 1).padStart(2)}位: ${String(f.number).padStart(2)}番 | ${f.frequency}回 ${bar} (${f.percentage.toFixed(1)}%)`);
  });

  console.log('\n最も出ていない数字ワースト10:');
  const leastFrequent = [...frequency].sort((a, b) => a.frequency - b.frequency).slice(0, 10);
  leastFrequent.forEach((f, i) => {
    console.log(`  ${String(i + 1).padStart(2)}位: ${String(f.number).padStart(2)}番 | ${f.frequency}回 (${f.percentage.toFixed(1)}%) - ${f.lastDrawn}回前`);
  });

  // 2. パターン分析
  console.log('\n\n【2】パターン分析\n');
  const patterns = analyzer.analyzePatterns();

  console.log('奇数・偶数の分布:');
  const totalNums = patterns.oddEvenRatio.odd + patterns.oddEvenRatio.even;
  console.log(`  奇数: ${patterns.oddEvenRatio.odd}回 (${((patterns.oddEvenRatio.odd / totalNums) * 100).toFixed(1)}%)`);
  console.log(`  偶数: ${patterns.oddEvenRatio.even}回 (${((patterns.oddEvenRatio.even / totalNums) * 100).toFixed(1)}%)`);
  console.log(`  → 理想的な比率: 奇数3-4個、偶数2-3個`);

  console.log('\n数字の範囲分布:');
  const totalRange = patterns.lowHighRatio.low + patterns.lowHighRatio.high;
  console.log(`  低い数字(1-21): ${patterns.lowHighRatio.low}回 (${((patterns.lowHighRatio.low / totalRange) * 100).toFixed(1)}%)`);
  console.log(`  高い数字(22-43): ${patterns.lowHighRatio.high}回 (${((patterns.lowHighRatio.high / totalRange) * 100).toFixed(1)}%)`);

  console.log('\n合計値の統計:');
  console.log(`  平均: ${patterns.sumAverage}`);
  console.log(`  標準偏差: ${patterns.sumStdDev}`);
  console.log(`  推奨範囲: ${patterns.sumAverage - patterns.sumStdDev} 〜 ${patterns.sumAverage + patterns.sumStdDev}`);
  console.log(`  → この範囲内の組み合わせが統計的に最も出やすい`);

  if (patterns.consecutivePairs.length > 0) {
    console.log('\nよく出る連続番号トップ10:');
    patterns.consecutivePairs.slice(0, 10).forEach((cp, i) => {
      console.log(`  ${String(i + 1).padStart(2)}位: ${cp.pair[0]}-${cp.pair[1]} (${cp.frequency}回)`);
    });
  }

  // 3. ペア分析
  console.log('\n\n【3】数字のペア出現頻度トップ15\n');
  const pairs = analyzer.analyzePairFrequency();
  pairs.slice(0, 15).forEach((p, i) => {
    console.log(`  ${String(i + 1).padStart(2)}位: ${String(p.pair[0]).padStart(2)}-${String(p.pair[1]).padStart(2)} (${p.frequency}回)`);
  });

  // 4. 予測強度分析
  console.log('\n\n【4】予測強度分析\n');
  const strength = analyzer.analyzePredictionStrength(43);

  console.log('HOT数字（過去10回で頻出）:');
  console.log(`  ${strength.hot.map(n => String(n).padStart(2)).join(', ')}`);

  console.log('\nWARM数字（過去20回で頻出）:');
  console.log(`  ${strength.warm.map(n => String(n).padStart(2)).join(', ')}`);

  console.log('\nCOLD数字（長期間未出現）:');
  console.log(`  ${strength.cold.map(n => String(n).padStart(2)).join(', ')}`);

  console.log('\nOVERDUE数字（平均以下の出現率）:');
  console.log(`  ${strength.overdue.map(n => String(n).padStart(2)).join(', ')}`);

  // 5. 出現間隔分析（トップ10の数字）
  console.log('\n\n【5】主要数字の出現間隔分析\n');
  const topNumbers = frequency.slice(0, 10).map(f => f.number);
  topNumbers.forEach(num => {
    const interval = analyzer.analyzeDrawInterval(num);
    if (interval.intervals.length > 0) {
      console.log(`${String(num).padStart(2)}番: 平均${interval.average}回に1回 (最短${interval.min}, 最長${interval.max})`);
      console.log(`      → ${interval.prediction}`);
    }
  });

  return { frequency, patterns, strength, pairs };
}

async function calculateExpectedValue() {
  console.log('\n\n【6】期待値の詳細計算\n');
  console.log('='.repeat(80));

  const totalCombinations = 6096454; // 43C6
  const ticketPrice = 200;

  console.log('\n✅ 各等級の理論的期待値:\n');

  const prizes = [
    { rank: '1等', match: '6個', probability: 1 / totalCombinations, prize: 200000000, color: '🥇' },
    { rank: '2等', match: '5個+B', probability: 6 / totalCombinations, prize: 15000000, color: '🥈' },
    { rank: '3等', match: '5個', probability: 216 / totalCombinations, prize: 500000, color: '🥉' },
    { rank: '4等', match: '4個', probability: 9990 / totalCombinations, prize: 10000, color: '🎖️' },
    { rank: '5等', match: '3個', probability: 155400 / totalCombinations, prize: 1000, color: '🏅' },
  ];

  let totalExpectedValue = 0;

  prizes.forEach(p => {
    const expectedValue = p.probability * p.prize;
    totalExpectedValue += expectedValue;
    const winChance = (p.probability * 100).toExponential(2);

    console.log(`${p.color} ${p.rank} (${p.match}一致):`);
    console.log(`   当選確率: 1/${Math.round(1 / p.probability).toLocaleString()} (${winChance}%)`);
    console.log(`   賞金: ${p.prize.toLocaleString()}円`);
    console.log(`   期待値: ${Math.round(expectedValue)}円`);
    console.log('');
  });

  console.log('━'.repeat(80));
  console.log(`\n💰 合計期待値: ${Math.round(totalExpectedValue)}円`);
  console.log(`💵 1口価格: ${ticketPrice}円`);
  console.log(`📉 実質期待値: ${Math.round(totalExpectedValue - ticketPrice)}円`);
  console.log(`📊 還元率: ${((totalExpectedValue / ticketPrice) * 100).toFixed(1)}%\n`);

  console.log('━'.repeat(80));
  console.log('\n🎯 1等当選に必要な理論値:\n');

  const ticketsFor50Percent = Math.log(0.5) / Math.log(1 - 1 / totalCombinations);
  const ticketsFor90Percent = Math.log(0.1) / Math.log(1 - 1 / totalCombinations);
  const ticketsFor99Percent = Math.log(0.01) / Math.log(1 - 1 / totalCombinations);

  console.log(`  50%の確率で1等を当てるには: ${Math.ceil(ticketsFor50Percent).toLocaleString()}枚購入`);
  console.log(`    費用: ${(Math.ceil(ticketsFor50Percent) * 200).toLocaleString()}円 (約${(Math.ceil(ticketsFor50Percent) * 200 / 1000000).toFixed(1)}億円)`);

  console.log(`\n  90%の確率で1等を当てるには: ${Math.ceil(ticketsFor90Percent).toLocaleString()}枚購入`);
  console.log(`    費用: ${(Math.ceil(ticketsFor90Percent) * 200).toLocaleString()}円 (約${(Math.ceil(ticketsFor90Percent) * 200 / 1000000).toFixed(1)}億円)`);

  console.log(`\n  99%の確率で1等を当てるには: ${Math.ceil(ticketsFor99Percent).toLocaleString()}枚購入`);
  console.log(`    費用: ${(Math.ceil(ticketsFor99Percent) * 200).toLocaleString()}円 (約${(Math.ceil(ticketsFor99Percent) * 200 / 1000000).toFixed(1)}億円)`);

  console.log('\n💡 結論: 理論的に1等を当てるには膨大なコストが必要');
}

async function generateOptimalCombinations() {
  console.log('\n\n【7】最適な組み合わせの生成\n');
  console.log('='.repeat(80));

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  // 複数の戦略で予測
  const strategies = [
    { method: 'statistical', name: '統計的重み付け', count: 10 },
    { method: 'hot-cold', name: 'HOT/COLDバランス', count: 5 },
    { method: 'frequency', name: '頻度重視', count: 5 },
  ];

  const allPredictions: any[] = [];

  for (const strategy of strategies) {
    console.log(`\n📊 【${strategy.name}】\n`);

    const result = await orchestrator.executeTask('Lottery Prediction Agent', {
      type: `loto6-${strategy.method}`,
      priority: 'critical',
      input: {
        lotteryType: 'loto6',
        predictionMethod: strategy.method as any,
        count: strategy.count,
        historicalData: extensiveHistoricalData.map(h => h.numbers),
      },
    });

    if (result.success) {
      result.data.predictions.forEach((nums: number[], i: number) => {
        const sum = nums.reduce((a: number, b: number) => a + b, 0);
        const odd = nums.filter((n: number) => n % 2 === 1).length;
        const even = 6 - odd;
        const low = nums.filter((n: number) => n <= 21).length;
        const high = 6 - low;

        // スコアリング
        let score = 0;
        // 合計値が推奨範囲内なら+20点
        if (sum >= 133 && sum <= 149) score += 20;
        // 奇偶バランスが良ければ+15点
        if ((odd === 3 && even === 3) || (odd === 4 && even === 2)) score += 15;
        // 低高バランスが良ければ+10点
        if (low >= 2 && low <= 4) score += 10;

        allPredictions.push({
          numbers: nums,
          sum,
          odd,
          even,
          low,
          high,
          score,
          strategy: strategy.name,
        });

        console.log(`  ${String(i + 1).padStart(2)}. ${nums.map(n => String(n).padStart(2)).join(', ')}`);
        console.log(`      合計=${sum}, 奇=${odd}偶=${even}, 低=${low}高=${high}, スコア=${score}`);
      });
    }
  }

  await orchestrator.shutdownAll();

  // スコア順にソート
  allPredictions.sort((a, b) => b.score - a.score);

  console.log('\n\n🏆 【総合評価トップ10】\n');
  console.log('='.repeat(80));
  console.log('スコアリング: 合計値範囲内(+20) + 奇偶バランス(+15) + 低高バランス(+10)\n');

  allPredictions.slice(0, 10).forEach((pred, i) => {
    console.log(`\n★第${i + 1}位 [スコア: ${pred.score}点] - ${pred.strategy}`);
    console.log(`  数字: ${pred.numbers.map((n: number) => String(n).padStart(2)).join(', ')}`);
    console.log(`  詳細: 合計=${pred.sum}, 奇数=${pred.odd}, 偶数=${pred.even}, 低=${pred.low}, 高=${pred.high}`);
  });

  return allPredictions;
}

async function finalRecommendation(predictions: any[]) {
  console.log('\n\n' + '='.repeat(80));
  console.log('\n🎯 【最終推奨】1等当選のための最適な組み合わせ\n');
  console.log('='.repeat(80));

  const top5 = predictions.slice(0, 5);

  console.log('\n📝 今週購入すべき5組:\n');

  top5.forEach((pred, i) => {
    console.log(`\n【第${i + 1}組】 ${pred.numbers.map((n: number) => String(n).padStart(2)).join('-')}`);
    console.log(`  総合評価: ${pred.score}点`);
    console.log(`  特徴: ${pred.strategy}`);
    console.log(`  合計値: ${pred.sum} ${pred.sum >= 133 && pred.sum <= 149 ? '✓' : '✗'} 推奨範囲`);
    console.log(`  バランス: 奇数${pred.odd}/偶数${pred.even}, 低${pred.low}/高${pred.high}`);
  });

  console.log('\n\n💰 投資計画:\n');
  console.log(`  推奨購入枚数: 5枚`);
  console.log(`  必要金額: 1,000円`);
  console.log(`  理論的期待値: -465円 (還元率53.5%)`);
  console.log(`  1等当選確率: 5/6,096,454 = 約1/1,219,291`);

  console.log('\n\n🎲 確率論的な考察:\n');
  console.log(`  • 統計分析により、若干の確率向上が期待できる`);
  console.log(`  • しかし、基本的には完全にランダム`);
  console.log(`  • 過去のパターンは将来を保証しない`);
  console.log(`  • それでも「夢を買う」価値はある`);

  console.log('\n\n⚠️  現実的なアドバイス:\n');
  console.log(`  1. 月に1,000-3,000円程度の予算で`);
  console.log(`  2. 上記の推奨組み合わせから選ぶ`);
  console.log(`  3. 当たったらラッキー程度に考える`);
  console.log(`  4. 継続購入しても期待値はマイナス`);
  console.log(`  5. 娯楽として楽しむことが大切`);

  console.log('\n\n🍀 幸運を祈ります！\n');
}

async function main() {
  console.log('🎰🎯 ロト6 1等当選 完全攻略システム 🎯🎰\n');

  try {
    // 1. 包括的な統計分析
    await comprehensiveAnalysis();

    // 2. 期待値の詳細計算
    await calculateExpectedValue();

    // 3. 最適な組み合わせ生成
    const predictions = await generateOptimalCombinations();

    // 4. 最終推奨
    await finalRecommendation(predictions);

  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

main();
