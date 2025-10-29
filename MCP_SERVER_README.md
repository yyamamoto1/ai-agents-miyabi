# ai-agents-miyabi MCP Server

**54種類のエージェントを統制するMCPサーバー**

## 概要

ai-agents-miyabi MCP Serverは、Claude Codeと連携して複数のAIエージェントを自動起動・管理するサーバーです。特定のタスクを受信すると、自動的にTMUX環境を構築し、適切なエージェントチームを選択して分散実行します。

## 主要機能

### ✨ 自動エージェント選択
- タスク内容を解析して最適なエージェントを自動選択
- 54種類のエージェントから最大5体まで同時実行

### 🖥️ TMUX環境自動構築
- エージェント数に応じた最適なペイン配置
- リアルタイムでの実行状況監視

### 🎯 Miyabi連携
- npx miyabiコマンドとの完全統合
- 既存エージェントカタログの活用

## セットアップ

### 1. 依存関係インストール
```bash
cd "/Users/y/Library/Mobile Documents/com~apple~CloudDocs/dev/ai-agents-miyabi"
npm install
```

### 2. MCP Server起動
```bash
npm run mcp-server
```

### 3. Claude Code設定
Claude Codeの設定にMCPサーバーを追加：

```json
{
  "mcpServers": {
    "ai-agents-miyabi": {
      "command": "npm",
      "args": ["run", "mcp-server"],
      "cwd": "/Users/y/Library/Mobile Documents/com~apple~CloudDocs/dev/ai-agents-miyabi"
    }
  }
}
```

## 利用可能なツール

### `execute_agent_task`
タスクをエージェントチームで実行

**パラメータ:**
- `task` (必須): 実行するタスクの説明
- `priority`: タスク優先度 (low/medium/high/critical)
- `agents`: 特定エージェント指定 (省略時は自動選択)
- `timeout`: タイムアウト秒数 (デフォルト: 300)

**例:**
```json
{
  "task": "Webアプリケーションのユーザー分析ダッシュボードを作成してください",
  "priority": "high",
  "timeout": 600
}
```

### `list_available_agents`
利用可能な全エージェントを表示

**パラメータ:**
- `category`: カテゴリ別フィルタ (省略可)

### `get_agent_status`
実行中エージェントの状態確認

### `terminate_agents`
全エージェント終了とクリーンアップ

## エージェントカテゴリ

### 📊 データ・分析系 (9エージェント)
- ai-data-analyst
- ai-business-intelligence-agent
- ai-market-research-analyst
- ai-predictive-analytics-agent
- ai-trend-forecaster
- ai-data-scientist
- ai-statistical-analyst
- ai-visualization-specialist
- ai-etl-engineer

### 🎨 クリエイティブ・コンテンツ生成系 (9エージェント)
- ai-content-creator
- ai-copywriter
- ai-social-media-manager
- ai-ui-ux-designer
- ai-graphic-designer
- ai-brand-strategist
- ai-video-creator
- ai-podcast-producer
- ai-creative-director

### 💻 開発・運用・管理系 (10エージェント)
- ai-software-developer
- ai-devops-engineer
- ai-code-reviewer
- ai-qa-tester
- ai-security-analyst
- ai-performance-optimizer
- ai-system-architect
- ai-database-admin
- ai-cloud-engineer
- ai-automation-specialist

### 💼 ビジネス・戦略・顧客対応系 (9エージェント)
- ai-business-strategist
- ai-consultant
- ai-project-manager
- ai-customer-service-agent
- ai-sales-representative
- ai-support-specialist
- ai-marketing-specialist
- ai-product-manager
- ai-operations-manager

### 📚 教育・研究系 (8エージェント)
- ai-educator
- ai-training-specialist
- ai-curriculum-designer
- ai-research-analyst
- ai-academic-writer
- ai-language-tutor
- ai-assessment-creator
- ai-learning-designer

### 🏛️ 専門分野特化型 (11エージェント)
- ai-legal-advisor
- ai-compliance-officer
- ai-contract-analyst
- ai-medical-advisor
- ai-health-analyst
- ai-clinical-researcher
- ai-financial-analyst
- ai-investment-advisor
- ai-risk-manager
- ai-hr-specialist
- ai-recruitment-specialist

## 使用例

### 1. データ分析タスク
```bash
# Claude Codeで実行
execute_agent_task(task="売上データから来月の予測モデルを作成")
```

**自動選択されるエージェント:**
- ai-data-analyst
- ai-predictive-analytics-agent
- ai-visualization-specialist

### 2. Webアプリ開発
```bash
execute_agent_task(task="React+TypeScriptでTodoアプリを開発", priority="high")
```

**自動選択されるエージェント:**
- ai-software-developer
- ai-ui-ux-designer
- ai-qa-tester

### 3. マーケティング戦略
```bash
execute_agent_task(task="新商品のマーケティング戦略立案とコンテンツ作成")
```

**自動選択されるエージェント:**
- ai-marketing-specialist
- ai-content-creator
- ai-business-strategist

## 実行フロー

```
Claude Code
    ↓ タスク送信
MCP Server (タスク解析)
    ↓ エージェント選択
TMUX Manager (環境構築)
    ↓ セッション作成
Agent Orchestrator (エージェント起動)
    ↓ タスク分散
Agent Team (並列実行)
    ↓ 結果統合
Claude Code (完了報告)
```

## 監視・デバッグ

### TMUX セッション確認
```bash
tmux list-sessions | grep ai-agents
```

### ログ確認
```bash
tail -f logs/mcp-server.log
```

### エージェント状態確認
```bash
# Claude Codeで実行
get_agent_status()
```

## トラブルシューティング

### TMUX セッションが残っている場合
```bash
tmux kill-session -t ai-agents-*
```

### エージェントが応答しない場合
```bash
# Claude Codeで実行
terminate_agents()
```

### MCPサーバー再起動
```bash
npm run mcp-server
```

## 開発・拡張

### 新しいエージェント追加
1. `src/agents/` に新しいエージェントディレクトリ作成
2. `mcp-server/task-mapper.ts` にマッピング追加
3. `mcp-server/config.json` にカテゴリ追加

### カスタムタスクマッピング
`mcp-server/task-mapper.ts` の `initializeAgentMappings()` メソッドを編集

## ライセンス

MIT License

---

**🤖 ai-agents-miyabi - 54種類のエージェントによる自律的タスク実行システム**