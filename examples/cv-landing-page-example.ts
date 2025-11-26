/**
 * CV獲得ランディングページ制作チーム実行例
 */

import { CVLandingPageTeam } from '../src/teams/CVLandingPageTeam.js';
import { CVOptimizationTemplates } from '../src/templates/CVOptimizationTemplates.js';

async function runCVLandingPageProject() {
  console.log('🚀 CV獲得ランディングページプロジェクト開始');
  
  // チーム初期化
  const cvTeam = new CVLandingPageTeam();
  
  // プロジェクト設定
  const projectInput = {
    projectName: "AI営業支援SaaS無料トライアル獲得LP",
    businessGoal: {
      primaryObjective: 'trial-signup' as const,
      targetCVR: 5.5,
      targetCV: 1000,
      timeframe: '3months',
      industry: 'B2B-SaaS',
      productType: 'B2B-SaaS' as const
    },
    targetMarket: {
      primarySegment: 'IT・営業部門責任者',
      demographics: {
        ageRange: '35-50歳',
        income: '800-1200万円',
        jobTitle: '部長・課長・マネージャー',
        companySize: '従業員100-1000名'
      },
      painPoints: [
        '営業活動の属人化',
        'リード管理の煩雑さ',
        '売上予測の困難',
        '営業効率の低さ'
      ],
      motivations: [
        '営業生産性向上',
        'データドリブン営業',
        '売上予測精度向上',
        'チーム管理効率化'
      ]
    },
    budget: {
      total: 5000000,
      allocation: {
        development: 2000000,
        advertising: 2500000,
        tools: 300000,
        testing: 200000
      }
    },
    timeline: {
      phases: [
        {
          name: '戦略立案フェーズ',
          duration: '1week',
          deliverables: ['CV戦略書', 'ターゲット分析', 'KPI設計', '競合分析']
        },
        {
          name: 'LP制作フェーズ',
          duration: '2weeks',
          deliverables: ['LP設計', 'CVR最適化案', 'A/Bテスト設計']
        },
        {
          name: 'コピー最適化フェーズ',
          duration: '1week',
          deliverables: ['ヘッドライン最適化', '価値提案', 'CTA最適化']
        },
        {
          name: 'マーケティング戦略フェーズ',
          duration: '1week',
          deliverables: ['集客戦略', 'チャネル最適化', '予算配分']
        },
        {
          name: '分析・測定設定フェーズ',
          duration: '3days',
          deliverables: ['KPIダッシュボード', '分析設定', '改善提案']
        }
      ]
    },
    currentPerformance: {
      currentCVR: 2.1,
      currentTraffic: 5000,
      currentCV: 105
    }
  };

  try {
    // 🎯 プロジェクト全体実行
    console.log('\n📊 プロジェクト実行中...');
    const result = await cvTeam.executeProject(projectInput);
    
    console.log('\n✅ プロジェクト完了！');
    console.log('📋 実行結果サマリー:');
    console.log(`- 戦略: ${result.strategy?.type || '完了'}`);
    console.log(`- LP設計: ${result.landingPage?.design?.type || '完了'}`);
    console.log(`- コピー最適化: ${result.copyOptimization?.headline?.type || '完了'}`);
    console.log(`- マーケティング: ${result.marketingPlan?.type || '完了'}`);
    console.log(`- 分析設定: ${result.analyticsSetup?.type || '完了'}`);
    
    console.log('\n🎯 主要推奨アクション:');
    result.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    // 📊 業界テンプレート確認
    console.log('\n📚 業界別最適化テンプレート確認:');
    const industryTemplate = CVOptimizationTemplates.getIndustryTemplate('B2B-SaaS');
    console.log(`- 目標CVR: ${industryTemplate.targetCVR}%`);
    console.log(`- 主要メッセージ: ${industryTemplate.keyMessages.join(', ')}`);
    console.log(`- CTA パターン数: ${industryTemplate.ctaPatterns.length}`);

    // 🔄 進捗監視設定
    console.log('\n🔄 進捗監視開始...');
    const progressMonitor = await cvTeam.monitorProgress('cv-project-001');
    console.log(`現在フェーズ: ${progressMonitor.currentPhase}`);
    console.log(`次のマイルストーン: ${progressMonitor.nextMilestone}`);

    return result;

  } catch (error) {
    console.error('❌ プロジェクト実行エラー:', error);
    throw error;
  }
}

// 🎪 段階的実行デモ
async function runStepByStepDemo() {
  console.log('\n🔧 段階的実行デモ');
  
  const cvTeam = new CVLandingPageTeam();
  
  const sampleInput = {
    projectName: "ステップバイステップデモ",
    businessGoal: {
      primaryObjective: 'lead-generation' as const,
      targetCVR: 4.0,
      targetCV: 500,
      timeframe: '2months',
      industry: 'Education',
      productType: 'Course' as const
    },
    targetMarket: {
      primarySegment: 'キャリアチェンジ希望者',
      demographics: { ageRange: '25-35歳' },
      painPoints: ['スキル不足', '転職不安'],
      motivations: ['キャリアアップ', 'スキル習得']
    },
    budget: {
      total: 3000000,
      allocation: { development: 1000000, advertising: 1500000, tools: 300000, testing: 200000 }
    },
    timeline: {
      phases: [
        { name: 'デモフェーズ', duration: '1week', deliverables: ['デモ成果物'] }
      ]
    }
  };

  // Phase 1: 戦略立案
  console.log('\n📋 Phase 1: 戦略立案中...');
  const strategy = await cvTeam['planStrategy'](sampleInput);
  console.log(`✅ 戦略立案完了: ${strategy.type}`);

  // Phase 2: LP設計
  console.log('\n🎨 Phase 2: LP設計中...');
  const landingPage = await cvTeam['designLandingPage'](sampleInput, strategy);
  console.log(`✅ LP設計完了: ${landingPage.design?.type}`);

  // Phase 3: コピー最適化
  console.log('\n✍️ Phase 3: コピー最適化中...');
  const copyOptimization = await cvTeam['optimizeCopy'](sampleInput, landingPage);
  console.log(`✅ コピー最適化完了: ${copyOptimization.headline?.type}`);

  console.log('\n🎉 段階的実行デモ完了！');
}

// 🔧 テンプレート活用デモ
function demonstrateTemplates() {
  console.log('\n📚 CV最適化テンプレートデモ');
  
  // 業界別テンプレート
  const industries = ['B2B-SaaS', 'Ecommerce', 'Education', 'Healthcare', 'Financial'];
  
  industries.forEach(industry => {
    const template = CVOptimizationTemplates.getIndustryTemplate(industry);
    console.log(`\n🏢 ${industry}:`);
    console.log(`- CV目標: ${template.primaryCVGoal}`);
    console.log(`- 目標CVR: ${template.targetCVR}%`);
    console.log(`- 主要メッセージ: ${template.keyMessages.slice(0, 2).join(', ')}...`);
    console.log(`- CTA種類: ${template.ctaPatterns.length}パターン`);
    console.log(`- 最適化フォーカス: ${template.optimizationFocus.length}エリア`);
  });

  // CVRパターン別最適化
  console.log('\n🎯 CVRパターン別最適化:');
  const patterns = CVOptimizationTemplates.getCVROptimizationPatterns();
  Object.keys(patterns).forEach(pattern => {
    const config = patterns[pattern];
    console.log(`- ${pattern}: ${config.strategy} (意思決定時間: ${config.timeToDecision})`);
  });

  // A/Bテスト優先順位
  console.log('\n🧪 A/Bテスト優先順位:');
  const testPriorities = CVOptimizationTemplates.getABTestPriorities();
  testPriorities.slice(0, 3).forEach((test, index) => {
    console.log(`${index + 1}. ${test.testArea} (期待インパクト: ${test.expectedImpact})`);
  });
}

// 🚀 メイン実行
async function main() {
  console.log('🎊 CV獲得ランディングページ制作チーム デモ開始！');
  
  try {
    // 1. テンプレート確認
    demonstrateTemplates();
    
    // 2. 段階的実行デモ
    await runStepByStepDemo();
    
    // 3. フルプロジェクト実行
    await runCVLandingPageProject();
    
    console.log('\n🎉 すべてのデモが正常に完了しました！');
    
  } catch (error) {
    console.error('❌ デモ実行エラー:', error);
  }
}

// 実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  runCVLandingPageProject,
  runStepByStepDemo,
  demonstrateTemplates
};