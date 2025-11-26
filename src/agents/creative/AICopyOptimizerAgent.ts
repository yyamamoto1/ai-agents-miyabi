/**
 * AICopyOptimizerAgent - CV特化コピーライティング最適化の専門家
 * コンバージョン率向上に特化したコピーライティング・メッセージ最適化を実行
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface CopyOptimizerTaskInput {
  taskType:
    | 'headline-optimization'
    | 'value-proposition-creation'
    | 'emotional-trigger-optimization'
    | 'benefit-messaging'
    | 'urgency-scarcity-creation'
    | 'social-proof-copy'
    | 'cta-optimization';
  targetAudience?: TargetAudience;
  product?: ProductInfo;
  currentCopy?: CurrentCopy;
  conversionGoal?: ConversionGoal;
  competitorCopy?: string[];
  abTestParameters?: ABTestParameters;
}

export interface TargetAudience {
  segment: string;
  demographics: {
    ageRange: string;
    gender?: string;
    income: string;
    education: string;
    location?: string[];
  };
  psychographics: {
    painPoints: string[];
    desires: string[];
    values: string[];
    fears: string[];
    motivations: string[];
  };
  behavior: {
    decisionMaking: 'emotional' | 'logical' | 'mixed';
    purchaseProcess: 'impulse' | 'research' | 'committee';
    communicationStyle: 'casual' | 'professional' | 'technical';
    preferredTone: string[];
  };
  objections: string[];
  triggers: string[];
}

export interface ProductInfo {
  name: string;
  category: string;
  industry: string;
  priceRange: string;
  features: string[];
  benefits: string[];
  uniqueValue: string;
  competitors: string[];
  testimonials?: string[];
  guarantees?: string[];
}

export interface CurrentCopy {
  headline?: string;
  subheadline?: string;
  valueProposition?: string;
  bodyText?: string[];
  cta?: string;
  currentCVR?: number;
  performanceData?: PerformanceData;
}

export interface PerformanceData {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
  engagementMetrics: {
    timeOnPage: number;
    scrollDepth: number;
    bounceRate: number;
  };
}

export interface ConversionGoal {
  primary: string;
  secondary?: string[];
  targetCVR: number;
  targetAudience: string;
  timeframe: string;
}

export interface ABTestParameters {
  testType: 'headline' | 'value-prop' | 'cta' | 'full-page';
  variants: number;
  duration: string;
  trafficSplit: number;
  successMetric: string;
}

export class AICopyOptimizerAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS['copy-optimizer'] || {
      name: 'AI Copy Optimizer',
      description: 'CV特化コピーライティング最適化の専門家として、感情トリガー・ベネフィット・緊急性を駆使してコンバージョン率を最大化',
      capabilities: [
        'CV特化ヘッドライン最適化',
        '価値提案メッセージ作成',
        '感情トリガー最適化',
        'ベネフィット明確化',
        '緊急性・希少性表現',
        'ソーシャルプルーフ活用',
        'CTA最適化'
      ],
      model: 'claude-3.5-sonnet',
      temperature: 0.4,
      maxTokens: 4000,
    };
    super(config);
  }

  async executeTask(task: AgentTask): Promise<any> {
    const input = task.input as CopyOptimizerTaskInput;
    
    switch (input.taskType) {
      case 'headline-optimization':
        return this.optimizeHeadline(input);
      case 'value-proposition-creation':
        return this.createValueProposition(input);
      case 'emotional-trigger-optimization':
        return this.optimizeEmotionalTriggers(input);
      case 'benefit-messaging':
        return this.createBenefitMessaging(input);
      case 'urgency-scarcity-creation':
        return this.createUrgencyScarcity(input);
      case 'social-proof-copy':
        return this.createSocialProofCopy(input);
      case 'cta-optimization':
        return this.optimizeCTA(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  private async optimizeHeadline(input: CopyOptimizerTaskInput) {
    const prompt = `
あなたはCV特化のコピーライティング専門家です。コンバージョン率を最大化するヘッドラインを作成してください。

# ターゲット情報
${input.targetAudience ? `
## ターゲットオーディエンス
- セグメント: ${input.targetAudience.segment}
- 年齢層: ${input.targetAudience.demographics.ageRange}
- 年収: ${input.targetAudience.demographics.income}

### 課題・ニーズ
- 痛み: ${input.targetAudience.psychographics.painPoints.join(', ')}
- 欲求: ${input.targetAudience.psychographics.desires.join(', ')}
- 恐れ: ${input.targetAudience.psychographics.fears.join(', ')}
- 動機: ${input.targetAudience.psychographics.motivations.join(', ')}

### 反対意見・懸念
${input.targetAudience.objections.join(', ')}

### 行動トリガー
${input.targetAudience.triggers.join(', ')}
` : ''}

# 商品情報
${input.product ? `
- 商品名: ${input.product.name}
- カテゴリ: ${input.product.category}
- 価格帯: ${input.product.priceRange}
- 主要機能: ${input.product.features.join(', ')}
- 主要ベネフィット: ${input.product.benefits.join(', ')}
- 独自価値: ${input.product.uniqueValue}
` : ''}

# 現在のパフォーマンス
${input.currentCopy ? `
- 現在ヘッドライン: "${input.currentCopy.headline}"
- 現在CVR: ${input.currentCopy.currentCVR}%
` : ''}

# CV目標
${input.conversionGoal ? `
- 主要目標: ${input.conversionGoal.primary}
- 目標CVR: ${input.conversionGoal.targetCVR}%
` : ''}

# ヘッドライン最適化要求

## 1. パフォーマンス予測付きヘッドライン（10パターン）
各ヘッドラインで以下を提供：
- ヘッドライン文言
- 使用心理トリガー（恐怖、欲求、社会証明、権威、希少性、など）
- 予想CVR（現在比）
- 強み・特徴
- 最適なターゲット層

## 2. カテゴリ別最適化
### A. 感情訴求型（4パターン）
感情に強く訴える表現

### B. 理性訴求型（3パターン）
論理的・合理的な表現

### C. ベネフィット直球型（3パターン）
ベネフィットを直接的に表現

## 3. A/Bテスト設計
- 推奨テスト組み合わせ
- テスト期間・サンプルサイズ
- 勝利判定基準
- リスク評価

## 4. サブヘッドライン連携
各メインヘッドラインに最適なサブヘッドライン

心理学とマーケティング科学に基づいた実証的なヘッドラインを作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'headline_optimization',
      optimizedHeadlines: this.extractOptimizedHeadlines(response),
      performancePredictions: this.extractPerformancePredictions(response),
      abTestRecommendations: this.extractABTestRecommendations(response),
      psychologicalTriggers: this.extractPsychologicalTriggers(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createValueProposition(input: CopyOptimizerTaskInput) {
    const prompt = `
CV最大化のための価値提案（Value Proposition）を作成してください。

# ターゲット・商品情報
${this.formatTargetAndProduct(input)}

# 競合情報
${input.competitorCopy ? `競合メッセージ: ${input.competitorCopy.join(', ')}` : ''}

# 価値提案作成要求

## 1. 核となる価値提案（3パターン）
各パターンで：
- コアメッセージ（1行）
- 詳細説明（2-3行）
- 差別化ポイント
- 証拠・裏付け
- ターゲット層

## 2. ベネフィト階層設計
### 機能的ベネフィット
商品の具体的機能・効果

### 感情的ベネフィット
心理的満足・感情的価値

### 社会的ベネフィット
社会的地位・承認欲求

## 3. 痛み解決型メッセージ
主要な痛みポイント別：
- 痛みの明確化
- 解決方法の提示
- 結果の約束
- 証拠の提示

## 4. 欲求実現型メッセージ
主要な欲求別：
- 欲求の増幅
- 実現方法の提示
- 未来の描写
- 今すぐ行動の理由

## 5. USP（Unique Selling Proposition）
- 独自性の明確化
- 競合との差別化
- 覚えやすいフレーズ化
- 証明可能な要素

具体的で説得力のある価値提案を作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'value_proposition',
      valuePropositions: this.extractValuePropositions(response),
      benefitHierarchy: this.extractBenefitHierarchy(response),
      uniqueSellingPoints: this.extractUSPs(response),
      messageVariations: this.extractMessageVariations(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async optimizeEmotionalTriggers(input: CopyOptimizerTaskInput) {
    const prompt = `
CV向上のための感情トリガー最適化を実行してください。

# ターゲット心理分析
${input.targetAudience ? `
## 感情プロファイル
- 恐れ: ${input.targetAudience.psychographics.fears.join(', ')}
- 欲求: ${input.targetAudience.psychographics.desires.join(', ')}
- 価値観: ${input.targetAudience.psychographics.values.join(', ')}
- 動機: ${input.targetAudience.psychographics.motivations.join(', ')}

## 行動パターン
- 意思決定: ${input.targetAudience.behavior.decisionMaking}
- 購買プロセス: ${input.targetAudience.behavior.purchaseProcess}
- コミュニケーション: ${input.targetAudience.behavior.communicationStyle}
` : ''}

# 感情トリガー最適化要求

## 1. 主要感情トリガー分析（心理学ベース）
### Fear-Based Triggers（恐怖訴求）
- 現状維持の恐怖
- 機会損失の恐怖
- 競合に遅れる恐怖
- 失敗・後悔の恐怖

### Desire-Based Triggers（欲求訴求）
- 成功・達成欲求
- 承認・地位欲求
- 快適・便利欲求
- 変化・成長欲求

### Social Triggers（社会的証明）
- 権威性
- 人気・トレンド
- 仲間意識
- 社会貢献

## 2. トリガー別コピー作成（各5パターン）
各感情トリガーに対応した：
- キャッチフレーズ
- ボディコピー
- CTA連携
- 視覚的要素との組み合わせ

## 3. 感情の流れ設計（エモーショナルジャーニー）
- ATTENTION（注意喚起）
- INTEREST（興味関心）
- DESIRE（欲求喚起）
- ACTION（行動促進）

各段階での感情変化と最適メッセージ

## 4. ネガティブ感情の転換
- 不安 → 安心
- 諦め → 希望
- 疑い → 信頼
- 面倒 → 簡単

転換メッセージとタイミング

## 5. 感情測定・検証方法
- 感情反応の測定指標
- A/Bテスト設計
- フィードバック収集
- 最適化サイクル

実証的で効果的な感情トリガーを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'emotional_trigger_optimization',
      emotionalTriggers: this.extractEmotionalTriggers(response),
      emotionalJourney: this.extractEmotionalJourney(response),
      copyVariations: this.extractCopyVariations(response),
      measurementPlan: this.extractMeasurementPlan(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createBenefitMessaging(input: CopyOptimizerTaskInput) {
    const prompt = `
CV最大化のためのベネフィットメッセージングを作成してください。

# 商品・サービス情報
${this.formatTargetAndProduct(input)}

# ベネフィットメッセージング要求

## 1. ベネフィット変換（Feature → Benefit）
各機能を強力なベネフィットに変換：
- 機能の明確化
- ユーザーへの影響
- 具体的な価値
- 感情的な意味
- 証拠・事例

## 2. 階層別ベネフィット設計
### レベル1: 直接的ベネフィット
機能から直接得られる利益

### レベル2: 間接的ベネフィット
直接的ベネフィットから派生する価値

### レベル3: 究極的ベネフィット
最終的に実現される理想状態

## 3. ターゲット別カスタマイズ
主要ターゲット層ごとに：
- 重要視するベネフィット
- 響くメッセージトーン
- 証明方法
- 表現スタイル

## 4. 競合比較ベネフィット
- 独自ベネフィット
- 相対優位性
- 差別化メッセージ
- 競合の弱み攻略

## 5. ベネフィット証明戦略
- 数値・データ証明
- 事例・体験談
- 専門家推奨
- 比較実証
- 保証・約束

## 6. メッセージング優先順位
- インパクト順ランキング
- 信頼性評価
- 実装難易度
- 測定可能性

実用的で説得力のあるベネフィットメッセージを作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'benefit_messaging',
      benefitHierarchy: this.extractBenefitHierarchy(response),
      targetCustomization: this.extractTargetCustomization(response),
      competitiveBenefits: this.extractCompetitiveBenefits(response),
      proofStrategy: this.extractProofStrategy(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createUrgencyScarcity(input: CopyOptimizerTaskInput) {
    const prompt = `
CV向上のための緊急性・希少性メッセージを作成してください。

# ビジネス・商品情報
${this.formatTargetAndProduct(input)}

# 緊急性・希少性作成要求

## 1. 緊急性メッセージ（Urgency）
### 時間制限型
- 期間限定オファー
- タイムセール
- 申込締切
- 早期割引

### 機会損失型
- 先着順限定
- 今だけ特典
- 値上がり前
- 在庫僅少

各パターンで：
- メッセージ文言
- タイムライン設定
- 視覚的表現
- フォローアップ

## 2. 希少性メッセージ（Scarcity）
### 数量限定型
- 限定版・特別版
- 先着○名様
- 残り僅か
- 完売御礼

### 排他性型
- 会員限定
- 紹介者限定
- 条件限定
- 地域限定

## 3. 心理トリガー活用
### FOMO (Fear of Missing Out)
機会損失への恐怖

### Social Proof + Scarcity
他者の行動と希少性の組み合わせ

### Authority + Urgency
権威性と緊急性の相乗効果

## 4. 倫理的配慮
- 虚偽情報の回避
- 実際の制約に基づく設定
- 顧客信頼の維持
- 長期関係への配慮

## 5. 効果測定・最適化
- インパクト測定指標
- 副作用監視
- タイミング最適化
- メッセージ調整

## 6. チャネル別展開
- ランディングページ
- 広告コピー
- メールマーケティング
- SNS投稿

効果的で倫理的な緊急性・希少性メッセージを作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'urgency_scarcity',
      urgencyMessages: this.extractUrgencyMessages(response),
      scarcityMessages: this.extractScarcityMessages(response),
      psychologicalTriggers: this.extractPsychologicalTriggers(response),
      ethicalGuidelines: this.extractEthicalGuidelines(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async createSocialProofCopy(input: CopyOptimizerTaskInput) {
    const prompt = `
CV向上のためのソーシャルプルーフコピーを作成してください。

# 利用可能な社会的証明要素
${input.product?.testimonials ? `顧客の声: ${input.product.testimonials.join(', ')}` : ''}
${input.currentCopy?.performanceData ? `実績データ: CVR ${input.currentCopy.performanceData.cvr}%` : ''}

# ソーシャルプルーフコピー要求

## 1. ソーシャルプルーフタイプ別作成
### Expert Social Proof（専門家証明）
- 業界専門家の推奨
- 有名人・インフルエンサー
- メディア掲載・受賞歴
- 専門機関認定

### User Social Proof（ユーザー証明）
- 利用者数・実績数
- 満足度・評価スコア
- 継続利用率
- リピート率

### Wisdom of Crowds（群衆の知恵）
- 人気ランキング
- ベストセラー
- 選ばれている理由
- トレンド情報

### Wisdom of Friends（友人の知恵）
- 紹介経由率
- 友人推奨率
- 口コミ評価
- SNS共有数

## 2. 証明レベル別メッセージ
### ハイインパクト証明
数値・データ重視の強力な証明

### ミドルインパクト証明
バランス型の信頼性証明

### ソフト証明
自然で親しみやすい証明

## 3. 配置・表現最適化
- ヘッドライン連携
- 視覚的デザイン
- 配置タイミング
- 情報の詳細度

## 4. 信頼性確保
- 事実確認・検証
- 具体性・詳細性
- 最新性・関連性
- 透明性・誠実性

## 5. A/Bテスト設計
- テスト要素特定
- 測定指標設定
- 期間・サンプル設計
- 勝利判定基準

効果的で信頼性の高いソーシャルプルーフコピーを作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'social_proof_copy',
      socialProofTypes: this.extractSocialProofTypes(response),
      trustElements: this.extractTrustElements(response),
      placementStrategy: this.extractPlacementStrategy(response),
      credibilityFramework: this.extractCredibilityFramework(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async optimizeCTA(input: CopyOptimizerTaskInput) {
    const prompt = `
CV最大化のためのCTA（Call to Action）最適化を実行してください。

# ターゲット・目標情報
${this.formatTargetAndProduct(input)}

${input.conversionGoal ? `CV目標: ${input.conversionGoal.primary}` : ''}

# CTA最適化要求

## 1. CTA文言最適化（各5パターン）
### アクション動詞最適化
- 強いアクション動詞
- 感情的動詞
- 具体的動詞
- 緊急性動詞

### ベネフィット連携型
- 行動+ベネフィット
- 結果約束型
- 価値提案型
- 問題解決型

### パーソナライゼーション型
- ターゲット特化
- 感情的つながり
- 個人化表現
- 共感型

## 2. 心理的原理活用
### 損失回避
- 機会損失防止
- リスク軽減
- 保証・安心

### 社会的証明
- 他者の行動示唆
- 人気・選択実績
- 推奨・支持

### 権威性
- 専門家推奨
- 実績・権威
- 信頼性強調

## 3. CTA設計要素
### 言語的要素
- 文言・文字数
- トーン・文体
- 感情的強度
- 緊急性表現

### 視覚的要素
- ボタンデザイン
- 色彩選択
- サイズ・配置
- 視覚的階層

### 機能的要素
- 遷移先設計
- フォーム最適化
- 入力項目削減
- 完了フロー

## 4. マイクロCTA戦略
- 段階的コミットメント
- 小さなYes積み重ね
- 心理的ハードル下げ
- 進捗可視化

## 5. A/Bテスト戦略
### テスト優先順位
1. 文言バリエーション
2. 色・デザイン
3. 配置・サイズ
4. 数・組み合わせ

### 測定指標
- クリック率
- コンバージョン率
- 完了率
- ユーザー行動分析

効果的で説得力のあるCTA最適化案を作成してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'cta_optimization',
      ctaVariations: this.extractCTAVariations(response),
      psychologicalPrinciples: this.extractPsychologicalPrinciples(response),
      designRecommendations: this.extractDesignRecommendations(response),
      testingStrategy: this.extractTestingStrategy(response),
      timestamp: new Date().toISOString(),
    };
  }

  // Helper methods for data formatting
  private formatTargetAndProduct(input: CopyOptimizerTaskInput): string {
    let formatted = '';
    
    if (input.targetAudience) {
      formatted += `
## ターゲットオーディエンス
- セグメント: ${input.targetAudience.segment}
- 年齢: ${input.targetAudience.demographics.ageRange}
- 年収: ${input.targetAudience.demographics.income}
- 痛み: ${input.targetAudience.psychographics.painPoints.join(', ')}
- 欲求: ${input.targetAudience.psychographics.desires.join(', ')}
`;
    }
    
    if (input.product) {
      formatted += `
## 商品情報
- 商品名: ${input.product.name}
- カテゴリ: ${input.product.category}
- 価格帯: ${input.product.priceRange}
- 主要機能: ${input.product.features.join(', ')}
- ベネフィット: ${input.product.benefits.join(', ')}
- 独自価値: ${input.product.uniqueValue}
`;
    }
    
    return formatted;
  }

  // Helper methods for extracting structured data
  private extractOptimizedHeadlines(response: string): any[] {
    // Implementation for extracting optimized headlines
    return [];
  }

  private extractPerformancePredictions(response: string): any {
    // Implementation for extracting performance predictions
    return {};
  }

  private extractABTestRecommendations(response: string): any[] {
    // Implementation for extracting A/B test recommendations
    return [];
  }

  private extractPsychologicalTriggers(response: string): string[] {
    // Implementation for extracting psychological triggers
    return [];
  }

  private extractValuePropositions(response: string): any[] {
    // Implementation for extracting value propositions
    return [];
  }

  private extractBenefitHierarchy(response: string): any {
    // Implementation for extracting benefit hierarchy
    return {};
  }

  private extractUSPs(response: string): string[] {
    // Implementation for extracting USPs
    return [];
  }

  private extractMessageVariations(response: string): any[] {
    // Implementation for extracting message variations
    return [];
  }

  private extractEmotionalTriggers(response: string): any[] {
    // Implementation for extracting emotional triggers
    return [];
  }

  private extractEmotionalJourney(response: string): any {
    // Implementation for extracting emotional journey
    return {};
  }

  private extractCopyVariations(response: string): any[] {
    // Implementation for extracting copy variations
    return [];
  }

  private extractMeasurementPlan(response: string): any {
    // Implementation for extracting measurement plan
    return {};
  }

  private extractTargetCustomization(response: string): any {
    // Implementation for extracting target customization
    return {};
  }

  private extractCompetitiveBenefits(response: string): any[] {
    // Implementation for extracting competitive benefits
    return [];
  }

  private extractProofStrategy(response: string): any {
    // Implementation for extracting proof strategy
    return {};
  }

  private extractUrgencyMessages(response: string): any[] {
    // Implementation for extracting urgency messages
    return [];
  }

  private extractScarcityMessages(response: string): any[] {
    // Implementation for extracting scarcity messages
    return [];
  }

  private extractEthicalGuidelines(response: string): string[] {
    // Implementation for extracting ethical guidelines
    return [];
  }

  private extractSocialProofTypes(response: string): any[] {
    // Implementation for extracting social proof types
    return [];
  }

  private extractTrustElements(response: string): any[] {
    // Implementation for extracting trust elements
    return [];
  }

  private extractPlacementStrategy(response: string): any {
    // Implementation for extracting placement strategy
    return {};
  }

  private extractCredibilityFramework(response: string): any {
    // Implementation for extracting credibility framework
    return {};
  }

  private extractCTAVariations(response: string): any[] {
    // Implementation for extracting CTA variations
    return [];
  }

  private extractPsychologicalPrinciples(response: string): any[] {
    // Implementation for extracting psychological principles
    return [];
  }

  private extractDesignRecommendations(response: string): any {
    // Implementation for extracting design recommendations
    return {};
  }

  private extractTestingStrategy(response: string): any {
    // Implementation for extracting testing strategy
    return {};
  }
}