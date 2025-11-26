/**
 * AIVisualCVOptimizerAgent - ビジュアルCV最適化専門エージェント
 * CV向上に特化した画像・動画・ビジュアル制作と最適化を実行
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface VisualCVOptimizerTaskInput {
  taskType:
    | 'hero-visual-optimization'
    | 'product-visual-enhancement'
    | 'attention-grabbing-design'
    | 'trust-building-visuals'
    | 'emotional-trigger-visuals'
    | 'mobile-visual-optimization'
    | 'video-cv-optimization';
  conversionGoal?: ConversionGoal;
  targetAudience?: TargetAudience;
  productInfo?: ProductInfo;
  brandAssets?: BrandAssets;
  currentVisuals?: CurrentVisual[];
  performanceData?: VisualPerformanceData;
  technicalRequirements?: TechnicalRequirements;
}

export interface ConversionGoal {
  primaryAction: 'signup' | 'purchase' | 'download' | 'contact' | 'trial' | 'subscribe';
  secondaryActions: string[];
  targetCVR: number;
  currentCVR?: number;
  valuePerConversion: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  competitivePressure: 'low' | 'medium' | 'high';
}

export interface TargetAudience {
  primarySegment: string;
  demographics: {
    ageRange: string;
    gender?: string;
    income: string;
    education: string;
    occupation: string[];
    location: string[];
  };
  psychographics: {
    values: string[];
    interests: string[];
    lifestyle: string[];
    personalityTraits: string[];
    motivations: string[];
    fears: string[];
  };
  visualPreferences: {
    colorPreferences: string[];
    stylePreferences: string[];
    imageryTypes: string[];
    complexityLevel: 'simple' | 'moderate' | 'complex';
    culturalContext: string[];
  };
  behaviorPatterns: {
    attentionSpan: 'short' | 'medium' | 'long';
    processingStyle: 'visual' | 'textual' | 'mixed';
    decisionSpeed: 'fast' | 'moderate' | 'slow';
    riskTolerance: 'low' | 'medium' | 'high';
  };
}

export interface ProductInfo {
  name: string;
  category: string;
  type: 'physical' | 'digital' | 'service' | 'subscription';
  priceRange: string;
  keyFeatures: string[];
  mainBenefits: string[];
  uniqueSellingPoints: string[];
  useCases: string[];
  testimonials?: string[];
  competitiveAdvantages: string[];
}

export interface BrandAssets {
  logo: {
    primary: string;
    secondary?: string;
    variations: string[];
    usageGuidelines: string[];
  };
  colorPalette: {
    primary: string[];
    secondary: string[];
    accent: string[];
    neutral: string[];
  };
  typography: {
    primary: string;
    secondary: string;
    heading: string;
    body: string;
  };
  imagery: {
    style: string[];
    mood: string[];
    subjects: string[];
    treatment: string[];
  };
  brandPersonality: string[];
  toneOfVoice: string[];
}

export interface CurrentVisual {
  id: string;
  type: 'hero-image' | 'product-image' | 'lifestyle-image' | 'infographic' | 'video' | 'animation';
  placement: string;
  description: string;
  performance: {
    viewTime: number;
    clickThrough: number;
    conversionContribution: number;
    userFeedback?: string[];
  };
  technicalSpecs: {
    dimensions: string;
    format: string;
    fileSize: string;
    loadTime: number;
  };
}

export interface VisualPerformanceData {
  overallMetrics: {
    averageViewTime: number;
    scrollDepth: number;
    clickHeatmap: string[];
    bounceRate: number;
  };
  visualElementPerformance: {
    heroSection: number;
    productImages: number;
    infographics: number;
    videos: number;
  };
  abTestResults: ABTestResult[];
  userFeedback: UserFeedback[];
}

export interface ABTestResult {
  testId: string;
  visualElement: string;
  variations: string[];
  winner: string;
  improvement: number;
  confidence: number;
  sampleSize: number;
}

export interface UserFeedback {
  category: 'positive' | 'negative' | 'neutral';
  aspect: string;
  comment: string;
  frequency: number;
}

export interface TechnicalRequirements {
  platforms: Platform[];
  deviceSupport: string[];
  performanceTargets: {
    loadTime: number;
    fileSize: number;
    quality: string;
  };
  accessibility: {
    altText: boolean;
    colorContrast: number;
    screenReader: boolean;
  };
}

export interface Platform {
  name: string;
  dimensions: string[];
  formats: string[];
  specifications: {
    aspectRatio: string[];
    resolution: string[];
    colorSpace: string;
    compression: string[];
  };
}

export class AIVisualCVOptimizerAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS['visual-cv-optimizer'] || {
      name: 'AI Visual CV Optimizer',
      description: 'CV向上に特化したビジュアル制作・最適化の専門家。心理学・視線誘導・感情トリガーを駆使したビジュアル設計',
      capabilities: [
        'CV特化ヒーロービジュアル制作',
        '商品ビジュアル強化',
        '注意喚起デザイン',
        '信頼構築ビジュアル',
        '感情トリガービジュアル',
        'モバイルビジュアル最適化',
        'ビデオCV最適化'
      ],
      model: 'claude-3.5-sonnet',
      temperature: 0.4,
      maxTokens: 4000,
    };
    super(config);
  }

  async executeTask(task: AgentTask): Promise<any> {
    const input = task.input as VisualCVOptimizerTaskInput;
    
    switch (input.taskType) {
      case 'hero-visual-optimization':
        return this.optimizeHeroVisual(input);
      case 'product-visual-enhancement':
        return this.enhanceProductVisuals(input);
      case 'attention-grabbing-design':
        return this.createAttentionGrabbingDesign(input);
      case 'trust-building-visuals':
        return this.createTrustBuildingVisuals(input);
      case 'emotional-trigger-visuals':
        return this.createEmotionalTriggerVisuals(input);
      case 'mobile-visual-optimization':
        return this.optimizeForMobile(input);
      case 'video-cv-optimization':
        return this.optimizeVideoForCV(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  private async optimizeHeroVisual(input: VisualCVOptimizerTaskInput) {
    const prompt = `
あなたはCV最適化に特化したビジュアルデザインの専門家です。コンバージョン率を最大化するヒーローセクションのビジュアルを設計してください。

# コンバージョン目標
${input.conversionGoal ? `
- 主要アクション: ${input.conversionGoal.primaryAction}
- 目標CVR: ${input.conversionGoal.targetCVR}%
- 現在CVR: ${input.conversionGoal.currentCVR || 'N/A'}%
- CV単価: ${input.conversionGoal.valuePerConversion}円
- 緊急性レベル: ${input.conversionGoal.urgencyLevel}
- 競合プレッシャー: ${input.conversionGoal.competitivePressure}
` : ''}

# ターゲットオーディエンス
${input.targetAudience ? `
## ${input.targetAudience.primarySegment}

### デモグラフィック
- 年齢層: ${input.targetAudience.demographics.ageRange}
- 性別: ${input.targetAudience.demographics.gender || 'N/A'}
- 年収: ${input.targetAudience.demographics.income}
- 職業: ${input.targetAudience.demographics.occupation.join(', ')}

### サイコグラフィック
- 価値観: ${input.targetAudience.psychographics.values.join(', ')}
- 興味: ${input.targetAudience.psychographics.interests.join(', ')}
- 動機: ${input.targetAudience.psychographics.motivations.join(', ')}
- 恐れ: ${input.targetAudience.psychographics.fears.join(', ')}

### ビジュアル嗜好
- 好みの色: ${input.targetAudience.visualPreferences?.colorPreferences?.join(', ') || 'N/A'}
- スタイル: ${input.targetAudience.visualPreferences?.stylePreferences?.join(', ') || 'N/A'}
- 画像タイプ: ${input.targetAudience.visualPreferences?.imageryTypes?.join(', ') || 'N/A'}
- 複雑さレベル: ${input.targetAudience.visualPreferences?.complexityLevel || 'N/A'}

### 行動パターン
- 注意持続時間: ${input.targetAudience.behaviorPatterns?.attentionSpan || 'N/A'}
- 処理スタイル: ${input.targetAudience.behaviorPatterns?.processingStyle || 'N/A'}
- 意思決定速度: ${input.targetAudience.behaviorPatterns?.decisionSpeed || 'N/A'}
- リスク許容度: ${input.targetAudience.behaviorPatterns?.riskTolerance || 'N/A'}
` : ''}

# 商品情報
${input.productInfo ? `
- 商品名: ${input.productInfo.name}
- カテゴリ: ${input.productInfo.category}
- タイプ: ${input.productInfo.type}
- 価格帯: ${input.productInfo.priceRange}
- 主要機能: ${input.productInfo.keyFeatures.join(', ')}
- メインベネフィット: ${input.productInfo.mainBenefits.join(', ')}
- 独自価値: ${input.productInfo.uniqueSellingPoints.join(', ')}
- 競合優位性: ${input.productInfo.competitiveAdvantages.join(', ')}
` : ''}

# ブランドアセット
${input.brandAssets ? `
## カラーパレット
- プライマリー: ${input.brandAssets.colorPalette.primary.join(', ')}
- セカンダリー: ${input.brandAssets.colorPalette.secondary.join(', ')}
- アクセント: ${input.brandAssets.colorPalette.accent.join(', ')}

## 画像スタイル
- スタイル: ${input.brandAssets.imagery.style.join(', ')}
- ムード: ${input.brandAssets.imagery.mood.join(', ')}
- 被写体: ${input.brandAssets.imagery.subjects.join(', ')}

## ブランドパーソナリティ
${input.brandAssets.brandPersonality.join(', ')}
` : ''}

# 現在のパフォーマンス
${input.performanceData ? `
## 全体指標
- 平均視聴時間: ${input.performanceData.overallMetrics.averageViewTime}秒
- スクロール深度: ${input.performanceData.overallMetrics.scrollDepth}%
- 直帰率: ${input.performanceData.overallMetrics.bounceRate}%

## ビジュアル要素別パフォーマンス
- ヒーローセクション: ${input.performanceData.visualElementPerformance.heroSection}%
- 商品画像: ${input.performanceData.visualElementPerformance.productImages}%
` : ''}

# ヒーローセクションビジュアル最適化要求

## 1. CV最適化ヒーローデザイン戦略
### 視覚的インパクト最大化
- 第一印象でのインパクト創出
- 3秒ルール対応設計
- スクロール防止・注意保持
- 競合差別化ビジュアル

### 心理学ベース設計原則
- **注意誘導**: 視線の自然な流れを活用
- **認知負荷軽減**: 情報過多を避けた整理
- **感情的結びつき**: ターゲットの感情に響く表現
- **信頼性構築**: 安心感・専門性の視覚的表現

### コンバージョン心理学活用
- **価値の即時伝達**: 一目でベネフィットが分かる
- **緊急性・希少性**: 視覚的緊急感創出
- **社会的証明**: 他者利用の視覚的示唆
- **リスク軽減**: 安心感・保証の視覚表現

## 2. 具体的デザイン設計
### レイアウト・構成
- **Zパターン/Fパターン**: 視線誘導最適化
- **ビジュアル階層**: 重要度順の配置
- **黄金比・三分割法**: 美的バランス確保
- **余白活用**: 注意集中・呼吸感

### カラーストラテジー
- **プライマリーカラー**: ブランド一貫性
- **CVアクションカラー**: CTA・重要要素強調
- **感情誘発カラー**: ターゲット感情に対応
- **コントラスト最適化**: 視認性・アクセシビリティ

### タイポグラフィ戦略
- **ヘッドライン**: インパクト・読みやすさ両立
- **サブヘッド**: 補完情報・詳細誘導
- **サイズ・ウェイト**: ヒエラルキー明確化
- **読みやすさ**: デバイス対応・距離対応

### 画像・ビジュアル要素
- **メインビジュアル**: 商品・ライフスタイル・コンセプト
- **人物使用**: 感情移入・信頼構築・多様性配慮
- **商品表現**: リアリティ・使用感・ベネフィット視覚化
- **背景・装飾**: サポート・雰囲気演出

## 3. デバイス・プラットフォーム最適化
### レスポンシブ対応
- **デスクトップ**: 情報豊富・詳細表示
- **タブレット**: バランス・タッチ対応
- **スマートフォン**: シンプル・縦優先

### パフォーマンス最適化
- **ファイルサイズ**: 高品質・高速読み込み両立
- **圧縮技術**: WebP・AVIF活用
- **遅延読み込み**: Above the fold最優先

## 4. A/Bテスト設計
### テスト要素優先順位
1. **メインビジュアル**: 商品中心 vs ライフスタイル vs コンセプト
2. **カラースキーム**: 温暖色 vs 寒色 vs ニュートラル
3. **人物要素**: あり vs なし vs 多様性
4. **レイアウト**: 中央揃え vs 左揃え vs 非対称
5. **情報密度**: シンプル vs 詳細 vs バランス

### 測定指標
- **プライマリー**: CVR・CTA クリック率
- **セカンダリー**: 滞在時間・スクロール率・直帰率
- **質的指標**: ユーザーフィードバック・ブランド印象

## 5. 実装・制作ガイドライン
### 技術仕様
- **解像度**: Retina対応・マルチデバイス
- **ファイル形式**: 最適フォーマット選択
- **アニメーション**: 適度な動き・注意過多回避
- **アクセシビリティ**: alt属性・コントラスト確保

### 制作プロセス
- **コンセプト確定**: ターゲット・目的明確化
- **ワイヤーフレーム**: 構成・レイアウト設計
- **デザイン作成**: ビジュアル・詳細デザイン
- **プロトタイプ**: インタラクション・動作確認
- **実装・テスト**: 技術実装・品質確認

CV効果を最大化する戦略的ヒーローセクションビジュアルを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'hero_visual_optimization',
      design: response,
      designElements: this.extractDesignElements(response),
      colorStrategy: this.extractColorStrategy(response),
      layoutPlan: this.extractLayoutPlan(response),
      abTestVariations: this.extractABTestVariations(response),
      implementationGuide: this.extractImplementationGuide(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async enhanceProductVisuals(input: VisualCVOptimizerTaskInput) {
    const prompt = `
商品の魅力を最大化し、コンバージョン率を向上させる商品ビジュアル強化戦略を設計してください。

# 商品ビジュアル強化要求

## 1. 商品ビジュアル戦略
### 商品撮影戦略
- **メイン商品画像**: 最高品質・全角度・詳細表示
- **使用シーン**: 実際の使用場面・ライフスタイル統合
- **比較表示**: サイズ感・他商品との差異
- **詳細クローズアップ**: 素材・質感・機能部分

### 商品の価値視覚化
- **ベネフィット表現**: 機能→結果の視覚的説明
- **Before/After**: 使用前後の変化表現
- **プロセス可視化**: 使用方法・手順の図解
- **結果の証明**: 効果・成果の視覚的証拠

## 2. 感情的結びつき強化
### ライフスタイル統合
- **理想の生活**: 商品を使った理想的シーン
- **感情表現**: 満足・喜び・安心感の表現
- **人物モデル**: ターゲットに近い人物・多様性
- **環境設定**: ターゲットの生活環境・文脈

### ストーリーテリング
- **商品ストーリー**: 開発背景・こだわり
- **ユーザーストーリー**: 実際の使用体験・変化
- **ブランドストーリー**: 企業・ブランドの価値観
- **社会的価値**: 社会貢献・持続可能性

## 3. 信頼性・権威性構築
### 品質証明ビジュアル
- **製造過程**: こだわりの製造・品質管理
- **認証・受賞**: 第三者認証・受賞歴
- **専門家推奨**: 専門家・有識者の推薦
- **メディア掲載**: 雑誌・TV等での紹介

### 社会的証明
- **利用者数**: 多くの人が選んでいる証拠
- **評価・レビュー**: 高評価の視覚的表示
- **リピート率**: 継続利用・満足度の表現
- **コミュニティ**: ユーザー同士のつながり

## 4. 技術的最適化
### 画質・表示最適化
- **高解像度**: Retina・4K対応
- **圧縮最適化**: 品質・速度バランス
- **フォーマット選択**: WebP・AVIF活用
- **遅延読み込み**: 優先順位付き読み込み

### インタラクティブ要素
- **360度ビュー**: 全角度確認可能
- **ズーム機能**: 詳細部分拡大
- **カラー・バリエーション**: 色・柄選択
- **サイズ比較**: 実物大・比較対象

実用的で効果的な商品ビジュアル強化戦略を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'product_visual_enhancement',
      strategy: response,
      productPhotography: this.extractProductPhotography(response),
      lifestyleIntegration: this.extractLifestyleIntegration(response),
      trustElements: this.extractTrustElements(response),
      technicalOptimization: this.extractTechnicalOptimization(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createAttentionGrabbingDesign(input: VisualCVOptimizerTaskInput) {
    const prompt = `
注意を瞬時に引きつけ、コンバージョンに導く注意喚起デザインを作成してください。

# 注意喚起デザイン要求

## 1. 注意誘導心理学
### 視覚的注意の原理
- **コントラストの法則**: 背景との強い対比
- **色彩心理**: 注意を引く色の戦略的使用
- **動きの効果**: 適度なアニメーション・動的要素
- **サイズ・配置**: 大きさ・位置による注意集中

### 認知心理学活用
- **ゲシュタルト原理**: 群化・近接性・類似性
- **視線誘導**: 自然な視線の流れ活用
- **注意分散防止**: 重要要素への集中
- **認知負荷軽減**: 理解しやすい構成

## 2. 緊急性・希少性の視覚化
### 時間的緊急性
- **カウントダウン**: 残り時間の視覚的表示
- **限定期間**: 期間限定の強調表現
- **締切感**: 時間の切迫感創出
- **機会損失**: 逃すリスクの視覚化

### 数量的希少性
- **在庫表示**: 残り数量の表示
- **限定性**: 特別感・排他性の表現
- **競争感**: 他者との競争意識
- **完売可能性**: 売り切れリスクの示唆

## 3. 感情トリガー活用
### ポジティブ感情
- **達成感**: 成功・目標達成の視覚化
- **満足感**: 満足・充実の表現
- **期待感**: 未来への希望・期待
- **所属感**: コミュニティ・仲間意識

### ネガティブ感情
- **不安感**: 現状維持のリスク
- **機会損失**: 逃した時の後悔
- **競争不安**: 他者に遅れる恐怖
- **問題意識**: 現状の課題・困り事

## 4. 視覚的インパクト技法
### デザイン技法
- **非対称性**: 意外性・注意喚起
- **空間活用**: 余白・密度のコントラスト
- **テクスチャ**: 質感・触覚への訴求
- **パターン**: 規則性・反復性の効果

### 視覚効果
- **影・光**: 立体感・奥行き表現
- **グラデーション**: 滑らかな変化・美しさ
- **透明度**: 重層・深み表現
- **フィルター効果**: 雰囲気・印象調整

効果的な注意喚起デザインを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'attention_grabbing_design',
      design: response,
      attentionTechniques: this.extractAttentionTechniques(response),
      urgencyElements: this.extractUrgencyElements(response),
      emotionalTriggers: this.extractEmotionalTriggers(response),
      visualEffects: this.extractVisualEffects(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createTrustBuildingVisuals(input: VisualCVOptimizerTaskInput) {
    const prompt = `
信頼性を構築し、購買不安を軽減する信頼構築ビジュアルを作成してください。

# 信頼構築ビジュアル要求

## 1. 信頼性の視覚的表現
### 権威性・専門性
- **認証・資格**: 公式認証・資格の視覚的表示
- **受賞歴**: 賞・認定の信頼できる表示
- **メディア掲載**: 著名メディアでの紹介
- **専門家推奨**: 有識者・専門家の推薦

### 実績・経験
- **数値実績**: 利用者数・実績数の説得力ある表示
- **歴史・伝統**: 長年の経験・実績
- **成功事例**: 具体的な成功事例
- **継続性**: 安定した事業継続性

## 2. 社会的証明の視覚化
### 顧客証言・レビュー
- **リアルな顧客**: 実在感のある顧客写真・情報
- **具体的体験**: 詳細で信頼できる体験談
- **評価の視覚化**: 星評価・グラフでの表示
- **量・質の両立**: 多数の高品質レビュー

### 利用者コミュニティ
- **ユーザー数**: 多くの利用者がいる証拠
- **活発性**: アクティブなコミュニティ
- **多様性**: 様々な利用者層
- **満足度**: 高い満足度・継続率

## 3. 透明性・オープンネス
### 企業・組織の透明性
- **チーム紹介**: 実在する人物・顔が見える
- **オフィス・施設**: リアルな事業所・製造現場
- **プロセス公開**: 製造・サービス提供過程
- **価格の透明性**: 明確な価格・追加費用なし

### 情報の正確性
- **詳細情報**: 十分で正確な情報提供
- **根拠・データ**: 信頼できるデータ・根拠
- **第三者検証**: 外部機関による検証
- **更新性**: 最新の正確な情報

## 4. 安心・安全の視覚化
### セキュリティ・プライバシー
- **セキュリティ認証**: SSL・セキュリティ証明
- **プライバシー保護**: 個人情報保護の明示
- **安全対策**: 具体的な安全対策
- **信頼できる決済**: 安全な決済方法

### 保証・アフターサポート
- **返金保証**: 明確な返金・交換保証
- **サポート体制**: 充実したサポート
- **連絡先**: 明確な連絡先・窓口
- **対応時間**: 迅速な対応・レスポンス

信頼感を高めるビジュアル戦略を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'trust_building_visuals',
      strategy: response,
      authorityElements: this.extractAuthorityElements(response),
      socialProof: this.extractSocialProof(response),
      transparencyVisuals: this.extractTransparencyVisuals(response),
      securityElements: this.extractSecurityElements(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createEmotionalTriggerVisuals(input: VisualCVOptimizerTaskInput) {
    const prompt = `
ターゲットの感情に強く訴えかけ、行動を促す感情トリガービジュアルを作成してください。

# 感情トリガービジュアル要求

## 1. 感情心理学ベース設計
### 基本感情の活用
- **喜び・幸福**: 満足・達成・成功の表現
- **驚き・興味**: 新発見・期待・ワクワク感
- **恐怖・不安**: リスク・機会損失・後悔
- **怒り・不満**: 現状への不満・改善欲求
- **悲しみ・同情**: 共感・理解・サポート
- **嫌悪・拒絶**: 避けたい状況・問題

### 複合感情の表現
- **憧れ・願望**: 理想の生活・状態への憧れ
- **安心・信頼**: 安全・保護・サポート感
- **誇り・自尊**: 自己実現・承認・達成
- **親近感**: 親しみ・共感・仲間意識
- **緊張・期待**: 重要な瞬間・転換点
- **解放感**: 問題解決・ストレス軽減

## 2. ターゲット別感情マッピング
### デモグラフィック別
- **年代別**: 世代特有の価値観・関心事
- **性別別**: 性別による感情の傾向
- **職業別**: 職業特有のストレス・欲求
- **収入別**: 経済状況による感情・ニーズ

### ライフステージ別
- **学生・新社会人**: 成長・可能性・不安
- **子育て世代**: 家族・安全・将来への不安
- **働き盛り**: 成功・効率・時間不足
- **シニア**: 健康・安心・経験の活用

## 3. 感情誘発ビジュアル技法
### 色彩による感情誘発
- **暖色系**: 温かさ・活力・興奮・親しみ
- **寒色系**: 冷静・信頼・安心・プロフェッショナル
- **彩度・明度**: 感情の強度・エネルギーレベル
- **配色組み合わせ**: 複雑な感情・ニュアンス

### 表情・ジェスチャー
- **顔の表情**: 喜び・驚き・安心・集中
- **ボディランゲージ**: 自信・リラックス・活力
- **視線の方向**: 注意誘導・感情の向き
- **人物の選択**: ターゲットとの共感・憧れ

### 環境・シチュエーション
- **ライフスタイル**: 理想の生活・環境
- **季節・時間**: 特定の感情・記憶
- **場所・空間**: 安らぎ・興奮・集中
- **物・道具**: 機能的価値・感情的価値

## 4. ストーリーテリングビジュアル
### ナラティブ構造
- **問題提起**: 現状の課題・不満
- **解決提示**: 商品・サービスによる解決
- **結果・変化**: 改善・成功・満足
- **未来展望**: より良い将来・可能性

### ビジュアルストーリー
- **Before/After**: 変化・改善の視覚的証明
- **プロセス**: 段階的な変化・成長
- **瞬間の切り取り**: 決定的瞬間・感動
- **継続性**: 長期的な価値・関係

強力な感情的インパクトを持つビジュアル戦略を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'emotional_trigger_visuals',
      strategy: response,
      emotionMapping: this.extractEmotionMapping(response),
      colorPsychology: this.extractColorPsychology(response),
      expressionGuide: this.extractExpressionGuide(response),
      storytellingVisuals: this.extractStorytellingVisuals(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async optimizeForMobile(input: VisualCVOptimizerTaskInput) {
    const prompt = `
モバイルデバイスでのコンバージョン最適化に特化したビジュアルデザインを作成してください。

# モバイルビジュアル最適化要求

## 1. モバイル特有のUX考慮
### タッチインターフェース
- **タップ領域**: 指でタップしやすいサイズ・間隔
- **スワイプ対応**: 横スクロール・カルーセル
- **ピンチ・ズーム**: 詳細確認・拡大機能
- **ジェスチャー**: 直感的な操作・ナビゲーション

### 画面サイズ制約
- **縦優先レイアウト**: 縦スクロール最適化
- **情報密度**: 必要最小限の情報・段階的開示
- **視覚的ヒエラルキー**: 重要度順の配置
- **折りたたみ**: アコーディオン・展開機能

## 2. モバイル表示最適化
### パフォーマンス
- **読み込み速度**: 3秒以内読み込み
- **画像圧縮**: 品質・ファイルサイズ最適化
- **プログレッシブ表示**: 段階的画像読み込み
- **キャッシュ活用**: 効率的なデータ利用

### レスポンシブ対応
- **フレキシブル画像**: 画面サイズ自動調整
- **アスペクト比**: 縦横比維持・最適表示
- **文字サイズ**: 読みやすいサイズ・行間
- **余白調整**: 適切な余白・密度

## 3. モバイルコンバージョン最適化
### CTA最適化
- **大きなボタン**: 指で押しやすいサイズ
- **明確な配置**: 分かりやすい位置・色
- **スティッキー要素**: 常に見える位置
- **ワンタップ**: 最小限のタップで完了

### フォーム最適化
- **必要最小限**: 入力項目削減
- **入力支援**: 自動補完・選択肢
- **エラー防止**: リアルタイム検証
- **進捗表示**: ステップ・残り項目

## 4. モバイル特有の心理学
### 注意・集中
- **シングルタスク**: 一つの行動に集中
- **瞬間的判断**: 短時間での意思決定
- **簡単・便利**: 手軽さ・利便性重視
- **即時性**: すぐに結果・反応

### 感情・行動
- **衝動性**: 瞬間的な購買・行動
- **個人性**: プライベート・パーソナル
- **移動性**: 移動中・外出先での利用
- **断続性**: 中断・再開の考慮

効果的なモバイルビジュアル最適化戦略を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'mobile_visual_optimization',
      strategy: response,
      touchOptimization: this.extractTouchOptimization(response),
      performanceOptimization: this.extractPerformanceOptimization(response),
      mobileUX: this.extractMobileUX(response),
      responsiveDesign: this.extractResponsiveDesign(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async optimizeVideoForCV(input: VisualCVOptimizerTaskInput) {
    const prompt = `
コンバージョン最大化のためのビデオコンテンツ最適化戦略を設計してください。

# ビデオCV最適化要求

## 1. ビデオコンバージョン戦略
### 注意獲得・維持
- **冒頭3秒**: 瞬間的なフック・注意獲得
- **視覚的インパクト**: 強烈な第一印象
- **音声なし対応**: 字幕・ビジュアル主体
- **ループ対応**: 自然な繰り返し再生

### ストーリーテリング
- **問題提示**: ターゲットの課題・痛み
- **解決提示**: 商品・サービスでの解決
- **結果・効果**: 改善・成功の証明
- **行動喚起**: 明確なネクストアクション

## 2. プラットフォーム別最適化
### ソーシャルメディア
- **縦型動画**: Instagram Stories・TikTok
- **正方形**: Instagram Feed・Facebook
- **横型**: YouTube・Facebook動画広告
- **短尺**: 15-30秒での完結

### 広告・マーケティング
- **ディスプレイ広告**: アウトストリーム・バナー動画
- **プレロール**: YouTube・動画サイト広告
- **リターゲティング**: カスタマイズ動画
- **メール**: 軽量・クリック誘導動画

## 3. 感情・心理的効果
### 感情誘発技術
- **音楽・効果音**: 感情的雰囲気作り
- **色彩・照明**: ムード・感情の演出
- **ペース・リズム**: 緊張感・リラックス
- **人物・表情**: 共感・感情移入

### 説得技術
- **社会的証明**: 他者の利用・満足
- **権威性**: 専門家・有名人の推奨
- **希少性**: 限定性・緊急性の演出
- **互恵性**: 価値提供・お得感

## 4. 技術的最適化
### パフォーマンス
- **ファイルサイズ**: 品質・速度バランス
- **圧縮技術**: H.264・H.265・AV1
- **解像度**: デバイス・プラットフォーム対応
- **フレームレート**: 滑らか・自然な動き

### アクセシビリティ
- **字幕**: 音声なし・聴覚障害対応
- **音声説明**: 視覚障害対応
- **多言語**: グローバル対応
- **明暗**: 色覚障害対応

コンバージョン効果の高いビデオ戦略を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'video_cv_optimization',
      strategy: response,
      storyboardPlan: this.extractStoryboardPlan(response),
      platformOptimization: this.extractPlatformOptimization(response),
      emotionalStrategy: this.extractEmotionalStrategy(response),
      technicalSpecs: this.extractTechnicalSpecs(response),
      timestamp: new Date().toISOString(),
    };
  }

  // Helper methods for extracting structured data
  private extractDesignElements(response: string): any {
    return {}; // Implement design elements extraction
  }

  private extractColorStrategy(response: string): any {
    return {}; // Implement color strategy extraction
  }

  private extractLayoutPlan(response: string): any {
    return {}; // Implement layout plan extraction
  }

  private extractABTestVariations(response: string): any[] {
    return []; // Implement A/B test variations extraction
  }

  private extractImplementationGuide(response: string): any {
    return {}; // Implement implementation guide extraction
  }

  private extractProductPhotography(response: string): any {
    return {}; // Implement product photography extraction
  }

  private extractLifestyleIntegration(response: string): any {
    return {}; // Implement lifestyle integration extraction
  }

  private extractTrustElements(response: string): any[] {
    return []; // Implement trust elements extraction
  }

  private extractTechnicalOptimization(response: string): any {
    return {}; // Implement technical optimization extraction
  }

  private extractAttentionTechniques(response: string): any[] {
    return []; // Implement attention techniques extraction
  }

  private extractUrgencyElements(response: string): any[] {
    return []; // Implement urgency elements extraction
  }

  private extractEmotionalTriggers(response: string): any[] {
    return []; // Implement emotional triggers extraction
  }

  private extractVisualEffects(response: string): any[] {
    return []; // Implement visual effects extraction
  }

  private extractAuthorityElements(response: string): any[] {
    return []; // Implement authority elements extraction
  }

  private extractSocialProof(response: string): any[] {
    return []; // Implement social proof extraction
  }

  private extractTransparencyVisuals(response: string): any[] {
    return []; // Implement transparency visuals extraction
  }

  private extractSecurityElements(response: string): any[] {
    return []; // Implement security elements extraction
  }

  private extractEmotionMapping(response: string): any {
    return {}; // Implement emotion mapping extraction
  }

  private extractColorPsychology(response: string): any {
    return {}; // Implement color psychology extraction
  }

  private extractExpressionGuide(response: string): any {
    return {}; // Implement expression guide extraction
  }

  private extractStorytellingVisuals(response: string): any {
    return {}; // Implement storytelling visuals extraction
  }

  private extractTouchOptimization(response: string): any {
    return {}; // Implement touch optimization extraction
  }

  private extractPerformanceOptimization(response: string): any {
    return {}; // Implement performance optimization extraction
  }

  private extractMobileUX(response: string): any {
    return {}; // Implement mobile UX extraction
  }

  private extractResponsiveDesign(response: string): any {
    return {}; // Implement responsive design extraction
  }

  private extractStoryboardPlan(response: string): any {
    return {}; // Implement storyboard plan extraction
  }

  private extractPlatformOptimization(response: string): any {
    return {}; // Implement platform optimization extraction
  }

  private extractEmotionalStrategy(response: string): any {
    return {}; // Implement emotional strategy extraction
  }

  private extractTechnicalSpecs(response: string): any {
    return {}; // Implement technical specs extraction
  }
}