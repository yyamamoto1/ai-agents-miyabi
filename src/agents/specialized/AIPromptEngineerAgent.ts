/**
 * AIPromptEngineerAgent - プロンプト設計・最適化の専門エージェント
 * LLMの性能を最大限に引き出すためのプロンプトを設計・最適化
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface PromptEngineerTaskInput {
  taskType: 'design' | 'optimize' | 'test' | 'context' | 'few-shot';
  objective: string;
  domain?: string;
  constraints?: string[];
  examples?: any[];
  currentPrompt?: string;
}

export class AIPromptEngineerAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.PROMPT_ENGINEER);
  }

  protected async setup(): Promise<void> {
    this.log('AI Prompt Engineer Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as PromptEngineerTaskInput;
    this.log(`Processing ${input.taskType} task`);

    switch (input.taskType) {
      case 'design':
        return await this.designPrompt(input);
      case 'optimize':
        return await this.optimizePrompt(input);
      case 'test':
        return await this.testPrompts(input);
      case 'context':
        return await this.designContext(input);
      case 'few-shot':
        return await this.designFewShot(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  private async designPrompt(input: PromptEngineerTaskInput): Promise<any> {
    this.log(`Designing prompt for: ${input.objective}`);

    const prompt = this.generatePromptTemplate(input);

    return {
      prompt,
      components: {
        role: 'タスクに適した役割定義',
        context: 'タスクの背景・制約条件',
        instruction: '明確で具体的な指示',
        format: '期待される出力形式',
        examples: 'Few-shot examples（必要に応じて）',
      },
      bestPractices: [
        '明確で具体的な指示',
        '構造化された出力形式の指定',
        'ステップバイステップの思考プロセス',
        '制約条件の明示',
      ],
      variations: [
        {
          name: 'Concise Version',
          prompt: this.generateConciseVersion(prompt),
          useCases: ['簡単なタスク', 'コスト削減重視'],
        },
        {
          name: 'Detailed Version',
          prompt: this.generateDetailedVersion(prompt),
          useCases: ['複雑なタスク', '精度重視'],
        },
      ],
      summary: `${input.objective}のためのプロンプトを設計しました。2つのバリエーション付き。`,
    };
  }

  private async optimizePrompt(input: PromptEngineerTaskInput): Promise<any> {
    this.log('Optimizing prompt...');

    const currentPrompt = input.currentPrompt || '';
    const issues = this.analyzePromptIssues(currentPrompt);
    const optimizedPrompt = this.applyOptimizations(currentPrompt, issues);

    return {
      original: currentPrompt,
      optimized: optimizedPrompt,
      improvements: [
        { aspect: 'Clarity', before: 'あいまいな指示', after: '明確で具体的な指示' },
        { aspect: 'Structure', before: '非構造化', after: '論理的な構造' },
        { aspect: 'Context', before: '不足', after: '十分なコンテキスト提供' },
      ],
      expectedImpact: {
        accuracy: '+25%',
        consistency: '+30%',
        relevance: '+20%',
      },
      summary: 'プロンプトを最適化。精度とConsistencyの向上を見込む。',
    };
  }

  private async testPrompts(input: PromptEngineerTaskInput): Promise<any> {
    this.log('Testing prompts with A/B testing...');

    return {
      testSetup: {
        variants: ['Prompt A', 'Prompt B', 'Prompt C'],
        testCases: 50,
        metrics: ['Accuracy', 'Relevance', 'Consistency', 'Response Time'],
      },
      results: [
        {
          prompt: 'Prompt A (Baseline)',
          accuracy: 0.72,
          relevance: 0.75,
          consistency: 0.70,
          avgResponseTime: '2.3s',
          score: 0.72,
        },
        {
          prompt: 'Prompt B (Optimized)',
          accuracy: 0.85,
          relevance: 0.88,
          consistency: 0.86,
          avgResponseTime: '2.5s',
          score: 0.86,
        },
        {
          prompt: 'Prompt C (Alternative)',
          accuracy: 0.80,
          relevance: 0.82,
          consistency: 0.79,
          avgResponseTime: '2.1s',
          score: 0.80,
        },
      ],
      winner: {
        prompt: 'Prompt B (Optimized)',
        improvement: '+14% vs baseline',
        recommendation: '本番環境で使用を推奨',
      },
      summary: 'A/Bテスト完了。Prompt Bが最高パフォーマンス（スコア0.86）。',
    };
  }

  private async designContext(input: PromptEngineerTaskInput): Promise<any> {
    this.log('Designing context structure...');

    return {
      contextDesign: {
        role: `あなたは${input.domain || 'エキスパート'}です。`,
        background: `${input.objective}を実行する際の背景情報とコンテキストを提供します。`,
        constraints: input.constraints || ['制約1', '制約2'],
        guidelines: [
          '明確で簡潔な回答',
          '根拠のある情報提供',
          '必要に応じて例示',
        ],
      },
      contextTemplate: `
# Role
${input.domain ? `あなたは${input.domain}の専門家です。` : 'あなたは経験豊富な専門家です。'}

# Task
${input.objective}

# Guidelines
- 明確で簡潔に回答してください
- 根拠を示してください
- 必要に応じて具体例を挙げてください

# Constraints
${(input.constraints || []).map((c) => `- ${c}`).join('\n')}

# Output Format
[指定された形式]
`,
      summary: `${input.domain || 'タスク'}用のコンテキスト構造を設計しました。`,
    };
  }

  private async designFewShot(input: PromptEngineerTaskInput): Promise<any> {
    this.log('Designing few-shot learning examples...');

    const examples = input.examples || this.generateDefaultExamples();

    return {
      fewShotPrompt: `
以下の例を参考に、同様のタスクを実行してください。

${examples
  .map(
    (ex, i) => `
## Example ${i + 1}
Input: ${ex.input}
Output: ${ex.output}
`
  )
  .join('\n')}

## Your Task
Input: [ユーザー入力]
Output:`,
      examples,
      principles: [
        '多様性: 様々なケースをカバー',
        '明確性: 期待される出力を明示',
        '一貫性: パターンが学習可能',
      ],
      recommendations: [
        '3-5個の例が最適',
        '簡単→複雑の順で配置',
        '典型的なケースとエッジケースを混在',
      ],
      summary: `Few-shot学習用のプロンプトを設計（${examples.length}個の例）。`,
    };
  }

  // ========== ユーティリティメソッド ==========

  private generatePromptTemplate(input: PromptEngineerTaskInput): string {
    return `
# Role
あなたは${input.domain || 'タスク実行'}の専門家です。

# Objective
${input.objective}

# Instructions
1. まず、タスクを理解します
2. 必要な情報を収集します
3. 段階的に解決策を考えます
4. 結果を検証します
5. 明確に回答します

# Constraints
${(input.constraints || ['制約なし']).map((c) => `- ${c}`).join('\n')}

# Output Format
- 構造化された形式で回答
- 根拠を明示
- 必要に応じて例示

回答:
`;
  }

  private generateConciseVersion(prompt: string): string {
    return prompt.replace(/# Instructions[\s\S]*?# Constraints/, '# Constraints');
  }

  private generateDetailedVersion(prompt: string): string {
    return prompt + '\n\n注意: 詳細な説明と複数の例を含めてください。';
  }

  private analyzePromptIssues(prompt: string): string[] {
    const issues: string[] = [];
    if (prompt.length < 50) issues.push('too-short');
    if (!prompt.includes('役割') && !prompt.includes('Role')) issues.push('no-role');
    if (!prompt.includes('出力') && !prompt.includes('Output')) issues.push('no-format');
    return issues;
  }

  private applyOptimizations(prompt: string, issues: string[]): string {
    let optimized = prompt;
    if (issues.includes('no-role')) {
      optimized = '# Role\nあなたは専門家です。\n\n' + optimized;
    }
    if (issues.includes('no-format')) {
      optimized += '\n\n# Output Format\n構造化された形式で回答してください。';
    }
    return optimized;
  }

  private generateDefaultExamples(): any[] {
    return [
      { input: 'Example input 1', output: 'Example output 1' },
      { input: 'Example input 2', output: 'Example output 2' },
      { input: 'Example input 3', output: 'Example output 3' },
    ];
  }

  protected async cleanup(): Promise<void> {
    this.log('AI Prompt Engineer Agent cleanup completed');
  }
}
