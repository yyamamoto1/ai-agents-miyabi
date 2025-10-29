/**
 * タスクマッピングシステム
 * タスクの内容を解析して適切なエージェントを自動選択
 */
export class TaskMapper {
  private agentMappings: Map<string, string[]>;

  constructor() {
    this.agentMappings = new Map();
    this.initializeAgentMappings();
  }

  /**
   * エージェントマッピング初期化
   * タスクキーワードと対応エージェントの関係を定義
   */
  private initializeAgentMappings() {
    // データ・分析系タスク
    this.agentMappings.set('データ分析', [
      'ai-data-analyst',
      'ai-business-intelligence-agent',
      'ai-market-research-analyst',
    ]);

    this.agentMappings.set('予測', [
      'ai-data-analyst',
      'ai-predictive-analytics-agent',
      'ai-trend-forecaster',
    ]);

    // クリエイティブ・コンテンツ生成系
    this.agentMappings.set('コンテンツ作成', [
      'ai-content-creator',
      'ai-copywriter',
      'ai-social-media-manager',
    ]);

    this.agentMappings.set('デザイン', [
      'ai-ui-ux-designer',
      'ai-graphic-designer',
      'ai-brand-strategist',
    ]);

    // 開発・運用・管理系
    this.agentMappings.set('開発', [
      'ai-software-developer',
      'ai-devops-engineer',
      'ai-code-reviewer',
    ]);

    this.agentMappings.set('テスト', [
      'ai-qa-tester',
      'ai-security-analyst',
      'ai-performance-optimizer',
    ]);

    // ビジネス・戦略・顧客対応系
    this.agentMappings.set('ビジネス戦略', [
      'ai-business-strategist',
      'ai-consultant',
      'ai-project-manager',
    ]);

    this.agentMappings.set('顧客対応', [
      'ai-customer-service-agent',
      'ai-sales-representative',
      'ai-support-specialist',
    ]);

    // 教育・研究系
    this.agentMappings.set('教育', [
      'ai-educator',
      'ai-training-specialist',
      'ai-curriculum-designer',
    ]);

    this.agentMappings.set('研究', [
      'ai-research-analyst',
      'ai-academic-writer',
      'ai-data-scientist',
    ]);

    // 専門分野特化型
    this.agentMappings.set('法務', [
      'ai-legal-advisor',
      'ai-compliance-officer',
      'ai-contract-analyst',
    ]);

    this.agentMappings.set('医療', [
      'ai-medical-advisor',
      'ai-health-analyst',
      'ai-clinical-researcher',
    ]);

    this.agentMappings.set('金融', [
      'ai-financial-analyst',
      'ai-investment-advisor',
      'ai-risk-manager',
    ]);
  }

  /**
   * タスクを解析して適切なエージェントを選択
   */
  async mapTaskToAgents(task: string): Promise<string[]> {
    const taskLower = task.toLowerCase();
    const selectedAgents: Set<string> = new Set();

    // キーワードベースのマッピング
    for (const [keyword, agents] of this.agentMappings.entries()) {
      if (this.containsKeyword(taskLower, keyword)) {
        agents.forEach(agent => selectedAgents.add(agent));
      }
    }

    // 特定タスクパターンの詳細解析
    const additionalAgents = this.analyzeSpecificPatterns(taskLower);
    additionalAgents.forEach(agent => selectedAgents.add(agent));

    // エージェントが選択されなかった場合のデフォルト
    if (selectedAgents.size === 0) {
      return this.getDefaultAgents(taskLower);
    }

    // 最大5エージェントまでに制限
    return Array.from(selectedAgents).slice(0, 5);
  }

  /**
   * キーワード含有チェック
   */
  private containsKeyword(text: string, keyword: string): boolean {
    const keywordVariations = this.getKeywordVariations(keyword);
    return keywordVariations.some(variation => 
      text.includes(variation.toLowerCase())
    );
  }

  /**
   * キーワードバリエーション取得
   */
  private getKeywordVariations(keyword: string): string[] {
    const variations: Record<string, string[]> = {
      'データ分析': ['データ', 'data', 'analytics', '分析', 'analyze'],
      '予測': ['予測', 'prediction', 'forecast', '予想', 'estimate'],
      'コンテンツ作成': ['コンテンツ', 'content', '記事', 'article', '文章', 'writing'],
      'デザイン': ['デザイン', 'design', 'ui', 'ux', 'interface'],
      '開発': ['開発', 'development', 'code', 'programming', 'software'],
      'テスト': ['テスト', 'test', 'qa', 'quality', '品質'],
      'ビジネス戦略': ['戦略', 'strategy', 'business', 'plan', '計画'],
      '顧客対応': ['顧客', 'customer', 'support', 'service', 'help'],
      '教育': ['教育', 'education', 'training', '学習', 'learning'],
      '研究': ['研究', 'research', '調査', 'investigation', 'study'],
      '法務': ['法務', 'legal', '法律', 'law', 'compliance'],
      '医療': ['医療', 'medical', 'health', '健康', 'clinical'],
      '金融': ['金融', 'finance', 'investment', '投資', 'financial'],
    };

    return variations[keyword] || [keyword];
  }

  /**
   * 特定パターン解析
   */
  private analyzeSpecificPatterns(task: string): string[] {
    const agents: string[] = [];

    // プロジェクト管理系
    if (task.includes('プロジェクト') || task.includes('project') || task.includes('管理')) {
      agents.push('ai-project-manager', 'ai-agile-coach');
    }

    // 自動化系
    if (task.includes('自動化') || task.includes('automation') || task.includes('script')) {
      agents.push('ai-automation-specialist', 'ai-devops-engineer');
    }

    // マーケティング系
    if (task.includes('マーケティング') || task.includes('marketing') || task.includes('広告')) {
      agents.push('ai-marketing-specialist', 'ai-social-media-manager');
    }

    // セキュリティ系
    if (task.includes('セキュリティ') || task.includes('security') || task.includes('脆弱性')) {
      agents.push('ai-security-analyst', 'ai-penetration-tester');
    }

    // パフォーマンス最適化
    if (task.includes('最適化') || task.includes('optimization') || task.includes('performance')) {
      agents.push('ai-performance-optimizer', 'ai-system-architect');
    }

    return agents;
  }

  /**
   * デフォルトエージェント選択
   */
  private getDefaultAgents(task: string): string[] {
    // タスクの複雑さに応じてデフォルトエージェントを選択
    if (task.length > 100) {
      // 複雑なタスク: 多様なエージェント
      return [
        'ai-project-manager',
        'ai-consultant',
        'ai-data-analyst',
        'ai-software-developer',
        'ai-content-creator',
      ];
    } else if (task.length > 50) {
      // 中程度のタスク: バランス型
      return [
        'ai-consultant',
        'ai-data-analyst',
        'ai-content-creator',
      ];
    } else {
      // シンプルなタスク: 汎用エージェント
      return [
        'ai-consultant',
        'ai-general-assistant',
      ];
    }
  }

  /**
   * タスク複雑度評価
   */
  evaluateTaskComplexity(task: string): 'simple' | 'medium' | 'complex' {
    const indicators = {
      complex: ['システム', 'アーキテクチャ', 'フルスタック', '統合', 'migration'],
      medium: ['開発', '分析', '設計', 'レポート', 'テスト'],
      simple: ['確認', 'リスト', '表示', 'hello', 'test'],
    };

    const taskLower = task.toLowerCase();

    if (indicators.complex.some(keyword => taskLower.includes(keyword))) {
      return 'complex';
    }
    if (indicators.medium.some(keyword => taskLower.includes(keyword))) {
      return 'medium';
    }
    return 'simple';
  }

  /**
   * エージェント推奨度スコア計算
   */
  calculateAgentScore(agentId: string, task: string): number {
    let score = 0;
    const taskLower = task.toLowerCase();

    // エージェント特化分野とのマッチング
    for (const [keyword, agents] of this.agentMappings.entries()) {
      if (agents.includes(agentId) && this.containsKeyword(taskLower, keyword)) {
        score += 10;
      }
    }

    // エージェント名とタスクの関連性
    const agentNameParts = agentId.split('-');
    agentNameParts.forEach(part => {
      if (taskLower.includes(part)) {
        score += 5;
      }
    });

    return score;
  }

  /**
   * 最適なエージェントチーム構成提案
   */
  async suggestOptimalTeam(task: string, maxAgents: number = 3): Promise<{
    primaryAgents: string[];
    supportAgents: string[];
    reasoning: string;
  }> {
    const complexity = this.evaluateTaskComplexity(task);
    const allCandidates = await this.mapTaskToAgents(task);

    // エージェントスコア計算
    const agentScores = allCandidates.map(agentId => ({
      agentId,
      score: this.calculateAgentScore(agentId, task),
    })).sort((a, b) => b.score - a.score);

    const primaryAgents = agentScores
      .slice(0, Math.min(maxAgents, 3))
      .map(item => item.agentId);

    const supportAgents = agentScores
      .slice(3, Math.min(maxAgents + 2, agentScores.length))
      .map(item => item.agentId);

    const reasoning = this.generateReasoningText(task, complexity, primaryAgents);

    return {
      primaryAgents,
      supportAgents,
      reasoning,
    };
  }

  /**
   * 推論テキスト生成
   */
  private generateReasoningText(
    task: string,
    complexity: string,
    selectedAgents: string[]
  ): string {
    const complexityText = {
      simple: 'シンプルなタスク',
      medium: '中程度の複雑さのタスク',
      complex: '高度で複雑なタスク',
    };

    return `${complexityText[complexity]}と判断し、以下のエージェントを選択しました:\n` +
           selectedAgents.map(agent => `- ${agent}`).join('\n') +
           `\n\nこの組み合わせにより、タスクの要求に最適に対応できると予想されます。`;
  }
}