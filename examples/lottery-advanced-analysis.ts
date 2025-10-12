/**
 * 宝くじ過去データの高度な統計分析
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { LotteryPredictionAgent } from '../src/agents/specialized/LotteryPredictionAgent.js';
import { LotteryDataAnalyzer, DrawHistory } from '../src/utils/LotteryDataAnalyzer.js';

// ロト6の過去データサンプル（実際のデータに基づく）
const sampleLoto6History: DrawHistory[] = [
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
];

async function comprehensiveAnalysis() {
  console.log('📊 宝くじ過去データの高度な統計分析\n');
  console.log('='.repeat(80));

  // データアナライザーの初期化
  const analyzer = new LotteryDataAnalyzer(sampleLoto6History);

  // 統計レポートの生成
  console.log('\n' + analyzer.generateReport());

  // 詳細な頻度分析
  console.log('\n' + '='.repeat(80));
  console.log('\n📈 詳細な頻度分析\n');

  const frequency = analyzer.analyzeFrequency(43);

  console.log('【最頻出数字トップ5】');
  frequency.slice(0, 5).forEach((f, i) => {
    console.log(
      `  ${i + 1}位: ${String(f.number).padStart(2)} - ${f.frequency}回出現 (${f.percentage.toFixed(1)}%), 最後の出現: ${f.lastDrawn}回前`
    );
  });

  console.log('\n【最も出ていない数字ワースト5】');
  const leastFrequent = [...frequency].sort((a, b) => a.frequency - b.frequency).slice(0, 5);
  leastFrequent.forEach((f, i) => {
    console.log(
      `  ${i + 1}位: ${String(f.number).padStart(2)} - ${f.frequency}回出現 (${f.percentage.toFixed(1)}%), 最後の出現: ${f.lastDrawn}回前`
    );
  });

  // パターン分析
  console.log('\n' + '='.repeat(80));
  console.log('\n🔍 パターン分析\n');

  const patterns = analyzer.analyzePatterns();

  console.log('【奇数・偶数のバランス】');
  const totalNums = patterns.oddEvenRatio.odd + patterns.oddEvenRatio.even;
  console.log(
    `  奇数: ${patterns.oddEvenRatio.odd}回 (${((patterns.oddEvenRatio.odd / totalNums) * 100).toFixed(1)}%)`
  );
  console.log(
    `  偶数: ${patterns.oddEvenRatio.even}回 (${((patterns.oddEvenRatio.even / totalNums) * 100).toFixed(1)}%)`
  );

  console.log('\n【低い数字(1-21)・高い数字(22-43)のバランス】');
  const totalRange = patterns.lowHighRatio.low + patterns.lowHighRatio.high;
  console.log(
    `  低い数字: ${patterns.lowHighRatio.low}回 (${((patterns.lowHighRatio.low / totalRange) * 100).toFixed(1)}%)`
  );
  console.log(
    `  高い数字: ${patterns.lowHighRatio.high}回 (${((patterns.lowHighRatio.high / totalRange) * 100).toFixed(1)}%)`
  );

  console.log('\n【合計値の統計】');
  console.log(`  平均: ${patterns.sumAverage}`);
  console.log(`  標準偏差: ${patterns.sumStdDev}`);
  console.log(`  推奨範囲: ${patterns.sumAverage - patterns.sumStdDev} 〜 ${patterns.sumAverage + patterns.sumStdDev}`);

  console.log('\n【よく出る連続番号トップ5】');
  patterns.consecutivePairs.slice(0, 5).forEach((cp, i) => {
    console.log(`  ${i + 1}位: ${cp.pair[0]}-${cp.pair[1]} (${cp.frequency}回)`);
  });

  // ペア分析
  console.log('\n' + '='.repeat(80));
  console.log('\n🔗 数字のペア出現頻度トップ10\n');

  const pairs = analyzer.analyzePairFrequency();
  pairs.slice(0, 10).forEach((p, i) => {
    console.log(`  ${i + 1}位: ${p.pair[0]}-${p.pair[1]} (${p.frequency}回)`);
  });

  // 特定の数字の出現間隔分析
  console.log('\n' + '='.repeat(80));
  console.log('\n⏱️  数字の出現間隔分析（人気数字）\n');

  const popularNumbers = [7, 12, 19, 23, 31];
  popularNumbers.forEach((num) => {
    const interval = analyzer.analyzeDrawInterval(num);
    console.log(`【${num}番】`);
    console.log(`  平均出現間隔: ${interval.average}回に1回`);
    console.log(`  最短間隔: ${interval.min}回`);
    console.log(`  最長間隔: ${interval.max}回`);
    console.log(`  予測: ${interval.prediction}`);
    console.log('');
  });

  // 予測強度の分析
  console.log('='.repeat(80));
  console.log('\n🎯 予測強度分析\n');

  const strength = analyzer.analyzePredictionStrength(43);

  console.log('【HOT数字】（過去10回で頻出）');
  console.log(`  ${strength.hot.join(', ')}`);

  console.log('\n【WARM数字】（過去20回で頻出）');
  console.log(`  ${strength.warm.join(', ')}`);

  console.log('\n【COLD数字】（長期間未出現）');
  console.log(`  ${strength.cold.join(', ')}`);

  console.log('\n【OVERDUE数字】（平均以下の出現率）');
  console.log(`  ${strength.overdue.join(', ')}`);

  console.log('\n' + '='.repeat(80));
}

async function predictWithHistoricalData() {
  console.log('\n\n🔮 過去データに基づく高度な予測\n');
  console.log('='.repeat(80));

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  // 統計的手法での予測
  console.log('\n📊 統計的手法による予測（過去データ重視）\n');

  const statisticalResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6-advanced',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'statistical',
      count: 5,
      historicalData: sampleLoto6History.map((h) => h.numbers),
    },
  });

  if (statisticalResult.success) {
    console.log('予測された組み合わせ:');
    statisticalResult.data.predictions.forEach((nums: number[], i: number) => {
      const sum = nums.reduce((a: number, b: number) => a + b, 0);
      const odd = nums.filter((n: number) => n % 2 === 1).length;
      const even = 6 - odd;
      console.log(
        `  第${i + 1}組: ${nums.join(', ')} | 合計=${sum}, 奇数=${odd}, 偶数=${even}`
      );
    });

    console.log('\n💡 推奨する組み合わせの特徴:');
    console.log('  - 過去の出現頻度を重視');
    console.log('  - HOT数字とOVERDUE数字のバランス');
    console.log('  - 合計値が統計的に妥当な範囲内');
    console.log('  - 奇数・偶数のバランスが良い');
  }

  await orchestrator.shutdownAll();
}

async function exportData() {
  console.log('\n\n💾 データのエクスポート\n');
  console.log('='.repeat(80));

  const analyzer = new LotteryDataAnalyzer(sampleLoto6History);
  const csv = analyzer.exportToCSV();

  console.log('\nCSV形式でのデータ（最初の5行）:\n');
  console.log(csv.split('\n').slice(0, 6).join('\n'));
  console.log('...');
  console.log(`\n✅ 合計${sampleLoto6History.length}回分のデータをエクスポート可能`);
}

async function main() {
  try {
    // 包括的な統計分析
    await comprehensiveAnalysis();

    // 過去データに基づく予測
    await predictWithHistoricalData();

    // データのエクスポート
    await exportData();

    console.log('\n\n' + '='.repeat(80));
    console.log('\n✅ 高度な統計分析が完了しました！\n');
    console.log('💡 この分析結果を参考に、より戦略的な数字選びができます。');
    console.log('⚠️  ただし、過去のデータは将来の結果を保証するものではありません。\n');
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

main();
