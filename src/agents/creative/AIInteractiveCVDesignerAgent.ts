/**
 * AIInteractiveCVDesignerAgent - インタラクティブCV要素専門デザイナー
 * マイクロインタラクション・動的UI・インタラクティブCV要素の設計・実装専門エージェント
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface InteractiveCVDesignerTaskInput {
  taskType:
    | 'micro-interactions-design'
    | 'progressive-form-design'
    | 'gamification-elements'
    | 'real-time-personalization'
    | 'interactive-storytelling'
    | 'dynamic-cta-optimization'
    | 'engagement-flow-design';
  conversionGoals?: ConversionGoal[];
  userJourney?: UserJourneyMap;
  interactionRequirements?: InteractionRequirement[];
  technicalConstraints?: TechnicalConstraint[];
  performanceData?: InteractionPerformanceData;
  deviceContext?: DeviceContext[];
}

export interface ConversionGoal {
  type: 'micro' | 'macro';
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  currentRate: number;
  targetRate: number;
  value: number;
  funnelPosition: 'top' | 'middle' | 'bottom';
  interactionType: 'passive' | 'active' | 'guided';
}

export interface UserJourneyMap {
  stages: JourneyStage[];
  touchpoints: Touchpoint[];
  painPoints: PainPoint[];
  opportunities: ConversionOpportunity[];
}

export interface JourneyStage {
  name: string;
  description: string;
  userMindset: string;
  emotions: string[];
  actions: string[];
  barriers: string[];
  enablers: string[];
  interactionNeeds: string[];
}

export interface Touchpoint {
  name: string;
  stage: string;
  channel: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  currentExperience: 'excellent' | 'good' | 'poor';
  improvementPotential: 'high' | 'medium' | 'low';
  interactionType: string[];
}

export interface PainPoint {
  description: string;
  stage: string;
  impact: 'high' | 'medium' | 'low';
  frequency: 'very-common' | 'common' | 'occasional' | 'rare';
  userFrustration: 'critical' | 'significant' | 'minor';
  solutionComplexity: 'simple' | 'moderate' | 'complex';
}

export interface ConversionOpportunity {
  description: string;
  stage: string;
  potentialImpact: 'transformative' | 'significant' | 'incremental';
  implementationEffort: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
  interactionSolution: string[];
}

export interface InteractionRequirement {
  category: 'navigation' | 'feedback' | 'engagement' | 'assistance' | 'personalization';
  priority: 'must-have' | 'should-have' | 'could-have' | 'wont-have';
  description: string;
  userBenefit: string;
  businessValue: string;
  technicalComplexity: 'simple' | 'moderate' | 'complex';
  dependencies: string[];
}

export interface TechnicalConstraint {
  type: 'performance' | 'compatibility' | 'security' | 'accessibility' | 'budget';
  description: string;
  impact: 'blocking' | 'limiting' | 'guiding';
  workaround?: string;
  alternatives?: string[];
}

export interface InteractionPerformanceData {
  currentMetrics: {
    averageEngagementTime: number;
    interactionRate: number;
    completionRate: number;
    dropOffPoints: DropOffPoint[];
  };
  heatmapData: {
    clickHeatmap: HeatmapPoint[];
    scrollHeatmap: HeatmapPoint[];
    attentionHeatmap: HeatmapPoint[];
  };
  userBehaviorPatterns: BehaviorPattern[];
  abTestResults: InteractionABTest[];
}

export interface DropOffPoint {
  location: string;
  dropOffRate: number;
  commonReasons: string[];
  recoveryPotential: 'high' | 'medium' | 'low';
}

export interface HeatmapPoint {
  element: string;
  intensity: number;
  interactionType: string;
  conversionCorrelation: number;
}

export interface BehaviorPattern {
  pattern: string;
  frequency: number;
  userSegment: string;
  conversionRate: number;
  optimizationOpportunity: string;
}

export interface InteractionABTest {
  element: string;
  variations: string[];
  winner: string;
  improvement: number;
  metric: string;
  significance: number;
}

export interface DeviceContext {
  deviceType: 'desktop' | 'tablet' | 'mobile';
  screenSize: string;
  inputMethod: string[];
  capabilities: string[];
  limitations: string[];
  interactionPatterns: string[];
}

export class AIInteractiveCVDesignerAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS['interactive-cv-designer'] || {
      name: 'AI Interactive CV Designer',
      description: 'インタラクティブCV要素専門デザイナー。マイクロインタラクション・動的UI・ゲーミフィケーションでCV向上',
      capabilities: [
        'マイクロインタラクション設計',
        'プログレッシブフォーム最適化',
        'ゲーミフィケーション要素設計',
        'リアルタイムパーソナライゼーション',
        'インタラクティブストーリーテリング',
        '動的CTA最適化',
        'エンゲージメントフロー設計'
      ],
      model: 'claude-3.5-sonnet',
      temperature: 0.3,
      maxTokens: 4000,
    };
    super(config);
  }

  async executeTask(task: AgentTask): Promise<any> {
    const input = task.input as InteractiveCVDesignerTaskInput;
    
    switch (input.taskType) {
      case 'micro-interactions-design':
        return this.designMicroInteractions(input);
      case 'progressive-form-design':
        return this.designProgressiveForms(input);
      case 'gamification-elements':
        return this.designGamificationElements(input);
      case 'real-time-personalization':
        return this.designRealtimePersonalization(input);
      case 'interactive-storytelling':
        return this.designInteractiveStorytelling(input);
      case 'dynamic-cta-optimization':
        return this.designDynamicCTA(input);
      case 'engagement-flow-design':
        return this.designEngagementFlow(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  private async designMicroInteractions(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
あなたはCV最適化に特化したインタラクティブデザインの専門家です。コンバージョン率を向上させるマイクロインタラクションを設計してください。

# コンバージョン目標
${input.conversionGoals ? `
${input.conversionGoals.map(goal => `
## ${goal.name} (${goal.type})
- 説明: ${goal.description}
- 優先度: ${goal.priority}
- 現在率: ${goal.currentRate}% → 目標: ${goal.targetRate}%
- 価値: ${goal.value}円
- ファネル位置: ${goal.funnelPosition}
- インタラクション要求: ${goal.interactionType}
`).join('')}
` : ''}

# ユーザージャーニー
${input.userJourney ? `
## ジャーニーステージ
${input.userJourney.stages.map(stage => `
### ${stage.name}
- 説明: ${stage.description}
- ユーザー心理: ${stage.userMindset}
- 感情: ${stage.emotions.join(', ')}
- 行動: ${stage.actions.join(', ')}
- 障壁: ${stage.barriers.join(', ')}
- インタラクションニーズ: ${stage.interactionNeeds.join(', ')}
`).join('')}

## 課題ポイント
${input.userJourney.painPoints.map(pain => `
- ${pain.description} (${pain.stage}段階)
- 影響度: ${pain.impact}, 頻度: ${pain.frequency}
- ユーザー不満度: ${pain.userFrustration}
- 解決複雑度: ${pain.solutionComplexity}
`).join('')}

## 改善機会
${input.userJourney.opportunities.map(opp => `
- ${opp.description} (${opp.stage}段階)
- 潜在影響: ${opp.potentialImpact}
- 実装難易度: ${opp.implementationEffort}
- インタラクション解決策: ${opp.interactionSolution.join(', ')}
`).join('')}
` : ''}

# パフォーマンスデータ
${input.performanceData ? `
## 現在の指標
- 平均エンゲージメント時間: ${input.performanceData.currentMetrics.averageEngagementTime}秒
- インタラクション率: ${input.performanceData.currentMetrics.interactionRate}%
- 完了率: ${input.performanceData.currentMetrics.completionRate}%

## 離脱ポイント
${input.performanceData.currentMetrics.dropOffPoints.map(point => `
- ${point.location}: 離脱率${point.dropOffRate}%
- 主な理由: ${point.commonReasons.join(', ')}
- 回復可能性: ${point.recoveryPotential}
`).join('')}

## 行動パターン
${input.performanceData.userBehaviorPatterns.map(pattern => `
- ${pattern.pattern}: 頻度${pattern.frequency}%, CVR${pattern.conversionRate}%
- セグメント: ${pattern.userSegment}
- 最適化機会: ${pattern.optimizationOpportunity}
`).join('')}
` : ''}

# マイクロインタラクション設計要求

## 1. CV特化マイクロインタラクション戦略
### コンバージョン心理学の活用
- **即時フィードバック**: ユーザーアクションへの瞬時反応
- **進捗可視化**: 完了への道筋・残りステップ明示
- **成功体験**: 小さな達成感・ポジティブ強化
- **不安軽減**: エラー防止・安心感提供

### 感情的エンゲージメント
- **驚き・喜び**: 期待を超える反応・アニメーション
- **達成感**: プロセス完了・目標到達の演出
- **安心感**: 安全・保護されている感覚
- **親近感**: 人間らしい・温かみのある反応

### 行動促進技法
- **フロー状態**: スムーズで中断のない体験
- **次ステップ誘導**: 自然な行動の連鎖
- **FOMO創出**: 機会損失への不安・緊急性
- **コミット強化**: 決定・行動への確信

## 2. インタラクション要素設計
### ボタン・CTA インタラクション
- **ホバー効果**: マウスオーバー時の視覚変化
- **クリック反応**: 押下時のフィードバック・状態変化
- **ローディング状態**: 処理中の視覚的指示・待機体験
- **完了確認**: アクション成功の明確な通知

### フォーム・入力インタラクション
- **フィールド活性化**: フォーカス時の視覚的変化
- **リアルタイム検証**: 入力と同時のエラー・成功表示
- **自動補完**: 予測入力・候補表示
- **進捗表示**: 完了率・残りステップ可視化

### ナビゲーション・移動インタラクション
- **ページ遷移**: スムーズなトランジション・方向感
- **スクロール誘導**: 続きがあることの示唆・誘導
- **パンくずナビ**: 現在地・戻り方の明示
- **ステップ指示**: 次の行動・選択肢の提示

### フィードバック・通知インタラクション
- **成功通知**: 達成・完了の祝福・確認
- **エラーハンドリング**: 問題の説明・解決方法提示
- **警告・注意**: リスク・重要情報の強調
- **ヘルプ・ガイド**: 支援・説明の提供

## 3. デバイス別最適化
### デスクトップ
- **マウスインタラクション**: ホバー・クリック・ドラッグ
- **キーボードショートカット**: 効率的操作・パワーユーザー対応
- **マルチウィンドウ**: 複数タスク・比較作業
- **高精度操作**: 細かい操作・詳細作業

### タブレット
- **タッチジェスチャー**: タップ・スワイプ・ピンチ
- **画面回転**: 縦横切り替え対応
- **マルチタッチ**: 複数指操作
- **中間サイズ**: デスクトップとモバイルの橋渡し

### スマートフォン
- **片手操作**: 親指操作・リーチャビリティ
- **スワイプナビ**: 横移動・戻る操作
- **振動フィードバック**: 触覚による通知・確認
- **音声・カメラ**: 代替入力手段

## 4. パフォーマンス・技術考慮
### 応答性能
- **60FPS維持**: 滑らかなアニメーション
- **レスポンス時間**: 100ms以内の反応
- **負荷分散**: 重い処理の最適化
- **プリロード**: 次アクション準備

### 実装技術
- **CSS3アニメーション**: 軽量・高性能
- **JavaScript制御**: 複雑なロジック・状態管理
- **SVGアニメーション**: スケーラブル・高品質
- **Web Animations API**: ブラウザ最適化

## 5. 測定・最適化
### 測定指標
- **インタラクション率**: 要素への反応率
- **完了率**: タスク・フロー完了率
- **エラー率**: 失敗・やり直し率
- **満足度**: ユーザー体験評価

### A/Bテスト設計
- **アニメーション有無**: 効果の検証
- **フィードバック形式**: 通知方法の比較
- **タイミング**: 反応速度・遅延の影響
- **視覚的強度**: 目立ち度・注意喚起レベル

効果的で実装可能なマイクロインタラクション設計を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'micro_interactions_design',
      design: response,
      interactionElements: this.extractInteractionElements(response),
      deviceOptimization: this.extractDeviceOptimization(response),
      performanceSpecs: this.extractPerformanceSpecs(response),
      testingPlan: this.extractTestingPlan(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designProgressiveForms(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
コンバージョン率を最大化するプログレッシブフォームを設計してください。

# プログレッシブフォーム設計要求

## 1. CV最適化フォーム戦略
### 心理的バリア軽減
- **段階的開示**: 情報要求の段階的増加
- **コミット一貫性**: 小さなコミットから大きなコミットへ
- **進捗可視化**: 完了への道筋・達成感
- **心理的安全性**: プライバシー・セキュリティ確保

### フリクション最小化
- **必要最小限**: 本当に必要な情報のみ
- **入力支援**: 自動補完・選択肢・バリデーション
- **エラー防止**: リアルタイム検証・ガイダンス
- **復帰容易性**: 中断・再開・情報保持

### モチベーション維持
- **価値の再確認**: 各段階でベネフィット再提示
- **社会的証明**: 他者の利用・満足の表示
- **インセンティブ**: 完了報酬・特典の提示
- **ゲーミフィケーション**: 進捗・達成・競争要素

## 2. フォーム構成設計
### ステップ分割戦略
- **論理的グループ**: 関連情報のまとまり
- **認知負荷**: 各ステップの情報量最適化
- **重要度順**: 重要情報から軽い情報へ
- **心理的順序**: 受け入れやすい順番

### 情報収集戦略
- **基本情報**: 名前・連絡先等の基礎データ
- **ニーズ情報**: 興味・要求・選好の把握
- **詳細情報**: 具体的・個別的な詳細データ
- **確認・同意**: 最終確認・利用規約同意

### インタラクション設計
- **進捗表示**: ステップ数・完了率・残り時間
- **ナビゲーション**: 戻る・進む・スキップ機能
- **保存機能**: 途中保存・自動保存・復帰機能
- **ヘルプ機能**: 説明・例示・サポート

## 3. UX・UI最適化
### 視覚的デザイン
- **クリーンレイアウト**: 余白・整理・焦点集中
- **視覚的ヒエラルキー**: 重要度・順序の明示
- **一貫性**: デザイン・操作・表現の統一
- **レスポンシブ**: デバイス対応・最適化

### インタラクション体験
- **スムーズ遷移**: ページ・ステップ間の自然な移動
- **即座フィードバック**: 入力・選択への瞬時反応
- **エラーハンドリング**: 優しい・建設的なエラー処理
- **成功体験**: 完了・達成の祝福・確認

### アクセシビリティ
- **キーボード操作**: タブ・エンター・ショートカット
- **スクリーンリーダー**: 音声読み上げ対応
- **色覚対応**: 色だけでない情報伝達
- **認知支援**: 明確・簡潔・理解しやすい表現

効果的なプログレッシブフォーム設計を提供してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'progressive_form_design',
      design: response,
      stepStructure: this.extractStepStructure(response),
      uxOptimization: this.extractUXOptimization(response),
      conversionTechniques: this.extractConversionTechniques(response),
      implementationGuide: this.extractImplementationGuide(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designGamificationElements(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
コンバージョン向上のためのゲーミフィケーション要素を設計してください。

# ゲーミフィケーション設計要求

## 1. CV特化ゲーミフィケーション戦略
### 心理学的動機活用
- **達成欲求**: 目標達成・完了への欲求
- **進歩実感**: 成長・改善・発展の実感
- **競争心**: 他者との競争・優位性確保
- **収集欲**: 完全性・コレクション完成欲求
- **社会的承認**: 認知・評価・賞賛の獲得

### エンゲージメント強化
- **継続動機**: 長期的関与・リピート促進
- **没入体験**: フロー状態・集中継続
- **習慣形成**: 定期的・自然な利用習慣
- **感情的結びつき**: ポジティブ感情・愛着形成

## 2. ゲーミフィケーション要素設計
### プログレス・進捗システム
- **プログレスバー**: 視覚的進捗表示・完了予測
- **レベルシステム**: 段階的成長・ステータス向上
- **マイルストーン**: 節目・達成点の設定・祝福
- **完了率**: パーセンテージ・数値での進捗表示

### リワード・報酬システム
- **ポイント**: 行動・達成への数値報酬
- **バッジ・アチーブメント**: 特別達成・認定の証
- **ランキング**: 順位・相対位置の表示
- **特典・特権**: 限定アクセス・優遇サービス

### チャレンジ・課題システム
- **デイリーチャレンジ**: 日々の小さな目標・習慣
- **期間限定**: 特別期間・季節限定チャレンジ
- **段階的難易度**: 易から難への自然な発展
- **選択肢**: 複数の道筋・好みに応じた選択

### ソーシャル要素
- **友人招待**: 紹介・共有インセンティブ
- **チーム・グループ**: 協力・連帯感形成
- **共有・シェア**: 達成・進捗の共有・自慢
- **コミュニティ**: 仲間・サポート・情報交換

## 3. CV連携最適化
### コンバージョンファネル統合
- **認知段階**: 興味喚起・注目獲得ゲーム
- **検討段階**: 比較・評価支援ツール
- **決定段階**: 決断促進・後押しゲーム
- **アクション段階**: 完了・達成の祝福・確認

### 行動誘導ゲーミフィケーション
- **情報入力**: フォーム完了をゲーム化
- **商品探索**: 発見・比較をクエスト化
- **決定支援**: 選択・決断をチャレンジ化
- **完了促進**: 最終行動を達成ゴール化

効果的なゲーミフィケーション要素を設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'gamification_elements',
      design: response,
      gameElements: this.extractGameElements(response),
      motivationSystems: this.extractMotivationSystems(response),
      progressTracking: this.extractProgressTracking(response),
      socialFeatures: this.extractSocialFeatures(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designRealtimePersonalization(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
リアルタイムパーソナライゼーションでCV最適化するインタラクティブシステムを設計してください。

# リアルタイムパーソナライゼーション設計要求

## 1. 動的パーソナライゼーション戦略
### リアルタイム行動分析
- **ページ滞在**: 滞在時間・スクロール深度分析
- **クリック行動**: 興味・関心要素の特定
- **マウス軌跡**: 注意・迷い・興味の可視化
- **入力パターン**: フォーム行動・情報入力分析

### コンテンツ動的最適化
- **メッセージ調整**: 興味に応じた訴求変更
- **商品推奨**: 行動パターンに基づく推薦
- **レイアウト調整**: 効果的配置・要素強調
- **CTA最適化**: 最適なアクション提案

### 感情状態対応
- **興味レベル**: 高・中・低関心度別対応
- **迷い・不安**: 決断支援・安心材料提供
- **急いでいる**: 簡潔・効率重視の表示
- **じっくり検討**: 詳細・比較情報の充実

## 2. パーソナライゼーション要素
### コンテンツ・メッセージ
- **ヘッドライン**: 関心に応じた見出し変更
- **商品説明**: 重視ポイントに応じた強調
- **価格表示**: 価格感度に応じた表現
- **ベネフィット**: 価値観に応じた訴求

### ビジュアル・デザイン
- **画像選択**: 好み・属性に応じた画像
- **色調整**: 感情・性格に応じた配色
- **レイアウト**: 情報処理スタイル対応
- **フォント**: 読みやすさ・印象調整

### インタラクション・機能
- **ナビゲーション**: 利用パターン対応
- **フォーム**: 入力スタイル・速度対応
- **ヘルプ**: 必要性・レベル別支援
- **推奨**: 行動・嗜好に基づく提案

## 3. 技術・実装
### データ収集・分析
- **リアルタイム収集**: 行動データの即時取得
- **機械学習**: パターン認識・予測モデル
- **セグメンテーション**: 動的ユーザー分類
- **A/Bテスト**: 効果測定・最適化

### プライバシー・倫理
- **透明性**: データ利用の明示・説明
- **選択権**: オプトイン・オプトアウト
- **最小限**: 必要最小限のデータ利用
- **セキュリティ**: 安全なデータ管理

効果的なリアルタイムパーソナライゼーションを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'realtime_personalization',
      design: response,
      personalizationEngine: this.extractPersonalizationEngine(response),
      contentOptimization: this.extractContentOptimization(response),
      behaviorAnalysis: this.extractBehaviorAnalysis(response),
      privacyFramework: this.extractPrivacyFramework(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designInteractiveStorytelling(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
コンバージョンを促進するインタラクティブストーリーテリングを設計してください。

# インタラクティブストーリーテリング設計要求

## 1. CV特化ストーリー戦略
### ナラティブ構造
- **フック**: 瞬時の注意獲得・興味喚起
- **問題提示**: ターゲットの課題・痛み共有
- **解決提示**: 商品・サービスでの解決
- **変化・成長**: 改善・成功・達成の物語
- **行動喚起**: 自然な次のステップ誘導

### 感情的エンゲージメント
- **共感**: ターゲットとの感情的つながり
- **憧れ**: 理想の状態・成功への憧憬
- **緊張・解決**: ドラマ・葛藤とその解決
- **達成感**: 目標到達・成功の喜び
- **安心感**: 問題解決・不安解消

### インタラクティブ要素
- **選択**: ユーザーの選択による物語分岐
- **参加**: ストーリーへの能動的関与
- **発見**: 隠れた情報・サプライズの発見
- **カスタマイズ**: 個人に応じた物語調整

## 2. ストーリー体験設計
### 段階的エンゲージメント
- **導入**: 軽い関与・興味の段階的深化
- **没入**: 深い感情移入・ストーリー世界
- **クライマックス**: 最高潮・決定的瞬間
- **解決**: 満足・達成・完了の感覚

### マルチメディア活用
- **ビジュアル**: 画像・イラスト・インフォグラフィック
- **動画**: アニメーション・実写・説明動画
- **音声**: ナレーション・効果音・BGM
- **テキスト**: ストーリー・説明・ガイド

### デバイス最適化
- **デスクトップ**: 豊富な情報・複雑な操作
- **タブレット**: タッチ操作・中程度の情報量
- **スマートフォン**: シンプル・直感的操作

効果的なインタラクティブストーリーテリングを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'interactive_storytelling',
      design: response,
      narrativeStructure: this.extractNarrativeStructure(response),
      interactiveElements: this.extractInteractiveElements(response),
      multimediaStrategy: this.extractMultimediaStrategy(response),
      engagementFlow: this.extractEngagementFlow(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designDynamicCTA(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
ユーザー行動に応じて最適化される動的CTAシステムを設計してください。

# 動的CTA設計要求

## 1. 動的CTA戦略
### 行動ベース最適化
- **滞在時間**: 短時間・長時間滞在への対応
- **スクロール行動**: 深度・速度に応じた調整
- **クリック行動**: 興味要素に基づく最適化
- **離脱意図**: エグジットインテント検知対応

### コンテキスト最適化
- **ページ位置**: 位置に応じたCTA変更
- **時間経過**: 滞在時間に応じた段階的変化
- **デバイス**: デバイス特性に応じた最適化
- **流入元**: 参照元に応じたメッセージ調整

### A/Bテスト自動化
- **リアルタイム最適化**: 継続的パフォーマンス改善
- **多変量テスト**: 複数要素の同時最適化
- **統計的有意性**: 信頼できる結果判定
- **自動展開**: 勝利パターンの自動適用

## 2. CTA要素最適化
### メッセージ・コピー
- **アクション動詞**: 行動促進の強い表現
- **ベネフィット**: 得られる価値の明示
- **緊急性**: 今行動する理由
- **個人化**: ユーザーに応じた表現

### ビジュアル・デザイン
- **色**: 注意を引く・ブランドに合う色
- **サイズ**: 目立つ・操作しやすいサイズ
- **形**: ボタンらしさ・クリック誘導
- **位置**: 自然な視線・操作の流れ

### インタラクション
- **ホバー効果**: マウスオーバー時の反応
- **クリック効果**: 押下時のフィードバック
- **ローディング**: 処理中の状態表示
- **完了確認**: 成功時の明確な通知

動的で効果的なCTAシステムを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'dynamic_cta_optimization',
      design: response,
      dynamicLogic: this.extractDynamicLogic(response),
      ctaVariations: this.extractCTAVariations(response),
      optimizationRules: this.extractOptimizationRules(response),
      performanceTracking: this.extractPerformanceTracking(response),
      timestamp: new Date().toISOString(),
    };
  }

  private async designEngagementFlow(input: InteractiveCVDesignerTaskInput) {
    const prompt = `
ユーザーエンゲージメントを最大化し、コンバージョンに導くインタラクティブフローを設計してください。

# エンゲージメントフロー設計要求

## 1. エンゲージメント戦略
### 段階的エンゲージメント
- **注意獲得**: 初期の興味・関心喚起
- **興味深化**: 継続的な関与・探索促進
- **没入体験**: 深い集中・フロー状態
- **行動促進**: 自然なコンバージョン誘導

### 体験設計原則
- **直感性**: 説明不要の自然な操作
- **発見性**: 新しい情報・機能の発見
- **達成感**: 小さな成功・進歩の実感
- **継続性**: 次への期待・継続動機

## 2. フロー体験設計
### インタラクティブ要素
- **インタラクティブデモ**: 体験・試用機能
- **パーソナライゼーション**: カスタマイズ・個別対応
- **ゲーミフィケーション**: ゲーム要素・楽しさ
- **ソーシャル要素**: 共有・コミュニティ参加

### 情報アーキテクチャ
- **段階的開示**: 必要な時に必要な情報
- **関連性**: 興味に応じた情報提示
- **深度選択**: 簡単・詳細の選択可能
- **ナビゲーション**: 迷わない案内・誘導

効果的なエンゲージメントフローを設計してください。
`;

    const response = await this.callLLM(prompt);
    
    return {
      type: 'engagement_flow_design',
      design: response,
      flowArchitecture: this.extractFlowArchitecture(response),
      engagementStages: this.extractEngagementStages(response),
      interactionDesign: this.extractInteractionDesign(response),
      continuityStrategy: this.extractContinuityStrategy(response),
      timestamp: new Date().toISOString(),
    };
  }

  // Helper methods for extracting structured data
  private extractInteractionElements(response: string): any[] {
    return []; // Implement interaction elements extraction
  }

  private extractDeviceOptimization(response: string): any {
    return {}; // Implement device optimization extraction
  }

  private extractPerformanceSpecs(response: string): any {
    return {}; // Implement performance specs extraction
  }

  private extractTestingPlan(response: string): any {
    return {}; // Implement testing plan extraction
  }

  private extractStepStructure(response: string): any {
    return {}; // Implement step structure extraction
  }

  private extractUXOptimization(response: string): any {
    return {}; // Implement UX optimization extraction
  }

  private extractConversionTechniques(response: string): any[] {
    return []; // Implement conversion techniques extraction
  }

  private extractImplementationGuide(response: string): any {
    return {}; // Implement implementation guide extraction
  }

  private extractGameElements(response: string): any[] {
    return []; // Implement game elements extraction
  }

  private extractMotivationSystems(response: string): any {
    return {}; // Implement motivation systems extraction
  }

  private extractProgressTracking(response: string): any {
    return {}; // Implement progress tracking extraction
  }

  private extractSocialFeatures(response: string): any[] {
    return []; // Implement social features extraction
  }

  private extractPersonalizationEngine(response: string): any {
    return {}; // Implement personalization engine extraction
  }

  private extractContentOptimization(response: string): any {
    return {}; // Implement content optimization extraction
  }

  private extractBehaviorAnalysis(response: string): any {
    return {}; // Implement behavior analysis extraction
  }

  private extractPrivacyFramework(response: string): any {
    return {}; // Implement privacy framework extraction
  }

  private extractNarrativeStructure(response: string): any {
    return {}; // Implement narrative structure extraction
  }

  private extractMultimediaStrategy(response: string): any {
    return {}; // Implement multimedia strategy extraction
  }

  private extractEngagementFlow(response: string): any {
    return {}; // Implement engagement flow extraction
  }

  private extractDynamicLogic(response: string): any {
    return {}; // Implement dynamic logic extraction
  }

  private extractCTAVariations(response: string): any[] {
    return []; // Implement CTA variations extraction
  }

  private extractOptimizationRules(response: string): any[] {
    return []; // Implement optimization rules extraction
  }

  private extractPerformanceTracking(response: string): any {
    return {}; // Implement performance tracking extraction
  }

  private extractFlowArchitecture(response: string): any {
    return {}; // Implement flow architecture extraction
  }

  private extractEngagementStages(response: string): any[] {
    return []; // Implement engagement stages extraction
  }

  private extractInteractionDesign(response: string): any {
    return {}; // Implement interaction design extraction
  }

  private extractContinuityStrategy(response: string): any {
    return {}; // Implement continuity strategy extraction
  }
}