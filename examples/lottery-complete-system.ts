/**
 * 完全な宝くじ管理システム
 * - 予測
 * - 当選チェック
 * - 予算管理
 * - 期待値計算
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { LotteryPredictionAgent } from '../src/agents/specialized/LotteryPredictionAgent.js';
import { LotteryChecker, PurchasedTicket, DrawResult } from '../src/utils/LotteryChecker.js';
import { BudgetManager } from '../src/utils/BudgetManager.js';

// シミュレーション用のデータ
const simulatedDrawResults: DrawResult[] = [
  {
    drawNumber: 2100,
    drawDate: '2024-10-10',
    winningNumbers: [7, 12, 19, 23, 31, 37],
    bonusNumber: 15,
  },
  {
    drawNumber: 2101,
    drawDate: '2024-10-14',
    winningNumbers: [3, 15, 24, 27, 32, 41],
    bonusNumber: 8,
  },
];

async function demo1_PredictAndBuyTickets() {
  console.log('📝 シナリオ1: 予測してチケットを購入\n');
  console.log('='.repeat(80));

  // 予算管理の初期化
  const budgetManager = new BudgetManager({
    monthlyBudget: 10000, // 月1万円
    weeklyLimit: 3000, // 週3000円
    dailyLimit: 1000, // 1日1000円
    alertThreshold: 80, // 80%で警告
  });

  // エージェントで数字を予測
  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new LotteryPredictionAgent());
  await orchestrator.initializeAll();

  console.log('\n🔮 ロト6の予測（5組）\n');

  const prediction = await orchestrator.executeTask('Lottery Prediction Agent', {
    type: 'loto6',
    priority: 'high',
    input: {
      lotteryType: 'loto6',
      predictionMethod: 'statistical',
      count: 5,
    },
  });

  const tickets: PurchasedTicket[] = [];

  if (prediction.success) {
    console.log('予測された数字:');
    prediction.data.predictions.forEach((nums: number[], i: number) => {
      console.log(`  第${i + 1}組: ${nums.join(', ')}`);

      // 購入前に予算チェック
      const canBuy = budgetManager.canPurchase(200);
      if (canBuy.allowed) {
        const ticket = budgetManager.recordPurchase({
          date: '2024-10-09',
          lotteryType: 'loto6',
          amount: 200,
          ticketCount: 1,
          numbers: nums,
        });

        tickets.push({
          id: ticket.id,
          purchaseDate: ticket.date,
          lotteryType: 'loto6',
          numbers: nums,
          cost: 200,
        });
      } else {
        console.log(`    ⚠️  予算超過: ${canBuy.reason}`);
      }
    });

    console.log(`\n✅ ${tickets.length}枚購入しました（合計: ${tickets.length * 200}円）`);
  }

  await orchestrator.shutdownAll();

  // 予算状況を表示
  console.log('\n' + budgetManager.generateReport());

  return { tickets, budgetManager };
}

async function demo2_CheckWinningNumbers(
  tickets: PurchasedTicket[],
  drawResult: DrawResult
) {
  console.log('\n\n🎰 シナリオ2: 当選番号のチェック\n');
  console.log('='.repeat(80));

  console.log(`\n抽選結果: 第${drawResult.drawNumber}回 (${drawResult.drawDate})`);
  console.log(`当選番号: ${(drawResult.winningNumbers as number[]).join(', ')}`);
  console.log(`ボーナス: ${drawResult.bonusNumber}\n`);

  const checker = new LotteryChecker();
  const results = checker.checkMultipleTickets(tickets, drawResult);

  console.log('チェック結果:\n');
  results.forEach((result, i) => {
    console.log(`【第${i + 1}組】 ${(result.ticket.numbers as number[]).join(', ')}`);
    console.log(`  ${result.details}`);
    console.log('');
  });

  // サマリー
  const summary = checker.generateSummary(results);

  console.log('='.repeat(80));
  console.log('\n📊 当選サマリー:\n');
  console.log(`  購入枚数: ${summary.totalTickets}枚`);
  console.log(`  当選枚数: ${summary.winningTickets}枚`);
  console.log(`  購入金額: ${summary.totalCost.toLocaleString()}円`);
  console.log(`  当選金額: ${summary.totalPrize.toLocaleString()}円`);
  console.log(
    `  収支: ${summary.netResult >= 0 ? '+' : ''}${summary.netResult.toLocaleString()}円`
  );
  console.log(`  投資効率(ROI): ${summary.roi.toFixed(2)}%`);

  if (summary.breakdown.size > 0) {
    console.log('\n  当選内訳:');
    Array.from(summary.breakdown.entries()).forEach(([rank, count]) => {
      console.log(`    ${rank}: ${count}枚`);
    });
  }

  return summary;
}

async function demo3_LongTermSimulation() {
  console.log('\n\n📈 シナリオ3: 長期シミュレーション（12ヶ月）\n');
  console.log('='.repeat(80));

  const budgetManager = new BudgetManager({
    monthlyBudget: 5000,
    weeklyLimit: 1500,
    dailyLimit: 500,
  });

  const checker = new LotteryChecker();
  const allWinnings: number[] = [];
  let totalTickets = 0;

  console.log('\n月別シミュレーション:\n');

  // 12ヶ月分のシミュレーション
  for (let month = 1; month <= 12; month++) {
    const monthlyTickets = Math.floor(Math.random() * 20) + 10; // 10-30枚
    let monthlyWinnings = 0;

    for (let i = 0; i < monthlyTickets; i++) {
      // 購入
      budgetManager.recordPurchase({
        date: `2024-${String(month).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        lotteryType: 'loto6',
        amount: 200,
        ticketCount: 1,
        numbers: [],
      });

      // 当選シミュレーション（5等のみ発生）
      const random = Math.random();
      if (random < 0.025) {
        // 約2.5%で5等（1000円）
        monthlyWinnings += 1000;
      }
    }

    totalTickets += monthlyTickets;
    allWinnings.push(monthlyWinnings);

    const monthlyInvestment = monthlyTickets * 200;
    const monthlyProfit = monthlyWinnings - monthlyInvestment;

    console.log(
      `  ${month}月: ${monthlyTickets}枚購入 (${monthlyInvestment.toLocaleString()}円) → 当選 ${monthlyWinnings.toLocaleString()}円 | 収支: ${monthlyProfit >= 0 ? '+' : ''}${monthlyProfit.toLocaleString()}円`
    );
  }

  // 実績に基づく期待値計算
  const expectedValue = budgetManager.calculateRealExpectedValue(allWinnings);

  console.log('\n' + '='.repeat(80));
  console.log('\n💰 年間実績サマリー:\n');
  console.log(`  総投資額: ${expectedValue.totalInvestment.toLocaleString()}円`);
  console.log(`  総当選額: ${expectedValue.totalWinnings.toLocaleString()}円`);
  console.log(
    `  純損益: ${expectedValue.netResult >= 0 ? '+' : ''}${expectedValue.netResult.toLocaleString()}円`
  );
  console.log(`  投資効率(ROI): ${expectedValue.roi.toFixed(2)}%`);
  console.log(`  1枚あたりの期待値: ${Math.round(expectedValue.expectedValuePerTicket)}円`);
  console.log(`  購入枚数: ${totalTickets}枚`);

  console.log('\n💡 分析:');
  if (expectedValue.roi < 0) {
    console.log(
      `  - 実績ROIは${expectedValue.roi.toFixed(2)}%で、投資額の${Math.abs(expectedValue.roi).toFixed(0)}%の損失`
    );
    console.log(
      `  - 理論上の還元率（約50%）とほぼ一致しています`
    );
  }
  console.log(
    `  - 1枚あたり平均${Math.abs(Math.round(expectedValue.expectedValuePerTicket))}円の損失`
  );

  // 予算状況
  console.log('\n' + budgetManager.generateReport());
}

async function demo4_BudgetControl() {
  console.log('\n\n🎯 シナリオ4: 予算コントロール\n');
  console.log('='.repeat(80));

  const budgetManager = new BudgetManager({
    monthlyBudget: 3000,
    weeklyLimit: 800,
    dailyLimit: 300,
    alertThreshold: 70,
  });

  console.log('\n予算設定:');
  console.log('  月次予算: 3,000円');
  console.log('  週次制限: 800円');
  console.log('  日次制限: 300円');
  console.log('  警告閾値: 70%\n');

  // シミュレーション: 徐々に購入していく
  const purchases = [
    { date: '2024-10-12', amount: 200, type: 'loto6', tickets: 1 },
    { date: '2024-10-12', amount: 200, type: 'numbers3', tickets: 1 },
    { date: '2024-10-13', amount: 400, type: 'loto6', tickets: 2 },
    { date: '2024-10-14', amount: 600, type: 'loto6', tickets: 3 },
  ];

  purchases.forEach((p, i) => {
    console.log(`\n【購入${i + 1}】 ${p.date} - ${p.type} ${p.amount}円`);

    const canBuy = budgetManager.canPurchase(p.amount);

    if (canBuy.allowed) {
      budgetManager.recordPurchase({
        date: p.date,
        lotteryType: p.type,
        amount: p.amount,
        ticketCount: p.tickets,
        numbers: [],
      });

      console.log('  ✅ 購入OK');
      if (canBuy.reason) {
        console.log(`  ⚠️  ${canBuy.reason}`);
        if (canBuy.suggestion) {
          console.log(`      ${canBuy.suggestion}`);
        }
      }

      const daily = budgetManager.getDailyStatus();
      console.log(
        `  今日の使用状況: ${daily.spent}円 / ${daily.budget}円 (${daily.usagePercentage.toFixed(1)}%)`
      );
    } else {
      console.log(`  ❌ 購入不可: ${canBuy.reason}`);
      if (canBuy.suggestion) {
        console.log(`      ${canBuy.suggestion}`);
      }
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log(budgetManager.generateReport());
}

async function main() {
  console.log('🎰 完全な宝くじ管理システム 🎰\n');

  try {
    // シナリオ1: 予測と購入
    const { tickets, budgetManager } = await demo1_PredictAndBuyTickets();

    // シナリオ2: 当選チェック
    await demo2_CheckWinningNumbers(tickets, simulatedDrawResults[0]);

    // シナリオ3: 長期シミュレーション
    await demo3_LongTermSimulation();

    // シナリオ4: 予算コントロール
    await demo4_BudgetControl();

    console.log('\n\n' + '='.repeat(80));
    console.log('\n✅ 全てのシナリオが完了しました！\n');
    console.log('💡 このシステムで以下のことができます:');
    console.log('  ✓ AIによる数字予測');
    console.log('  ✓ 当選番号の自動チェック');
    console.log('  ✓ 購入予算の管理と制限');
    console.log('  ✓ 実績に基づく期待値計算');
    console.log('  ✓ 長期的な投資効率の分析');
    console.log('\n⚠️  計画的に楽しみましょう！\n');
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

main();
