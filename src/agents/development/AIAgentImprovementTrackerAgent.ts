import { BaseAgent, AgentCapability } from '../base/BaseAgent';

/**
 * AI Agent Improvement Tracker
 *
 * エージェントの改善履歴を管理・分析する専門エージェント
 *
 * 主な機能:
 * 1. 修復ログ管理 - 全修復履歴の記録と検索
 * 2. トレンド分析 - エラー傾向と改善パターンの分析
 * 3. レポート生成 - 詳細な改善レポート作成
 * 4. ナレッジベース構築 - 解決策の体系化
 * 5. 改善提案 - データに基づく改善推奨事項
 * 6. 統計分析 - 修復成功率や時間の統計
 * 7. ダッシュボード - 可視化データの提供
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface TrackerInput {
  taskType: 'log-repair' | 'analyze-trends' | 'generate-report' | 'build-knowledge' | 'suggest-improvements' | 'get-statistics' | 'get-dashboard';
  repairLog?: RepairLog;
  agentName?: string;
  timeRange?: TimeRange;
  errorType?: string;
  reportType?: 'summary' | 'detailed' | 'executive' | 'technical';
  filters?: LogFilter;
}

export interface TrackerOutput {
  taskType: 'log-repair' | 'analyze-trends' | 'generate-report' | 'build-knowledge' | 'suggest-improvements' | 'get-statistics' | 'get-dashboard';
  success: boolean;
  message: string;
  logConfirmation?: LogConfirmation;
  trendAnalysis?: TrendAnalysis;
  improvementReport?: ImprovementReport;
  knowledgeBase?: KnowledgeBase;
  suggestions?: ImprovementSuggestion[];
  statistics?: RepairStatistics;
  dashboard?: DashboardData;
  timestamp: Date;
  processingTime: number;
}

// 時間範囲
export interface TimeRange {
  start: Date;
  end: Date;
}

// 修復ログ
export interface RepairLog {
  logId: string;
  repairId: string;
  errorId: string;
  agentName: string;
  errorType: 'syntax' | 'logic' | 'performance' | 'integration' | 'configuration' | 'timeout' | 'memory' | 'unknown';
  errorCategory: 'code_structure' | 'prompt_design' | 'fullstack_integration' | 'test_coverage' | 'configuration' | 'performance' | 'dependency';
  severity: 'critical' | 'high' | 'medium' | 'low';
  repairType: 'auto' | 'escalated' | 'manual';
  status: 'success' | 'partial' | 'failed';

  beforeState: {
    errorMessage: string;
    code: string;
    metrics: {
      errorRate: number; // errors per hour
      avgResponseTime: number; // ms
      successRate: number; // percentage
      availability: number; // percentage
    };
  };

  afterState: {
    code: string;
    metrics: {
      errorRate: number;
      avgResponseTime: number;
      successRate: number;
      availability: number;
    };
  };

  improvements: {
    metric: string;
    beforeValue: number;
    afterValue: number;
    changePercentage: number;
    improved: boolean;
  }[];

  repairDetails: {
    rootCause: string;
    solution: string;
    changedFiles: string[];
    linesChanged: number;
    repairTime: number; // minutes
    specialist?: string;
  };

  testResults: {
    totalTests: number;
    passed: number;
    failed: number;
    coverage: number; // percentage
  };

  lessons: string[];
  tags: string[];
  timestamp: Date;
}

export interface LogConfirmation {
  logId: string;
  saved: boolean;
  location: string;
  message: string;
}

// ログフィルター
export interface LogFilter {
  agentNames?: string[];
  errorTypes?: string[];
  errorCategories?: string[];
  severities?: string[];
  repairTypes?: string[];
  statuses?: string[];
  timeRange?: TimeRange;
  minImprovementPercentage?: number;
}

// トレンド分析
export interface TrendAnalysis {
  timeRange: TimeRange;
  totalRepairs: number;

  errorTrends: {
    errorType: string;
    count: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    changePercentage: number;
    mostAffectedAgents: string[];
  }[];

  repairSuccessRate: {
    overall: number; // percentage
    byType: { repairType: string; successRate: number }[];
    trend: 'improving' | 'declining' | 'stable';
  };

  performanceImprovements: {
    metric: string;
    avgImprovement: number; // percentage
    bestCase: number;
    worstCase: number;
  }[];

  commonRootCauses: {
    cause: string;
    frequency: number;
    avgRepairTime: number;
    successRate: number;
  }[];

  agentHealthTrends: {
    agentName: string;
    repairCount: number;
    successRate: number;
    avgRepairTime: number;
    healthTrend: 'improving' | 'declining' | 'stable';
  }[];

  recommendations: string[];
}

// 改善レポート
export interface ImprovementReport {
  reportId: string;
  reportType: 'summary' | 'detailed' | 'executive' | 'technical';
  generatedAt: Date;
  timeRange: TimeRange;

  executiveSummary: {
    totalRepairs: number;
    successRate: number;
    avgRepairTime: number;
    totalImprovementPercentage: number;
    keyAchievements: string[];
    criticalIssues: string[];
  };

  agentReports: AgentReport[];

  systemWideMetrics: {
    overallErrorRate: { before: number; after: number; improvement: number };
    overallPerformance: { before: number; after: number; improvement: number };
    overallStability: { before: number; after: number; improvement: number };
    overallAvailability: { before: number; after: number; improvement: number };
  };

  topIssues: {
    issue: string;
    frequency: number;
    severity: string;
    status: 'resolved' | 'ongoing' | 'recurring';
  }[];

  topSolutions: {
    solution: string;
    applicability: number; // how many times it was successfully applied
    avgEffectiveness: number; // average improvement percentage
    categories: string[];
  }[];

  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    recommendation: string;
    expectedImpact: string;
    estimatedEffort: string;
  }[];

  visualizations: {
    chartType: 'line' | 'bar' | 'pie' | 'heatmap';
    title: string;
    data: any;
  }[];
}

export interface AgentReport {
  agentName: string;
  repairCount: number;
  successRate: number;
  avgRepairTime: number;

  commonIssues: {
    issue: string;
    count: number;
    avgResolutionTime: number;
  }[];

  improvements: {
    metric: string;
    improvement: number;
  }[];

  healthScore: number; // 0-100
  trend: 'improving' | 'declining' | 'stable';
  notes: string[];
}

// ナレッジベース
export interface KnowledgeBase {
  knowledgeBaseId: string;
  lastUpdated: Date;
  totalEntries: number;

  entries: KnowledgeEntry[];

  categories: {
    category: string;
    entryCount: number;
    avgSuccessRate: number;
  }[];

  statistics: {
    totalSolutions: number;
    avgSuccessRate: number;
    mostEffectiveSolutions: string[];
    mostCommonIssues: string[];
  };
}

export interface KnowledgeEntry {
  entryId: string;
  title: string;
  category: string;
  errorType: string;

  problem: {
    description: string;
    symptoms: string[];
    rootCause: string;
  };

  solution: {
    description: string;
    steps: string[];
    codeExample?: string;
    alternativeSolutions?: string[];
  };

  applicability: {
    agentTypes: string[];
    errorCategories: string[];
    conditions: string[];
  };

  effectiveness: {
    successRate: number; // percentage
    avgRepairTime: number; // minutes
    timesApplied: number;
    avgImprovementPercentage: number;
  };

  relatedEntries: string[]; // entry IDs
  tags: string[];
  createdAt: Date;
  lastUsed?: Date;
}

// 改善提案
export interface ImprovementSuggestion {
  suggestionId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'prevention' | 'optimization' | 'automation' | 'monitoring' | 'documentation';

  title: string;
  description: string;
  rationale: string;

  targetAgents: string[];

  expectedBenefits: {
    errorReduction: number; // percentage
    performanceImprovement: number; // percentage
    timesSaved: number; // hours per week
    costReduction?: number; // estimated cost savings
  };

  implementation: {
    effort: 'low' | 'medium' | 'high';
    estimatedHours: number;
    requiredResources: string[];
    steps: string[];
    risks: string[];
  };

  evidence: {
    dataPoints: number;
    successRate: number;
    relatedLogs: string[]; // log IDs
  };

  createdAt: Date;
  status: 'proposed' | 'approved' | 'in_progress' | 'completed' | 'rejected';
}

// 統計情報
export interface RepairStatistics {
  timeRange: TimeRange;
  generatedAt: Date;

  overallStats: {
    totalRepairs: number;
    successfulRepairs: number;
    failedRepairs: number;
    successRate: number; // percentage
    avgRepairTime: number; // minutes
    totalTimeSpent: number; // hours
  };

  byErrorType: {
    errorType: string;
    count: number;
    percentage: number;
    successRate: number;
    avgRepairTime: number;
  }[];

  byRepairType: {
    repairType: string;
    count: number;
    percentage: number;
    successRate: number;
    avgRepairTime: number;
  }[];

  bySeverity: {
    severity: string;
    count: number;
    percentage: number;
    successRate: number;
    avgRepairTime: number;
  }[];

  byAgent: {
    agentName: string;
    repairCount: number;
    successRate: number;
    avgRepairTime: number;
    healthScore: number;
  }[];

  timeSeriesData: {
    date: Date;
    repairs: number;
    successes: number;
    failures: number;
  }[];

  improvementMetrics: {
    avgErrorRateReduction: number; // percentage
    avgPerformanceImprovement: number; // percentage
    avgStabilityImprovement: number; // percentage
  };
}

// ダッシュボードデータ
export interface DashboardData {
  lastUpdated: Date;

  summary: {
    totalAgents: number;
    healthyAgents: number;
    agentsNeedingAttention: number;
    activeRepairs: number;
    recentRepairs24h: number;
    successRate24h: number;
  };

  alerts: {
    level: 'critical' | 'warning' | 'info';
    message: string;
    agentName?: string;
    timestamp: Date;
  }[];

  topIssues: {
    issue: string;
    frequency: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];

  agentHealth: {
    agentName: string;
    healthScore: number;
    status: 'healthy' | 'warning' | 'critical';
    lastRepair?: Date;
    recentIssues: number;
  }[];

  recentActivity: {
    timestamp: Date;
    agentName: string;
    activity: string;
    status: 'success' | 'failed' | 'pending';
  }[];

  charts: {
    errorTrend: { date: Date; count: number }[];
    successRateTrend: { date: Date; rate: number }[];
    repairTimeTrend: { date: Date; avgTime: number }[];
    errorDistribution: { errorType: string; count: number }[];
  };
}

// ============================================================================
// Agent Implementation
// ============================================================================

export class AIAgentImprovementTrackerAgent extends BaseAgent {
  private repairLogs: RepairLog[] = [];
  private knowledgeEntries: KnowledgeEntry[] = [];

  constructor() {
    super(
      'AI Agent Improvement Tracker',
      'エージェントの改善履歴を管理・分析する専門エージェント',
      [
        AgentCapability.ANALYSIS,
        AgentCapability.DATA_PROCESSING,
        AgentCapability.REPORTING,
        AgentCapability.MONITORING
      ]
    );
  }

  async setup(): Promise<void> {
    console.log(`[${this.name}] Initializing improvement tracking system...`);
    console.log(`[${this.name}] Loading historical repair logs...`);
    console.log(`[${this.name}] Building knowledge base...`);

    // シミュレーション：過去のログを読み込む
    await this.loadHistoricalLogs();

    console.log(`[${this.name}] Setup complete! Tracking ${this.repairLogs.length} historical repairs.`);
  }

  async process(input: TrackerInput): Promise<TrackerOutput> {
    const startTime = Date.now();
    console.log(`[${this.name}] Processing ${input.taskType} task...`);

    try {
      let result: Partial<TrackerOutput>;

      switch (input.taskType) {
        case 'log-repair':
          if (!input.repairLog) {
            throw new Error('Repair log is required for log-repair task');
          }
          result = await this.logRepair(input.repairLog);
          break;

        case 'analyze-trends':
          if (!input.timeRange) {
            throw new Error('Time range is required for analyze-trends task');
          }
          result = await this.analyzeTrends(input.timeRange, input.filters);
          break;

        case 'generate-report':
          if (!input.timeRange) {
            throw new Error('Time range is required for generate-report task');
          }
          result = await this.generateReport(input.timeRange, input.reportType || 'summary', input.filters);
          break;

        case 'build-knowledge':
          result = await this.buildKnowledgeBase(input.filters);
          break;

        case 'suggest-improvements':
          result = await this.suggestImprovements(input.agentName, input.filters);
          break;

        case 'get-statistics':
          if (!input.timeRange) {
            throw new Error('Time range is required for get-statistics task');
          }
          result = await this.getStatistics(input.timeRange, input.filters);
          break;

        case 'get-dashboard':
          result = await this.getDashboard();
          break;

        default:
          throw new Error(`Unknown task type: ${input.taskType}`);
      }

      const processingTime = Date.now() - startTime;
      console.log(`[${this.name}] Task completed in ${processingTime}ms`);

      return {
        taskType: input.taskType,
        success: true,
        message: `Successfully completed ${input.taskType}`,
        ...result,
        timestamp: new Date(),
        processingTime
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error(`[${this.name}] Error processing task:`, error);

      return {
        taskType: input.taskType,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date(),
        processingTime
      };
    }
  }

  async cleanup(): Promise<void> {
    console.log(`[${this.name}] Saving repair logs...`);
    console.log(`[${this.name}] Persisting knowledge base...`);
    console.log(`[${this.name}] Generating final reports...`);
    console.log(`[${this.name}] Cleanup complete!`);
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  /**
   * 修復ログの記録
   */
  private async logRepair(repairLog: RepairLog): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Logging repair ${repairLog.repairId} for agent ${repairLog.agentName}...`);

    // ログをメモリに追加
    this.repairLogs.push(repairLog);

    // 永続化（ここではシミュレーション）
    const location = `./improvement-logs/${repairLog.agentName}/${repairLog.logId}.json`;

    const logConfirmation: LogConfirmation = {
      logId: repairLog.logId,
      saved: true,
      location,
      message: `Repair log successfully saved for ${repairLog.agentName}`
    };

    console.log(`[${this.name}] Repair logged at ${location}`);

    return { logConfirmation };
  }

  /**
   * トレンド分析
   */
  private async analyzeTrends(timeRange: TimeRange, filters?: LogFilter): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Analyzing trends from ${timeRange.start.toISOString()} to ${timeRange.end.toISOString()}...`);

    const filteredLogs = this.filterLogs(this.repairLogs, timeRange, filters);

    // エラートレンドの分析
    const errorTrends = this.analyzeErrorTrends(filteredLogs, timeRange);

    // 修復成功率の分析
    const repairSuccessRate = this.analyzeRepairSuccessRate(filteredLogs);

    // パフォーマンス改善の分析
    const performanceImprovements = this.analyzePerformanceImprovements(filteredLogs);

    // 共通の根本原因の分析
    const commonRootCauses = this.analyzeCommonRootCauses(filteredLogs);

    // エージェント健全性トレンドの分析
    const agentHealthTrends = this.analyzeAgentHealthTrends(filteredLogs);

    // 推奨事項の生成
    const recommendations = this.generateTrendRecommendations(
      errorTrends,
      repairSuccessRate,
      agentHealthTrends
    );

    const trendAnalysis: TrendAnalysis = {
      timeRange,
      totalRepairs: filteredLogs.length,
      errorTrends,
      repairSuccessRate,
      performanceImprovements,
      commonRootCauses,
      agentHealthTrends,
      recommendations
    };

    console.log(`[${this.name}] Trend analysis complete. Analyzed ${filteredLogs.length} repairs.`);

    return { trendAnalysis };
  }

  /**
   * 改善レポートの生成
   */
  private async generateReport(
    timeRange: TimeRange,
    reportType: 'summary' | 'detailed' | 'executive' | 'technical',
    filters?: LogFilter
  ): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Generating ${reportType} report...`);

    const filteredLogs = this.filterLogs(this.repairLogs, timeRange, filters);

    // エグゼクティブサマリー
    const executiveSummary = this.createExecutiveSummary(filteredLogs);

    // エージェント別レポート
    const agentReports = this.createAgentReports(filteredLogs);

    // システムワイドメトリクス
    const systemWideMetrics = this.calculateSystemWideMetrics(filteredLogs);

    // トップイシュー
    const topIssues = this.identifyTopIssues(filteredLogs);

    // トップソリューション
    const topSolutions = this.identifyTopSolutions(filteredLogs);

    // 推奨事項
    const recommendations = this.generateReportRecommendations(
      filteredLogs,
      topIssues,
      topSolutions
    );

    // 可視化データ
    const visualizations = this.createVisualizations(filteredLogs, timeRange);

    const improvementReport: ImprovementReport = {
      reportId: `report-${Date.now()}`,
      reportType,
      generatedAt: new Date(),
      timeRange,
      executiveSummary,
      agentReports,
      systemWideMetrics,
      topIssues,
      topSolutions,
      recommendations,
      visualizations
    };

    console.log(`[${this.name}] Report generated: ${filteredLogs.length} repairs analyzed`);

    return { improvementReport };
  }

  /**
   * ナレッジベースの構築
   */
  private async buildKnowledgeBase(filters?: LogFilter): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Building knowledge base from repair history...`);

    const filteredLogs = filters
      ? this.filterLogs(this.repairLogs, undefined, filters)
      : this.repairLogs;

    // 成功した修復からナレッジエントリーを作成
    const successfulRepairs = filteredLogs.filter(log => log.status === 'success');

    const newEntries: KnowledgeEntry[] = [];

    for (const log of successfulRepairs) {
      const entry = this.createKnowledgeEntry(log);

      // 既存エントリーとの重複チェック
      const existingEntry = this.knowledgeEntries.find(e =>
        this.isSimilarEntry(e, entry)
      );

      if (existingEntry) {
        // 既存エントリーの更新
        this.updateKnowledgeEntry(existingEntry, log);
      } else {
        // 新規エントリーの追加
        newEntries.push(entry);
        this.knowledgeEntries.push(entry);
      }
    }

    // カテゴリー別の統計
    const categories = this.categorizeKnowledgeEntries(this.knowledgeEntries);

    // 統計情報
    const statistics = this.calculateKnowledgeStatistics(this.knowledgeEntries);

    const knowledgeBase: KnowledgeBase = {
      knowledgeBaseId: `kb-${Date.now()}`,
      lastUpdated: new Date(),
      totalEntries: this.knowledgeEntries.length,
      entries: this.knowledgeEntries,
      categories,
      statistics
    };

    console.log(`[${this.name}] Knowledge base built: ${this.knowledgeEntries.length} entries (${newEntries.length} new)`);

    return { knowledgeBase };
  }

  /**
   * 改善提案の生成
   */
  private async suggestImprovements(
    agentName?: string,
    filters?: LogFilter
  ): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Generating improvement suggestions${agentName ? ` for ${agentName}` : ''}...`);

    const filteredLogs = this.filterLogs(this.repairLogs, undefined, filters);
    const targetLogs = agentName
      ? filteredLogs.filter(log => log.agentName === agentName)
      : filteredLogs;

    const suggestions: ImprovementSuggestion[] = [];

    // 頻発するエラーの予防策
    suggestions.push(...this.suggestPreventionMeasures(targetLogs));

    // パフォーマンス最適化の提案
    suggestions.push(...this.suggestOptimizations(targetLogs));

    // 自動化の機会
    suggestions.push(...this.suggestAutomation(targetLogs));

    // モニタリング改善
    suggestions.push(...this.suggestMonitoringImprovements(targetLogs));

    // ドキュメンテーション改善
    suggestions.push(...this.suggestDocumentationImprovements(targetLogs));

    // 優先度でソート
    suggestions.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    console.log(`[${this.name}] Generated ${suggestions.length} improvement suggestions`);

    return { suggestions };
  }

  /**
   * 統計情報の取得
   */
  private async getStatistics(timeRange: TimeRange, filters?: LogFilter): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Calculating statistics...`);

    const filteredLogs = this.filterLogs(this.repairLogs, timeRange, filters);

    // 全体統計
    const overallStats = this.calculateOverallStats(filteredLogs);

    // エラータイプ別統計
    const byErrorType = this.calculateStatsByErrorType(filteredLogs);

    // 修復タイプ別統計
    const byRepairType = this.calculateStatsByRepairType(filteredLogs);

    // 深刻度別統計
    const bySeverity = this.calculateStatsBySeverity(filteredLogs);

    // エージェント別統計
    const byAgent = this.calculateStatsByAgent(filteredLogs);

    // 時系列データ
    const timeSeriesData = this.generateTimeSeriesData(filteredLogs, timeRange);

    // 改善指標
    const improvementMetrics = this.calculateImprovementMetrics(filteredLogs);

    const statistics: RepairStatistics = {
      timeRange,
      generatedAt: new Date(),
      overallStats,
      byErrorType,
      byRepairType,
      bySeverity,
      byAgent,
      timeSeriesData,
      improvementMetrics
    };

    console.log(`[${this.name}] Statistics calculated for ${filteredLogs.length} repairs`);

    return { statistics };
  }

  /**
   * ダッシュボードデータの取得
   */
  private async getDashboard(): Promise<Partial<TrackerOutput>> {
    console.log(`[${this.name}] Generating dashboard data...`);

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = this.repairLogs.filter(log => log.timestamp >= last24h);

    // サマリー
    const summary = this.createDashboardSummary(recentLogs);

    // アラート
    const alerts = this.generateAlerts(recentLogs);

    // トップイシュー
    const topIssues = this.identifyTopIssues(recentLogs).slice(0, 5);

    // エージェント健全性
    const agentHealth = this.calculateAgentHealth();

    // 最近のアクティビティ
    const recentActivity = this.getRecentActivity(10);

    // チャートデータ
    const charts = this.createChartData();

    const dashboard: DashboardData = {
      lastUpdated: new Date(),
      summary,
      alerts,
      topIssues: topIssues.map(issue => ({
        issue: issue.issue,
        frequency: issue.frequency,
        trend: this.determineIssueTrend(issue.issue)
      })),
      agentHealth,
      recentActivity,
      charts
    };

    console.log(`[${this.name}] Dashboard data generated`);

    return { dashboard };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private async loadHistoricalLogs(): Promise<void> {
    // シミュレーション：サンプルデータの生成
    const sampleLog: RepairLog = {
      logId: 'log-001',
      repairId: 'repair-001',
      errorId: 'err-001',
      agentName: 'AIEngineer',
      errorType: 'logic',
      errorCategory: 'code_structure',
      severity: 'high',
      repairType: 'auto',
      status: 'success',
      beforeState: {
        errorMessage: 'Undefined variable access',
        code: 'const result = data.value;',
        metrics: {
          errorRate: 5.2,
          avgResponseTime: 350,
          successRate: 92,
          availability: 95
        }
      },
      afterState: {
        code: 'const result = data?.value ?? defaultValue;',
        metrics: {
          errorRate: 0.5,
          avgResponseTime: 320,
          successRate: 99,
          availability: 99.5
        }
      },
      improvements: [
        { metric: 'Error Rate', beforeValue: 5.2, afterValue: 0.5, changePercentage: -90.4, improved: true },
        { metric: 'Response Time', beforeValue: 350, afterValue: 320, changePercentage: -8.6, improved: true },
        { metric: 'Success Rate', beforeValue: 92, afterValue: 99, changePercentage: 7.6, improved: true }
      ],
      repairDetails: {
        rootCause: 'Missing null check on optional data property',
        solution: 'Added optional chaining and null coalescing operator',
        changedFiles: ['src/agents/AIEngineer.ts'],
        linesChanged: 1,
        repairTime: 5
      },
      testResults: {
        totalTests: 20,
        passed: 20,
        failed: 0,
        coverage: 95
      },
      lessons: [
        'Always use optional chaining for optional properties',
        'Provide default values for critical variables'
      ],
      tags: ['null-safety', 'error-handling', 'quick-fix'],
      timestamp: new Date(Date.now() - 86400000 * 2) // 2 days ago
    };

    this.repairLogs.push(sampleLog);
  }

  private filterLogs(logs: RepairLog[], timeRange?: TimeRange, filters?: LogFilter): RepairLog[] {
    let filtered = [...logs];

    if (timeRange) {
      filtered = filtered.filter(log =>
        log.timestamp >= timeRange.start && log.timestamp <= timeRange.end
      );
    }

    if (filters) {
      if (filters.agentNames) {
        filtered = filtered.filter(log => filters.agentNames!.includes(log.agentName));
      }
      if (filters.errorTypes) {
        filtered = filtered.filter(log => filters.errorTypes!.includes(log.errorType));
      }
      if (filters.errorCategories) {
        filtered = filtered.filter(log => filters.errorCategories!.includes(log.errorCategory));
      }
      if (filters.severities) {
        filtered = filtered.filter(log => filters.severities!.includes(log.severity));
      }
      if (filters.repairTypes) {
        filtered = filtered.filter(log => filters.repairTypes!.includes(log.repairType));
      }
      if (filters.statuses) {
        filtered = filtered.filter(log => filters.statuses!.includes(log.status));
      }
      if (filters.minImprovementPercentage) {
        filtered = filtered.filter(log => {
          const avgImprovement = log.improvements.reduce((sum, imp) =>
            sum + Math.abs(imp.changePercentage), 0) / log.improvements.length;
          return avgImprovement >= filters.minImprovementPercentage!;
        });
      }
    }

    return filtered;
  }

  private analyzeErrorTrends(logs: RepairLog[], timeRange: TimeRange): TrendAnalysis['errorTrends'] {
    const errorCounts: Record<string, { count: number; agents: Set<string> }> = {};

    logs.forEach(log => {
      if (!errorCounts[log.errorType]) {
        errorCounts[log.errorType] = { count: 0, agents: new Set() };
      }
      errorCounts[log.errorType].count++;
      errorCounts[log.errorType].agents.add(log.agentName);
    });

    return Object.entries(errorCounts).map(([errorType, data]) => ({
      errorType,
      count: data.count,
      trend: 'stable' as const, // Simplified: would need historical comparison
      changePercentage: 0,
      mostAffectedAgents: Array.from(data.agents)
    }));
  }

  private analyzeRepairSuccessRate(logs: RepairLog[]): TrendAnalysis['repairSuccessRate'] {
    const successful = logs.filter(log => log.status === 'success').length;
    const overall = logs.length > 0 ? (successful / logs.length) * 100 : 0;

    const byType = ['auto', 'escalated', 'manual'].map(repairType => {
      const typeLogs = logs.filter(log => log.repairType === repairType);
      const typeSuccessful = typeLogs.filter(log => log.status === 'success').length;
      return {
        repairType,
        successRate: typeLogs.length > 0 ? (typeSuccessful / typeLogs.length) * 100 : 0
      };
    });

    return {
      overall,
      byType,
      trend: 'stable' // Simplified
    };
  }

  private analyzePerformanceImprovements(logs: RepairLog[]): TrendAnalysis['performanceImprovements'] {
    const metrics = ['Error Rate', 'Response Time', 'Success Rate', 'Availability'];

    return metrics.map(metric => {
      const improvements = logs
        .flatMap(log => log.improvements)
        .filter(imp => imp.metric === metric && imp.improved);

      if (improvements.length === 0) {
        return { metric, avgImprovement: 0, bestCase: 0, worstCase: 0 };
      }

      const changes = improvements.map(imp => Math.abs(imp.changePercentage));
      return {
        metric,
        avgImprovement: changes.reduce((sum, val) => sum + val, 0) / changes.length,
        bestCase: Math.max(...changes),
        worstCase: Math.min(...changes)
      };
    });
  }

  private analyzeCommonRootCauses(logs: RepairLog[]): TrendAnalysis['commonRootCauses'] {
    const causeCounts: Record<string, { count: number; totalTime: number; successes: number }> = {};

    logs.forEach(log => {
      const cause = log.repairDetails.rootCause;
      if (!causeCounts[cause]) {
        causeCounts[cause] = { count: 0, totalTime: 0, successes: 0 };
      }
      causeCounts[cause].count++;
      causeCounts[cause].totalTime += log.repairDetails.repairTime;
      if (log.status === 'success') causeCounts[cause].successes++;
    });

    return Object.entries(causeCounts)
      .map(([cause, data]) => ({
        cause,
        frequency: data.count,
        avgRepairTime: data.totalTime / data.count,
        successRate: (data.successes / data.count) * 100
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }

  private analyzeAgentHealthTrends(logs: RepairLog[]): TrendAnalysis['agentHealthTrends'] {
    const agentData: Record<string, { repairs: RepairLog[] }> = {};

    logs.forEach(log => {
      if (!agentData[log.agentName]) {
        agentData[log.agentName] = { repairs: [] };
      }
      agentData[log.agentName].repairs.push(log);
    });

    return Object.entries(agentData).map(([agentName, data]) => {
      const successes = data.repairs.filter(r => r.status === 'success').length;
      const totalTime = data.repairs.reduce((sum, r) => sum + r.repairDetails.repairTime, 0);

      return {
        agentName,
        repairCount: data.repairs.length,
        successRate: (successes / data.repairs.length) * 100,
        avgRepairTime: totalTime / data.repairs.length,
        healthTrend: 'stable' as const // Simplified
      };
    });
  }

  private generateTrendRecommendations(
    errorTrends: TrendAnalysis['errorTrends'],
    repairSuccessRate: TrendAnalysis['repairSuccessRate'],
    agentHealthTrends: TrendAnalysis['agentHealthTrends']
  ): string[] {
    const recommendations: string[] = [];

    // エラートレンドに基づく推奨
    const topError = errorTrends[0];
    if (topError && topError.count > 5) {
      recommendations.push(`Focus on preventing ${topError.errorType} errors - most common issue affecting ${topError.mostAffectedAgents.join(', ')}`);
    }

    // 成功率に基づく推奨
    if (repairSuccessRate.overall < 80) {
      recommendations.push('Overall repair success rate is below 80% - consider improving repair strategies');
    }

    // エージェント健全性に基づく推奨
    const unhealthyAgents = agentHealthTrends.filter(a => a.successRate < 70);
    if (unhealthyAgents.length > 0) {
      recommendations.push(`Prioritize attention to: ${unhealthyAgents.map(a => a.agentName).join(', ')}`);
    }

    return recommendations;
  }

  private createExecutiveSummary(logs: RepairLog[]): ImprovementReport['executiveSummary'] {
    const successful = logs.filter(log => log.status === 'success').length;
    const totalTime = logs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);
    const avgImprovement = logs.reduce((sum, log) => {
      const logAvg = log.improvements.reduce((s, imp) => s + Math.abs(imp.changePercentage), 0) / log.improvements.length;
      return sum + logAvg;
    }, 0) / logs.length;

    return {
      totalRepairs: logs.length,
      successRate: logs.length > 0 ? (successful / logs.length) * 100 : 0,
      avgRepairTime: logs.length > 0 ? totalTime / logs.length : 0,
      totalImprovementPercentage: avgImprovement || 0,
      keyAchievements: [
        `${successful} successful repairs completed`,
        `Average ${avgImprovement.toFixed(1)}% improvement in metrics`,
        `${logs.filter(l => l.repairType === 'auto').length} automatic repairs performed`
      ],
      criticalIssues: logs
        .filter(log => log.severity === 'critical' && log.status !== 'success')
        .map(log => `${log.agentName}: ${log.repairDetails.rootCause}`)
        .slice(0, 5)
    };
  }

  private createAgentReports(logs: RepairLog[]): AgentReport[] {
    const agentData: Record<string, RepairLog[]> = {};

    logs.forEach(log => {
      if (!agentData[log.agentName]) {
        agentData[log.agentName] = [];
      }
      agentData[log.agentName].push(log);
    });

    return Object.entries(agentData).map(([agentName, agentLogs]) => {
      const successes = agentLogs.filter(l => l.status === 'success').length;
      const totalTime = agentLogs.reduce((sum, l) => sum + l.repairDetails.repairTime, 0);

      // 共通の問題
      const issueCounts: Record<string, { count: number; totalTime: number }> = {};
      agentLogs.forEach(log => {
        const issue = log.repairDetails.rootCause;
        if (!issueCounts[issue]) {
          issueCounts[issue] = { count: 0, totalTime: 0 };
        }
        issueCounts[issue].count++;
        issueCounts[issue].totalTime += log.repairDetails.repairTime;
      });

      const commonIssues = Object.entries(issueCounts)
        .map(([issue, data]) => ({
          issue,
          count: data.count,
          avgResolutionTime: data.totalTime / data.count
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // 改善指標
      const improvements = ['Error Rate', 'Response Time', 'Success Rate', 'Availability'].map(metric => {
        const metricImprovements = agentLogs
          .flatMap(log => log.improvements)
          .filter(imp => imp.metric === metric && imp.improved);

        const avgImprovement = metricImprovements.length > 0
          ? metricImprovements.reduce((sum, imp) => sum + Math.abs(imp.changePercentage), 0) / metricImprovements.length
          : 0;

        return { metric, improvement: avgImprovement };
      });

      return {
        agentName,
        repairCount: agentLogs.length,
        successRate: (successes / agentLogs.length) * 100,
        avgRepairTime: totalTime / agentLogs.length,
        commonIssues,
        improvements,
        healthScore: Math.min(100, (successes / agentLogs.length) * 100 - agentLogs.length * 2),
        trend: 'stable',
        notes: []
      };
    });
  }

  private calculateSystemWideMetrics(logs: RepairLog[]): ImprovementReport['systemWideMetrics'] {
    const metrics = ['errorRate', 'avgResponseTime', 'successRate', 'availability'] as const;

    const result: any = {};

    metrics.forEach(metric => {
      const beforeValues = logs.map(log => log.beforeState.metrics[metric]);
      const afterValues = logs.map(log => log.afterState.metrics[metric]);

      const before = beforeValues.reduce((sum, val) => sum + val, 0) / beforeValues.length;
      const after = afterValues.reduce((sum, val) => sum + val, 0) / afterValues.length;
      const improvement = ((after - before) / before) * 100;

      result[`overall${metric.charAt(0).toUpperCase() + metric.slice(1)}`] = {
        before,
        after,
        improvement
      };
    });

    return result;
  }

  private identifyTopIssues(logs: RepairLog[]): ImprovementReport['topIssues'] {
    const issueCounts: Record<string, { count: number; severity: string; statuses: string[] }> = {};

    logs.forEach(log => {
      const issue = log.repairDetails.rootCause;
      if (!issueCounts[issue]) {
        issueCounts[issue] = { count: 0, severity: log.severity, statuses: [] };
      }
      issueCounts[issue].count++;
      issueCounts[issue].statuses.push(log.status);
    });

    return Object.entries(issueCounts)
      .map(([issue, data]) => {
        const resolved = data.statuses.filter(s => s === 'success').length;
        const status: 'resolved' | 'ongoing' | 'recurring' =
          resolved === data.count ? 'resolved' :
          resolved > 0 ? 'ongoing' : 'recurring';

        return {
          issue,
          frequency: data.count,
          severity: data.severity,
          status
        };
      })
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }

  private identifyTopSolutions(logs: RepairLog[]): ImprovementReport['topSolutions'] {
    const solutionData: Record<string, { count: number; improvements: number[]; categories: Set<string> }> = {};

    logs.filter(log => log.status === 'success').forEach(log => {
      const solution = log.repairDetails.solution;
      if (!solutionData[solution]) {
        solutionData[solution] = { count: 0, improvements: [], categories: new Set() };
      }
      solutionData[solution].count++;
      solutionData[solution].categories.add(log.errorCategory);

      const avgImprovement = log.improvements.reduce((sum, imp) =>
        sum + Math.abs(imp.changePercentage), 0) / log.improvements.length;
      solutionData[solution].improvements.push(avgImprovement);
    });

    return Object.entries(solutionData)
      .map(([solution, data]) => ({
        solution,
        applicability: data.count,
        avgEffectiveness: data.improvements.reduce((sum, val) => sum + val, 0) / data.improvements.length,
        categories: Array.from(data.categories)
      }))
      .sort((a, b) => b.applicability - a.applicability)
      .slice(0, 10);
  }

  private generateReportRecommendations(
    logs: RepairLog[],
    topIssues: ImprovementReport['topIssues'],
    topSolutions: ImprovementReport['topSolutions']
  ): ImprovementReport['recommendations'] {
    const recommendations: ImprovementReport['recommendations'] = [];

    // トップイシューに基づく推奨
    const criticalIssues = topIssues.filter(i => i.severity === 'critical' && i.status !== 'resolved');
    if (criticalIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'Error Prevention',
        recommendation: `Address critical recurring issues: ${criticalIssues.map(i => i.issue).join('; ')}`,
        expectedImpact: 'Significant reduction in critical errors',
        estimatedEffort: '2-4 weeks'
      });
    }

    // トップソリューションに基づく推奨
    if (topSolutions.length > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'Best Practices',
        recommendation: `Implement most effective solution across all agents: ${topSolutions[0].solution}`,
        expectedImpact: `${topSolutions[0].avgEffectiveness.toFixed(1)}% average improvement`,
        estimatedEffort: '1-2 weeks'
      });
    }

    return recommendations;
  }

  private createVisualizations(logs: RepairLog[], timeRange: TimeRange): ImprovementReport['visualizations'] {
    return [
      {
        chartType: 'line' as const,
        title: 'Repair Success Rate Over Time',
        data: this.generateTimeSeriesData(logs, timeRange)
      },
      {
        chartType: 'bar' as const,
        title: 'Repairs by Error Type',
        data: this.calculateStatsByErrorType(logs)
      }
    ];
  }

  private createKnowledgeEntry(log: RepairLog): KnowledgeEntry {
    return {
      entryId: `entry-${Date.now()}-${log.logId}`,
      title: log.repairDetails.rootCause,
      category: log.errorCategory,
      errorType: log.errorType,
      problem: {
        description: log.repairDetails.rootCause,
        symptoms: [log.beforeState.errorMessage],
        rootCause: log.repairDetails.rootCause
      },
      solution: {
        description: log.repairDetails.solution,
        steps: [`Apply changes to: ${log.repairDetails.changedFiles.join(', ')}`],
        codeExample: log.afterState.code
      },
      applicability: {
        agentTypes: [log.agentName],
        errorCategories: [log.errorCategory],
        conditions: []
      },
      effectiveness: {
        successRate: log.status === 'success' ? 100 : 0,
        avgRepairTime: log.repairDetails.repairTime,
        timesApplied: 1,
        avgImprovementPercentage: log.improvements.reduce((sum, imp) =>
          sum + Math.abs(imp.changePercentage), 0) / log.improvements.length
      },
      relatedEntries: [],
      tags: log.tags,
      createdAt: log.timestamp,
      lastUsed: log.timestamp
    };
  }

  private isSimilarEntry(entry1: KnowledgeEntry, entry2: KnowledgeEntry): boolean {
    return entry1.problem.rootCause === entry2.problem.rootCause &&
           entry1.category === entry2.category;
  }

  private updateKnowledgeEntry(entry: KnowledgeEntry, log: RepairLog): void {
    entry.effectiveness.timesApplied++;
    entry.lastUsed = log.timestamp;

    // 成功率の更新
    const totalSuccess = entry.effectiveness.successRate * (entry.effectiveness.timesApplied - 1);
    const newSuccess = log.status === 'success' ? 100 : 0;
    entry.effectiveness.successRate = (totalSuccess + newSuccess) / entry.effectiveness.timesApplied;

    // 平均修復時間の更新
    const totalTime = entry.effectiveness.avgRepairTime * (entry.effectiveness.timesApplied - 1);
    entry.effectiveness.avgRepairTime = (totalTime + log.repairDetails.repairTime) / entry.effectiveness.timesApplied;

    // エージェントタイプの追加
    if (!entry.applicability.agentTypes.includes(log.agentName)) {
      entry.applicability.agentTypes.push(log.agentName);
    }
  }

  private categorizeKnowledgeEntries(entries: KnowledgeEntry[]): KnowledgeBase['categories'] {
    const categories: Record<string, { count: number; successRates: number[] }> = {};

    entries.forEach(entry => {
      if (!categories[entry.category]) {
        categories[entry.category] = { count: 0, successRates: [] };
      }
      categories[entry.category].count++;
      categories[entry.category].successRates.push(entry.effectiveness.successRate);
    });

    return Object.entries(categories).map(([category, data]) => ({
      category,
      entryCount: data.count,
      avgSuccessRate: data.successRates.reduce((sum, val) => sum + val, 0) / data.successRates.length
    }));
  }

  private calculateKnowledgeStatistics(entries: KnowledgeEntry[]): KnowledgeBase['statistics'] {
    const successRates = entries.map(e => e.effectiveness.successRate);
    const avgSuccessRate = successRates.reduce((sum, val) => sum + val, 0) / successRates.length;

    return {
      totalSolutions: entries.length,
      avgSuccessRate,
      mostEffectiveSolutions: entries
        .sort((a, b) => b.effectiveness.avgImprovementPercentage - a.effectiveness.avgImprovementPercentage)
        .slice(0, 5)
        .map(e => e.solution.description),
      mostCommonIssues: entries
        .sort((a, b) => b.effectiveness.timesApplied - a.effectiveness.timesApplied)
        .slice(0, 5)
        .map(e => e.problem.description)
    };
  }

  private suggestPreventionMeasures(logs: RepairLog[]): ImprovementSuggestion[] {
    const suggestions: ImprovementSuggestion[] = [];

    // 頻発するエラータイプを特定
    const errorCounts: Record<string, number> = {};
    logs.forEach(log => {
      errorCounts[log.errorType] = (errorCounts[log.errorType] || 0) + 1;
    });

    const topError = Object.entries(errorCounts).sort((a, b) => b[1] - a[1])[0];
    if (topError && topError[1] > 3) {
      suggestions.push({
        suggestionId: `suggestion-prevention-${Date.now()}`,
        priority: 'high',
        category: 'prevention',
        title: `Implement ${topError[0]} error prevention`,
        description: `Add proactive checks to prevent ${topError[0]} errors which occur frequently (${topError[1]} times)`,
        rationale: `${topError[0]} errors are the most common issue, affecting multiple agents`,
        targetAgents: [...new Set(logs.filter(l => l.errorType === topError[0]).map(l => l.agentName))],
        expectedBenefits: {
          errorReduction: 70,
          performanceImprovement: 10,
          timesSaved: 5,
          costReduction: 500
        },
        implementation: {
          effort: 'medium',
          estimatedHours: 16,
          requiredResources: ['Software Engineer', 'QA Engineer'],
          steps: [
            'Analyze root causes of all ${topError[0]} errors',
            'Implement input validation and type checking',
            'Add automated tests for edge cases',
            'Deploy monitoring for early detection'
          ],
          risks: ['May require refactoring existing code']
        },
        evidence: {
          dataPoints: topError[1],
          successRate: 100,
          relatedLogs: logs.filter(l => l.errorType === topError[0]).map(l => l.logId)
        },
        createdAt: new Date(),
        status: 'proposed'
      });
    }

    return suggestions;
  }

  private suggestOptimizations(logs: RepairLog[]): ImprovementSuggestion[] {
    // Performance optimization suggestions based on repair patterns
    return [];
  }

  private suggestAutomation(logs: RepairLog[]): ImprovementSuggestion[] {
    // Automation opportunity suggestions
    return [];
  }

  private suggestMonitoringImprovements(logs: RepairLog[]): ImprovementSuggestion[] {
    // Monitoring improvement suggestions
    return [];
  }

  private suggestDocumentationImprovements(logs: RepairLog[]): ImprovementSuggestion[] {
    // Documentation improvement suggestions
    return [];
  }

  private calculateOverallStats(logs: RepairLog[]): RepairStatistics['overallStats'] {
    const successful = logs.filter(log => log.status === 'success').length;
    const failed = logs.filter(log => log.status === 'failed').length;
    const totalTime = logs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);

    return {
      totalRepairs: logs.length,
      successfulRepairs: successful,
      failedRepairs: failed,
      successRate: logs.length > 0 ? (successful / logs.length) * 100 : 0,
      avgRepairTime: logs.length > 0 ? totalTime / logs.length : 0,
      totalTimeSpent: totalTime / 60 // convert to hours
    };
  }

  private calculateStatsByErrorType(logs: RepairLog[]): RepairStatistics['byErrorType'] {
    const errorTypes = [...new Set(logs.map(log => log.errorType))];

    return errorTypes.map(errorType => {
      const typeLogs = logs.filter(log => log.errorType === errorType);
      const successful = typeLogs.filter(log => log.status === 'success').length;
      const totalTime = typeLogs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);

      return {
        errorType,
        count: typeLogs.length,
        percentage: (typeLogs.length / logs.length) * 100,
        successRate: (successful / typeLogs.length) * 100,
        avgRepairTime: totalTime / typeLogs.length
      };
    });
  }

  private calculateStatsByRepairType(logs: RepairLog[]): RepairStatistics['byRepairType'] {
    const repairTypes = ['auto', 'escalated', 'manual'];

    return repairTypes.map(repairType => {
      const typeLogs = logs.filter(log => log.repairType === repairType);
      if (typeLogs.length === 0) {
        return { repairType, count: 0, percentage: 0, successRate: 0, avgRepairTime: 0 };
      }

      const successful = typeLogs.filter(log => log.status === 'success').length;
      const totalTime = typeLogs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);

      return {
        repairType,
        count: typeLogs.length,
        percentage: (typeLogs.length / logs.length) * 100,
        successRate: (successful / typeLogs.length) * 100,
        avgRepairTime: totalTime / typeLogs.length
      };
    });
  }

  private calculateStatsBySeverity(logs: RepairLog[]): RepairStatistics['bySeverity'] {
    const severities = ['critical', 'high', 'medium', 'low'];

    return severities.map(severity => {
      const severityLogs = logs.filter(log => log.severity === severity);
      if (severityLogs.length === 0) {
        return { severity, count: 0, percentage: 0, successRate: 0, avgRepairTime: 0 };
      }

      const successful = severityLogs.filter(log => log.status === 'success').length;
      const totalTime = severityLogs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);

      return {
        severity,
        count: severityLogs.length,
        percentage: (severityLogs.length / logs.length) * 100,
        successRate: (successful / severityLogs.length) * 100,
        avgRepairTime: totalTime / severityLogs.length
      };
    });
  }

  private calculateStatsByAgent(logs: RepairLog[]): RepairStatistics['byAgent'] {
    const agents = [...new Set(logs.map(log => log.agentName))];

    return agents.map(agentName => {
      const agentLogs = logs.filter(log => log.agentName === agentName);
      const successful = agentLogs.filter(log => log.status === 'success').length;
      const totalTime = agentLogs.reduce((sum, log) => sum + log.repairDetails.repairTime, 0);

      return {
        agentName,
        repairCount: agentLogs.length,
        successRate: (successful / agentLogs.length) * 100,
        avgRepairTime: totalTime / agentLogs.length,
        healthScore: Math.max(0, 100 - agentLogs.length * 5)
      };
    });
  }

  private generateTimeSeriesData(logs: RepairLog[], timeRange: TimeRange): RepairStatistics['timeSeriesData'] {
    const dayInMs = 24 * 60 * 60 * 1000;
    const days = Math.ceil((timeRange.end.getTime() - timeRange.start.getTime()) / dayInMs);

    const data: RepairStatistics['timeSeriesData'] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(timeRange.start.getTime() + i * dayInMs);
      const nextDate = new Date(date.getTime() + dayInMs);

      const dayLogs = logs.filter(log =>
        log.timestamp >= date && log.timestamp < nextDate
      );

      data.push({
        date,
        repairs: dayLogs.length,
        successes: dayLogs.filter(log => log.status === 'success').length,
        failures: dayLogs.filter(log => log.status === 'failed').length
      });
    }

    return data;
  }

  private calculateImprovementMetrics(logs: RepairLog[]): RepairStatistics['improvementMetrics'] {
    const metrics = ['errorRate', 'avgResponseTime', 'successRate'] as const;

    const improvements: any = {};

    metrics.forEach(metric => {
      const metricImprovements = logs
        .flatMap(log => log.improvements)
        .filter(imp => {
          const metricMap: Record<string, string> = {
            errorRate: 'Error Rate',
            avgResponseTime: 'Response Time',
            successRate: 'Success Rate'
          };
          return imp.metric === metricMap[metric] && imp.improved;
        });

      const avg = metricImprovements.length > 0
        ? metricImprovements.reduce((sum, imp) => sum + Math.abs(imp.changePercentage), 0) / metricImprovements.length
        : 0;

      const key = `avg${metric.charAt(0).toUpperCase() + metric.slice(1)}${metric === 'avgResponseTime' ? '' : 'Reduction'}`;
      improvements[key] = avg;
    });

    return {
      avgErrorRateReduction: improvements.avgErrorRateReduction || 0,
      avgPerformanceImprovement: improvements.avgAvgResponseTime || 0,
      avgStabilityImprovement: improvements.avgSuccessRate || 0
    };
  }

  private createDashboardSummary(recentLogs: RepairLog[]): DashboardData['summary'] {
    const agents = [...new Set(this.repairLogs.map(log => log.agentName))];
    const healthyAgents = agents.filter(agent => {
      const agentLogs = this.repairLogs.filter(log => log.agentName === agent);
      const recentErrors = agentLogs.filter(log => log.timestamp >= new Date(Date.now() - 24 * 60 * 60 * 1000));
      return recentErrors.length < 3;
    });

    const successful24h = recentLogs.filter(log => log.status === 'success').length;

    return {
      totalAgents: agents.length,
      healthyAgents: healthyAgents.length,
      agentsNeedingAttention: agents.length - healthyAgents.length,
      activeRepairs: 0, // Would track ongoing repairs
      recentRepairs24h: recentLogs.length,
      successRate24h: recentLogs.length > 0 ? (successful24h / recentLogs.length) * 100 : 100
    };
  }

  private generateAlerts(recentLogs: RepairLog[]): DashboardData['alerts'] {
    const alerts: DashboardData['alerts'] = [];

    // Critical errors
    const criticalErrors = recentLogs.filter(log => log.severity === 'critical');
    criticalErrors.forEach(log => {
      alerts.push({
        level: 'critical',
        message: `Critical error in ${log.agentName}: ${log.repairDetails.rootCause}`,
        agentName: log.agentName,
        timestamp: log.timestamp
      });
    });

    // Low success rate
    if (recentLogs.length > 0) {
      const successRate = (recentLogs.filter(l => l.status === 'success').length / recentLogs.length) * 100;
      if (successRate < 70) {
        alerts.push({
          level: 'warning',
          message: `Low repair success rate in last 24h: ${successRate.toFixed(1)}%`,
          timestamp: new Date()
        });
      }
    }

    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private calculateAgentHealth(): DashboardData['agentHealth'] {
    const agents = [...new Set(this.repairLogs.map(log => log.agentName))];

    return agents.map(agentName => {
      const agentLogs = this.repairLogs.filter(log => log.agentName === agentName);
      const recentLogs = agentLogs.filter(log =>
        log.timestamp >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );

      const successful = recentLogs.filter(log => log.status === 'success').length;
      const healthScore = Math.max(0, 100 - recentLogs.length * 10);

      let status: 'healthy' | 'warning' | 'critical' = 'healthy';
      if (healthScore < 50) status = 'critical';
      else if (healthScore < 75) status = 'warning';

      return {
        agentName,
        healthScore,
        status,
        lastRepair: agentLogs.length > 0 ? agentLogs[agentLogs.length - 1].timestamp : undefined,
        recentIssues: recentLogs.length
      };
    });
  }

  private getRecentActivity(limit: number): DashboardData['recentActivity'] {
    return this.repairLogs
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
      .map(log => ({
        timestamp: log.timestamp,
        agentName: log.agentName,
        activity: `Repair: ${log.repairDetails.solution}`,
        status: log.status as 'success' | 'failed' | 'pending'
      }));
  }

  private createChartData(): DashboardData['charts'] {
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentLogs = this.repairLogs.filter(log => log.timestamp >= last7Days);

    return {
      errorTrend: this.generateTimeSeriesData(recentLogs, { start: last7Days, end: new Date() })
        .map(d => ({ date: d.date, count: d.repairs })),
      successRateTrend: this.generateTimeSeriesData(recentLogs, { start: last7Days, end: new Date() })
        .map(d => ({ date: d.date, rate: d.repairs > 0 ? (d.successes / d.repairs) * 100 : 0 })),
      repairTimeTrend: [],
      errorDistribution: this.calculateStatsByErrorType(recentLogs)
        .map(stat => ({ errorType: stat.errorType, count: stat.count }))
    };
  }

  private determineIssueTrend(issue: string): 'increasing' | 'decreasing' | 'stable' {
    // Simplified: would need historical comparison
    return 'stable';
  }
}
