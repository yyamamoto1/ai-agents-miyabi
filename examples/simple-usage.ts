/**
 * シンプルな使用例
 * このファイルを編集して、好きなタスクを試せます
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { AIWriterAgent } from '../src/agents/creative/AIWriterAgent.js';
import { AIEngineerAgent } from '../src/agents/development/AIEngineerAgent.js';
import { BusinessLauncherAgent } from '../src/agents/business/BusinessLauncherAgent.js';

async function example1_blogPost() {
  console.log('=== 例1: ブログ記事を書いてもらう ===\n');

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new AIWriterAgent());
  await orchestrator.initializeAll();

  const result = await orchestrator.executeTask('AI Writer', {
    type: 'blog-post',
    priority: 'high',
    input: {
      contentType: 'blog',
      topic: 'AIエージェントで業務効率化',
      tone: 'professional',
      length: 'medium',
      keywords: ['AI', '自動化', '効率化'],
      language: 'ja',
    },
  });

  if (result.success) {
    console.log('✅ 記事が生成されました！\n');
    console.log(result.data.content);
    console.log('\n---');
    console.log(`文字数: ${result.data.metadata.wordCount}`);
  }

  await orchestrator.shutdownAll();
}

async function example2_codeGeneration() {
  console.log('\n\n=== 例2: コードを生成してもらう ===\n');

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new AIEngineerAgent());
  await orchestrator.initializeAll();

  const result = await orchestrator.executeTask('AI Engineer', {
    type: 'code-gen',
    priority: 'high',
    input: {
      taskType: 'generate',
      language: 'typescript',
      description: 'REST APIのエンドポイント（ユーザー一覧取得）',
      requirements: [
        'ページネーション対応',
        'エラーハンドリング',
        'バリデーション',
      ],
      framework: 'Express',
    },
  });

  if (result.success) {
    console.log('✅ コードが生成されました！\n');
    console.log(result.data.code);
    console.log('\n提案:');
    result.data.suggestions.forEach((s: string) => console.log(`  - ${s}`));
  }

  await orchestrator.shutdownAll();
}

async function example3_businessPlan() {
  console.log('\n\n=== 例3: 事業計画を作ってもらう ===\n');

  const orchestrator = new AgentOrchestrator({ enableLogging: false });
  orchestrator.registerAgent(new BusinessLauncherAgent());
  await orchestrator.initializeAll();

  const result = await orchestrator.executeTask('AI Business Launcher', {
    type: 'planning',
    priority: 'critical',
    input: {
      businessIdea: 'オンライン料理教室プラットフォーム',
      targetMarket: '料理初心者の20-40代',
      budget: 5000000,
      timeline: '6ヶ月',
      objectives: [
        'ユーザー1000人獲得',
        '講師50人登録',
        '月次収益100万円',
      ],
    },
  });

  if (result.success) {
    console.log('✅ 事業計画が作成されました！\n');
    console.log(`期間: ${result.data.roadmap.totalDuration}\n`);

    result.data.roadmap.phases.forEach((phase: any) => {
      console.log(`\n📋 ${phase.name} (${phase.duration})`);
      console.log('目標:');
      phase.objectives.forEach((obj: string) => console.log(`  • ${obj}`));

      console.log('マイルストーン:');
      phase.milestones.forEach((m: any) => {
        console.log(`  📍 ${m.name} - ${m.deadline}`);
      });
    });

    console.log('\n\n💡 推奨事項:');
    result.data.recommendations.forEach((rec: string) => {
      console.log(`  • ${rec}`);
    });
  }

  await orchestrator.shutdownAll();
}

// 実行したい例を選択（コメントアウトで切り替え）
async function main() {
  try {
    // 例1: ブログ記事生成
    await example1_blogPost();

    // 例2: コード生成
    await example2_codeGeneration();

    // 例3: 事業計画作成
    await example3_businessPlan();
  } catch (error) {
    console.error('エラー:', error);
  }
}

main();
