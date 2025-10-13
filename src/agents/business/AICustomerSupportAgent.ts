import { BaseAgent } from '../base/BaseAgent';

/**
 * AI Customer Support Agent
 * カスタマーサポートの専門家
 *
 * 主な機能:
 * - 自動応答
 * - FAQ生成
 * - 問題解決支援
 * - エスカレーション判断
 * - 顧客満足度分析
 */

// ========================================
// 型定義
// ========================================

interface CustomerSupportInput {
  taskType: 'auto-response' | 'faq-generation' | 'problem-solving' | 'escalation-check' | 'satisfaction-analysis' | 'ticket-management' | 'knowledge-base';
  inquiry?: CustomerInquiry;
  tickets?: SupportTicket[];
  conversations?: Conversation[];
  satisfactionData?: SatisfactionData[];
  knowledgeBaseQuery?: string;
}

interface CustomerInquiry {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  channel: 'email' | 'chat' | 'phone' | 'social';
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  timestamp: Date;
  previousTickets?: string[];
}

interface SupportTicket {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  createdAt: Date;
  resolvedAt?: Date;
  responseTime?: number; // 分単位
  resolutionTime?: number; // 分単位
  customerSatisfaction?: number; // 1-5
}

interface Conversation {
  ticketId: string;
  messages: {
    sender: 'customer' | 'agent' | 'ai';
    message: string;
    timestamp: Date;
  }[];
}

interface SatisfactionData {
  ticketId: string;
  customerId: string;
  rating: number; // 1-5
  feedback?: string;
  timestamp: Date;
}

interface CustomerSupportOutput {
  success: boolean;
  taskType: string;
  result: AutoResponse | FAQDatabase | ProblemSolution | EscalationDecision | SatisfactionReport | TicketAnalytics | KnowledgeBaseResult;
  timestamp: Date;
}

// 自動応答
interface AutoResponse {
  inquiryId: string;
  responseType: 'immediate' | 'templated' | 'ai_generated';
  response: {
    subject: string;
    body: string;
    tone: 'formal' | 'friendly' | 'empathetic';
  };
  suggestedActions: string[];
  confidence: number; // 0-1
  requiresHumanReview: boolean;
  estimatedResolutionTime?: string;
}

// FAQ生成
interface FAQDatabase {
  totalFAQs: number;
  categories: {
    name: string;
    faqs: FAQ[];
  }[];
  recommendations: string[];
  coverage: number; // 0-100 パーセンテージ
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
  relatedQuestions: string[];
  popularity: number; // 問い合わせ頻度
  lastUpdated: Date;
}

// 問題解決支援
interface ProblemSolution {
  problem: string;
  category: string;
  solutions: Solution[];
  rootCause?: string;
  preventiveMeasures: string[];
  relatedArticles: string[];
}

interface Solution {
  description: string;
  steps: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  successRate: number; // 0-100
  alternativeSolutions?: string[];
}

// エスカレーション判断
interface EscalationDecision {
  shouldEscalate: boolean;
  reason: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendedDepartment: string;
  suggestedAssignee?: string;
  context: {
    customerHistory: string;
    previousEscalations: number;
    complexity: 'low' | 'medium' | 'high';
  };
  immediateActions: string[];
}

// 顧客満足度分析
interface SatisfactionReport {
  period: {
    start: Date;
    end: Date;
  };
  overall: {
    averageRating: number;
    totalResponses: number;
    nps: number; // Net Promoter Score
    csat: number; // Customer Satisfaction Score
  };
  byCategory: {
    [category: string]: {
      averageRating: number;
      responseCount: number;
    };
  };
  byChannel: {
    [channel: string]: {
      averageRating: number;
      responseCount: number;
    };
  };
  trends: {
    improving: string[];
    declining: string[];
  };
  topComplaints: string[];
  recommendations: string[];
}

// チケット管理分析
interface TicketAnalytics {
  totalTickets: number;
  byStatus: {
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
  byPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  performance: {
    averageResponseTime: number; // 分
    averageResolutionTime: number; // 分
    firstContactResolutionRate: number; // 0-100
    reopenRate: number; // 0-100
  };
  trends: {
    ticketVolume: 'increasing' | 'stable' | 'decreasing';
    resolutionSpeed: 'improving' | 'stable' | 'declining';
  };
  bottlenecks: string[];
  recommendations: string[];
}

// ナレッジベース
interface KnowledgeBaseResult {
  query: string;
  articles: KnowledgeArticle[];
  suggestedContent: string[];
  gaps: string[]; // 不足しているコンテンツ
}

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  relevanceScore: number; // 0-1
  views: number;
  helpfulness: number; // 0-100
  lastUpdated: Date;
}

// ========================================
// AICustomerSupportAgent クラス
// ========================================

export class AICustomerSupportAgent extends BaseAgent {
  constructor() {
    super(
      'AICustomerSupportAgent',
      'カスタマーサポートの専門家として、顧客対応を自動化・最適化します',
      ['auto-response', 'faq-generation', 'problem-solving', 'escalation-check', 'satisfaction-analysis', 'ticket-management', 'knowledge-base']
    );
  }

  /**
   * エージェントのセットアップ
   */
  async setup(): Promise<void> {
    this.log('AI Customer Support Agent をセットアップしています...');
    // 初期化処理（データベース接続、モデルロード等）
    this.log('セットアップ完了');
  }

  /**
   * メイン処理
   */
  async process(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
    this.log(`タスクタイプ: ${input.taskType} を処理中...`);

    let result;

    switch (input.taskType) {
      case 'auto-response':
        if (!input.inquiry) throw new Error('inquiry が必要です');
        result = await this.generateAutoResponse(input.inquiry);
        break;

      case 'faq-generation':
        if (!input.tickets) throw new Error('tickets が必要です');
        result = await this.generateFAQ(input.tickets);
        break;

      case 'problem-solving':
        if (!input.inquiry) throw new Error('inquiry が必要です');
        result = await this.provideProblemSolution(input.inquiry);
        break;

      case 'escalation-check':
        if (!input.inquiry) throw new Error('inquiry が必要です');
        result = await this.checkEscalation(input.inquiry);
        break;

      case 'satisfaction-analysis':
        if (!input.satisfactionData) throw new Error('satisfactionData が必要です');
        result = await this.analyzeSatisfaction(input.satisfactionData);
        break;

      case 'ticket-management':
        if (!input.tickets) throw new Error('tickets が必要です');
        result = await this.analyzeTickets(input.tickets);
        break;

      case 'knowledge-base':
        if (!input.knowledgeBaseQuery) throw new Error('knowledgeBaseQuery が必要です');
        result = await this.searchKnowledgeBase(input.knowledgeBaseQuery);
        break;

      default:
        throw new Error(`未知のタスクタイプ: ${input.taskType}`);
    }

    return {
      success: true,
      taskType: input.taskType,
      result,
      timestamp: new Date()
    };
  }

  /**
   * クリーンアップ処理
   */
  async cleanup(): Promise<void> {
    this.log('AI Customer Support Agent をクリーンアップしています...');
    // リソース解放処理
    this.log('クリーンアップ完了');
  }

  // ========================================
  // プライベートメソッド
  // ========================================

  /**
   * 自動応答生成
   */
  private async generateAutoResponse(inquiry: CustomerInquiry): Promise<AutoResponse> {
    this.log(`問い合わせ "${inquiry.subject}" の自動応答を生成中...`);

    // 問い合わせの複雑度分析
    const complexity = this.analyzeComplexity(inquiry);
    const sentiment = this.analyzeSentiment(inquiry.message);

    // 応答生成
    const response = this.generateResponse(inquiry, sentiment);

    // 信頼度計算
    const confidence = this.calculateResponseConfidence(inquiry, complexity);

    return {
      inquiryId: inquiry.id,
      responseType: confidence > 0.8 ? 'ai_generated' : 'templated',
      response: {
        subject: `Re: ${inquiry.subject}`,
        body: response,
        tone: sentiment === 'negative' ? 'empathetic' : 'friendly'
      },
      suggestedActions: this.generateSuggestedActions(inquiry),
      confidence,
      requiresHumanReview: confidence < 0.7 || inquiry.priority === 'urgent',
      estimatedResolutionTime: this.estimateResolutionTime(complexity)
    };
  }

  /**
   * FAQ生成
   */
  private async generateFAQ(tickets: SupportTicket[]): Promise<FAQDatabase> {
    this.log(`${tickets.length}件のチケットからFAQを生成中...`);

    // チケットをカテゴリ別に分類
    const categorized = this.categorizeTickets(tickets);

    // 頻出質問を抽出
    const faqsByCategory = Object.entries(categorized).map(([category, categoryTickets]) => {
      const faqs = this.extractFrequentQuestions(categoryTickets as SupportTicket[]);
      return {
        name: category,
        faqs
      };
    });

    const totalFAQs = faqsByCategory.reduce((sum, cat) => sum + cat.faqs.length, 0);

    return {
      totalFAQs,
      categories: faqsByCategory,
      recommendations: [
        'トップ10の質問でFAQセクションを更新することを推奨',
        '製品ページに関連FAQへのリンクを追加',
        '検索機能を改善してFAQ発見率を向上'
      ],
      coverage: this.calculateFAQCoverage(tickets, totalFAQs)
    };
  }

  /**
   * 問題解決支援
   */
  private async provideProblemSolution(inquiry: CustomerInquiry): Promise<ProblemSolution> {
    this.log(`問題 "${inquiry.subject}" の解決策を検索中...`);

    const solutions = this.findSolutions(inquiry);

    return {
      problem: inquiry.subject,
      category: inquiry.category || 'general',
      solutions,
      rootCause: this.identifyRootCause(inquiry),
      preventiveMeasures: [
        'ユーザーガイドの該当セクションを改善',
        'オンボーディング時に関連情報を提供',
        'プロアクティブなヒントをアプリ内に表示'
      ],
      relatedArticles: [
        'ヘルプセンター: よくある質問',
        'トラブルシューティングガイド',
        'ベストプラクティス'
      ]
    };
  }

  /**
   * エスカレーション判断
   */
  private async checkEscalation(inquiry: CustomerInquiry): Promise<EscalationDecision> {
    this.log(`問い合わせ "${inquiry.id}" のエスカレーション判断中...`);

    const complexity = this.analyzeComplexity(inquiry);
    const shouldEscalate = this.shouldEscalateToHuman(inquiry, complexity);

    return {
      shouldEscalate,
      reason: shouldEscalate
        ? '複雑な技術的問題のため、専門チームの対応が必要'
        : 'AI で対応可能な範囲内',
      urgency: inquiry.priority === 'urgent' ? 'critical' : 'medium',
      recommendedDepartment: this.determineDepartment(inquiry),
      suggestedAssignee: inquiry.priority === 'urgent' ? 'シニアサポート担当' : undefined,
      context: {
        customerHistory: inquiry.previousTickets ? `過去 ${inquiry.previousTickets.length} 件のチケット` : '初回問い合わせ',
        previousEscalations: inquiry.previousTickets?.length || 0,
        complexity
      },
      immediateActions: shouldEscalate
        ? ['担当者に即座に通知', '顧客に対応中の旨を連絡', 'SLA時間を監視']
        : ['AI 応答を送信', '顧客の反応を監視']
    };
  }

  /**
   * 顧客満足度分析
   */
  private async analyzeSatisfaction(data: SatisfactionData[]): Promise<SatisfactionReport> {
    this.log(`${data.length}件の満足度データを分析中...`);

    const averageRating = data.reduce((sum, d) => sum + d.rating, 0) / data.length;

    // NPS計算（Net Promoter Score）
    const promoters = data.filter(d => d.rating >= 4).length;
    const detractors = data.filter(d => d.rating <= 2).length;
    const nps = ((promoters - detractors) / data.length) * 100;

    // CSAT計算（Customer Satisfaction Score）
    const satisfied = data.filter(d => d.rating >= 4).length;
    const csat = (satisfied / data.length) * 100;

    return {
      period: {
        start: new Date(Math.min(...data.map(d => d.timestamp.getTime()))),
        end: new Date(Math.max(...data.map(d => d.timestamp.getTime())))
      },
      overall: {
        averageRating,
        totalResponses: data.length,
        nps,
        csat
      },
      byCategory: this.groupSatisfactionByCategory(data),
      byChannel: this.groupSatisfactionByChannel(data),
      trends: {
        improving: ['初回対応時間', 'チャットサポートの満足度'],
        declining: ['メール応答時間']
      },
      topComplaints: this.extractTopComplaints(data),
      recommendations: [
        `NPS ${nps.toFixed(1)} - 改善の余地あり。プロモーターを増やす施策を検討`,
        `CSAT ${csat.toFixed(1)}% - 平均以上。引き続き品質を維持`,
        'メール応答時間の改善が急務'
      ]
    };
  }

  /**
   * チケット管理分析
   */
  private async analyzeTickets(tickets: SupportTicket[]): Promise<TicketAnalytics> {
    this.log(`${tickets.length}件のチケットを分析中...`);

    const byStatus = {
      open: tickets.filter(t => t.status === 'open').length,
      in_progress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };

    const byPriority = {
      low: tickets.filter(t => t.priority === 'low').length,
      medium: tickets.filter(t => t.priority === 'medium').length,
      high: tickets.filter(t => t.priority === 'high').length,
      urgent: tickets.filter(t => t.priority === 'urgent').length
    };

    const responseTimes = tickets.filter(t => t.responseTime).map(t => t.responseTime!);
    const resolutionTimes = tickets.filter(t => t.resolutionTime).map(t => t.resolutionTime!);

    return {
      totalTickets: tickets.length,
      byStatus,
      byPriority,
      performance: {
        averageResponseTime: responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : 0,
        averageResolutionTime: resolutionTimes.length > 0 ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length : 0,
        firstContactResolutionRate: 75, // ダミー値
        reopenRate: 8 // ダミー値
      },
      trends: {
        ticketVolume: byStatus.open > tickets.length * 0.3 ? 'increasing' : 'stable',
        resolutionSpeed: 'improving'
      },
      bottlenecks: [
        'high優先度チケットの処理待ち時間が長い',
        '特定カテゴリ（技術サポート）の対応遅延'
      ],
      recommendations: [
        'high優先度チケットのリソースを増強',
        'FAQ充実化により問い合わせ数を削減',
        'AI自動応答の活用範囲を拡大'
      ]
    };
  }

  /**
   * ナレッジベース検索
   */
  private async searchKnowledgeBase(query: string): Promise<KnowledgeBaseResult> {
    this.log(`ナレッジベース検索: "${query}"`);

    // ダミーの検索結果
    const articles: KnowledgeArticle[] = [
      {
        id: 'kb-001',
        title: 'アカウント設定ガイド',
        content: 'アカウント設定の詳細手順...',
        category: 'アカウント管理',
        tags: ['設定', 'アカウント', '初期設定'],
        relevanceScore: 0.95,
        views: 1250,
        helpfulness: 92,
        lastUpdated: new Date('2025-09-15')
      },
      {
        id: 'kb-002',
        title: 'パスワードリセット方法',
        content: 'パスワードをリセットする手順...',
        category: 'セキュリティ',
        tags: ['パスワード', 'リセット', 'セキュリティ'],
        relevanceScore: 0.88,
        views: 2100,
        helpfulness: 95,
        lastUpdated: new Date('2025-10-01')
      }
    ];

    return {
      query,
      articles,
      suggestedContent: [
        '二段階認証の設定方法',
        'プライバシー設定のベストプラクティス'
      ],
      gaps: [
        'モバイルアプリ固有の問題に関する記事が不足',
        'API連携に関するドキュメント不足'
      ]
    };
  }

  // ========================================
  // ヘルパーメソッド
  // ========================================

  private analyzeComplexity(inquiry: CustomerInquiry): 'low' | 'medium' | 'high' {
    // 問い合わせの複雑度を分析（実際にはNLP等を使用）
    const messageLength = inquiry.message.length;
    if (messageLength < 100) return 'low';
    if (messageLength < 300) return 'medium';
    return 'high';
  }

  private analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    // 感情分析（実際にはNLP APIを使用）
    const negativeWords = ['問題', '困って', 'バグ', 'エラー', '不満'];
    const hasNegative = negativeWords.some(word => message.includes(word));
    return hasNegative ? 'negative' : 'neutral';
  }

  private generateResponse(inquiry: CustomerInquiry, sentiment: string): string {
    const greeting = sentiment === 'negative'
      ? `${inquiry.customerName}様、ご不便をおかけして大変申し訳ございません。`
      : `${inquiry.customerName}様、お問い合わせいただきありがとうございます。`;

    return `${greeting}\n\n${inquiry.subject}についてご案内いたします。\n\n[解決策の詳細]\n\nご不明な点がございましたら、お気軽にお問い合わせください。\n\n引き続きよろしくお願いいたします。`;
  }

  private calculateResponseConfidence(inquiry: CustomerInquiry, complexity: string): number {
    // 信頼度計算
    if (complexity === 'high') return 0.6;
    if (complexity === 'medium') return 0.8;
    return 0.95;
  }

  private generateSuggestedActions(inquiry: CustomerInquiry): string[] {
    return [
      'FAQ記事を確認',
      'アカウント設定を確認',
      '必要に応じてサポート担当者に連絡'
    ];
  }

  private estimateResolutionTime(complexity: string): string {
    if (complexity === 'high') return '24-48時間';
    if (complexity === 'medium') return '4-8時間';
    return '1-2時間';
  }

  private categorizeTickets(tickets: SupportTicket[]): { [key: string]: SupportTicket[] } {
    const categorized: { [key: string]: SupportTicket[] } = {};
    tickets.forEach(ticket => {
      if (!categorized[ticket.category]) {
        categorized[ticket.category] = [];
      }
      categorized[ticket.category].push(ticket);
    });
    return categorized;
  }

  private extractFrequentQuestions(tickets: SupportTicket[]): FAQ[] {
    // 頻出質問を抽出（実際にはNLP等でクラスタリング）
    return [
      {
        question: 'アカウントのパスワードをリセットするには？',
        answer: 'ログイン画面の「パスワードを忘れた」をクリックし、メールアドレスを入力してください。',
        category: tickets[0]?.category || 'general',
        relatedQuestions: ['二段階認証の設定方法は？', 'メールアドレスの変更方法は？'],
        popularity: 45,
        lastUpdated: new Date()
      }
    ];
  }

  private calculateFAQCoverage(tickets: SupportTicket[], faqCount: number): number {
    // FAQ カバー率を計算
    return Math.min(100, (faqCount / tickets.length) * 100);
  }

  private findSolutions(inquiry: CustomerInquiry): Solution[] {
    return [
      {
        description: 'アカウント設定から該当項目を確認',
        steps: [
          'ダッシュボードにログイン',
          '設定メニューを開く',
          '該当項目を確認・変更',
          '変更を保存'
        ],
        difficulty: 'easy',
        estimatedTime: '5分',
        successRate: 95
      }
    ];
  }

  private identifyRootCause(inquiry: CustomerInquiry): string {
    return '初期設定が不完全なことが原因と思われます';
  }

  private shouldEscalateToHuman(inquiry: CustomerInquiry, complexity: string): boolean {
    return complexity === 'high' || inquiry.priority === 'urgent';
  }

  private determineDepartment(inquiry: CustomerInquiry): string {
    if (inquiry.category?.includes('技術')) return 'テクニカルサポート';
    if (inquiry.category?.includes('請求')) return '経理部門';
    return '一般サポート';
  }

  private groupSatisfactionByCategory(data: SatisfactionData[]): { [key: string]: any } {
    // カテゴリ別満足度（ダミー実装）
    return {
      '技術サポート': { averageRating: 4.2, responseCount: 120 },
      '請求問い合わせ': { averageRating: 4.5, responseCount: 80 }
    };
  }

  private groupSatisfactionByChannel(data: SatisfactionData[]): { [key: string]: any } {
    // チャネル別満足度（ダミー実装）
    return {
      'email': { averageRating: 4.1, responseCount: 100 },
      'chat': { averageRating: 4.6, responseCount: 150 }
    };
  }

  private extractTopComplaints(data: SatisfactionData[]): string[] {
    const complaints = data
      .filter(d => d.feedback && d.rating <= 2)
      .map(d => d.feedback!)
      .slice(0, 5);

    return complaints.length > 0 ? complaints : ['応答時間が長い', '解決策が不明確'];
  }
}
