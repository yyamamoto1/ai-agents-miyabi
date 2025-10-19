/**
 * AI SNS Content Creator (Instagram) Agent
 * Instagram専門のコンテンツクリエイターエージェント
 *
 * 役割:
 * - Instagram投稿コンテンツ作成
 * - ストーリーズ・リールコンテンツ制作
 * - キャプション・ハッシュタグ作成
 * - ビジュアルコンセプト設計
 * - カルーセルデザイン
 * - エンゲージメント促進コンテンツ
 * - アナリティクスベースのコンテンツ最適化
 * - SNS Marketerと連携した戦略実装
 */

import { BaseAgent, AgentTask, AgentResponse } from '../../core/BaseAgent.js';

// タスク入力インターフェース
export interface SNSContentCreatorInstagramTaskInput {
  taskType:
    | 'post-creation'
    | 'story-creation'
    | 'reel-creation'
    | 'caption-writing'
    | 'hashtag-strategy'
    | 'carousel-design'
    | 'analytics';
  brandProfile?: InstagramBrandProfile;
  contentTheme?: string;
  postType?: 'feed' | 'carousel' | 'stories' | 'reels' | 'igtv';
  targetAudience?: InstagramTargetAudience;
  visualStyle?: VisualStyle;
  contentGoal?: ContentGoal;
  marketingStrategy?: MarketingStrategyInput;
  performanceData?: PerformanceData;
}

// ブランドプロフィール
export interface InstagramBrandProfile {
  name: string;
  handle: string;
  industry: string;
  brandVoice: string;
  aestheticStyle: string;
  colorPalette: string[];
  values: string[];
  targetDemographic: string;
}

// ターゲットオーディエンス
export interface InstagramTargetAudience {
  ageRange: string;
  gender?: string;
  location: string[];
  interests: string[];
  painPoints: string[];
  aspirations: string[];
  activeTime: string[];
}

// ビジュアルスタイル
export interface VisualStyle {
  theme: string;
  colorScheme: string[];
  filterPreference: string;
  compositionStyle: string;
  moodboard?: string[];
}

// コンテンツゴール
export interface ContentGoal {
  objective: 'awareness' | 'engagement' | 'conversion' | 'education' | 'entertainment';
  kpi: string[];
  targetMetrics: {
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    reach?: number;
  };
}

// マーケティング戦略入力
export interface MarketingStrategyInput {
  contentPillars?: string[];
  campaignTheme?: string;
  postingSchedule?: string;
  hashtags?: string[];
}

// パフォーマンスデータ
export interface PerformanceData {
  topPerformingPosts: TopPost[];
  audienceInsights: AudienceInsights;
  engagementTrends: EngagementTrends;
}

export interface TopPost {
  type: string;
  engagementRate: number;
  theme: string;
  visualStyle: string;
}

export interface AudienceInsights {
  mostActiveTime: string;
  topLocations: string[];
  interests: string[];
}

export interface EngagementTrends {
  bestPerformingFormat: string;
  optimalCaptionLength: string;
  effectiveHashtags: string[];
}

// Instagram投稿コンテンツ
export interface InstagramPostContent {
  postType: string;
  visualConcept: VisualConcept;
  caption: InstagramCaption;
  hashtags: HashtagSet;
  callToAction: string;
  publishingDetails: PublishingDetails;
  engagementStrategy: EngagementStrategy;
  alternatives: PostAlternative[];
}

export interface VisualConcept {
  mainImage: ImageDescription;
  composition: string;
  colorPalette: string[];
  designElements: DesignElement[];
  textOverlay?: TextOverlay;
  specifications: ImageSpecifications;
}

export interface ImageDescription {
  subject: string;
  setting: string;
  mood: string;
  style: string;
  lighting: string;
  perspective: string;
}

export interface DesignElement {
  element: string;
  placement: string;
  purpose: string;
}

export interface TextOverlay {
  headline: string;
  font: string;
  size: string;
  color: string;
  placement: string;
}

export interface ImageSpecifications {
  dimensions: string;
  aspectRatio: string;
  resolution: string;
  fileFormat: string;
  maxFileSize: string;
}

export interface InstagramCaption {
  hook: string;
  body: string;
  closing: string;
  fullCaption: string;
  characterCount: number;
  emojiUsage: string[];
  lineBreaks: string;
  callToActionPlacement: string;
}

export interface HashtagSet {
  primary: string[];
  secondary: string[];
  branded: string[];
  trending: string[];
  total: number;
  placement: string;
  strategy: string;
}

export interface PublishingDetails {
  optimalTime: string;
  dayOfWeek: string;
  timezone: string;
  frequency: string;
}

export interface EngagementStrategy {
  questionPrompt?: string;
  conversationStarter?: string;
  communityEngagement: string[];
  responseGuidelines: string[];
}

export interface PostAlternative {
  version: string;
  changes: string[];
  targetAudience: string;
  expectedImpact: string;
}

// ストーリーズコンテンツ
export interface InstagramStoriesContent {
  storiesSequence: StorySlide[];
  totalSlides: number;
  duration: string;
  interactiveElements: InteractiveElement[];
  designGuidelines: StoriesDesignGuidelines;
  highlightStrategy: HighlightStrategy;
}

export interface StorySlide {
  slideNumber: number;
  type: string;
  content: StoryContent;
  duration: number;
  transition: string;
}

export interface StoryContent {
  visual: StoryVisual;
  text?: StoryText;
  stickers?: Sticker[];
  music?: MusicInfo;
}

export interface StoryVisual {
  type: 'photo' | 'video' | 'boomerang' | 'layout';
  description: string;
  style: string;
  filter?: string;
}

export interface StoryText {
  content: string;
  font: string;
  color: string;
  animation?: string;
  placement: string;
}

export interface Sticker {
  type: string;
  purpose: string;
  placement: string;
  customization?: string;
}

export interface MusicInfo {
  track: string;
  duration: string;
  mood: string;
}

export interface InteractiveElement {
  type: 'poll' | 'question' | 'quiz' | 'slider' | 'countdown';
  content: string;
  purpose: string;
  expectedEngagement: string;
}

export interface StoriesDesignGuidelines {
  dimensions: string;
  safeZones: string[];
  textPlacement: string;
  brandConsistency: string[];
}

export interface HighlightStrategy {
  category: string;
  coverDesign: string;
  curation: string;
}

// リールコンテンツ
export interface InstagramReelsContent {
  reelConcept: ReelConcept;
  script: ReelScript;
  visualPlan: ReelVisualPlan;
  audioStrategy: AudioStrategy;
  editingGuidelines: EditingGuidelines;
  optimizationTips: string[];
}

export interface ReelConcept {
  theme: string;
  hook: string;
  mainMessage: string;
  targetLength: string;
  contentType: string;
  trendAlignment?: string;
}

export interface ReelScript {
  scenes: ReelScene[];
  totalDuration: number;
  pacing: string;
  captions: CaptionTimestamp[];
}

export interface ReelScene {
  sceneNumber: number;
  duration: number;
  action: string;
  visual: string;
  audio: string;
  textOverlay?: string;
}

export interface CaptionTimestamp {
  timestamp: string;
  text: string;
  styling: string;
}

export interface ReelVisualPlan {
  shotList: Shot[];
  transitions: Transition[];
  effects: Effect[];
  colorGrading: string;
}

export interface Shot {
  shotNumber: number;
  type: string;
  framing: string;
  movement: string;
  subject: string;
}

export interface Transition {
  type: string;
  timing: string;
  purpose: string;
}

export interface Effect {
  name: string;
  purpose: string;
  intensity: string;
}

export interface AudioStrategy {
  musicTrack: MusicTrack;
  soundEffects?: SoundEffect[];
  voiceover?: Voiceover;
}

export interface MusicTrack {
  title: string;
  mood: string;
  tempo: string;
  trendStatus: string;
  licensing: string;
}

export interface SoundEffect {
  effect: string;
  timing: string;
  purpose: string;
}

export interface Voiceover {
  script: string;
  tone: string;
  pacing: string;
}

export interface EditingGuidelines {
  aspectRatio: string;
  resolution: string;
  frameRate: string;
  exportSettings: string;
  coverImage: string;
  firstFrameStrategy: string;
}

// カルーセルコンテンツ
export interface CarouselContent {
  carouselTheme: string;
  slides: CarouselSlide[];
  totalSlides: number;
  designSystem: DesignSystem;
  narrativeFlow: string;
  swipeStrategy: SwipeStrategy;
}

export interface CarouselSlide {
  slideNumber: number;
  type: string;
  content: SlideContent;
  design: SlideDesign;
  purpose: string;
}

export interface SlideContent {
  headline: string;
  body: string;
  visual: string;
  dataVisualization?: DataVisualization;
}

export interface DataVisualization {
  type: 'chart' | 'infographic' | 'timeline' | 'comparison';
  data: string;
  style: string;
}

export interface SlideDesign {
  layout: string;
  colorScheme: string[];
  typography: Typography;
  imagery: string;
}

export interface Typography {
  headlineFont: string;
  bodyFont: string;
  hierarchy: string;
}

export interface DesignSystem {
  template: string;
  brandElements: string[];
  consistency: string[];
  accessibility: string[];
}

export interface SwipeStrategy {
  hooks: string[];
  curiosityGaps: string[];
  progression: string;
  finalCta: string;
}

// アナリティクスレポート
export interface InstagramAnalyticsReport {
  period: string;
  contentPerformance: ContentPerformanceAnalysis;
  audienceAnalysis: AudienceAnalysis;
  engagementInsights: EngagementInsights;
  competitiveAnalysis: CompetitiveAnalysis;
  recommendations: ContentRecommendation[];
  actionPlan: ActionPlan;
}

export interface ContentPerformanceAnalysis {
  topPerformingContent: PerformanceMetric[];
  contentTypeBenchmarks: ContentTypeBenchmark[];
  visualStyleAnalysis: VisualStylePerformance[];
  captionAnalysis: CaptionPerformance;
}

export interface PerformanceMetric {
  contentId: string;
  type: string;
  theme: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    reach: number;
    engagementRate: number;
  };
  successFactors: string[];
}

export interface ContentTypeBenchmark {
  type: string;
  avgEngagementRate: number;
  optimalFrequency: string;
  bestPerformingTime: string;
}

export interface VisualStylePerformance {
  style: string;
  engagementRate: number;
  audienceResonance: string;
  recommendation: string;
}

export interface CaptionPerformance {
  optimalLength: string;
  effectiveHooks: string[];
  emojiImpact: string;
  questionEffectiveness: string;
}

export interface AudienceAnalysis {
  demographics: DemographicBreakdown;
  behaviorPatterns: BehaviorPattern[];
  contentPreferences: ContentPreference[];
  growthTrends: GrowthTrend[];
}

export interface DemographicBreakdown {
  ageDistribution: Record<string, number>;
  genderDistribution: Record<string, number>;
  topLocations: LocationData[];
}

export interface LocationData {
  location: string;
  percentage: number;
  engagementLevel: string;
}

export interface BehaviorPattern {
  pattern: string;
  frequency: string;
  impact: string;
}

export interface ContentPreference {
  contentType: string;
  preference: number;
  reasoning: string;
}

export interface GrowthTrend {
  metric: string;
  trend: string;
  change: number;
  analysis: string;
}

export interface EngagementInsights {
  peakEngagementTimes: TimeSlot[];
  engagementTriggers: Trigger[];
  communityInteraction: CommunityMetric[];
}

export interface TimeSlot {
  day: string;
  time: string;
  engagementLevel: string;
}

export interface Trigger {
  trigger: string;
  impact: string;
  examples: string[];
}

export interface CommunityMetric {
  metric: string;
  value: number;
  trend: string;
}

export interface CompetitiveAnalysis {
  competitors: CompetitorProfile[];
  benchmarking: Benchmark[];
  opportunities: OpportunityArea[];
}

export interface CompetitorProfile {
  name: string;
  handle: string;
  followers: number;
  avgEngagement: number;
  contentStrategy: string;
  differentiators: string[];
}

export interface Benchmark {
  metric: string;
  yourValue: number;
  industryAverage: number;
  gap: number;
}

export interface OpportunityArea {
  area: string;
  potential: string;
  actionItems: string[];
}

export interface ContentRecommendation {
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
  rationale: string;
  expectedImpact: string;
  implementation: string;
}

export interface ActionPlan {
  immediate: ActionItem[];
  shortTerm: ActionItem[];
  longTerm: ActionItem[];
}

export interface ActionItem {
  action: string;
  timeline: string;
  resources: string[];
  expectedOutcome: string;
}

export class AISNSContentCreatorInstagramAgent extends BaseAgent {
  constructor() {
    super({
      name: 'AI SNS Content Creator (Instagram)',
      role: 'Instagram専門のコンテンツクリエイター',
      category: 'creative',
      description:
        'Instagram投稿、ストーリーズ、リール、カルーセルの企画・制作、SNS Marketerと連携した戦略的コンテンツ実装',
      capabilities: [
        'Instagram投稿作成',
        'ストーリーズ制作',
        'リールコンテンツ企画',
        'キャプションライティング',
        'ハッシュタグ戦略',
        'カルーセルデザイン',
        'アナリティクス分析',
        'ビジュアルコンセプト設計',
      ],
    });
  }

  protected async setup(): Promise<void> {
    this.log('Instagram Content Creator Agent初期化中...');
    // デザインツール、APIクライアントの初期化
    this.log('Instagram Content Creator Agent初期化完了');
  }

  protected async process(task: AgentTask): Promise<AgentResponse> {
    const input = task.input as SNSContentCreatorInstagramTaskInput;

    switch (input.taskType) {
      case 'post-creation':
        return await this.createPost(input);
      case 'story-creation':
        return await this.createStory(input);
      case 'reel-creation':
        return await this.createReel(input);
      case 'caption-writing':
        return await this.writeCaption(input);
      case 'hashtag-strategy':
        return await this.createHashtagStrategy(input);
      case 'carousel-design':
        return await this.designCarousel(input);
      case 'analytics':
        return await this.analyzeContent(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  protected async cleanup(): Promise<void> {
    this.log('Instagram Content Creator Agentクリーンアップ中...');
    // リソースの解放
    this.log('Instagram Content Creator Agentクリーンアップ完了');
  }

  // Instagram投稿作成
  private async createPost(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log(`Instagram ${input.postType || 'フィード'} 投稿を作成中...`);

    const brand = input.brandProfile || this.getDefaultBrandProfile();
    const theme = input.contentTheme || 'ビジネス成長のヒント';
    const goal = input.contentGoal || { objective: 'engagement' as const, kpi: ['likes', 'comments', 'saves'] };

    const post: InstagramPostContent = {
      postType: input.postType || 'feed',

      visualConcept: {
        mainImage: {
          subject: `${theme}を象徴するビジュアル`,
          setting: 'クリーンでモダンな環境',
          mood: 'インスピレーショナル、プロフェッショナル',
          style: brand.aestheticStyle || 'ミニマルモダン',
          lighting: 'ナチュラルライト、明るく開放的',
          perspective: 'アイレベル、バランスの取れた構図',
        },
        composition: `
          【構図設計】
          - レイアウト: 三分割法を活用した安定構図
          - 焦点: 画面中央やや上に主要要素配置
          - 余白: 十分な余白で視認性確保
          - バランス: シンメトリーまたは黄金比
          - 視線誘導: 左上から右下へのZパターン
        `,
        colorPalette: brand.colorPalette || [
          '#FF6B6B', // アクセントレッド
          '#4ECDC4', // ターコイズ
          '#FFE66D', // イエロー
          '#F7FFF7', // ホワイト
          '#1A1A2E', // ダークブルー
        ],
        designElements: [
          {
            element: 'ブランドロゴ',
            placement: '右下コーナー（控えめなサイズ）',
            purpose: 'ブランド認識の強化',
          },
          {
            element: 'アイコン/グラフィック',
            placement: '主要メッセージの補完位置',
            purpose: '視覚的理解の促進',
          },
          {
            element: '装飾要素',
            placement: '余白部分',
            purpose: 'デザインの洗練度向上',
          },
        ],
        textOverlay: {
          headline: `${theme}の5つの秘訣`,
          font: 'Montserrat Bold',
          size: '60-72pt',
          color: brand.colorPalette?.[4] || '#1A1A2E',
          placement: '上部1/3、中央揃え',
        },
        specifications: {
          dimensions: '1080 x 1080 px',
          aspectRatio: '1:1 (正方形)',
          resolution: '72 DPI (Web最適化)',
          fileFormat: 'JPG (高品質) または PNG (透明度必要時)',
          maxFileSize: '30 MB以下',
        },
      },

      caption: {
        hook: `✨ ${theme}を実現するために、絶対に知っておくべきことがあります`,
        body: `
こんにちは！${brand.name}です💡

今日は${theme}について、私たちが実際に試して効果があった
5つの秘訣をシェアします🚀

1️⃣ 目標を明確にする
→ ゴールが見えれば、道筋も見える

2️⃣ 小さく始めて継続する
→ 完璧を目指さず、まず行動

3️⃣ データを活用する
→ 数字が語る真実に耳を傾ける

4️⃣ 学びを共有する
→ 知識は分かち合うことで増える

5️⃣ 失敗を恐れない
→ 失敗は成功への最短ルート

━━━━━━━━━━━━━━

この中で、あなたが最も大切だと思うのは？
コメントで教えてください💬

保存して、いつでも見返してくださいね📌
        `,
        closing: `
👉 プロフィールのリンクから、さらに詳しいガイドを無料でダウンロード

#${theme.replace(/\s/g, '')} #ビジネス成長 #起業家
        `,
        fullCaption: '', // 後で結合
        characterCount: 0, // 後で計算
        emojiUsage: ['✨', '💡', '🚀', '📌', '💬', '👉'],
        lineBreaks: '2-3行ごとに改行で読みやすさ確保',
        callToActionPlacement: 'キャプション末尾',
      },

      hashtags: {
        primary: [
          '#ビジネス成長',
          '#起業家',
          '#スタートアップ',
          '#ビジネスヒント',
          '#成功法則',
        ],
        secondary: [
          '#自己啓発',
          '#ビジネススキル',
          '#生産性向上',
          '#マインドセット',
          '#目標達成',
        ],
        branded: [`#${brand.name.replace(/\s/g, '')}`, '#MiyabiTips'],
        trending: ['#起業家と繋がりたい', '#ビジネス好きな人と繋がりたい'],
        total: 15,
        placement: '最初のコメント（キャプションをクリーンに保つ）',
        strategy: `
          - ビッグ (1M+投稿): 2個
          - ミディアム (100K-1M投稿): 6個
          - ニッチ (10K-100K投稿): 5個
          - ブランド: 2個
        `,
      },

      callToAction: '保存して後で見返す＋コメントで意見をシェア＋プロフィールリンクをチェック',

      publishingDetails: {
        optimalTime: input.targetAudience?.activeTime?.[0] || '水曜 19:00',
        dayOfWeek: '火曜・水曜・木曜（エンゲージメント最高）',
        timezone: 'JST (日本標準時)',
        frequency: '週3-4回投稿推奨',
      },

      engagementStrategy: {
        questionPrompt: 'あなたが最も大切だと思うのは？1-5で教えてください！',
        conversationStarter: 'みんなの経験も聞きたい！コメント欄でシェアしてね',
        communityEngagement: [
          '投稿後30分以内に全コメントに返信',
          '質問には具体的かつパーソナルな回答',
          'コメントにいいねして感謝を示す',
          '優れたコメントをストーリーズでシェア',
        ],
        responseGuidelines: [
          'フレンドリーだけどプロフェッショナルなトーン',
          '質問には質問で返し、会話を継続',
          '絵文字を適度に使って親しみやすさを',
          '関連コンテンツへ誘導',
        ],
      },

      alternatives: [
        {
          version: 'カジュアルバージョン',
          changes: [
            'トーンをよりフレンドリーに',
            '砕けた言葉遣い',
            '絵文字を増量',
          ],
          targetAudience: '若年層（18-25歳）',
          expectedImpact: 'コメント数 +30%, カジュアル層のエンゲージメント向上',
        },
        {
          version: 'プロフェッショナルバージョン',
          changes: [
            'ビジネスライクなトーン',
            '統計データや事例を追加',
            '絵文字を控えめに',
          ],
          targetAudience: 'ビジネスプロフェッショナル（30-50歳）',
          expectedImpact: '保存数 +40%, 権威性向上',
        },
        {
          version: 'ストーリーテリングバージョン',
          changes: [
            '個人的なストーリーで開始',
            '感情的なつながりを重視',
            '体験談ベース',
          ],
          targetAudience: '共感を求めるオーディエンス',
          expectedImpact: 'コメント数 +50%, シェア数 +25%',
        },
      ],
    };

    // キャプション結合
    post.caption.fullCaption =
      post.caption.hook + '\n\n' +
      post.caption.body.trim() + '\n\n' +
      post.caption.closing.trim();
    post.caption.characterCount = post.caption.fullCaption.length;

    return {
      success: true,
      data: { post },
      metadata: {
        estimatedEngagement: {
          likes: Math.round(input.targetAudience?.interests.length || 150),
          comments: Math.round((input.targetAudience?.interests.length || 150) * 0.15),
          saves: Math.round((input.targetAudience?.interests.length || 150) * 0.25),
          shares: Math.round((input.targetAudience?.interests.length || 150) * 0.08),
        },
      },
    };
  }

  // ストーリーズ作成
  private async createStory(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram ストーリーズコンテンツを作成中...');

    const brand = input.brandProfile || this.getDefaultBrandProfile();
    const theme = input.contentTheme || 'デイリーヒント';

    const stories: InstagramStoriesContent = {
      storiesSequence: [
        {
          slideNumber: 1,
          type: 'オープニング/フック',
          content: {
            visual: {
              type: 'photo',
              description: '鮮やかなグラデーション背景',
              style: brand.aestheticStyle || 'モダンミニマル',
              filter: 'ブライトネス +20, コントラスト +10',
            },
            text: {
              content: '知ってた？🤔\n\n今日のヒントで\nビジネスが変わるかも',
              font: 'Classic (太字)',
              color: '#FFFFFF',
              animation: 'タイプライター',
              placement: '中央',
            },
            stickers: [
              {
                type: '質問スタンプ',
                purpose: '好奇心を刺激',
                placement: '下部',
                customization: '「何が知りたい？」',
              },
            ],
          },
          duration: 5,
          transition: 'スワイプアップ',
        },
        {
          slideNumber: 2,
          type: 'メインコンテンツ',
          content: {
            visual: {
              type: 'photo',
              description: `${theme}のビジュアル表現`,
              style: 'インフォグラフィック風',
            },
            text: {
              content: `${theme} #1\n\n目標を明確にする`,
              font: 'Modern',
              color: brand.colorPalette?.[0] || '#FF6B6B',
              placement: '上部',
            },
            stickers: [
              {
                type: 'スライダースタンプ',
                purpose: 'エンゲージメント獲得',
                placement: '下部',
                customization: '「これ、やってる？」',
              },
            ],
          },
          duration: 7,
          transition: 'フェード',
        },
        {
          slideNumber: 3,
          type: '詳細説明',
          content: {
            visual: {
              type: 'photo',
              description: '関連画像またはアイコン',
              style: 'シンプル、フォーカス',
            },
            text: {
              content: '具体的なゴールを\n設定することで、\n行動が明確になる💡',
              font: 'Modern',
              color: '#1A1A2E',
              placement: '中央',
            },
          },
          duration: 6,
          transition: 'スライド',
        },
        {
          slideNumber: 4,
          type: 'アクション促進',
          content: {
            visual: {
              type: 'photo',
              description: 'CTA背景',
              style: 'ビビッド、目を引く',
            },
            text: {
              content: 'もっと詳しく知りたい？\n\n👆 リンクをタップ',
              font: 'Classic',
              color: '#FFFFFF',
              placement: '中央',
            },
            stickers: [
              {
                type: 'リンクステッカー',
                purpose: 'トラフィック誘導',
                placement: '中央上部',
              },
              {
                type: 'アンケートスタンプ',
                purpose: 'フィードバック収集',
                placement: '下部',
                customization: '「役に立った？」Yes/No',
              },
            ],
          },
          duration: 7,
          transition: 'ズーム',
        },
        {
          slideNumber: 5,
          type: 'クロージング',
          content: {
            visual: {
              type: 'photo',
              description: 'ブランドカラー背景',
              style: 'シンプル、ブランディング',
            },
            text: {
              content: `明日も新しいヒントを\nシェアするよ！\n\n見逃さないようにね✨`,
              font: 'Modern',
              color: '#1A1A2E',
              placement: '中央',
            },
            stickers: [
              {
                type: 'メンションステッカー',
                purpose: '友達にシェア促進',
                placement: '下部',
                customization: `@${brand.handle}をフォロー`,
              },
            ],
          },
          duration: 5,
          transition: 'フェードアウト',
        },
      ],

      totalSlides: 5,
      duration: '30秒',

      interactiveElements: [
        {
          type: 'question',
          content: '何が知りたい？',
          purpose: 'オーディエンスの興味を把握',
          expectedEngagement: '10-15%が回答',
        },
        {
          type: 'slider',
          content: 'これ、やってる？',
          purpose: '参加を促し、関連性確認',
          expectedEngagement: '15-20%がスライド',
        },
        {
          type: 'poll',
          content: '役に立った？ Yes/No',
          purpose: 'コンテンツ評価とエンゲージメント',
          expectedEngagement: '20-25%が投票',
        },
      ],

      designGuidelines: {
        dimensions: '1080 x 1920 px (9:16)',
        safeZones: [
          '上部250px: プロフィール画像・タイムスタンプ',
          '下部250px: CTAボタン・返信バー',
        ],
        textPlacement: '中央1420px内に全テキスト配置',
        brandConsistency: [
          'ブランドカラーを各スライドに使用',
          '統一されたフォント',
          'ロゴまたはハンドルを各スライドに',
        ],
      },

      highlightStrategy: {
        category: 'デイリーヒント',
        coverDesign: 'ブランドカラー背景 + アイコン + カテゴリ名',
        curation: '同じテーマのストーリーズをまとめて保存',
      },
    };

    return {
      success: true,
      data: { stories },
      metadata: {
        bestPractices: [
          '最初の3秒で注意を引く',
          'インタラクティブ要素を各2-3スライドに1つ',
          'テキストは短く、読みやすく',
          'ブランド一貫性を保つ',
          '毎日投稿して習慣化',
        ],
      },
    };
  }

  // リール作成
  private async createReel(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram リールコンテンツを作成中...');

    const theme = input.contentTheme || 'ビジネス効率化';

    const reel: InstagramReelsContent = {
      reelConcept: {
        theme: `${theme}の3ステップ`,
        hook: '99%の人が知らない秘密',
        mainMessage: `${theme}は思ったより簡単`,
        targetLength: '15-30秒',
        contentType: 'ハウツー/チュートリアル',
        trendAlignment: 'トレンドBGM + テンポの良い編集',
      },

      script: {
        scenes: [
          {
            sceneNumber: 1,
            duration: 3,
            action: 'フック - 画面に大きなテキスト登場',
            visual: '衝撃的なビジュアルまたは質問',
            audio: 'トレンド音楽のドロップ部分',
            textOverlay: '99%の人が知らない\n成功の秘密',
          },
          {
            sceneNumber: 2,
            duration: 5,
            action: 'ステップ1の説明',
            visual: 'ステップ1のビジュアル表現',
            audio: '音楽継続 + ナレーション（オプション）',
            textOverlay: 'ステップ1: 目標を書く\n具体的に、紙に書き出す',
          },
          {
            sceneNumber: 3,
            duration: 5,
            action: 'ステップ2の説明',
            visual: 'ステップ2のビジュアル表現',
            audio: '音楽のビート変化に合わせる',
            textOverlay: 'ステップ2: 優先順位をつける\nまず重要なことから',
          },
          {
            sceneNumber: 4,
            duration: 5,
            action: 'ステップ3の説明',
            visual: 'ステップ3のビジュアル表現',
            audio: '音楽のクライマックス',
            textOverlay: 'ステップ3: 毎日実行\n小さな行動の積み重ね',
          },
          {
            sceneNumber: 5,
            duration: 3,
            action: 'まとめ + CTA',
            visual: '結果のビジュアルまたはロゴ',
            audio: '音楽のアウトロ',
            textOverlay: '保存して実践してね！\nフォローで毎日ヒント✨',
          },
        ],
        totalDuration: 21,
        pacing: 'テンポ良く、各シーン3-5秒でリズミカル',
        captions: [
          {
            timestamp: '0:00-0:03',
            text: '99%の人が知らない成功の秘密',
            styling: '太字、白、画面中央',
          },
          {
            timestamp: '0:03-0:08',
            text: 'ステップ1: 目標を書く',
            styling: '太字、ブランドカラー',
          },
          {
            timestamp: '0:08-0:13',
            text: 'ステップ2: 優先順位をつける',
            styling: '太字、ブランドカラー',
          },
          {
            timestamp: '0:13-0:18',
            text: 'ステップ3: 毎日実行',
            styling: '太字、ブランドカラー',
          },
          {
            timestamp: '0:18-0:21',
            text: '保存して実践！フォローで毎日ヒント',
            styling: '太字、白',
          },
        ],
      },

      visualPlan: {
        shotList: [
          {
            shotNumber: 1,
            type: 'クローズアップ',
            framing: '中央フレーム',
            movement: 'ズームイン',
            subject: 'テキストオーバーレイ',
          },
          {
            shotNumber: 2,
            type: 'ミディアムショット',
            framing: '三分割法',
            movement: 'カット',
            subject: 'ステップ1のビジュアル',
          },
          {
            shotNumber: 3,
            type: 'ミディアムショット',
            framing: '三分割法',
            movement: 'スライド',
            subject: 'ステップ2のビジュアル',
          },
          {
            shotNumber: 4,
            type: 'ワイドショット',
            framing: '全体',
            movement: 'ズームアウト',
            subject: 'ステップ3のビジュアル',
          },
          {
            shotNumber: 5,
            type: 'クローズアップ',
            framing: '中央',
            movement: 'フェードアウト',
            subject: 'CTA + ロゴ',
          },
        ],
        transitions: [
          {
            type: 'ハードカット',
            timing: '音楽のビートに合わせる',
            purpose: 'リズミカルな流れ',
          },
          {
            type: 'スライド',
            timing: 'シーン切り替え',
            purpose: 'スムーズな遷移',
          },
        ],
        effects: [
          {
            name: 'テキストアニメーション',
            purpose: '注目を集める',
            intensity: '中程度',
          },
          {
            name: 'カラーグレーディング',
            purpose: 'ブランド一貫性',
            intensity: 'ブランドカラーに統一',
          },
        ],
        colorGrading: 'ビビッド、コントラスト高め、ブランドカラー強調',
      },

      audioStrategy: {
        musicTrack: {
          title: 'トレンド中の人気BGM（Instagramライブラリから選択）',
          mood: 'エネルギッシュ、ポジティブ',
          tempo: 'ミディアム〜ファスト（120-140 BPM）',
          trendStatus: 'トレンドタブで確認、使用回数多いもの',
          licensing: 'Instagram公式ライブラリ（商用利用可）',
        },
        soundEffects: [
          {
            effect: 'ウーッシュ音',
            timing: 'トランジション時',
            purpose: '遷移を強調',
          },
          {
            effect: 'ポップ音',
            timing: 'テキスト登場時',
            purpose: '注意を引く',
          },
        ],
        voiceover: {
          script: 'オプション: 各ステップの詳細説明',
          tone: 'フレンドリー、エネルギッシュ',
          pacing: '速め、テンポ良く',
        },
      },

      editingGuidelines: {
        aspectRatio: '9:16 (縦型フルスクリーン)',
        resolution: '1080 x 1920 px',
        frameRate: '30fps または 60fps',
        exportSettings: 'H.264、高品質、30MB以下',
        coverImage: '最も目を引くフレーム（通常ステップ1または結果）',
        firstFrameStrategy: '最初の1秒で注目を集める強力なフック',
      },

      optimizationTips: [
        '【フック】最初の1-3秒が最重要。スクロールを止めさせる',
        '【キャプション】音声なしでも理解できるよう字幕必須',
        '【音楽】トレンド音楽使用でリーチ拡大',
        '【長さ】15-30秒が最適（視聴完了率重視）',
        '【CTA】保存・フォロー・シェアを明確に促す',
        '【ハッシュタグ】5-10個、関連性高いもの',
        '【投稿時間】火曜〜木曜の12:00-13:00、19:00-21:00',
        '【カバー画像】魅力的なサムネイル設定',
      ],
    };

    return {
      success: true,
      data: { reel },
      metadata: {
        expectedPerformance: {
          views: '5,000-15,000',
          likes: '300-800',
          comments: '20-50',
          shares: '50-150',
          saves: '100-300',
        },
      },
    };
  }

  // キャプションライティング
  private async writeCaption(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram キャプションを作成中...');

    const theme = input.contentTheme || 'ビジネス成功のヒント';
    const brand = input.brandProfile || this.getDefaultBrandProfile();

    const caption = {
      formula: 'AIDA (Attention, Interest, Desire, Action)',

      structure: {
        hook: {
          purpose: '注意を引く（最初の1-2行が超重要）',
          techniques: [
            '質問で始める',
            '驚きの事実を提示',
            '共感できる問題提起',
            '大胆な宣言',
          ],
          examples: [
            `🚨 ${theme}で失敗する人の共通点、知ってますか？`,
            `✨ たった1つの変化で、ビジネスが劇的に変わります`,
            `💡 これを知らないと、いつまでも同じ結果です`,
          ],
        },

        body: {
          purpose: '興味を維持し、価値を提供',
          structure: [
            '【導入】問題提起または共感',
            '【展開】解決策やヒントの提示',
            '【詳細】具体的なステップや事例',
            '【ベネフィット】実践した結果',
          ],
          writingTips: [
            '2-3行ごとに改行（読みやすさ）',
            '絵文字で視覚的アクセント',
            'リスト形式で情報整理',
            'ストーリーテリングで感情に訴える',
            '具体的な数字で説得力',
          ],
        },

        cta: {
          purpose: 'アクションを促す',
          types: [
            {
              type: 'エンゲージメント',
              examples: [
                'コメントであなたの意見を教えて！',
                'タグ付けしてシェアしよう',
                '1-5のどれが一番大事？',
              ],
            },
            {
              type: '保存',
              examples: [
                '保存していつでも見返してね📌',
                'ブックマーク推奨！',
                '後で読みたい人は保存を',
              ],
            },
            {
              type: 'トラフィック',
              examples: [
                'プロフィールのリンクから詳細をチェック',
                'ストーリーズのリンクをタップ',
                'DMで詳しく教えます',
              ],
            },
          ],
        },
      },

      bestPractices: {
        length: {
          ideal: '150-300文字（エンゲージメント最大）',
          long: '1,000-2,200文字（教育コンテンツ、ストーリー）',
          short: '50-150文字（ビジュアル重視時）',
        },
        tone: {
          options: [
            'フレンドリー・親しみやすい',
            'プロフェッショナル・権威的',
            'インスピレーショナル・励ます',
            'ユーモラス・楽しい',
            '教育的・啓蒙的',
          ],
          recommendation: `ブランドボイス「${brand.brandVoice}」に合わせる`,
        },
        hashtags: {
          placement: '最初のコメント（キャプションをクリーンに）',
          number: '10-15個が最適',
          strategy: 'ビッグ + ミディアム + ニッチのミックス',
        },
      },

      examples: {
        educational: `
📚 ${theme}の完全ガイド

こんにちは！今日は${theme}について
徹底解説します💡

なぜこれが重要か？
↓
[理由を3つ列挙]

どうやって実践する？
↓
[ステップバイステップ]

実践した結果は？
↓
[具体的な成果]

━━━━━━━━━━━━━━

💬 質問ある？コメントで教えて！
📌 保存して何度も見返してね

#${theme.replace(/\s/g, '')} #ビジネスヒント
        `,

        storytelling: `
✨ 1年前の私は、毎日深夜まで働いていました

疲弊して、成果も出ない...
「このままじゃダメだ」と思った時、
${theme}に出会いました

最初は半信半疑でした。
でも、実践してみると...

[ストーリー展開]

今では、
✅ 労働時間 -50%
✅ 売上 +200%
✅ ストレス -80%

━━━━━━━━━━━━━━

あなたも変われます。
プロフィールのリンクから
無料ガイドをダウンロード👆

#成功事例 #ビジネス変革
        `,

        promotional: `
🎉 ついにリリース！

${brand.name}の新サービス
「${theme}」が今日から利用可能🚀

このサービスは、
✨ [ベネフィット1]
✨ [ベネフィット2]
✨ [ベネフィット3]

を実現します

━━━━━━━━━━━━━━

🎁 今だけ特典:
初月50%オフ + 無料サポート

残り24時間⏰

プロフィールのリンクから
今すぐチェック👆

#新サービス #限定オファー
        `,
      },

      sampleCaption: `
💡 ${theme}で成功する人の5つの習慣

こんにちは！${brand.name}です✨

成功している起業家を観察して
気づいたことがあります

それは、みんな同じ5つの習慣を
持っているということ👇

1️⃣ 朝のルーティン
→ 1日の最初に最重要タスク

2️⃣ 学習時間の確保
→ 毎日30分、必ず学ぶ

3️⃣ フィードバック収集
→ 顧客の声を聞く習慣

4️⃣ 失敗の分析
→ うまくいかなかったことから学ぶ

5️⃣ 感謝の実践
→ 毎日3つ、感謝することを書く

━━━━━━━━━━━━━━

この中で、あなたが
すでにやっているのは？

1-5で教えてください💬

保存して、毎日のチェックリストに📌

👉 プロフィールのリンクから
「成功習慣ワークシート」無料DL

#${theme.replace(/\s/g, '')} #起業家 #成功習慣
      `,
    };

    return {
      success: true,
      data: { caption },
    };
  }

  // ハッシュタグ戦略
  private async createHashtagStrategy(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram ハッシュタグ戦略を作成中...');

    const strategy = input.marketingStrategy || {};

    const hashtagStrategy = {
      framework: '戦略的ハッシュタグミックス',

      categories: {
        big: {
          name: 'ビッグハッシュタグ（1M+投稿）',
          purpose: '広範なリーチ、ブランド認知',
          quantity: '1-2個/投稿',
          examples: [
            { tag: '#ビジネス', posts: '8M', engagement: '中' },
            { tag: '#起業家', posts: '5M', engagement: '中' },
            { tag: '#マーケティング', posts: '6M', engagement: '中' },
          ],
          note: '競争激しいが、新規発見の可能性',
        },

        medium: {
          name: 'ミディアムハッシュタグ（100K-1M投稿）',
          purpose: 'ターゲット層リーチ、エンゲージメント獲得',
          quantity: '5-7個/投稿',
          examples: [
            { tag: '#スタートアップ', posts: '450K', engagement: '高' },
            { tag: '#ビジネスヒント', posts: '320K', engagement: '高' },
            { tag: '#起業', posts: '280K', engagement: '高' },
            { tag: '#ビジネススキル', posts: '190K', engagement: '中-高' },
            { tag: '#自己啓発', posts: '550K', engagement: '中-高' },
          ],
          note: '最もエンゲージメント獲得しやすい',
        },

        niche: {
          name: 'ニッチハッシュタグ（10K-100K投稿）',
          purpose: 'ターゲット層との深いつながり',
          quantity: '5-8個/投稿',
          examples: [
            { tag: '#起業家マインド', posts: '45K', engagement: '非常に高' },
            { tag: '#ビジネス成長', posts: '38K', engagement: '非常に高' },
            { tag: '#スタートアップライフ', posts: '52K', engagement: '高' },
            { tag: '#起業家と繋がりたい', posts: '89K', engagement: '高' },
          ],
          note: 'コミュニティ形成に最適',
        },

        branded: {
          name: 'ブランドハッシュタグ',
          purpose: 'ブランド認知、UGC収集',
          quantity: '1-2個/投稿',
          examples: [
            { tag: '#MiyabiTips', posts: '0', type: 'キャンペーン' },
            { tag: '#MiyabiSuccess', posts: '0', type: 'UGC収集' },
          ],
          note: '独自ハッシュタグでコミュニティ構築',
        },
      },

      optimalMix: {
        total: '15-20個',
        distribution: {
          big: 2,
          medium: 6,
          niche: 7,
          branded: 2,
          trending: 1,
        },
        placement: '最初のコメント（キャプションをクリーンに保つ）',
        rotation: '毎回少し変えてスパム判定回避',
      },

      researchMethods: [
        {
          method: 'Instagram検索',
          steps: [
            '関連キーワードを検索',
            '投稿数とエンゲージメント確認',
            'トップ投稿の質をチェック',
          ],
        },
        {
          method: '競合分析',
          steps: [
            '競合のハッシュタグを調査',
            '効果的なものをリスト化',
            '独自性を保ちつつ参考に',
          ],
        },
        {
          method: 'Instagramインサイト',
          steps: [
            'ハッシュタグ経由のリーチ確認',
            'パフォーマンス高いものを特定',
            '定期的に見直し・更新',
          ],
        },
      ],

      bestPractices: [
        '投稿内容と関連性の高いハッシュタグのみ',
        '禁止・スパムハッシュタグを避ける',
        '投稿ごとにハッシュタグを変える（70-80%入れ替え）',
        '各ハッシュタグの最新投稿をチェック',
        'ローカルハッシュタグも活用（地域ビジネス）',
        'トレンドハッシュタグを適宜取り入れる',
        '月次でパフォーマンスレビュー',
      ],

      avoidList: [
        '#likeforlike',
        '#followforfollow',
        '#instafollow',
        '#like4like',
        '過度に一般的（#love, #instagood など）',
        'スパム判定されているハッシュタグ',
      ],

      trackingMethod: {
        tool: 'Instagramインサイト',
        metrics: [
          'ハッシュタグからのリーチ数',
          'ハッシュタグ経由のプロフィール訪問',
          'エンゲージメント率',
        ],
        frequency: '週次確認、月次最適化',
      },

      exampleSet: {
        post: 'ビジネス成長のヒント',
        hashtags: [
          // ビッグ (2)
          '#ビジネス',
          '#起業家',
          // ミディアム (6)
          '#スタートアップ',
          '#ビジネスヒント',
          '#起業',
          '#ビジネススキル',
          '#自己啓発',
          '#マインドセット',
          // ニッチ (7)
          '#起業家マインド',
          '#ビジネス成長',
          '#スタートアップライフ',
          '#起業家と繋がりたい',
          '#ビジネス好きな人と繋がりたい',
          '#成功法則',
          '#ビジネスモチベーション',
          // ブランド (2)
          '#MiyabiTips',
          '#Miyabi成功事例',
          // トレンド (1)
          '#起業家の日常',
        ],
        total: 18,
      },
    };

    return {
      success: true,
      data: { hashtagStrategy },
    };
  }

  // カルーセルデザイン
  private async designCarousel(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram カルーセル投稿をデザイン中...');

    const theme = input.contentTheme || 'ビジネス成功の10ステップ';
    const brand = input.brandProfile || this.getDefaultBrandProfile();

    const carousel: CarouselContent = {
      carouselTheme: theme,

      slides: [
        {
          slideNumber: 1,
          type: 'カバースライド（フック）',
          content: {
            headline: `${theme}`,
            body: 'スワイプして全てを見る👉',
            visual: 'アイキャッチビジュアル',
          },
          design: {
            layout: '中央揃え、シンプル',
            colorScheme: brand.colorPalette || ['#FF6B6B', '#4ECDC4'],
            typography: {
              headlineFont: 'Montserrat Bold, 48pt',
              bodyFont: 'Open Sans Regular, 24pt',
              hierarchy: 'ヘッドライン優位',
            },
            imagery: '象徴的なアイコンまたはイラスト',
          },
          purpose: '注目を集め、スワイプを促す',
        },
        {
          slideNumber: 2,
          type: 'イントロ/問題提起',
          content: {
            headline: 'なぜ多くの人が失敗するのか？',
            body: '成功する人としない人の\n決定的な違いとは',
            visual: '問題を象徴するビジュアル',
          },
          design: {
            layout: '上部ヘッドライン、中央ビジュアル、下部テキスト',
            colorScheme: ['#1A1A2E', '#F7FFF7'],
            typography: {
              headlineFont: 'Montserrat Bold, 36pt',
              bodyFont: 'Open Sans Regular, 20pt',
              hierarchy: 'バランス型',
            },
            imagery: '象徴的なイラストまたはアイコン',
          },
          purpose: '共感を呼び、興味を引く',
        },
        // ステップ1-10のスライド（簡略化のため代表例）
        ...Array.from({ length: 10 }, (_, i) => ({
          slideNumber: i + 3,
          type: `ステップ ${i + 1}`,
          content: {
            headline: `ステップ ${i + 1}`,
            body: `具体的なアクション\nまたはヒント`,
            visual: `ステップ${i + 1}のアイコン`,
          },
          design: {
            layout: '一貫したテンプレート',
            colorScheme: brand.colorPalette || ['#4ECDC4', '#FFE66D'],
            typography: {
              headlineFont: 'Montserrat Bold, 40pt',
              bodyFont: 'Open Sans Regular, 22pt',
              hierarchy: 'ヘッドライン優位',
            },
            imagery: '番号付きアイコン',
          },
          purpose: '具体的な情報提供',
        })),
        {
          slideNumber: 13,
          type: 'まとめ',
          content: {
            headline: 'まとめ',
            body: '10ステップを実践して\n成功を手に入れよう',
            visual: 'チェックリストまたは成功イメージ',
          },
          design: {
            layout: '中央揃え',
            colorScheme: ['#FF6B6B', '#F7FFF7'],
            typography: {
              headlineFont: 'Montserrat Bold, 42pt',
              bodyFont: 'Open Sans Regular, 24pt',
              hierarchy: 'バランス型',
            },
            imagery: '達成感を表現',
          },
          purpose: '内容を強化し、行動を促す',
        },
        {
          slideNumber: 14,
          type: 'CTA（行動喚起）',
          content: {
            headline: 'もっと詳しく知りたい？',
            body: 'プロフィールのリンクから\n無料ガイドをダウンロード👆',
            visual: 'CTAビジュアル（矢印、ボタン風）',
          },
          design: {
            layout: '中央揃え、強調',
            colorScheme: ['#4ECDC4', '#1A1A2E'],
            typography: {
              headlineFont: 'Montserrat Bold, 44pt',
              bodyFont: 'Open Sans Semibold, 26pt',
              hierarchy: 'CTA優位',
            },
            imagery: '行動を促すビジュアル',
          },
          purpose: 'トラフィック誘導、エンゲージメント',
        },
      ],

      totalSlides: 14,

      designSystem: {
        template: '統一テンプレート使用で一貫性確保',
        brandElements: [
          'ロゴを各スライドの同じ位置に',
          'ブランドカラーパレット統一',
          'フォントファミリー統一',
        ],
        consistency: [
          '各スライドのレイアウト一貫性',
          '余白・パディング統一',
          'アイコンスタイル統一',
        ],
        accessibility: [
          'テキストと背景のコントラスト確保',
          'フォントサイズ読みやすく',
          '色覚異常者にも配慮',
        ],
      },

      narrativeFlow: `
        1. フック（カバー）
        2. 問題提起（共感）
        3. 解決策提示（ステップ1-10）
        4. まとめ（強化）
        5. CTA（行動）
      `,

      swipeStrategy: {
        hooks: [
          'カバースライドで強力なフック',
          '「スワイプして続きを見る👉」',
          '番号表示で全体像を示す',
        ],
        curiosityGaps: [
          '各スライドで次への期待を作る',
          '「次のステップはさらに重要...」',
          '段階的に価値を高める',
        ],
        progression: '論理的な流れで、最後まで見たくなる構成',
        finalCta: '最後のスライドで明確なアクション促進',
      },
    };

    return {
      success: true,
      data: { carousel },
      metadata: {
        designTools: ['Canva Pro', 'Adobe Spark', 'Figma'],
        specs: {
          dimensions: '1080 x 1080 px per slide',
          maxSlides: 10,
          fileFormat: 'JPG または PNG',
        },
        tips: [
          'スワイプ率を高めるためカバーで好奇心刺激',
          '一貫したデザインで見やすさ確保',
          '最後のスライドでCTA忘れずに',
          '保存されやすいコンテンツ（教育的、リスト）',
        ],
      },
    };
  }

  // アナリティクス分析
  private async analyzeContent(
    input: SNSContentCreatorInstagramTaskInput
  ): Promise<AgentResponse> {
    this.log('Instagram コンテンツアナリティクスを分析中...');

    const performanceData = input.performanceData || this.getDefaultPerformanceData();

    const analytics: InstagramAnalyticsReport = {
      period: '過去30日間',

      contentPerformance: {
        topPerformingContent: [
          {
            contentId: 'POST-001',
            type: 'カルーセル',
            theme: '教育的コンテンツ',
            metrics: {
              likes: 2100,
              comments: 180,
              shares: 95,
              saves: 420,
              reach: 25000,
              engagementRate: 10.8,
            },
            successFactors: [
              '実用的な情報（保存価値高い）',
              'ビジュアルが統一されて見やすい',
              'ステップバイステップで分かりやすい',
            ],
          },
          {
            contentId: 'REEL-005',
            type: 'リール',
            theme: 'ハウツー',
            metrics: {
              likes: 1800,
              comments: 95,
              shares: 110,
              saves: 180,
              reach: 22000,
              engagementRate: 9.9,
            },
            successFactors: [
              'トレンド音楽使用',
              '最初3秒で注目獲得',
              'テンポが良く最後まで視聴',
            ],
          },
        ],

        contentTypeBenchmarks: [
          {
            type: 'カルーセル',
            avgEngagementRate: 8.5,
            optimalFrequency: '週2回',
            bestPerformingTime: '水曜 19:00',
          },
          {
            type: 'リール',
            avgEngagementRate: 7.8,
            optimalFrequency: '週3回',
            bestPerformingTime: '火曜 12:30, 木曜 19:00',
          },
          {
            type: 'フィード投稿',
            avgEngagementRate: 5.2,
            optimalFrequency: '週2回',
            bestPerformingTime: '月曜 7:30',
          },
        ],

        visualStyleAnalysis: [
          {
            style: 'ミニマルモダン',
            engagementRate: 8.2,
            audienceResonance: '高（特に25-35歳）',
            recommendation: '継続推奨',
          },
          {
            style: 'ビビッドカラフル',
            engagementRate: 6.5,
            audienceResonance: '中（若年層に人気）',
            recommendation: 'ターゲット次第で使用',
          },
        ],

        captionAnalysis: {
          optimalLength: '150-250文字（エンゲージメント最高）',
          effectiveHooks: [
            '質問形式',
            '驚きの事実',
            '共感できる問題提起',
          ],
          emojiImpact: '適度な使用（3-5個/投稿）でエンゲージメント +15%',
          questionEffectiveness: '質問を含むとコメント数 +45%',
        },
      },

      audienceAnalysis: {
        demographics: {
          ageDistribution: {
            '18-24': 15,
            '25-34': 45,
            '35-44': 25,
            '45-54': 10,
            '55+': 5,
          },
          genderDistribution: {
            '女性': 43,
            '男性': 55,
            'その他': 2,
          },
          topLocations: [
            { location: '東京', percentage: 35, engagementLevel: '高' },
            { location: '大阪', percentage: 15, engagementLevel: '中' },
            { location: '福岡', percentage: 8, engagementLevel: '中' },
          ],
        },

        behaviorPatterns: [
          {
            pattern: '平日夕方（19:00-21:00）に最もアクティブ',
            frequency: '毎日',
            impact: 'この時間帯の投稿でリーチ +40%',
          },
          {
            pattern: 'カルーセルの保存率が高い',
            frequency: '週2回程度',
            impact: '教育的コンテンツへの需要大',
          },
        ],

        contentPreferences: [
          {
            contentType: '教育的コンテンツ',
            preference: 90,
            reasoning: '実用的で保存価値が高い',
          },
          {
            contentType: 'ハウツー・チュートリアル',
            preference: 85,
            reasoning: '具体的で実践しやすい',
          },
          {
            contentType: 'インスピレーション',
            preference: 70,
            reasoning: '共感とモチベーション',
          },
        ],

        growthTrends: [
          {
            metric: 'フォロワー数',
            trend: '上昇',
            change: 20,
            analysis: '月間 +20%、オーガニック成長',
          },
          {
            metric: 'エンゲージメント率',
            trend: '上昇',
            change: 15,
            analysis: 'コンテンツ最適化の効果',
          },
        ],
      },

      engagementInsights: {
        peakEngagementTimes: [
          { day: '火曜', time: '12:30', engagementLevel: '非常に高' },
          { day: '水曜', time: '19:00', engagementLevel: '非常に高' },
          { day: '木曜', time: '19:00', engagementLevel: '高' },
        ],

        engagementTriggers: [
          {
            trigger: '質問を含むキャプション',
            impact: 'コメント数 +45%',
            examples: ['あなたはどう思う？', 'どれが一番好き？'],
          },
          {
            trigger: '保存を促す言葉',
            impact: '保存数 +60%',
            examples: ['保存していつでも見返してね', 'ブックマーク推奨'],
          },
        ],

        communityInteraction: [
          { metric: 'コメント返信率', value: 95, trend: '維持' },
          { metric: 'DMレスポンス時間', value: 30, trend: '改善（分単位）' },
          { metric: 'UGC再投稿', value: 4, trend: '増加（月間）' },
        ],
      },

      competitiveAnalysis: {
        competitors: [
          {
            name: '競合A',
            handle: '@competitorA',
            followers: 25000,
            avgEngagement: 6.5,
            contentStrategy: 'リール中心、トレンド重視',
            differentiators: [
              '我々の方がエンゲージメント率高い',
              '教育的コンテンツで差別化',
            ],
          },
        ],

        benchmarking: [
          {
            metric: 'エンゲージメント率',
            yourValue: 8.2,
            industryAverage: 5.5,
            gap: 2.7,
          },
          {
            metric: '投稿頻度',
            yourValue: 7,
            industryAverage: 10,
            gap: -3,
          },
        ],

        opportunities: [
          {
            area: 'リール投稿頻度',
            potential: '週2回→週4回で reach +30%',
            actionItems: [
              'リール制作プロセスを効率化',
              'テンプレート作成',
              'バッチ制作',
            ],
          },
        ],
      },

      recommendations: [
        {
          priority: 'high',
          recommendation: 'カルーセル投稿を週1回→週2回に増加',
          rationale: '最も高いエンゲージメント率と保存率',
          expectedImpact: 'リーチ +20%, フォロワー +15%',
          implementation: '教育的コンテンツのカルーセル化',
        },
        {
          priority: 'high',
          recommendation: 'リール投稿を週2回→週3回に増加',
          rationale: 'リーチ拡大に最も効果的',
          expectedImpact: 'リーチ +30%, 新規フォロワー +25%',
          implementation: 'トレンド音楽活用、ハウツー形式',
        },
        {
          priority: 'medium',
          recommendation: '全投稿に質問を含める',
          rationale: 'コメント数が大幅増加',
          expectedImpact: 'コメント数 +45%',
          implementation: 'キャプション末尾に必ず質問',
        },
      ],

      actionPlan: {
        immediate: [
          {
            action: 'リール投稿を週3回に増やす',
            timeline: '今週から',
            resources: ['リール制作テンプレート', 'トレンド音楽リスト'],
            expectedOutcome: 'リーチ +30%',
          },
        ],
        shortTerm: [
          {
            action: 'カルーセルコンテンツを週2回制作',
            timeline: '2週間以内',
            resources: ['Canvaテンプレート', 'コンテンツカレンダー'],
            expectedOutcome: 'エンゲージメント率 +15%',
          },
        ],
        longTerm: [
          {
            action: 'UGCキャンペーン開始',
            timeline: '1ヶ月以内',
            resources: ['キャンペーンプラン', 'インセンティブ設計'],
            expectedOutcome: 'コミュニティエンゲージメント +50%',
          },
        ],
      },
    };

    return {
      success: true,
      data: { analytics },
    };
  }

  // ユーティリティメソッド
  private getDefaultBrandProfile(): InstagramBrandProfile {
    return {
      name: 'Miyabi',
      handle: '@miyabi_official',
      industry: 'ビジネス・テクノロジー',
      brandVoice: 'プロフェッショナルでフレンドリー',
      aestheticStyle: 'ミニマルモダン',
      colorPalette: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#F7FFF7', '#1A1A2E'],
      values: ['革新', '成長', '信頼', '効率'],
      targetDemographic: '25-45歳のビジネスプロフェッショナル',
    };
  }

  private getDefaultPerformanceData(): PerformanceData {
    return {
      topPerformingPosts: [
        {
          type: 'カルーセル',
          engagementRate: 10.8,
          theme: '教育的コンテンツ',
          visualStyle: 'ミニマル',
        },
      ],
      audienceInsights: {
        mostActiveTime: '水曜 19:00',
        topLocations: ['東京', '大阪'],
        interests: ['ビジネス', 'テクノロジー', '自己啓発'],
      },
      engagementTrends: {
        bestPerformingFormat: 'カルーセル',
        optimalCaptionLength: '150-250文字',
        effectiveHashtags: ['#ビジネス', '#起業家', '#スタートアップ'],
      },
    };
  }
}
