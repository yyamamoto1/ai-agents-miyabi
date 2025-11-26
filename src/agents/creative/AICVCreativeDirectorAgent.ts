/**
 * AICVCreativeDirectorAgent - CV最適化に特化したクリエイティブ統括ディレクター
 * CV向上に特化したビジュアル戦略・クリエイティブ企画・A/Bテスト設計の専門家
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface CVCreativeDirectorTaskInput {
  taskType:
    | 'cv-visual-strategy'
    | 'creative-campaign-planning'
    | 'ab-creative-design'
    | 'conversion-funnel-creative'
    | 'brand-cv-optimization'
    | 'multi-channel-creative'
    | 'creative-performance-analysis';
  businessGoal?: BusinessGoal;
  targetAudience?: TargetAudience;
  brandGuidelines?: BrandGuidelines;
  currentPerformance?: CreativePerformance;
  competitorAnalysis?: CompetitorCreative[];
  channelRequirements?: ChannelRequirement[];
  timeline?: CreativeTimeline;
}

export interface BusinessGoal {
  primaryObjective: 'awareness' | 'consideration' | 'conversion' | 'retention' | 'advocacy';
  conversionGoals: ConversionGoal[];
  targetCVR: number;
  targetROAS: number;
  budget: number;
  industry: string;
  productType: string;
}

export interface ConversionGoal {
  type: 'micro' | 'macro';
  name: string;
  value: number;
  priority: 'high' | 'medium' | 'low';
  currentRate?: number;
  targetRate: number;
  funnelStage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'purchase' | 'retention';
}

export interface TargetAudience {
  segments: AudienceSegment[];
  primarySegment: string;
  visualPreferences: VisualPreference;
  behaviorInsights: BehaviorInsight;
  emotionalTriggers: EmotionalTrigger[];
}

export interface AudienceSegment {
  name: string;
  demographics: {
    ageRange: string;
    gender?: string;
    income: string;
    location: string[];
    education: string;
    occupation: string[];
  };
  psychographics: {
    values: string[];
    interests: string[];
    lifestyle: string[];
    painPoints: string[];
    aspirations: string[];
  };
  mediaConsumption: {
    platforms: string[];
    contentTypes: string[];
    engagementTimes: string[];
    devicePreferences: string[];
  };
}

export interface VisualPreference {
  colorPalette: string[];
  designStyle: string[];
  imagery: string[];
  typography: string[];
  layout: string[];
}

export interface BehaviorInsight {
  decisionMakingProcess: 'emotional' | 'rational' | 'social' | 'mixed';
  attentionSpan: 'short' | 'medium' | 'long';
  visualProcessing: 'detail-oriented' | 'big-picture' | 'pattern-focused';
  interactionPreference: 'passive' | 'interactive' | 'immersive';
}

export interface EmotionalTrigger {
  emotion: string;
  intensity: 'low' | 'medium' | 'high';
  trigger: string[];
  visualCues: string[];
  colorAssociation: string[];
}

export interface BrandGuidelines {
  brandPersonality: string[];
  visualIdentity: {
    primaryColors: string[];
    secondaryColors: string[];
    typography: {
      primary: string;
      secondary: string;
      accent: string;
    };
    logoUsage: {
      placement: string[];
      sizing: string[];
      clearSpace: string;
    };
  };
  toneOfVoice: {
    characteristics: string[];
    dosDonts: {
      dos: string[];
      donts: string[];
    };
  };
  brandValues: string[];
  differentiation: string[];
}

export interface CreativePerformance {
  campaigns: CampaignPerformance[];
  topPerformingCreatives: CreativeAsset[];
  underperformingElements: string[];
  insights: PerformanceInsight[];
}

export interface CampaignPerformance {
  name: string;
  objective: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cvr: number;
    cpa: number;
    roas: number;
  };
  creativeElements: {
    visual: string;
    headline: string;
    cta: string;
    format: string;
  };
  audience: string;
  platform: string;
}

export interface CreativeAsset {
  id: string;
  type: 'image' | 'video' | 'carousel' | 'interactive';
  elements: {
    visual: string;
    copy: string;
    cta: string;
    format: string;
  };
  performance: {
    ctr: number;
    cvr: number;
    engagement: number;
    shareability: number;
  };
  audience: string;
  platform: string;
}

export interface PerformanceInsight {
  category: 'visual' | 'copy' | 'format' | 'timing' | 'audience';
  insight: string;
  impact: 'positive' | 'negative' | 'neutral';
  recommendation: string;
  confidence: number;
}

export interface CompetitorCreative {
  competitor: string;
  creativeSummary: string;
  strengths: string[];
  weaknesses: string[];
  differentiationOpportunities: string[];
  estimatedPerformance: 'high' | 'medium' | 'low';
}

export interface ChannelRequirement {
  channel: string;
  formats: string[];
  specifications: {
    dimensions: string[];
    fileSize: string;
    duration?: string;
    aspectRatio: string[];
  };
  contentGuidelines: string[];
  bestPractices: string[];
}

export interface CreativeTimeline {
  phases: CreativePhase[];
  milestones: CreativeMilestone[];
  dependencies: CreativeDependency[];
}

export interface CreativePhase {
  name: string;
  duration: string;
  deliverables: string[];
  resources: string[];
  approvalRequired: boolean;
}

export interface CreativeMilestone {
  name: string;
  date: string;
  deliverable: string;
  stakeholders: string[];
  successCriteria: string[];
}

export interface CreativeDependency {
  task: string;
  dependsOn: string[];
  impact: 'blocking' | 'parallel' | 'nice-to-have';
}

export class AICVCreativeDirectorAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS['cv-creative-director'] || {
      name: 'AI CV Creative Director',
      description: 'CV最適化に特化したクリエイティブ統括ディレクター。ビジュアル戦略・A/Bテスト設計・ファネル別クリエイティブを統括',
      capabilities: [
        'CV特化ビジュアル戦略立案',
        'A/Bテストクリエイティブ設計',
        'コンバージョンファネル別クリエイティブ企画',
        'ブランド×CV最適化',
        'マルチチャネルクリエイティブ統括',
        'クリエイティブパフォーマンス分析',
        '心理学ベースクリエイティブ設計'
      ],
      model: 'claude-3.5-sonnet',
      temperature: 0.3,
      maxTokens: 4000,
    };
    super(config);
  }

  async executeTask(task: AgentTask): Promise<any> {
    const input = task.input as CVCreativeDirectorTaskInput;
    
    switch (input.taskType) {
      case 'cv-visual-strategy':
        return this.developCVVisualStrategy(input);
      case 'creative-campaign-planning':
        return this.planCreativeCampaign(input);
      case 'ab-creative-design':
        return this.designABCreatives(input);
      case 'conversion-funnel-creative':
        return this.designFunnelCreatives(input);
      case 'brand-cv-optimization':
        return this.optimizeBrandForCV(input);
      case 'multi-channel-creative':
        return this.designMultiChannelCreatives(input);
      case 'creative-performance-analysis':
        return this.analyzeCreativePerformance(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  private async developCVVisualStrategy(input: CVCreativeDirectorTaskInput) {
    const prompt = `
あなたはCV最適化に特化したクリエイティブディレクターです。コンバージョン率を最大化するビジュアル戦略を策定してください。

# ビジネス目標
${input.businessGoal ? `
- 主要目的: ${input.businessGoal.primaryObjective}
- 目標CVR: ${input.businessGoal.targetCVR}%
- 目標ROAS: ${input.businessGoal.targetROAS}
- 予算: ${input.businessGoal.budget.toLocaleString()}円
- 業界: ${input.businessGoal.industry}
- 商品タイプ: ${input.businessGoal.productType}

## コンバージョン目標
${input.businessGoal.conversionGoals.map(goal => `
- ${goal.name} (${goal.type}): 現在${goal.currentRate || 'N/A'}% → 目標${goal.targetRate}%
- 価値: ${goal.value}円, 優先度: ${goal.priority}, ファネル段階: ${goal.funnelStage}
`).join('')}
` : ''}

# ターゲットオーディエンス
${input.targetAudience ? `
## 主要セグメント: ${input.targetAudience.primarySegment}

## ビジュアル嗜好
- カラーパレット: ${input.targetAudience.visualPreferences?.colorPalette?.join(', ') || 'N/A'}
- デザインスタイル: ${input.targetAudience.visualPreferences?.designStyle?.join(', ') || 'N/A'}
- 画像タイプ: ${input.targetAudience.visualPreferences?.imagery?.join(', ') || 'N/A'}

## 行動インサイト
- 意思決定プロセス: ${input.targetAudience.behaviorInsights?.decisionMakingProcess || 'N/A'}
- 注意持続時間: ${input.targetAudience.behaviorInsights?.attentionSpan || 'N/A'}
- ビジュアル処理: ${input.targetAudience.behaviorInsights?.visualProcessing || 'N/A'}

## 感情トリガー
${input.targetAudience.emotionalTriggers?.map(trigger => `
- ${trigger.emotion} (強度: ${trigger.intensity})
- トリガー: ${trigger.trigger.join(', ')}
- ビジュアルキュー: ${trigger.visualCues.join(', ')}
- 色彩関連: ${trigger.colorAssociation.join(', ')}
`).join('') || 'N/A'}
` : ''}

# ブランドガイドライン
${input.brandGuidelines ? `
## ブランドパーソナリティ
${input.brandGuidelines.brandPersonality.join(', ')}

## ビジュアルアイデンティティ
- プライマリーカラー: ${input.brandGuidelines.visualIdentity.primaryColors.join(', ')}
- セカンダリーカラー: ${input.brandGuidelines.visualIdentity.secondaryColors.join(', ')}
- メインフォント: ${input.brandGuidelines.visualIdentity.typography.primary}

## ブランド価値
${input.brandGuidelines.brandValues.join(', ')}
` : ''}

# 現在のパフォーマンス
${input.currentPerformance ? `
## トップパフォーマンスクリエイティブ
${input.currentPerformance.topPerformingCreatives.map(asset => `
- タイプ: ${asset.type}, CTR: ${asset.performance.ctr}%, CVR: ${asset.performance.cvr}%
- ビジュアル: ${asset.elements.visual}
- コピー: ${asset.elements.copy}
`).join('')}

## パフォーマンス不振要素
${input.currentPerformance.underperformingElements.join(', ')}
` : ''}

# CV特化ビジュアル戦略策定要求

## 1. CV最適化ビジュアル戦略（統合戦略）
### A. 心理学ベースビジュアル設計
- 認知心理学原則の活用
- 感情誘発ビジュアル戦略
- 注意誘導・視線制御設計
- 信頼性構築ビジュアル要素

### B. コンバージョンファネル別戦略
- AWARENESS: 注目獲得・ブランド認知
- INTEREST: 興味喚起・情報提供
- CONSIDERATION: 比較検討・差別化
- INTENT: 購買意欲・緊急性
- ACTION: 行動促進・摩擦軽減
- RETENTION: 継続・ロイヤルティ

### C. プラットフォーム別最適化
- 各チャネルの特性に応じた戦略
- フォーマット最適化
- ユーザー体験統合

## 2. 色彩心理学・CV戦略
### カラーパレット設計
- メインカラー: コンバージョン最適化
- アクセントカラー: CTA・注意誘導
- サポートカラー: 信頼性・安心感
- 業界別・ターゲット別カスタマイズ

### 感情誘発カラー戦略
- ポジティブ感情: 希望・成功・満足
- ネガティブ感情: 不安・緊急性・機会損失
- 信頼感情: 安心・権威・専門性

## 3. ビジュアル階層・情報設計
### 視線誘導設計
- Zパターン・Fパターン活用
- 重要情報の優先表示
- CTA への自然な誘導

### 情報密度最適化
- 認知負荷軽減
- 段階的情報開示
- ビジュアル・テキストバランス

## 4. A/Bテストビジュアル戦略
### テスト優先順位
1. メインビジュアル・ヒーローイメージ
2. CTA ボタン・アクション要素
3. カラースキーム・配色
4. レイアウト・情報構成
5. フォント・タイポグラフィ

### バリエーション設計
- 系統的バリエーション
- 仮説ベース設計
- 測定可能な差異

## 5. ブランド×CV統合最適化
### ブランド一貫性維持
- ブランド要素の効果的配置
- CV優先度との調和
- ブランド認知とCV両立

### 差別化ビジュアル戦略
- 競合との差別化
- 独自性・記憶性
- ブランド価値伝達

## 6. 実装ロードマップ
### 短期（1-2ヶ月）
- 高インパクト要素から実装
- A/Bテスト開始
- 初期効果測定

### 中期（3-6ヶ月）
- 全面的ビジュアル最適化
- ファネル統合最適化
- パーソナライゼーション

### 長期（6-12ヶ月）
- ブランド進化統合
- AI活用最適化
- 継続的改善システム

包括的で実践的なCV最適化ビジュアル戦略を策定してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'cv_visual_strategy',
      strategy: response,
      colorStrategy: this.extractColorStrategy(response),
      visualHierarchy: this.extractVisualHierarchy(response),
      funnelStrategy: this.extractFunnelStrategy(response),
      abTestPlan: this.extractABTestPlan(response),
      implementationRoadmap: this.extractImplementationRoadmap(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async planCreativeCampaign(input: CVCreativeDirectorTaskInput) {
    const prompt = `
CV最適化に特化したクリエイティブキャンペーンを企画してください。

# キャンペーン企画要求

## 1. キャンペーン戦略設計
### 統合キャンペーン戦略
- キャンペーン目的・目標設定
- ターゲットオーディエンス設定
- メッセージ戦略・ポジショニング
- チャネル統合戦略

### CV最適化アプローチ
- ファネル段階別アプローチ
- タッチポイント最適化
- クロスチャネル連携
- パーソナライゼーション戦略

## 2. クリエイティブコンセプト開発
### メインコンセプト
- 中心的なビジュアルコンセプト
- ストーリーテリング戦略
- 感情的つながり設計
- ブランド統合方法

### バリエーション戦略
- オーディエンスセグメント別
- チャネル特性別
- ファネル段階別
- A/Bテスト用バリエーション

## 3. マルチチャネル展開計画
### チャネル別クリエイティブ
- ディスプレイ広告
- ソーシャルメディア
- 検索エンジン
- メール・CRM
- オウンドメディア

### フォーマット最適化
- 静止画・動画・インタラクティブ
- 各プラットフォーム仕様対応
- レスポンシブ対応
- アクセシビリティ配慮

## 4. CV測定・最適化計画
### KPI・測定指標
- 各段階のCV指標
- 質的・量的指標
- リアルタイム監視指標
- 長期的成果指標

### 最適化サイクル
- 初期測定・分析
- 仮説立案・検証
- 改善実装
- 継続監視・調整

効果的なCV最適化クリエイティブキャンペーンを企画してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'creative_campaign_plan',
      campaign: response,
      concepts: this.extractCreativeConcepts(response),
      channelPlan: this.extractChannelPlan(response),
      timeline: this.extractCampaignTimeline(response),
      budget: this.extractBudgetAllocation(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designABCreatives(input: CVCreativeDirectorTaskInput) {
    const prompt = `
CV向上のためのA/Bテストクリエイティブを設計してください。

# A/Bテストクリエイティブ設計要求

## 1. テスト戦略設計
### テスト優先順位
1. 高インパクト要素から順位付け
2. 実装容易性考慮
3. 測定可能性確保
4. ビジネスインパクト評価

### 仮説設定
- 各テストの仮説明確化
- 期待効果の定量化
- 成功・失敗判定基準
- リスク・機会評価

## 2. ビジュアル要素テスト設計
### メインビジュアル
- 商品中心 vs ライフスタイル
- 人物あり vs 商品のみ
- リアル写真 vs イラスト
- 明るいトーン vs シリアストーン

### カラーテスト
- CTA ボタンカラー
- 背景カラー
- アクセントカラー
- カラーコンビネーション

### レイアウトテスト
- 情報配置パターン
- 視線誘導順序
- 余白・密度バランス
- モバイル・デスクトップ最適化

## 3. コピー・メッセージテスト
### ヘッドライン
- ベネフィット型 vs 機能型
- 感情訴求 vs 論理訴求
- 短文 vs 詳細説明
- 緊急性あり vs なし

### CTA テキスト
- アクション型 vs 結果型
- 具体的 vs 抽象的
- パーソナル vs 一般的
- 緊急性表現バリエーション

## 4. フォーマット・インタラクションテスト
### フォーマット
- 静止画 vs 動画 vs アニメーション
- シングルイメージ vs カルーセル
- インタラクティブ要素あり vs なし

### ユーザーエクスペリエンス
- ランディングページ直結 vs 中間ページ
- フォーム段数・項目数
- 読み込み速度最適化
- モバイル操作性

## 5. テスト実装・測定計画
### テスト設計
- サンプルサイズ計算
- テスト期間設定
- 統計的有意性確保
- セグメント別分析

### 測定・分析
- プライマリKPI・セカンダリKPI
- ファネル分析
- セグメント別パフォーマンス
- 質的フィードバック収集

科学的で実装可能なA/Bテストクリエイティブ設計を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'ab_creative_design',
      testPlan: response,
      testVariations: this.extractTestVariations(response),
      hypotheses: this.extractTestHypotheses(response),
      measurementPlan: this.extractMeasurementPlan(response),
      timeline: this.extractTestTimeline(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designFunnelCreatives(input: CVCreativeDirectorTaskInput) {
    const prompt = `
コンバージョンファネル各段階に最適化されたクリエイティブを設計してください。

# ファネル別クリエイティブ設計要求

## 1. ファネル段階別戦略
### AWARENESS（認知・注目）
- 目的: ブランド認知・注目獲得
- クリエイティブ特性: インパクト・記憶性重視
- 測定指標: リーチ・インプレッション・ブランド認知率

### INTEREST（興味・関心）
- 目的: 興味喚起・情報提供
- クリエイティブ特性: 価値提案・ベネフィット訴求
- 測定指標: エンゲージメント・サイト滞在時間

### CONSIDERATION（比較検討）
- 目的: 比較検討・信頼構築
- クリエイティブ特性: 差別化・証明・詳細情報
- 測定指標: ページ深度・資料DL・比較行動

### INTENT（購買意向）
- 目的: 購買意向・緊急性創出
- クリエイティブ特性: 緊急性・限定性・オファー
- 測定指標: カート追加・問い合わせ・見積依頼

### ACTION（行動・購入）
- 目的: 最終行動・コンバージョン
- クリエイティブ特性: 摩擦軽減・安心感・後押し
- 測定指標: 購入・申込・CV完了

### RETENTION（継続・推奨）
- 目的: リピート・アップセル・推奨
- クリエイティブ特性: 満足感・コミュニティ・価値拡張
- 測定指標: リピート率・LTV・NPS

## 2. 段階別クリエイティブ要素
### ビジュアル戦略
- 各段階の視覚的アプローチ
- 感情の変化に対応
- ブランド一貫性維持
- 段階間の自然な移行

### メッセージ戦略
- 段階別メッセージ
- 情報深度の調整
- CTA の進化
- パーソナライゼーション

### フォーマット最適化
- 段階別最適フォーマット
- インタラクション設計
- 情報密度調整
- デバイス最適化

## 3. ファネル統合最適化
### 一貫性・連続性
- ブランド・メッセージ一貫性
- ビジュアル連続性
- ユーザー体験統合
- データ引継ぎ・活用

### 段階間移行最適化
- 自然な移行促進
- 摩擦軽減施策
- リターゲティング戦略
- 放棄防止施策

効果的なファネル別クリエイティブ戦略を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'funnel_creatives',
      funnelStrategy: response,
      stageCreatives: this.extractStageCreatives(response),
      transitionStrategy: this.extractTransitionStrategy(response),
      integrationPlan: this.extractIntegrationPlan(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async optimizeBrandForCV(input: CVCreativeDirectorTaskInput) {
    const prompt = `
ブランドアイデンティティとCV最適化を両立させる戦略を設計してください。

# ブランド×CV最適化要求

## 1. ブランド・CV統合戦略
### バランス設計
- ブランド価値の維持
- CV効果の最大化
- 短期・長期バランス
- ステークホルダー満足

### 統合アプローチ
- ブランドメッセージ×CV訴求
- ブランドビジュアル×CV最適化
- ブランド体験×コンバージョン体験
- ブランド信頼×購買安心

## 2. ブランド要素CV最適化
### ビジュアルアイデンティティ
- ロゴ配置・サイズ最適化
- カラーパレットCV活用
- タイポグラフィCV効果
- ブランド写真・イラスト

### ブランドメッセージ
- ブランド価値のCV訴求変換
- ブランドストーリー活用
- ブランドパーソナリティ表現
- 差別化要素強化

## 3. 信頼性・権威性構築
### ブランド信頼要素
- 実績・歴史の効果的提示
- 専門性・権威性の証明
- 社会的証明・推奨
- 品質保証・アフターサポート

### CV転換信頼施策
- 顧客事例・成功体験
- 専門家推奨・メディア掲載
- 認証・受賞歴
- 透明性・オープンネス

ブランド価値を維持しながらCV効果を最大化する戦略を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'brand_cv_optimization',
      strategy: response,
      brandIntegration: this.extractBrandIntegration(response),
      trustBuilding: this.extractTrustBuilding(response),
      balanceFramework: this.extractBalanceFramework(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designMultiChannelCreatives(input: CVCreativeDirectorTaskInput) {
    const prompt = `
マルチチャネル統合クリエイティブ戦略を設計してください。

# マルチチャネルクリエイティブ要求

${input.channelRequirements ? `
# チャネル要求仕様
${input.channelRequirements.map(channel => `
## ${channel.channel}
- フォーマット: ${channel.formats.join(', ')}
- 仕様: ${Object.entries(channel.specifications).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`).join(', ')}
- ガイドライン: ${channel.contentGuidelines.join(', ')}
- ベストプラクティス: ${channel.bestPractices.join(', ')}
`).join('')}
` : ''}

## 1. チャネル統合戦略
### 統合メッセージ戦略
- コアメッセージ一貫性
- チャネル別最適化
- ユーザージャーニー統合
- ブランド体験統一

### ビジュアル統合戦略
- ブランドアイデンティティ統一
- チャネル特性対応
- フォーマット最適化
- 技術仕様対応

## 2. チャネル別最適化
### ディスプレイ・バナー広告
- 視覚的インパクト重視
- クリック誘導最適化
- フォーマットバリエーション
- リターゲティング対応

### ソーシャルメディア
- プラットフォーム特性活用
- エンゲージメント最適化
- シェア・拡散考慮
- コミュニティ形成

### 検索エンジン
- 検索意図対応
- ランディング連携
- 品質スコア最適化
- モバイル対応

### メール・CRM
- パーソナライゼーション
- セグメント別最適化
- A/Bテスト対応
- 自動化対応

### オウンドメディア
- SEO最適化
- ユーザー体験重視
- コンバージョン導線
- コンテンツマーケティング

## 3. クロスチャネル最適化
### ユーザージャーニー設計
- タッチポイント最適化
- チャネル間連携
- データ活用・引継ぎ
- パーソナライゼーション

### 効果測定・最適化
- 統合効果測定
- チャネル貢献度分析
- アトリビューション設計
- ROAS最適化

効果的なマルチチャネルクリエイティブ戦略を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'multi_channel_creatives',
      strategy: response,
      channelOptimization: this.extractChannelOptimization(response),
      integrationPlan: this.extractChannelIntegrationPlan(response),
      crossChannelStrategy: this.extractCrossChannelStrategy(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async analyzeCreativePerformance(input: CVCreativeDirectorTaskInput) {
    const prompt = `
クリエイティブパフォーマンスの包括的分析と改善提案を行ってください。

# 現在のパフォーマンスデータ
${input.currentPerformance ? `
## キャンペーンパフォーマンス
${input.currentPerformance.campaigns.map(campaign => `
### ${campaign.name}
- 目的: ${campaign.objective}
- プラットフォーム: ${campaign.platform}
- オーディエンス: ${campaign.audience}
- インプレッション: ${campaign.metrics.impressions.toLocaleString()}
- クリック数: ${campaign.metrics.clicks.toLocaleString()}
- コンバージョン: ${campaign.metrics.conversions.toLocaleString()}
- CTR: ${campaign.metrics.ctr}%
- CVR: ${campaign.metrics.cvr}%
- CPA: ${campaign.metrics.cpa.toLocaleString()}円
- ROAS: ${campaign.metrics.roas}
- クリエイティブ要素:
  - ビジュアル: ${campaign.creativeElements.visual}
  - ヘッドライン: ${campaign.creativeElements.headline}
  - CTA: ${campaign.creativeElements.cta}
  - フォーマット: ${campaign.creativeElements.format}
`).join('')}

## トップパフォーマンスクリエイティブ
${input.currentPerformance.topPerformingCreatives.map(asset => `
### ${asset.id} (${asset.type})
- プラットフォーム: ${asset.platform}
- オーディエンス: ${asset.audience}
- CTR: ${asset.performance.ctr}%
- CVR: ${asset.performance.cvr}%
- エンゲージメント: ${asset.performance.engagement}%
- シェア率: ${asset.performance.shareability}%
- 要素:
  - ビジュアル: ${asset.elements.visual}
  - コピー: ${asset.elements.copy}
  - CTA: ${asset.elements.cta}
  - フォーマット: ${asset.elements.format}
`).join('')}

## パフォーマンス不振要素
${input.currentPerformance.underperformingElements.join(', ')}

## 既存インサイト
${input.currentPerformance.insights.map(insight => `
- カテゴリ: ${insight.category}
- インサイト: ${insight.insight}
- 影響: ${insight.impact}
- 推奨事項: ${insight.recommendation}
- 信頼度: ${insight.confidence}%
`).join('')}
` : ''}

# パフォーマンス分析要求

## 1. 包括的パフォーマンス分析
### 量的分析
- 各指標の詳細分析（CTR, CVR, CPA, ROAS等）
- トレンド分析・時系列変化
- セグメント別パフォーマンス
- チャネル・プラットフォーム別分析

### 質的分析
- クリエイティブ要素別効果分析
- ユーザー反応・フィードバック分析
- ブランド認知・好感度影響
- 競合比較・ベンチマーク

## 2. 成功要因・失敗要因分析
### 成功パターン特定
- 高パフォーマンスクリエイティブの共通点
- 効果的なビジュアル・コピー要素
- 成功チャネル・オーディエンス特性
- 成功タイミング・コンテキスト

### 失敗パターン特定
- 低パフォーマンス要因
- 避けるべき要素・アプローチ
- 改善機会・ポテンシャル
- リスク要因・注意点

## 3. 改善提案・最適化戦略
### 短期改善（1-4週間）
- 即座に実装可能な改善
- A/Bテスト推奨項目
- 予算再配分提案
- クリエイティブローテーション

### 中期戦略（1-3ヶ月）
- 新クリエイティブ開発方向性
- チャネル戦略見直し
- オーディエンス戦略最適化
- テクノロジー・ツール活用

### 長期戦略（3-12ヶ月）
- ブランド・クリエイティブ進化
- 新チャネル・フォーマット探索
- AI・自動化活用拡大
- 組織・プロセス改善

## 4. 予測・シミュレーション
### パフォーマンス予測
- 改善施策効果予測
- ROI・ROAS改善見込み
- リスク・機会評価
- 投資優先順位

### シナリオ分析
- ベストケース・ワーストケース
- 予算増減シナリオ
- 競合動向影響シナリオ
- 市場変化対応シナリオ

実用的で実装可能な分析・改善提案を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'creative_performance_analysis',
      analysis: response,
      successFactors: this.extractSuccessFactors(response),
      improvements: this.extractImprovements(response),
      predictions: this.extractPredictions(response),
      recommendations: this.extractRecommendations(response),
      timestamp: new Date().toISOString(),
    };
  }

  // Helper methods for extracting structured data
  private extractColorStrategy(response: string): any {
    return {}; // Implement color strategy extraction
  }

  private extractVisualHierarchy(response: string): any {
    return {}; // Implement visual hierarchy extraction
  }

  private extractFunnelStrategy(response: string): any {
    return {}; // Implement funnel strategy extraction
  }

  private extractABTestPlan(response: string): any {
    return {}; // Implement A/B test plan extraction
  }

  private extractImplementationRoadmap(response: string): any {
    return {}; // Implement implementation roadmap extraction
  }

  private extractCreativeConcepts(response: string): any[] {
    return []; // Implement creative concepts extraction
  }

  private extractChannelPlan(response: string): any {
    return {}; // Implement channel plan extraction
  }

  private extractCampaignTimeline(response: string): any {
    return {}; // Implement campaign timeline extraction
  }

  private extractBudgetAllocation(response: string): any {
    return {}; // Implement budget allocation extraction
  }

  private extractTestVariations(response: string): any[] {
    return []; // Implement test variations extraction
  }

  private extractTestHypotheses(response: string): any[] {
    return []; // Implement test hypotheses extraction
  }

  private extractMeasurementPlan(response: string): any {
    return {}; // Implement measurement plan extraction
  }

  private extractTestTimeline(response: string): any {
    return {}; // Implement test timeline extraction
  }

  private extractStageCreatives(response: string): any {
    return {}; // Implement stage creatives extraction
  }

  private extractTransitionStrategy(response: string): any {
    return {}; // Implement transition strategy extraction
  }

  private extractIntegrationPlan(response: string): any {
    return {}; // Implement integration plan extraction
  }

  private extractBrandIntegration(response: string): any {
    return {}; // Implement brand integration extraction
  }

  private extractTrustBuilding(response: string): any {
    return {}; // Implement trust building extraction
  }

  private extractBalanceFramework(response: string): any {
    return {}; // Implement balance framework extraction
  }

  private extractChannelOptimization(response: string): any {
    return {}; // Implement channel optimization extraction
  }

  private extractChannelIntegrationPlan(response: string): any {
    return {}; // Implement channel integration plan extraction
  }

  private extractCrossChannelStrategy(response: string): any {
    return {}; // Implement cross channel strategy extraction
  }

  private extractSuccessFactors(response: string): any[] {
    return []; // Implement success factors extraction
  }

  private extractImprovements(response: string): any[] {
    return []; // Implement improvements extraction
  }

  private extractPredictions(response: string): any {
    return {}; // Implement predictions extraction
  }

  private extractRecommendations(response: string): any[] {
    return []; // Implement recommendations extraction
  }
}