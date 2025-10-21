/**
 * エージェント設定ファイル
 * 各エージェントの詳細な設定を定義
 */

import { AgentConfig } from '../core/BaseAgent.js';

export const AGENT_CONFIGS: Record<string, AgentConfig> = {
  // ===== 現状確定しているジャンル =====

  // AIプロンプトエンジニア
  PROMPT_ENGINEER: {
    name: 'AI Prompt Engineer',
    role: 'プロンプト設計・最適化の専門家',
    category: 'core',
    description: '大規模言語モデル（LLM）の性能を最大限に引き出すためのプロンプトを設計・最適化',
    capabilities: [
      'プロンプト設計',
      'A/Bテスト',
      'プロンプト最適化',
      'コンテキスト設計',
      'Few-shot学習設計',
    ],
    maxRetries: 3,
    timeout: 30000,
  },

  // AIデザイナー
  AI_DESIGNER: {
    name: 'AI Designer',
    role: '視覚コンテンツ生成の専門家',
    category: 'creative',
    description: 'UI/UX、グラフィックデザイン、プロダクトデザインなどの視覚コンテンツを生成',
    capabilities: [
      'UIモックアップ生成',
      'バナー広告作成',
      '3Dモデル生成',
      'デザインバリエーション生成',
      'プロトタイプ作成',
    ],
    maxRetries: 2,
    timeout: 60000,
  },

  // AIライター
  AI_WRITER: {
    name: 'AI Writer',
    role: 'テキストコンテンツ生成の専門家',
    category: 'creative',
    description: '多様な形式のテキストコンテンツを生成',
    capabilities: [
      'ブログ記事作成',
      'ニュースリリース作成',
      '製品説明文作成',
      'SNS投稿作成',
      '広告コピー作成',
      'コンテンツリライト',
      '多言語翻訳',
    ],
    maxRetries: 3,
    timeout: 45000,
  },

  // AIマーケター
  AI_MARKETER: {
    name: 'AI Marketer',
    role: 'マーケティング活動の専門家',
    category: 'business',
    description: '市場分析、顧客セグメンテーション、キャンペーン戦略立案・実行',
    capabilities: [
      '市場分析',
      '顧客セグメンテーション',
      '購買行動予測',
      'キャンペーン戦略立案',
      '広告運用',
      'パフォーマンス分析',
      'A/Bテスト設計',
    ],
    maxRetries: 3,
    timeout: 60000,
  },

  // AIエンジニア
  AI_ENGINEER: {
    name: 'AI Engineer',
    role: 'ソフトウェア開発の専門家',
    category: 'development',
    description: 'コード生成、デバッグ、テスト、最適化、ドキュメント作成',
    capabilities: [
      'コード生成',
      'バグ修正',
      'テストコード生成',
      'コード最適化',
      'ドキュメント作成',
      'コードレビュー',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // ===== データ・分析系 =====

  // AIデータアナリスト
  DATA_ANALYST: {
    name: 'AI Data Analyst',
    role: 'データ分析の専門家',
    category: 'data-analytics',
    description: '統計的手法や機械学習を用いたデータ分析と洞察提供',
    capabilities: [
      'データ分析',
      'パターン認識',
      '予測モデル構築',
      '異常検知',
      'トレンド分析',
      'ビジュアライゼーション',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // AIビジネスインテリジェンスエージェント
  BI_AGENT: {
    name: 'AI Business Intelligence Agent',
    role: 'ビジネスインテリジェンスの専門家',
    category: 'data-analytics',
    description: 'データ統合・分析、レポート・ダッシュボード自動生成',
    capabilities: [
      'データ統合',
      'KPI分析',
      'レポート自動生成',
      'ダッシュボード作成',
      '経営意思決定支援',
    ],
    maxRetries: 2,
    timeout: 90000,
  },

  // AIリサーチアナリスト
  RESEARCH_ANALYST: {
    name: 'AI Research Analyst',
    role: 'リサーチ・調査の専門家',
    category: 'data-analytics',
    description: '情報収集・整理・分析、調査レポート作成',
    capabilities: [
      '市場調査',
      '競合分析',
      '技術トレンド調査',
      '論文レビュー',
      '調査レポート作成',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // ===== クリエイティブ・コンテンツ生成系 =====

  // AIコンテンツクリエイター（動画/音楽）
  CONTENT_CREATOR: {
    name: 'AI Content Creator',
    role: '動画・音楽コンテンツ制作の専門家',
    category: 'creative',
    description: '動画スクリプト生成、映像編集、音楽作曲',
    capabilities: [
      '動画シナリオ作成',
      '絵コンテ生成',
      '音楽作曲',
      '効果音生成',
      '映像編集',
    ],
    maxRetries: 2,
    timeout: 180000,
  },

  // AIイラストレーター/アーティスト
  ILLUSTRATOR: {
    name: 'AI Illustrator',
    role: 'イラスト・アート制作の専門家',
    category: 'creative',
    description: '多様な画風でイラスト、コンセプトアート、キャラクターデザイン生成',
    capabilities: [
      'イラスト生成',
      'キャラクターデザイン',
      'コンセプトアート作成',
      '背景作成',
      'スタイル変換',
    ],
    maxRetries: 2,
    timeout: 60000,
  },

  // AIゲームデザイナー
  GAME_DESIGNER: {
    name: 'AI Game Designer',
    role: 'ゲームデザインの専門家',
    category: 'creative',
    description: 'ゲームコンセプト、ルール、レベルデザイン、ストーリー作成',
    capabilities: [
      'ゲームコンセプト設計',
      'ルール設計',
      'レベルデザイン',
      'キャラクター設定',
      'ストーリー作成',
      'ゲームバランス調整',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // ===== 開発・運用・管理系 =====

  // AIテストエンジニア
  TEST_ENGINEER: {
    name: 'AI Test Engineer',
    role: 'ソフトウェアテストの専門家',
    category: 'development',
    description: 'テストケース生成、テスト実行、バグ検出',
    capabilities: [
      'テストケース生成',
      '自動テスト実行',
      'バグ検出',
      'テストレポート作成',
      'テストカバレッジ分析',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // AIセキュリティエンジニア
  SECURITY_ENGINEER: {
    name: 'AI Security Engineer',
    role: 'セキュリティの専門家',
    category: 'development',
    description: '脆弱性スキャン、セキュリティリスク分析、対策提案',
    capabilities: [
      '脆弱性スキャン',
      'セキュリティ分析',
      '脅威検知',
      'インシデント対応支援',
      'セキュリティポリシー提案',
    ],
    maxRetries: 2,
    timeout: 120000,
  },

  // AIデプロイメント/DevOpsエージェント
  DEVOPS_AGENT: {
    name: 'AI DevOps Agent',
    role: 'DevOps・インフラ管理の専門家',
    category: 'development',
    description: 'CI/CDパイプライン構築、インフラ管理、監視',
    capabilities: [
      'CI/CDパイプライン構築',
      'インフラ自動化',
      'リソース監視',
      'スケーリング管理',
      '障害対応',
    ],
    maxRetries: 2,
    timeout: 180000,
  },

  // AIプロジェクトマネージャー
  PROJECT_MANAGER: {
    name: 'AI Project Manager',
    role: 'プロジェクト管理の専門家',
    category: 'business',
    description: 'プロジェクト計画、進捗管理、リソース管理',
    capabilities: [
      'WBS生成',
      'タスク管理',
      'リソース最適化',
      '進捗追跡',
      'リスク管理',
    ],
    maxRetries: 3,
    timeout: 60000,
  },

  // AI N8N Builder
  N8N_BUILDER: {
    name: 'AI N8N Builder',
    role: 'n8nワークフロー構築の専門家',
    category: 'development',
    description: 'n8nの自動化ワークフローの設計、構築、最適化を行う',
    capabilities: [
      'ワークフロー設計',
      'ノード構成生成',
      'サービス統合設定',
      'パフォーマンス最適化',
      'エラーハンドリング実装',
      'テストシナリオ作成',
      'ドキュメント生成',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // ===== ビジネス・戦略・顧客対応系 =====

  // AIセールスエージェント
  SALES_AGENT: {
    name: 'AI Sales Agent',
    role: '営業支援の専門家',
    category: 'business',
    description: 'リード特定、営業資料作成、商談支援',
    capabilities: [
      'リードスコアリング',
      '営業資料作成',
      '商談シミュレーション',
      'パーソナライズド提案',
      'フォローアップ自動化',
    ],
    maxRetries: 3,
    timeout: 60000,
  },

  // AIカスタマーサポートエージェント
  CUSTOMER_SUPPORT: {
    name: 'AI Customer Support Agent',
    role: 'カスタマーサポートの専門家',
    category: 'business',
    description: '問い合わせ対応、FAQ更新、問題解決支援',
    capabilities: [
      '自動応答',
      'FAQ生成',
      '問題解決支援',
      'エスカレーション判断',
      '顧客満足度分析',
    ],
    maxRetries: 3,
    timeout: 30000,
  },

  // AI財務アナリスト
  FINANCIAL_ANALYST: {
    name: 'AI Financial Analyst',
    role: '財務分析の専門家',
    category: 'business',
    description: '財務データ分析、予算策定、投資戦略提案',
    capabilities: [
      '財務分析',
      '予算策定支援',
      '投資評価',
      'リスク評価',
      '財務予測',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AI法務アドバイザー
  LEGAL_ADVISOR: {
    name: 'AI Legal Advisor',
    role: '法務支援の専門家',
    category: 'business',
    description: '契約書分析、法的リスク評価、コンプライアンスチェック',
    capabilities: [
      '契約書レビュー',
      'リスク評価',
      'コンプライアンスチェック',
      '法的文書生成支援',
      '法規制調査',
    ],
    maxRetries: 2,
    timeout: 90000,
  },

  // AI事業立ち上げエージェント
  BUSINESS_LAUNCHER: {
    name: 'AI Business Launcher',
    role: '事業立ち上げの統括責任者',
    category: 'business',
    description: '事業戦略策定、ロードマップ管理、エージェント統括',
    capabilities: [
      '事業戦略策定',
      'ロードマップ作成',
      'KPI設定',
      'マイルストーン管理',
      'エージェント統括',
      '進捗監視',
    ],
    dependencies: ['AI_STRATEGY_CONSULTANT', 'PROJECT_MANAGER', 'FINANCIAL_ANALYST'],
    maxRetries: 2,
    timeout: 120000,
  },

  // AI戦略コンサルタント
  STRATEGY_CONSULTANT: {
    name: 'AI Strategy Consultant',
    role: '戦略コンサルティングの専門家',
    category: 'business',
    description: '市場分析、SWOT分析、戦略オプション提案',
    capabilities: [
      'SWOT分析',
      '市場分析',
      '競合分析',
      '事業機会評価',
      '戦略提案',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // ===== 教育・研究系 =====

  // AI教育アシスタント
  EDUCATION_ASSISTANT: {
    name: 'AI Education Assistant',
    role: '教育支援の専門家',
    category: 'education',
    description: 'パーソナライズ教材提供、質問応答、学習計画最適化',
    capabilities: [
      '教材生成',
      '質問応答',
      '課題採点',
      '学習計画最適化',
      '進捗分析',
    ],
    maxRetries: 3,
    timeout: 60000,
  },

  // AI研究アシスタント
  RESEARCH_ASSISTANT: {
    name: 'AI Research Assistant',
    role: '研究支援の専門家',
    category: 'education',
    description: '論文検索・要約、データ分析、実験計画支援',
    capabilities: [
      '論文検索・要約',
      '実験計画立案',
      'データ分析',
      '統計解析',
      '論文執筆支援',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // ===== 専門分野特化型 =====

  // AI医療診断アシスタント
  MEDICAL_ASSISTANT: {
    name: 'AI Medical Diagnosis Assistant',
    role: '医療診断支援の専門家',
    category: 'specialized',
    description: '症状分析、診断支援、治療計画提案',
    capabilities: [
      '症状分析',
      '疾患可能性提示',
      '治療計画提案',
      '薬剤相互作用チェック',
      '医療ガイドライン参照',
    ],
    maxRetries: 2,
    timeout: 90000,
  },

  // AI建築デザイナー
  ARCHITECT_DESIGNER: {
    name: 'AI Architect Designer',
    role: '建築デザインの専門家',
    category: 'specialized',
    description: '建築設計案生成、構造計算、シミュレーション',
    capabilities: [
      '設計案生成',
      '間取り最適化',
      '構造計算支援',
      '日照シミュレーション',
      '3Dモデル生成',
    ],
    maxRetries: 2,
    timeout: 120000,
  },

  // AI専門翻訳家
  SPECIALIZED_TRANSLATOR: {
    name: 'AI Specialized Translator',
    role: '専門分野翻訳の専門家',
    category: 'specialized',
    description: '専門分野（医療、法律、技術等）の高精度翻訳',
    capabilities: [
      '医療文書翻訳',
      '法律文書翻訳',
      '技術文書翻訳',
      '金融文書翻訳',
      '用語集管理',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AI経理担当者
  BOOKKEEPER: {
    name: 'AI Bookkeeper',
    role: '経理業務の専門家',
    category: 'business',
    description: '日次経理業務の自動化、帳簿記帳、財務報告',
    capabilities: [
      '仕訳入力',
      '帳簿記帳',
      '請求書発行・管理',
      '支払処理',
      '経費精算処理',
      '月次試算表作成',
      '予実管理',
    ],
    maxRetries: 3,
    timeout: 60000,
  },

  // AIマーケティングディレクター
  MARKETING_DIRECTOR: {
    name: 'AI Marketing Director',
    role: 'マーケティング戦略の統括責任者',
    category: 'business',
    description: '全マーケティングチャネルを統括し、統合マーケティング戦略を策定・実行',
    capabilities: [
      '統合マーケティング戦略策定',
      'キャンペーン計画',
      'チャネル最適化',
      'ROI分析',
      'チーム統括',
      '予算配分',
      'パフォーマンスダッシュボード',
    ],
    dependencies: ['AI_MARKETER', 'SEO_SPECIALIST', 'SNS_MARKETER_INSTAGRAM', 'SNS_MARKETER_TWITTER'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AISEOスペシャリスト
  SEO_SPECIALIST: {
    name: 'AI SEO Specialist',
    role: 'SEO最適化の専門家',
    category: 'business',
    description: 'オーガニックトラフィック増加のための包括的なSEO戦略を策定・実行',
    capabilities: [
      'キーワードリサーチ',
      'オンページ最適化',
      'テクニカルSEO',
      'コンテンツ戦略',
      '被リンク構築',
      '競合分析',
      'SEO監査',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AISNSマーケター (Instagram)
  SNS_MARKETER_INSTAGRAM: {
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
    maxRetries: 3,
    timeout: 90000,
  },

  // AISNSマーケター (X/Twitter)
  SNS_MARKETER_TWITTER: {
    name: 'AI SNS Marketer (X/Twitter)',
    role: 'X (旧Twitter)専門のSNSマーケティングの専門家',
    category: 'business',
    description: 'X投稿戦略、スレッド作成、リアルタイムエンゲージメント最適化を実行',
    capabilities: [
      'コンテンツ戦略立案',
      'ツイート作成',
      'スレッド作成',
      'ハッシュタグリサーチ',
      'エンゲージメント最適化',
      'インフルエンサー連携',
      'アナリティクス分析',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIランディングページデザイナー
  LANDING_PAGE_DESIGNER: {
    name: 'AI Landing Page Designer',
    role: 'ランディングページ設計・最適化の専門家',
    category: 'creative',
    description: '高コンバージョン率のLPを設計し、A/Bテスト、ヒートマップ分析、UX改善を実行',
    capabilities: [
      'LP設計',
      'コンバージョン最適化',
      'A/Bテスト設計',
      'ヒートマップ分析',
      'コピーライティング',
      'CTA最適化',
      'モバイル最適化',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIEmailマーケター
  EMAIL_MARKETER: {
    name: 'AI Email Marketer',
    role: 'Emailマーケティングの専門家',
    category: 'creative',
    description: 'セグメンテーション、パーソナライゼーション、A/Bテスト、自動化シーケンスでROI最大化',
    capabilities: [
      'Emailキャンペーン作成',
      'セグメンテーション',
      'パーソナライゼーション',
      'A/Bテスト',
      '自動化シーケンス',
      'リスト成長',
      'パフォーマンス分析',
    ],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIデザインディレクター
  DESIGN_DIRECTOR: {
    name: 'AI Design Director',
    role: 'デザイン戦略の統括責任者',
    category: 'creative',
    description: '全デザインエージェントを統括し、統合デザイン戦略を策定・実行',
    capabilities: [
      'デザイン戦略策定',
      'ブランドガイドライン作成',
      'デザインシステム構築',
      'チーム統括',
      'プロジェクト管理',
      '品質レビュー',
      'パフォーマンスダッシュボード',
    ],
    dependencies: ['AI_DESIGNER', 'LANDING_PAGE_DESIGNER', 'AI_ILLUSTRATOR'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIコンテンツクリエイターディレクター
  CONTENT_CREATOR_DIRECTOR: {
    name: 'AI Content Creator Director',
    role: 'コンテンツクリエイション戦略の統括責任者',
    category: 'creative',
    description: '全コンテンツクリエイター（Writer、Video Creator、SNS Content Creator等）を統括し、統合コンテンツ戦略を策定・実行',
    capabilities: [
      '統合コンテンツ戦略策定',
      '編集カレンダー作成',
      'クリエイターチーム統括',
      'コンテンツ品質レビュー',
      'パフォーマンスダッシュボード',
      'ブランドボイス管理',
      'コンテンツ配信戦略',
    ],
    dependencies: ['AI_WRITER', 'CONTENT_CREATOR', 'SNS_MARKETER_INSTAGRAM', 'SNS_MARKETER_TWITTER'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIウェブサイトデザイナー
  WEBSITE_DESIGNER: {
    name: 'AI Website Designer',
    role: 'Webサイトデザインの専門家',
    category: 'creative',
    description: 'Webサイト全体の設計、UX最適化、レスポンシブデザイン、アクセシビリティ対応を実行',
    capabilities: [
      'Webサイト設計',
      'UX最適化',
      'レスポンシブデザイン',
      'アクセシビリティ改善',
      'SEO最適化デザイン',
      'パフォーマンス最適化',
      'サイト構造設計',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // AISNSコンテンツクリエイター (Instagram)
  SNS_CONTENT_CREATOR_INSTAGRAM: {
    name: 'AI SNS Content Creator (Instagram)',
    role: 'Instagram専門コンテンツクリエイターの専門家',
    category: 'creative',
    description: 'Instagram投稿コンテンツ、ストーリーズ、リールの制作を実行',
    capabilities: [
      '投稿コンテンツ作成',
      'ストーリーズ作成',
      'リール作成',
      'キャプションライティング',
      'ハッシュタグ戦略',
      'カルーセルデザイン',
      'アナリティクス分析',
    ],
    dependencies: ['SNS_MARKETER_INSTAGRAM'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AISNSコンテンツクリエイター (X/Twitter)
  SNS_CONTENT_CREATOR_TWITTER: {
    name: 'AI SNS Content Creator (X/Twitter)',
    role: 'X (旧Twitter)専門コンテンツクリエイターの専門家',
    category: 'creative',
    description: 'Xツイート、スレッド、エンゲージメントコンテンツの制作を実行',
    capabilities: [
      'ツイート作成',
      'スレッド作成',
      'エンゲージメント戦略',
      'トレンド分析',
      'リプライ戦略',
      'ハッシュタグリサーチ',
      'アナリティクス分析',
    ],
    dependencies: ['SNS_MARKETER_TWITTER'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIビデオクリエイター
  VIDEO_CREATOR: {
    name: 'AI Video Creator',
    role: '動画コンテンツ制作の専門家',
    category: 'creative',
    description: 'YouTube、TikTok、Instagram Reels等の動画コンテンツ制作を実行',
    capabilities: [
      '動画スクリプト作成',
      '絵コンテ生成',
      '動画編集',
      'YouTube最適化',
      'ショート動画作成',
      '動画アナリティクス',
      'サムネイルデザイン',
    ],
    maxRetries: 3,
    timeout: 180000,
  },

  // AIミュージッククリエイター
  MUSIC_CREATOR: {
    name: 'AI Music Creator',
    role: '音楽・BGM制作の専門家',
    category: 'creative',
    description: 'BGM、効果音、ジングル等の音楽コンテンツ制作を実行',
    capabilities: [
      '音楽作曲',
      'BGM作成',
      '効果音生成',
      'オーディオミキシング',
      'ムードマッチング',
      'ジャンル作成',
      'オーディオ分析',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // AI広告運用スペシャリスト
  AD_OPERATIONS_SPECIALIST: {
    name: 'AI Ad Operations Specialist',
    role: '広告運用の専門家',
    category: 'business',
    description: 'Google Ads、Meta Ads、LINE Ads等の広告運用を実行',
    capabilities: [
      'キャンペーン設定',
      '入札最適化',
      '広告クリエイティブテスト',
      '予算配分',
      'パフォーマンス分析',
      'ROI追跡',
      'オーディエンスターゲティング',
    ],
    dependencies: ['MARKETING_DIRECTOR'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AI広報スペシャリスト
  PR_SPECIALIST: {
    name: 'AI PR Specialist',
    role: '広報・PR活動の専門家',
    category: 'business',
    description: 'プレスリリース、メディア対応、危機管理、ブランドストーリーテリングを実行',
    capabilities: [
      'プレスリリース作成',
      'メディアアウトリーチ',
      '危機管理',
      'ブランドストーリーテリング',
      'インフルエンサーリレーション',
      'PR戦略策定',
      'メディアモニタリング',
    ],
    dependencies: ['MARKETING_DIRECTOR'],
    maxRetries: 3,
    timeout: 90000,
  },

  // ===== Phase 4-A: ビジネス収益化 =====

  // AI電子書籍出版エージェント
  EBOOK_PUBLISHING: {
    name: 'AI eBook Publishing Agent',
    role: '電子書籍出版の専門家',
    category: 'business',
    description: '電子書籍企画、原稿執筆、表紙デザイン、Kindle/Apple Books等への出版、マーケティング戦略を実行',
    capabilities: [
      '電子書籍企画・構成作成',
      '原稿執筆・編集',
      '表紙デザイン・フォーマット',
      'Kindle/Apple Books等への出版',
      'マーケティング戦略',
      '収益最適化',
      'レビュー分析・改善提案',
    ],
    dependencies: ['AI_WRITER', 'AI_DESIGNER'],
    maxRetries: 3,
    timeout: 120000,
  },

  // AI副業ビジネスモデルエージェント
  SIDE_BUSINESS_MODEL: {
    name: 'AI Side Business Model Agent',
    role: '副業ビジネスモデル構築の専門家',
    category: 'business',
    description: '副業アイデア提案、ビジネスモデル設計、収益予測、リスク分析、実行計画作成を実行',
    capabilities: [
      '副業アイデア提案',
      'ビジネスモデル設計',
      '収益予測とシミュレーション',
      'リスク分析',
      '実行計画作成',
      'スキルマッチング',
      '競合分析',
    ],
    dependencies: ['STRATEGY_CONSULTANT', 'FINANCIAL_ANALYST'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIモデル作成エージェント
  MODEL_CREATION: {
    name: 'AI Model Creation Agent',
    role: 'AIモデル作成・トレーニングの専門家',
    category: 'development',
    description: 'AIモデル設計、データセット準備、モデルトレーニング、ハイパーパラメータチューニング、評価、デプロイメント準備を実行',
    capabilities: [
      'AIモデル設計・アーキテクチャ選定',
      'データセット準備・前処理',
      'モデルトレーニング・最適化',
      'ハイパーパラメータチューニング',
      'モデル評価・検証',
      'デプロイメント準備',
      'モニタリング・改善',
    ],
    dependencies: ['AI_ENGINEER', 'DATA_ANALYST'],
    maxRetries: 3,
    timeout: 180000,
  },

  // ===== Phase 4: 新規実装エージェント =====

  // AIフルスタックコードエンジニア
  AI_FULLSTACK_CODE_ENGINEER: {
    name: 'AI Full-Stack Code Engineer',
    role: 'フルスタック開発専門エンジニア',
    category: 'development',
    description: 'フロントエンド、バックエンド、データベース、インフラまで幅広い技術スタックに対応した包括的な開発設計・アーキテクチャ構築',
    capabilities: [
      'フルスタックアプリケーション設計',
      'フロントエンド開発（React、Vue、Angular等）',
      'バックエンド開発（Node.js、Python、Java等）',
      'データベース設計・最適化',
      'クラウドインフラ構築',
      'API設計・開発',
      'システムアーキテクチャ設計',
      'スケーラビリティ対応',
    ],
    dependencies: ['AI_ENGINEER'],
    maxRetries: 3,
    timeout: 120000,
  },

  // AIフルスタックプログラマー
  AI_FULLSTACK_PROGRAMMER: {
    name: 'AI Full-Stack Programmer',
    role: 'フルスタックプログラミング実装専門家',
    category: 'development',
    description: 'Code Engineerが設計した内容を実際のコードとして実装。コンポーネント、API、データベース、サービス層の実装を担当',
    capabilities: [
      'React/Vue/Angularコンポーネント実装',
      'REST API実装',
      'データベーススキーマ実装',
      'サービス層実装',
      'テストコード実装',
      'バグ修正・最適化',
      'リファクタリング',
      '新機能追加実装',
    ],
    dependencies: ['AI_FULLSTACK_CODE_ENGINEER', 'AI_ENGINEER'],
    maxRetries: 3,
    timeout: 90000,
  },

  // AIリサーチアシスタント
  AI_RESEARCH_ASSISTANT: {
    name: 'AI Research Assistant',
    role: '学術研究・論文執筆支援専門家',
    category: 'data-analytics',
    description: '文献調査、データ分析、論文執筆、研究企画をサポート。学術的な研究プロセス全体を支援',
    capabilities: [
      '文献レビュー・調査',
      '研究提案書作成',
      'データ分析・統計解析',
      '論文執筆支援',
      '引用管理・参考文献整理',
      '研究方法論設計',
      'ピアレビュー実施',
      '研究倫理対応',
    ],
    dependencies: ['RESEARCH_ANALYST', 'DATA_ANALYST'],
    maxRetries: 3,
    timeout: 120000,
  },

  // AIデータエンジニア
  AI_DATA_ENGINEER: {
    name: 'AI Data Engineer',
    role: 'データパイプライン構築・データインフラ専門家',
    category: 'data-analytics',
    description: 'データ収集、変換、格納、監視の自動化。ETL/ELTパイプライン、データウェアハウス、ストリーミング処理の設計・構築',
    capabilities: [
      'データパイプライン設計・構築',
      'ETL/ELTプロセス開発',
      'データウェアハウス設計',
      'ストリーミングデータ処理',
      'データ品質管理',
      'パフォーマンス最適化',
      'データ監視・アラート',
      'クラウドインフラ設計',
    ],
    dependencies: ['DATA_ANALYST', 'BI_AGENT'],
    maxRetries: 3,
    timeout: 180000,
  },

  // AIクリエイティブデザイナー
  AI_CREATIVE_DESIGNER: {
    name: 'AI Creative Designer',
    role: 'クリエイティブデザイン全般専門家',
    category: 'creative',
    description: 'ブランドアイデンティティ、アート制作、視覚的コンテンツ創作。Design Directorとの連携でクリエイティブ制作力を向上',
    capabilities: [
      'ブランドアイデンティティ作成',
      'ビジュアルコンセプト開発',
      'アート・イラスト制作',
      'デザインシステム構築',
      'クリエイティブキャンペーン',
      'スタイルガイド作成',
      'プロトタイプデザイン',
      'クリエイティブ戦略',
    ],
    dependencies: ['DESIGN_DIRECTOR', 'AI_DESIGNER'],
    maxRetries: 3,
    timeout: 120000,
  },

  // AIゲームデザイナー
  AI_GAME_DESIGNER: {
    name: 'AI Game Designer',
    role: 'ゲームデザイン専門家',
    category: 'creative',
    description: 'ゲームコンセプト、メカニクス、レベルデザイン、ストーリー作成。ゲーム開発の包括的なデザイン支援',
    capabilities: [
      'ゲームコンセプト設計',
      'ゲームメカニクス設計',
      'レベルデザイン',
      'ストーリー・キャラクター作成',
      'ゲームバランス調整',
      'マネタイゼーション設計',
      'ユーザーエクスペリエンス最適化',
      'プロトタイプ設計',
    ],
    maxRetries: 3,
    timeout: 120000,
  },

  // AI専門翻訳家
  AI_SPECIALIZED_TRANSLATOR: {
    name: 'AI Specialized Translator',
    role: '専門分野翻訳専門家',
    category: 'specialized',
    description: '医療、法律、技術、金融等の専門分野の高精度翻訳。専門用語管理、品質保証、文化的適応を含む包括的翻訳サービス',
    capabilities: [
      '医療・法律・技術・金融翻訳',
      '専門用語管理',
      '品質保証・一貫性チェック',
      'ローカライゼーション',
      '文化的適応',
      '翻訳認証',
      '規制対応翻訳',
      '専門家レビュー調整',
    ],
    dependencies: ['AI_WRITER'],
    maxRetries: 3,
    timeout: 150000,
  },

  // AI公認会計士
  AI_CERTIFIED_PUBLIC_ACCOUNTANT: {
    name: 'AI Certified Public Accountant',
    role: 'AI公認会計士',
    category: 'business',
    description: '高度な会計・監査・税務・財務分析業務。企業の財務健全性確保と税務最適化を支援',
    capabilities: [
      '財務諸表監査',
      '財務分析・比率分析',
      '税務計画・最適化',
      'コンプライアンス審査',
      '財務報告書作成',
      'リスク評価',
      'フォレンジック会計',
      '企業価値評価',
    ],
    dependencies: ['FINANCIAL_ANALYST', 'BOOKKEEPER', 'TAX_ACCOUNTANT'],
    maxRetries: 3,
    timeout: 180000,
  },

  // AI建築デザイナー
  AI_ARCHITECT_DESIGNER: {
    name: 'AI Architect Designer',
    role: '建築デザイン専門家',
    category: 'specialized',
    description: '建築設計、構造計算、建築基準法対応、3Dモデリング。⚠️概念設計・教育目的のみ。実際の建築工事には資格建築士が必要',
    capabilities: [
      '概念設計・空間計画',
      '構造分析・建築基準法確認',
      '環境設計・持続可能性',
      'コスト見積もり',
      '3Dモデリング仕様',
      '技術図面仕様',
      '建築法規コンプライアンス',
      '建築プロジェクト管理',
    ],
    dependencies: ['AI_DESIGNER'],
    maxRetries: 2,
    timeout: 150000,
  },

  // AI医療診断アシスタント
  AI_MEDICAL_DIAGNOSIS_ASSISTANT: {
    name: 'AI Medical Diagnosis Assistant',
    role: 'AI医療診断支援専門家',
    category: 'specialized',
    description: '症状分析、診断支援、治療計画提案。🚨教育・研究目的のみ。実際の医療診断・治療には絶対使用禁止。必ず医療専門家の診断を受けること',
    capabilities: [
      '症状分析・システムレビュー',
      '鑑別診断生成・教育',
      '治療選択肢・教育的議論',
      '薬物相互作用チェック',
      '医療リスク評価',
      '医学教育サポート',
      '医療研究支援',
      '臨床推論教育',
    ],
    maxRetries: 2,
    timeout: 120000,
  },
};

// カテゴリ別にエージェントを取得する関数
export function getAgentsByCategory(category: string): AgentConfig[] {
  return Object.values(AGENT_CONFIGS).filter((config) => config.category === category);
}

// すべてのカテゴリを取得する関数
export function getAllCategories(): string[] {
  const categories = new Set(Object.values(AGENT_CONFIGS).map((config) => config.category));
  return Array.from(categories);
}

// エージェント名でコンフィグを取得する関数
export function getAgentConfig(agentKey: string): AgentConfig | undefined {
  return AGENT_CONFIGS[agentKey];
}
