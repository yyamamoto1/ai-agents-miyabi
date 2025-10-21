/**
 * AI Side Business Model Agent
 * 副業ビジネスモデル構築の専門家
 *
 * 主な機能:
 * - 副業アイデア提案
 * - ビジネスモデル設計
 * - 収益予測とシミュレーション
 * - リスク分析
 * - 実行計画作成
 * - スキルマッチング
 * - 競合分析
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

// 副業アイデア提案入力
interface SideBusinessIdeaInput {
  userProfile: {
    skills: string[];
    experience: string[];
    interests: string[];
    availableTimePerWeek: number; // hours
    initialBudget: number;
  };
  goals: {
    targetMonthlyIncome: number;
    timeframe: string; // e.g., "6 months"
    workLifeBalance: 'flexible' | 'moderate' | 'intensive';
  };
  constraints?: {
    legalRestrictions?: string[];
    timeConstraints?: string[];
    resourceLimitations?: string[];
  };
}

// 副業アイデア提案出力
interface SideBusinessIdea {
  ideas: Array<{
    name: string;
    category: string;
    description: string;
    targetMarket: string;
    uniqueSellingPoint: string;
    requiredSkills: string[];
    matchScore: number; // 0-100
    potentialIncome: {
      low: number;
      mid: number;
      high: number;
    };
    timeCommitment: {
      startupPhase: string;
      ongoingMaintenance: string;
    };
    initialInvestment: number;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
    scalability: 'low' | 'medium' | 'high';
    pros: string[];
    cons: string[];
  }>;
  recommendations: {
    topPick: string;
    rationale: string;
    nextSteps: string[];
  };
}

// ビジネスモデル設計入力
interface BusinessModelDesignInput {
  businessIdea: string;
  targetCustomer: {
    demographics: string;
    painPoints: string[];
    needs: string[];
  };
  valueProposition: string;
  revenueModel: 'product' | 'service' | 'subscription' | 'marketplace' | 'advertising' | 'hybrid';
}

// ビジネスモデル設計出力
interface BusinessModelCanvas {
  customerSegments: {
    segment: string;
    description: string;
    size: string;
    characteristics: string[];
  }[];
  valuePropositions: {
    proposition: string;
    customerProblem: string;
    solution: string;
    benefits: string[];
  }[];
  channels: {
    channel: string;
    type: 'acquisition' | 'delivery' | 'support';
    strategy: string;
    cost: string;
  }[];
  customerRelationships: {
    segment: string;
    relationshipType: string;
    strategy: string;
  }[];
  revenueStreams: {
    stream: string;
    type: string;
    pricingModel: string;
    projectedRevenue: string;
  }[];
  keyResources: {
    resource: string;
    type: 'physical' | 'intellectual' | 'human' | 'financial';
    importance: 'critical' | 'important' | 'nice-to-have';
  }[];
  keyActivities: {
    activity: string;
    category: 'production' | 'problem-solving' | 'platform';
    priority: 'high' | 'medium' | 'low';
  }[];
  keyPartnerships: {
    partner: string;
    type: string;
    contribution: string;
  }[];
  costStructure: {
    costItem: string;
    type: 'fixed' | 'variable';
    amount: string;
    percentage: number;
  }[];
  competitiveAdvantage: string[];
  riskFactors: string[];
}

// 収益予測入力
interface RevenueForecastInput {
  businessModel: string;
  pricingStrategy: {
    productPrice?: number;
    serviceRate?: number;
    subscriptionFee?: number;
  };
  marketAssumptions: {
    targetCustomers: number;
    conversionRate: number; // percentage
    averageOrderValue: number;
    repeatPurchaseRate?: number;
  };
  timeframe: number; // months
  growthRate: number; // monthly percentage
}

// 収益予測出力
interface RevenueForecast {
  monthlyProjections: Array<{
    month: number;
    customers: number;
    revenue: number;
    costs: number;
    profit: number;
    cumulativeProfit: number;
  }>;
  summary: {
    totalRevenue: number;
    totalCosts: number;
    netProfit: number;
    averageMonthlyRevenue: number;
    breakEvenMonth: number;
    roi: number;
  };
  keyMetrics: {
    customerAcquisitionCost: number;
    lifetimeValue: number;
    paybackPeriod: string;
    profitMargin: number;
  };
  scenarios: {
    conservative: { revenue: number; profit: number };
    realistic: { revenue: number; profit: number };
    optimistic: { revenue: number; profit: number };
  };
  assumptions: string[];
  recommendations: string[];
}

// リスク分析入力
interface RiskAnalysisInput {
  businessIdea: string;
  businessModel: BusinessModelCanvas;
  marketConditions: string;
  userExperience: string;
}

// リスク分析出力
interface RiskAnalysis {
  riskCategories: Array<{
    category: string;
    risks: Array<{
      risk: string;
      probability: 'low' | 'medium' | 'high';
      impact: 'low' | 'medium' | 'high';
      severity: number; // 1-10
      mitigation: string[];
      contingencyPlan: string;
    }>;
  }>;
  overallRiskScore: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  criticalRisks: string[];
  riskMatrix: {
    lowProbLowImpact: string[];
    lowProbHighImpact: string[];
    highProbLowImpact: string[];
    highProbHighImpact: string[];
  };
  recommendations: string[];
  legalCompliance: {
    requirement: string;
    status: 'compliant' | 'needs-attention' | 'not-applicable';
    action: string;
  }[];
}

// 実行計画入力
interface ExecutionPlanInput {
  businessIdea: string;
  businessModel: BusinessModelCanvas;
  targetLaunchDate: string;
  availableResources: {
    time: number; // hours per week
    budget: number;
    team?: string[];
  };
}

// 実行計画出力
interface ExecutionPlan {
  phases: Array<{
    phase: string;
    duration: string;
    startDate: string;
    endDate: string;
    objectives: string[];
    milestones: Array<{
      milestone: string;
      deadline: string;
      deliverables: string[];
      successCriteria: string[];
    }>;
    tasks: Array<{
      task: string;
      owner: string;
      priority: 'critical' | 'high' | 'medium' | 'low';
      estimatedHours: number;
      dependencies: string[];
      status: 'not-started' | 'in-progress' | 'completed';
    }>;
    budget: number;
  }>;
  timeline: {
    totalDuration: string;
    criticalPath: string[];
    bufferTime: string;
  };
  resourceAllocation: {
    resource: string;
    allocation: string;
    cost: number;
  }[];
  kpis: {
    kpi: string;
    target: string;
    measurement: string;
    frequency: string;
  }[];
  dependencies: {
    dependency: string;
    type: 'internal' | 'external';
    criticalPath: boolean;
    mitigation: string;
  }[];
  quickWins: string[];
  launchChecklist: string[];
}

// スキルマッチング入力
interface SkillMatchingInput {
  currentSkills: string[];
  businessIdea: string;
  targetRole: string;
}

// スキルマッチング出力
interface SkillMatching {
  matchAnalysis: {
    overallMatch: number; // percentage
    matchLevel: 'excellent' | 'good' | 'fair' | 'poor';
  };
  skillGaps: Array<{
    skill: string;
    importance: 'critical' | 'important' | 'nice-to-have';
    currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';
    targetLevel: string;
    gap: string;
  }>;
  learningPath: Array<{
    skill: string;
    priority: number;
    learningResources: Array<{
      type: 'course' | 'book' | 'tutorial' | 'practice';
      name: string;
      duration: string;
      cost: string;
      url?: string;
    }>;
    estimatedTimeToLearn: string;
    practiceProjects: string[];
  }>;
  alternativeApproaches: Array<{
    approach: string;
    description: string;
    skillRequirements: string[];
    viability: string;
  }>;
  leverageableSkills: {
    skill: string;
    application: string;
    competitiveAdvantage: string;
  }[];
  timeline: {
    immediate: string[]; // 0-1 month
    shortTerm: string[]; // 1-3 months
    mediumTerm: string[]; // 3-6 months
    longTerm: string[]; // 6+ months
  };
}

// 競合分析入力
interface CompetitorAnalysisInput {
  businessIdea: string;
  targetMarket: string;
  geography: string;
  competitors?: string[];
}

// 競合分析出力
interface CompetitorAnalysis {
  marketOverview: {
    marketSize: string;
    marketGrowth: string;
    trends: string[];
    opportunities: string[];
    threats: string[];
  };
  competitors: Array<{
    name: string;
    type: 'direct' | 'indirect' | 'substitute';
    strengths: string[];
    weaknesses: string[];
    marketShare: string;
    pricing: string;
    targetCustomer: string;
    uniqueSellingPoint: string;
    onlinePresence: {
      website: string;
      socialMedia: string[];
      rating: number;
      reviews: number;
    };
  }>;
  competitivePositioning: {
    yourPosition: string;
    differentiators: string[];
    competitiveAdvantages: string[];
    areasOfConcern: string[];
  };
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  barrierToEntry: {
    barrier: string;
    level: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];
  recommendations: {
    positioning: string[];
    differentiation: string[];
    goToMarket: string[];
  };
}

export class AISideBusinessModelAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS.SIDE_BUSINESS_MODEL;
    super({
      name: config.name,
      role: config.role,
      category: config.category,
      description: config.description,
      capabilities: config.capabilities,
    });
  }

  protected async setup(): Promise<void> {
    this.log('AI Side Business Model Agent をセットアップしています...', 'info');
    // 初期化処理
    this.log('セットアップ完了', 'info');
  }

  protected async process(task: AgentTask): Promise<any> {
    this.log(`タスクを処理中: ${task.type}`);

    switch (task.type) {
      case 'idea-generation':
        return this.generateBusinessIdeas(task.input as SideBusinessIdeaInput);

      case 'business-model-design':
        return this.designBusinessModel(task.input as BusinessModelDesignInput);

      case 'revenue-forecast':
        return this.forecastRevenue(task.input as RevenueForecastInput);

      case 'risk-analysis':
        return this.analyzeRisks(task.input as RiskAnalysisInput);

      case 'execution-plan':
        return this.createExecutionPlan(task.input as ExecutionPlanInput);

      case 'skill-matching':
        return this.matchSkills(task.input as SkillMatchingInput);

      case 'competitor-analysis':
        return this.analyzeCompetitors(task.input as CompetitorAnalysisInput);

      default:
        throw new Error(`未対応のタスクタイプ: ${task.type}`);
    }
  }

  /**
   * 副業アイデア生成
   */
  private async generateBusinessIdeas(input: SideBusinessIdeaInput): Promise<SideBusinessIdea> {
    this.log('副業アイデアを生成中...');

    const ideas = this.createBusinessIdeas(input);
    const rankedIdeas = this.rankIdeasByMatch(ideas, input);
    const topPick = rankedIdeas[0];

    const result: SideBusinessIdea = {
      ideas: rankedIdeas,
      recommendations: {
        topPick: topPick.name,
        rationale: this.explainTopPick(topPick, input),
        nextSteps: this.defineNextSteps(topPick),
      },
    };

    this.log(`${ideas.length}個のアイデアを生成完了`);
    return result;
  }

  /**
   * ビジネスモデル設計
   */
  private async designBusinessModel(input: BusinessModelDesignInput): Promise<BusinessModelCanvas> {
    this.log('ビジネスモデルキャンバスを設計中...');

    const canvas: BusinessModelCanvas = {
      customerSegments: this.defineCustomerSegments(input.targetCustomer),
      valuePropositions: this.defineValuePropositions(input.valueProposition, input.targetCustomer),
      channels: this.defineChannels(input.revenueModel),
      customerRelationships: this.defineCustomerRelationships(input.targetCustomer),
      revenueStreams: this.defineRevenueStreams(input.revenueModel),
      keyResources: this.defineKeyResources(input.businessIdea, input.revenueModel),
      keyActivities: this.defineKeyActivities(input.revenueModel),
      keyPartnerships: this.defineKeyPartnerships(input.businessIdea),
      costStructure: this.defineCostStructure(input.revenueModel),
      competitiveAdvantage: this.identifyCompetitiveAdvantages(input.valueProposition),
      riskFactors: this.identifyRiskFactors(input.revenueModel),
    };

    this.log('ビジネスモデルキャンバス設計完了');
    return canvas;
  }

  /**
   * 収益予測
   */
  private async forecastRevenue(input: RevenueForecastInput): Promise<RevenueForecast> {
    this.log('収益を予測中...');

    const monthlyProjections = this.calculateMonthlyProjections(input);
    const summary = this.calculateSummary(monthlyProjections);
    const keyMetrics = this.calculateKeyMetrics(input, summary);
    const scenarios = this.calculateScenarios(input);

    const forecast: RevenueForecast = {
      monthlyProjections,
      summary,
      keyMetrics,
      scenarios,
      assumptions: this.listAssumptions(input),
      recommendations: this.generateForecastRecommendations(summary, keyMetrics),
    };

    this.log('収益予測完了');
    return forecast;
  }

  /**
   * リスク分析
   */
  private async analyzeRisks(input: RiskAnalysisInput): Promise<RiskAnalysis> {
    this.log('リスクを分析中...');

    const riskCategories = this.identifyRiskCategories(input);
    const overallRiskScore = this.calculateOverallRiskScore(riskCategories);
    const riskLevel = this.determineRiskLevel(overallRiskScore);
    const criticalRisks = this.extractCriticalRisks(riskCategories);
    const riskMatrix = this.buildRiskMatrix(riskCategories);
    const legalCompliance = this.assessLegalCompliance(input.businessIdea);

    const analysis: RiskAnalysis = {
      riskCategories,
      overallRiskScore,
      riskLevel,
      criticalRisks,
      riskMatrix,
      recommendations: this.generateRiskRecommendations(criticalRisks, riskLevel),
      legalCompliance,
    };

    this.log('リスク分析完了');
    return analysis;
  }

  /**
   * 実行計画作成
   */
  private async createExecutionPlan(input: ExecutionPlanInput): Promise<ExecutionPlan> {
    this.log('実行計画を作成中...');

    const phases = this.definePhases(input);
    const timeline = this.calculateTimeline(phases);
    const resourceAllocation = this.allocateResources(input.availableResources, phases);
    const kpis = this.defineKPIs(input.businessIdea);
    const dependencies = this.identifyDependencies(phases);
    const quickWins = this.identifyQuickWins(phases);
    const launchChecklist = this.createLaunchChecklist(input.businessIdea);

    const plan: ExecutionPlan = {
      phases,
      timeline,
      resourceAllocation,
      kpis,
      dependencies,
      quickWins,
      launchChecklist,
    };

    this.log('実行計画作成完了');
    return plan;
  }

  /**
   * スキルマッチング
   */
  private async matchSkills(input: SkillMatchingInput): Promise<SkillMatching> {
    this.log('スキルマッチングを実施中...');

    const requiredSkills = this.identifyRequiredSkills(input.businessIdea, input.targetRole);
    const matchAnalysis = this.analyzeSkillMatch(input.currentSkills, requiredSkills);
    const skillGaps = this.identifySkillGaps(input.currentSkills, requiredSkills);
    const learningPath = this.createLearningPath(skillGaps);
    const alternativeApproaches = this.suggestAlternatives(skillGaps, input.businessIdea);
    const leverageableSkills = this.identifyLeverageableSkills(input.currentSkills, input.businessIdea);
    const timeline = this.createSkillTimeline(learningPath);

    const matching: SkillMatching = {
      matchAnalysis,
      skillGaps,
      learningPath,
      alternativeApproaches,
      leverageableSkills,
      timeline,
    };

    this.log('スキルマッチング完了');
    return matching;
  }

  /**
   * 競合分析
   */
  private async analyzeCompetitors(input: CompetitorAnalysisInput): Promise<CompetitorAnalysis> {
    this.log('競合を分析中...');

    const marketOverview = this.analyzeMarket(input.targetMarket, input.geography);
    const competitors = this.identifyCompetitors(input.businessIdea, input.targetMarket);
    const competitivePositioning = this.determinePositioning(input.businessIdea, competitors);
    const swotAnalysis = this.conductSWOT(input.businessIdea, competitors, marketOverview);
    const barrierToEntry = this.assessBarriers(input.targetMarket);
    const recommendations = this.generateCompetitiveRecommendations(
      competitivePositioning,
      swotAnalysis
    );

    const analysis: CompetitorAnalysis = {
      marketOverview,
      competitors,
      competitivePositioning,
      swotAnalysis,
      barrierToEntry,
      recommendations,
    };

    this.log('競合分析完了');
    return analysis;
  }

  // ===== ヘルパーメソッド =====

  private createBusinessIdeas(input: SideBusinessIdeaInput): any[] {
    const skillBasedIdeas = this.generateSkillBasedIdeas(input.userProfile.skills);
    const interestBasedIdeas = this.generateInterestBasedIdeas(input.userProfile.interests);
    const trendBasedIdeas = this.generateTrendBasedIdeas();

    return [...skillBasedIdeas, ...interestBasedIdeas, ...trendBasedIdeas];
  }

  private generateSkillBasedIdeas(skills: string[]): any[] {
    // スキルに基づくアイデア生成
    return skills.slice(0, 3).map((skill, i) => ({
      name: `${skill}コンサルティング`,
      category: 'service',
      description: `${skill}のスキルを活かしたコンサルティングサービス`,
      targetMarket: `${skill}を必要とする企業・個人`,
      uniqueSellingPoint: `専門的な${skill}スキル`,
      requiredSkills: [skill, 'コミュニケーション', 'マーケティング'],
      matchScore: 85 - i * 5,
      potentialIncome: { low: 3000, mid: 7000, high: 15000 },
      timeCommitment: {
        startupPhase: '10-15時間/週',
        ongoingMaintenance: '5-10時間/週',
      },
      initialInvestment: 500,
      difficultyLevel: 'intermediate' as const,
      scalability: 'medium' as const,
      pros: ['低初期投資', 'スキル活用', '柔軟な時間'],
      cons: ['収入の不安定性', '営業活動必要'],
    }));
  }

  private generateInterestBasedIdeas(interests: string[]): any[] {
    // 興味に基づくアイデア生成
    return interests.slice(0, 2).map((interest, i) => ({
      name: `${interest}ブログ/YouTube`,
      category: 'content',
      description: `${interest}に関するコンテンツ作成`,
      targetMarket: `${interest}に興味がある人々`,
      uniqueSellingPoint: `情熱と専門知識`,
      requiredSkills: ['コンテンツ作成', 'SEO', 'SNSマーケティング'],
      matchScore: 75 - i * 5,
      potentialIncome: { low: 500, mid: 3000, high: 10000 },
      timeCommitment: {
        startupPhase: '15-20時間/週',
        ongoingMaintenance: '10-15時間/週',
      },
      initialInvestment: 1000,
      difficultyLevel: 'beginner' as const,
      scalability: 'high' as const,
      pros: ['情熱を活かせる', '高いスケーラビリティ'],
      cons: ['収益化に時間', '競争激しい'],
    }));
  }

  private generateTrendBasedIdeas(): any[] {
    // トレンドに基づくアイデア
    return [
      {
        name: 'オンライン教育プラットフォーム',
        category: 'platform',
        description: '特定スキルのオンライン講座',
        targetMarket: 'スキルアップを目指す社会人',
        uniqueSellingPoint: '実践的な内容',
        requiredSkills: ['教育', 'ビデオ編集', 'マーケティング'],
        matchScore: 70,
        potentialIncome: { low: 2000, mid: 8000, high: 20000 },
        timeCommitment: {
          startupPhase: '20-25時間/週',
          ongoingMaintenance: '5-10時間/週',
        },
        initialInvestment: 2000,
        difficultyLevel: 'intermediate' as const,
        scalability: 'high' as const,
        pros: ['受動的収入', 'スケーラブル'],
        cons: ['初期投資大', 'コンテンツ作成時間'],
      },
    ];
  }

  private rankIdeasByMatch(ideas: any[], input: SideBusinessIdeaInput): any[] {
    return ideas.sort((a, b) => b.matchScore - a.matchScore);
  }

  private explainTopPick(idea: any, input: SideBusinessIdeaInput): string {
    return `${idea.name}はあなたのスキル（${input.userProfile.skills.join(', ')}）と目標収入（$${input.goals.targetMonthlyIncome}/月）に最も適合しています。`;
  }

  private defineNextSteps(idea: any): string[] {
    return [
      '市場調査を実施',
      'ビジネスプランを作成',
      '最小限の製品/サービスを開発',
      'パイロット顧客を獲得',
      'フィードバックに基づき改善',
    ];
  }

  private defineCustomerSegments(targetCustomer: any): any[] {
    return [
      {
        segment: 'プライマリセグメント',
        description: targetCustomer.demographics,
        size: '1,000-10,000',
        characteristics: targetCustomer.needs,
      },
    ];
  }

  private defineValuePropositions(valueProposition: string, targetCustomer: any): any[] {
    return [
      {
        proposition: valueProposition,
        customerProblem: targetCustomer.painPoints[0] || '顧客の課題',
        solution: valueProposition,
        benefits: ['時間節約', 'コスト削減', '品質向上'],
      },
    ];
  }

  private defineChannels(revenueModel: string): any[] {
    const baseChannels: Array<{
      channel: string;
      type: 'acquisition' | 'delivery' | 'support';
      strategy: string;
      cost: string;
    }> = [
      {
        channel: 'ウェブサイト',
        type: 'acquisition',
        strategy: 'SEO + コンテンツマーケティング',
        cost: '低',
      },
      {
        channel: 'SNS',
        type: 'acquisition',
        strategy: 'オーガニック + 有料広告',
        cost: '中',
      },
    ];

    if (revenueModel === 'marketplace') {
      baseChannels.push({
        channel: 'マーケットプレイス',
        type: 'delivery',
        strategy: 'プラットフォーム活用',
        cost: '低',
      });
    }

    return baseChannels;
  }

  private defineCustomerRelationships(targetCustomer: any): any[] {
    return [
      {
        segment: 'プライマリ顧客',
        relationshipType: 'パーソナルアシスタンス',
        strategy: 'カスタマーサポート + コミュニティ',
      },
    ];
  }

  private defineRevenueStreams(revenueModel: string): any[] {
    const models: Record<string, any> = {
      product: {
        stream: '製品販売',
        type: '資産売却',
        pricingModel: '固定価格',
        projectedRevenue: '$3,000-$10,000/月',
      },
      service: {
        stream: 'サービス提供',
        type: '使用料',
        pricingModel: '時給/プロジェクト',
        projectedRevenue: '$5,000-$15,000/月',
      },
      subscription: {
        stream: 'サブスクリプション',
        type: '購読料',
        pricingModel: '月額課金',
        projectedRevenue: '$2,000-$20,000/月',
      },
      marketplace: {
        stream: '手数料',
        type: '仲介',
        pricingModel: '取引手数料',
        projectedRevenue: '$1,000-$10,000/月',
      },
      advertising: {
        stream: '広告収入',
        type: '広告',
        pricingModel: 'CPM/CPC',
        projectedRevenue: '$500-$5,000/月',
      },
      hybrid: {
        stream: '複合収益',
        type: '複数',
        pricingModel: '複合',
        projectedRevenue: '$3,000-$15,000/月',
      },
    };

    return [models[revenueModel] || models.service];
  }

  private defineKeyResources(businessIdea: string, revenueModel: string): any[] {
    return [
      {
        resource: 'スキル・専門知識',
        type: 'intellectual' as const,
        importance: 'critical' as const,
      },
      {
        resource: 'ウェブサイト/プラットフォーム',
        type: 'physical' as const,
        importance: 'critical' as const,
      },
      {
        resource: '時間',
        type: 'human' as const,
        importance: 'critical' as const,
      },
      {
        resource: '初期資金',
        type: 'financial' as const,
        importance: 'important' as const,
      },
    ];
  }

  private defineKeyActivities(revenueModel: string): any[] {
    return [
      {
        activity: 'マーケティング・集客',
        category: 'problem-solving' as const,
        priority: 'high' as const,
      },
      {
        activity: '製品/サービス提供',
        category: 'production' as const,
        priority: 'high' as const,
      },
      {
        activity: '顧客サポート',
        category: 'problem-solving' as const,
        priority: 'medium' as const,
      },
    ];
  }

  private defineKeyPartnerships(businessIdea: string): any[] {
    return [
      {
        partner: '決済プロバイダー',
        type: 'サプライヤー',
        contribution: '決済処理',
      },
      {
        partner: 'マーケティングツール',
        type: 'サービスプロバイダー',
        contribution: '集客支援',
      },
    ];
  }

  private defineCostStructure(revenueModel: string): any[] {
    return [
      {
        costItem: 'マーケティング費用',
        type: 'variable' as const,
        amount: '$200-$1,000/月',
        percentage: 30,
      },
      {
        costItem: 'ツール・サブスクリプション',
        type: 'fixed' as const,
        amount: '$50-$200/月',
        percentage: 10,
      },
      {
        costItem: 'その他運営費',
        type: 'variable' as const,
        amount: '$100-$500/月',
        percentage: 15,
      },
    ];
  }

  private identifyCompetitiveAdvantages(valueProposition: string): string[] {
    return [
      'ニッチな専門性',
      'パーソナライズされたサービス',
      '低コスト構造',
    ];
  }

  private identifyRiskFactors(revenueModel: string): string[] {
    return [
      '市場競争',
      '需要変動',
      '規制変更',
    ];
  }

  private calculateMonthlyProjections(input: RevenueForecastInput): any[] {
    const projections = [];
    let customers = input.marketAssumptions.targetCustomers / 12;
    let cumulativeProfit = 0;

    for (let month = 1; month <= input.timeframe; month++) {
      const revenue = customers * input.marketAssumptions.averageOrderValue;
      const costs = revenue * 0.4; // 40% コスト
      const profit = revenue - costs;
      cumulativeProfit += profit;

      projections.push({
        month,
        customers: Math.round(customers),
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(profit),
        cumulativeProfit: Math.round(cumulativeProfit),
      });

      customers *= 1 + input.growthRate / 100;
    }

    return projections;
  }

  private calculateSummary(projections: any[]): any {
    const totalRevenue = projections.reduce((sum, p) => sum + p.revenue, 0);
    const totalCosts = projections.reduce((sum, p) => sum + p.costs, 0);
    const netProfit = totalRevenue - totalCosts;
    const averageMonthlyRevenue = totalRevenue / projections.length;
    const breakEvenMonth = projections.findIndex(p => p.cumulativeProfit > 0) + 1;

    return {
      totalRevenue: Math.round(totalRevenue),
      totalCosts: Math.round(totalCosts),
      netProfit: Math.round(netProfit),
      averageMonthlyRevenue: Math.round(averageMonthlyRevenue),
      breakEvenMonth: breakEvenMonth > 0 ? breakEvenMonth : projections.length,
      roi: Math.round((netProfit / totalCosts) * 100),
    };
  }

  private calculateKeyMetrics(input: RevenueForecastInput, summary: any): any {
    return {
      customerAcquisitionCost: 50,
      lifetimeValue: input.marketAssumptions.averageOrderValue * 3,
      paybackPeriod: '2-3ヶ月',
      profitMargin: Math.round(((summary.totalRevenue - summary.totalCosts) / summary.totalRevenue) * 100),
    };
  }

  private calculateScenarios(input: RevenueForecastInput): any {
    const baseRevenue = input.marketAssumptions.targetCustomers * input.marketAssumptions.averageOrderValue;

    return {
      conservative: {
        revenue: Math.round(baseRevenue * 0.7 * input.timeframe),
        profit: Math.round(baseRevenue * 0.7 * input.timeframe * 0.3),
      },
      realistic: {
        revenue: Math.round(baseRevenue * input.timeframe),
        profit: Math.round(baseRevenue * input.timeframe * 0.4),
      },
      optimistic: {
        revenue: Math.round(baseRevenue * 1.5 * input.timeframe),
        profit: Math.round(baseRevenue * 1.5 * input.timeframe * 0.5),
      },
    };
  }

  private listAssumptions(input: RevenueForecastInput): string[] {
    return [
      `コンバージョン率: ${input.marketAssumptions.conversionRate}%`,
      `平均注文額: $${input.marketAssumptions.averageOrderValue}`,
      `月次成長率: ${input.growthRate}%`,
      `コスト率: 40%`,
    ];
  }

  private generateForecastRecommendations(summary: any, keyMetrics: any): string[] {
    return [
      `損益分岐点: ${summary.breakEvenMonth}ヶ月目`,
      `顧客獲得コストを$${keyMetrics.customerAcquisitionCost}以下に維持`,
      `利益率${keyMetrics.profitMargin}%を目標に運営`,
    ];
  }

  private identifyRiskCategories(input: RiskAnalysisInput): any[] {
    return [
      {
        category: '市場リスク',
        risks: [
          {
            risk: '需要不足',
            probability: 'medium' as const,
            impact: 'high' as const,
            severity: 7,
            mitigation: ['市場調査', 'MVPテスト', 'パイロット顧客'],
            contingencyPlan: 'ピボットまたは事業撤退',
          },
        ],
      },
      {
        category: '運営リスク',
        risks: [
          {
            risk: '時間不足',
            probability: 'medium' as const,
            impact: 'medium' as const,
            severity: 5,
            mitigation: ['タスク自動化', '外注活用'],
            contingencyPlan: 'スケール縮小',
          },
        ],
      },
      {
        category: '財務リスク',
        risks: [
          {
            risk: 'キャッシュフロー不足',
            probability: 'low' as const,
            impact: 'high' as const,
            severity: 6,
            mitigation: ['コスト管理', '緊急資金確保'],
            contingencyPlan: '追加資金調達',
          },
        ],
      },
    ];
  }

  private calculateOverallRiskScore(categories: any[]): number {
    const allRisks = categories.flatMap(c => c.risks);
    const avgSeverity = allRisks.reduce((sum, r) => sum + r.severity, 0) / allRisks.length;
    return Math.round(avgSeverity * 10);
  }

  private determineRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'very-high' {
    if (score < 30) return 'low';
    if (score < 50) return 'moderate';
    if (score < 70) return 'high';
    return 'very-high';
  }

  private extractCriticalRisks(categories: any[]): string[] {
    return categories
      .flatMap(c => c.risks)
      .filter(r => r.severity >= 7)
      .map(r => r.risk);
  }

  private buildRiskMatrix(categories: any[]): any {
    const allRisks = categories.flatMap(c => c.risks);

    return {
      lowProbLowImpact: allRisks.filter(r => r.probability === 'low' && r.impact === 'low').map(r => r.risk),
      lowProbHighImpact: allRisks.filter(r => r.probability === 'low' && r.impact === 'high').map(r => r.risk),
      highProbLowImpact: allRisks.filter(r => r.probability === 'high' && r.impact === 'low').map(r => r.risk),
      highProbHighImpact: allRisks.filter(r => r.probability === 'high' && r.impact === 'high').map(r => r.risk),
    };
  }

  private assessLegalCompliance(businessIdea: string): any[] {
    return [
      {
        requirement: '事業登録',
        status: 'needs-attention' as const,
        action: '個人事業主登録または法人設立',
      },
      {
        requirement: '税務申告',
        status: 'needs-attention' as const,
        action: '確定申告の準備',
      },
      {
        requirement: '許認可',
        status: 'not-applicable' as const,
        action: '業種により確認必要',
      },
    ];
  }

  private generateRiskRecommendations(criticalRisks: string[], riskLevel: string): string[] {
    return [
      `リスクレベル: ${riskLevel}`,
      '重要リスクの対策を優先実施',
      '定期的なリスク評価',
    ];
  }

  private definePhases(input: ExecutionPlanInput): any[] {
    const now = new Date(input.targetLaunchDate);

    return [
      {
        phase: '準備フェーズ',
        duration: '4週間',
        startDate: new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        objectives: ['市場調査完了', 'ビジネスプラン策定'],
        milestones: [
          {
            milestone: '市場調査完了',
            deadline: new Date(now.getTime() - 10 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            deliverables: ['調査レポート', '競合分析'],
            successCriteria: ['ターゲット市場明確化', '競合3社以上分析'],
          },
        ],
        tasks: [
          {
            task: '市場調査',
            owner: 'あなた',
            priority: 'critical' as const,
            estimatedHours: 20,
            dependencies: [],
            status: 'not-started' as const,
          },
        ],
        budget: input.availableResources.budget * 0.1,
      },
      {
        phase: '構築フェーズ',
        duration: '6週間',
        startDate: new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        objectives: ['MVP開発', 'マーケティング準備'],
        milestones: [
          {
            milestone: 'MVP完成',
            deadline: new Date(now.getTime() - 4 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            deliverables: ['製品/サービス', 'ウェブサイト'],
            successCriteria: ['基本機能実装', 'ユーザーテスト完了'],
          },
        ],
        tasks: [
          {
            task: 'MVP開発',
            owner: 'あなた',
            priority: 'critical' as const,
            estimatedHours: 80,
            dependencies: ['市場調査'],
            status: 'not-started' as const,
          },
        ],
        budget: input.availableResources.budget * 0.5,
      },
      {
        phase: 'ローンチフェーズ',
        duration: '2週間',
        startDate: new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: input.targetLaunchDate,
        objectives: ['ソフトローンチ', '初期顧客獲得'],
        milestones: [
          {
            milestone: 'ソフトローンチ',
            deadline: input.targetLaunchDate,
            deliverables: ['ローンチ', '初期顧客'],
            successCriteria: ['10人の初期ユーザー', 'フィードバック収集'],
          },
        ],
        tasks: [
          {
            task: 'ソフトローンチ',
            owner: 'あなた',
            priority: 'critical' as const,
            estimatedHours: 30,
            dependencies: ['MVP完成'],
            status: 'not-started' as const,
          },
        ],
        budget: input.availableResources.budget * 0.2,
      },
    ];
  }

  private calculateTimeline(phases: any[]): any {
    const totalWeeks = phases.reduce((sum, p) => sum + parseInt(p.duration), 0);

    return {
      totalDuration: `${totalWeeks}週間`,
      criticalPath: phases.map(p => p.phase),
      bufferTime: '2週間',
    };
  }

  private allocateResources(resources: any, phases: any[]): any[] {
    return [
      {
        resource: '時間',
        allocation: `${resources.time}時間/週`,
        cost: 0,
      },
      {
        resource: '資金',
        allocation: `$${resources.budget}`,
        cost: resources.budget,
      },
    ];
  }

  private defineKPIs(businessIdea: string): any[] {
    return [
      {
        kpi: '顧客獲得数',
        target: '月10人',
        measurement: '新規登録/契約数',
        frequency: '週次',
      },
      {
        kpi: '収益',
        target: '$3,000/月',
        measurement: '売上',
        frequency: '月次',
      },
      {
        kpi: '顧客満足度',
        target: 'NPS 50+',
        measurement: 'アンケート',
        frequency: '月次',
      },
    ];
  }

  private identifyDependencies(phases: any[]): any[] {
    return [
      {
        dependency: '市場調査完了',
        type: 'internal' as const,
        criticalPath: true,
        mitigation: '並行作業で時間短縮',
      },
    ];
  }

  private identifyQuickWins(phases: any[]): string[] {
    return [
      'SNSアカウント開設',
      'ウェブサイトβ版公開',
      '初期顧客へのテスト提供',
    ];
  }

  private createLaunchChecklist(businessIdea: string): string[] {
    return [
      '事業登録完了',
      'ウェブサイト公開',
      '決済システム設定',
      'マーケティング開始',
      '初期顧客獲得',
    ];
  }

  private identifyRequiredSkills(businessIdea: string, targetRole: string): string[] {
    return [
      'マーケティング',
      'セールス',
      'カスタマーサポート',
      '財務管理',
      '製品開発',
    ];
  }

  private analyzeSkillMatch(currentSkills: string[], requiredSkills: string[]): any {
    const matchCount = currentSkills.filter(s => requiredSkills.includes(s)).length;
    const matchPercentage = Math.round((matchCount / requiredSkills.length) * 100);

    let matchLevel: 'excellent' | 'good' | 'fair' | 'poor';
    if (matchPercentage >= 80) matchLevel = 'excellent';
    else if (matchPercentage >= 60) matchLevel = 'good';
    else if (matchPercentage >= 40) matchLevel = 'fair';
    else matchLevel = 'poor';

    return {
      overallMatch: matchPercentage,
      matchLevel,
    };
  }

  private identifySkillGaps(currentSkills: string[], requiredSkills: string[]): any[] {
    return requiredSkills
      .filter(skill => !currentSkills.includes(skill))
      .map(skill => ({
        skill,
        importance: 'important' as const,
        currentLevel: 'none' as const,
        targetLevel: 'intermediate',
        gap: 'beginner → intermediate',
      }));
  }

  private createLearningPath(skillGaps: any[]): any[] {
    return skillGaps.map((gap, i) => ({
      skill: gap.skill,
      priority: i + 1,
      learningResources: [
        {
          type: 'course' as const,
          name: `${gap.skill}オンラインコース`,
          duration: '4-6週間',
          cost: '$50-$200',
        },
      ],
      estimatedTimeToLearn: '1-2ヶ月',
      practiceProjects: [`${gap.skill}ミニプロジェクト`],
    }));
  }

  private suggestAlternatives(skillGaps: any[], businessIdea: string): any[] {
    return [
      {
        approach: '外注・委託',
        description: 'スキルギャップ部分を専門家に委託',
        skillRequirements: ['プロジェクト管理', 'コミュニケーション'],
        viability: '中〜高',
      },
    ];
  }

  private identifyLeverageableSkills(currentSkills: string[], businessIdea: string): any[] {
    return currentSkills.slice(0, 3).map(skill => ({
      skill,
      application: `${skill}を活かした差別化`,
      competitiveAdvantage: `${skill}の専門性`,
    }));
  }

  private createSkillTimeline(learningPath: any[]): any {
    return {
      immediate: ['基礎学習開始'],
      shortTerm: learningPath.slice(0, 2).map(l => l.skill),
      mediumTerm: learningPath.slice(2, 4).map(l => l.skill),
      longTerm: learningPath.slice(4).map(l => l.skill),
    };
  }

  private analyzeMarket(targetMarket: string, geography: string): any {
    return {
      marketSize: '$1B - $10B',
      marketGrowth: '10-20% 年間成長',
      trends: ['デジタル化', 'リモートワーク', 'パーソナライゼーション'],
      opportunities: ['ニッチ市場', '未開拓セグメント'],
      threats: ['競争激化', '規制変更'],
    };
  }

  private identifyCompetitors(businessIdea: string, targetMarket: string): any[] {
    return [
      {
        name: '競合A',
        type: 'direct' as const,
        strengths: ['ブランド認知', '資金力'],
        weaknesses: ['柔軟性欠如', '高価格'],
        marketShare: '30%',
        pricing: '$50-$100',
        targetCustomer: '大企業',
        uniqueSellingPoint: 'エンタープライズ機能',
        onlinePresence: {
          website: 'https://competitor-a.com',
          socialMedia: ['LinkedIn', 'Twitter'],
          rating: 4.2,
          reviews: 500,
        },
      },
    ];
  }

  private determinePositioning(businessIdea: string, competitors: any[]): any {
    return {
      yourPosition: 'ニッチ特化型',
      differentiators: ['パーソナルサービス', '低価格', '専門性'],
      competitiveAdvantages: ['柔軟性', 'カスタマイズ'],
      areasOfConcern: ['ブランド認知不足', '資金力'],
    };
  }

  private conductSWOT(businessIdea: string, competitors: any[], marketOverview: any): any {
    return {
      strengths: ['専門性', '低コスト', '柔軟性'],
      weaknesses: ['認知度', '資金', '規模'],
      opportunities: marketOverview.opportunities,
      threats: marketOverview.threats,
    };
  }

  private assessBarriers(targetMarket: string): any[] {
    return [
      {
        barrier: '初期投資',
        level: 'low' as const,
        mitigation: '段階的投資',
      },
      {
        barrier: '規制',
        level: 'medium' as const,
        mitigation: '法務アドバイザー活用',
      },
    ];
  }

  private generateCompetitiveRecommendations(positioning: any, swot: any): any {
    return {
      positioning: [
        'ニッチ市場に特化',
        '差別化要素を強調',
      ],
      differentiation: [
        'パーソナルサービス',
        '専門性の訴求',
      ],
      goToMarket: [
        'コンテンツマーケティング',
        '口コミ・紹介',
      ],
    };
  }

  protected async cleanup(): Promise<void> {
    this.log('クリーンアップ中...', 'info');
    // クリーンアップ処理
  }
}
