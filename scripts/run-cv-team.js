#!/usr/bin/env node

/**
 * CV獲得ランディングページ制作チーム 実行スクリプト
 * 使用方法: node scripts/run-cv-team.js [オプション]
 */

import { CVLandingPageTeam } from '../src/teams/CVLandingPageTeam.js';
import { CVOptimizationTemplates } from '../src/templates/CVOptimizationTemplates.js';

// コマンドライン引数解析
const args = process.argv.slice(2);
const options = {};

args.forEach((arg, index) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    options[key] = value || true;
  }
});

// デフォルトプロジェクト設定
const DEFAULT_PROJECT = {
  projectName: options.name || "CV獲得LP制作プロジェクト",
  businessGoal: {
    primaryObjective: options.goal || 'trial-signup',
    targetCVR: parseFloat(options.cvr) || 5.0,
    targetCV: parseInt(options.target) || 1000,
    timeframe: options.timeframe || '3months',
    industry: options.industry || 'B2B-SaaS',
    productType: options.type || 'B2B-SaaS'
  },
  targetMarket: {
    primarySegment: options.segment || 'IT部門責任者',
    demographics: {
      ageRange: '35-50歳',
      income: '800-1200万円'
    },
    painPoints: [
      '業務の非効率性',
      '手作業によるミス',
      'データ分析の困難'
    ],
    motivations: [
      '業務効率化',
      'コスト削減',
      '競争優位性確保'
    ]
  },
  budget: {
    total: parseInt(options.budget) || 5000000,
    allocation: {
      development: Math.floor((parseInt(options.budget) || 5000000) * 0.4),
      advertising: Math.floor((parseInt(options.budget) || 5000000) * 0.5),
      tools: Math.floor((parseInt(options.budget) || 5000000) * 0.06),
      testing: Math.floor((parseInt(options.budget) || 5000000) * 0.04)
    }
  },
  timeline: {
    phases: [
      { name: '戦略立案', duration: '1week', deliverables: ['戦略書', 'KPI設計'] },
      { name: 'LP制作', duration: '2weeks', deliverables: ['LP設計', '最適化案'] },
      { name: 'コピー最適化', duration: '1week', deliverables: ['ヘッドライン', 'CTA'] },
      { name: 'マーケティング', duration: '1week', deliverables: ['集客戦略'] },
      { name: '分析設定', duration: '3days', deliverables: ['ダッシュボード'] }
    ]
  }
};

// ヘルプメッセージ
function showHelp() {
  console.log(`
🎯 CV獲得ランディングページ制作チーム 実行スクリプト

使用方法:
  node scripts/run-cv-team.js [オプション]

オプション:
  --help              このヘルプを表示
  --templates         業界別テンプレート一覧表示
  --demo             デモプロジェクト実行
  --step-by-step     段階的実行デモ
  
プロジェクト設定:
  --name=名前         プロジェクト名
  --industry=業界     業界 (B2B-SaaS/Ecommerce/Education/Healthcare/Financial)
  --goal=目標         CV目標 (trial-signup/purchase/consultation/etc)
  --cvr=数値          目標CVR (%)
  --target=数値       目標CV数
  --budget=金額       総予算 (円)
  --timeframe=期間    期間 (3months/6months/1year)

例:
  node scripts/run-cv-team.js --demo
  node scripts/run-cv-team.js --industry=Ecommerce --goal=purchase --cvr=3.5
  node scripts/run-cv-team.js --name="新商品LP" --budget=3000000
`);
}

// テンプレート一覧表示
function showTemplates() {
  console.log('\n📚 業界別CV最適化テンプレート一覧\n');
  
  const industries = ['B2B-SaaS', 'Ecommerce', 'Education', 'Healthcare', 'Financial'];
  
  industries.forEach((industry, index) => {
    const template = CVOptimizationTemplates.getIndustryTemplate(industry);
    
    console.log(`${index + 1}. 🏢 ${industry}`);
    console.log(`   主要CV目標: ${template.primaryCVGoal}`);
    console.log(`   目標CVR: ${template.targetCVR}%`);
    console.log(`   主要メッセージ:`);
    template.keyMessages.slice(0, 3).forEach(msg => {
      console.log(`     • ${msg}`);
    });
    console.log(`   CTA パターン: ${template.ctaPatterns.length}種類`);
    console.log(`   最適化フォーカス: ${template.optimizationFocus.length}エリア\n`);
  });

  console.log('🎯 CVRパターン別最適化戦略:');
  const patterns = CVOptimizationTemplates.getCVROptimizationPatterns();
  Object.entries(patterns).forEach(([pattern, config], index) => {
    console.log(`${index + 1}. ${pattern}`);
    console.log(`   戦略: ${config.strategy}`);
    console.log(`   意思決定時間: ${config.timeToDecision}`);
    console.log(`   重要要素: ${config.decisionFactors.join(', ')}\n`);
  });
}

// デモプロジェクト実行
async function runDemo() {
  console.log('🚀 CV獲得ランディングページ制作チーム デモ開始！\n');
  
  const cvTeam = new CVLandingPageTeam();
  
  const demoProject = {
    ...DEFAULT_PROJECT,
    projectName: "【デモ】SaaS無料トライアル獲得LP"
  };

  try {
    console.log('📊 プロジェクト設定:');
    console.log(`- プロジェクト名: ${demoProject.projectName}`);
    console.log(`- 業界: ${demoProject.businessGoal.industry}`);
    console.log(`- CV目標: ${demoProject.businessGoal.primaryObjective}`);
    console.log(`- 目標CVR: ${demoProject.businessGoal.targetCVR}%`);
    console.log(`- 予算: ${demoProject.budget.total.toLocaleString()}円\n`);

    // プロジェクト実行
    const result = await cvTeam.executeProject(demoProject);
    
    console.log('✅ デモプロジェクト完了！\n');
    console.log('📋 実行結果サマリー:');
    console.log(`- 戦略立案: ${result.strategy?.type || '完了'}`);
    console.log(`- LP設計: ${result.landingPage?.design?.type || '完了'}`);
    console.log(`- コピー最適化: ${result.copyOptimization?.headline?.type || '完了'}`);
    console.log(`- マーケティング: ${result.marketingPlan?.type || '完了'}`);
    console.log(`- 分析設定: ${result.analyticsSetup?.type || '完了'}\n`);
    
    console.log('🎯 主要推奨アクション:');
    result.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    return result;

  } catch (error) {
    console.error('❌ デモ実行エラー:', error.message);
  }
}

// 段階的実行デモ
async function runStepByStep() {
  console.log('🔧 段階的実行デモ開始\n');
  
  const cvTeam = new CVLandingPageTeam();
  const project = DEFAULT_PROJECT;

  try {
    // Phase 1
    console.log('📋 Phase 1: 戦略立案中...');
    const strategy = await cvTeam['planStrategy'](project);
    console.log(`✅ 完了: ${strategy.type}\n`);

    // Phase 2  
    console.log('🎨 Phase 2: LP設計中...');
    const landingPage = await cvTeam['designLandingPage'](project, strategy);
    console.log(`✅ 完了: ${landingPage.design?.type}\n`);

    // Phase 3
    console.log('✍️ Phase 3: コピー最適化中...');
    const copyOptimization = await cvTeam['optimizeCopy'](project, landingPage);
    console.log(`✅ 完了: ${copyOptimization.headline?.type}\n`);

    // Phase 4
    console.log('📊 Phase 4: マーケティング戦略中...');
    const marketing = await cvTeam['planMarketing'](project, strategy);
    console.log(`✅ 完了: ${marketing.type}\n`);

    // Phase 5
    console.log('📈 Phase 5: 分析設定中...');
    const analytics = await cvTeam['setupAnalytics'](project, strategy);
    console.log(`✅ 完了: ${analytics.type}\n`);

    console.log('🎉 段階的実行デモ完了！');

  } catch (error) {
    console.error('❌ 段階的実行エラー:', error.message);
  }
}

// カスタムプロジェクト実行
async function runCustomProject() {
  console.log('🎯 カスタムプロジェクト実行\n');
  
  const cvTeam = new CVLandingPageTeam();
  const customProject = { ...DEFAULT_PROJECT };

  // オプションに基づいて設定調整
  if (options.industry) {
    customProject.businessGoal.industry = options.industry;
    customProject.businessGoal.productType = options.industry;
  }

  try {
    console.log('📊 カスタムプロジェクト設定:');
    console.log(`- 業界: ${customProject.businessGoal.industry}`);
    console.log(`- 目標: ${customProject.businessGoal.primaryObjective}`);
    console.log(`- 目標CVR: ${customProject.businessGoal.targetCVR}%`);
    console.log(`- 予算: ${customProject.budget.total.toLocaleString()}円\n`);

    const result = await cvTeam.executeProject(customProject);
    
    console.log('✅ カスタムプロジェクト完了！');
    console.log('\n🎯 推奨アクション:');
    result.recommendations.slice(0, 5).forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

  } catch (error) {
    console.error('❌ カスタムプロジェクト実行エラー:', error.message);
  }
}

// メイン実行
async function main() {
  console.log('🎊 CV獲得ランディングページ制作チーム\n');

  // オプション処理
  if (options.help) {
    showHelp();
    return;
  }

  if (options.templates) {
    showTemplates();
    return;
  }

  if (options.demo) {
    await runDemo();
    return;
  }

  if (options['step-by-step']) {
    await runStepByStep();
    return;
  }

  // カスタムプロジェクト実行（デフォルト）
  await runCustomProject();
}

// エラーハンドリング
process.on('uncaughtException', (error) => {
  console.error('❌ 予期しないエラー:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未処理のPromise拒否:', reason);
  process.exit(1);
});

// 実行
main().catch(error => {
  console.error('❌ メイン実行エラー:', error.message);
  process.exit(1);
});