/**
 * 宝くじ予測・期待値計算の使用例
 * ロト6、ナンバーズ3、ナンバーズ4の予測と分析
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { LotteryPredictionAgent } from '../src/agents/specialized/LotteryPredictionAgent.js';

async function predictLoto6() {
  console.log('🎰 ロト6予測 - 1〜43から6つの数字を選ぶ\n');
  console.log('─'.repeat(70));

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  // ランダム予測
  console.log('\n📊 【方法1】ランダム予測（5組）');
  const randomResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6-prediction',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'random',
      count: 5,
    },
  });

  if (randomResult.success) {
    console.log('\n予測された数字:');
    randomResult.data.predictions.forEach((nums: number[], i: number) => {
      console.log(`  第${i + 1}組: ${nums.join(', ')}`);
    });

    console.log('\n📈 統計情報:');
    console.log(`  総組み合わせ数: ${randomResult.data.statistics.totalCombinations.toLocaleString()}通り`);
    console.log(`  1等当選確率: 1/${randomResult.data.statistics.totalCombinations.toLocaleString()}`);
    console.log(`  期待値: ${Math.round(randomResult.data.statistics.expectedValue)}円 (1口200円)`);

    console.log('\n💡 分析:');
    console.log(`  よく出る数字 (HOT): ${randomResult.data.analysis.hotNumbers.slice(0, 5).join(', ')}`);
    console.log(`  出にくい数字 (COLD): ${randomResult.data.analysis.coldNumbers.slice(0, 5).join(', ')}`);
  }

  // 頻度ベース予測
  console.log('\n\n📊 【方法2】頻度ベース予測（3組）');
  const frequencyResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6-prediction',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'frequency',
      count: 3,
    },
  });

  if (frequencyResult.success) {
    console.log('\n予測された数字（頻出数字を優先）:');
    frequencyResult.data.predictions.forEach((nums: number[], i: number) => {
      console.log(`  第${i + 1}組: ${nums.join(', ')}`);
    });
  }

  // HOT/COLDミックス予測
  console.log('\n\n📊 【方法3】HOT/COLDミックス予測（3組）');
  const hotColdResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6-prediction',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'hot-cold',
      count: 3,
    },
  });

  if (hotColdResult.success) {
    console.log('\n予測された数字（HOT 4つ + COLD 2つ）:');
    hotColdResult.data.predictions.forEach((nums: number[], i: number) => {
      console.log(`  第${i + 1}組: ${nums.join(', ')}`);
    });
  }

  await orchestrator.shutdownAll();
  console.log('\n' + '─'.repeat(70));
}

async function predictNumbers3() {
  console.log('\n\n🎲 ナンバーズ3予測 - 000〜999の3桁数字\n');
  console.log('─'.repeat(70));

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  // ストレート
  console.log('\n📊 【ストレート】予測（5組）');
  const straightResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'numbers3-prediction',
    priority: 'high',
    input: {
      lotteryType: 'numbers3',
      numbers3DrawType: 'straight',
      count: 5,
    },
  });

  if (straightResult.success) {
    console.log('\n予測された数字:');
    straightResult.data.predictions.forEach((num: string, i: number) => {
      console.log(`  第${i + 1}組: ${num}`);
    });

    console.log('\n📈 統計情報:');
    console.log(`  総組み合わせ数: ${straightResult.data.statistics.totalCombinations}通り`);
    console.log(`  当選確率: ${(straightResult.data.statistics.probability * 100).toFixed(3)}%`);
    console.log(`  賞金（ストレート）: ${straightResult.data.statistics.prize.straight?.toLocaleString()}円`);
    console.log(`  期待値: ${Math.round(straightResult.data.statistics.expectedValue)}円 (1口200円)`);
  }

  // ボックス
  console.log('\n\n📊 【ボックス】予測（5組）');
  const boxResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'numbers3-prediction',
    priority: 'high',
    input: {
      lotteryType: 'numbers3',
      numbers3DrawType: 'box',
      count: 5,
    },
  });

  if (boxResult.success) {
    console.log('\n予測された数字:');
    boxResult.data.predictions.forEach((num: string, i: number) => {
      console.log(`  第${i + 1}組: ${num}`);
    });
    console.log(`\n  賞金（ボックス）: ${boxResult.data.statistics.prize.box?.toLocaleString()}円`);
    console.log(`  期待値: ${Math.round(boxResult.data.statistics.expectedValue)}円`);
  }

  // ミニ
  console.log('\n\n📊 【ミニ】予測（5組）');
  const miniResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'numbers3-prediction',
    priority: 'high',
    input: {
      lotteryType: 'numbers3',
      numbers3DrawType: 'mini',
      count: 5,
    },
  });

  if (miniResult.success) {
    console.log('\n予測された数字:');
    miniResult.data.predictions.forEach((num: string, i: number) => {
      console.log(`  第${i + 1}組: ${num}`);
    });
    console.log(`\n  賞金（ミニ）: ${miniResult.data.statistics.prize.mini?.toLocaleString()}円`);
    console.log(`  期待値: ${Math.round(miniResult.data.statistics.expectedValue)}円`);
  }

  await orchestrator.shutdownAll();
  console.log('\n' + '─'.repeat(70));
}

async function predictNumbers4() {
  console.log('\n\n🎲 ナンバーズ4予測 - 0000〜9999の4桁数字\n');
  console.log('─'.repeat(70));

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  // ストレート
  console.log('\n📊 【ストレート】予測（5組）');
  const straightResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'numbers4-prediction',
    priority: 'high',
    input: {
      lotteryType: 'numbers4',
      numbers4DrawType: 'straight',
      count: 5,
    },
  });

  if (straightResult.success) {
    console.log('\n予測された数字:');
    straightResult.data.predictions.forEach((num: string, i: number) => {
      console.log(`  第${i + 1}組: ${num}`);
    });

    console.log('\n📈 統計情報:');
    console.log(`  総組み合わせ数: ${straightResult.data.statistics.totalCombinations.toLocaleString()}通り`);
    console.log(`  当選確率: ${(straightResult.data.statistics.probability * 100).toFixed(4)}%`);
    console.log(`  賞金（ストレート）: ${straightResult.data.statistics.prize.straight?.toLocaleString()}円`);
    console.log(`  期待値: ${Math.round(straightResult.data.statistics.expectedValue)}円 (1口200円)`);
  }

  // ボックス
  console.log('\n\n📊 【ボックス】予測（5組）');
  const boxResult = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'numbers4-prediction',
    priority: 'high',
    input: {
      lotteryType: 'numbers4',
      numbers4DrawType: 'box',
      count: 5,
    },
  });

  if (boxResult.success) {
    console.log('\n予測された数字:');
    boxResult.data.predictions.forEach((num: string, i: number) => {
      console.log(`  第${i + 1}組: ${num}`);
    });
    console.log(`\n  賞金（ボックス）: ${boxResult.data.statistics.prize.box?.toLocaleString()}円`);
    console.log(`  期待値: ${Math.round(boxResult.data.statistics.expectedValue)}円`);
  }

  await orchestrator.shutdownAll();
  console.log('\n' + '─'.repeat(70));
}

async function compareExpectedValues() {
  console.log('\n\n💰 期待値比較表\n');
  console.log('─'.repeat(70));
  console.log('宝くじ種類              | 1口価格 | 当選確率      | 期待値');
  console.log('─'.repeat(70));
  console.log('ロト6 (1等)             | 200円   | 1/6,096,454   | -167円');
  console.log('ナンバーズ3 (ストレート) | 200円   | 1/1,000       | -110円');
  console.log('ナンバーズ3 (ボックス)   | 200円   | 6/1,000       | -110円');
  console.log('ナンバーズ3 (ミニ)       | 200円   | 10/1,000      | -110円');
  console.log('ナンバーズ4 (ストレート) | 200円   | 1/10,000      | -110円');
  console.log('ナンバーズ4 (ボックス)   | 200円   | 24/10,000     | -110円');
  console.log('─'.repeat(70));
  console.log('\n💡 全ての宝くじは期待値がマイナスです（還元率約50%）');
  console.log('💡 購入は娯楽・夢を買うものと考えましょう');
  console.log('💡 ナンバーズ3のミニが最も当選確率が高いです（1%）\n');
}

async function main() {
  console.log('🎰🎲 宝くじ予測・期待値計算システム 🎲🎰\n');

  try {
    // ロト6予測
    await predictLoto6();

    // ナンバーズ3予測
    await predictNumbers3();

    // ナンバーズ4予測
    await predictNumbers4();

    // 期待値比較
    await compareExpectedValues();

    console.log('✅ 全ての予測が完了しました！');
    console.log('\n⚠️  注意: これらの予測は統計的手法に基づくものですが、');
    console.log('   当選を保証するものではありません。自己責任でご利用ください。\n');
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

main();
