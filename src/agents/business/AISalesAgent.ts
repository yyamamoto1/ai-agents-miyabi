/**
 * AISalesAgent - 営業支援・リード管理エージェント
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: string;
  createdAt: Date;
  lastContactAt?: Date;
  interactions: Interaction[];
  customFields?: Record<string, any>;
}

export interface Interaction {
  type: 'email' | 'call' | 'meeting' | 'demo' | 'other';
  date: Date;
  notes: string;
  outcome?: string;
}

export interface LeadScore {
  leadId: string;
  score: number; // 0-100
  category: 'hot' | 'warm' | 'cold';
  factors: ScoringFactor[];
  recommendation: string;
  nextActions: string[];
}

export interface ScoringFactor {
  name: string;
  weight: number;
  value: number;
  contribution: number;
}

export interface SalesProposal {
  leadId: string;
  title: string;
  executiveSummary: string;
  problemStatement: string;
  proposedSolution: string;
  benefits: string[];
  pricing: PricingOption[];
  timeline: string;
  nextSteps: string[];
  callToAction: string;
}

export interface PricingOption {
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  features: string[];
  recommended?: boolean;
}

export interface SalesAnalytics {
  period: string;
  metrics: {
    totalLeads: number;
    qualifiedLeads: number;
    conversions: number;
    conversionRate: number;
    averageDealSize: number;
    salesCycleLength: number;
    revenue: number;
  };
  pipelineHealth: {
    stageDistribution: Record<string, number>;
    bottlenecks: string[];
    recommendations: string[];
  };
  topPerformers: {
    leadSources: Array<{ source: string; count: number; conversionRate: number }>;
    products: Array<{ product: string; revenue: number }>;
  };
}

export class AISalesAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.SALES_AGENT);
  }

  protected async setup(): Promise<void> {
    this.log('AI Sales Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const { action, data } = task.input;

    switch (action) {
      case 'scoreLead':
        return await this.scoreLead(data.lead);
      case 'scoreLeads':
        return await this.scoreLeads(data.leads);
      case 'generateProposal':
        return await this.generateSalesProposal(data.lead, data.context);
      case 'analyzePerformance':
        return await this.analyzeSalesPerformance(data.leads, data.deals);
      case 'recommendActions':
        return await this.recommendNextActions(data.lead);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  /**
   * リードスコアリング - 単一リード
   */
  private async scoreLead(lead: Lead): Promise<LeadScore> {
    const factors: ScoringFactor[] = [];

    // 1. エンゲージメントスコア (30%)
    const engagementScore = this.calculateEngagementScore(lead);
    factors.push({
      name: 'エンゲージメント',
      weight: 0.3,
      value: engagementScore,
      contribution: engagementScore * 0.3,
    });

    // 2. 会社規模スコア (25%)
    const companySizeScore = this.calculateCompanySizeScore(lead);
    factors.push({
      name: '会社規模',
      weight: 0.25,
      value: companySizeScore,
      contribution: companySizeScore * 0.25,
    });

    // 3. 予算適合性スコア (25%)
    const budgetFitScore = this.calculateBudgetFitScore(lead);
    factors.push({
      name: '予算適合性',
      weight: 0.25,
      value: budgetFitScore,
      contribution: budgetFitScore * 0.25,
    });

    // 4. タイミングスコア (20%)
    const timingScore = this.calculateTimingScore(lead);
    factors.push({
      name: 'タイミング',
      weight: 0.2,
      value: timingScore,
      contribution: timingScore * 0.2,
    });

    // 総合スコア計算
    const totalScore = Math.round(
      factors.reduce((sum, factor) => sum + factor.contribution, 0)
    );

    // カテゴリ分類
    let category: 'hot' | 'warm' | 'cold';
    if (totalScore >= 70) category = 'hot';
    else if (totalScore >= 40) category = 'warm';
    else category = 'cold';

    // 推奨アクション
    const recommendation = this.generateRecommendation(totalScore, factors, lead);
    const nextActions = this.generateNextActions(category, lead);

    return {
      leadId: lead.id,
      score: totalScore,
      category,
      factors,
      recommendation,
      nextActions,
    };
  }

  /**
   * 複数リードの一括スコアリング
   */
  private async scoreLeads(leads: Lead[]): Promise<LeadScore[]> {
    const scores = await Promise.all(leads.map((lead) => this.scoreLead(lead)));
    return scores.sort((a, b) => b.score - a.score);
  }

  /**
   * パーソナライズされた営業提案書の生成
   */
  private async generateSalesProposal(lead: Lead, context: any): Promise<SalesProposal> {
    const proposal: SalesProposal = {
      leadId: lead.id,
      title: `${lead.company}様向け ソリューション提案書`,
      executiveSummary: this.generateExecutiveSummary(lead, context),
      problemStatement: this.identifyProblem(lead, context),
      proposedSolution: this.proposeSolution(lead, context),
      benefits: this.listBenefits(lead, context),
      pricing: this.generatePricingOptions(lead, context),
      timeline: this.estimateTimeline(context),
      nextSteps: this.defineNextSteps(lead),
      callToAction: this.createCallToAction(lead),
    };

    return proposal;
  }

  /**
   * 営業パフォーマンス分析
   */
  private async analyzeSalesPerformance(leads: Lead[], deals: any[]): Promise<SalesAnalytics> {
    const period = 'Last 30 days';

    // メトリクス計算
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter((l) => l.interactions.length > 0).length;
    const conversions = deals.filter((d) => d.status === 'won').length;
    const conversionRate = totalLeads > 0 ? (conversions / totalLeads) * 100 : 0;
    const averageDealSize =
      deals.length > 0
        ? deals.reduce((sum, d) => sum + (d.amount || 0), 0) / deals.length
        : 0;
    const revenue = deals
      .filter((d) => d.status === 'won')
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    // パイプライン健全性
    const stageDistribution = this.calculateStageDistribution(leads);
    const bottlenecks = this.identifyBottlenecks(stageDistribution);
    const recommendations = this.generatePipelineRecommendations(stageDistribution, bottlenecks);

    // トップパフォーマー
    const leadSources = this.analyzeLeadSources(leads);
    const products = this.analyzeTopProducts(deals);

    return {
      period,
      metrics: {
        totalLeads,
        qualifiedLeads,
        conversions,
        conversionRate: Math.round(conversionRate * 100) / 100,
        averageDealSize: Math.round(averageDealSize),
        salesCycleLength: 30, // 仮の値
        revenue,
      },
      pipelineHealth: {
        stageDistribution,
        bottlenecks,
        recommendations,
      },
      topPerformers: {
        leadSources,
        products,
      },
    };
  }

  /**
   * 次のアクションの推奨
   */
  private async recommendNextActions(lead: Lead): Promise<string[]> {
    const score = await this.scoreLead(lead);
    return score.nextActions;
  }

  // ========== ヘルパーメソッド ==========

  private calculateEngagementScore(lead: Lead): number {
    let score = 0;
    const interactions = lead.interactions.length;

    // インタラクション数に基づくスコア
    if (interactions === 0) score = 10;
    else if (interactions === 1) score = 30;
    else if (interactions === 2) score = 50;
    else if (interactions <= 4) score = 70;
    else score = 90;

    // 最近のインタラクションによるボーナス
    if (lead.lastContactAt) {
      const daysSinceLastContact =
        (Date.now() - lead.lastContactAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastContact < 7) score = Math.min(100, score + 10);
    }

    return score;
  }

  private calculateCompanySizeScore(lead: Lead): number {
    // カスタムフィールドから会社規模を判定
    const employeeCount = lead.customFields?.employeeCount || 0;

    if (employeeCount >= 1000) return 100;
    if (employeeCount >= 500) return 80;
    if (employeeCount >= 100) return 60;
    if (employeeCount >= 50) return 40;
    return 20;
  }

  private calculateBudgetFitScore(lead: Lead): number {
    const budget = lead.customFields?.budget || 0;
    const targetBudget = 100000; // 目標予算

    if (budget >= targetBudget) return 100;
    if (budget >= targetBudget * 0.7) return 80;
    if (budget >= targetBudget * 0.5) return 60;
    if (budget >= targetBudget * 0.3) return 40;
    return 20;
  }

  private calculateTimingScore(lead: Lead): number {
    const urgency = lead.customFields?.urgency || 'low';
    const decisionTimeframe = lead.customFields?.decisionTimeframe || 'long';

    let score = 50;
    if (urgency === 'high') score += 30;
    else if (urgency === 'medium') score += 15;

    if (decisionTimeframe === 'immediate') score += 20;
    else if (decisionTimeframe === 'short') score += 10;

    return Math.min(100, score);
  }

  private generateRecommendation(score: number, factors: ScoringFactor[], lead: Lead): string {
    if (score >= 70) {
      return `高優先度リード: 即座にフォローアップし、デモまたはミーティングをスケジュールしてください。`;
    } else if (score >= 40) {
      return `中優先度リード: ナーチャリングプログラムに追加し、定期的に情報を提供してください。`;
    } else {
      return `低優先度リード: 自動メールシーケンスで育成し、エンゲージメントが向上したら再評価してください。`;
    }
  }

  private generateNextActions(category: 'hot' | 'warm' | 'cold', lead: Lead): string[] {
    switch (category) {
      case 'hot':
        return [
          '24時間以内に電話でフォローアップ',
          '製品デモのスケジュール',
          'パーソナライズされた提案書を作成',
          '意思決定者とのミーティングを設定',
          'ROI計算書を提供',
        ];
      case 'warm':
        return [
          '3日以内にメールでフォローアップ',
          'ケーススタディまたは事例を共有',
          'ウェビナーへの招待',
          '無料トライアルを提案',
          '2週間後に再度コンタクト',
        ];
      case 'cold':
        return [
          'ナーチャリングメールシーケンスに追加',
          '教育的なコンテンツを提供',
          '月次ニュースレターに登録',
          '四半期ごとにチェックイン',
          'エンゲージメント向上を待つ',
        ];
    }
  }

  private generateExecutiveSummary(lead: Lead, context: any): string {
    return `${lead.company}様の事業成長をサポートするため、当社のソリューションをご提案いたします。貴社の課題である${context.mainChallenge || 'ビジネス効率化'}に対し、実績のあるアプローチで最大${context.expectedImprovement || '30%'}の改善を実現します。`;
  }

  private identifyProblem(lead: Lead, context: any): string {
    return `現状分析の結果、以下の課題が特定されました：\n- ${context.problems?.join('\n- ') || '効率性の低下\n- コスト増加\n- 競争力の低下'}`;
  }

  private proposeSolution(lead: Lead, context: any): string {
    return `当社のソリューションは、以下の方法で課題を解決します：\n1. ${context.solutions?.[0] || 'プロセスの自動化と最適化'}\n2. ${context.solutions?.[1] || 'データドリブンな意思決定支援'}\n3. ${context.solutions?.[2] || 'スケーラブルなインフラストラクチャ'}`;
  }

  private listBenefits(lead: Lead, context: any): string[] {
    return [
      '業務効率が30-50%向上',
      'コストを年間20-40%削減',
      '意思決定スピードが3倍に向上',
      '顧客満足度が25%向上',
      'ROIを6ヶ月以内に達成',
      '24/7のサポート体制',
    ];
  }

  private generatePricingOptions(lead: Lead, context: any): PricingOption[] {
    return [
      {
        name: 'スターター',
        description: '小規模チーム向けの基本プラン',
        price: 50000,
        billingCycle: 'monthly',
        features: ['基本機能', '5ユーザーまで', 'メールサポート', 'ベーシックレポート'],
      },
      {
        name: 'ビジネス',
        description: '成長企業向けの推奨プラン',
        price: 150000,
        billingCycle: 'monthly',
        features: [
          '全機能利用可能',
          '20ユーザーまで',
          '優先サポート',
          '高度な分析',
          'API統合',
        ],
        recommended: true,
      },
      {
        name: 'エンタープライズ',
        description: '大企業向けカスタムプラン',
        price: 500000,
        billingCycle: 'monthly',
        features: [
          '無制限ユーザー',
          '専任サポート',
          'カスタム開発',
          'SLA保証',
          'オンプレミス対応',
        ],
      },
    ];
  }

  private estimateTimeline(context: any): string {
    return `
導入スケジュール：
- Week 1-2: キックオフ・要件定義
- Week 3-4: セットアップ・初期設定
- Week 5-6: トレーニング・テスト運用
- Week 7-8: 本番稼働・最適化
    `.trim();
  }

  private defineNextSteps(lead: Lead): string[] {
    return [
      '本提案書のご確認とフィードバック',
      'デモンストレーションのスケジューリング',
      '技術的な質問への回答セッション',
      'パイロットプロジェクトの計画',
      '契約条件の協議',
    ];
  }

  private createCallToAction(lead: Lead): string {
    return `まずは30分の無料コンサルテーションで、貴社の具体的なニーズをお聞かせください。今週中にお時間をいただければ、カスタマイズされたデモをご用意いたします。`;
  }

  private calculateStageDistribution(leads: Lead[]): Record<string, number> {
    const stages: Record<string, number> = {
      new: 0,
      contacted: 0,
      qualified: 0,
      proposal: 0,
      negotiation: 0,
    };

    leads.forEach((lead) => {
      const stage = lead.customFields?.stage || 'new';
      stages[stage] = (stages[stage] || 0) + 1;
    });

    return stages;
  }

  private identifyBottlenecks(stageDistribution: Record<string, number>): string[] {
    const bottlenecks: string[] = [];
    const total = Object.values(stageDistribution).reduce((sum, count) => sum + count, 0);

    Object.entries(stageDistribution).forEach(([stage, count]) => {
      const percentage = (count / total) * 100;
      if (percentage > 40) {
        bottlenecks.push(`${stage}ステージに${percentage.toFixed(1)}%のリードが滞留`);
      }
    });

    return bottlenecks;
  }

  private generatePipelineRecommendations(
    stageDistribution: Record<string, number>,
    bottlenecks: string[]
  ): string[] {
    const recommendations: string[] = [];

    if (bottlenecks.length > 0) {
      recommendations.push('ボトルネック解消のため、滞留ステージの営業プロセスを見直してください');
    }

    if (stageDistribution.new > stageDistribution.contacted * 2) {
      recommendations.push('新規リードへの初回コンタクトを迅速化してください');
    }

    if (stageDistribution.qualified < stageDistribution.contacted * 0.5) {
      recommendations.push('リード品質の向上とスコアリング基準の見直しを推奨');
    }

    return recommendations;
  }

  private analyzeLeadSources(leads: Lead[]): Array<{ source: string; count: number; conversionRate: number }> {
    const sources: Record<string, { count: number; converted: number }> = {};

    leads.forEach((lead) => {
      const source = lead.source || 'unknown';
      if (!sources[source]) {
        sources[source] = { count: 0, converted: 0 };
      }
      sources[source].count++;
      if (lead.customFields?.status === 'won') {
        sources[source].converted++;
      }
    });

    return Object.entries(sources)
      .map(([source, data]) => ({
        source,
        count: data.count,
        conversionRate: data.count > 0 ? (data.converted / data.count) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }

  private analyzeTopProducts(deals: any[]): Array<{ product: string; revenue: number }> {
    const products: Record<string, number> = {};

    deals
      .filter((d) => d.status === 'won')
      .forEach((deal) => {
        const product = deal.product || 'Unknown';
        products[product] = (products[product] || 0) + (deal.amount || 0);
      });

    return Object.entries(products)
      .map(([product, revenue]) => ({ product, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }

  protected async cleanup(): Promise<void> {
    this.log('AI Sales Agent cleanup completed');
  }
}
