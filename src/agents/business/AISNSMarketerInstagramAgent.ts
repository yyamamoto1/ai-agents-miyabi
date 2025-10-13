/**
 * AI SNS Marketer (Instagram) Agent
 * Instagram専門のSNSマーケティングエージェント
 *
 * 役割:
 * - Instagram投稿コンテンツ戦略立案
 * - ビジュアルコンテンツ最適化
 * - ハッシュタグ戦略
 * - ストーリーズ・リール戦略
 * - インフルエンサー連携
 * - Instagramアナリティクス分析
 * - コミュニティエンゲージメント
 */

import { BaseAgent, AgentTask, AgentResponse } from '../../core/BaseAgent.js';

// タスク入力インターフェース
export interface SNSMarketerInstagramTaskInput {
  taskType:
    | 'content-strategy'
    | 'post-creation'
    | 'hashtag-research'
    | 'stories-planning'
    | 'reels-strategy'
    | 'influencer-outreach'
    | 'analytics-report';
  brand?: BrandProfile;
  targetAudience?: InstagramAudience;
  contentTheme?: string;
  postType?: 'feed' | 'carousel' | 'stories' | 'reels' | 'igtv';
  goals?: string[];
  competitors?: string[];
  period?: string;
}

// ブランドプロフィール
export interface BrandProfile {
  name: string;
  industry: string;
  voice: string; // フレンドリー、プロフェッショナル、カジュアル等
  aesthetic: string; // ミニマル、ビビッド、ナチュラル等
  values: string[];
  usp: string; // Unique Selling Proposition
}

// Instagramターゲットオーディエンス
export interface InstagramAudience {
  demographics: {
    ageRange: string;
    gender?: string;
    location: string[];
    interests: string[];
  };
  behavior: {
    activeTime: string[];
    preferredContent: string[];
    engagementLevel: 'low' | 'medium' | 'high';
  };
  painPoints: string[];
  aspirations: string[];
}

// コンテンツ戦略
export interface ContentStrategy {
  contentPillars: ContentPillar[];
  postingSchedule: PostingSchedule;
  visualGuidelines: VisualGuidelines;
  engagementTactics: string[];
  growthGoals: GrowthGoals;
  expectedResults: ExpectedResults;
}

export interface ContentPillar {
  theme: string;
  description: string;
  frequency: string;
  contentTypes: string[];
  exampleTopics: string[];
  cta: string;
}

export interface PostingSchedule {
  frequency: string;
  bestTimes: string[];
  weeklyPlan: WeeklyPost[];
}

export interface WeeklyPost {
  day: string;
  time: string;
  contentPillar: string;
  postType: string;
  theme: string;
}

export interface VisualGuidelines {
  colorPalette: string[];
  filters: string[];
  compositionStyle: string;
  fontRecommendations: string[];
  brandConsistency: string[];
}

export interface GrowthGoals {
  followerGrowth: string;
  engagementRate: string;
  reachIncrease: string;
  websiteTraffic: string;
  conversions: string;
}

export interface ExpectedResults {
  month1: MonthlyMetrics;
  month3: MonthlyMetrics;
  month6: MonthlyMetrics;
}

export interface MonthlyMetrics {
  followers: number;
  avgEngagementRate: number;
  avgReach: number;
  profileVisits: number;
  websiteClicks: number;
}

// 投稿コンテンツ
export interface PostContent {
  caption: string;
  hashtags: string[];
  visualDescription: string;
  callToAction: string;
  postingTime: string;
  contentPillar: string;
  engagementPrompt: string;
  alternativeVersions: AlternativeVersion[];
}

export interface AlternativeVersion {
  version: string;
  caption: string;
  difference: string;
}

// ハッシュタグ戦略
export interface HashtagStrategy {
  categories: HashtagCategory[];
  mixingStrategy: string;
  bestPractices: string[];
  avoidList: string[];
  performanceTracking: string[];
}

export interface HashtagCategory {
  category: string;
  size: string;
  purpose: string;
  examples: HashtagData[];
}

export interface HashtagData {
  tag: string;
  posts: number;
  relevance: 'high' | 'medium' | 'low';
  competitiveness: 'high' | 'medium' | 'low';
  recommended: boolean;
}

// ストーリーズ戦略
export interface StoriesStrategy {
  themes: StoryTheme[];
  frequency: string;
  bestPractices: string[];
  interactiveElements: InteractiveElement[];
  highlightStrategy: HighlightStrategy;
}

export interface StoryTheme {
  theme: string;
  frequency: string;
  contentIdeas: string[];
  stickers: string[];
  goal: string;
}

export interface InteractiveElement {
  type: string;
  usage: string;
  benefit: string;
  examples: string[];
}

export interface HighlightStrategy {
  categories: string[];
  coverDesign: string;
  organization: string;
}

// リール戦略
export interface ReelsStrategy {
  contentTypes: ReelsContentType[];
  format: ReelsFormat;
  trends: TrendAnalysis[];
  musicStrategy: MusicStrategy;
  optimizationTips: string[];
}

export interface ReelsContentType {
  type: string;
  description: string;
  frequency: string;
  examples: string[];
  hooks: string[];
}

export interface ReelsFormat {
  duration: string;
  aspectRatio: string;
  captions: string;
  coverImage: string;
  firstFrame: string;
}

export interface TrendAnalysis {
  trend: string;
  description: string;
  relevance: string;
  howToAdapt: string;
}

export interface MusicStrategy {
  trendingAudio: string[];
  brandedAudio: string;
  licenseConsiderations: string[];
}

// インフルエンサー戦略
export interface InfluencerStrategy {
  tiers: InfluencerTier[];
  outreachPlan: OutreachPlan;
  collaborationTypes: CollaborationType[];
  budget: BudgetAllocation;
  expectedROI: ExpectedROI;
}

export interface InfluencerTier {
  tier: string;
  followerRange: string;
  avgEngagementRate: string;
  costRange: string;
  benefits: string[];
  recommendedNumber: number;
}

export interface OutreachPlan {
  targetProfiles: TargetProfile[];
  outreachMessage: string;
  incentives: string[];
  timeline: string;
}

export interface TargetProfile {
  niche: string;
  followerCount: string;
  engagementRate: string;
  contentStyle: string;
  audienceAlignment: string;
}

export interface CollaborationType {
  type: string;
  description: string;
  bestFor: string;
  deliverables: string[];
  avgCost: string;
}

export interface BudgetAllocation {
  total: number;
  byTier: Record<string, number>;
  contingency: number;
}

export interface ExpectedROI {
  reach: number;
  engagement: number;
  newFollowers: number;
  conversions: number;
  roi: string;
}

// アナリティクスレポート
export interface AnalyticsReport {
  period: string;
  overview: OverviewMetrics;
  contentPerformance: ContentPerformance;
  audienceInsights: AudienceInsights;
  hashtagPerformance: HashtagPerformance[];
  competitorComparison: CompetitorMetrics[];
  recommendations: string[];
  actionPlan: ActionItem[];
}

export interface OverviewMetrics {
  followers: {
    current: number;
    growth: number;
    growthRate: string;
  };
  engagement: {
    avgRate: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
  };
  reach: {
    total: number;
    organic: number;
    paid: number;
  };
  impressions: number;
  profileVisits: number;
  websiteClicks: number;
}

export interface ContentPerformance {
  topPosts: TopPost[];
  bestPerformingType: string;
  bestPostingTimes: string[];
  avgEngagementByType: Record<string, number>;
}

export interface TopPost {
  rank: number;
  type: string;
  theme: string;
  engagementRate: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface AudienceInsights {
  demographics: {
    topLocations: string[];
    ageDistribution: Record<string, number>;
    genderDistribution: Record<string, number>;
  };
  behavior: {
    mostActiveTime: string;
    mostActiveDays: string[];
    averageSessionDuration: string;
  };
  interests: string[];
}

export interface HashtagPerformance {
  hashtag: string;
  uses: number;
  avgEngagement: number;
  reachIncrease: string;
  effectiveness: 'high' | 'medium' | 'low';
}

export interface CompetitorMetrics {
  name: string;
  followers: number;
  avgEngagementRate: number;
  postFrequency: string;
  topContentType: string;
  gap: string;
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low';
  action: string;
  rationale: string;
  expectedImpact: string;
  deadline: string;
}

export class AISNSMarketerInstagramAgent extends BaseAgent {
  constructor() {
    super({
      name: 'AI SNS Marketer (Instagram)',
      role: 'Instagram専門のSNSマーケティングの専門家',
      category: 'business',
      description: 'Instagram投稿戦略、ビジュアルコンテンツ最適化、エンゲージメント向上を実行',
      capabilities: [
        'コンテンツ戦略立案',
        '投稿コンテンツ作成',
        'ハッシュタグリサーチ',
        'ストーリーズ戦略',
        'リール戦略',
        'インフルエンサー連携',
        'アナリティクス分析',
      ],
    });
  }

  protected async setup(): Promise<void> {
    this.log('Instagram Marketing Agent初期化中...');
    // Instagramツール、APIクライアントの初期化
    this.log('Instagram Marketing Agent初期化完了');
  }

  protected async process(task: AgentTask): Promise<AgentResponse> {
    const input = task.input as SNSMarketerInstagramTaskInput;

    switch (input.taskType) {
      case 'content-strategy':
        return await this.createContentStrategy(input);
      case 'post-creation':
        return await this.createPost(input);
      case 'hashtag-research':
        return await this.researchHashtags(input);
      case 'stories-planning':
        return await this.planStories(input);
      case 'reels-strategy':
        return await this.createReelsStrategy(input);
      case 'influencer-outreach':
        return await this.planInfluencerOutreach(input);
      case 'analytics-report':
        return await this.generateAnalyticsReport(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  protected async cleanup(): Promise<void> {
    this.log('Instagram Marketing Agentクリーンアップ中...');
    // リソースの解放
    this.log('Instagram Marketing Agentクリーンアップ完了');
  }

  // コンテンツ戦略立案
  private async createContentStrategy(
    input: SNSMarketerInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram コンテンツ戦略を策定中...');

    const strategy: ContentStrategy = {
      contentPillars: [
        {
          theme: '教育的コンテンツ (Educational)',
          description: '業界知識、ハウツー、チュートリアル',
          frequency: '週2回',
          contentTypes: ['カルーセル投稿', 'リール', 'インフォグラフィック'],
          exampleTopics: [
            '〇〇の使い方5ステップ',
            '知っておくべき△△のトレンド',
            '初心者向け◇◇ガイド',
            '専門家が教える□□のコツ',
          ],
          cta: 'プロフィールから詳細をチェック',
        },
        {
          theme: 'インスピレーション (Inspirational)',
          description: '成功事例、変革ストーリー、モチベーション',
          frequency: '週2回',
          contentTypes: ['フィード投稿', 'ストーリーズ', 'リール'],
          exampleTopics: [
            '顧客成功事例',
            'ビフォーアフター',
            '目標達成までの道のり',
            '業界で輝く人々のストーリー',
          ],
          cta: 'あなたのストーリーもシェアしてください',
        },
        {
          theme: 'エンターテインメント (Entertaining)',
          description: '楽しく、共感できる、シェアしたくなるコンテンツ',
          frequency: '週1-2回',
          contentTypes: ['リール', 'ストーリーズ', 'ミーム'],
          exampleTopics: [
            '業界あるある',
            'トレンドに乗った動画',
            'ユーモアのあるスキット',
            'チャレンジ参加',
          ],
          cta: '友達にタグ付けしてシェア',
        },
        {
          theme: '舞台裏 (Behind-the-Scenes)',
          description: 'チームの日常、製品開発プロセス、企業文化',
          frequency: '週1回',
          contentTypes: ['ストーリーズ', 'リール', 'フィード投稿'],
          exampleTopics: [
            'オフィスツアー',
            'チームメンバー紹介',
            '製品開発秘話',
            'イベント参加レポート',
          ],
          cta: 'コメントで質問してください',
        },
        {
          theme: 'プロモーション (Promotional)',
          description: '製品・サービスの紹介、特別オファー',
          frequency: '週1回',
          contentTypes: ['フィード投稿', 'カルーセル', 'ストーリーズ'],
          exampleTopics: [
            '新製品発表',
            '期間限定オファー',
            '顧客レビュー',
            'サービス機能紹介',
          ],
          cta: 'リンクから今すぐチェック',
        },
      ],

      postingSchedule: {
        frequency: '週7-10投稿 (フィード3-4回、ストーリーズ毎日、リール2-3回)',
        bestTimes: [
          '平日: 7:00-9:00 (通勤時間)',
          '平日: 12:00-13:00 (ランチタイム)',
          '平日: 19:00-21:00 (帰宅後)',
          '週末: 10:00-12:00 (朝のリラックスタイム)',
        ],
        weeklyPlan: [
          {
            day: '月曜',
            time: '7:30',
            contentPillar: '教育的コンテンツ',
            postType: 'カルーセル投稿',
            theme: '週始めのモチベーション × 学び',
          },
          {
            day: '火曜',
            time: '12:30',
            contentPillar: 'エンターテインメント',
            postType: 'リール',
            theme: 'トレンド参加・業界あるある',
          },
          {
            day: '水曜',
            time: '19:00',
            contentPillar: 'インスピレーション',
            postType: 'フィード投稿',
            theme: '顧客成功事例・変革ストーリー',
          },
          {
            day: '木曜',
            time: '7:30',
            contentPillar: '教育的コンテンツ',
            postType: 'リール',
            theme: 'クイックハウツー・チュートリアル',
          },
          {
            day: '金曜',
            time: '12:30',
            contentPillar: '舞台裏',
            postType: 'ストーリーズ → リール',
            theme: 'チームの一週間・オフィスの様子',
          },
          {
            day: '土曜',
            time: '10:00',
            contentPillar: 'インスピレーション',
            postType: 'フィード投稿',
            theme: '週末のインスピレーション',
          },
          {
            day: '日曜',
            time: '19:00',
            contentPillar: 'プロモーション',
            postType: 'カルーセル投稿',
            theme: '製品紹介・特別オファー',
          },
        ],
      },

      visualGuidelines: {
        colorPalette: [
          '#FF6B6B (アクセントレッド)',
          '#4ECDC4 (ターコイズ)',
          '#FFE66D (イエロー)',
          '#F7FFF7 (ホワイト)',
          '#1A1A2E (ダークブルー)',
        ],
        filters: ['明るく自然な色調', 'コントラスト高め', '統一感のあるトーン'],
        compositionStyle: 'ミニマルでクリーン、余白を活かしたデザイン',
        fontRecommendations: [
          'Montserrat (ヘッドライン)',
          'Open Sans (本文)',
          'Playfair Display (装飾的な見出し)',
        ],
        brandConsistency: [
          'ロゴは右下に統一配置',
          '各投稿にブランドカラーを必ず使用',
          'フィード全体で統一感のあるトーン',
          '3×3グリッドでの見栄えを考慮',
        ],
      },

      engagementTactics: [
        '投稿後30分以内にコメントに返信',
        '質問形式のキャプションでエンゲージメント促進',
        'ストーリーズでアンケート・質問スタンプを週3回使用',
        'ユーザー生成コンテンツ (UGC) を週1回リポスト',
        '関連するハッシュタグの新着投稿に積極的にコメント',
        'インフルエンサー・フォロワーとの交流を毎日実施',
        'DMでパーソナルな返信を心がける',
        'コンテストやギブアウェイを月1回実施',
      ],

      growthGoals: {
        followerGrowth: '月間+15-20% (オーガニック成長)',
        engagementRate: '目標: 4-6% (現状の2倍)',
        reachIncrease: '月間+25%',
        websiteTraffic: 'Instagram経由トラフィック +40%',
        conversions: 'Instagram経由コンバージョン +30%',
      },

      expectedResults: {
        month1: {
          followers: 12000,
          avgEngagementRate: 3.5,
          avgReach: 15000,
          profileVisits: 2500,
          websiteClicks: 800,
        },
        month3: {
          followers: 18000,
          avgEngagementRate: 5.0,
          avgReach: 25000,
          profileVisits: 4500,
          websiteClicks: 1500,
        },
        month6: {
          followers: 30000,
          avgEngagementRate: 6.0,
          avgReach: 45000,
          profileVisits: 8000,
          websiteClicks: 3000,
        },
      },
    };

    return {
      success: true,
      data: { strategy },
    };
  }

  // 投稿コンテンツ作成
  private async createPost(input: SNSMarketerInstagramTaskInput): Promise<AgentResponse> {
    this.log(`Instagram ${input.postType || 'フィード'} 投稿を作成中...`);

    const post: PostContent = {
      caption: `✨ 【知っておきたい】${input.contentTheme || 'AIツール活用'}の5つのポイント

こんにちは！今日は${input.contentTheme || 'AIツールの効果的な活用方法'}についてシェアします💡

1️⃣ 目的を明確にする
→ 何を達成したいのか、KPIを設定しましょう

2️⃣ 小さく始める
→ まずは1つのプロセスから自動化を試してみて

3️⃣ データを活用する
→ 収集したデータから改善点を見つけよう

4️⃣ チームと共有
→ ベストプラクティスをチーム全体で共有

5️⃣ 継続的に改善
→ 定期的に見直して最適化を繰り返す

━━━━━━━━━━━━━━
💬 あなたはどのポイントから始めますか？
コメントで教えてください！

👉 プロフィールのリンクから無料ガイドをダウンロード

#AIツール #ビジネス効率化 #生産性向上 #スタートアップ #マーケティング #デジタルトランスフォーメーション #業務改善 #仕事術`,

      hashtags: [
        '#AIツール',
        '#ビジネス効率化',
        '#生産性向上',
        '#スタートアップ',
        '#マーケティング',
        '#デジタルトランスフォーメーション',
        '#業務改善',
        '#仕事術',
        '#起業家',
        '#フリーランス',
        '#ビジネスハック',
        '#働き方改革',
        '#テクノロジー',
        '#イノベーション',
        '#ビジネスツール',
      ],

      visualDescription: `【ビジュアル構成案】
- 背景: クリーンな白またはブランドカラーのグラデーション
- メイン要素: 5つのポイントを番号付きで大きく配置
- アイコン: 各ポイントに関連するシンプルなアイコン
- フォント: Montserrat (見出し) + Open Sans (本文)
- レイアウト: カルーセル形式 (スワイプで各ポイントを詳しく解説)
- 画像サイズ: 1080x1080px (正方形)`,

      callToAction: 'プロフィールのリンクから無料ガイドをダウンロード',

      postingTime: '水曜 19:00 (最も高いエンゲージメント時間帯)',

      contentPillar: '教育的コンテンツ',

      engagementPrompt: '💬 あなたはどのポイントから始めますか？コメントで教えてください！',

      alternativeVersions: [
        {
          version: 'カジュアルトーン',
          caption: `やっほー！今日は超使える${input.contentTheme || 'AIツール'}の話をするよ〜🎉

みんな、仕事の効率化って気になる？
私が実際に試して効果があった5つのポイントをシェア💪✨

[残りは同様の構成]`,
          difference: 'よりフレンドリーで親しみやすい口調',
        },
        {
          version: 'プロフェッショナルトーン',
          caption: `【効率化のプロが教える】${input.contentTheme || 'AIツール'}活用の5原則

ビジネスの成長において、${input.contentTheme || 'AIツールの戦略的活用'}は不可欠です。
本日は、実践的な5つのポイントをご紹介します。

[残りは同様の構成]`,
          difference: 'よりビジネスライクで権威性を重視',
        },
      ],
    };

    return {
      success: true,
      data: { post },
    };
  }

  // ハッシュタグリサーチ
  private async researchHashtags(input: SNSMarketerInstagramTaskInput): Promise<AgentResponse> {
    this.log('Instagram ハッシュタグリサーチを実施中...');

    const strategy: HashtagStrategy = {
      categories: [
        {
          category: 'ビッグハッシュタグ (100万+投稿)',
          size: '1-2個/投稿',
          purpose: '幅広いリーチ、ブランド認知度向上',
          examples: [
            {
              tag: '#AI',
              posts: 15000000,
              relevance: 'high',
              competitiveness: 'high',
              recommended: true,
            },
            {
              tag: '#ビジネス',
              posts: 8000000,
              relevance: 'high',
              competitiveness: 'high',
              recommended: true,
            },
            {
              tag: '#マーケティング',
              posts: 5000000,
              relevance: 'high',
              competitiveness: 'high',
              recommended: true,
            },
          ],
        },
        {
          category: 'ミディアムハッシュタグ (10万-100万投稿)',
          size: '5-7個/投稿',
          purpose: 'ターゲット層へのリーチ、エンゲージメント獲得',
          examples: [
            {
              tag: '#AIツール',
              posts: 250000,
              relevance: 'high',
              competitiveness: 'medium',
              recommended: true,
            },
            {
              tag: '#生産性向上',
              posts: 180000,
              relevance: 'high',
              competitiveness: 'medium',
              recommended: true,
            },
            {
              tag: '#ビジネス効率化',
              posts: 120000,
              relevance: 'high',
              competitiveness: 'medium',
              recommended: true,
            },
            {
              tag: '#スタートアップ',
              posts: 450000,
              relevance: 'medium',
              competitiveness: 'medium',
              recommended: true,
            },
          ],
        },
        {
          category: 'ニッチハッシュタグ (1万-10万投稿)',
          size: '5-8個/投稿',
          purpose: 'ターゲット層との深いつながり、コミュニティ形成',
          examples: [
            {
              tag: '#AIマーケティング',
              posts: 45000,
              relevance: 'high',
              competitiveness: 'low',
              recommended: true,
            },
            {
              tag: '#業務自動化ツール',
              posts: 28000,
              relevance: 'high',
              competitiveness: 'low',
              recommended: true,
            },
            {
              tag: '#マーケティングオートメーション',
              posts: 35000,
              relevance: 'high',
              competitiveness: 'low',
              recommended: true,
            },
          ],
        },
        {
          category: 'ブランド固有ハッシュタグ',
          size: '1-2個/投稿',
          purpose: 'ブランド認知、UGC収集、コミュニティ形成',
          examples: [
            {
              tag: '#MiyabiAI',
              posts: 0,
              relevance: 'high',
              competitiveness: 'low',
              recommended: true,
            },
            {
              tag: '#MiyabiTips',
              posts: 0,
              relevance: 'high',
              competitiveness: 'low',
              recommended: true,
            },
          ],
        },
      ],

      mixingStrategy: `【最適なハッシュタグミックス (15-20個/投稿)】
- ビッグ: 1-2個 (幅広いリーチ)
- ミディアム: 5-7個 (ターゲット層リーチ)
- ニッチ: 5-8個 (エンゲージメント獲得)
- ブランド: 1-2個 (ブランド認知)
- トレンド: 0-2個 (タイムリーな話題に便乗)

投稿ごとにハッシュタグを変えて、Instagramにスパムと見なされないようにする`,

      bestPractices: [
        'キャプションの最後ではなく、最初のコメントにハッシュタグを配置',
        '投稿内容と関連性の高いハッシュタグのみ使用',
        'ハッシュタグの効果を定期的に分析・更新',
        '競合が使用しているハッシュタグを調査',
        'トレンドハッシュタグを適宜活用',
        '禁止されているハッシュタグは使わない',
        '各ハッシュタグの最新投稿を確認し、適切か判断',
      ],

      avoidList: [
        '#like4like',
        '#follow4follow',
        '#instafollow',
        '過度に一般的なハッシュタグ (#love, #instagood など)',
        'スパムと見なされる可能性のあるハッシュタグ',
      ],

      performanceTracking: [
        'Instagramインサイトで各ハッシュタグのリーチを確認',
        'エンゲージメント率の高いハッシュタグを特定',
        '月次でハッシュタグ戦略を見直し',
        'トップ10パフォーマンスハッシュタグリストを作成',
      ],
    };

    return {
      success: true,
      data: { strategy },
    };
  }

  // ストーリーズ戦略立案
  private async planStories(input: SNSMarketerInstagramTaskInput): Promise<AgentResponse> {
    this.log('Instagram ストーリーズ戦略を策定中...');

    const strategy: StoriesStrategy = {
      themes: [
        {
          theme: '舞台裏 (Behind-the-Scenes)',
          frequency: '毎日',
          contentIdeas: [
            'オフィスの様子',
            'チームミーティング',
            '製品開発プロセス',
            '一日のルーティン',
            'パッキング・発送風景',
          ],
          stickers: ['場所', '音楽', 'GIF', 'メンション'],
          goal: '親近感の醸成、ブランドの人間味を見せる',
        },
        {
          theme: 'インタラクティブコンテンツ',
          frequency: '週3-4回',
          contentIdeas: [
            'アンケート (どちらが好き？)',
            '質問スタンプ (何でも聞いて)',
            'クイズ (業界知識テスト)',
            'スライダー (どのくらい同意する？)',
            'カウントダウン (新製品発表まで)',
          ],
          stickers: ['アンケート', '質問', 'クイズ', 'スライダー', 'カウントダウン'],
          goal: 'エンゲージメント向上、オーディエンスの声を聞く',
        },
        {
          theme: '教育コンテンツ (Quick Tips)',
          frequency: '週2-3回',
          contentIdeas: [
            'ハウツー短編動画',
            'クイックヒント',
            '業界トレンド解説',
            'ツールの使い方',
            'よくある質問への回答',
          ],
          stickers: ['リンク', 'ハッシュタグ', 'メンション'],
          goal: '価値提供、専門性のアピール',
        },
        {
          theme: 'ユーザー生成コンテンツ (UGC)',
          frequency: '週2回',
          contentIdeas: [
            '顧客レビューのシェア',
            'フォロワーの投稿をリポスト',
            '顧客の成功事例',
            'コミュニティのハイライト',
          ],
          stickers: ['メンション', '@タグ', '場所', 'ハッシュタグ'],
          goal: 'コミュニティ形成、社会的証明',
        },
        {
          theme: 'プロモーション',
          frequency: '週1-2回',
          contentIdeas: [
            '新製品・サービスの告知',
            '期間限定オファー',
            'セール情報',
            'イベント告知',
            'ウェビナー案内',
          ],
          stickers: ['リンク', 'カウントダウン', 'ハッシュタグ'],
          goal: 'コンバージョン、売上増加',
        },
      ],

      frequency: '毎日3-5ストーリーズ投稿 (24時間以内に消える特性を活用)',

      bestPractices: [
        '縦型フォーマット (9:16) を使用',
        '最初の3秒で注意を引く',
        'テキストは画面の中央に配置 (プロフィール画像・CTAボタンと重ならないように)',
        '各ストーリーは15秒以内に抑える',
        'ブランドカラーやフォントで統一感を出す',
        '音声ONでも楽しめるコンテンツにする',
        'インタラクティブ要素を積極的に活用',
        'ハイライトで重要なストーリーを保存',
      ],

      interactiveElements: [
        {
          type: 'アンケート',
          usage: 'A vs B の選択肢を提示',
          benefit: 'エンゲージメント向上、オーディエンスの好みを知る',
          examples: ['どちらのデザインが好き？', '次はどのトピックが知りたい？'],
        },
        {
          type: '質問スタンプ',
          usage: 'フォロワーからの質問を募集',
          benefit: 'コミュニケーション促進、コンテンツアイデア獲得',
          examples: ['〇〇について何でも聞いて！', '質問ある？'],
        },
        {
          type: 'クイズ',
          usage: '業界知識やブランドに関するクイズ',
          benefit: '教育的価値、エンゲージメント向上',
          examples: ['この製品の特徴は？', '業界トレンドクイズ'],
        },
        {
          type: 'スライダー',
          usage: '共感度や同意度を測定',
          benefit: 'インタラクティブなエンゲージメント',
          examples: ['どのくらい共感する？', 'この問題の重要度は？'],
        },
        {
          type: 'カウントダウン',
          usage: 'イベントや製品発表までのカウントダウン',
          benefit: '期待感の醸成、リマインダー',
          examples: ['新製品発表まで', 'セール開始まで'],
        },
      ],

      highlightStrategy: {
        categories: [
          '製品/サービス紹介',
          '顧客レビュー',
          'ハウツー・Tips',
          'イベント・ニュース',
          'FAQ',
          'チーム紹介',
          'メディア掲載',
        ],
        coverDesign: 'ブランドカラーを使用した統一デザイン、シンプルなアイコン',
        organization: 'カテゴリごとに整理、古いハイライトは定期的に更新',
      },
    };

    return {
      success: true,
      data: { strategy },
    };
  }

  // リール戦略立案
  private async createReelsStrategy(input: SNSMarketerInstagramTaskInput): Promise<AgentResponse> {
    this.log('Instagram リール戦略を策定中...');

    const strategy: ReelsStrategy = {
      contentTypes: [
        {
          type: 'ハウツー・チュートリアル',
          description: '短時間で学べる実用的な知識',
          frequency: '週2回',
          examples: [
            '〇〇を3ステップで解説',
            '知らないと損する△△のコツ',
            '初心者でもできる□□の方法',
          ],
          hooks: [
            '「これ知ってた？」',
            '「たった30秒で学べる」',
            '「プロが教える」',
          ],
        },
        {
          type: 'トレンド参加',
          description: '流行の音楽・エフェクトを活用',
          frequency: '週1-2回',
          examples: [
            'トレンド音楽に合わせた動画',
            'チャレンジ参加',
            '流行のトランジション技術',
          ],
          hooks: [
            '「このトレンド、やってみた！」',
            '「〇〇チャレンジ」',
            '「バズってる理由がわかった」',
          ],
        },
        {
          type: 'ビフォー・アフター',
          description: '変化や成果を視覚的に見せる',
          frequency: '週1回',
          examples: [
            '製品使用前後の比較',
            'プロセスの変革',
            '成長の軌跡',
          ],
          hooks: [
            '「信じられない変化」',
            '「〇〇日間の結果」',
            '「こんなに変わった」',
          ],
        },
        {
          type: 'ストーリーテリング',
          description: '感動的なストーリーや体験談',
          frequency: '週1回',
          examples: [
            '顧客成功事例',
            '創業ストーリー',
            'チームメンバーの背景',
          ],
          hooks: [
            '「この話、聞いて」',
            '「涙なしには見られない」',
            '「信じられない実話」',
          ],
        },
        {
          type: 'Q&A・FAQ',
          description: 'よくある質問への回答',
          frequency: '週1回',
          examples: [
            '「よく聞かれる質問TOP3」',
            '「〇〇についての誤解」',
            '「専門家に聞いてみた」',
          ],
          hooks: [
            '「これ、よく聞かれます」',
            '「誤解してませんか？」',
            '「実は...」',
          ],
        },
      ],

      format: {
        duration: '15-30秒 (最長90秒だが、短い方が視聴完了率が高い)',
        aspectRatio: '9:16 (縦型フルスクリーン)',
        captions: '必須 (音声なしでも理解できるように)',
        coverImage: '目を引くサムネイルを設定',
        firstFrame: '最初の1秒で注意を引く強力なフック',
      },

      trends: [
        {
          trend: 'トランジション動画',
          description: '場面転換を効果的に使った動画',
          relevance: 'ビフォー・アフターや製品紹介に最適',
          howToAdapt: 'ブランドカラーを使ったトランジション、製品の変化を見せる',
        },
        {
          trend: 'テキストオーバーレイ',
          description: '動画に大きなテキストを重ねる',
          relevance: 'キーメッセージを強調',
          howToAdapt: 'ブランドフォントを使用、キャプションで補足',
        },
        {
          trend: 'スピードアップ/スローモーション',
          description: '速度を変えてダイナミックに',
          relevance: 'プロセス動画やアクション動画',
          howToAdapt: '製作過程を早送り、重要な瞬間をスローモーション',
        },
      ],

      musicStrategy: {
        trendingAudio: [
          '現在トレンドの音楽を「リール」タブで確認',
          'オリジナルオーディオの再利用',
          'インストゥルメンタル版で著作権問題を回避',
        ],
        brandedAudio: 'オリジナル音楽を作成し、ブランド認知度を高める',
        licenseConsiderations: [
          'Instagramの音楽ライブラリを使用',
          '著作権フリー音楽サイトから取得',
          '商用利用可能な音楽を選択',
        ],
      },

      optimizationTips: [
        '最初の1-3秒でフックを入れる (スクロールを止めさせる)',
        'キャプションにキーワードを含める (検索最適化)',
        'ハッシュタグを5-10個使用',
        '最適な投稿時間: 平日の昼 (12:00-13:00) と夜 (19:00-21:00)',
        'コメントを促す質問をキャプションに含める',
        'リールを他のプラットフォーム (TikTok, YouTube Shorts) にも投稿',
        '高品質な映像 (最低1080x1920px)',
        'リールインサイトで視聴維持率をチェック',
      ],
    };

    return {
      success: true,
      data: { strategy },
    };
  }

  // インフルエンサー連携戦略
  private async planInfluencerOutreach(
    input: SNSMarketerInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram インフルエンサー連携戦略を策定中...');

    const strategy: InfluencerStrategy = {
      tiers: [
        {
          tier: 'ナノインフルエンサー',
          followerRange: '1,000 - 10,000',
          avgEngagementRate: '5-10%',
          costRange: '無料 - 5万円/投稿',
          benefits: [
            '高いエンゲージメント率',
            'ニッチなオーディエンスとの深いつながり',
            '費用対効果が高い',
            '本物の推薦',
          ],
          recommendedNumber: 10,
        },
        {
          tier: 'マイクロインフルエンサー',
          followerRange: '10,000 - 100,000',
          avgEngagementRate: '3-7%',
          costRange: '5万円 - 30万円/投稿',
          benefits: [
            '良好なエンゲージメント率',
            'ターゲット層への効果的なリーチ',
            '専門性と信頼性',
            'コストパフォーマンス',
          ],
          recommendedNumber: 5,
        },
        {
          tier: 'マクロインフルエンサー',
          followerRange: '100,000 - 1,000,000',
          avgEngagementRate: '1.5-3%',
          costRange: '30万円 - 200万円/投稿',
          benefits: [
            '広範なリーチ',
            'ブランド認知度の向上',
            'プロフェッショナルなコンテンツ',
            'メディア露出',
          ],
          recommendedNumber: 2,
        },
        {
          tier: 'メガインフルエンサー',
          followerRange: '1,000,000+',
          avgEngagementRate: '1-2%',
          costRange: '200万円以上/投稿',
          benefits: [
            '大規模なリーチ',
            '圧倒的なブランド認知',
            '権威性の確立',
            'メディアバズ',
          ],
          recommendedNumber: 1,
        },
      ],

      outreachPlan: {
        targetProfiles: [
          {
            niche: 'ビジネス・起業家',
            followerCount: '10,000 - 50,000',
            engagementRate: '4%以上',
            contentStyle: '教育的、インスピレーション',
            audienceAlignment: 'スタートアップ、フリーランス、経営者',
          },
          {
            niche: 'テクノロジー・AI',
            followerCount: '5,000 - 30,000',
            engagementRate: '5%以上',
            contentStyle: '技術解説、レビュー',
            audienceAlignment: 'テック愛好家、開発者、イノベーター',
          },
          {
            niche: 'マーケティング専門家',
            followerCount: '15,000 - 100,000',
            engagementRate: '3%以上',
            contentStyle: 'ハウツー、ケーススタディ',
            audienceAlignment: 'マーケター、ビジネスオーナー',
          },
        ],

        outreachMessage: `こんにちは、[インフルエンサー名]さん！

[あなたのアカウント]で[具体的なコンテンツ]を拝見し、とても感銘を受けました。

私たちは[製品/サービス名]を提供しており、[ターゲット層]の課題を解決しています。
[インフルエンサー名]さんのオーディエンスにも価値を提供できると考えています。

【ご提案】
- 無料で製品をお試しいただく
- [具体的な報酬/条件]
- クリエイティブな自由度 (あなたのスタイルで)

ご興味があれば、詳細をお送りします。
お返事をお待ちしております！

[あなたの名前]
[連絡先]`,

        incentives: [
          '製品の無料提供',
          '報酬 (金銭またはクレジット)',
          'アフィリエイトコード (収益シェア)',
          '独占コラボレーション',
          '長期パートナーシップの可能性',
          'ブランドアンバサダープログラム',
        ],

        timeline: '初回コンタクトから30日以内にキャンペーン開始',
      },

      collaborationTypes: [
        {
          type: 'スポンサード投稿',
          description: '製品やサービスを紹介する通常の投稿',
          bestFor: 'ブランド認知、製品紹介',
          deliverables: ['フィード投稿1-2件', 'ストーリーズ3-5件'],
          avgCost: '5万円 - 50万円',
        },
        {
          type: 'アンボックス・レビュー',
          description: '製品の開封から使用感までをレビュー',
          bestFor: '製品の詳細紹介、信頼性構築',
          deliverables: ['リール1件', 'フィード投稿1件', 'ストーリーズ'],
          avgCost: '10万円 - 80万円',
        },
        {
          type: 'ギブアウェイ',
          description: 'フォロワーへのプレゼント企画',
          bestFor: 'フォロワー獲得、エンゲージメント向上',
          deliverables: ['フィード投稿1件', 'ストーリーズでのプロモーション'],
          avgCost: '3万円 - 30万円 + 商品提供',
        },
        {
          type: 'アフィリエイト',
          description: '売上ごとに報酬を支払う',
          bestFor: 'コンバージョン重視、長期パートナーシップ',
          deliverables: ['継続的なプロモーション'],
          avgCost: '売上の10-20%',
        },
        {
          type: 'ブランドアンバサダー',
          description: '長期的なパートナーシップ',
          bestFor: 'ブランドロイヤルティ、継続的な露出',
          deliverables: ['月2-4投稿、イベント参加'],
          avgCost: '月10万円 - 100万円',
        },
      ],

      budget: {
        total: 1000000,
        byTier: {
          ナノインフルエンサー: 200000,
          マイクロインフルエンサー: 400000,
          マクロインフルエンサー: 300000,
          メガインフルエンサー: 0,
        },
        contingency: 100000,
      },

      expectedROI: {
        reach: 500000,
        engagement: 25000,
        newFollowers: 5000,
        conversions: 500,
        roi: '投資額の300% (100万円投資 → 300万円の売上)',
      },
    };

    return {
      success: true,
      data: { strategy },
    };
  }

  // アナリティクスレポート生成
  private async generateAnalyticsReport(
    input: SNSMarketerInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log(`Instagram アナリティクスレポートを生成中 (期間: ${input.period || '先月'})...`);

    const report: AnalyticsReport = {
      period: input.period || '2025年9月',

      overview: {
        followers: {
          current: 15000,
          growth: 2500,
          growthRate: '+20%',
        },
        engagement: {
          avgRate: 4.8,
          totalLikes: 18000,
          totalComments: 3200,
          totalShares: 850,
        },
        reach: {
          total: 125000,
          organic: 95000,
          paid: 30000,
        },
        impressions: 180000,
        profileVisits: 8500,
        websiteClicks: 2400,
      },

      contentPerformance: {
        topPosts: [
          {
            rank: 1,
            type: 'リール',
            theme: 'ハウツー',
            engagementRate: 8.5,
            reach: 25000,
            likes: 2100,
            comments: 180,
            shares: 95,
            saves: 420,
          },
          {
            rank: 2,
            type: 'カルーセル',
            theme: '教育的コンテンツ',
            engagementRate: 7.2,
            reach: 18000,
            likes: 1500,
            comments: 120,
            shares: 60,
            saves: 350,
          },
          {
            rank: 3,
            type: 'リール',
            theme: 'トレンド参加',
            engagementRate: 6.9,
            reach: 22000,
            likes: 1800,
            comments: 95,
            shares: 110,
            saves: 180,
          },
        ],
        bestPerformingType: 'リール (平均エンゲージメント率 6.5%)',
        bestPostingTimes: ['火曜 12:30', '木曜 19:00', '土曜 10:00'],
        avgEngagementByType: {
          リール: 6.5,
          カルーセル: 5.2,
          フィード投稿: 3.8,
          ストーリーズ: 4.1,
        },
      },

      audienceInsights: {
        demographics: {
          topLocations: ['東京 (35%)', '大阪 (15%)', '福岡 (8%)', 'アメリカ (12%)'],
          ageDistribution: {
            '18-24': 15,
            '25-34': 45,
            '35-44': 25,
            '45-54': 10,
            '55+': 5,
          },
          genderDistribution: {
            男性: 55,
            女性: 43,
            その他: 2,
          },
        },
        behavior: {
          mostActiveTime: '19:00-21:00',
          mostActiveDays: ['火曜', '木曜', '土曜'],
          averageSessionDuration: '3分20秒',
        },
        interests: [
          'ビジネス・起業',
          'テクノロジー',
          'マーケティング',
          '自己啓発',
          'AI・機械学習',
        ],
      },

      hashtagPerformance: [
        {
          hashtag: '#AIツール',
          uses: 15,
          avgEngagement: 850,
          reachIncrease: '+12%',
          effectiveness: 'high',
        },
        {
          hashtag: '#生産性向上',
          uses: 12,
          avgEngagement: 720,
          reachIncrease: '+9%',
          effectiveness: 'high',
        },
        {
          hashtag: '#ビジネス効率化',
          uses: 10,
          avgEngagement: 650,
          reachIncrease: '+7%',
          effectiveness: 'medium',
        },
      ],

      competitorComparison: [
        {
          name: '競合A',
          followers: 25000,
          avgEngagementRate: 3.2,
          postFrequency: '週5回',
          topContentType: 'リール',
          gap: '我々の方がエンゲージメント率が高い',
        },
        {
          name: '競合B',
          followers: 18000,
          avgEngagementRate: 4.1,
          postFrequency: '週7回',
          topContentType: 'カルーセル',
          gap: '投稿頻度を上げる余地あり',
        },
      ],

      recommendations: [
        '【継続】リールコンテンツが最も高いエンゲージメントを獲得しているため、週3回投稿を継続',
        '【強化】カルーセル投稿は保存率が高いため、教育的コンテンツを増やす',
        '【改善】フィード投稿のエンゲージメントが低いため、ビジュアルとキャプションを改善',
        '【新規】ストーリーズでのインタラクティブ要素 (アンケート、質問) を週5回に増やす',
        '【最適化】最もアクティブな時間帯 (火曜12:30、木曜19:00) に重要な投稿を配置',
        '【実験】トレンドオーディオを使用したリールを週2回テスト',
      ],

      actionPlan: [
        {
          priority: 'high',
          action: 'リール投稿を週2回から週3回に増やす',
          rationale: '最も高いエンゲージメント率とリーチを獲得',
          expectedImpact: 'リーチ +20%、エンゲージメント +15%',
          deadline: '2025年10月1日',
        },
        {
          priority: 'high',
          action: '教育的カルーセル投稿を週1回追加',
          rationale: '高い保存率 = アルゴリズムに好まれる',
          expectedImpact: 'フォロワー増加 +10%',
          deadline: '2025年10月1日',
        },
        {
          priority: 'medium',
          action: 'インフルエンサーコラボを月2件実施',
          rationale: '新規オーディエンスへのリーチ拡大',
          expectedImpact: 'リーチ +30%, フォロワー +500',
          deadline: '2025年10月15日',
        },
        {
          priority: 'medium',
          action: 'ハッシュタグ戦略を月次で見直し',
          rationale: 'パフォーマンスの低いハッシュタグを入れ替え',
          expectedImpact: 'リーチ +5%',
          deadline: '2025年10月10日',
        },
        {
          priority: 'low',
          action: 'コンテストまたはギブアウェイを実施',
          rationale: 'エンゲージメントとフォロワー獲得の急増',
          expectedImpact: 'フォロワー +1000、エンゲージメント +50%',
          deadline: '2025年10月30日',
        },
      ],
    };

    return {
      success: true,
      data: { report },
    };
  }
}
