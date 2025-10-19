/**
 * AIAdOperationsSpecialistAgent - デジタル広告運用の専門家
 * Google Ads、Meta Ads、LINE Ads対応。キャンペーンセットアップ、入札最適化、クリエイティブテスト、予算配分、ROI追跡
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface AdOperationsTaskInput {
  taskType:
    | 'campaign-setup'
    | 'bid-optimization'
    | 'ad-creative-testing'
    | 'budget-allocation'
    | 'performance-analysis'
    | 'roi-tracking'
    | 'audience-targeting';
  platform?: 'google-ads' | 'meta-ads' | 'line-ads' | 'all';
  campaignObjective?: string;
  budget?: number;
  targetAudience?: AdTargetAudience;
  creativeAssets?: CreativeAsset[];
  period?: string;
  existingCampaign?: CampaignData;
}

export interface AdTargetAudience {
  demographics: {
    ageRange: string[];
    gender: string[];
    location: string[];
    language: string[];
    income?: string;
  };
  interests: string[];
  behaviors: string[];
  customAudiences?: {
    type: 'customer-list' | 'website-visitors' | 'app-users' | 'lookalike';
    size?: number;
    details?: string;
  }[];
  exclusions?: string[];
}

export interface CreativeAsset {
  id: string;
  type: 'image' | 'video' | 'carousel' | 'collection' | 'text';
  format: string;
  headline?: string;
  description?: string;
  cta?: string;
  url?: string;
  performance?: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    cpa: number;
  };
}

export interface CampaignData {
  id: string;
  name: string;
  platform: string;
  objective: string;
  budget: number;
  startDate: string;
  endDate?: string;
  adSets?: AdSet[];
  performance?: CampaignPerformance;
}

export interface AdSet {
  id: string;
  name: string;
  budget: number;
  bidStrategy: string;
  targeting: AdTargetAudience;
  ads: Ad[];
}

export interface Ad {
  id: string;
  name: string;
  creative: CreativeAsset;
  status: 'active' | 'paused' | 'deleted';
}

export interface CampaignPerformance {
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  cost: number;
  cpc: number;
  cpm: number;
  cpa: number;
  roas: number;
  revenue: number;
}

export class AIAdOperationsSpecialistAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.AD_OPERATIONS_SPECIALIST);
  }

  protected async setup(): Promise<void> {
    this.log('AI Ad Operations Specialist Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as AdOperationsTaskInput;
    this.log(`Processing ${input.taskType} task for ${input.platform || 'all platforms'}`);

    switch (input.taskType) {
      case 'campaign-setup':
        return await this.setupCampaign(input);
      case 'bid-optimization':
        return await this.optimizeBidding(input);
      case 'ad-creative-testing':
        return await this.testCreatives(input);
      case 'budget-allocation':
        return await this.allocateBudget(input);
      case 'performance-analysis':
        return await this.analyzePerformance(input);
      case 'roi-tracking':
        return await this.trackROI(input);
      case 'audience-targeting':
        return await this.optimizeTargeting(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * キャンペーンセットアップ
   */
  private async setupCampaign(input: AdOperationsTaskInput): Promise<any> {
    this.log(`Setting up campaign for ${input.platform || 'multi-platform'}...`);

    const platform = input.platform || 'all';
    const budget = input.budget || 3000000;
    const objective = input.campaignObjective || 'conversions';

    const campaignSetup = {
      campaignName: '新製品ローンチキャンペーン - Q4 2025',
      objective,
      totalBudget: budget,
      duration: '90日間',
      platforms: this.getPlatformSetup(platform, budget, objective, input.targetAudience),
      tracking: {
        conversionTracking: {
          pixelInstallation: {
            googleAds: 'グローバルサイトタグ + コンバージョンリンカー',
            metaAds: 'Metaピクセル',
            lineAds: 'LINE Tag',
          },
          events: [
            { name: 'ページビュー', type: 'standard' },
            { name: 'リード送信', type: 'custom', value: true },
            { name: '購入完了', type: 'custom', value: true },
            { name: 'トライアル開始', type: 'custom', value: true },
          ],
          enhancedConversions: '有効（ハッシュ化メールアドレス送信）',
        },
        utmParameters: {
          source: '{platform}',
          medium: 'paid',
          campaign: '{campaign_name}',
          content: '{ad_id}',
          term: '{keyword}',
        },
        googleAnalytics4: {
          integration: '有効',
          customDimensions: ['キャンペーンID', 'Ad Set ID', 'クリエイティブID'],
          customMetrics: ['見積もり額', 'LTV予測'],
        },
      },
      accountStructure: {
        hierarchy: {
          level1: 'キャンペーン（目的別）',
          level2: 'Ad Set（オーディエンス別）',
          level3: 'Ad（クリエイティブ別）',
        },
        namingConvention: {
          campaign: '[Platform]_[Objective]_[Date]_[Budget]',
          adSet: '[Audience]_[Placement]_[Budget]',
          ad: '[Creative]_[CTA]_[Version]',
        },
        example: {
          campaign: 'Google_Conversions_2025Q4_¥3M',
          adSet: 'Lookalike_Search_¥50K',
          ad: 'Video30s_Trial_v1',
        },
      },
      qualityChecklist: [
        '✓ ピクセル・タグ動作確認（テストコンバージョン送信）',
        '✓ ターゲティング設定確認（重複・漏れチェック）',
        '✓ クリエイティブ承認取得（ポリシー準拠）',
        '✓ 予算・スケジュール確認',
        '✓ リンク先ページ最適化（モバイル対応、読み込み速度）',
        '✓ A/Bテスト設計完了',
        '✓ レポートダッシュボード準備',
      ],
      launchChecklist: {
        t_minus_7days: [
          'クリエイティブ最終確認',
          'ランディングページ公開',
          'トラッキングテスト完了',
        ],
        t_minus_3days: [
          'キャンペーン設定レビュー',
          'ステークホルダー承認取得',
        ],
        t_minus_1day: [
          '予算確保確認',
          '緊急連絡体制構築',
        ],
        launchDay: [
          'キャンペーン有効化',
          '初期パフォーマンスモニタリング（1時間ごと）',
          '問題発生時の即座対応準備',
        ],
      },
      expectedResults: {
        week1: {
          focus: '学習期間、データ収集',
          kpi: {
            impressions: 500000,
            clicks: 15000,
            ctr: 3.0,
            conversions: 450,
            cpa: 6667,
          },
          actions: 'パフォーマンス低いクリエイティブ停止',
        },
        week2_4: {
          focus: '最適化、スケール',
          kpi: {
            impressions: 2000000,
            clicks: 70000,
            ctr: 3.5,
            conversions: 2100,
            cpa: 5238,
          },
          actions: '効果的なAdSet予算増額、新規オーディエンステスト',
        },
        week5_12: {
          focus: '安定運用、ROI最大化',
          kpi: {
            impressions: 7500000,
            clicks: 300000,
            ctr: 4.0,
            conversions: 9000,
            cpa: 4444,
          },
          actions: 'リターゲティング強化、Lookalike拡大',
        },
      },
      summary: `${platform}キャンペーンセットアップ完了。予算¥${(budget / 1000000).toFixed(1)}M、目標${objective}。90日間で9,000コンバージョン（CPA ¥${Math.round(budget / 9000).toLocaleString()}）達成見込み。`,
    };

    return campaignSetup;
  }

  /**
   * プラットフォーム別セットアップ
   */
  private getPlatformSetup(
    platform: string,
    budget: number,
    objective: string,
    targetAudience?: AdTargetAudience
  ): any {
    const audience = targetAudience || this.generateDefaultAudience();

    if (platform === 'google-ads' || platform === 'all') {
      const googleBudget = platform === 'all' ? budget * 0.4 : budget;

      const googleSetup = {
        platform: 'Google Ads',
        budget: googleBudget,
        budgetPercentage: platform === 'all' ? 40 : 100,
        campaigns: [
          {
            type: 'Search',
            budget: googleBudget * 0.5,
            structure: {
              campaignName: 'Google検索 - ブランド・一般キーワード',
              adGroups: [
                {
                  name: 'ブランドキーワード',
                  keywords: [
                    { text: '[ブランド名]', matchType: 'exact', cpc: 120 },
                    { text: '[ブランド名] 料金', matchType: 'phrase', cpc: 150 },
                    { text: '[ブランド名] 評判', matchType: 'phrase', cpc: 130 },
                  ],
                  budget: googleBudget * 0.15,
                  expectedCPA: 3000,
                },
                {
                  name: '一般キーワード - 高意図',
                  keywords: [
                    { text: 'AI 自動化 ツール', matchType: 'phrase', cpc: 450 },
                    { text: 'AIエージェント 導入', matchType: 'phrase', cpc: 520 },
                    { text: '業務効率化 AI', matchType: 'phrase', cpc: 380 },
                  ],
                  budget: googleBudget * 0.25,
                  expectedCPA: 5500,
                },
                {
                  name: '一般キーワード - 情報収集',
                  keywords: [
                    { text: 'AI ツール おすすめ', matchType: 'broad', cpc: 280 },
                    { text: 'AI 活用事例', matchType: 'broad', cpc: 250 },
                  ],
                  budget: googleBudget * 0.1,
                  expectedCPA: 7000,
                },
              ],
            },
            adFormats: [
              {
                type: 'レスポンシブ検索広告',
                headlines: [
                  '業務効率10倍｜AIエージェント',
                  '今すぐ無料トライアル開始',
                  'コスト50%削減、AIで自動化',
                  '導入実績1,000社突破',
                ],
                descriptions: [
                  'AIが24/7自動対応。人件費削減、売上向上を実現。',
                  '無料トライアル実施中。今すぐお試しください。',
                ],
                extensions: [
                  'サイトリンク: 料金プラン、導入事例、無料トライアル',
                  'コールアウト: 24/7サポート、初期費用無料、解約金なし',
                  '構造化スニペット: 機能（自動化、分析、レポート、統合）',
                  '価格表示: スタンダード¥50,000/月、プロ¥150,000/月',
                ],
              },
            ],
            bidStrategy: {
              type: 'Target CPA',
              targetCPA: 5000,
              learningPeriod: '14日間',
              adjustments: [
                'デバイス: モバイル -10%（コンバージョン率低い）',
                '時間帯: 平日9-18時 +20%（ビジネスアワー）',
                '地域: 東京23区 +15%（コンバージョン高い）',
              ],
            },
          },
          {
            type: 'Display',
            budget: googleBudget * 0.3,
            structure: {
              campaignName: 'Googleディスプレイ - リマーケティング',
              audiences: [
                {
                  type: 'ウェブサイト訪問者',
                  window: '30日間',
                  size: 50000,
                  budget: googleBudget * 0.15,
                  expectedCPA: 4500,
                },
                {
                  type: 'カート放棄',
                  window: '7日間',
                  size: 8000,
                  budget: googleBudget * 0.1,
                  expectedCPA: 3500,
                },
                {
                  type: 'アプリユーザー',
                  window: '90日間',
                  size: 12000,
                  budget: googleBudget * 0.05,
                  expectedCPA: 4000,
                },
              ],
            },
            adFormats: [
              {
                type: 'レスポンシブディスプレイ広告',
                assets: {
                  images: '15種類（横長、スクエア、縦長）',
                  headlines: '5バリエーション',
                  descriptions: '5バリエーション',
                  logos: '2種類（正方形、横長）',
                },
                optimization: '自動最適化有効',
              },
            ],
            bidStrategy: {
              type: 'Maximize Conversions',
              targetCPA: 4500,
            },
          },
          {
            type: 'Performance Max',
            budget: googleBudget * 0.2,
            structure: {
              campaignName: 'Google P-Max - 全面展開',
              assetGroups: [
                {
                  name: 'メインアセット',
                  images: 20,
                  videos: 5,
                  headlines: 15,
                  descriptions: 10,
                  logos: 2,
                },
              ],
              audienceSignals: [
                'ウェブサイト訪問者',
                'カスタマーリスト',
                'インタレスト: テクノロジー、ビジネスツール',
              ],
            },
            bidStrategy: {
              type: 'Maximize Conversion Value',
              targetROAS: '400%',
            },
          },
        ],
        expectedPerformance: {
          impressions: 3000000,
          clicks: 120000,
          ctr: 4.0,
          conversions: 3600,
          cpa: Math.round(googleBudget / 3600),
          roas: 450,
        },
      };

      if (platform === 'google-ads') {
        return { google: googleSetup };
      }
    }

    if (platform === 'meta-ads' || platform === 'all') {
      const metaBudget = platform === 'all' ? budget * 0.4 : budget;

      const metaSetup = {
        platform: 'Meta Ads (Facebook & Instagram)',
        budget: metaBudget,
        budgetPercentage: platform === 'all' ? 40 : 100,
        campaigns: [
          {
            objective: 'Conversions',
            budget: metaBudget,
            structure: {
              campaignName: 'Meta コンバージョンキャンペーン',
              adSets: [
                {
                  name: 'Lookalike 1% - 購入者',
                  audience: {
                    type: 'Lookalike',
                    source: 'カスタマーリスト（購入者10,000件）',
                    percentage: 1,
                    locations: ['日本'],
                    size: 2000000,
                  },
                  placements: [
                    'Facebook Feed',
                    'Instagram Feed',
                    'Instagram Stories',
                    'Reels',
                  ],
                  budget: metaBudget * 0.3,
                  expectedCPA: 4500,
                },
                {
                  name: 'Lookalike 3-5% - ウェブサイト訪問者',
                  audience: {
                    type: 'Lookalike',
                    source: 'ウェブサイト訪問者（30日間、50,000人）',
                    percentage: '3-5',
                    locations: ['日本'],
                    size: 8000000,
                  },
                  placements: ['自動配置（推奨）'],
                  budget: metaBudget * 0.25,
                  expectedCPA: 5200,
                },
                {
                  name: 'インタレスト - ビジネス・テクノロジー',
                  audience: {
                    type: 'Interest',
                    interests: [
                      'ビジネスツール',
                      'テクノロジー',
                      'マーケティング',
                      '起業家精神',
                    ],
                    demographics: {
                      age: '25-54',
                      gender: 'All',
                    },
                    size: 15000000,
                  },
                  placements: ['Facebook Feed', 'Instagram Feed'],
                  budget: metaBudget * 0.2,
                  expectedCPA: 6000,
                },
                {
                  name: 'リターゲティング - ウェブサイト訪問者',
                  audience: {
                    type: 'Custom Audience',
                    source: 'ウェブサイト訪問者（14日間）',
                    exclusions: ['既存顧客', 'カート放棄→購入完了'],
                    size: 30000,
                  },
                  placements: [
                    'Facebook Feed',
                    'Instagram Stories',
                    'Audience Network',
                  ],
                  budget: metaBudget * 0.15,
                  expectedCPA: 3800,
                },
                {
                  name: 'エンゲージメント - 動画視聴者',
                  audience: {
                    type: 'Engagement',
                    source: '動画75%視聴者（30日間）',
                    size: 20000,
                  },
                  placements: ['Instagram Reels', 'Facebook Video Feeds'],
                  budget: metaBudget * 0.1,
                  expectedCPA: 5500,
                },
              ],
            },
            adFormats: [
              {
                type: 'Single Image',
                specs: {
                  imageSize: '1080x1080px (Instagram), 1200x628px (Facebook)',
                  headline: '40文字以内',
                  primaryText: '125文字以内',
                  description: '30文字以内',
                  cta: [
                    '詳しくはこちら',
                    '今すぐ申し込む',
                    '無料トライアル',
                  ],
                },
                variations: 15,
              },
              {
                type: 'Video',
                specs: {
                  duration: '15-30秒（推奨）',
                  aspectRatio: '1:1 (Feed), 9:16 (Stories/Reels)',
                  resolution: '1080x1080px以上',
                  captions: '必須（音声なし視聴多い）',
                },
                variations: 10,
              },
              {
                type: 'Carousel',
                specs: {
                  cards: '3-10枚',
                  imageSize: '1080x1080px',
                  headline: 'カードごとに設定可能',
                },
                variations: 5,
              },
            ],
            bidStrategy: {
              type: 'Lowest Cost with Bid Cap',
              bidCap: 8000,
              optimizationEvent: 'Purchase',
              attributionWindow: '7-day click, 1-day view',
            },
          },
        ],
        advantagePlus: {
          creativeDynamicFormat: '有効（自動最適化）',
          audienceExpansion: '有効（Lookalike拡張）',
          placementOptimization: '有効（自動配置）',
        },
        expectedPerformance: {
          impressions: 4000000,
          reach: 1500000,
          clicks: 100000,
          ctr: 2.5,
          conversions: 3000,
          cpa: Math.round(metaBudget / 3000),
          roas: 420,
        },
      };

      if (platform === 'meta-ads') {
        return { meta: metaSetup };
      }
    }

    if (platform === 'line-ads' || platform === 'all') {
      const lineBudget = platform === 'all' ? budget * 0.2 : budget;

      const lineSetup = {
        platform: 'LINE Ads',
        budget: lineBudget,
        budgetPercentage: platform === 'all' ? 20 : 100,
        campaigns: [
          {
            objective: 'ウェブサイトコンバージョン',
            budget: lineBudget,
            structure: {
              campaignName: 'LINE コンバージョンキャンペーン',
              adGroups: [
                {
                  name: 'オーディエンス - 類似拡張',
                  audience: {
                    type: 'オーディエンス類似',
                    source: '既存顧客リスト',
                    similarity: '1-10%',
                    size: 3000000,
                  },
                  placements: [
                    'LINE トークリスト最上部',
                    'LINE NEWS',
                    'LINE マンガ',
                    'LINE BLOG',
                  ],
                  budget: lineBudget * 0.4,
                  expectedCPA: 5500,
                },
                {
                  name: 'オーディエンス - ウェブトラフィック',
                  audience: {
                    type: 'ウェブトラフィックオーディエンス',
                    source: 'ウェブサイト訪問者（30日間）',
                    size: 50000,
                  },
                  placements: ['LINE トークリスト最上部'],
                  budget: lineBudget * 0.3,
                  expectedCPA: 4800,
                },
                {
                  name: 'デモグラフィック - 年齢・性別・地域',
                  audience: {
                    type: 'デモグラフィック',
                    age: '25-54',
                    gender: 'すべて',
                    region: ['東京都', '大阪府', '愛知県', '神奈川県'],
                    size: 8000000,
                  },
                  placements: [
                    'LINE トークリスト最上部',
                    'タイムライン',
                    'LINE NEWS',
                  ],
                  budget: lineBudget * 0.2,
                  expectedCPA: 6500,
                },
                {
                  name: 'リターゲティング - エンゲージメント',
                  audience: {
                    type: 'エンゲージメントオーディエンス',
                    source: '動画視聴者、フォーム開封',
                    period: '14日間',
                    size: 15000,
                  },
                  placements: ['LINE トークリスト最上部', 'タイムライン'],
                  budget: lineBudget * 0.1,
                  expectedCPA: 4500,
                },
              ],
            },
            adFormats: [
              {
                type: 'Small Image',
                specs: {
                  imageSize: '1200x628px',
                  title: '20文字以内',
                  description: '75文字以内',
                },
                variations: 10,
              },
              {
                type: 'Card',
                specs: {
                  imageSize: '1080x1080px',
                  title: '20文字以内',
                  description: '90文字以内',
                },
                variations: 8,
              },
              {
                type: 'Video',
                specs: {
                  duration: '15-30秒',
                  aspectRatio: '16:9, 1:1, 9:16',
                  resolution: '720p以上',
                },
                variations: 5,
              },
            ],
            bidStrategy: {
              type: '自動入札',
              optimizationGoal: 'コンバージョン',
              targetCPA: 6000,
            },
          },
        ],
        lineSpecificFeatures: {
          talkHeadViewPlus: '有効（高視認性配置）',
          linePoints: '活用（インセンティブキャンペーン）',
          lineOfficialAccount: '連携（友だち追加導線）',
        },
        expectedPerformance: {
          impressions: 2500000,
          clicks: 50000,
          ctr: 2.0,
          conversions: 1200,
          cpa: Math.round(lineBudget / 1200),
          roas: 380,
        },
      };

      if (platform === 'line-ads') {
        return { line: lineSetup };
      }
    }

    // platform === 'all'の場合
    return {
      google: this.getPlatformSetup('google-ads', budget, objective, audience).google,
      meta: this.getPlatformSetup('meta-ads', budget, objective, audience).meta,
      line: this.getPlatformSetup('line-ads', budget, objective, audience).line,
      summary: {
        totalBudget: budget,
        allocation: {
          google: { budget: budget * 0.4, percentage: 40 },
          meta: { budget: budget * 0.4, percentage: 40 },
          line: { budget: budget * 0.2, percentage: 20 },
        },
        expectedPerformance: {
          totalImpressions: 9500000,
          totalClicks: 270000,
          avgCTR: 2.84,
          totalConversions: 7800,
          avgCPA: Math.round(budget / 7800),
          avgROAS: 417,
        },
      },
    };
  }

  /**
   * 入札最適化
   */
  private async optimizeBidding(input: AdOperationsTaskInput): Promise<any> {
    this.log('Optimizing bidding strategies...');

    const campaign = input.existingCampaign || this.generateSampleCampaign();
    const performance = campaign.performance!;

    const optimization = {
      campaignName: campaign.name,
      platform: campaign.platform,
      currentPerformance: performance,
      analysis: {
        currentCPA: performance.cpa,
        targetCPA: 5000,
        variance: ((performance.cpa - 5000) / 5000) * 100,
        currentROAS: performance.roas,
        targetROAS: 400,
        roasVariance: ((performance.roas - 400) / 400) * 100,
        diagnosis: this.diagnoseBiddingIssues(performance),
      },
      recommendations: {
        bidStrategy: {
          current: 'Manual CPC',
          recommended: 'Target CPA（自動入札）',
          reason:
            '十分なコンバージョンデータ蓄積（月間500件以上）、自動入札でパフォーマンス向上期待',
          implementation: [
            '段階1: Maximize Clicks → Maximize Conversions（2週間）',
            '段階2: Maximize Conversions → Target CPA（2週間）',
            '段階3: Target CPA最適化（継続）',
          ],
          expectedImprovement: 'CPA -20%、コンバージョン数 +30%',
        },
        bidAdjustments: [
          {
            dimension: 'デバイス',
            current: { mobile: 0, desktop: 0, tablet: 0 },
            recommended: { mobile: -15, desktop: +10, tablet: -20 },
            reason:
              'デスクトップCVR 5.2%（モバイル3.1%の1.7倍）、タブレット低パフォーマンス',
            expectedImpact: 'CPA -8%',
          },
          {
            dimension: '時間帯',
            current: '調整なし',
            recommended: {
              '0-6時': -50,
              '6-9時': 0,
              '9-18時': +20,
              '18-21時': +10,
              '21-24時': -20,
            },
            reason: 'ビジネスアワー（9-18時）CVR 6.8%、深夜1.2%',
            expectedImpact: 'CPA -12%',
          },
          {
            dimension: '曜日',
            current: '調整なし',
            recommended: {
              月火水木金: +15,
              土日: -25,
            },
            reason: '平日CVR 5.5%（週末2.8%の2倍）',
            expectedImpact: 'CPA -10%',
          },
          {
            dimension: '地域',
            current: '調整なし',
            recommended: {
              東京23区: +25,
              大阪市: +20,
              名古屋市: +15,
              その他政令指定都市: +10,
              その他: -10,
            },
            reason: '都市部CVR高い（東京23区 7.2%、地方3.5%）',
            expectedImpact: 'CPA -15%',
          },
        ],
        budgetPacing: {
          current: '均等配分（日予算一定）',
          issue: '月初で予算消化60%、月末で機会損失',
          recommended: '加速配分（高パフォーマンス日に集中）',
          implementation: [
            '平日: 日予算+30%',
            '週末: 日予算-40%',
            'キャンペーン期間（月末）: 日予算+50%',
          ],
          expectedImpact: 'コンバージョン数 +18%、予算利用率 95%→100%',
        },
      },
      advancedStrategies: {
        portfolioBidding: {
          strategy: '複数キャンペーン統合入札',
          campaigns: ['Search', 'Display', 'P-Max'],
          targetCPA: 5000,
          benefit: '予算柔軟配分、全体最適化',
        },
        seasonalAdjustments: {
          events: [
            { name: '年末キャンペーン', period: '12/20-12/31', adjustment: +50 },
            { name: '新年度', period: '4/1-4/15', adjustment: +30 },
            { name: '夏季休暇', period: '8/10-8/20', adjustment: -40 },
          ],
        },
        valueBased: {
          strategy: 'Target ROAS（価値ベース入札）',
          implementation: 'コンバージョン価値トラッキング必須',
          targetROAS: 400,
          benefit: '高LTV顧客優先獲得',
        },
      },
      actionPlan: [
        {
          week: 1,
          action: '入札調整実装（デバイス、時間帯、曜日、地域）',
          expectedImpact: 'CPA -25%',
        },
        {
          week: 2,
          action: '自動入札移行（Maximize Conversions）',
          expectedImpact: 'データ収集、学習',
        },
        {
          week: 3,
          action: 'Target CPA設定（目標¥5,000）',
          expectedImpact: 'CPA最適化開始',
        },
        {
          week: 4,
          action: '予算ペーシング調整',
          expectedImpact: 'コンバージョン数 +18%',
        },
      ],
      expectedResults: {
        current: {
          cpa: performance.cpa,
          conversions: performance.conversions,
          roas: performance.roas,
        },
        optimized: {
          cpa: Math.round(performance.cpa * 0.65),
          conversions: Math.round(performance.conversions * 1.48),
          roas: Math.round(performance.roas * 1.35),
        },
        improvement: {
          cpa: '-35%',
          conversions: '+48%',
          roas: '+35%',
        },
      },
      summary: `入札最適化計画完了。自動入札（Target CPA）移行、4次元調整（デバイス・時間・曜日・地域）、予算ペーシング改善でCPA ${performance.cpa.toLocaleString()}円→${Math.round(performance.cpa * 0.65).toLocaleString()}円（-35%）、コンバージョン+48%達成見込み。`,
    };

    return optimization;
  }

  /**
   * クリエイティブテスト
   */
  private async testCreatives(input: AdOperationsTaskInput): Promise<any> {
    this.log('Setting up creative testing framework...');

    const creativeTest = {
      testingFramework: 'Structured Creative Testing（SCT）',
      methodology: {
        approach: '要素分解テスト → 勝者組み合わせ',
        sampleSize: '統計的有意性: 95%信頼区間、最小100コンバージョン/バリエーション',
        duration: '最短7日、最長30日（早期判断・機会損失防止）',
        metrics: {
          primary: 'CPA（Cost Per Acquisition）',
          secondary: ['CTR', 'CVR', 'ROAS', 'エンゲージメント率'],
        },
      },
      testDimensions: [
        {
          dimension: 'ビジュアル（画像・動画）',
          variations: [
            {
              id: 'V1',
              type: 'プロダクトフォーカス',
              description: 'AIダッシュボードのUI画面',
              hypothesis: 'プロダクトの具体性でCVR向上',
            },
            {
              id: 'V2',
              type: 'ベネフィットフォーカス',
              description: '笑顔のビジネスパーソン、グラフ上昇',
              hypothesis: '感情的訴求でエンゲージメント向上',
            },
            {
              id: 'V3',
              type: 'Before/After',
              description: '導入前後の比較（混乱→整理）',
              hypothesis: '変化の可視化でCTR向上',
            },
            {
              id: 'V4',
              type: 'データドリブン',
              description: '「業務効率10倍」数字強調インフォグラフィック',
              hypothesis: '具体的数字で信頼性向上',
            },
          ],
          testType: 'A/B/C/Dテスト',
          budget: '各バリエーション均等（25%ずつ）',
          duration: '14日間',
        },
        {
          dimension: 'ヘッドライン',
          variations: [
            {
              id: 'H1',
              text: '業務効率10倍｜AIエージェント',
              hypothesis: 'ベネフィット訴求',
            },
            {
              id: 'H2',
              text: '今すぐ無料トライアル開始',
              hypothesis: 'CTA直接訴求',
            },
            {
              id: 'H3',
              text: 'コスト50%削減、AIで自動化',
              hypothesis: '具体的数字 + メカニズム',
            },
            {
              id: 'H4',
              text: '導入実績1,000社突破',
              hypothesis: '社会的証明',
            },
            {
              id: 'H5',
              text: '24/7自動対応｜人件費削減',
              hypothesis: '機能 + ベネフィット組み合わせ',
            },
          ],
          testType: 'Dynamic Creative Optimization（DCO）',
          method: 'プラットフォームAIが自動最適組み合わせ',
        },
        {
          dimension: 'CTA（Call-to-Action）',
          variations: [
            { id: 'C1', text: '詳しくはこちら', hypothesis: '低圧力、情報収集層' },
            { id: 'C2', text: '今すぐ申し込む', hypothesis: '高圧力、即決層' },
            { id: 'C3', text: '無料トライアル', hypothesis: 'リスク低減訴求' },
            { id: 'C4', text: '資料ダウンロード', hypothesis: '段階的コミット' },
            { id: 'C5', text: 'デモを見る', hypothesis: '体験重視' },
          ],
          testType: 'Sequential Testing',
          method: '上位2つをさらに詳細テスト',
        },
        {
          dimension: 'オファー',
          variations: [
            {
              id: 'O1',
              text: '初月無料キャンペーン',
              hypothesis: '金銭的インセンティブ',
            },
            {
              id: 'O2',
              text: '導入サポート無料（通常¥50,000）',
              hypothesis: 'サポート価値訴求',
            },
            {
              id: 'O3',
              text: '14日間無料トライアル｜クレカ不要',
              hypothesis: 'リスクゼロ強調',
            },
            {
              id: 'O4',
              text: '今なら限定資料プレゼント',
              hypothesis: '希少性訴求',
            },
          ],
          testType: 'A/B/C/Dテスト',
          budget: '各バリエーション均等',
          duration: '21日間',
        },
        {
          dimension: 'フォーマット',
          variations: [
            {
              id: 'F1',
              type: 'Single Image',
              specs: '1080x1080px',
              hypothesis: 'シンプル、高速ロード',
            },
            {
              id: 'F2',
              type: 'Video 15秒',
              specs: '1080x1080px, キャプション',
              hypothesis: 'エンゲージメント高い',
            },
            {
              id: 'F3',
              type: 'Video 30秒',
              specs: '1080x1080px, ストーリーテリング',
              hypothesis: '詳細説明、高CVR',
            },
            {
              id: 'F4',
              type: 'Carousel（3枚）',
              specs: '1080x1080px × 3',
              hypothesis: '複数ベネフィット訴求',
            },
          ],
          testType: 'A/B/C/Dテスト',
          duration: '14日間',
        },
      ],
      testSchedule: {
        phase1: {
          weeks: '1-2週目',
          focus: 'ビジュアル + ヘッドライン テスト',
          combinations: 20,
          goal: 'トップ5組み合わせ特定',
        },
        phase2: {
          weeks: '3-4週目',
          focus: 'CTA + オファー テスト',
          combinations: 16,
          goal: 'トップ3組み合わせ特定',
        },
        phase3: {
          weeks: '5-6週目',
          focus: 'フォーマット テスト',
          combinations: 12,
          goal: '最終勝者決定',
        },
        phase4: {
          weeks: '7週目以降',
          focus: '勝者スケール + 継続テスト',
          strategy: '勝者90%予算、新規テスト10%予算（常時最適化）',
        },
      },
      winnerCriteria: {
        primary: 'CPA最小（目標: ¥5,000以下）',
        secondary: [
          'CVR最大',
          'ROAS最大（目標: 400%以上）',
          'スケーラビリティ（大量配信でもパフォーマンス維持）',
        ],
        statisticalSignificance: '95%信頼区間、p値<0.05',
      },
      creativeProduction: {
        initialBatch: {
          images: 30,
          videos: 15,
          totalVariations: 80,
          productionTime: '2週間',
          cost: 1500000,
        },
        ongoingProduction: {
          frequency: '月次',
          newCreatives: 20,
          iterations: '既存トップパフォーマンスの改良版',
          cost: 500000,
        },
        tools: {
          design: 'Figma, Canva, Adobe Creative Suite',
          video: 'Adobe Premiere, After Effects',
          aiGeneration: 'Midjourney, DALL-E（初期アイデア）',
          testing: 'Google Optimize, Meta Creative Hub',
        },
      },
      expectedResults: {
        baseline: {
          ctr: 2.5,
          cvr: 3.0,
          cpa: 7000,
        },
        afterTesting: {
          ctr: 4.2,
          cvr: 5.5,
          cpa: 4200,
        },
        improvement: {
          ctr: '+68%',
          cvr: '+83%',
          cpa: '-40%',
        },
        timeline: '6週間でCPA -40%達成',
      },
      summary: `クリエイティブテスト計画完了。5次元（ビジュアル、ヘッドライン、CTA、オファー、フォーマット）80バリエーション。6週間構造化テストでCPA ${7000}円→${4200}円（-40%）、CVR +83%達成見込み。`,
    };

    return creativeTest;
  }

  /**
   * 予算配分最適化
   */
  private async allocateBudget(input: AdOperationsTaskInput): Promise<any> {
    this.log('Optimizing budget allocation...');

    const totalBudget = input.budget || 3000000;
    const period = input.period || '月次';

    const allocation = {
      totalBudget,
      period,
      allocationStrategy: 'パフォーマンスベース動的配分',
      currentAllocation: {
        platforms: [
          {
            platform: 'Google Ads',
            budget: totalBudget * 0.4,
            percentage: 40,
            performance: {
              conversions: 480,
              cpa: 5000,
              roas: 450,
              efficiency: 'High',
            },
          },
          {
            platform: 'Meta Ads',
            budget: totalBudget * 0.4,
            percentage: 40,
            performance: {
              conversions: 400,
              cpa: 6000,
              roas: 380,
              efficiency: 'Medium',
            },
          },
          {
            platform: 'LINE Ads',
            budget: totalBudget * 0.2,
            percentage: 20,
            performance: {
              conversions: 120,
              cpa: 10000,
              roas: 280,
              efficiency: 'Low',
            },
          },
        ],
        total: {
          conversions: 1000,
          avgCPA: 6000,
          avgROAS: 370,
        },
      },
      optimizedAllocation: {
        methodology: 'ROI加重配分 + マージナルROAS分析',
        platforms: [
          {
            platform: 'Google Ads',
            currentBudget: totalBudget * 0.4,
            optimizedBudget: totalBudget * 0.5,
            change: '+25%',
            percentage: 50,
            reason: '最高ROAS（450%）、スケール余地あり',
            expectedResults: {
              conversions: 750,
              cpa: 4000,
              roas: 500,
            },
          },
          {
            platform: 'Meta Ads',
            currentBudget: totalBudget * 0.4,
            optimizedBudget: totalBudget * 0.35,
            change: '-12.5%',
            percentage: 35,
            reason: '中程度ROAS（380%）、効率化余地あり',
            expectedResults: {
              conversions: 438,
              cpa: 4800,
              roas: 420,
            },
          },
          {
            platform: 'LINE Ads',
            currentBudget: totalBudget * 0.2,
            optimizedBudget: totalBudget * 0.15,
            change: '-25%',
            percentage: 15,
            reason: '低ROAS（280%）、最適化後に再評価',
            expectedResults: {
              conversions: 113,
              cpa: 8000,
              roas: 320,
            },
          },
        ],
        expectedTotal: {
          conversions: 1301,
          avgCPA: 4615,
          avgROAS: 447,
          improvement: {
            conversions: '+30%',
            cpa: '-23%',
            roas: '+21%',
          },
        },
      },
      campaignLevelAllocation: {
        google: {
          search: {
            budget: totalBudget * 0.5 * 0.5,
            percentage: 50,
            reason: '高意図、高CVR',
          },
          display: {
            budget: totalBudget * 0.5 * 0.3,
            percentage: 30,
            reason: 'リマーケティング効率的',
          },
          pmax: {
            budget: totalBudget * 0.5 * 0.2,
            percentage: 20,
            reason: '新規オーディエンス発掘',
          },
        },
        meta: {
          lookalike1: {
            budget: totalBudget * 0.35 * 0.4,
            percentage: 40,
            reason: '最高CVR',
          },
          lookalike3_5: {
            budget: totalBudget * 0.35 * 0.3,
            percentage: 30,
            reason: 'スケール',
          },
          interest: {
            budget: totalBudget * 0.35 * 0.2,
            percentage: 20,
            reason: '新規開拓',
          },
          retargeting: {
            budget: totalBudget * 0.35 * 0.1,
            percentage: 10,
            reason: '高効率少量',
          },
        },
        line: {
          lookalike: {
            budget: totalBudget * 0.15 * 0.5,
            percentage: 50,
            reason: '唯一の効率的セグメント',
          },
          webTraffic: {
            budget: totalBudget * 0.15 * 0.3,
            percentage: 30,
            reason: 'リターゲティング',
          },
          demographic: {
            budget: totalBudget * 0.15 * 0.2,
            percentage: 20,
            reason: 'テスト継続',
          },
        },
      },
      dynamicAllocation: {
        rules: [
          {
            rule: 'CPA目標超過',
            condition: 'CPA > ¥6,000 for 3 days',
            action: '日予算 -20%、最適化期間7日間',
          },
          {
            rule: 'ROAS目標達成',
            condition: 'ROAS > 450% for 7 days',
            action: '日予算 +30%、上限まで',
          },
          {
            rule: '予算消化ペース遅延',
            condition: '月の2/3経過時点で消化率<60%',
            action: '日予算 +50%',
          },
          {
            rule: '新規キャンペーン学習',
            condition: '開始後14日間',
            action: '予算固定（変動なし）',
          },
        ],
        automation: 'Googleスクリプト、Meta Rules自動実行',
      },
      contingencyPlan: {
        reserve: totalBudget * 0.05,
        purpose: [
          '急なCPA悪化時の補填',
          '高パフォーマンスキャンペーンへの緊急追加',
          '競合対策（CPCサージ）',
        ],
      },
      summary: `予算配分最適化完了。総額¥${(totalBudget / 1000000).toFixed(1)}M。Google 40%→50%（+¥${((totalBudget * 0.1) / 1000000).toFixed(1)}M）、Meta 40%→35%、LINE 20%→15%。コンバージョン+30%、CPA-23%、ROAS+21%達成見込み。`,
    };

    return allocation;
  }

  /**
   * パフォーマンス分析
   */
  private async analyzePerformance(input: AdOperationsTaskInput): Promise<any> {
    this.log('Analyzing campaign performance...');

    const campaign = input.existingCampaign || this.generateSampleCampaign();
    const perf = campaign.performance!;

    const analysis = {
      campaignName: campaign.name,
      platform: campaign.platform,
      period: `${campaign.startDate} - ${campaign.endDate || '現在'}`,
      overview: {
        budget: {
          allocated: campaign.budget,
          spent: perf.cost,
          remaining: campaign.budget - perf.cost,
          utilizationRate: ((perf.cost / campaign.budget) * 100).toFixed(1) + '%',
          pacing: this.calculatePacing(campaign.startDate, campaign.endDate, perf.cost, campaign.budget),
        },
        performance: {
          impressions: perf.impressions.toLocaleString(),
          reach: perf.reach.toLocaleString(),
          clicks: perf.clicks.toLocaleString(),
          ctr: perf.ctr.toFixed(2) + '%',
          conversions: perf.conversions.toLocaleString(),
          conversionRate: perf.conversionRate.toFixed(2) + '%',
        },
        costs: {
          totalCost: `¥${perf.cost.toLocaleString()}`,
          cpc: `¥${perf.cpc.toLocaleString()}`,
          cpm: `¥${perf.cpm.toLocaleString()}`,
          cpa: `¥${perf.cpa.toLocaleString()}`,
        },
        roi: {
          revenue: `¥${perf.revenue.toLocaleString()}`,
          roas: `${perf.roas}%`,
          profit: `¥${(perf.revenue - perf.cost).toLocaleString()}`,
          roi: `${(((perf.revenue - perf.cost) / perf.cost) * 100).toFixed(0)}%`,
        },
      },
      benchmarkComparison: {
        industry: 'SaaS / B2B',
        metrics: [
          {
            metric: 'CTR',
            actual: perf.ctr,
            benchmark: 2.5,
            performance: perf.ctr > 2.5 ? '優秀' : '要改善',
            variance: `${((perf.ctr / 2.5 - 1) * 100).toFixed(0)}%`,
          },
          {
            metric: 'CVR',
            actual: perf.conversionRate,
            benchmark: 3.0,
            performance: perf.conversionRate > 3.0 ? '優秀' : '要改善',
            variance: `${((perf.conversionRate / 3.0 - 1) * 100).toFixed(0)}%`,
          },
          {
            metric: 'CPA',
            actual: perf.cpa,
            benchmark: 6000,
            performance: perf.cpa < 6000 ? '優秀' : '要改善',
            variance: `${((perf.cpa / 6000 - 1) * 100).toFixed(0)}%`,
          },
          {
            metric: 'ROAS',
            actual: perf.roas,
            benchmark: 350,
            performance: perf.roas > 350 ? '優秀' : '要改善',
            variance: `${((perf.roas / 350 - 1) * 100).toFixed(0)}%`,
          },
        ],
      },
      funnelAnalysis: {
        stages: [
          {
            stage: 'インプレッション',
            count: perf.impressions,
            percentage: 100,
            dropOff: 0,
          },
          {
            stage: 'クリック',
            count: perf.clicks,
            percentage: ((perf.clicks / perf.impressions) * 100).toFixed(2),
            dropOff: ((1 - perf.clicks / perf.impressions) * 100).toFixed(2),
          },
          {
            stage: 'ランディングページ訪問',
            count: Math.round(perf.clicks * 0.95),
            percentage: ((perf.clicks * 0.95 / perf.impressions) * 100).toFixed(2),
            dropOff: 5.0,
          },
          {
            stage: 'コンバージョン',
            count: perf.conversions,
            percentage: ((perf.conversions / perf.impressions) * 100).toFixed(4),
            dropOff: ((1 - perf.conversions / (perf.clicks * 0.95)) * 100).toFixed(2),
          },
        ],
        bottlenecks: [
          {
            stage: 'インプレッション → クリック',
            issue: `CTR ${perf.ctr.toFixed(2)}%`,
            recommendation: perf.ctr < 2.5 ? 'クリエイティブ改善、ヘッドライン最適化' : '良好',
          },
          {
            stage: 'クリック → ランディングページ',
            issue: '直帰率5%',
            recommendation: 'ページ読み込み速度改善（目標3秒以内）',
          },
          {
            stage: 'ランディングページ → コンバージョン',
            issue: `CVR ${perf.conversionRate.toFixed(2)}%`,
            recommendation: perf.conversionRate < 3.0 ? 'LP改善、フォーム最適化、A/Bテスト' : '良好',
          },
        ],
      },
      segmentPerformance: {
        byDevice: [
          {
            device: 'デスクトップ',
            impressions: perf.impressions * 0.35,
            clicks: perf.clicks * 0.42,
            ctr: 3.6,
            conversions: perf.conversions * 0.5,
            cvr: 5.2,
            cpa: 4500,
            evaluation: '最高パフォーマンス',
          },
          {
            device: 'モバイル',
            impressions: perf.impressions * 0.6,
            clicks: perf.clicks * 0.53,
            ctr: 2.7,
            conversions: perf.conversions * 0.45,
            cvr: 3.1,
            cpa: 6200,
            evaluation: '標準、改善余地あり',
          },
          {
            device: 'タブレット',
            impressions: perf.impressions * 0.05,
            clicks: perf.clicks * 0.05,
            ctr: 3.0,
            conversions: perf.conversions * 0.05,
            cvr: 2.8,
            cpa: 7500,
            evaluation: '低パフォーマンス',
          },
        ],
        byTime: [
          {
            time: '9-12時',
            clicks: perf.clicks * 0.25,
            conversions: perf.conversions * 0.3,
            cvr: 5.8,
            evaluation: '最高',
          },
          {
            time: '12-15時',
            clicks: perf.clicks * 0.2,
            conversions: perf.conversions * 0.22,
            cvr: 4.5,
            evaluation: '良好',
          },
          {
            time: '15-18時',
            clicks: perf.clicks * 0.18,
            conversions: perf.conversions * 0.2,
            cvr: 4.8,
            evaluation: '良好',
          },
          {
            time: 'その他',
            clicks: perf.clicks * 0.37,
            conversions: perf.conversions * 0.28,
            cvr: 2.5,
            evaluation: '低',
          },
        ],
        byAudience: [
          {
            audience: 'Lookalike 1%',
            budget: campaign.budget * 0.3,
            conversions: perf.conversions * 0.45,
            cpa: 3800,
            roas: 520,
            evaluation: '優秀',
          },
          {
            audience: 'リターゲティング',
            budget: campaign.budget * 0.2,
            conversions: perf.conversions * 0.3,
            cpa: 4000,
            roas: 480,
            evaluation: '優秀',
          },
          {
            audience: 'インタレスト',
            budget: campaign.budget * 0.3,
            conversions: perf.conversions * 0.2,
            cpa: 7500,
            roas: 280,
            evaluation: '要改善',
          },
          {
            audience: 'デモグラフィック',
            budget: campaign.budget * 0.2,
            conversions: perf.conversions * 0.05,
            cpa: 16000,
            roas: 150,
            evaluation: '停止検討',
          },
        ],
      },
      recommendations: [
        {
          priority: 'Critical',
          action: 'デモグラフィックオーディエンス停止、予算をLookalike 1%へ再配分',
          expectedImpact: 'CPA -18%、ROAS +25%',
          timeline: '即座',
        },
        {
          priority: 'High',
          action: 'モバイルLP改善（読み込み速度、フォーム簡素化）',
          expectedImpact: 'モバイルCVR 3.1%→4.5%（+45%）',
          timeline: '1週間',
        },
        {
          priority: 'High',
          action: '入札調整: デスクトップ+20%、タブレット-30%',
          expectedImpact: 'CPA -12%',
          timeline: '即座',
        },
        {
          priority: 'Medium',
          action: 'インタレストオーディエンス細分化、低パフォーマンス除外',
          expectedImpact: 'CPA -8%',
          timeline: '2週間',
        },
      ],
      summary: `パフォーマンス分析完了。ROAS ${perf.roas}%（ベンチマーク350%）、CPA ¥${perf.cpa.toLocaleString()}（目標¥6,000）。デスクトップ好調、モバイル要改善。デモグラフィック停止、Lookalike拡大でROAS +25%見込み。`,
    };

    return analysis;
  }

  /**
   * ROIトラッキング
   */
  private async trackROI(input: AdOperationsTaskInput): Promise<any> {
    this.log('Setting up comprehensive ROI tracking...');

    const campaign = input.existingCampaign || this.generateSampleCampaign();
    const perf = campaign.performance!;

    const roiTracking = {
      campaignName: campaign.name,
      platform: campaign.platform,
      trackingSetup: {
        conversionTracking: {
          platforms: {
            googleAds: {
              pixelType: 'グローバルサイトタグ + イベントスニペット',
              events: [
                { name: 'リード送信', value: 5000, primaryGoal: true },
                { name: '購入完了', value: 'dynamic', primaryGoal: true },
                { name: '資料DL', value: 1000, primaryGoal: false },
              ],
              enhancedConversions: '有効',
            },
            metaAds: {
              pixelType: 'Metaピクセル',
              events: [
                { name: 'Lead', value: 5000, primaryGoal: true },
                { name: 'Purchase', value: 'dynamic', primaryGoal: true },
                { name: 'ViewContent', value: 0, primaryGoal: false },
              ],
              capi: 'Conversions API実装（サーバー側トラッキング）',
            },
            lineAds: {
              pixelType: 'LINE Tag',
              events: [
                { name: 'Conversion', value: 5000, primaryGoal: true },
                { name: 'PageView', value: 0, primaryGoal: false },
              ],
            },
          },
          crossPlatformDeduplication: {
            method: '最終クリックアトリビューション',
            window: 'クリック後7日間',
            implementation: 'Google Analytics 4統合',
          },
        },
        attributionModeling: {
          model: 'Data-Driven Attribution（DDA）',
          fallback: 'Linear Attribution',
          platforms: {
            googleAds: 'DDA利用可能',
            metaAds: 'DDA類似モデル',
            lineAds: 'Last Click（制約）',
          },
          insights: [
            'アシストコンバージョン: Display広告が購入の40%でアシスト',
            '複数接触: 平均3.2回接触後にコンバージョン',
            'チャネル組み合わせ: Search + Display併用でCVR 2.3倍',
          ],
        },
        ltvTracking: {
          method: 'コホート分析 + 予測LTV',
          dataSource: 'CRM（Salesforce）統合',
          metrics: {
            avgLTV: 150000,
            ltvByChannel: [
              { channel: 'Google Search', ltv: 180000, paybackPeriod: 3.2 },
              { channel: 'Meta Lookalike', ltv: 140000, paybackPeriod: 2.8 },
              { channel: 'LINE', ltv: 110000, paybackPeriod: 4.5 },
            ],
            cohortAnalysis: {
              month1: { retention: 100, revenue: 50000 },
              month3: { retention: 85, revenue: 95000 },
              month6: { retention: 72, revenue: 130000 },
              month12: { retention: 60, revenue: 150000 },
            },
          },
          optimization: 'Target ROAS入札でLTV高いセグメント優先',
        },
      },
      roiCalculation: {
        basic: {
          revenue: perf.revenue,
          cost: perf.cost,
          profit: perf.revenue - perf.cost,
          roi: (((perf.revenue - perf.cost) / perf.cost) * 100).toFixed(0) + '%',
          roas: perf.roas + '%',
        },
        advanced: {
          marginalROI: {
            description: '追加¥100,000投資時の期待リターン',
            calculation: '過去データ回帰分析',
            result: {
              googleAds: '¥180,000（+80%）',
              metaAds: '¥145,000（+45%）',
              lineAds: '¥105,000（+5%）',
            },
            recommendation: 'Google Ads予算増額優先',
          },
          incrementalROI: {
            description: '広告なし vs 広告ありの売上差分',
            method: 'Geo実験（地域分割テスト）',
            result: {
              totalRevenue: perf.revenue,
              organicRevenue: perf.revenue * 0.3,
              incrementalRevenue: perf.revenue * 0.7,
              incrementalROI: (((perf.revenue * 0.7 - perf.cost) / perf.cost) * 100).toFixed(0) + '%',
            },
          },
          ltv_cac: {
            ltv: 150000,
            cac: perf.cpa,
            ratio: (150000 / perf.cpa).toFixed(2),
            evaluation: (150000 / perf.cpa) > 3 ? '健全（3:1以上）' : '要改善',
          },
        },
      },
      dashboards: {
        realTime: {
          tool: 'Google Data Studio / Looker Studio',
          metrics: [
            'インプレッション',
            'クリック',
            'CTR',
            'コスト',
            'CPC',
            'コンバージョン（リアルタイム推定）',
          ],
          updateFrequency: '15分ごと',
          alerts: [
            'CPA > ¥7,000（3時間継続）→ Slack通知',
            '日予算80%消化（15時前）→ Email通知',
            'CTR < 1.5%（1日）→ Slack通知',
          ],
        },
        daily: {
          tool: 'Google Sheets（自動更新）',
          metrics: [
            '日次コスト、コンバージョン、CPA、ROAS',
            '累計予算消化率',
            '目標達成率',
            'ペーシング',
          ],
          distribution: 'チーム全員へ毎朝8時配信',
        },
        weekly: {
          tool: 'PowerPoint（自動生成）',
          content: [
            'エグゼクティブサマリー',
            'KPI進捗',
            'チャネル別パフォーマンス',
            '最適化アクション',
            '来週計画',
          ],
          distribution: 'ステークホルダーミーティング（毎週金曜15時）',
        },
        monthly: {
          tool: 'Comprehensive Report',
          content: [
            'ROI詳細分析',
            'アトリビューション分析',
            'LTVコホート分析',
            'A/Bテスト結果',
            '次月戦略',
          ],
          distribution: 'エグゼクティブレビュー',
        },
      },
      benchmarkTracking: {
        internal: {
          comparison: '前月比、前年同月比',
          kpi: ['CPA変動率', 'ROAS変動率', 'コンバージョン数変動率'],
        },
        external: {
          industry: 'SaaS / B2B',
          sources: ['WordStream', 'HubSpot', 'Databox'],
          benchmarks: {
            ctr: 2.5,
            cvr: 3.0,
            cpa: 6000,
            roas: 350,
          },
          quartileRanking: '業界トップ25%目標',
        },
      },
      optimizationCycle: {
        daily: [
          '予算ペーシング確認',
          'パフォーマンス異常検知',
          '緊急調整（入札、予算）',
        ],
        weekly: [
          'A/Bテスト結果評価',
          'クリエイティブローテーション',
          'オーディエンス最適化',
        ],
        monthly: [
          '全体ROI分析',
          '予算再配分',
          '次月戦略策定',
        ],
      },
      summary: `ROIトラッキング体制構築完了。現在ROI ${(((perf.revenue - perf.cost) / perf.cost) * 100).toFixed(0)}%、ROAS ${perf.roas}%。LTV/CAC比 ${(150000 / perf.cpa).toFixed(1)}:1。4層ダッシュボード（リアルタイム、日次、週次、月次）でデータドリブン最適化。`,
    };

    return roiTracking;
  }

  /**
   * オーディエンスターゲティング最適化
   */
  private async optimizeTargeting(input: AdOperationsTaskInput): Promise<any> {
    this.log('Optimizing audience targeting...');

    const targetingOptimization = {
      objective: 'CPA最小化 + リーチ拡大',
      currentAudiences: [
        {
          name: 'Lookalike 1% - 購入者',
          platform: 'Meta',
          size: 2000000,
          performance: {
            conversions: 450,
            cpa: 4200,
            roas: 520,
            evaluation: '優秀',
          },
        },
        {
          name: 'インタレスト - ビジネスツール',
          platform: 'Meta',
          size: 15000000,
          performance: {
            conversions: 180,
            cpa: 7500,
            roas: 280,
            evaluation: '要改善',
          },
        },
        {
          name: 'インマーケット - Business Software',
          platform: 'Google',
          size: 5000000,
          performance: {
            conversions: 320,
            cpa: 5200,
            roas: 410,
            evaluation: '良好',
          },
        },
      ],
      recommendations: {
        expand: [
          {
            audience: 'Lookalike 1-3% - 購入者',
            platform: 'Meta',
            currentSize: 2000000,
            expandedSize: 6000000,
            reason: 'Lookalike 1%好調、類似度緩めて拡大',
            expectedCPA: 4800,
            expectedROAS: 450,
            budget: 500000,
          },
          {
            audience: 'カスタマーマッチ - メールリスト',
            platform: 'Google',
            currentSize: 0,
            expandedSize: 50000,
            reason: 'CRMデータ活用、高精度ターゲティング',
            expectedCPA: 3500,
            expectedROAS: 550,
            budget: 200000,
          },
          {
            audience: 'オーディエンス類似 - 既存顧客',
            platform: 'LINE',
            currentSize: 0,
            expandedSize: 3000000,
            reason: 'LINEユーザーベース活用',
            expectedCPA: 5500,
            expectedROAS: 380,
            budget: 300000,
          },
        ],
        refine: [
          {
            audience: 'インタレスト - ビジネスツール',
            platform: 'Meta',
            issue: 'CPA高い（¥7,500）、広すぎる',
            refinement: [
              '興味細分化: 「マーケティングオートメーション」「CRM」に絞る',
              '行動追加: 「ビジネスページ管理者」「広告主」',
              '除外: 「学生」「求職者」',
            ],
            expectedCPA: 5500,
            expectedROAS: 380,
          },
          {
            audience: 'デモグラフィック（広範）',
            platform: 'LINE',
            issue: 'CVR極低（0.5%）',
            refinement: [
              '年齢絞り込み: 35-54歳（意思決定者）',
              '地域絞り込み: 都市部のみ',
              '所得層追加: 年収600万円以上',
            ],
            expectedCPA: 6500,
            expectedROAS: 320,
          },
        ],
        exclude: [
          {
            audience: '既存顧客',
            reason: '無駄コスト削減',
            method: 'カスタマーリストアップロード→除外設定',
            expectedSavings: 150000,
          },
          {
            audience: '低品質リード（過去6ヶ月）',
            reason: '未成約、低エンゲージメント',
            method: 'CRMデータ→カスタムオーディエンス→除外',
            expectedSavings: 100000,
          },
          {
            audience: 'コンバージョン未達ユーザー（14日間）',
            reason: 'リターゲティング効率化',
            method: 'ピクセルデータ→頻度制限',
            expectedSavings: 80000,
          },
        ],
      },
      advancedStrategies: {
        sequentialTargeting: {
          strategy: '段階的ターゲティング（ファネル対応）',
          stages: [
            {
              stage: 'Awareness',
              audience: 'インタレスト広範（15M人）',
              objective: 'ブランド認知',
              kpi: 'リーチ、動画視聴',
              budget: 500000,
            },
            {
              stage: 'Consideration',
              audience: '動画75%視聴者（30日間）',
              objective: 'エンゲージメント',
              kpi: 'ウェブサイト訪問、資料DL',
              budget: 400000,
            },
            {
              stage: 'Conversion',
              audience: 'ウェブサイト訪問者（14日間）',
              objective: 'コンバージョン',
              kpi: 'リード、購入',
              budget: 600000,
            },
          ],
        },
        dynamicAudience: {
          strategy: 'ユーザー行動ベース動的セグメント',
          segments: [
            {
              name: 'カート放棄',
              definition: 'カート追加後24時間以内未購入',
              size: 8000,
              cpa: 3200,
              priority: 'Critical',
            },
            {
              name: '高額商品閲覧',
              definition: '¥100,000以上商品ページ3回以上訪問',
              size: 5000,
              cpa: 4000,
              priority: 'High',
            },
            {
              name: '比較検討層',
              definition: '料金ページ + 競合比較ページ閲覧',
              size: 12000,
              cpa: 4500,
              priority: 'High',
            },
          ],
        },
        predictiveAudience: {
          strategy: 'AI予測オーディエンス',
          platforms: {
            google: 'Optimized Targeting（自動拡張）',
            meta: 'Advantage+ Audience（自動最適化）',
          },
          method: 'プラットフォームAIがコンバージョン予測、類似ユーザー発掘',
          expectedImpact: 'リーチ +40%、CPA維持',
        },
      },
      testingPlan: {
        audienceTests: [
          {
            test: 'Lookalike 1% vs 3% vs 5%',
            budget: 300000,
            duration: '14日間',
            hypothesis: '1%最高CPA、5%でリーチ拡大可能か検証',
          },
          {
            test: 'インタレスト vs 行動 vs デモグラ',
            budget: 300000,
            duration: '14日間',
            hypothesis: '行動ターゲティング（例: 広告主）が最高CVR',
          },
          {
            test: 'ブロード vs ナロー',
            budget: 200000,
            duration: '14日間',
            hypothesis: 'Meta自動最適化でブロードも効率的か',
          },
        ],
      },
      expectedResults: {
        current: {
          totalConversions: 950,
          avgCPA: 5263,
          totalReach: 3500000,
        },
        optimized: {
          totalConversions: 1350,
          avgCPA: 4444,
          totalReach: 5000000,
        },
        improvement: {
          conversions: '+42%',
          cpa: '-16%',
          reach: '+43%',
        },
      },
      summary: `オーディエンスターゲティング最適化完了。拡大3セグメント、改善2セグメント、除外3セグメント。段階的ターゲティング、動的セグメント、AI予測活用でコンバージョン+42%、CPA-16%、リーチ+43%達成見込み。`,
    };

    return targetingOptimization;
  }

  // ユーティリティメソッド

  private generateDefaultAudience(): AdTargetAudience {
    return {
      demographics: {
        ageRange: ['25-34', '35-44', '45-54'],
        gender: ['全性別'],
        location: ['日本', '東京都', '大阪府', '愛知県'],
        language: ['日本語'],
        income: '世帯年収600万円以上',
      },
      interests: [
        'ビジネスツール',
        'テクノロジー',
        'マーケティング',
        '業務効率化',
        'AI・機械学習',
      ],
      behaviors: [
        'ビジネス意思決定者',
        'オンラインショッピング',
        'テクノロジー早期採用者',
      ],
      customAudiences: [
        {
          type: 'website-visitors',
          size: 50000,
          details: '過去30日間のウェブサイト訪問者',
        },
        {
          type: 'customer-list',
          size: 10000,
          details: '既存顧客リスト（購入者）',
        },
        {
          type: 'lookalike',
          size: 2000000,
          details: '購入者の類似オーディエンス1%',
        },
      ],
      exclusions: ['既存顧客（アクティブ）', '従業員', '競合他社'],
    };
  }

  private generateSampleCampaign(): CampaignData {
    return {
      id: 'CAMP-2025-Q4-001',
      name: '新製品ローンチキャンペーン',
      platform: 'Google Ads',
      objective: 'Conversions',
      budget: 3000000,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      performance: {
        impressions: 5000000,
        reach: 2000000,
        clicks: 150000,
        ctr: 3.0,
        conversions: 5000,
        conversionRate: 3.33,
        cost: 2800000,
        cpc: 18.67,
        cpm: 560,
        cpa: 5600,
        roas: 400,
        revenue: 11200000,
      },
    };
  }

  private diagnoseBiddingIssues(perf: CampaignPerformance): string[] {
    const issues: string[] = [];

    if (perf.cpa > 6000) {
      issues.push('CPA高い: 目標¥5,000超過、入札戦略見直し必要');
    }
    if (perf.ctr < 2.5) {
      issues.push('CTR低い: クリエイティブ・ターゲティング改善必要');
    }
    if (perf.conversionRate < 3.0) {
      issues.push('CVR低い: ランディングページ最適化必要');
    }
    if (perf.roas < 400) {
      issues.push('ROAS低い: 高LTVセグメント優先、低パフォーマンス停止');
    }

    if (issues.length === 0) {
      issues.push('パフォーマンス良好、継続最適化で更なる改善可能');
    }

    return issues;
  }

  private calculatePacing(
    startDate: string,
    endDate: string | undefined,
    spent: number,
    budget: number
  ): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 90 * 24 * 60 * 60 * 1000);
    const now = new Date();

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const expectedSpendRate = elapsedDays / totalDays;
    const actualSpendRate = spent / budget;

    if (actualSpendRate > expectedSpendRate * 1.1) {
      return `ペース速い（期待${(expectedSpendRate * 100).toFixed(0)}%、実際${(actualSpendRate * 100).toFixed(0)}%）`;
    } else if (actualSpendRate < expectedSpendRate * 0.9) {
      return `ペース遅い（期待${(expectedSpendRate * 100).toFixed(0)}%、実際${(actualSpendRate * 100).toFixed(0)}%）`;
    } else {
      return `ペース適正（${(actualSpendRate * 100).toFixed(0)}%）`;
    }
  }

  protected async cleanup(): Promise<void> {
    this.log('AI Ad Operations Specialist Agent cleanup completed');
  }
}
