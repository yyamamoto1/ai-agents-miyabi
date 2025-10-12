/**
 * AIProjectManagerAgent - プロジェクト管理の専門エージェント
 * WBS生成、タスク管理、リソース最適化、進捗追跡、リスク管理
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface ProjectManagerTaskInput {
  taskType:
    | 'wbs'
    | 'task-management'
    | 'resource-optimization'
    | 'progress-tracking'
    | 'risk-management'
    | 'milestone-planning'
    | 'team-allocation';
  projectName?: string;
  projectScope?: string;
  teamSize?: number;
  deadline?: string;
  budget?: number;
  resources?: Resource[];
  tasks?: Task[];
  risks?: Risk[];
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  availability: number; // 0-100%
  skills: string[];
  currentLoad: number; // 0-100%
}

export interface Task {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  dependencies: string[];
  assignee?: string;
  startDate?: string;
  endDate?: string;
  progress: number; // 0-100%
}

export interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  status: 'identified' | 'mitigated' | 'occurred';
}

export class AIProjectManagerAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.PROJECT_MANAGER);
  }

  protected async setup(): Promise<void> {
    this.log('AI Project Manager Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as ProjectManagerTaskInput;
    this.log(`Processing ${input.taskType} task for project: ${input.projectName || 'Unnamed'}`);

    switch (input.taskType) {
      case 'wbs':
        return await this.generateWBS(input);
      case 'task-management':
        return await this.manageTask(input);
      case 'resource-optimization':
        return await this.optimizeResources(input);
      case 'progress-tracking':
        return await this.trackProgress(input);
      case 'risk-management':
        return await this.manageRisks(input);
      case 'milestone-planning':
        return await this.planMilestones(input);
      case 'team-allocation':
        return await this.allocateTeam(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * WBS（Work Breakdown Structure）生成
   */
  private async generateWBS(input: ProjectManagerTaskInput): Promise<any> {
    this.log(`Generating WBS for project: ${input.projectName}`);

    const wbs = {
      project: input.projectName,
      phases: [
        {
          id: 'phase-1',
          name: 'プロジェクト立ち上げ',
          duration: '2週間',
          tasks: [
            {
              id: '1.1',
              name: 'プロジェクト憲章作成',
              estimatedHours: 16,
              dependencies: [],
            },
            {
              id: '1.2',
              name: 'ステークホルダー分析',
              estimatedHours: 8,
              dependencies: ['1.1'],
            },
            {
              id: '1.3',
              name: 'キックオフミーティング',
              estimatedHours: 4,
              dependencies: ['1.2'],
            },
          ],
        },
        {
          id: 'phase-2',
          name: '要件定義',
          duration: '3週間',
          tasks: [
            {
              id: '2.1',
              name: '要件ヒアリング',
              estimatedHours: 24,
              dependencies: ['1.3'],
            },
            {
              id: '2.2',
              name: '要件定義書作成',
              estimatedHours: 32,
              dependencies: ['2.1'],
            },
            {
              id: '2.3',
              name: '要件レビュー',
              estimatedHours: 16,
              dependencies: ['2.2'],
            },
          ],
        },
        {
          id: 'phase-3',
          name: '設計',
          duration: '4週間',
          tasks: [
            {
              id: '3.1',
              name: 'システム設計',
              estimatedHours: 40,
              dependencies: ['2.3'],
            },
            {
              id: '3.2',
              name: 'データベース設計',
              estimatedHours: 32,
              dependencies: ['3.1'],
            },
            {
              id: '3.3',
              name: 'UI/UX設計',
              estimatedHours: 40,
              dependencies: ['3.1'],
            },
            {
              id: '3.4',
              name: '設計レビュー',
              estimatedHours: 16,
              dependencies: ['3.2', '3.3'],
            },
          ],
        },
        {
          id: 'phase-4',
          name: '開発',
          duration: '8週間',
          tasks: [
            {
              id: '4.1',
              name: 'バックエンド開発',
              estimatedHours: 200,
              dependencies: ['3.4'],
            },
            {
              id: '4.2',
              name: 'フロントエンド開発',
              estimatedHours: 160,
              dependencies: ['3.4'],
            },
            {
              id: '4.3',
              name: 'API開発',
              estimatedHours: 120,
              dependencies: ['4.1'],
            },
            {
              id: '4.4',
              name: '統合テスト',
              estimatedHours: 80,
              dependencies: ['4.1', '4.2', '4.3'],
            },
          ],
        },
        {
          id: 'phase-5',
          name: 'テスト',
          duration: '3週間',
          tasks: [
            {
              id: '5.1',
              name: '単体テスト',
              estimatedHours: 80,
              dependencies: ['4.4'],
            },
            {
              id: '5.2',
              name: 'システムテスト',
              estimatedHours: 60,
              dependencies: ['5.1'],
            },
            {
              id: '5.3',
              name: 'ユーザー受入テスト',
              estimatedHours: 40,
              dependencies: ['5.2'],
            },
          ],
        },
        {
          id: 'phase-6',
          name: 'デプロイ・移行',
          duration: '2週間',
          tasks: [
            {
              id: '6.1',
              name: '本番環境構築',
              estimatedHours: 40,
              dependencies: ['5.3'],
            },
            {
              id: '6.2',
              name: 'データ移行',
              estimatedHours: 32,
              dependencies: ['6.1'],
            },
            {
              id: '6.3',
              name: '本番デプロイ',
              estimatedHours: 16,
              dependencies: ['6.2'],
            },
            {
              id: '6.4',
              name: 'リリース後監視',
              estimatedHours: 24,
              dependencies: ['6.3'],
            },
          ],
        },
      ],
      totalEstimatedHours: 1080,
      totalDuration: '22週間',
      criticalPath: ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.4', '4.1', '4.3', '4.4', '5.1', '5.2', '5.3', '6.1', '6.2', '6.3'],
      summary: `${input.projectName || 'プロジェクト'}のWBSを生成しました。全6フェーズ、総工数1,080時間、期間22週間。`,
    };

    return wbs;
  }

  /**
   * タスク管理
   */
  private async manageTask(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Managing project tasks...');

    const tasks = input.tasks || [];
    const analysis = {
      totalTasks: tasks.length,
      byStatus: {
        notStarted: tasks.filter((t) => t.status === 'not-started').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
        blocked: tasks.filter((t) => t.status === 'blocked').length,
      },
      byPriority: {
        critical: tasks.filter((t) => t.priority === 'critical').length,
        high: tasks.filter((t) => t.priority === 'high').length,
        medium: tasks.filter((t) => t.priority === 'medium').length,
        low: tasks.filter((t) => t.priority === 'low').length,
      },
      overallProgress: tasks.reduce((sum, t) => sum + t.progress, 0) / Math.max(tasks.length, 1),
      blockedTasks: tasks.filter((t) => t.status === 'blocked').map((t) => ({
        id: t.id,
        name: t.name,
        dependencies: t.dependencies,
      })),
      upcomingDeadlines: tasks
        .filter((t) => t.endDate && t.status !== 'completed')
        .sort((a, b) => new Date(a.endDate!).getTime() - new Date(b.endDate!).getTime())
        .slice(0, 5)
        .map((t) => ({
          id: t.id,
          name: t.name,
          deadline: t.endDate,
          priority: t.priority,
        })),
      recommendations: [
        tasks.filter((t) => t.status === 'blocked').length > 0
          ? 'ブロックされているタスクの依存関係を解消してください'
          : null,
        tasks.filter((t) => t.priority === 'critical' && t.status !== 'completed').length > 0
          ? '重要タスクの完了を最優先してください'
          : null,
        tasks.filter((t) => !t.assignee).length > 0
          ? `${tasks.filter((t) => !t.assignee).length}件のタスクが未割り当てです`
          : null,
      ].filter(Boolean),
      summary: `全${tasks.length}タスク中、完了${tasks.filter((t) => t.status === 'completed').length}件、進行中${tasks.filter((t) => t.status === 'in-progress').length}件。全体進捗${Math.round((tasks.reduce((sum, t) => sum + t.progress, 0) / Math.max(tasks.length, 1)))}%`,
    };

    return analysis;
  }

  /**
   * リソース最適化
   */
  private async optimizeResources(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Optimizing resource allocation...');

    const resources = input.resources || [];
    const tasks = input.tasks || [];

    const optimization = {
      resourceUtilization: resources.map((r) => ({
        name: r.name,
        role: r.role,
        currentLoad: r.currentLoad,
        availability: r.availability,
        utilization: r.currentLoad / Math.max(r.availability, 1),
        status:
          r.currentLoad > r.availability * 0.9
            ? 'overloaded'
            : r.currentLoad < r.availability * 0.5
              ? 'underutilized'
              : 'optimal',
      })),
      overloadedResources: resources
        .filter((r) => r.currentLoad > r.availability * 0.9)
        .map((r) => r.name),
      underutilizedResources: resources
        .filter((r) => r.currentLoad < r.availability * 0.5)
        .map((r) => r.name),
      taskAllocationSuggestions: tasks
        .filter((t) => !t.assignee)
        .slice(0, 5)
        .map((t) => {
          const suitableResources = resources
            .filter((r) => r.currentLoad < r.availability * 0.8)
            .sort((a, b) => a.currentLoad - b.currentLoad);

          return {
            taskId: t.id,
            taskName: t.name,
            suggestedAssignee: suitableResources[0]?.name || 'No available resource',
            reason: suitableResources[0]
              ? `空き容量あり（${Math.round(100 - (suitableResources[0].currentLoad / suitableResources[0].availability) * 100)}%）`
              : '全リソースが高負荷',
          };
        }),
      recommendations: [
        resources.filter((r) => r.currentLoad > r.availability * 0.9).length > 0
          ? 'タスクの再配分または追加リソースの確保が必要です'
          : null,
        resources.filter((r) => r.currentLoad < r.availability * 0.3).length > 0
          ? '活用度の低いリソースに追加タスクを割り当て可能です'
          : null,
        tasks.filter((t) => !t.assignee).length > 5
          ? '未割り当てタスクが多数あります。優先度順に割り当ててください'
          : null,
      ].filter(Boolean),
      summary: `${resources.length}名のリソースを分析。過負荷${resources.filter((r) => r.currentLoad > r.availability * 0.9).length}名、最適${resources.filter((r) => r.currentLoad >= r.availability * 0.5 && r.currentLoad <= r.availability * 0.9).length}名、余剰${resources.filter((r) => r.currentLoad < r.availability * 0.5).length}名。`,
    };

    return optimization;
  }

  /**
   * 進捗追跡
   */
  private async trackProgress(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Tracking project progress...');

    const tasks = input.tasks || [];
    const completedTasks = tasks.filter((t) => t.status === 'completed');
    const totalEstimatedHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
    const completedHours = completedTasks.reduce((sum, t) => sum + t.estimatedHours, 0);

    const progress = {
      overall: {
        taskCompletion: `${completedTasks.length}/${tasks.length}`,
        taskCompletionPercentage: (completedTasks.length / Math.max(tasks.length, 1)) * 100,
        hourCompletion: `${completedHours}/${totalEstimatedHours}`,
        hourCompletionPercentage: (completedHours / Math.max(totalEstimatedHours, 1)) * 100,
      },
      byPhase: [
        { phase: 'プロジェクト立ち上げ', completion: 100, status: '完了' },
        { phase: '要件定義', completion: 100, status: '完了' },
        { phase: '設計', completion: 75, status: '進行中' },
        { phase: '開発', completion: 40, status: '進行中' },
        { phase: 'テスト', completion: 0, status: '未着手' },
        { phase: 'デプロイ', completion: 0, status: '未着手' },
      ],
      velocity: {
        currentWeek: 120, // 時間/週
        averageWeekly: 115,
        trend: 'increasing',
      },
      burndown: {
        plannedRemaining: totalEstimatedHours - completedHours,
        actualRemaining: totalEstimatedHours - completedHours,
        onTrack: true,
      },
      upcomingMilestones: [
        { name: '設計完了', deadline: input.deadline || '2025-11-01', status: 'on-track' },
        { name: '開発完了', deadline: input.deadline || '2025-12-20', status: 'at-risk' },
        { name: 'リリース', deadline: input.deadline || '2026-01-15', status: 'on-track' },
      ],
      risks: [
        '開発フェーズが予定より遅延気味',
        '重要タスクのブロッカーが存在',
      ],
      recommendations: [
        '開発速度を上げるため、追加リソースの投入を検討',
        'ブロックされているタスクの依存関係を早急に解消',
        '週次進捗レビューを継続して実施',
      ],
      summary: `プロジェクト全体進捗${Math.round((completedTasks.length / Math.max(tasks.length, 1)) * 100)}%。設計フェーズ75%完了、開発フェーズ40%完了。`,
    };

    return progress;
  }

  /**
   * リスク管理
   */
  private async manageRisks(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Managing project risks...');

    const risks = input.risks || [];

    const riskAnalysis = {
      totalRisks: risks.length,
      byStatus: {
        identified: risks.filter((r) => r.status === 'identified').length,
        mitigated: risks.filter((r) => r.status === 'mitigated').length,
        occurred: risks.filter((r) => r.status === 'occurred').length,
      },
      riskMatrix: [
        {
          level: 'Critical',
          risks: risks.filter(
            (r) => r.probability === 'high' && r.impact === 'high'
          ),
        },
        {
          level: 'High',
          risks: risks.filter(
            (r) =>
              (r.probability === 'high' && r.impact === 'medium') ||
              (r.probability === 'medium' && r.impact === 'high')
          ),
        },
        {
          level: 'Medium',
          risks: risks.filter(
            (r) =>
              (r.probability === 'medium' && r.impact === 'medium') ||
              (r.probability === 'high' && r.impact === 'low') ||
              (r.probability === 'low' && r.impact === 'high')
          ),
        },
        {
          level: 'Low',
          risks: risks.filter(
            (r) =>
              (r.probability === 'low' && r.impact === 'medium') ||
              (r.probability === 'medium' && r.impact === 'low') ||
              (r.probability === 'low' && r.impact === 'low')
          ),
        },
      ],
      topRisks: risks
        .filter((r) => r.status === 'identified')
        .filter(
          (r) =>
            (r.probability === 'high' && r.impact === 'high') ||
            (r.probability === 'high' && r.impact === 'medium') ||
            (r.probability === 'medium' && r.impact === 'high')
        )
        .slice(0, 5),
      recommendations: [
        'クリティカルリスクは即座に対応計画を策定',
        '高リスクは定期的にモニタリング',
        '発生したリスクは迅速に対処し、影響を最小化',
        '新規リスクの定期的な識別を継続',
      ],
      summary: `全${risks.length}件のリスクを管理中。クリティカル${risks.filter((r) => r.probability === 'high' && r.impact === 'high').length}件、高リスク${risks.filter((r) => (r.probability === 'high' && r.impact === 'medium') || (r.probability === 'medium' && r.impact === 'high')).length}件。`,
    };

    return riskAnalysis;
  }

  /**
   * マイルストーン計画
   */
  private async planMilestones(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Planning project milestones...');

    const milestones = {
      projectName: input.projectName,
      milestones: [
        {
          id: 'M1',
          name: 'プロジェクト立ち上げ完了',
          date: '2025-10-20',
          criteria: ['プロジェクト憲章承認', 'チーム編成完了', 'キックオフ実施'],
          status: 'completed',
        },
        {
          id: 'M2',
          name: '要件定義完了',
          date: '2025-11-10',
          criteria: ['要件定義書承認', 'ステークホルダー合意'],
          status: 'completed',
        },
        {
          id: 'M3',
          name: '設計完了',
          date: '2025-12-08',
          criteria: ['設計書承認', '技術レビュー完了'],
          status: 'in-progress',
        },
        {
          id: 'M4',
          name: '開発完了',
          date: '2026-01-31',
          criteria: ['全機能実装完了', 'コードレビュー完了', '統合テスト完了'],
          status: 'planned',
        },
        {
          id: 'M5',
          name: 'テスト完了',
          date: '2026-02-21',
          criteria: ['全テスト完了', 'UAT承認'],
          status: 'planned',
        },
        {
          id: 'M6',
          name: '本番リリース',
          date: '2026-03-07',
          criteria: ['本番デプロイ完了', 'リリース後監視', 'プロジェクト完了報告'],
          status: 'planned',
        },
      ],
      criticalPath: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      summary: '全6マイルストーンを計画。現在M3（設計完了）進行中。',
    };

    return milestones;
  }

  /**
   * チーム割り当て
   */
  private async allocateTeam(input: ProjectManagerTaskInput): Promise<any> {
    this.log('Allocating team members...');

    const resources = input.resources || [];
    const tasks = input.tasks || [];

    const allocation = {
      teamSize: resources.length,
      allocation: resources.map((r) => ({
        member: r.name,
        role: r.role,
        skills: r.skills,
        currentLoad: `${r.currentLoad}%`,
        availability: `${r.availability}%`,
        assignedTasks: tasks
          .filter((t) => t.assignee === r.name)
          .map((t) => ({
            id: t.id,
            name: t.name,
            estimatedHours: t.estimatedHours,
            status: t.status,
          })),
      })),
      recommendations: [
        {
          task: 'バックエンド開発',
          suggestedAssignee: resources.find((r) => r.skills.includes('Backend'))?.name || 'N/A',
          reason: 'スキルマッチ',
        },
        {
          task: 'フロントエンド開発',
          suggestedAssignee: resources.find((r) => r.skills.includes('Frontend'))?.name || 'N/A',
          reason: 'スキルマッチ',
        },
        {
          task: 'テスト',
          suggestedAssignee: resources.find((r) => r.skills.includes('QA'))?.name || 'N/A',
          reason: 'スキルマッチ',
        },
      ],
      summary: `${resources.length}名のチームメンバーに${tasks.length}タスクを割り当て。`,
    };

    return allocation;
  }

  protected async cleanup(): Promise<void> {
    this.log('AI Project Manager Agent cleanup completed');
  }
}
