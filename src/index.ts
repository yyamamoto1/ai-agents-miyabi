/**
 * AI Agents Miyabi - メインエントリーポイント
 * 各分野に特化したAIエージェントシステム
 */

import { AgentOrchestrator } from './core/AgentOrchestrator.js';
import { AIWriterAgent } from './agents/creative/AIWriterAgent.js';
import { AIEngineerAgent } from './agents/development/AIEngineerAgent.js';
import { BusinessLauncherAgent } from './agents/business/BusinessLauncherAgent.js';

async function main() {
  console.log('🌸 AI Agents Miyabi - Starting...\n');

  // オーケストレーターの初期化
  const orchestrator = new AgentOrchestrator({
    maxConcurrentTasks: 5,
    enableLogging: true,
    autoRetry: true,
  });

  // エージェントの登録
  console.log('📝 Registering agents...');
  orchestrator.registerAgents([
    new AIWriterAgent(),
    new AIEngineerAgent(),
    new BusinessLauncherAgent(),
  ]);

  // 全エージェントの初期化
  await orchestrator.initializeAll();

  // システムステータスの表示
  console.log('\n📊 System Status:');
  const status = orchestrator.getSystemStatus();
  console.log(`Total Agents: ${status.totalAgents}`);
  console.log('\nRegistered Agents:');
  status.agents.forEach((agent) => {
    console.log(`  - ${agent.name} (${agent.role})`);
    console.log(`    Category: ${agent.category}`);
    console.log(`    Status: ${agent.initialized ? '✅ Ready' : '⏳ Pending'}`);
  });

  // デモ: AIライターでブログ記事を生成
  console.log('\n\n=== Demo 1: AI Writer - Blog Post ===');
  const writerResult = await orchestrator.executeTask('AI Writer', {
    type: 'content-generation',
    priority: 'high',
    input: {
      contentType: 'blog',
      topic: 'AIエージェントの未来',
      tone: 'professional',
      length: 'medium',
      keywords: ['AI', 'エージェント', '自動化', '未来'],
      language: 'ja',
    },
  });

  if (writerResult.success) {
    console.log('✅ Content generated successfully');
    console.log('Preview:', writerResult.data.content.substring(0, 200) + '...');
  }

  // デモ: AIエンジニアでコード生成
  console.log('\n\n=== Demo 2: AI Engineer - Code Generation ===');
  const engineerResult = await orchestrator.executeTask('AI Engineer', {
    type: 'code-generation',
    priority: 'high',
    input: {
      taskType: 'generate',
      language: 'typescript',
      description: 'ユーザー認証機能',
      requirements: ['JWT認証', 'パスワードハッシュ化', 'リフレッシュトークン'],
      framework: 'Express',
    },
  });

  if (engineerResult.success) {
    console.log('✅ Code generated successfully');
    console.log('Suggestions:', engineerResult.data.suggestions);
  }

  // デモ: ビジネスランチャーで事業計画作成
  console.log('\n\n=== Demo 3: Business Launcher - Roadmap Creation ===');
  const businessResult = await orchestrator.executeTask('AI Business Launcher', {
    type: 'business-planning',
    priority: 'critical',
    input: {
      businessIdea: 'AI搭載の個人向けタスク管理アプリ',
      targetMarket: '日本国内のビジネスパーソン',
      budget: 5000000,
      timeline: '6ヶ月',
      objectives: [
        'ユーザー1000人獲得',
        '月次収益100万円達成',
        'App Storeで4.5以上の評価',
      ],
    },
  });

  if (businessResult.success) {
    console.log('✅ Business roadmap created successfully');
    console.log('Total Phases:', businessResult.data.roadmap.phases.length);
    console.log('Duration:', businessResult.data.roadmap.totalDuration);
    console.log('\nPhases:');
    businessResult.data.roadmap.phases.forEach((phase: any) => {
      console.log(`  ${phase.name} - ${phase.duration}`);
    });
  }

  // システムのシャットダウン
  console.log('\n\n🔒 Shutting down system...');
  await orchestrator.shutdownAll();
  console.log('✅ System shutdown complete');
}

// エラーハンドリング
main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

// エクスポート
export { AgentOrchestrator } from './core/AgentOrchestrator.js';
export { BaseAgent } from './core/BaseAgent.js';
export { AIWriterAgent } from './agents/creative/AIWriterAgent.js';
export { AIEngineerAgent } from './agents/development/AIEngineerAgent.js';
export { BusinessLauncherAgent } from './agents/business/BusinessLauncherAgent.js';
