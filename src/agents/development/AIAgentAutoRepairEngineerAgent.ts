import { BaseAgent, AgentCapability } from '../base/BaseAgent';

/**
 * AI Agent Auto Repair Engineer
 *
 * エージェントの自動修復を行う専門エージェント
 *
 * 主な機能:
 * 1. エラー分析 - エラーの根本原因を特定
 * 2. 自動修復 - シンプルなエラーの自動修復
 * 3. エスカレーション - 複雑なエラーは専門エージェントへ
 * 4. 修復テスト - 修復後の動作確認
 * 5. ロールバック - 修復失敗時の復元
 * 6. 修復プラン生成 - 段階的な修復計画作成
 * 7. 修復履歴記録 - 修復内容のログ保存
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface RepairInput {
  taskType: 'analyze-error' | 'auto-repair' | 'escalate' | 'test-repair' | 'rollback' | 'generate-plan' | 'record-repair';
  agentName?: string;
  errorId?: string;
  errorInfo?: AgentErrorInfo;
  repairId?: string;
  repairPlan?: RepairPlan;
  testResults?: TestResult[];
  repairRecord?: RepairRecord;
}

export interface RepairOutput {
  taskType: 'analyze-error' | 'auto-repair' | 'escalate' | 'test-repair' | 'rollback' | 'generate-plan' | 'record-repair';
  success: boolean;
  message: string;
  errorAnalysis?: ErrorAnalysis;
  repairResult?: RepairResult;
  escalationInfo?: EscalationInfo;
  testReport?: TestReport;
  rollbackResult?: RollbackResult;
  repairPlan?: RepairPlan;
  recordConfirmation?: RecordConfirmation;
  timestamp: Date;
  processingTime: number;
}

// エラー情報
export interface AgentErrorInfo {
  errorId: string;
  agentName: string;
  errorType: 'syntax' | 'logic' | 'performance' | 'integration' | 'configuration' | 'timeout' | 'memory' | 'unknown';
  errorMessage: string;
  stackTrace?: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
  context?: {
    input?: any;
    expectedOutput?: any;
    actualOutput?: any;
    environment?: Record<string, any>;
  };
  logs?: string[];
  metrics?: {
    responseTime?: number;
    memoryUsage?: number;
    cpuUsage?: number;
  };
}

// エラー分析結果
export interface ErrorAnalysis {
  errorId: string;
  agentName: string;
  category: 'code_structure' | 'prompt_design' | 'fullstack_integration' | 'test_coverage' | 'configuration' | 'performance' | 'dependency';
  rootCause: string;
  affectedComponents: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  canAutoRepair: boolean;
  estimatedRepairTime: number; // minutes
  requiredSpecialist?: string; // AIEngineer, AIPromptEngineer, etc.
  similarIssues: SimilarIssue[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  impactScope: 'isolated' | 'module' | 'system';
}

export interface SimilarIssue {
  errorId: string;
  agentName: string;
  similarity: number; // 0-100
  resolution: string;
  successful: boolean;
  timestamp: Date;
}

// 修復結果
export interface RepairResult {
  repairId: string;
  errorId: string;
  agentName: string;
  repairType: 'auto' | 'escalated' | 'manual';
  status: 'success' | 'partial' | 'failed' | 'pending';
  changes: CodeChange[];
  backupId: string;
  testsPassed: number;
  testsFailed: number;
  improvementMetrics: {
    errorRateChange: number; // percentage
    performanceChange: number; // percentage
    stabilityChange: number; // percentage
  };
  repairNotes: string;
  timestamp: Date;
}

export interface CodeChange {
  filePath: string;
  changeType: 'add' | 'modify' | 'delete' | 'refactor';
  beforeCode: string;
  afterCode: string;
  lineNumbers: { start: number; end: number };
  description: string;
}

// エスカレーション情報
export interface EscalationInfo {
  escalationId: string;
  errorId: string;
  agentName: string;
  assignedSpecialist: string; // AIEngineer, AIPromptEngineer, etc.
  priority: 'urgent' | 'high' | 'normal' | 'low';
  reason: string;
  context: {
    errorAnalysis: ErrorAnalysis;
    attemptedRepairs: string[];
    requiredExpertise: string[];
  };
  deadline?: Date;
  status: 'assigned' | 'in_progress' | 'completed' | 'blocked';
  estimatedCompletion?: Date;
}

// テストレポート
export interface TestReport {
  repairId: string;
  agentName: string;
  testSuite: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number; // milliseconds
  testResults: TestResult[];
  coverage: {
    line: number; // percentage
    branch: number; // percentage
    function: number; // percentage
  };
  performanceMetrics: {
    avgResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
    throughput: number;
  };
  recommendation: 'deploy' | 'fix_required' | 'revert';
  issues: string[];
}

export interface TestResult {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  errorMessage?: string;
  expectedOutput?: any;
  actualOutput?: any;
}

// ロールバック結果
export interface RollbackResult {
  rollbackId: string;
  repairId: string;
  agentName: string;
  status: 'success' | 'failed';
  restoredFiles: string[];
  backupId: string;
  verificationTests: TestResult[];
  rollbackReason: string;
  timestamp: Date;
}

// 修復プラン
export interface RepairPlan {
  planId: string;
  errorId: string;
  agentName: string;
  phases: RepairPhase[];
  totalEstimatedTime: number; // minutes
  riskAssessment: string;
  contingencyPlan: string;
  approvalRequired: boolean;
  createdAt: Date;
}

export interface RepairPhase {
  phaseNumber: number;
  name: string;
  description: string;
  actions: RepairAction[];
  estimatedTime: number; // minutes
  dependencies: number[]; // phase numbers
  risks: string[];
  successCriteria: string[];
}

export interface RepairAction {
  actionId: string;
  type: 'code_change' | 'config_update' | 'test_execution' | 'validation' | 'backup' | 'rollback';
  description: string;
  targetFile?: string;
  command?: string;
  expectedOutcome: string;
  rollbackProcedure: string;
}

// 修復記録
export interface RepairRecord {
  recordId: string;
  repairId: string;
  errorId: string;
  agentName: string;
  errorType: string;
  repairType: string;
  status: 'success' | 'failed';
  beforeState: {
    errorRate: number;
    performance: number;
    code: string;
  };
  afterState: {
    errorRate: number;
    performance: number;
    code: string;
  };
  improvements: {
    metric: string;
    beforeValue: number;
    afterValue: number;
    changePercentage: number;
  }[];
  lessons: string[];
  timestamp: Date;
}

export interface RecordConfirmation {
  recordId: string;
  saved: boolean;
  location: string;
  message: string;
}

// ============================================================================
// Agent Implementation
// ============================================================================

export class AIAgentAutoRepairEngineerAgent extends BaseAgent {
  constructor() {
    super(
      'AI Agent Auto Repair Engineer',
      'エージェントの自動修復を行う専門エージェント',
      [
        AgentCapability.ANALYSIS,
        AgentCapability.CODE_GENERATION,
        AgentCapability.PROBLEM_SOLVING,
        AgentCapability.OPTIMIZATION,
        AgentCapability.TESTING,
        AgentCapability.DEBUGGING
      ]
    );
  }

  async setup(): Promise<void> {
    console.log(`[${this.name}] Initializing auto-repair systems...`);
    console.log(`[${this.name}] Loading repair patterns and best practices...`);
    console.log(`[${this.name}] Connecting to specialist agents...`);
    console.log(`[${this.name}] Setup complete!`);
  }

  async process(input: RepairInput): Promise<RepairOutput> {
    const startTime = Date.now();
    console.log(`[${this.name}] Processing ${input.taskType} task...`);

    try {
      let result: Partial<RepairOutput>;

      switch (input.taskType) {
        case 'analyze-error':
          if (!input.errorInfo) {
            throw new Error('Error info is required for analyze-error task');
          }
          result = await this.analyzeError(input.errorInfo);
          break;

        case 'auto-repair':
          if (!input.errorInfo) {
            throw new Error('Error info is required for auto-repair task');
          }
          result = await this.attemptAutoRepair(input.errorInfo);
          break;

        case 'escalate':
          if (!input.errorInfo) {
            throw new Error('Error info is required for escalate task');
          }
          result = await this.escalateToSpecialist(input.errorInfo);
          break;

        case 'test-repair':
          if (!input.repairId || !input.agentName) {
            throw new Error('Repair ID and agent name are required for test-repair task');
          }
          result = await this.testRepair(input.repairId, input.agentName);
          break;

        case 'rollback':
          if (!input.repairId || !input.agentName) {
            throw new Error('Repair ID and agent name are required for rollback task');
          }
          result = await this.rollbackRepair(input.repairId, input.agentName);
          break;

        case 'generate-plan':
          if (!input.errorInfo) {
            throw new Error('Error info is required for generate-plan task');
          }
          result = await this.generateRepairPlan(input.errorInfo);
          break;

        case 'record-repair':
          if (!input.repairRecord) {
            throw new Error('Repair record is required for record-repair task');
          }
          result = await this.recordRepair(input.repairRecord);
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
    console.log(`[${this.name}] Cleaning up repair sessions...`);
    console.log(`[${this.name}] Saving repair history...`);
    console.log(`[${this.name}] Cleanup complete!`);
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  /**
   * エラー分析
   */
  private async analyzeError(errorInfo: AgentErrorInfo): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Analyzing error ${errorInfo.errorId} for agent ${errorInfo.agentName}...`);

    // エラーカテゴリーの判定
    const category = this.categorizeError(errorInfo);

    // 根本原因の特定
    const rootCause = this.identifyRootCause(errorInfo);

    // 影響範囲の特定
    const affectedComponents = this.identifyAffectedComponents(errorInfo);

    // 複雑さの評価
    const complexity = this.assessComplexity(errorInfo);

    // 自動修復可能かの判定
    const canAutoRepair = this.canAutoRepair(errorInfo, complexity);

    // 必要な専門家の判定
    const requiredSpecialist = canAutoRepair ? undefined : this.determineSpecialist(category);

    // 類似問題の検索
    const similarIssues = await this.findSimilarIssues(errorInfo);

    // 推奨事項の生成
    const recommendations = this.generateRecommendations(errorInfo, category, similarIssues);

    const errorAnalysis: ErrorAnalysis = {
      errorId: errorInfo.errorId,
      agentName: errorInfo.agentName,
      category,
      rootCause,
      affectedComponents,
      complexity,
      canAutoRepair,
      estimatedRepairTime: this.estimateRepairTime(complexity, canAutoRepair),
      requiredSpecialist,
      similarIssues,
      recommendations,
      riskLevel: this.assessRiskLevel(errorInfo, complexity),
      impactScope: this.assessImpactScope(affectedComponents)
    };

    console.log(`[${this.name}] Error analysis complete. Can auto-repair: ${canAutoRepair}`);

    return {
      errorAnalysis
    };
  }

  /**
   * 自動修復の試行
   */
  private async attemptAutoRepair(errorInfo: AgentErrorInfo): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Attempting auto-repair for error ${errorInfo.errorId}...`);

    // まずエラー分析
    const analysisResult = await this.analyzeError(errorInfo);
    const analysis = analysisResult.errorAnalysis!;

    if (!analysis.canAutoRepair) {
      console.log(`[${this.name}] Error is too complex for auto-repair. Escalating...`);
      return await this.escalateToSpecialist(errorInfo);
    }

    // バックアップの作成
    const backupId = await this.createBackup(errorInfo.agentName);

    // 修復の実行
    const changes = await this.applyRepairChanges(errorInfo, analysis);

    // テストの実行
    const testReport = await this.runTests(errorInfo.agentName);

    // 修復結果の評価
    const status = this.evaluateRepairStatus(testReport);

    const repairId = `repair-${Date.now()}-${errorInfo.errorId}`;
    const repairResult: RepairResult = {
      repairId,
      errorId: errorInfo.errorId,
      agentName: errorInfo.agentName,
      repairType: 'auto',
      status,
      changes,
      backupId,
      testsPassed: testReport.passed,
      testsFailed: testReport.failed,
      improvementMetrics: await this.calculateImprovements(errorInfo.agentName),
      repairNotes: `Auto-repair applied for ${analysis.category} issue: ${analysis.rootCause}`,
      timestamp: new Date()
    };

    if (status === 'failed') {
      console.log(`[${this.name}] Auto-repair failed. Rolling back...`);
      await this.rollbackRepair(repairId, errorInfo.agentName);
    }

    console.log(`[${this.name}] Auto-repair ${status}. Tests: ${testReport.passed}/${testReport.totalTests} passed`);

    return {
      repairResult,
      testReport
    };
  }

  /**
   * 専門エージェントへのエスカレーション
   */
  private async escalateToSpecialist(errorInfo: AgentErrorInfo): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Escalating error ${errorInfo.errorId} to specialist...`);

    const analysisResult = await this.analyzeError(errorInfo);
    const analysis = analysisResult.errorAnalysis!;

    const assignedSpecialist = analysis.requiredSpecialist || this.determineSpecialist(analysis.category);
    const priority = this.determinePriority(errorInfo, analysis);

    const escalationId = `escalation-${Date.now()}-${errorInfo.errorId}`;
    const escalationInfo: EscalationInfo = {
      escalationId,
      errorId: errorInfo.errorId,
      agentName: errorInfo.agentName,
      assignedSpecialist,
      priority,
      reason: `Complex ${analysis.category} issue requiring specialist expertise: ${analysis.rootCause}`,
      context: {
        errorAnalysis: analysis,
        attemptedRepairs: ['Auto-repair deemed too risky or complex'],
        requiredExpertise: this.getRequiredExpertise(analysis.category)
      },
      status: 'assigned',
      estimatedCompletion: this.estimateCompletionTime(analysis.estimatedRepairTime)
    };

    console.log(`[${this.name}] Escalated to ${assignedSpecialist} with ${priority} priority`);

    return {
      escalationInfo
    };
  }

  /**
   * 修復後のテスト実行
   */
  private async testRepair(repairId: string, agentName: string): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Testing repair ${repairId} for agent ${agentName}...`);

    const testReport = await this.runTests(agentName);

    console.log(`[${this.name}] Test complete: ${testReport.passed}/${testReport.totalTests} passed`);

    return {
      testReport
    };
  }

  /**
   * 修復のロールバック
   */
  private async rollbackRepair(repairId: string, agentName: string): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Rolling back repair ${repairId} for agent ${agentName}...`);

    const backupId = `backup-${repairId}`;
    const restoredFiles = await this.restoreFromBackup(backupId, agentName);
    const verificationTests = await this.runBasicTests(agentName);

    const rollbackResult: RollbackResult = {
      rollbackId: `rollback-${Date.now()}`,
      repairId,
      agentName,
      status: verificationTests.every(t => t.status === 'passed') ? 'success' : 'failed',
      restoredFiles,
      backupId,
      verificationTests,
      rollbackReason: 'Repair verification failed or caused regression',
      timestamp: new Date()
    };

    console.log(`[${this.name}] Rollback ${rollbackResult.status}. Restored ${restoredFiles.length} files`);

    return {
      rollbackResult
    };
  }

  /**
   * 修復プランの生成
   */
  private async generateRepairPlan(errorInfo: AgentErrorInfo): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Generating repair plan for error ${errorInfo.errorId}...`);

    const analysisResult = await this.analyzeError(errorInfo);
    const analysis = analysisResult.errorAnalysis!;

    const phases = this.createRepairPhases(errorInfo, analysis);
    const totalEstimatedTime = phases.reduce((sum, phase) => sum + phase.estimatedTime, 0);

    const repairPlan: RepairPlan = {
      planId: `plan-${Date.now()}-${errorInfo.errorId}`,
      errorId: errorInfo.errorId,
      agentName: errorInfo.agentName,
      phases,
      totalEstimatedTime,
      riskAssessment: this.assessRepairRisk(analysis),
      contingencyPlan: this.createContingencyPlan(analysis),
      approvalRequired: analysis.riskLevel === 'high' || analysis.impactScope === 'system',
      createdAt: new Date()
    };

    console.log(`[${this.name}] Repair plan generated: ${phases.length} phases, ${totalEstimatedTime} min estimated`);

    return {
      repairPlan
    };
  }

  /**
   * 修復履歴の記録
   */
  private async recordRepair(repairRecord: RepairRecord): Promise<Partial<RepairOutput>> {
    console.log(`[${this.name}] Recording repair ${repairRecord.repairId}...`);

    // 修復履歴をデータベースまたはファイルに保存
    const location = `./repair-logs/${repairRecord.agentName}/${repairRecord.recordId}.json`;

    // 実際の保存処理（ここではシミュレーション）
    const saved = true;

    const recordConfirmation: RecordConfirmation = {
      recordId: repairRecord.recordId,
      saved,
      location,
      message: `Repair record successfully saved for ${repairRecord.agentName}`
    };

    console.log(`[${this.name}] Repair recorded at ${location}`);

    return {
      recordConfirmation
    };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private categorizeError(errorInfo: AgentErrorInfo): ErrorAnalysis['category'] {
    const message = errorInfo.errorMessage.toLowerCase();
    const stack = errorInfo.stackTrace?.toLowerCase() || '';

    if (message.includes('syntax') || message.includes('parse') || stack.includes('syntaxerror')) {
      return 'code_structure';
    }
    if (message.includes('prompt') || message.includes('template') || message.includes('instruction')) {
      return 'prompt_design';
    }
    if (message.includes('api') || message.includes('endpoint') || message.includes('integration')) {
      return 'fullstack_integration';
    }
    if (message.includes('test') || message.includes('assertion') || message.includes('expect')) {
      return 'test_coverage';
    }
    if (message.includes('config') || message.includes('environment') || message.includes('settings')) {
      return 'configuration';
    }
    if (message.includes('timeout') || message.includes('slow') || message.includes('performance')) {
      return 'performance';
    }
    if (message.includes('module') || message.includes('import') || message.includes('dependency')) {
      return 'dependency';
    }

    return 'code_structure'; // default
  }

  private identifyRootCause(errorInfo: AgentErrorInfo): string {
    // エラーメッセージとスタックトレースから根本原因を特定
    const causes = [];

    if (errorInfo.errorMessage.includes('undefined')) {
      causes.push('Undefined variable or property access');
    }
    if (errorInfo.errorMessage.includes('null')) {
      causes.push('Null reference error');
    }
    if (errorInfo.errorMessage.includes('timeout')) {
      causes.push('Operation exceeded time limit');
    }
    if (errorInfo.stackTrace?.includes('async')) {
      causes.push('Asynchronous operation handling issue');
    }

    return causes.length > 0
      ? causes.join('; ')
      : `Error in ${errorInfo.agentName}: ${errorInfo.errorMessage}`;
  }

  private identifyAffectedComponents(errorInfo: AgentErrorInfo): string[] {
    const components = [errorInfo.agentName];

    // スタックトレースから影響を受けるコンポーネントを抽出
    if (errorInfo.stackTrace) {
      const fileMatches = errorInfo.stackTrace.match(/at\s+[\w.]+\s+\((.*?):\d+:\d+\)/g);
      if (fileMatches) {
        fileMatches.forEach(match => {
          const fileMatch = match.match(/\((.*?):\d+:\d+\)/);
          if (fileMatch) {
            components.push(fileMatch[1]);
          }
        });
      }
    }

    return [...new Set(components)]; // 重複除去
  }

  private assessComplexity(errorInfo: AgentErrorInfo): 'simple' | 'moderate' | 'complex' {
    let complexityScore = 0;

    // エラータイプによる複雑さ
    if (errorInfo.errorType === 'syntax') complexityScore += 1;
    if (errorInfo.errorType === 'logic') complexityScore += 2;
    if (errorInfo.errorType === 'integration') complexityScore += 3;
    if (errorInfo.errorType === 'performance') complexityScore += 2;

    // 深刻度による複雑さ
    if (errorInfo.severity === 'critical') complexityScore += 2;
    if (errorInfo.severity === 'high') complexityScore += 1;

    // スタックトレースの深さ
    const stackDepth = errorInfo.stackTrace?.split('\n').length || 0;
    if (stackDepth > 10) complexityScore += 2;
    else if (stackDepth > 5) complexityScore += 1;

    if (complexityScore <= 2) return 'simple';
    if (complexityScore <= 5) return 'moderate';
    return 'complex';
  }

  private canAutoRepair(errorInfo: AgentErrorInfo, complexity: 'simple' | 'moderate' | 'complex'): boolean {
    // シンプルなエラーのみ自動修復可能
    if (complexity === 'complex') return false;
    if (errorInfo.severity === 'critical') return false;

    // 特定のエラータイプは自動修復可能
    const autoRepairableTypes = ['syntax', 'configuration'];
    return autoRepairableTypes.includes(errorInfo.errorType);
  }

  private determineSpecialist(category: ErrorAnalysis['category']): string {
    const specialistMap: Record<ErrorAnalysis['category'], string> = {
      'code_structure': 'AIEngineer',
      'prompt_design': 'AIPromptEngineer',
      'fullstack_integration': 'AIFullStackCodeEngineer',
      'test_coverage': 'AITestEngineer',
      'configuration': 'AIEngineer',
      'performance': 'AIEngineer',
      'dependency': 'AIEngineer'
    };

    return specialistMap[category] || 'AIEngineer';
  }

  private async findSimilarIssues(errorInfo: AgentErrorInfo): Promise<SimilarIssue[]> {
    // 過去の類似エラーを検索（ここではシミュレーション）
    return [
      {
        errorId: 'err-001',
        agentName: errorInfo.agentName,
        similarity: 85,
        resolution: 'Fixed null check in input validation',
        successful: true,
        timestamp: new Date(Date.now() - 86400000 * 7) // 7 days ago
      }
    ];
  }

  private generateRecommendations(
    errorInfo: AgentErrorInfo,
    category: ErrorAnalysis['category'],
    similarIssues: SimilarIssue[]
  ): string[] {
    const recommendations: string[] = [];

    // カテゴリー別の推奨事項
    if (category === 'code_structure') {
      recommendations.push('Run code linter to identify syntax issues');
      recommendations.push('Add type checking with TypeScript');
    }
    if (category === 'prompt_design') {
      recommendations.push('Review and optimize prompt templates');
      recommendations.push('Add prompt validation logic');
    }
    if (category === 'test_coverage') {
      recommendations.push('Increase test coverage for affected components');
      recommendations.push('Add integration tests');
    }

    // 類似問題からの推奨事項
    const successfulResolutions = similarIssues.filter(issue => issue.successful);
    if (successfulResolutions.length > 0) {
      recommendations.push(`Consider solutions from similar past issues: ${successfulResolutions[0].resolution}`);
    }

    // エラータイプ別の推奨事項
    if (errorInfo.errorType === 'timeout') {
      recommendations.push('Optimize async operations and add timeout handling');
    }
    if (errorInfo.errorType === 'memory') {
      recommendations.push('Review memory usage and implement cleanup procedures');
    }

    return recommendations;
  }

  private estimateRepairTime(complexity: 'simple' | 'moderate' | 'complex', canAutoRepair: boolean): number {
    if (canAutoRepair) return 5; // 5 minutes

    const timeMap = {
      'simple': 15,
      'moderate': 30,
      'complex': 60
    };

    return timeMap[complexity];
  }

  private assessRiskLevel(errorInfo: AgentErrorInfo, complexity: 'simple' | 'moderate' | 'complex'): 'low' | 'medium' | 'high' {
    if (errorInfo.severity === 'critical' || complexity === 'complex') return 'high';
    if (errorInfo.severity === 'high' || complexity === 'moderate') return 'medium';
    return 'low';
  }

  private assessImpactScope(affectedComponents: string[]): 'isolated' | 'module' | 'system' {
    if (affectedComponents.length === 1) return 'isolated';
    if (affectedComponents.length <= 3) return 'module';
    return 'system';
  }

  private async createBackup(agentName: string): Promise<string> {
    const backupId = `backup-${Date.now()}-${agentName}`;
    console.log(`[${this.name}] Created backup: ${backupId}`);
    return backupId;
  }

  private async applyRepairChanges(errorInfo: AgentErrorInfo, analysis: ErrorAnalysis): Promise<CodeChange[]> {
    // 実際の修復変更を適用（ここではシミュレーション）
    const changes: CodeChange[] = [
      {
        filePath: `src/agents/${errorInfo.agentName}.ts`,
        changeType: 'modify',
        beforeCode: 'const result = data.value;',
        afterCode: 'const result = data?.value ?? defaultValue;',
        lineNumbers: { start: 42, end: 42 },
        description: 'Added null check and default value'
      }
    ];

    return changes;
  }

  private async runTests(agentName: string): Promise<TestReport> {
    // テストの実行（ここではシミュレーション）
    const totalTests = 20;
    const passed = 18;
    const failed = 2;

    return {
      repairId: `test-${Date.now()}`,
      agentName,
      testSuite: `${agentName} Test Suite`,
      totalTests,
      passed,
      failed,
      skipped: 0,
      duration: 1500,
      testResults: [
        { testName: 'should process input correctly', status: 'passed', duration: 100 },
        { testName: 'should handle errors', status: 'failed', duration: 200, errorMessage: 'Expected error handling not implemented' }
      ],
      coverage: {
        line: 85.5,
        branch: 78.2,
        function: 90.0
      },
      performanceMetrics: {
        avgResponseTime: 150,
        maxResponseTime: 300,
        minResponseTime: 50,
        throughput: 100
      },
      recommendation: failed === 0 ? 'deploy' : failed <= 2 ? 'fix_required' : 'revert',
      issues: failed > 0 ? ['Error handling needs improvement'] : []
    };
  }

  private async runBasicTests(agentName: string): Promise<TestResult[]> {
    return [
      { testName: 'Basic functionality test', status: 'passed', duration: 100 },
      { testName: 'Input validation test', status: 'passed', duration: 80 }
    ];
  }

  private evaluateRepairStatus(testReport: TestReport): RepairResult['status'] {
    if (testReport.failed === 0 && testReport.passed === testReport.totalTests) {
      return 'success';
    }
    if (testReport.failed > 0 && testReport.failed < testReport.totalTests / 2) {
      return 'partial';
    }
    return 'failed';
  }

  private async calculateImprovements(agentName: string): Promise<RepairResult['improvementMetrics']> {
    // 修復による改善指標を計算（ここではシミュレーション）
    return {
      errorRateChange: -50, // 50% reduction
      performanceChange: 20, // 20% improvement
      stabilityChange: 30 // 30% improvement
    };
  }

  private determinePriority(errorInfo: AgentErrorInfo, analysis: ErrorAnalysis): EscalationInfo['priority'] {
    if (errorInfo.severity === 'critical' || analysis.impactScope === 'system') {
      return 'urgent';
    }
    if (errorInfo.severity === 'high' || analysis.impactScope === 'module') {
      return 'high';
    }
    if (errorInfo.severity === 'medium') {
      return 'normal';
    }
    return 'low';
  }

  private getRequiredExpertise(category: ErrorAnalysis['category']): string[] {
    const expertiseMap: Record<ErrorAnalysis['category'], string[]> = {
      'code_structure': ['Software Architecture', 'Code Quality', 'Refactoring'],
      'prompt_design': ['Prompt Engineering', 'NLP', 'AI Model Optimization'],
      'fullstack_integration': ['API Design', 'System Integration', 'Full Stack Development'],
      'test_coverage': ['Test Design', 'Quality Assurance', 'Test Automation'],
      'configuration': ['DevOps', 'Configuration Management'],
      'performance': ['Performance Optimization', 'Profiling', 'Caching'],
      'dependency': ['Package Management', 'Dependency Resolution']
    };

    return expertiseMap[category] || ['General Software Engineering'];
  }

  private estimateCompletionTime(estimatedMinutes: number): Date {
    return new Date(Date.now() + estimatedMinutes * 60 * 1000);
  }

  private async restoreFromBackup(backupId: string, agentName: string): Promise<string[]> {
    // バックアップからファイルを復元（ここではシミュレーション）
    console.log(`[${this.name}] Restoring from backup ${backupId}...`);
    return [`src/agents/${agentName}.ts`, `tests/${agentName}.test.ts`];
  }

  private createRepairPhases(errorInfo: AgentErrorInfo, analysis: ErrorAnalysis): RepairPhase[] {
    const phases: RepairPhase[] = [
      {
        phaseNumber: 1,
        name: 'Preparation',
        description: 'Create backup and prepare repair environment',
        actions: [
          {
            actionId: 'action-1-1',
            type: 'backup',
            description: 'Create full backup of agent code',
            expectedOutcome: 'Backup created successfully',
            rollbackProcedure: 'N/A - this is the backup step'
          }
        ],
        estimatedTime: 2,
        dependencies: [],
        risks: ['Backup failure'],
        successCriteria: ['Backup verified and accessible']
      },
      {
        phaseNumber: 2,
        name: 'Code Repair',
        description: 'Apply code changes to fix identified issues',
        actions: [
          {
            actionId: 'action-2-1',
            type: 'code_change',
            description: `Fix ${analysis.category} issue: ${analysis.rootCause}`,
            targetFile: `src/agents/${errorInfo.agentName}.ts`,
            expectedOutcome: 'Code changes applied successfully',
            rollbackProcedure: 'Restore from backup'
          }
        ],
        estimatedTime: analysis.estimatedRepairTime,
        dependencies: [1],
        risks: ['Code changes may introduce new issues'],
        successCriteria: ['Code compiles without errors']
      },
      {
        phaseNumber: 3,
        name: 'Testing',
        description: 'Run comprehensive tests to verify repair',
        actions: [
          {
            actionId: 'action-3-1',
            type: 'test_execution',
            description: 'Run full test suite',
            command: 'npm test',
            expectedOutcome: 'All tests pass',
            rollbackProcedure: 'Restore from backup if tests fail'
          }
        ],
        estimatedTime: 5,
        dependencies: [2],
        risks: ['Tests may reveal new issues'],
        successCriteria: ['All tests pass', 'No performance regression']
      },
      {
        phaseNumber: 4,
        name: 'Validation',
        description: 'Validate repair and update documentation',
        actions: [
          {
            actionId: 'action-4-1',
            type: 'validation',
            description: 'Verify error is resolved and metrics improved',
            expectedOutcome: 'Error eliminated, metrics improved',
            rollbackProcedure: 'Restore from backup if validation fails'
          }
        ],
        estimatedTime: 3,
        dependencies: [3],
        risks: ['Validation may fail under edge cases'],
        successCriteria: ['Error no longer occurs', 'Performance metrics improved']
      }
    ];

    return phases;
  }

  private assessRepairRisk(analysis: ErrorAnalysis): string {
    const risks: string[] = [];

    if (analysis.riskLevel === 'high') {
      risks.push('High risk: May affect system stability');
    }
    if (analysis.impactScope === 'system') {
      risks.push('System-wide impact: Changes may affect multiple components');
    }
    if (analysis.complexity === 'complex') {
      risks.push('Complex repair: May require multiple iterations');
    }

    return risks.length > 0
      ? risks.join('. ')
      : 'Low risk: Isolated change with minimal impact';
  }

  private createContingencyPlan(analysis: ErrorAnalysis): string {
    return `
1. If repair fails: Restore from backup immediately
2. If tests fail: Analyze failures and adjust repair approach
3. If performance degrades: Roll back and escalate to ${analysis.requiredSpecialist || 'AIEngineer'}
4. If new errors appear: Log incidents and create new repair plan
5. If rollback fails: Manual intervention required - contact DevOps team
    `.trim();
  }
}
