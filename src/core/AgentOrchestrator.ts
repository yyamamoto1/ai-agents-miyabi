/**
 * AgentOrchestrator - 複数のエージェントを統括・調整するシステム
 */

import { BaseAgent, AgentTask, AgentResponse } from './BaseAgent.js';

export interface OrchestratorConfig {
  maxConcurrentTasks?: number;
  enableLogging?: boolean;
  autoRetry?: boolean;
}

export interface WorkflowStep {
  agentName: string;
  task: Omit<AgentTask, 'id'>;
  dependsOn?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export class AgentOrchestrator {
  private agents: Map<string, BaseAgent> = new Map();
  private workflows: Map<string, Workflow> = new Map();
  private config: OrchestratorConfig;
  private taskIdCounter: number = 0;

  constructor(config: OrchestratorConfig = {}) {
    this.config = {
      maxConcurrentTasks: config.maxConcurrentTasks || 5,
      enableLogging: config.enableLogging !== false,
      autoRetry: config.autoRetry !== false,
    };
  }

  /**
   * エージェントを登録
   */
  registerAgent(agent: BaseAgent): void {
    const status = agent.getStatus();
    this.agents.set(status.name, agent);
    this.log(`Agent registered: ${status.name} (${status.role})`);
  }

  /**
   * 複数のエージェントを一括登録
   */
  registerAgents(agents: BaseAgent[]): void {
    agents.forEach((agent) => this.registerAgent(agent));
  }

  /**
   * エージェントを取得
   */
  getAgent(name: string): BaseAgent | undefined {
    return this.agents.get(name);
  }

  /**
   * 全エージェントのリストを取得
   */
  listAgents(): Array<ReturnType<BaseAgent['getStatus']>> {
    return Array.from(this.agents.values()).map((agent) => agent.getStatus());
  }

  /**
   * カテゴリ別にエージェントを取得
   */
  getAgentsByCategory(category: string): BaseAgent[] {
    return Array.from(this.agents.values()).filter(
      (agent) => agent.getStatus().category === category
    );
  }

  /**
   * ワークフローを登録
   */
  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
    this.log(`Workflow registered: ${workflow.name}`);
  }

  /**
   * 単一タスクの実行
   */
  async executeTask(agentName: string, taskData: Omit<AgentTask, 'id'>): Promise<AgentResponse> {
    const agent = this.agents.get(agentName);

    if (!agent) {
      throw new Error(`Agent not found: ${agentName}`);
    }

    const task: AgentTask = {
      ...taskData,
      id: this.generateTaskId(),
    };

    this.log(`Executing task ${task.id} with agent ${agentName}`);
    return await agent.execute(task);
  }

  /**
   * ワークフローの実行
   */
  async executeWorkflow(workflowId: string, context: Record<string, any> = {}): Promise<Map<string, AgentResponse>> {
    const workflow = this.workflows.get(workflowId);

    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    this.log(`Starting workflow: ${workflow.name}`);

    const results = new Map<string, AgentResponse>();
    const completedSteps = new Set<string>();

    // 依存関係を考慮しながらステップを実行
    for (const step of workflow.steps) {
      // 依存関係のチェック
      if (step.dependsOn) {
        const allDependenciesMet = step.dependsOn.every((dep) => completedSteps.has(dep));
        if (!allDependenciesMet) {
          throw new Error(`Dependencies not met for step with agent: ${step.agentName}`);
        }
      }

      // タスクの実行
      const task: AgentTask = {
        ...step.task,
        id: this.generateTaskId(),
        context: { ...context, workflowId, previousResults: Object.fromEntries(results) },
      };

      const result = await this.executeTask(step.agentName, task);
      results.set(step.agentName, result);
      completedSteps.add(step.agentName);

      // 失敗時の処理
      if (!result.success && !this.config.autoRetry) {
        this.log(`Workflow ${workflowId} failed at step ${step.agentName}`, 'error');
        break;
      }
    }

    this.log(`Workflow ${workflow.name} completed`);
    return results;
  }

  /**
   * 複数タスクの並列実行
   */
  async executeParallel(tasks: Array<{ agentName: string; task: Omit<AgentTask, 'id'> }>): Promise<AgentResponse[]> {
    this.log(`Executing ${tasks.length} tasks in parallel`);

    const promises = tasks.map(({ agentName, task }) => this.executeTask(agentName, task));

    return await Promise.all(promises);
  }

  /**
   * 全エージェントの初期化
   */
  async initializeAll(): Promise<void> {
    this.log('Initializing all agents...');

    const initPromises = Array.from(this.agents.values()).map((agent) => {
      const status = agent.getStatus();
      if (!status.initialized) {
        return agent.initialize();
      }
      return Promise.resolve();
    });

    await Promise.all(initPromises);
    this.log('All agents initialized');
  }

  /**
   * 全エージェントのシャットダウン
   */
  async shutdownAll(): Promise<void> {
    this.log('Shutting down all agents...');

    const shutdownPromises = Array.from(this.agents.values()).map((agent) => agent.shutdown());

    await Promise.all(shutdownPromises);
    this.log('All agents shut down');
  }

  /**
   * システム全体のステータスを取得
   */
  getSystemStatus() {
    return {
      totalAgents: this.agents.size,
      totalWorkflows: this.workflows.size,
      agents: this.listAgents(),
      workflows: Array.from(this.workflows.values()).map((w) => ({
        id: w.id,
        name: w.name,
        steps: w.steps.length,
      })),
    };
  }

  /**
   * タスクIDを生成
   */
  private generateTaskId(): string {
    return `task-${Date.now()}-${++this.taskIdCounter}`;
  }

  /**
   * ログ出力
   */
  private log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    if (this.config.enableLogging) {
      const timestamp = new Date().toISOString();
      console[level](`[${timestamp}] [Orchestrator] ${message}`);
    }
  }
}
