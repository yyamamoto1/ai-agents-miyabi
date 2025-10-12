/**
 * BaseAgent - 全てのAIエージェントの基底クラス
 * 共通の機能とインターフェースを提供
 */

export interface AgentConfig {
  name: string;
  role: string;
  category: string;
  description: string;
  capabilities: string[];
  dependencies?: string[];
  apiEndpoint?: string;
  maxRetries?: number;
  timeout?: number;
}

export interface AgentTask {
  id: string;
  type: string;
  input: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline?: Date;
  context?: Record<string, any>;
}

export interface AgentResponse {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    executionTime: number;
    retries: number;
    timestamp: Date;
  };
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  protected isInitialized: boolean = false;
  protected taskQueue: AgentTask[] = [];

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * エージェントの初期化
   */
  async initialize(): Promise<void> {
    console.log(`Initializing ${this.config.name}...`);
    await this.setup();
    this.isInitialized = true;
    console.log(`${this.config.name} initialized successfully`);
  }

  /**
   * エージェント固有の初期化処理（サブクラスで実装）
   */
  protected abstract setup(): Promise<void>;

  /**
   * タスクの実行
   */
  async execute(task: AgentTask): Promise<AgentResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const startTime = Date.now();
    let retries = 0;
    const maxRetries = this.config.maxRetries || 3;

    while (retries < maxRetries) {
      try {
        console.log(`${this.config.name} executing task: ${task.id}`);
        const result = await this.process(task);

        return {
          success: true,
          data: result,
          metadata: {
            executionTime: Date.now() - startTime,
            retries,
            timestamp: new Date(),
          },
        };
      } catch (error) {
        retries++;
        console.error(
          `${this.config.name} task ${task.id} failed (attempt ${retries}/${maxRetries}):`,
          error
        );

        if (retries >= maxRetries) {
          return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
            metadata: {
              executionTime: Date.now() - startTime,
              retries,
              timestamp: new Date(),
            },
          };
        }

        // リトライ前に待機
        await this.delay(Math.pow(2, retries) * 1000);
      }
    }

    throw new Error('Unexpected execution path');
  }

  /**
   * タスクの処理（サブクラスで実装）
   */
  protected abstract process(task: AgentTask): Promise<any>;

  /**
   * タスクをキューに追加
   */
  addTask(task: AgentTask): void {
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * キュー内のタスクを順次実行
   */
  async processQueue(): Promise<AgentResponse[]> {
    const results: AgentResponse[] = [];

    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        const result = await this.execute(task);
        results.push(result);
      }
    }

    return results;
  }

  /**
   * エージェントの状態を取得
   */
  getStatus() {
    return {
      name: this.config.name,
      role: this.config.role,
      category: this.config.category,
      initialized: this.isInitialized,
      queueLength: this.taskQueue.length,
      capabilities: this.config.capabilities,
    };
  }

  /**
   * エージェントのシャットダウン
   */
  async shutdown(): Promise<void> {
    console.log(`Shutting down ${this.config.name}...`);
    await this.cleanup();
    this.isInitialized = false;
  }

  /**
   * クリーンアップ処理（サブクラスで実装）
   */
  protected abstract cleanup(): Promise<void>;

  /**
   * 遅延処理のユーティリティ
   */
  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * ログ出力のユーティリティ
   */
  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${this.config.name}] ${message}`);
  }
}
