#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { AgentOrchestrator } from './agent-orchestrator.js';
import { TmuxManager } from './tmux-manager.js';
import { TaskMapper } from './task-mapper.js';
import { Logger } from './logger.js';
import { readFile } from 'fs/promises';
import { parse as parseYaml } from 'yaml';

/**
 * ai-agents-miyabi MCP Server
 * 54種類のエージェントを活用したマルチエージェント実行環境
 */
class AiAgentsMiyabiMCPServer {
  private server: Server;
  private orchestrator: AgentOrchestrator;
  private tmuxManager: TmuxManager;
  private taskMapper: TaskMapper;
  private logger: Logger;

  constructor() {
    this.server = new Server(
      {
        name: 'ai-agents-miyabi-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.orchestrator = new AgentOrchestrator();
    this.tmuxManager = new TmuxManager();
    this.taskMapper = new TaskMapper();
    this.logger = new Logger();

    this.setupHandlers();
  }

  private setupHandlers() {
    // ツール一覧
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'execute_agent_task',
            description: 'Execute task using ai-agents-miyabi multi-agent system',
            inputSchema: {
              type: 'object',
              properties: {
                task: {
                  type: 'string',
                  description: 'Task description to be executed by agent team',
                },
                priority: {
                  type: 'string',
                  enum: ['low', 'medium', 'high', 'critical'],
                  description: 'Task priority level',
                  default: 'medium',
                },
                agents: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific agents to use (optional - auto-selected if not provided)',
                },
                timeout: {
                  type: 'number',
                  description: 'Task timeout in seconds',
                  default: 300,
                },
              },
              required: ['task'],
            },
          },
          {
            name: 'list_available_agents',
            description: 'List all 54 available agents in the catalog',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Filter by agent category (optional)',
                },
              },
            },
          },
          {
            name: 'get_agent_status',
            description: 'Get current status of running agents',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'terminate_agents',
            description: 'Terminate all running agents and cleanup tmux sessions',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'execute_task_from_file',
            description: 'Execute task loaded from file',
            inputSchema: {
              type: 'object',
              properties: {
                filePath: {
                  type: 'string',
                  description: 'Path to task definition file',
                },
                format: {
                  type: 'string',
                  enum: ['json', 'yaml', 'txt', 'md'],
                  description: 'File format',
                  default: 'json',
                },
              },
              required: ['filePath'],
            },
          },
          {
            name: 'get_task_history',
            description: 'Get history of executed tasks',
            inputSchema: {
              type: 'object',
              properties: {
                limit: {
                  type: 'number',
                  description: 'Number of recent tasks to retrieve',
                  default: 10,
                },
              },
            },
          },
          {
            name: 'get_logs',
            description: 'Get system logs',
            inputSchema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['main', 'errors', 'session'],
                  description: 'Type of logs to retrieve',
                  default: 'main',
                },
                sessionId: {
                  type: 'string',
                  description: 'Session ID for session logs',
                },
                tail: {
                  type: 'number',
                  description: 'Number of recent log lines to show',
                  default: 50,
                },
              },
            },
          },
        ],
      };
    });

    // ツール実行
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'execute_agent_task':
            return await this.executeAgentTask(args);

          case 'list_available_agents':
            return await this.listAvailableAgents(args);

          case 'get_agent_status':
            return await this.getAgentStatus();

          case 'terminate_agents':
            return await this.terminateAgents();

          case 'execute_task_from_file':
            return await this.executeTaskFromFile(args);

          case 'get_task_history':
            return await this.getTaskHistory(args);

          case 'get_logs':
            return await this.getLogs(args);

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${message}`);
      }
    });
  }

  /**
   * エージェントタスク実行
   */
  private async executeAgentTask(args: any) {
    const { task, priority = 'medium', agents, timeout = 300 } = args;
    const taskId = `task-${Date.now()}`;

    try {
      await this.logger.log('info', 'MCPServer', 'Starting task execution', { taskId, task: task.substring(0, 100) });

      // 1. タスク解析とエージェント選択
      const selectedAgents = agents || await this.taskMapper.mapTaskToAgents(task);
      
      // 2. TMUX環境構築
      const sessionId = await this.tmuxManager.createAgentSession(selectedAgents);
      
      // 3. タスク開始ログ
      const taskOutput = await this.logger.logTaskStart(taskId, sessionId, task, selectedAgents);
      
      // 4. エージェントチーム起動
      const agentTeam = await this.orchestrator.launchAgentTeam(
        sessionId,
        selectedAgents,
        { priority, timeout }
      );

      // 5. タスク実行
      const result = await this.orchestrator.executeTask(agentTeam, task);

      // 6. タスク完了ログ
      await this.logger.logTaskComplete(
        taskOutput,
        result.result?.agentResults || [],
        result.executionTime,
        result.errors
      );

      await this.logger.log('info', 'MCPServer', 'Task execution completed', { 
        taskId, 
        success: result.success,
        executionTime: result.executionTime 
      }, sessionId);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              taskId,
              sessionId,
              agents: selectedAgents,
              result,
              executionTime: result.executionTime,
              timestamp: new Date().toISOString(),
              outputLocations: {
                taskFile: `outputs/tasks/${taskId}.json`,
                resultsFile: `outputs/tasks/${taskId}-results.json`,
                sessionFile: `outputs/sessions/${sessionId}.json`,
                logs: `logs/session-${sessionId}.log`,
              },
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      await this.logger.logError('MCPServer', error instanceof Error ? error : String(error), undefined, undefined);
      throw error;
    }
  }

  /**
   * 利用可能エージェント一覧
   */
  private async listAvailableAgents(args: any) {
    const { category } = args;
    const agents = await this.orchestrator.getAvailableAgents(category);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            totalAgents: agents.length,
            category: category || 'all',
            agents: agents.map(agent => ({
              name: agent.name,
              category: agent.category,
              description: agent.description,
              capabilities: agent.capabilities,
            })),
          }, null, 2),
        },
      ],
    };
  }

  /**
   * エージェント状態確認
   */
  private async getAgentStatus() {
    const status = await this.orchestrator.getAgentStatus();
    const tmuxSessions = await this.tmuxManager.getActiveSessions();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            activeAgents: status.activeAgents,
            activeSessions: tmuxSessions,
            systemLoad: status.systemLoad,
            uptime: status.uptime,
            timestamp: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  }

  /**
   * エージェント終了・クリーンアップ
   */
  private async terminateAgents() {
    const terminatedAgents = await this.orchestrator.terminateAllAgents();
    const cleanupResult = await this.tmuxManager.cleanupSessions();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            terminatedAgents,
            cleanupResult,
            message: 'All agents terminated and sessions cleaned up',
            timestamp: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  }

  /**
   * ファイルからタスク実行
   */
  private async executeTaskFromFile(args: any) {
    const { filePath, format = 'json' } = args;

    try {
      // ファイル読み込み
      const fileContent = await readFile(filePath, 'utf-8');
      let taskData: any;

      // フォーマット別解析
      switch (format) {
        case 'json':
          taskData = JSON.parse(fileContent);
          break;
        case 'yaml':
          taskData = parseYaml(fileContent);
          break;
        case 'txt':
        case 'md':
          taskData = { task: fileContent };
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      // タスク実行
      const result = await this.executeAgentTask(taskData);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              source: filePath,
              format,
              taskData,
              result: JSON.parse(result.content[0].text),
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new McpError(ErrorCode.InternalError, `Failed to load task from file: ${message}`);
    }
  }

  /**
   * タスク履歴取得
   */
  private async getTaskHistory(args: any) {
    const { limit = 10 } = args;

    try {
      const history = await this.logger.getTaskHistory(limit);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              totalTasks: history.length,
              tasks: history,
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      await this.logger.logError('MCPServer', error instanceof Error ? error : String(error));
      throw new McpError(ErrorCode.InternalError, `Failed to get task history: ${error}`);
    }
  }

  /**
   * ログ取得
   */
  private async getLogs(args: any) {
    const { type = 'main', sessionId, tail = 50 } = args;

    try {
      const { readFile } = await import('fs/promises');
      let logContent = '';
      let logPath = '';

      const logFiles = await this.logger.getLogFiles();

      switch (type) {
        case 'main':
          logPath = logFiles.main;
          break;
        case 'errors':
          logPath = logFiles.errors;
          break;
        case 'session':
          if (!sessionId) {
            throw new Error('sessionId is required for session logs');
          }
          logPath = logFiles.sessions.find(f => f.includes(sessionId)) || '';
          if (!logPath) {
            throw new Error(`No logs found for session: ${sessionId}`);
          }
          break;
      }

      if (logPath) {
        const fullContent = await readFile(logPath, 'utf-8');
        const lines = fullContent.split('\n');
        logContent = lines.slice(-tail).join('\n');
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              logType: type,
              sessionId: sessionId || null,
              logPath,
              lines: tail,
              content: logContent,
              timestamp: new Date().toISOString(),
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      await this.logger.logError('MCPServer', error instanceof Error ? error : String(error));
      throw new McpError(ErrorCode.InternalError, `Failed to get logs: ${error}`);
    }
  }

  /**
   * サーバー起動
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ai-agents-miyabi MCP Server running on stdio');
  }
}

// サーバー起動
const server = new AiAgentsMiyabiMCPServer();
server.run().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});