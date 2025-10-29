import { writeFile, appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  component: string;
  message: string;
  data?: any;
  sessionId?: string;
  agentId?: string;
}

export interface TaskOutput {
  taskId: string;
  sessionId: string;
  task: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed' | 'timeout';
  agents: string[];
  results: any[];
  errors?: string[];
  metrics?: {
    executionTime: number;
    agentCount: number;
    tmuxPanes: number;
  };
}

/**
 * ログ・出力管理システム
 * タスク処理結果とログを永続化
 */
export class Logger {
  private logsDir: string;
  private outputsDir: string;
  private dataDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.logsDir = path.join(baseDir, 'logs');
    this.outputsDir = path.join(baseDir, 'outputs');
    this.dataDir = path.join(baseDir, 'data');
    
    this.ensureDirectories();
  }

  /**
   * 必要ディレクトリの確保
   */
  private async ensureDirectories() {
    const dirs = [
      this.logsDir,
      path.join(this.outputsDir, 'tasks'),
      path.join(this.outputsDir, 'agents'),
      path.join(this.outputsDir, 'sessions'),
      this.dataDir,
    ];

    for (const dir of dirs) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }
  }

  /**
   * ログエントリ記録
   */
  async log(level: LogEntry['level'], component: string, message: string, data?: any, sessionId?: string, agentId?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      data,
      sessionId,
      agentId,
    };

    // メインログファイルに追記
    const logLine = this.formatLogEntry(entry);
    const logFile = path.join(this.logsDir, 'mcp-server.log');
    await appendFile(logFile, logLine + '\n');

    // レベル別ログファイルにも記録
    if (level === 'error') {
      const errorFile = path.join(this.logsDir, 'errors.log');
      await appendFile(errorFile, logLine + '\n');
    }

    // セッション別ログ
    if (sessionId) {
      const sessionFile = path.join(this.logsDir, `session-${sessionId}.log`);
      await appendFile(sessionFile, logLine + '\n');
    }

    // コンソール出力
    this.consoleLog(entry);
  }

  /**
   * ログエントリフォーマット
   */
  private formatLogEntry(entry: LogEntry): string {
    let formatted = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.component}]`;
    
    if (entry.sessionId) {
      formatted += ` [Session:${entry.sessionId}]`;
    }
    
    if (entry.agentId) {
      formatted += ` [Agent:${entry.agentId}]`;
    }
    
    formatted += ` ${entry.message}`;
    
    if (entry.data) {
      formatted += ` | Data: ${JSON.stringify(entry.data)}`;
    }
    
    return formatted;
  }

  /**
   * コンソールログ
   */
  private consoleLog(entry: LogEntry) {
    const colors = {
      info: '\x1b[36m',    // cyan
      warn: '\x1b[33m',    // yellow  
      error: '\x1b[31m',   // red
      debug: '\x1b[90m',   // gray
    };
    
    const reset = '\x1b[0m';
    const color = colors[entry.level] || '';
    
    console.log(`${color}${this.formatLogEntry(entry)}${reset}`);
  }

  /**
   * タスク開始ログ
   */
  async logTaskStart(taskId: string, sessionId: string, task: string, agents: string[]): Promise<TaskOutput> {
    const taskOutput: TaskOutput = {
      taskId,
      sessionId,
      task,
      startTime: new Date().toISOString(),
      status: 'running',
      agents,
      results: [],
    };

    await this.log('info', 'TaskManager', `Task started: ${taskId}`, {
      task: task.substring(0, 100) + '...',
      agents,
    }, sessionId);

    // タスク状態ファイル作成
    const taskFile = path.join(this.outputsDir, 'tasks', `${taskId}.json`);
    await writeFile(taskFile, JSON.stringify(taskOutput, null, 2));

    return taskOutput;
  }

  /**
   * タスク完了ログ
   */
  async logTaskComplete(
    taskOutput: TaskOutput,
    results: any[],
    executionTime: number,
    errors?: string[]
  ) {
    taskOutput.endTime = new Date().toISOString();
    taskOutput.status = errors && errors.length > 0 ? 'failed' : 'completed';
    taskOutput.results = results;
    taskOutput.errors = errors;
    taskOutput.metrics = {
      executionTime,
      agentCount: taskOutput.agents.length,
      tmuxPanes: taskOutput.agents.length,
    };

    await this.log('info', 'TaskManager', `Task ${taskOutput.status}: ${taskOutput.taskId}`, {
      executionTime,
      agentCount: taskOutput.agents.length,
      resultCount: results.length,
      hasErrors: !!errors?.length,
    }, taskOutput.sessionId);

    // タスク結果ファイル更新
    const taskFile = path.join(this.outputsDir, 'tasks', `${taskOutput.taskId}.json`);
    await writeFile(taskFile, JSON.stringify(taskOutput, null, 2));

    // 実行結果の詳細保存
    if (results.length > 0) {
      const resultsFile = path.join(this.outputsDir, 'tasks', `${taskOutput.taskId}-results.json`);
      await writeFile(resultsFile, JSON.stringify({
        taskId: taskOutput.taskId,
        timestamp: taskOutput.endTime,
        results,
        summary: this.generateResultSummary(results),
      }, null, 2));
    }
  }

  /**
   * エージェント実行ログ
   */
  async logAgentExecution(
    sessionId: string,
    agentId: string,
    command: string,
    output: string,
    success: boolean
  ) {
    await this.log('info', 'AgentExecution', `Agent ${agentId} executed command`, {
      command: command.substring(0, 100) + '...',
      outputLength: output.length,
      success,
    }, sessionId, agentId);

    // エージェント出力ファイル
    const agentDir = path.join(this.outputsDir, 'agents', sessionId);
    if (!existsSync(agentDir)) {
      await mkdir(agentDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(agentDir, `${agentId}-${timestamp}.txt`);
    
    const outputContent = [
      `=== Agent Execution Log ===`,
      `Agent: ${agentId}`,
      `Session: ${sessionId}`,
      `Timestamp: ${new Date().toISOString()}`,
      `Command: ${command}`,
      `Success: ${success}`,
      ``,
      `=== Output ===`,
      output,
      ``,
      `=== End of Output ===`,
    ].join('\n');

    await writeFile(outputFile, outputContent);
  }

  /**
   * セッション情報保存
   */
  async logSessionInfo(sessionId: string, sessionData: any) {
    await this.log('info', 'SessionManager', `Session info updated: ${sessionId}`, {
      agentCount: sessionData.agents?.length || 0,
      status: sessionData.status,
    }, sessionId);

    const sessionFile = path.join(this.outputsDir, 'sessions', `${sessionId}.json`);
    await writeFile(sessionFile, JSON.stringify({
      sessionId,
      timestamp: new Date().toISOString(),
      ...sessionData,
    }, null, 2));
  }

  /**
   * エラーログ
   */
  async logError(component: string, error: Error | string, sessionId?: string, agentId?: string) {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : { message: error };

    await this.log('error', component, `Error occurred: ${errorData.message}`, errorData, sessionId, agentId);
  }

  /**
   * 結果サマリー生成
   */
  private generateResultSummary(results: any[]): any {
    return {
      totalResults: results.length,
      successfulAgents: results.filter(r => r.success !== false).length,
      failedAgents: results.filter(r => r.success === false).length,
      totalOutputLength: results.reduce((sum, r) => sum + (r.output?.length || 0), 0),
      agents: results.map(r => ({
        agentId: r.agentId,
        agentName: r.agentName,
        success: r.success !== false,
        outputLength: r.output?.length || 0,
      })),
    };
  }

  /**
   * ログファイル一覧取得
   */
  async getLogFiles(): Promise<{
    main: string;
    errors: string;
    sessions: string[];
  }> {
    const mainLog = path.join(this.logsDir, 'mcp-server.log');
    const errorLog = path.join(this.logsDir, 'errors.log');
    
    // セッションログファイル検索
    const { readdir } = await import('fs/promises');
    const logFiles = await readdir(this.logsDir);
    const sessionLogs = logFiles.filter(f => f.startsWith('session-') && f.endsWith('.log'));

    return {
      main: mainLog,
      errors: errorLog,
      sessions: sessionLogs.map(f => path.join(this.logsDir, f)),
    };
  }

  /**
   * タスク履歴取得
   */
  async getTaskHistory(limit: number = 10): Promise<TaskOutput[]> {
    try {
      const { readdir } = await import('fs/promises');
      const taskFiles = await readdir(path.join(this.outputsDir, 'tasks'));
      
      const taskOutputs = taskFiles
        .filter(f => f.endsWith('.json') && !f.includes('-results'))
        .slice(-limit);

      const results: TaskOutput[] = [];
      for (const file of taskOutputs) {
        const filePath = path.join(this.outputsDir, 'tasks', file);
        const content = await import('fs/promises').then(fs => fs.readFile(filePath, 'utf-8'));
        results.push(JSON.parse(content));
      }

      return results.sort((a, b) => 
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    } catch {
      return [];
    }
  }

  /**
   * ログクリーンアップ
   */
  async cleanup(olderThanDays: number = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    await this.log('info', 'Logger', `Starting cleanup of logs older than ${olderThanDays} days`);
    
    // 実装は省略（ファイル日付チェックして古いファイル削除）
    // 実際の実装では readdir + stat でファイル日付チェック
  }
}