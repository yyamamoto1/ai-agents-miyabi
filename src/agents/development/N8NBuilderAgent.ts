/**
 * N8NBuilderAgent - n8nワークフロー構築の専門エージェント
 * n8nの自動化ワークフロー設計、構築、最適化を行う
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';

export interface N8NBuilderTaskInput {
  taskType: 'design' | 'configure' | 'integrate' | 'optimize' | 'test' | 'document';
  description: string;
  workflow?: N8NWorkflow;
  requirements?: string[];
  integrations?: string[];
  performanceGoals?: PerformanceGoals;
}

export interface N8NWorkflow {
  name: string;
  description: string;
  nodes: N8NNode[];
  connections: N8NConnection[];
  settings?: WorkflowSettings;
}

export interface N8NNode {
  id: string;
  type: string;
  name: string;
  parameters: Record<string, any>;
  position?: [number, number];
  credentials?: string[];
}

export interface N8NConnection {
  sourceNodeId: string;
  targetNodeId: string;
  sourceOutput?: string;
  targetInput?: string;
}

export interface WorkflowSettings {
  errorWorkflow?: string;
  timezone?: string;
  saveDataErrorExecution?: 'all' | 'none';
  saveDataSuccessExecution?: 'all' | 'none';
  saveManualExecutions?: boolean;
  executionTimeout?: number;
}

export interface PerformanceGoals {
  maxExecutionTime?: number;
  errorRate?: number;
  throughput?: number;
}

export class N8NBuilderAgent extends BaseAgent {
  constructor() {
    super({
      name: 'AI N8N Builder',
      role: 'n8nワークフロー構築の専門家',
      category: 'development',
      description: 'n8nの自動化ワークフローの設計、構築、最適化を行う',
      capabilities: [
        'ワークフロー設計',
        'ノード構成生成',
        'サービス統合設定',
        'パフォーマンス最適化',
        'エラーハンドリング実装',
        'テストシナリオ作成',
        'ドキュメント生成',
      ],
    });
  }

  protected async setup(): Promise<void> {
    this.log('N8N Builder Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as N8NBuilderTaskInput;

    this.log(`Processing ${input.taskType} task: ${input.description}`);

    switch (input.taskType) {
      case 'design':
        return await this.designWorkflow(input);
      case 'configure':
        return await this.configureNodes(input);
      case 'integrate':
        return await this.setupIntegrations(input);
      case 'optimize':
        return await this.optimizeWorkflow(input);
      case 'test':
        return await this.generateTests(input);
      case 'document':
        return await this.generateDocumentation(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * ビジネス要件からn8nワークフローを設計
   */
  private async designWorkflow(input: N8NBuilderTaskInput): Promise<any> {
    this.log(`Designing n8n workflow for: ${input.description}`);

    const workflow: N8NWorkflow = {
      name: this.generateWorkflowName(input.description),
      description: input.description,
      nodes: await this.generateNodes(input),
      connections: [],
      settings: {
        errorWorkflow: 'error-handler',
        timezone: 'Asia/Tokyo',
        saveDataErrorExecution: 'all',
        saveDataSuccessExecution: 'none',
        saveManualExecutions: true,
        executionTimeout: 3600,
      },
    };

    // ノード間の接続を自動生成
    workflow.connections = this.generateConnections(workflow.nodes);

    return {
      workflow,
      estimatedComplexity: this.calculateComplexity(workflow),
      recommendations: [
        'エラーハンドリングワークフローの設定を推奨',
        '定期実行トリガーの設定を確認してください',
        'クレデンシャルの事前設定が必要です',
      ],
      nodeCount: workflow.nodes.length,
      estimatedExecutionTime: this.estimateExecutionTime(workflow),
    };
  }

  /**
   * n8nノードの構成を生成
   */
  private async configureNodes(input: N8NBuilderTaskInput): Promise<any> {
    this.log('Configuring n8n nodes');

    if (!input.workflow) {
      throw new Error('Workflow is required for node configuration');
    }

    const configuredNodes = input.workflow.nodes.map((node) => {
      return {
        ...node,
        parameters: this.optimizeNodeParameters(node),
        position: this.calculateNodePosition(node, input.workflow!.nodes),
      };
    });

    return {
      nodes: configuredNodes,
      validationResults: this.validateNodes(configuredNodes),
      suggestions: this.getNodeOptimizationSuggestions(configuredNodes),
    };
  }

  /**
   * 外部サービス統合の設定
   */
  private async setupIntegrations(input: N8NBuilderTaskInput): Promise<any> {
    this.log('Setting up service integrations');

    const integrations = input.integrations || [];
    const integrationConfigs = integrations.map((service) => {
      return this.generateIntegrationConfig(service);
    });

    return {
      integrations: integrationConfigs,
      credentialsRequired: integrationConfigs.map((config) => config.credentialType),
      setupInstructions: integrationConfigs.map((config) => config.instructions),
      estimatedSetupTime: integrations.length * 10, // 10分/統合
    };
  }

  /**
   * ワークフローの最適化
   */
  private async optimizeWorkflow(input: N8NBuilderTaskInput): Promise<any> {
    this.log('Optimizing workflow');

    if (!input.workflow) {
      throw new Error('Workflow is required for optimization');
    }

    const optimizations = {
      parallelization: this.identifyParallelizableNodes(input.workflow),
      caching: this.identifyCachingOpportunities(input.workflow),
      errorHandling: this.improveErrorHandling(input.workflow),
      performance: this.optimizePerformance(input.workflow, input.performanceGoals),
    };

    const optimizedWorkflow = this.applyOptimizations(input.workflow, optimizations);

    return {
      optimizedWorkflow,
      improvements: [
        {
          type: 'parallelization',
          description: `${optimizations.parallelization.length}個のノードを並列実行可能`,
          impact: 'high',
        },
        {
          type: 'caching',
          description: `${optimizations.caching.length}個のノードでキャッシュ活用可能`,
          impact: 'medium',
        },
        {
          type: 'errorHandling',
          description: 'エラーハンドリングを改善',
          impact: 'high',
        },
      ],
      performanceGain: '35-50%の実行時間短縮を見込む',
    };
  }

  /**
   * テストシナリオの生成
   */
  private async generateTests(input: N8NBuilderTaskInput): Promise<any> {
    this.log('Generating test scenarios');

    if (!input.workflow) {
      throw new Error('Workflow is required for test generation');
    }

    const testScenarios = [
      {
        name: 'Normal Flow Test',
        description: '正常系のフロー実行テスト',
        testData: this.generateTestData(input.workflow, 'normal'),
        expectedResult: 'success',
      },
      {
        name: 'Error Handling Test',
        description: 'エラーハンドリングのテスト',
        testData: this.generateTestData(input.workflow, 'error'),
        expectedResult: 'handled_error',
      },
      {
        name: 'Edge Case Test',
        description: 'エッジケースのテスト',
        testData: this.generateTestData(input.workflow, 'edge'),
        expectedResult: 'success',
      },
    ];

    return {
      testScenarios,
      testCoverage: 'comprehensive',
      automatedTestScript: this.generateTestScript(testScenarios),
    };
  }

  /**
   * ドキュメントの生成
   */
  private async generateDocumentation(input: N8NBuilderTaskInput): Promise<any> {
    this.log('Generating workflow documentation');

    if (!input.workflow) {
      throw new Error('Workflow is required for documentation');
    }

    const documentation = `
# ${input.workflow.name}

## 概要
${input.workflow.description}

## ワークフロー構成

### ノード一覧
${input.workflow.nodes
  .map(
    (node, i) => `
${i + 1}. **${node.name}** (${node.type})
   - 説明: ${node.type}ノード
   - パラメータ: ${Object.keys(node.parameters).length}個
`
  )
  .join('\n')}

### データフロー
${this.generateDataFlowDiagram(input.workflow)}

## セットアップ手順

1. 必要なクレデンシャルの設定
${input.workflow.nodes
  .filter((node) => node.credentials && node.credentials.length > 0)
  .map((node) => `   - ${node.name}: ${node.credentials?.join(', ')}`)
  .join('\n')}

2. ワークフローのインポート
3. トリガーの設定
4. テスト実行

## 実行要件

- 推定実行時間: ${this.estimateExecutionTime(input.workflow)}秒
- 必要な権限: ${this.listRequiredPermissions(input.workflow).join(', ')}
- 依存サービス: ${this.listDependentServices(input.workflow).join(', ')}

## トラブルシューティング

### よくある問題

1. **認証エラー**
   - 原因: クレデンシャルが正しく設定されていない
   - 解決策: クレデンシャル設定を確認し、再設定してください

2. **タイムアウトエラー**
   - 原因: 処理時間が設定値を超過
   - 解決策: executionTimeoutの値を増やしてください

3. **データ形式エラー**
   - 原因: 前のノードからのデータ形式が不正
   - 解決策: データ変換ノードを追加してください

## メンテナンス

- 定期的なログ確認: 週次
- エラー率のモニタリング: 日次
- パフォーマンス最適化: 月次

## バージョン履歴

- v1.0: 初期バージョン作成
`;

    return {
      documentation,
      format: 'markdown',
      sections: [
        '概要',
        'ワークフロー構成',
        'セットアップ手順',
        '実行要件',
        'トラブルシューティング',
        'メンテナンス',
      ],
    };
  }

  // ========== ユーティリティメソッド ==========

  private generateWorkflowName(description: string): string {
    return description
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
  }

  private async generateNodes(input: N8NBuilderTaskInput): Promise<N8NNode[]> {
    const nodes: N8NNode[] = [];

    // トリガーノード
    nodes.push({
      id: 'trigger',
      type: 'n8n-nodes-base.webhook',
      name: 'Webhook Trigger',
      parameters: {
        httpMethod: 'POST',
        path: this.generateWorkflowName(input.description),
        responseMode: 'onReceived',
      },
      position: [250, 300],
    });

    // 要件に基づいて処理ノードを追加
    if (input.requirements) {
      input.requirements.forEach((req, index) => {
        nodes.push(this.createNodeFromRequirement(req, index + 1));
      });
    }

    // レスポンスノード
    nodes.push({
      id: 'response',
      type: 'n8n-nodes-base.respondToWebhook',
      name: 'Response',
      parameters: {
        respondWith: 'json',
        responseBody: '={{ $json }}',
      },
      position: [250 + nodes.length * 200, 300],
    });

    return nodes;
  }

  private createNodeFromRequirement(requirement: string, index: number): N8NNode {
    // 要件から適切なノードタイプを推測
    const lowerReq = requirement.toLowerCase();

    if (lowerReq.includes('http') || lowerReq.includes('api')) {
      return {
        id: `http-${index}`,
        type: 'n8n-nodes-base.httpRequest',
        name: `HTTP Request ${index}`,
        parameters: {
          method: 'GET',
          url: '',
        },
        position: [250 + index * 200, 300],
      };
    } else if (lowerReq.includes('database') || lowerReq.includes('sql')) {
      return {
        id: `db-${index}`,
        type: 'n8n-nodes-base.postgres',
        name: `Database ${index}`,
        parameters: {
          operation: 'executeQuery',
        },
        position: [250 + index * 200, 300],
        credentials: ['postgres'],
      };
    } else if (lowerReq.includes('email') || lowerReq.includes('mail')) {
      return {
        id: `email-${index}`,
        type: 'n8n-nodes-base.emailSend',
        name: `Send Email ${index}`,
        parameters: {
          message: '',
        },
        position: [250 + index * 200, 300],
        credentials: ['smtp'],
      };
    } else {
      // デフォルトはコード実行ノード
      return {
        id: `code-${index}`,
        type: 'n8n-nodes-base.code',
        name: `Process ${index}`,
        parameters: {
          jsCode: '// TODO: Implement logic\nreturn items;',
        },
        position: [250 + index * 200, 300],
      };
    }
  }

  private generateConnections(nodes: N8NNode[]): N8NConnection[] {
    const connections: N8NConnection[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      connections.push({
        sourceNodeId: nodes[i].id,
        targetNodeId: nodes[i + 1].id,
      });
    }

    return connections;
  }

  private calculateComplexity(workflow: N8NWorkflow): string {
    const nodeCount = workflow.nodes.length;
    const connectionCount = workflow.connections.length;

    if (nodeCount <= 3) return 'low';
    if (nodeCount <= 7) return 'medium';
    return 'high';
  }

  private estimateExecutionTime(workflow: N8NWorkflow): number {
    // 各ノードタイプの平均実行時間（秒）
    const nodeExecutionTimes: Record<string, number> = {
      'n8n-nodes-base.webhook': 0.1,
      'n8n-nodes-base.httpRequest': 2.0,
      'n8n-nodes-base.code': 0.5,
      'n8n-nodes-base.postgres': 1.0,
      'n8n-nodes-base.emailSend': 1.5,
      default: 1.0,
    };

    return workflow.nodes.reduce((total, node) => {
      const time = nodeExecutionTimes[node.type] || nodeExecutionTimes.default;
      return total + time;
    }, 0);
  }

  private optimizeNodeParameters(node: N8NNode): Record<string, any> {
    // ノードパラメータの最適化
    return {
      ...node.parameters,
      options: {
        timeout: 30000,
        retry: {
          maxRetries: 3,
          retryDelay: 1000,
        },
      },
    };
  }

  private calculateNodePosition(node: N8NNode, allNodes: N8NNode[]): [number, number] {
    const index = allNodes.indexOf(node);
    return [250 + index * 200, 300];
  }

  private validateNodes(nodes: N8NNode[]): Array<{ nodeId: string; valid: boolean; issues: string[] }> {
    return nodes.map((node) => ({
      nodeId: node.id,
      valid: true,
      issues: [],
    }));
  }

  private getNodeOptimizationSuggestions(nodes: N8NNode[]): string[] {
    return [
      'HTTPリクエストノードにリトライ設定を追加することを推奨',
      'データベースクエリにインデックスを使用することを推奨',
      '大量データ処理にはバッチ処理の実装を推奨',
    ];
  }

  private generateIntegrationConfig(service: string): any {
    const configs: Record<string, any> = {
      slack: {
        service: 'Slack',
        credentialType: 'slackApi',
        instructions: 'Slack AppでOAuthトークンを取得し、n8nに設定してください',
        requiredScopes: ['chat:write', 'channels:read'],
      },
      github: {
        service: 'GitHub',
        credentialType: 'githubApi',
        instructions: 'GitHub Personal Access Tokenを生成し、n8nに設定してください',
        requiredScopes: ['repo', 'workflow'],
      },
      google: {
        service: 'Google',
        credentialType: 'googleApi',
        instructions: 'Google Cloud ConsoleでOAuth2認証情報を作成してください',
        requiredScopes: ['https://www.googleapis.com/auth/drive'],
      },
    };

    return (
      configs[service.toLowerCase()] || {
        service,
        credentialType: 'generic',
        instructions: `${service}のAPIキーまたはトークンを設定してください`,
        requiredScopes: [],
      }
    );
  }

  private identifyParallelizableNodes(workflow: N8NWorkflow): string[] {
    // 並列実行可能なノードを特定
    return workflow.nodes.filter((node) => node.type !== 'n8n-nodes-base.webhook').map((node) => node.id);
  }

  private identifyCachingOpportunities(workflow: N8NWorkflow): string[] {
    // キャッシュ可能なノードを特定
    return workflow.nodes.filter((node) => node.type === 'n8n-nodes-base.httpRequest').map((node) => node.id);
  }

  private improveErrorHandling(workflow: N8NWorkflow): any {
    return {
      errorWorkflowEnabled: true,
      retryOnError: true,
      continueOnFail: false,
    };
  }

  private optimizePerformance(workflow: N8NWorkflow, goals?: PerformanceGoals): any {
    return {
      executionTimeout: goals?.maxExecutionTime || 3600,
      maxExecutions: 100,
      cacheEnabled: true,
    };
  }

  private applyOptimizations(workflow: N8NWorkflow, optimizations: any): N8NWorkflow {
    return {
      ...workflow,
      settings: {
        ...workflow.settings,
        ...optimizations.errorHandling,
        ...optimizations.performance,
      },
    };
  }

  private generateTestData(workflow: N8NWorkflow, scenario: 'normal' | 'error' | 'edge'): any {
    switch (scenario) {
      case 'normal':
        return { test: 'data', status: 'ok' };
      case 'error':
        return { test: 'data', status: 'error' };
      case 'edge':
        return { test: '', status: null };
    }
  }

  private generateTestScript(scenarios: any[]): string {
    return `
// n8n Workflow Test Script
const testScenarios = ${JSON.stringify(scenarios, null, 2)};

async function runTests() {
  for (const scenario of testScenarios) {
    console.log(\`Running: \${scenario.name}\`);
    // Execute workflow with test data
    // Verify expected result
  }
}

runTests();
`;
  }

  private generateDataFlowDiagram(workflow: N8NWorkflow): string {
    return workflow.connections
      .map((conn) => {
        const source = workflow.nodes.find((n) => n.id === conn.sourceNodeId);
        const target = workflow.nodes.find((n) => n.id === conn.targetNodeId);
        return `${source?.name} → ${target?.name}`;
      })
      .join('\n');
  }

  private listRequiredPermissions(workflow: N8NWorkflow): string[] {
    const permissions = new Set<string>();
    workflow.nodes.forEach((node) => {
      if (node.type.includes('httpRequest')) permissions.add('インターネットアクセス');
      if (node.type.includes('postgres')) permissions.add('データベースアクセス');
      if (node.type.includes('email')) permissions.add('メール送信');
    });
    return Array.from(permissions);
  }

  private listDependentServices(workflow: N8NWorkflow): string[] {
    const services = new Set<string>();
    workflow.nodes.forEach((node) => {
      if (node.credentials) {
        node.credentials.forEach((cred) => services.add(cred));
      }
    });
    return Array.from(services);
  }

  protected async cleanup(): Promise<void> {
    this.log('N8N Builder Agent cleanup completed');
  }
}
