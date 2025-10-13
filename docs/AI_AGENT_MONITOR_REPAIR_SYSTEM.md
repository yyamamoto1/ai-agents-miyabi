# AI Agent Monitor & Repair System (AIエージェント監視・修復システム)

## 概要

AIエージェントの自己修復・メンテナンス・改善履歴管理のシステム。
複数のエージェントで構成される自己修復エコシステム。

---

## システム構成

### 1. AI Agent Health Monitor (AIエージェント健全性監視)

**役割**: エージェントの動作監視・異常検知

**機能**:
- 全エージェントの実行ログ監視
- エラー検知・分類（構文エラー、ロジックエラー、パフォーマンス劣化）
- 異常パターン検出（レスポンス遅延、失敗率上昇）
- 健全性スコア算出
- アラート通知

---

### 2. AI Agent Auto Repair Engineer (AIエージェント自動修復エンジニア)

**役割**: エージェントの自動修復

**機能**:
- エラー原因分析
- 修復提案生成
- 自動修復実行（簡易的なもの）
- 修復不可能な場合は専門エージェントにエスカレーション
- 修復前後のテスト実行

**エスカレーション先**:
- **AI Engineer** - コード構造の問題
- **AI Full-Stack Code Engineer** - フルスタック統合の問題
- **AI Prompt Engineer** - プロンプト設計の問題
- **AI Test Engineer** - テストケースの問題

---

### 3. AI Agent Improvement Tracker (AIエージェント改善履歴管理)

**役割**: 改善履歴の記録・分析

**機能**:
- 修復履歴データベース管理
- レポート生成（報告日時、エラー内容、修復内容、担当エージェント）
- トレンド分析（頻発エラーの特定）
- 改善効果測定
- ナレッジベース構築

---

## 実装設計

### AIAgentHealthMonitorAgent

```typescript
// src/agents/development/AIAgentHealthMonitorAgent.ts
export class AIAgentHealthMonitorAgent extends BaseAgent {
  async process(input: MonitorInput): Promise<MonitorOutput> {
    const taskType = input.taskType;

    switch(taskType) {
      case 'health-check': return await this.performHealthCheck(input);
      case 'error-detection': return await this.detectErrors(input);
      case 'performance-analysis': return await this.analyzePerformance(input);
      case 'alert': return await this.sendAlert(input);
      default: throw new Error(`Unknown task type: ${taskType}`);
    }
  }

  private async detectErrors(input: any): Promise<ErrorReport> {
    // エラーログ分析
    const errors = await this.analyzeAgentLogs();
    return {
      timestamp: new Date(),
      affectedAgent: 'AISalesAgent',
      errorType: 'logic_error',
      severity: 'high',
      errorMessage: 'Lead scoring calculation returns NaN',
      needsRepair: true
    };
  }
}
```

---

### AIAgentAutoRepairEngineerAgent

```typescript
// src/agents/development/AIAgentAutoRepairEngineerAgent.ts
export class AIAgentAutoRepairEngineerAgent extends BaseAgent {
  async process(input: RepairInput): Promise<RepairOutput> {
    const taskType = input.taskType;

    switch(taskType) {
      case 'analyze-error': return await this.analyzeError(input);
      case 'auto-repair': return await this.attemptAutoRepair(input);
      case 'escalate': return await this.escalateToSpecialist(input);
      case 'test-repair': return await this.testRepair(input);
      default: throw new Error(`Unknown task type: ${taskType}`);
    }
  }

  private async attemptAutoRepair(input: any): Promise<RepairResult> {
    // 修復試行
    const analysis = await this.analyzeError(input);

    if (analysis.complexity === 'simple') {
      // 自動修復
      return await this.applySimpleFix(analysis);
    } else {
      // エスカレーション
      return await this.escalateToSpecialist({
        ...input,
        analysis,
        escalateTo: this.determineSpecialist(analysis)
      });
    }
  }

  private determineSpecialist(analysis: ErrorAnalysis): string {
    if (analysis.category === 'code_structure') return 'AIEngineer';
    if (analysis.category === 'prompt_design') return 'AIPromptEngineer';
    if (analysis.category === 'fullstack_integration') return 'AIFullStackCodeEngineer';
    if (analysis.category === 'test_coverage') return 'AITestEngineer';
    return 'AIEngineer'; // デフォルト
  }
}
```

---

### AIAgentImprovementTrackerAgent

```typescript
// src/agents/development/AIAgentImprovementTrackerAgent.ts
export class AIAgentImprovementTrackerAgent extends BaseAgent {
  async process(input: TrackerInput): Promise<TrackerOutput> {
    const taskType = input.taskType;

    switch(taskType) {
      case 'log-repair': return await this.logRepair(input);
      case 'generate-report': return await this.generateReport(input);
      case 'trend-analysis': return await this.analyzeTrends(input);
      case 'knowledge-base': return await this.updateKnowledgeBase(input);
      default: throw new Error(`Unknown task type: ${taskType}`);
    }
  }

  private async logRepair(input: any): Promise<RepairLog> {
    const log: RepairLog = {
      id: generateId(),
      timestamp: new Date(),
      affectedAgent: input.agentName,
      errorDetails: {
        type: input.errorType,
        message: input.errorMessage,
        stackTrace: input.stackTrace
      },
      repairDetails: {
        performedBy: input.repairAgent, // 'AIEngineer', 'AIPromptEngineer'等
        method: input.repairMethod, // 'auto', 'manual', 'escalated'
        changes: input.changes,
        before: input.codeBefore,
        after: input.codeAfter
      },
      testResults: {
        passed: input.testsPassed,
        coverage: input.coverage,
        performanceImprovement: input.performanceImprovement
      },
      status: 'completed',
      notes: input.notes
    };

    await this.saveToDatabase(log);
    return log;
  }

  private async generateReport(input: any): Promise<ImprovementReport> {
    const logs = await this.getRepairLogs(input.timeRange);

    return {
      period: input.timeRange,
      summary: {
        totalRepairs: logs.length,
        autoRepairs: logs.filter(l => l.repairDetails.method === 'auto').length,
        escalatedRepairs: logs.filter(l => l.repairDetails.method === 'escalated').length,
        avgRepairTime: this.calculateAvgTime(logs)
      },
      byAgent: this.groupByAgent(logs),
      byErrorType: this.groupByErrorType(logs),
      topIssues: this.identifyTopIssues(logs),
      improvements: this.measureImprovements(logs)
    };
  }
}
```

---

## データ構造

### RepairLog (修復履歴)

```typescript
interface RepairLog {
  id: string;
  timestamp: Date;

  // 影響を受けたエージェント
  affectedAgent: string;

  // エラー詳細
  errorDetails: {
    type: 'syntax' | 'logic' | 'performance' | 'integration';
    message: string;
    stackTrace?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };

  // 修復詳細
  repairDetails: {
    performedBy: string; // 修復を行ったAIエージェント名
    method: 'auto' | 'manual' | 'escalated';
    changes: string[]; // 変更内容のリスト
    before: string; // 修復前のコード
    after: string; // 修復後のコード
    explanation: string; // なぜこの修正を行ったか
  };

  // テスト結果
  testResults: {
    passed: boolean;
    coverage: number;
    performanceImprovement?: number; // パーセンテージ
  };

  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  notes?: string;
}
```

### ErrorReport (エラーレポート)

```typescript
interface ErrorReport {
  timestamp: Date;
  affectedAgent: string;
  errorType: 'syntax' | 'logic' | 'performance' | 'integration';
  severity: 'low' | 'medium' | 'high' | 'critical';
  errorMessage: string;
  stackTrace?: string;
  needsRepair: boolean;
}
```

### ImprovementReport (改善レポート)

```typescript
interface ImprovementReport {
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalRepairs: number;
    autoRepairs: number;
    escalatedRepairs: number;
    avgRepairTime: number; // 分単位
  };
  byAgent: {
    [agentName: string]: {
      repairCount: number;
      mostCommonErrors: string[];
    };
  };
  byErrorType: {
    [errorType: string]: number;
  };
  topIssues: {
    description: string;
    occurrences: number;
    lastOccurred: Date;
  }[];
  improvements: {
    performanceGain: number; // パーセンテージ
    reliabilityImprovement: number; // パーセンテージ
  };
}
```

---

## 実装フロー

### 1. エラー検知フロー

```
[AIエージェント実行]
       ↓
[Health Monitor: ログ監視]
       ↓
  エラー検知？
       ↓ YES
[ErrorReport生成]
       ↓
[Auto Repair Engineerに通知]
```

### 2. 自動修復フロー

```
[Auto Repair Engineer: エラー分析]
       ↓
  複雑度判定
       ↓
   簡易的？
       ↓ YES
[自動修復実行]
       ↓
[Test Engineer: テスト実行]
       ↓
  成功？
       ↓ YES
[Improvement Tracker: 履歴記録]
```

### 3. エスカレーションフロー

```
[Auto Repair Engineer: エラー分析]
       ↓
  複雑度判定
       ↓
   複雑？
       ↓ YES
[専門エージェント判定]
       ↓
   ├─ コード構造 → AI Engineer
   ├─ プロンプト → AI Prompt Engineer
   ├─ フルスタック → AI Full-Stack Code Engineer
   └─ テスト → AI Test Engineer
       ↓
[専門エージェント: 修復実行]
       ↓
[Improvement Tracker: 履歴記録]
```

---

## タスクタイプ一覧

### AI Agent Health Monitor

| タスクタイプ | 説明 |
|------------|------|
| `health-check` | 全エージェントの健全性チェック |
| `error-detection` | エラー検知とレポート生成 |
| `performance-analysis` | パフォーマンス分析 |
| `alert` | アラート通知送信 |

### AI Agent Auto Repair Engineer

| タスクタイプ | 説明 |
|------------|------|
| `analyze-error` | エラー原因分析 |
| `auto-repair` | 自動修復試行 |
| `escalate` | 専門エージェントへのエスカレーション |
| `test-repair` | 修復後のテスト実行 |

### AI Agent Improvement Tracker

| タスクタイプ | 説明 |
|------------|------|
| `log-repair` | 修復履歴の記録 |
| `generate-report` | 改善レポート生成 |
| `trend-analysis` | トレンド分析 |
| `knowledge-base` | ナレッジベース更新 |

---

## 想定される使用例

### 例1: AI Sales Agentのエラー自動修復

```typescript
// エラー発生
const error = {
  agent: 'AISalesAgent',
  error: 'Lead scoring calculation returns NaN',
  stackTrace: '...'
};

// Health Monitorがエラー検知
const errorReport = await healthMonitor.process({
  taskType: 'error-detection',
  logs: agentLogs
});

// Auto Repair Engineerが自動修復試行
const repairResult = await autoRepairEngineer.process({
  taskType: 'auto-repair',
  errorReport: errorReport
});

// 修復履歴記録
await improvementTracker.process({
  taskType: 'log-repair',
  agentName: 'AISalesAgent',
  errorType: 'logic',
  errorMessage: 'Lead scoring calculation returns NaN',
  repairAgent: 'AIEngineer',
  repairMethod: 'escalated',
  changes: ['Added null check', 'Fixed division by zero'],
  codeBefore: '...',
  codeAfter: '...',
  testsPassed: true,
  coverage: 95
});
```

### 例2: 月次改善レポート生成

```typescript
const report = await improvementTracker.process({
  taskType: 'generate-report',
  timeRange: {
    start: new Date('2025-10-01'),
    end: new Date('2025-10-31')
  }
});

console.log(`総修復数: ${report.summary.totalRepairs}`);
console.log(`自動修復: ${report.summary.autoRepairs}`);
console.log(`エスカレーション: ${report.summary.escalatedRepairs}`);
```

---

## 実装優先度

**Phase**: Phase 3（中優先度）または Phase 4（低優先度）

**理由**:
- Phase 1, 2でコアエージェントを実装後、システムが安定してから導入するのが効果的
- 初期段階では人間による監視・修正でも対応可能
- エージェント数が増えてきたタイミング（30+エージェント）で真価を発揮

**推奨実装タイミング**: Phase 2完了後（27エージェント実装後）

---

## 今後の拡張案

1. **予防保守機能**
   - エラー発生前に潜在的な問題を検出
   - コード品質スコアリング
   - リファクタリング提案

2. **A/Bテスト機能**
   - 修復案を複数生成してA/Bテスト
   - 最適な修復方法を学習

3. **AI学習機能**
   - 過去の修復履歴から学習
   - 類似エラーの自動修復精度向上

4. **ダッシュボード**
   - リアルタイムで全エージェントの健全性を可視化
   - エラー発生率、修復率のグラフ表示

---

**作成日**: 2025-10-13
**ステータス**: 設計案（未実装）
**関連ファイル**: `AGENTS_CATALOG.md`
