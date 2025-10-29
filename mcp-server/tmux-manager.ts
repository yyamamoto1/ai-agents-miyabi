import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface TmuxSession {
  id: string;
  name: string;
  createdAt: Date;
  windows: TmuxWindow[];
}

export interface TmuxWindow {
  id: string;
  name: string;
  panes: TmuxPane[];
}

export interface TmuxPane {
  id: string;
  agentId?: string;
  command?: string;
}

/**
 * TMUX セッション管理システム
 * ai-agents-miyabi用のマルチエージェント環境を構築
 */
export class TmuxManager {
  private activeSessions: Map<string, TmuxSession> = new Map();

  /**
   * エージェント用セッション作成
   */
  async createAgentSession(agentIds: string[]): Promise<string> {
    const sessionId = `ai-agents-${Date.now()}`;
    const sessionName = `ai-agents-miyabi-${sessionId}`;

    try {
      // メインセッション作成
      await execAsync(`tmux new-session -d -s ${sessionName} -x 120 -y 30`);
      
      // セッション情報記録
      const session: TmuxSession = {
        id: sessionId,
        name: sessionName,
        createdAt: new Date(),
        windows: [],
      };

      // 各エージェント用のウィンドウ作成準備
      console.log(`Created tmux session: ${sessionName} for ${agentIds.length} agents`);
      
      this.activeSessions.set(sessionId, session);
      return sessionId;
    } catch (error) {
      throw new Error(`Failed to create tmux session: ${error}`);
    }
  }

  /**
   * マルチペイン環境構築
   */
  async setupMultiPaneEnvironment(sessionId: string, agentCount: number): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const sessionName = session.name;

      // エージェント数に応じてペイン配置を決定
      if (agentCount <= 2) {
        // 2分割
        await execAsync(`tmux split-window -t ${sessionName} -h`);
      } else if (agentCount <= 4) {
        // 4分割 (2x2グリッド)
        await execAsync(`tmux split-window -t ${sessionName} -h`);
        await execAsync(`tmux split-window -t ${sessionName}:0.0 -v`);
        await execAsync(`tmux split-window -t ${sessionName}:0.2 -v`);
      } else if (agentCount <= 6) {
        // 6分割 (2x3グリッド)
        await execAsync(`tmux split-window -t ${sessionName} -h`);
        await execAsync(`tmux split-window -t ${sessionName}:0.0 -v`);
        await execAsync(`tmux split-window -t ${sessionName}:0.1 -v`);
        await execAsync(`tmux split-window -t ${sessionName}:0.3 -v`);
        await execAsync(`tmux split-window -t ${sessionName}:0.4 -v`);
      } else {
        // 多数のエージェント用: ウィンドウ分割方式
        for (let i = 1; i < Math.min(agentCount, 10); i++) {
          await execAsync(`tmux new-window -t ${sessionName} -n agent-${i}`);
        }
      }

      console.log(`Setup multi-pane environment for ${agentCount} agents in session ${sessionName}`);
    } catch (error) {
      throw new Error(`Failed to setup multi-pane environment: ${error}`);
    }
  }

  /**
   * ペイン情報取得
   */
  async getPaneInfo(sessionId: string): Promise<TmuxPane[]> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const sessionName = session.name;
      const { stdout } = await execAsync(
        `tmux list-panes -t ${sessionName} -F '#{pane_id}:#{pane_current_command}'`
      );

      return stdout
        .trim()
        .split('\n')
        .map(line => {
          const [id, command] = line.split(':');
          return {
            id: id.replace('%', ''),
            command: command || undefined,
          };
        });
    } catch (error) {
      throw new Error(`Failed to get pane info: ${error}`);
    }
  }

  /**
   * エージェントをペインに配置
   */
  async assignAgentToPane(
    sessionId: string,
    agentId: string,
    paneId: string
  ): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const sessionName = session.name;
      
      // ペインタイトル設定
      await execAsync(
        `tmux select-pane -t ${sessionName}:%${paneId} -T "${agentId}"`
      );

      // 作業ディレクトリ設定
      const agentPath = `./src/agents/${agentId}`;
      await execAsync(
        `tmux send-keys -t ${sessionName}:%${paneId} 'cd ${agentPath}' C-m`
      );

      console.log(`Assigned agent ${agentId} to pane %${paneId} in session ${sessionName}`);
    } catch (error) {
      throw new Error(`Failed to assign agent to pane: ${error}`);
    }
  }

  /**
   * セッション監視機能
   */
  async monitorSession(sessionId: string): Promise<{
    sessionInfo: any;
    paneStates: any[];
  }> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      const sessionName = session.name;

      // セッション情報取得
      const { stdout: sessionInfo } = await execAsync(
        `tmux display-message -t ${sessionName} -p '#{session_name}:#{session_windows}:#{session_created}'`
      );

      // 各ペインの状態取得
      const { stdout: paneInfo } = await execAsync(
        `tmux list-panes -t ${sessionName} -F '#{pane_id}:#{pane_title}:#{pane_current_command}:#{pane_active}'`
      );

      const paneStates = paneInfo
        .trim()
        .split('\n')
        .map(line => {
          const [id, title, command, active] = line.split(':');
          return {
            paneId: id,
            title,
            command,
            isActive: active === '1',
          };
        });

      return {
        sessionInfo: {
          name: sessionName,
          info: sessionInfo.trim(),
        },
        paneStates,
      };
    } catch (error) {
      throw new Error(`Failed to monitor session: ${error}`);
    }
  }

  /**
   * アクティブセッション一覧取得
   */
  async getActiveSessions(): Promise<TmuxSession[]> {
    try {
      // システム内の全tmuxセッション取得
      const { stdout } = await execAsync('tmux list-sessions -F "#{session_name}:#{session_created}"');
      
      const systemSessions = stdout
        .trim()
        .split('\n')
        .filter(line => line.includes('ai-agents-miyabi'))
        .map(line => {
          const [name, created] = line.split(':');
          return { name, created };
        });

      // アクティブセッションと照合
      return Array.from(this.activeSessions.values()).filter(session =>
        systemSessions.some(s => s.name === session.name)
      );
    } catch (error) {
      // tmuxが動作していない場合
      return Array.from(this.activeSessions.values());
    }
  }

  /**
   * セッションクリーンアップ
   */
  async cleanupSessions(): Promise<{
    cleanedSessions: string[];
    errors: string[];
  }> {
    const cleanedSessions: string[] = [];
    const errors: string[] = [];

    for (const [sessionId, session] of this.activeSessions.entries()) {
      try {
        // セッション終了
        await execAsync(`tmux kill-session -t ${session.name}`);
        cleanedSessions.push(session.name);
        this.activeSessions.delete(sessionId);
        
        console.log(`Cleaned up session: ${session.name}`);
      } catch (error) {
        const errorMsg = `Failed to cleanup session ${session.name}: ${error}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    return { cleanedSessions, errors };
  }

  /**
   * 特定セッション終了
   */
  async terminateSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      await execAsync(`tmux kill-session -t ${session.name}`);
      this.activeSessions.delete(sessionId);
      console.log(`Terminated session: ${session.name}`);
    } catch (error) {
      throw new Error(`Failed to terminate session: ${error}`);
    }
  }

  /**
   * セッション統計情報
   */
  getSessionStats() {
    return {
      activeSessions: this.activeSessions.size,
      sessions: Array.from(this.activeSessions.values()).map(session => ({
        id: session.id,
        name: session.name,
        createdAt: session.createdAt,
        windowCount: session.windows.length,
      })),
    };
  }
}