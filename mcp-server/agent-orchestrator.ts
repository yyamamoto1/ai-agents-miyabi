import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  status: 'idle' | 'running' | 'busy' | 'error';
  tmuxPane?: string;
  process?: any;
}

export interface AgentTeam {
  id: string;
  agents: Agent[];
  sessionId: string;
  createdAt: Date;
}

export interface TaskResult {
  success: boolean;
  result: any;
  executionTime: number;
  errors?: string[];
}

export interface ExecutionOptions {
  priority: 'low' | 'medium' | 'high' | 'critical';
  timeout: number;
}

/**
 * ai-agents-miyabi エージェント統制システム
 * 54種類のエージェントを管理・実行する
 */
export class AgentOrchestrator {
  private agents: Agent[] = [];
  private activeTeams: Map<string, AgentTeam> = new Map();
  private agentCatalogPath: string;

  constructor() {
    this.agentCatalogPath = path.join(process.cwd(), 'src', 'agents');
    this.loadAgentCatalog();
  }

  /**
   * エージェントカタログ読み込み
   */
  private async loadAgentCatalog() {
    try {
      // 既存エージェントディレクトリをスキャン
      const agentDirs = await fs.readdir(this.agentCatalogPath);
      
      this.agents = await Promise.all(
        agentDirs.map(async (dir) => {
          const agentPath = path.join(this.agentCatalogPath, dir);
          const stat = await fs.stat(agentPath);
          
          if (stat.isDirectory()) {
            return await this.createAgentFromDirectory(dir, agentPath);
          }
          return null;
        })
      ).then(agents => agents.filter(Boolean) as Agent[]);

      console.log(`Loaded ${this.agents.length} agents from catalog`);
    } catch (error) {
      console.error('Failed to load agent catalog:', error);
    }
  }

  /**
   * ディレクトリからエージェント情報作成
   */
  private async createAgentFromDirectory(dirName: string, agentPath: string): Promise<Agent> {
    // エージェント名とカテゴリを推定
    const category = this.inferCategory(dirName);
    const capabilities = await this.inferCapabilities(agentPath);

    return {
      id: dirName,
      name: this.formatAgentName(dirName),
      category,
      description: `AI Agent specialized in ${category}`,
      capabilities,
      status: 'idle',
    };
  }

  /**
   * カテゴリ推定
   */
  private inferCategory(dirName: string): string {
    const categoryMap: Record<string, string> = {
      'data': 'データ・分析系',
      'analyst': 'データ・分析系',
      'creative': 'クリエイティブ・コンテンツ生成系',
      'content': 'クリエイティブ・コンテンツ生成系',
      'dev': '開発・運用・管理系',
      'developer': '開発・運用・管理系',
      'business': 'ビジネス・戦略・顧客対応系',
      'strategy': 'ビジネス・戦略・顧客対応系',
      'education': '教育・研究系',
      'research': '教育・研究系',
      'specialist': '専門分野特化型',
    };

    for (const [key, category] of Object.entries(categoryMap)) {
      if (dirName.toLowerCase().includes(key)) {
        return category;
      }
    }

    return '専門分野特化型';
  }

  /**
   * 能力推定
   */
  private async inferCapabilities(agentPath: string): Promise<string[]> {
    try {
      const files = await fs.readdir(agentPath);
      const capabilities: string[] = [];

      if (files.includes('index.ts') || files.includes('index.js')) {
        capabilities.push('自律実行');
      }
      if (files.includes('config.json')) {
        capabilities.push('設定管理');
      }
      if (files.some(f => f.includes('test'))) {
        capabilities.push('テスト実行');
      }

      return capabilities.length > 0 ? capabilities : ['基本機能'];
    } catch {
      return ['基本機能'];
    }
  }

  /**
   * エージェント名フォーマット
   */
  private formatAgentName(dirName: string): string {
    return dirName
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * エージェントチーム起動
   */
  async launchAgentTeam(
    sessionId: string,
    agentIds: string[],
    options: ExecutionOptions
  ): Promise<AgentTeam> {
    const team: AgentTeam = {
      id: `team-${Date.now()}`,
      agents: [],
      sessionId,
      createdAt: new Date(),
    };

    for (const agentId of agentIds) {
      const agent = this.agents.find(a => a.id === agentId);
      if (agent) {
        agent.status = 'running';
        team.agents.push(agent);
        
        // TMUX ペインでエージェント起動
        await this.launchAgentInTmux(agent, sessionId);
      }
    }

    this.activeTeams.set(team.id, team);
    return team;
  }

  /**
   * TMUX環境でエージェント起動
   */
  private async launchAgentInTmux(agent: Agent, sessionId: string): Promise<void> {
    try {
      // エージェント用のペイン作成
      const paneCmd = `tmux new-window -t ${sessionId} -n ${agent.id}`;
      await execAsync(paneCmd);

      // エージェントスクリプト実行
      const agentPath = path.join(this.agentCatalogPath, agent.id);
      const executeCmd = `tmux send-keys -t ${sessionId}:${agent.id} 'cd "${agentPath}" && npx miyabi agent start ${agent.id}' C-m`;
      await execAsync(executeCmd);

      agent.tmuxPane = `${sessionId}:${agent.id}`;
      console.log(`Agent ${agent.name} launched in tmux pane: ${agent.tmuxPane}`);
    } catch (error) {
      console.error(`Failed to launch agent ${agent.name}:`, error);
      agent.status = 'error';
    }
  }

  /**
   * タスク実行
   */
  async executeTask(team: AgentTeam, task: string): Promise<TaskResult> {
    const startTime = Date.now();

    try {
      // チーム内の各エージェントにタスク送信
      const promises = team.agents.map(agent => 
        this.sendTaskToAgent(agent, task)
      );

      const results = await Promise.allSettled(promises);
      const successResults = results
        .filter(r => r.status === 'fulfilled')
        .map(r => (r as PromiseFulfilledResult<any>).value);

      const errors = results
        .filter(r => r.status === 'rejected')
        .map(r => (r as PromiseRejectedResult).reason.message);

      return {
        success: successResults.length > 0,
        result: {
          teamId: team.id,
          agentResults: successResults,
          completedAgents: successResults.length,
          totalAgents: team.agents.length,
        },
        executionTime: Date.now() - startTime,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      return {
        success: false,
        result: null,
        executionTime: Date.now() - startTime,
        errors: [error instanceof Error ? error.message : String(error)],
      };
    }
  }

  /**
   * エージェントにタスク送信
   */
  private async sendTaskToAgent(agent: Agent, task: string): Promise<any> {
    if (!agent.tmuxPane) {
      throw new Error(`Agent ${agent.name} has no active tmux pane`);
    }

    try {
      // タスクをエージェントに送信
      const taskCmd = `tmux send-keys -t ${agent.tmuxPane} '${task}' C-m`;
      await execAsync(taskCmd);

      // 結果待機（簡易実装）
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 実行結果を取得
      const outputCmd = `tmux capture-pane -t ${agent.tmuxPane} -p`;
      const { stdout } = await execAsync(outputCmd);

      return {
        agentId: agent.id,
        agentName: agent.name,
        output: stdout.trim(),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Failed to execute task on agent ${agent.name}: ${error}`);
    }
  }

  /**
   * 利用可能エージェント取得
   */
  async getAvailableAgents(category?: string): Promise<Agent[]> {
    if (category) {
      return this.agents.filter(agent => agent.category === category);
    }
    return this.agents;
  }

  /**
   * エージェント状態取得
   */
  async getAgentStatus() {
    const activeAgents = this.agents.filter(a => a.status === 'running').length;
    
    return {
      activeAgents,
      totalAgents: this.agents.length,
      activeTeams: this.activeTeams.size,
      systemLoad: process.memoryUsage(),
      uptime: process.uptime(),
    };
  }

  /**
   * 全エージェント終了
   */
  async terminateAllAgents(): Promise<string[]> {
    const terminatedAgents: string[] = [];

    for (const agent of this.agents) {
      if (agent.status === 'running' && agent.tmuxPane) {
        try {
          // エージェント停止
          await execAsync(`tmux send-keys -t ${agent.tmuxPane} 'exit' C-m`);
          agent.status = 'idle';
          agent.tmuxPane = undefined;
          terminatedAgents.push(agent.name);
        } catch (error) {
          console.error(`Failed to terminate agent ${agent.name}:`, error);
        }
      }
    }

    this.activeTeams.clear();
    return terminatedAgents;
  }
}