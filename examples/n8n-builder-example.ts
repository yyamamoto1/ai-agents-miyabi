/**
 * N8N Builder Agent 使用例
 * n8nワークフロー構築エージェントの実用的な使用例を紹介
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { N8NBuilderAgent } from '../src/agents/development/N8NBuilderAgent.js';

async function main() {
  console.log('🚀 N8N Builder Agent 使用例\n');

  // ========== セットアップ ==========
  const orchestrator = new AgentOrchestrator();
  orchestrator.registerAgent(new N8NBuilderAgent());
  await orchestrator.initializeAll();

  // ========== 例1: ワークフロー設計 ==========
  console.log('\n📋 例1: Slackへの通知ワークフローを設計\n');

  const designResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'high',
    input: {
      taskType: 'design',
      description: 'GitHubにプルリクエストが作成されたらSlackに通知する',
      requirements: [
        'GitHubからWebhookを受信',
        'プルリクエスト情報を抽出',
        'Slackチャンネルに通知',
      ],
      integrations: ['github', 'slack'],
    },
  });

  if (designResult.success && designResult.data) {
    console.log('✅ ワークフロー設計完了');
    console.log(`  - ワークフロー名: ${designResult.data.workflow.name}`);
    console.log(`  - ノード数: ${designResult.data.nodeCount}`);
    console.log(`  - 推定実行時間: ${designResult.data.estimatedExecutionTime}秒`);
    console.log(`  - 複雑度: ${designResult.data.estimatedComplexity}`);
    console.log('\n推奨事項:');
    designResult.data.recommendations.forEach((rec: string) => {
      console.log(`  • ${rec}`);
    });
  }

  // ========== 例2: ノード構成 ==========
  console.log('\n\n⚙️  例2: ノード詳細構成\n');

  const configureResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'high',
    input: {
      taskType: 'configure',
      description: 'ノードの詳細設定を最適化',
      workflow: designResult.data?.workflow,
    },
  });

  if (configureResult.success && configureResult.data) {
    console.log('✅ ノード構成完了');
    console.log(`  - 構成済みノード数: ${configureResult.data.nodes.length}`);
    console.log('\n最適化提案:');
    configureResult.data.suggestions.forEach((suggestion: string) => {
      console.log(`  • ${suggestion}`);
    });
  }

  // ========== 例3: サービス統合設定 ==========
  console.log('\n\n🔌 例3: 外部サービス統合\n');

  const integrateResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'high',
    input: {
      taskType: 'integrate',
      description: 'GitHubとSlackの統合設定',
      integrations: ['github', 'slack'],
    },
  });

  if (integrateResult.success && integrateResult.data) {
    console.log('✅ 統合設定完了');
    console.log(`  - 設定済み統合数: ${integrateResult.data.integrations.length}`);
    console.log(`  - 推定セットアップ時間: ${integrateResult.data.estimatedSetupTime}分`);
    console.log('\n必要なクレデンシャル:');
    integrateResult.data.credentialsRequired.forEach((cred: string) => {
      console.log(`  • ${cred}`);
    });
  }

  // ========== 例4: ワークフロー最適化 ==========
  console.log('\n\n⚡ 例4: ワークフロー最適化\n');

  const optimizeResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'high',
    input: {
      taskType: 'optimize',
      description: 'パフォーマンスとエラーハンドリングを改善',
      workflow: designResult.data?.workflow,
      performanceGoals: {
        maxExecutionTime: 30,
        errorRate: 0.01,
        throughput: 100,
      },
    },
  });

  if (optimizeResult.success && optimizeResult.data) {
    console.log('✅ 最適化完了');
    console.log(`  - パフォーマンス向上: ${optimizeResult.data.performanceGain}`);
    console.log('\n改善項目:');
    optimizeResult.data.improvements.forEach((imp: any) => {
      console.log(`  • ${imp.type}: ${imp.description} (影響度: ${imp.impact})`);
    });
  }

  // ========== 例5: テスト生成 ==========
  console.log('\n\n🧪 例5: テストシナリオ生成\n');

  const testResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'medium',
    input: {
      taskType: 'test',
      description: 'ワークフローのテストシナリオを生成',
      workflow: designResult.data?.workflow,
    },
  });

  if (testResult.success && testResult.data) {
    console.log('✅ テスト生成完了');
    console.log(`  - テストシナリオ数: ${testResult.data.testScenarios.length}`);
    console.log(`  - カバレッジ: ${testResult.data.testCoverage}`);
    console.log('\nテストシナリオ:');
    testResult.data.testScenarios.forEach((scenario: any) => {
      console.log(`  • ${scenario.name}: ${scenario.description}`);
    });
  }

  // ========== 例6: ドキュメント生成 ==========
  console.log('\n\n📝 例6: ドキュメント生成\n');

  const docResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'medium',
    input: {
      taskType: 'document',
      description: 'ワークフローの詳細ドキュメントを生成',
      workflow: designResult.data?.workflow,
    },
  });

  if (docResult.success && docResult.data) {
    console.log('✅ ドキュメント生成完了');
    console.log(`  - 形式: ${docResult.data.format}`);
    console.log('\n含まれるセクション:');
    docResult.data.sections.forEach((section: string) => {
      console.log(`  • ${section}`);
    });
    console.log('\nドキュメントプレビュー:');
    console.log('---');
    console.log(docResult.data.documentation.substring(0, 500) + '...');
    console.log('---');
  }

  // ========== 実践的な例: データ処理ワークフロー ==========
  console.log('\n\n🔥 実践例: データ処理パイプライン\n');

  const dataWorkflowResult = await orchestrator.executeTask('AI N8N Builder', {
    type: 'n8n-workflow',
    priority: 'critical',
    input: {
      taskType: 'design',
      description: 'CSVファイルをアップロードし、データを変換してデータベースに保存する',
      requirements: [
        'HTTPエンドポイントでCSVファイルを受信',
        'CSVデータをパース',
        'データを検証・変換',
        'PostgreSQLデータベースに保存',
        '処理結果をメール送信',
      ],
      integrations: ['postgres', 'smtp'],
    },
  });

  if (dataWorkflowResult.success && dataWorkflowResult.data) {
    console.log('✅ データ処理ワークフロー設計完了');
    console.log(`  - ワークフロー名: ${dataWorkflowResult.data.workflow.name}`);
    console.log(`  - ノード数: ${dataWorkflowResult.data.nodeCount}`);
    console.log(`  - 複雑度: ${dataWorkflowResult.data.estimatedComplexity}`);

    // 完全なワークフロー情報の出力
    console.log('\nワークフロー詳細:');
    console.log(JSON.stringify(dataWorkflowResult.data.workflow, null, 2));
  }

  // ========== オーケストレーターステータス ==========
  console.log('\n\n📊 オーケストレーターステータス\n');
  const systemStatus = orchestrator.getSystemStatus();
  console.log(`  - 総エージェント数: ${systemStatus.totalAgents}`);
  console.log(`  - 総ワークフロー数: ${systemStatus.totalWorkflows}`);

  // ========== エージェント情報 ==========
  console.log('\n\n🤖 N8N Builder Agent ステータス\n');
  const agent = orchestrator.getAgent('AI N8N Builder');
  if (agent) {
    const agentStatus = agent.getStatus();
    console.log(`  - 名前: ${agentStatus.name}`);
    console.log(`  - 役割: ${agentStatus.role}`);
    console.log(`  - カテゴリ: ${agentStatus.category}`);
    console.log(`  - 初期化状態: ${agentStatus.initialized ? '✅' : '❌'}`);
    console.log('\n機能:');
    agentStatus.capabilities.forEach((cap: string) => {
      console.log(`  • ${cap}`);
    });
  }

  // ========== クリーンアップ ==========
  await orchestrator.shutdownAll();
  console.log('\n\n✨ すべての処理が完了しました\n');
}

// 実行
main().catch((error) => {
  console.error('❌ エラーが発生しました:', error);
  process.exit(1);
});
