`# 🌸 AI Agents Miyabi

**各分野に特化したAIエージェントシステム - Miyabiで実現する自律的開発プラットフォーム**

## 📋 概要

AI Agents Miyabiは、30以上の専門分野に特化したAIエージェントを統合した、包括的な自律型開発プラットフォームです。各エージェントが協調して動作し、ビジネスの立ち上げから運用まで、あらゆるフェーズをサポートします。

## ✨ 特徴

- **30+の専門エージェント**: データ分析、クリエイティブ、開発、ビジネス、教育、専門分野に特化
- **統合オーケストレーション**: 複数エージェントの協調動作を自動管理
- **ワークフロー自動化**: 複雑なタスクを段階的に自動実行
- **GitHub統合**: Miyabiによる完全な自動化ワークフロー
- **TypeScript実装**: 型安全で拡張性の高いアーキテクチャ

## 🤖 利用可能なエージェント

### 📊 データ・分析系
- **AI Data Analyst** - データ分析と予測モデル構築
- **AI Business Intelligence Agent** - KPI分析とレポート自動生成
- **AI Research Analyst** - 市場調査と競合分析

### 🎨 クリエイティブ系
- **AI Writer** - ブログ、SNS、広告コピーなど多様なコンテンツ生成
- **AI Designer** - UI/UXデザイン、グラフィック生成
- **AI Illustrator** - イラスト、コンセプトアート作成
- **AI Content Creator** - 動画スクリプト、音楽作曲
- **AI Game Designer** - ゲームコンセプト、レベルデザイン

### 💻 開発・運用系
- **AI Engineer** - コード生成、デバッグ、最適化
- **AI Test Engineer** - テストケース生成、自動テスト実行
- **AI Security Engineer** - 脆弱性スキャン、セキュリティ分析
- **AI DevOps Agent** - CI/CD構築、インフラ管理
- **AI N8N Builder** - n8nワークフロー設計、構築、最適化

### 💼 ビジネス・戦略系
- **AI Business Launcher** - 事業立ち上げの統括、ロードマップ作成
- **AI Strategy Consultant** - SWOT分析、戦略提案
- **AI Project Manager** - WBS生成、進捗管理
- **AI Sales Agent** - リードスコアリング、営業資料作成
- **AI Customer Support** - 問い合わせ対応、FAQ生成
- **AI Financial Analyst** - 財務分析、予算策定
- **AI Legal Advisor** - 契約書レビュー、コンプライアンスチェック
- **AI Marketer** - 市場分析、キャンペーン戦略

### 📚 教育・研究系
- **AI Education Assistant** - パーソナライズ教材、学習計画最適化
- **AI Research Assistant** - 論文検索・要約、実験計画支援

### 🏥 専門分野特化型
- **AI Medical Diagnosis Assistant** - 症状分析、診断支援
- **AI Architect Designer** - 建築設計案生成、構造計算
- **AI Specialized Translator** - 専門分野（医療、法律、技術）翻訳
- **AI Prompt Engineer** - プロンプト設計・最適化

## 🚀 クイックスタート

### 1. インストール

```bash
# リポジトリのクローン
git clone https://github.com/yyamamoto1/ai-agents-miyabi.git
cd ai-agents-miyabi

# 依存関係のインストール
npm install
```

### 2. 基本的な使い方

```typescript
import { AgentOrchestrator } from './src/core/AgentOrchestrator.js';
import { AIWriterAgent } from './src/agents/creative/AIWriterAgent.js';

// オーケストレーターの初期化
const orchestrator = new AgentOrchestrator();

// エージェントの登録
orchestrator.registerAgent(new AIWriterAgent());

// エージェントの初期化
await orchestrator.initializeAll();

// タスクの実行
const result = await orchestrator.executeTask('AI Writer', {
  type: 'content-generation',
  priority: 'high',
  input: {
    contentType: 'blog',
    topic: 'AIエージェントの活用方法',
    tone: 'professional',
    length: 'medium',
  },
});

console.log(result.data.content);
```

### 3. 実行

```bash
# 開発モード
npm run dev

# ビルド
npm run build

# テスト
npm run test
```

## 📖 使用例

### 例1: ブログ記事の自動生成

```typescript
const writerResult = await orchestrator.executeTask('AI Writer', {
  type: 'content-generation',
  priority: 'high',
  input: {
    contentType: 'blog',
    topic: 'TypeScriptのベストプラクティス',
    tone: 'technical',
    length: 'long',
    keywords: ['TypeScript', '型安全', 'ベストプラクティス'],
  },
});
```

### 例2: コード生成とテスト

```typescript
// コード生成
const codeResult = await orchestrator.executeTask('AI Engineer', {
  type: 'code-generation',
  priority: 'high',
  input: {
    taskType: 'generate',
    language: 'typescript',
    description: 'REST API エンドポイント',
    requirements: ['認証', 'バリデーション', 'エラーハンドリング'],
  },
});

// テスト生成
const testResult = await orchestrator.executeTask('AI Test Engineer', {
  type: 'test-generation',
  priority: 'high',
  input: {
    code: codeResult.data.code,
    language: 'typescript',
    framework: 'vitest',
  },
});
```

### 例3: 事業立ち上げのロードマップ作成

```typescript
const businessResult = await orchestrator.executeTask('AI Business Launcher', {
  type: 'business-planning',
  priority: 'critical',
  input: {
    businessIdea: 'AI搭載の健康管理アプリ',
    targetMarket: '健康志向の20-40代',
    budget: 10000000,
    objectives: [
      'ユーザー5000人獲得',
      '月次収益200万円',
      'App Store評価4.5以上',
    ],
  },
});

// ロードマップの表示
businessResult.data.roadmap.phases.forEach(phase => {
  console.log(`${phase.name}: ${phase.duration}`);
  phase.milestones.forEach(milestone => {
    console.log(`  - ${milestone.name}`);
  });
});
```

### 例4: ワークフローの実行

```typescript
// 複数エージェントを組み合わせたワークフロー
orchestrator.registerWorkflow({
  id: 'content-marketing-pipeline',
  name: 'コンテンツマーケティングパイプライン',
  description: '市場調査からコンテンツ作成、配信までの自動化',
  steps: [
    {
      agentName: 'AI Research Analyst',
      task: {
        type: 'market-research',
        priority: 'high',
        input: { topic: 'AIツール市場', depth: 'comprehensive' },
      },
    },
    {
      agentName: 'AI Writer',
      task: {
        type: 'content-generation',
        priority: 'high',
        input: { contentType: 'blog', topic: '市場調査結果に基づく記事' },
      },
      dependsOn: ['AI Research Analyst'],
    },
    {
      agentName: 'AI Designer',
      task: {
        type: 'design-generation',
        priority: 'medium',
        input: { designType: 'blog-thumbnail' },
      },
      dependsOn: ['AI Writer'],
    },
    {
      agentName: 'AI Marketer',
      task: {
        type: 'campaign-planning',
        priority: 'high',
        input: { content: 'from-previous-step', channels: ['SNS', 'Email'] },
      },
      dependsOn: ['AI Writer', 'AI Designer'],
    },
  ],
});

// ワークフローの実行
const results = await orchestrator.executeWorkflow('content-marketing-pipeline');
```

## 🏗️ アーキテクチャ

```
ai-agents-miyabi/
├── src/
│   ├── core/                    # コアシステム
│   │   ├── BaseAgent.ts         # エージェント基底クラス
│   │   └── AgentOrchestrator.ts # オーケストレーター
│   ├── agents/                  # エージェント実装
│   │   ├── creative/            # クリエイティブ系
│   │   ├── development/         # 開発系
│   │   ├── business/            # ビジネス系
│   │   ├── data-analytics/      # データ分析系
│   │   ├── education/           # 教育系
│   │   └── specialized/         # 専門分野系
│   ├── config/                  # 設定ファイル
│   │   └── agents.config.ts     # エージェント設定
│   ├── utils/                   # ユーティリティ
│   └── index.ts                 # メインエントリーポイント
├── .github/
│   └── workflows/               # GitHub Actions (Miyabi自動生成)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 カスタマイズ

### 新しいエージェントの追加

```typescript
import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';

export class MyCustomAgent extends BaseAgent {
  constructor() {
    super({
      name: 'My Custom Agent',
      role: 'カスタム処理の専門家',
      category: 'custom',
      description: 'カスタム処理を実行',
      capabilities: ['機能1', '機能2'],
    });
  }

  protected async setup(): Promise<void> {
    // 初期化処理
  }

  protected async process(task: AgentTask): Promise<any> {
    // メイン処理
    return { result: 'success' };
  }

  protected async cleanup(): Promise<void> {
    // クリーンアップ処理
  }
}
```

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📄 ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🌟 Miyabiについて

このプロジェクトは[Miyabi](https://github.com/ShunsukeHayashi/Miyabi)を使用して構築されています。Miyabiは、AIエージェントによる自律的な開発を実現するためのフレームワークです。

## 📞 サポート

- GitHub Issues: [https://github.com/yyamamoto1/ai-agents-miyabi/issues](https://github.com/yyamamoto1/ai-agents-miyabi/issues)
- Documentation: プロジェクトWiki参照

---

**Made with 🌸 Miyabi - Beauty in Autonomous Development**
