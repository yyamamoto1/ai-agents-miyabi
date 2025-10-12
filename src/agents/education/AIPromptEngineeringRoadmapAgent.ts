import { BaseAgent, AgentTask, AgentConfig } from '../../core/BaseAgent.js';

/**
 * AIPromptEngineeringRoadmapAgent
 * プロンプトエンジニアリング学習のロードマップと実践的なスキル習得を支援
 */

export interface PromptEngineeringTaskInput {
  taskType: 'curriculum' | 'skill-assessment' | 'technique-guide' | 'project-suggestion' | 'roadmap' | 'practice' | 'advanced-topics';
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  specificTopic?: string;
  currentSkills?: string[];
  learningGoal?: string;
  targetRole?: 'generalist' | 'developer' | 'researcher' | 'business-analyst';
}

export interface PromptEngineeringTaskOutput {
  success: boolean;
  data: {
    content?: any;
    curriculum?: LearningCurriculum;
    assessment?: SkillAssessment;
    techniques?: TechniqueGuide[];
    projects?: ProjectSuggestion[];
    roadmap?: LearningRoadmap;
    exercises?: PracticeExercise[];
    resources?: LearningResource[];
  };
  metadata: {
    taskType: string;
    level: string;
    generatedAt: string;
  };
}

interface LearningCurriculum {
  title: string;
  description: string;
  targetLevel: string;
  estimatedDuration: string;
  modules: CurriculumModule[];
  prerequisites: string[];
  outcomes: string[];
}

interface CurriculumModule {
  moduleName: string;
  duration: string;
  topics: Topic[];
  practicalExercises: string[];
  assessmentCriteria: string[];
}

interface Topic {
  name: string;
  description: string;
  keyPoints: string[];
  examples?: string[];
}

interface SkillAssessment {
  assessedLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  strengths: string[];
  areasForImprovement: string[];
  recommendedPath: string[];
  nextSteps: string[];
  estimatedTimeToNextLevel: string;
}

interface TechniqueGuide {
  techniqueName: string;
  category: string;
  difficulty: string;
  description: string;
  whenToUse: string[];
  basicExample: PromptExample;
  advancedExample?: PromptExample;
  commonMistakes: string[];
  bestPractices: string[];
  relatedTechniques: string[];
}

interface PromptExample {
  scenario: string;
  prompt: string;
  explanation: string;
  expectedOutput?: string;
  variations?: string[];
}

interface ProjectSuggestion {
  projectName: string;
  difficulty: string;
  estimatedTime: string;
  description: string;
  objectives: string[];
  skillsRequired: string[];
  skillsToLearn: string[];
  steps: ProjectStep[];
  evaluationCriteria: string[];
  extensionIdeas: string[];
}

interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
  deliverable: string;
  resources?: string[];
}

interface LearningRoadmap {
  title: string;
  targetRole: string;
  totalDuration: string;
  phases: RoadmapPhase[];
  milestones: Milestone[];
  careerPaths: string[];
}

interface RoadmapPhase {
  phase: number;
  name: string;
  duration: string;
  focus: string;
  topics: string[];
  projects: string[];
  skills: string[];
  completionCriteria: string[];
}

interface Milestone {
  name: string;
  description: string;
  skills: string[];
  deliverables: string[];
}

interface PracticeExercise {
  exerciseId: string;
  title: string;
  difficulty: string;
  category: string;
  objective: string;
  scenario: string;
  task: string;
  hints: string[];
  evaluationCriteria: string[];
  sampleSolution?: string;
  explanation?: string;
}

interface LearningResource {
  type: 'article' | 'course' | 'documentation' | 'tool' | 'community' | 'book';
  title: string;
  description: string;
  url?: string;
  level: string;
  topics: string[];
  estimatedTime?: string;
}

export class AIPromptEngineeringRoadmapAgent extends BaseAgent {
  private knowledgeBase: Map<string, any>;

  constructor() {
    const config: AgentConfig = {
      name: 'AI Prompt Engineering Roadmap Agent',
      role: 'プロンプトエンジニアリング学習支援の専門家',
      category: 'education',
      description: 'プロンプトエンジニアリングの学習ロードマップ作成、スキル評価、実践的な技術指導を提供',
      capabilities: [
        'プロンプトエンジニアリングカリキュラム作成',
        'スキルレベル評価',
        '最新技術トレンド提供',
        '実践的プロジェクト提案',
        'ロードマップ生成',
        '演習問題作成',
      ],
    };
    super(config);
    this.knowledgeBase = new Map();
  }

  protected async setup(): Promise<void> {
    this.log('AIPromptEngineeringRoadmapAgent初期化中...');
    await this.initializeKnowledgeBase();
    this.log('AIPromptEngineeringRoadmapAgent初期化完了');
  }

  protected async process(task: AgentTask): Promise<PromptEngineeringTaskOutput> {
    const input = task.input as PromptEngineeringTaskInput;

    this.log(`プロンプトエンジニアリングタスク処理開始: ${input.taskType}`);

    try {
      let result: any;

      switch (input.taskType) {
        case 'curriculum':
          result = await this.generateCurriculum(input);
          break;
        case 'skill-assessment':
          result = await this.assessSkills(input);
          break;
        case 'technique-guide':
          result = await this.provideTechniqueGuide(input);
          break;
        case 'project-suggestion':
          result = await this.suggestProjects(input);
          break;
        case 'roadmap':
          result = await this.generateRoadmap(input);
          break;
        case 'practice':
          result = await this.createPracticeExercises(input);
          break;
        case 'advanced-topics':
          result = await this.explainAdvancedTopics(input);
          break;
        default:
          throw new Error(`未対応のタスクタイプ: ${input.taskType}`);
      }

      return {
        success: true,
        data: result,
        metadata: {
          taskType: input.taskType,
          level: input.level || 'not-specified',
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      this.log('タスク処理エラー: ' + String(error), 'error');
      throw error;
    }
  }

  protected async cleanup(): Promise<void> {
    this.log('AIPromptEngineeringRoadmapAgentクリーンアップ');
    this.knowledgeBase.clear();
  }

  private async initializeKnowledgeBase(): Promise<void> {
    // プロンプトエンジニアリング技術の知識ベース初期化
    this.knowledgeBase.set('techniques', [
      'Zero-shot Prompting',
      'Few-shot Learning',
      'Chain-of-Thought (CoT)',
      'Tree of Thoughts',
      'Self-Consistency',
      'ReAct (Reasoning + Acting)',
      'Reflexion',
      'Role Prompting',
      'Instruction Tuning',
      'Prompt Chaining',
      'RAG (Retrieval-Augmented Generation)',
      'Constitutional AI',
    ]);

    this.knowledgeBase.set('frameworks', [
      'LangChain',
      'LlamaIndex',
      'Semantic Kernel',
      'Haystack',
      'AutoGPT',
      'BabyAGI',
    ]);

    this.knowledgeBase.set('tools', [
      'OpenAI Playground',
      'Claude',
      'Anthropic Workbench',
      'PromptBase',
      'PromptPerfect',
      'Weights & Biases',
    ]);
  }

  private async generateCurriculum(input: PromptEngineeringTaskInput): Promise<{ curriculum: LearningCurriculum }> {
    const level = input.level || 'beginner';

    const curriculums: Record<string, LearningCurriculum> = {
      beginner: {
        title: 'プロンプトエンジニアリング基礎コース',
        description: 'AI言語モデルとの効果的な対話方法を学び、基本的なプロンプト技術をマスターする',
        targetLevel: '初心者',
        estimatedDuration: '4週間（週10時間）',
        prerequisites: [
          '基本的なコンピュータリテラシー',
          'AI/機械学習に対する興味',
        ],
        modules: [
          {
            moduleName: 'Week 1: プロンプトエンジニアリング入門',
            duration: '10時間',
            topics: [
              {
                name: 'AIと言語モデルの基礎',
                description: 'GPT、Claude、LLaMAなどの言語モデルの仕組みと特性',
                keyPoints: [
                  'トークン化とコンテキストウィンドウ',
                  '確率的生成の理解',
                  'モデルの制約と限界',
                  '倫理的考慮事項',
                ],
              },
              {
                name: 'プロンプトの基本構造',
                description: '効果的なプロンプトの要素と構成方法',
                keyPoints: [
                  '明確な指示の書き方',
                  'コンテキストの提供',
                  '出力フォーマットの指定',
                  '制約条件の設定',
                ],
                examples: [
                  '悪い例: "記事を書いて"',
                  '良い例: "SEO最適化された1000文字のブログ記事を、ITプロフェッショナル向けに、フレンドリーなトーンで、markdown形式で作成してください。テーマ: クラウドコンピューティングの利点"',
                ],
              },
            ],
            practicalExercises: [
              'さまざまなトーンで自己紹介文を生成',
              '異なるフォーマットでデータを出力',
              'ステップバイステップの説明を作成',
            ],
            assessmentCriteria: [
              'プロンプトの明確性',
              '指示の具体性',
              '出力の制御度',
            ],
          },
          {
            moduleName: 'Week 2: 基本的なプロンプト技術',
            duration: '10時間',
            topics: [
              {
                name: 'Zero-shot Prompting',
                description: '例を示さずに直接タスクを実行させる技術',
                keyPoints: [
                  'タスクの明確な定義',
                  '期待される出力の説明',
                  '適切な文脈の提供',
                ],
              },
              {
                name: 'Few-shot Learning',
                description: '少数の例を示してパターンを学習させる技術',
                keyPoints: [
                  '効果的な例の選び方',
                  '例の数の最適化',
                  '例の多様性の重要性',
                ],
              },
              {
                name: 'Role Prompting',
                description: 'AIに特定の役割を与えて応答を制御',
                keyPoints: [
                  '役割の明確な定義',
                  '専門性の指定',
                  'ペルソナの設定',
                ],
              },
            ],
            practicalExercises: [
              'Few-shotで感情分析プロンプト作成',
              '専門家ペルソナで技術解説',
              'フォーマット変換タスク',
            ],
            assessmentCriteria: [
              '技術の適切な使用',
              '例の質と関連性',
              '出力の一貫性',
            ],
          },
          {
            moduleName: 'Week 3: プロンプトの最適化とデバッグ',
            duration: '10時間',
            topics: [
              {
                name: 'プロンプトのイテレーション',
                description: 'プロンプトを段階的に改善する方法',
                keyPoints: [
                  '出力の評価方法',
                  '問題点の特定',
                  '段階的な改善',
                  'A/Bテスト',
                ],
              },
              {
                name: 'よくあるエラーと対処法',
                description: 'プロンプトエンジニアリングでの典型的な問題',
                keyPoints: [
                  '曖昧な指示の回避',
                  'ハルシネーション（幻覚）への対処',
                  'バイアスの認識と軽減',
                  '出力の検証',
                ],
              },
            ],
            practicalExercises: [
              '既存プロンプトの改善',
              'エラー出力の分析と修正',
              'プロンプトのバージョン管理',
            ],
            assessmentCriteria: [
              '問題の診断能力',
              '改善の効果',
              '体系的なアプローチ',
            ],
          },
          {
            moduleName: 'Week 4: 実践プロジェクトとベストプラクティス',
            duration: '10時間',
            topics: [
              {
                name: 'プロンプトライブラリの構築',
                description: '再利用可能なプロンプトテンプレートの作成',
                keyPoints: [
                  'テンプレート設計',
                  '変数の使用',
                  'ドキュメント化',
                ],
              },
              {
                name: 'プロンプトエンジニアリングのベストプラクティス',
                description: '業界標準とガイドライン',
                keyPoints: [
                  '明確性と具体性',
                  '段階的な指示',
                  '検証と反復',
                  'バージョン管理',
                ],
              },
            ],
            practicalExercises: [
              'ミニプロジェクト: コンテンツ生成ツール',
              'プロンプトテンプレート集の作成',
              'ケーススタディの分析',
            ],
            assessmentCriteria: [
              'プロジェクトの完成度',
              'テンプレートの汎用性',
              'ドキュメントの質',
            ],
          },
        ],
        outcomes: [
          '基本的なプロンプト技術を理解し使用できる',
          '効果的なプロンプトを設計・最適化できる',
          'よくある問題を診断し解決できる',
          '再利用可能なプロンプトテンプレートを作成できる',
        ],
      },
      intermediate: {
        title: 'プロンプトエンジニアリング中級コース',
        description: '高度なプロンプト技術とAIエージェント開発の基礎を学ぶ',
        targetLevel: '中級者',
        estimatedDuration: '6週間（週12時間）',
        prerequisites: [
          'プロンプトエンジニアリングの基礎知識',
          'プログラミングの基本スキル（Python推奨）',
          'APIの基本的な理解',
        ],
        modules: [
          {
            moduleName: 'Week 1-2: 高度なプロンプト技術',
            duration: '24時間',
            topics: [
              {
                name: 'Chain-of-Thought (CoT) Prompting',
                description: 'AIに段階的な推論をさせる技術',
                keyPoints: [
                  'CoTの原理と効果',
                  '"Let\'s think step by step"の活用',
                  '複雑な問題解決への応用',
                  'Self-Consistencyとの組み合わせ',
                ],
              },
              {
                name: 'Tree of Thoughts (ToT)',
                description: '複数の推論パスを探索する高度な技術',
                keyPoints: [
                  'ToTの概念と実装',
                  'ブランチングとバックトラッキング',
                  '最適解の探索',
                ],
              },
              {
                name: 'ReAct (Reasoning + Acting)',
                description: '推論とアクションを統合したフレームワーク',
                keyPoints: [
                  'Thought-Action-Observationサイクル',
                  '外部ツールとの連携',
                  'エージェント的な振る舞い',
                ],
              },
            ],
            practicalExercises: [
              'CoTで数学問題を解く',
              'ToTでパズル解決',
              'ReActで情報収集タスク',
            ],
            assessmentCriteria: [
              '技術の理解度',
              '適切な技術の選択',
              '実装の正確性',
            ],
          },
          {
            moduleName: 'Week 3-4: Prompt Chaining & RAG',
            duration: '24時間',
            topics: [
              {
                name: 'Prompt Chaining',
                description: '複数のプロンプトを連鎖させて複雑なタスクを実行',
                keyPoints: [
                  'チェーンの設計',
                  '中間出力の管理',
                  'エラーハンドリング',
                  'パイプライン最適化',
                ],
              },
              {
                name: 'RAG (Retrieval-Augmented Generation)',
                description: '外部知識を活用した生成技術',
                keyPoints: [
                  'RAGのアーキテクチャ',
                  'ベクトルデータベースの活用',
                  '関連情報の検索と統合',
                  'ハルシネーション削減',
                ],
              },
            ],
            practicalExercises: [
              'マルチステップワークフローの構築',
              'RAGベースのQ&Aシステム',
              'ドキュメント分析パイプライン',
            ],
            assessmentCriteria: [
              'チェーン設計の論理性',
              'RAG実装の効果',
              'システムの堅牢性',
            ],
          },
          {
            moduleName: 'Week 5-6: フレームワークとツール',
            duration: '24時間',
            topics: [
              {
                name: 'LangChain入門',
                description: 'LLMアプリケーション開発フレームワーク',
                keyPoints: [
                  'LangChainの基本概念',
                  'Chains、Agents、Tools',
                  'メモリとステート管理',
                  'LangSmithでのデバッグ',
                ],
              },
              {
                name: 'LlamaIndex入門',
                description: 'データ接続とインデックス管理',
                keyPoints: [
                  'データローダーの使用',
                  'インデックスの種類と選択',
                  'クエリエンジンの最適化',
                ],
              },
            ],
            practicalExercises: [
              'LangChainでチャットボット構築',
              'LlamaIndexでドキュメントQ&A',
              'カスタムツールの統合',
            ],
            assessmentCriteria: [
              'フレームワークの理解',
              'アプリケーションの機能性',
              'コードの品質',
            ],
          },
        ],
        outcomes: [
          '高度なプロンプト技術を実装できる',
          'RAGシステムを構築できる',
          'LangChainやLlamaIndexを活用できる',
          '複雑なAIアプリケーションを設計できる',
        ],
      },
      advanced: {
        title: 'プロンプトエンジニアリング上級コース',
        description: '最先端技術とプロダクションレベルのシステム構築',
        targetLevel: '上級者',
        estimatedDuration: '8週間（週15時間）',
        prerequisites: [
          'プロンプトエンジニアリングの中級知識',
          'Python/JavaScriptでの開発経験',
          'LLMフレームワークの使用経験',
          'ベクトルデータベースの理解',
        ],
        modules: [
          {
            moduleName: 'Week 1-2: 高度なエージェントシステム',
            duration: '30時間',
            topics: [
              {
                name: 'Multi-Agent Systems',
                description: '複数のAIエージェントを協調させるシステム',
                keyPoints: [
                  'エージェント間通信',
                  'タスク分配と調整',
                  'AutoGPT、BabyAGIの原理',
                ],
              },
              {
                name: 'Reflexion & Self-Improvement',
                description: 'AIが自己改善するメカニズム',
                keyPoints: [
                  'フィードバックループ',
                  '自己評価と修正',
                  '学習と適応',
                ],
              },
            ],
            practicalExercises: [
              'マルチエージェントシステムの構築',
              '自己改善型AIの実装',
            ],
            assessmentCriteria: [
              'システムアーキテクチャ',
              'エージェント協調の効率性',
            ],
          },
          {
            moduleName: 'Week 3-4: プロダクション最適化',
            duration: '30時間',
            topics: [
              {
                name: 'プロンプト最適化と評価',
                description: 'データ駆動型のプロンプト改善',
                keyPoints: [
                  '評価メトリクスの設計',
                  'A/Bテストの実施',
                  '自動プロンプト最適化',
                ],
              },
              {
                name: 'コスト最適化',
                description: 'APIコストとレイテンシの削減',
                keyPoints: [
                  'トークン使用量の最適化',
                  'キャッシング戦略',
                  'モデル選択',
                ],
              },
            ],
            practicalExercises: [
              '評価パイプラインの構築',
              'コスト削減プロジェクト',
            ],
            assessmentCriteria: [
              '評価システムの妥当性',
              '最適化の効果',
            ],
          },
          {
            moduleName: 'Week 5-8: キャップストーンプロジェクト',
            duration: '60時間',
            topics: [
              {
                name: 'エンドツーエンドシステム構築',
                description: '実務レベルのAIアプリケーション開発',
                keyPoints: [
                  '要件定義',
                  'アーキテクチャ設計',
                  '実装とテスト',
                  'デプロイと監視',
                ],
              },
            ],
            practicalExercises: [
              '大規模プロジェクトの完成',
            ],
            assessmentCriteria: [
              'プロジェクトの完成度',
              'コードの品質',
              'ドキュメント',
            ],
          },
        ],
        outcomes: [
          'プロダクションレベルのLLMシステムを構築できる',
          'マルチエージェントシステムを設計できる',
          'パフォーマンスとコストを最適化できる',
          '最先端技術を活用できる',
        ],
      },
    };

    return { curriculum: curriculums[level] };
  }

  private async assessSkills(input: PromptEngineeringTaskInput): Promise<{ assessment: SkillAssessment }> {
    const currentSkills = input.currentSkills || [];

    // スキルレベルの判定ロジック
    const skillLevels = {
      beginner: ['基本的なプロンプト作成', 'Zero-shot', 'Few-shot', 'Role Prompting'],
      intermediate: ['Chain-of-Thought', 'Prompt Chaining', 'RAG', 'LangChain基礎'],
      advanced: ['Multi-Agent Systems', 'Auto-optimization', 'Production deployment', 'Custom frameworks'],
    };

    let assessedLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'beginner';

    const matchedAdvanced = skillLevels.advanced.filter(skill =>
      currentSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
    ).length;

    const matchedIntermediate = skillLevels.intermediate.filter(skill =>
      currentSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
    ).length;

    if (matchedAdvanced >= 3) {
      assessedLevel = 'expert';
    } else if (matchedAdvanced >= 1 || matchedIntermediate >= 3) {
      assessedLevel = 'advanced';
    } else if (matchedIntermediate >= 1) {
      assessedLevel = 'intermediate';
    }

    const assessment: SkillAssessment = {
      assessedLevel,
      strengths: currentSkills.length > 0 ? currentSkills.slice(0, 5) : ['学習意欲'],
      areasForImprovement: this.getAreasForImprovement(assessedLevel),
      recommendedPath: this.getRecommendedPath(assessedLevel),
      nextSteps: this.getNextSteps(assessedLevel),
      estimatedTimeToNextLevel: this.getEstimatedTime(assessedLevel),
    };

    return { assessment };
  }

  private getAreasForImprovement(level: string): string[] {
    const improvements: Record<string, string[]> = {
      beginner: ['プロンプトの明確性', '具体的な指示の作成', '出力フォーマットの制御'],
      intermediate: ['高度な推論技術', 'フレームワークの活用', 'システム設計'],
      advanced: ['プロダクション最適化', 'マルチエージェント協調', 'カスタムソリューション開発'],
      expert: ['研究論文の執筆', 'オープンソース貢献', '新技術の開発'],
    };
    return improvements[level] || improvements.beginner;
  }

  private getRecommendedPath(level: string): string[] {
    const paths: Record<string, string[]> = {
      beginner: [
        '基礎コースの完了',
        '毎日のプロンプト練習',
        'OpenAI Playgroundでの実験',
        'プロンプトライブラリの構築',
      ],
      intermediate: [
        'LangChain/LlamaIndexの学習',
        'RAGシステムの構築',
        'ミニプロジェクトの完成',
        'コミュニティへの参加',
      ],
      advanced: [
        'プロダクションシステムの構築',
        'パフォーマンス最適化',
        '技術ブログの執筆',
        'オープンソースプロジェクト参加',
      ],
      expert: [
        '研究開発',
        'カンファレンス発表',
        'メンタリング',
        '新フレームワークの開発',
      ],
    };
    return paths[level] || paths.beginner;
  }

  private getNextSteps(level: string): string[] {
    const steps: Record<string, string[]> = {
      beginner: [
        'プロンプトエンジニアリング基礎コースに登録',
        'AnthropicまたはOpenAIのドキュメントを読む',
        '毎日1つ新しいプロンプトを作成',
      ],
      intermediate: [
        'LangChainチュートリアルを完了',
        'RAGベースのアプリケーションを構築',
        'GitHubでプロジェクトを公開',
      ],
      advanced: [
        '実務プロジェクトに参画',
        'パフォーマンスベンチマーク実施',
        '技術記事を執筆',
      ],
      expert: [
        '研究論文を執筆',
        'OSS プロジェクトをリード',
        'カンファレンスで講演',
      ],
    };
    return steps[level] || steps.beginner;
  }

  private getEstimatedTime(level: string): string {
    const times: Record<string, string> = {
      beginner: '3-6ヶ月',
      intermediate: '6-12ヶ月',
      advanced: '12-24ヶ月',
      expert: '継続的な学習',
    };
    return times[level] || times.beginner;
  }

  private async provideTechniqueGuide(input: PromptEngineeringTaskInput): Promise<{ techniques: TechniqueGuide[] }> {
    const techniques: TechniqueGuide[] = [
      {
        techniqueName: 'Chain-of-Thought (CoT) Prompting',
        category: '推論強化',
        difficulty: '中級',
        description: 'AIに段階的な推論プロセスを明示させることで、複雑な問題解決能力を向上させる技術',
        whenToUse: [
          '数学的問題',
          '論理的推論が必要なタスク',
          '複数ステップの問題解決',
          '説明可能性が重要な場合',
        ],
        basicExample: {
          scenario: '簡単な算数問題',
          prompt: `問題: ロジャーはテニスボールを5個持っています。彼はさらに2缶のテニスボールを買いました。各缶には3個のボールが入っています。ロジャーは今、テニスボールを何個持っていますか？

考えてみましょう、ステップバイステップで：`,
          explanation: '「ステップバイステップで考えましょう」という指示により、AIは中間推論を示すようになります',
          expectedOutput: `1. 最初にロジャーは5個のボールを持っていた
2. 2缶のボールを買った
3. 各缶に3個 → 2缶 × 3個 = 6個
4. 合計: 5個 + 6個 = 11個

答え: ロジャーは11個のテニスボールを持っています。`,
        },
        advancedExample: {
          scenario: '複雑なビジネス問題',
          prompt: `状況: スタートアップ企業が新製品のローンチを計画しています。予算は1000万円、開発期間は6ヶ月、競合他社が3社存在します。

質問: 成功のための戦略を、リスク評価を含めて段階的に分析してください。

分析アプローチ:
1. 市場環境の評価
2. リソースの最適配分
3. 競合優位性の確立
4. リスク要因の特定
5. 軽減策の提案`,
          explanation: '構造化された思考フレームワークを提供することで、より深い分析を引き出します',
        },
        commonMistakes: [
          'ステップを飛ばしすぎる指示',
          '推論の深さを制御しない',
          '出力が冗長になりすぎる',
        ],
        bestPractices: [
          '「ステップバイステップで」「段階的に」などの明示的な指示',
          '必要に応じて中間ステップの数を指定',
          'Self-Consistency（複数回実行して一致を確認）と組み合わせる',
        ],
        relatedTechniques: ['Tree of Thoughts', 'Self-Consistency', 'Least-to-Most Prompting'],
      },
      {
        techniqueName: 'Few-shot Learning',
        category: '例示学習',
        difficulty: '初級',
        description: '少数の具体例を示すことで、AIにタスクのパターンを学習させる技術',
        whenToUse: [
          'フォーマット変換',
          '特定のスタイルでの生成',
          'パターン認識タスク',
          'Zero-shotで精度が不足する場合',
        ],
        basicExample: {
          scenario: '感情分析',
          prompt: `以下の文の感情を分類してください（ポジティブ、ネガティブ、中立）:

例1: "この映画は素晴らしかった！" → ポジティブ
例2: "退屈で時間の無駄だった" → ネガティブ
例3: "普通の映画でした" → 中立

分類してください: "今日のランチは最高でした！"`,
          explanation: '3つの例を示すことで、分類のパターンをAIに理解させます',
          expectedOutput: 'ポジティブ',
        },
        commonMistakes: [
          '例が少なすぎる（最低2-3個推奨）',
          '例が偏っている',
          '例とタスクの形式が異なる',
        ],
        bestPractices: [
          '多様な例を選ぶ',
          '例は3-5個が最適（トークン制限に注意）',
          '例の順序も重要（最新の例の影響が大きい）',
        ],
        relatedTechniques: ['Zero-shot Prompting', 'One-shot Learning'],
      },
      {
        techniqueName: 'RAG (Retrieval-Augmented Generation)',
        category: '知識拡張',
        difficulty: '上級',
        description: '外部の知識ベースから関連情報を検索し、それを基に生成を行う技術',
        whenToUse: [
          '最新情報が必要な場合',
          '社内ドキュメントなど特定の知識源がある場合',
          'ハルシネーション（幻覚）を減らしたい場合',
          '引用や根拠が必要な場合',
        ],
        basicExample: {
          scenario: '社内FAQ応答',
          prompt: `以下の関連ドキュメントを基に質問に答えてください:

【関連ドキュメント】
"有給休暇は入社後6ヶ月経過で10日付与されます。以降、勤続年数に応じて最大20日まで増加します。"
"休暇申請は3日前までに上司に提出してください。緊急時は当日でも可能ですが、事後報告が必要です。"

【質問】
新入社員はいつから有給休暇を使えますか？

【回答】
関連情報に基づいて答えてください。`,
          explanation: '関連する文書を明示的に提供し、それに基づいた回答を求めます',
          expectedOutput: '新入社員は入社後6ヶ月経過時点から有給休暇を使用できます。その時点で10日間の有給休暇が付与されます。',
        },
        commonMistakes: [
          '無関係な情報を含めすぎる',
          '検索精度が低い',
          '文書の引用を明示しない',
        ],
        bestPractices: [
          'ベクトル検索で関連性の高い情報のみ取得',
          '情報源を明示させる',
          'ハイブリッド検索（キーワード + ベクトル）の活用',
          'チャンクサイズの最適化',
        ],
        relatedTechniques: ['Prompt Chaining', 'Query Decomposition'],
      },
    ];

    // specificTopicが指定されている場合はフィルタリング
    if (input.specificTopic) {
      const filtered = techniques.filter(t =>
        t.techniqueName.toLowerCase().includes(input.specificTopic!.toLowerCase()) ||
        t.category.toLowerCase().includes(input.specificTopic!.toLowerCase())
      );
      return { techniques: filtered.length > 0 ? filtered : techniques };
    }

    return { techniques };
  }

  private async suggestProjects(input: PromptEngineeringTaskInput): Promise<{ projects: ProjectSuggestion[] }> {
    const level = input.level || 'beginner';

    const projectsByLevel: Record<string, ProjectSuggestion[]> = {
      beginner: [
        {
          projectName: 'スマートFAQチャットボット',
          difficulty: '初級',
          estimatedTime: '1-2週間',
          description: '企業のFAQを基にした自動応答チャットボットを構築',
          objectives: [
            'プロンプトエンジニアリングの基礎を実践',
            'Few-shot learningの活用',
            'ユーザーフレンドリーなインターフェース作成',
          ],
          skillsRequired: [
            '基本的なプロンプト作成',
            'テキスト入出力の理解',
          ],
          skillsToLearn: [
            'Few-shot prompting',
            'エラーハンドリング',
            'ユーザーインタラクション設計',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'FAQデータの準備',
              description: '10-20個のよくある質問と回答のペアを作成',
              deliverable: 'FAQ.jsonファイル',
            },
            {
              stepNumber: 2,
              title: 'Few-shotプロンプトの設計',
              description: '質問応答のフォーマットを定義し、例を作成',
              deliverable: 'プロンプトテンプレート',
            },
            {
              stepNumber: 3,
              title: 'チャットボットの実装',
              description: 'Python/JavaScriptでシンプルなCLIチャットボットを実装',
              deliverable: '動作するチャットボット',
            },
            {
              stepNumber: 4,
              title: 'テストと改善',
              description: '様々な質問でテストし、プロンプトを最適化',
              deliverable: 'テストレポートと改善版',
            },
          ],
          evaluationCriteria: [
            '正確な回答率（80%以上）',
            'プロンプトの明確性',
            'エラーハンドリングの実装',
            'ドキュメントの質',
          ],
          extensionIdeas: [
            'マルチターン対話のサポート',
            'FAQ以外の質問への対応',
            'Webインターフェースの追加',
          ],
        },
      ],
      intermediate: [
        {
          projectName: 'RAGベースのドキュメント検索システム',
          difficulty: '中級',
          estimatedTime: '3-4週間',
          description: '社内ドキュメントや技術文書から情報を検索・要約するシステム',
          objectives: [
            'RAG（Retrieval-Augmented Generation）の実装',
            'ベクトルデータベースの活用',
            'LangChainフレームワークの習得',
          ],
          skillsRequired: [
            'プロンプトエンジニアリング基礎',
            'Python中級',
            'API使用経験',
          ],
          skillsToLearn: [
            'Embedding生成',
            'ベクトル検索',
            'LangChain',
            'Document loading & chunking',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'ドキュメント収集と前処理',
              description: 'PDFやMarkdownファイルを収集し、チャンクに分割',
              deliverable: '前処理されたドキュメントデータ',
              resources: ['LangChain Document Loaders', 'PyPDF2', 'unstructured'],
            },
            {
              stepNumber: 2,
              title: 'ベクトルデータベースのセットアップ',
              description: 'Chroma/PineconeでEmbeddingを保存',
              deliverable: '検索可能なベクトルDB',
              resources: ['ChromaDB', 'Pinecone', 'OpenAI Embeddings'],
            },
            {
              stepNumber: 3,
              title: 'RAGパイプラインの実装',
              description: '検索→関連文書取得→回答生成のフローを構築',
              deliverable: '動作するRAGシステム',
            },
            {
              stepNumber: 4,
              title: '精度評価と最適化',
              description: 'チャンクサイズ、検索数、プロンプトを最適化',
              deliverable: '評価レポートと最適化版',
            },
          ],
          evaluationCriteria: [
            '検索の関連性（Precision/Recall）',
            '回答の正確性',
            'レスポンス時間',
            'システムの拡張性',
          ],
          extensionIdeas: [
            'ハイブリッド検索（BM25 + ベクトル）',
            'マルチモーダル対応（画像含む文書）',
            'フィードバックループによる改善',
          ],
        },
      ],
      advanced: [
        {
          projectName: 'マルチエージェント協調システム',
          difficulty: '上級',
          estimatedTime: '6-8週間',
          description: '複数の専門AIエージェントが協調して複雑なタスクを実行するシステム',
          objectives: [
            'Multi-Agent Systemsの設計と実装',
            'エージェント間通信プロトコル',
            'タスク分解と調整',
          ],
          skillsRequired: [
            'プロンプトエンジニアリング上級',
            'LangChain/AutoGPT経験',
            'システム設計能力',
          ],
          skillsToLearn: [
            'Agent orchestration',
            'State management',
            'Tool creation',
            'Error recovery',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'システムアーキテクチャ設計',
              description: 'エージェントの役割、通信フロー、データ構造を設計',
              deliverable: 'アーキテクチャ設計書',
            },
            {
              stepNumber: 2,
              title: '個別エージェントの実装',
              description: 'Researcher、Planner、Writer、Reviewerなどのエージェント作成',
              deliverable: '各専門エージェント',
            },
            {
              stepNumber: 3,
              title: 'オーケストレーターの実装',
              description: 'タスク分配、結果統合、エラーハンドリング',
              deliverable: '協調動作するシステム',
            },
            {
              stepNumber: 4,
              title: 'プロダクション化',
              description: 'ロギング、監視、デプロイ、スケーリング',
              deliverable: '本番環境対応システム',
            },
          ],
          evaluationCriteria: [
            'タスク完了率',
            'エージェント協調の効率性',
            'システムの堅牢性',
            'スケーラビリティ',
          ],
          extensionIdeas: [
            '動的エージェント生成',
            '学習・適応メカニズム',
            'ヒューマンインザループ',
          ],
        },
      ],
    };

    return { projects: projectsByLevel[level] || projectsByLevel.beginner };
  }

  private async generateRoadmap(input: PromptEngineeringTaskInput): Promise<{ roadmap: LearningRoadmap }> {
    const targetRole = input.targetRole || 'generalist';

    const roadmap: LearningRoadmap = {
      title: `${targetRole}プロンプトエンジニア育成ロードマップ`,
      targetRole,
      totalDuration: '6-12ヶ月',
      phases: [
        {
          phase: 1,
          name: '基礎習得フェーズ',
          duration: '1-2ヶ月',
          focus: 'プロンプトエンジニアリングの基本概念とテクニック',
          topics: [
            'LLMの基礎理解',
            'プロンプトの構造',
            'Zero-shot/Few-shot',
            'Role Prompting',
            'Output formatting',
          ],
          projects: [
            'テキスト分類ツール',
            'コンテンツ生成アシスタント',
            'データフォーマット変換ツール',
          ],
          skills: [
            '明確な指示の作成',
            '適切な例の選択',
            '出力制御',
          ],
          completionCriteria: [
            '基本的なプロンプトを独力で作成できる',
            'Few-shot learningを活用できる',
            '出力フォーマットを制御できる',
          ],
        },
        {
          phase: 2,
          name: '応用技術習得フェーズ',
          duration: '2-3ヶ月',
          focus: '高度なプロンプト技術とフレームワーク',
          topics: [
            'Chain-of-Thought',
            'Prompt Chaining',
            'RAG基礎',
            'LangChain入門',
            'Error handling',
          ],
          projects: [
            'Q&Aシステム',
            'ドキュメント要約ツール',
            'RAGベースの検索システム',
          ],
          skills: [
            '複雑な推論の誘導',
            'マルチステップワークフロー',
            'RAGシステム構築',
          ],
          completionCriteria: [
            'Chain-of-Thoughtを実装できる',
            'LangChainで基本的なアプリを作れる',
            'RAGの原理を理解し実装できる',
          ],
        },
        {
          phase: 3,
          name: '実践・統合フェーズ',
          duration: '2-3ヶ月',
          focus: '実務プロジェクトとシステム統合',
          topics: [
            'Multi-Agent Systems',
            'Production optimization',
            'Evaluation & testing',
            'Cost optimization',
            'Deployment',
          ],
          projects: [
            'エンドツーエンドAIアプリケーション',
            'マルチエージェントシステム',
            'プロダクションデプロイ',
          ],
          skills: [
            'システムアーキテクチャ設計',
            'パフォーマンス最適化',
            'プロダクション運用',
          ],
          completionCriteria: [
            '実務レベルのシステムを構築できる',
            'パフォーマンスとコストを最適化できる',
            'プロダクション環境にデプロイできる',
          ],
        },
        {
          phase: 4,
          name: '専門性深化フェーズ',
          duration: '2-4ヶ月',
          focus: '専門分野の深掘りとコミュニティ貢献',
          topics: [
            '最新研究のキャッチアップ',
            'カスタムソリューション開発',
            'オープンソース貢献',
            'ナレッジシェア',
          ],
          projects: [
            '独自フレームワーク開発',
            'OSS貢献',
            '技術記事・登壇',
          ],
          skills: [
            '研究論文の理解',
            '新技術の実装',
            'コミュニティリーダーシップ',
          ],
          completionCriteria: [
            '最新技術をキャッチアップし実装できる',
            'OSSに貢献できる',
            '知識を効果的にシェアできる',
          ],
        },
      ],
      milestones: [
        {
          name: 'プロンプトエンジニア入門修了',
          description: '基本的なプロンプト技術を習得',
          skills: ['Zero-shot', 'Few-shot', 'Role Prompting'],
          deliverables: ['プロンプトライブラリ（20+）', '小規模プロジェクト完成'],
        },
        {
          name: 'AI開発者',
          description: 'LLMアプリケーションを開発できる',
          skills: ['LangChain', 'RAG', 'Prompt Chaining'],
          deliverables: ['RAGシステム', 'エージェントアプリ'],
        },
        {
          name: 'シニアプロンプトエンジニア',
          description: 'プロダクションレベルのシステムを構築',
          skills: ['Multi-Agent', 'Optimization', 'Production deployment'],
          deliverables: ['本番システム', 'パフォーマンスレポート'],
        },
        {
          name: 'エキスパート/リーダー',
          description: 'コミュニティをリードし新技術を創出',
          skills: ['Research', 'Innovation', 'Leadership'],
          deliverables: ['OSS貢献', '技術記事', 'カンファレンス登壇'],
        },
      ],
      careerPaths: [
        'AIアプリケーションエンジニア',
        'プロンプトエンジニアリングコンサルタント',
        'AIプロダクトマネージャー',
        'AI研究者',
        'テクニカルライター',
      ],
    };

    return { roadmap };
  }

  private async createPracticeExercises(input: PromptEngineeringTaskInput): Promise<{ exercises: PracticeExercise[] }> {
    const level = input.level || 'beginner';

    const exercisesByLevel: Record<string, PracticeExercise[]> = {
      beginner: [
        {
          exerciseId: 'BEG-001',
          title: 'レストランレビューの感情分析',
          difficulty: '初級',
          category: 'Classification',
          objective: 'Few-shot learningを使って感情分類プロンプトを作成',
          scenario: 'レストランのレビューをポジティブ、ネガティブ、中立に分類するプロンプトを作成してください',
          task: '最低3つの例を含むFew-shotプロンプトを設計し、正確に感情を分類できるようにしてください',
          hints: [
            '各カテゴリーに対して均等に例を用意する',
            '例は明確で典型的なものを選ぶ',
            '出力フォーマットを統一する',
          ],
          evaluationCriteria: [
            '例の質と多様性',
            '指示の明確性',
            '分類の正確性（90%以上）',
          ],
          sampleSolution: `レストランレビューを分類してください（ポジティブ、ネガティブ、中立）:

例1: "料理が美味しく、サービスも素晴らしかった！" → ポジティブ
例2: "料理は冷めていて、ウェイターも無愛想だった" → ネガティブ
例3: "普通のレストランでした。特に印象に残らない" →中立

分類してください: [ユーザーのレビュー]`,
        },
        {
          exerciseId: 'BEG-002',
          title: 'プロダクト説明の生成',
          difficulty: '初級',
          category: 'Content Generation',
          objective: 'ロールプロンプティングで特定のトーンでコンテンツを生成',
          scenario: '電子商取引サイトのプロダクト説明を、プロフェッショナルなトーンで生成',
          task: 'マーケターの役割を与え、製品の特徴を魅力的に伝えるプロンプトを作成',
          hints: [
            '役割を明確に定義する',
            'トーンとスタイルを指定する',
            '含めるべき要素を列挙する',
          ],
          evaluationCriteria: [
            '役割設定の適切性',
            'トーンの一貫性',
            '情報の網羅性',
          ],
        },
      ],
      intermediate: [
        {
          exerciseId: 'INT-001',
          title: 'Chain-of-Thoughtで数学問題を解く',
          difficulty: '中級',
          category: 'Reasoning',
          objective: 'CoTプロンプティングで複雑な問題を段階的に解決',
          scenario: '多段階の算数・数学問題をAIに解かせる',
          task: 'Chain-of-Thoughtを活用し、推論プロセスを明示させながら正確に問題を解くプロンプトを作成',
          hints: [
            '「ステップバイステップで考えましょう」を含める',
            '中間ステップを明示するよう促す',
            '最終答えを明確に示すよう指示',
          ],
          evaluationCriteria: [
            '推論の明確性',
            'ステップの論理性',
            '最終答えの正確性',
          ],
          sampleSolution: `問題: [数学問題]

この問題を段階的に解きましょう:
1. まず、何が与えられているか整理します
2. 必要な計算を特定します
3. ステップごとに計算を実行します
4. 最終的な答えを導きます

ステップバイステップで考えてください:`,
        },
      ],
      advanced: [
        {
          exerciseId: 'ADV-001',
          title: 'RAGシステムのプロンプト最適化',
          difficulty: '上級',
          category: 'RAG Optimization',
          objective: 'RAGシステムで精度とコストを両立させるプロンプトを設計',
          scenario: '大規模文書コーパスからの情報検索と回答生成',
          task: '検索精度を維持しながらトークン使用量を削減するプロンプト戦略を実装',
          hints: [
            '関連文書のフィルタリング',
            '情報の要約と圧縮',
            '引用の明示',
          ],
          evaluationCriteria: [
            '回答の正確性',
            'トークン効率',
            '引用の適切性',
          ],
        },
      ],
    };

    return { exercises: exercisesByLevel[level] || exercisesByLevel.beginner };
  }

  private async explainAdvancedTopics(input: PromptEngineeringTaskInput): Promise<{ content: any }> {
    const advancedTopics = {
      title: '最先端プロンプトエンジニアリング技術',
      topics: [
        {
          name: 'Constitutional AI',
          description: 'AIの出力を倫理的・安全な方向に誘導する技術',
          keyPoints: [
            '原則ベースのプロンプト設計',
            'Self-critiquing and revision',
            '有害な出力の防止',
          ],
          applications: ['コンテンツモデレーション', '安全なAIアシスタント', '倫理的意思決定支援'],
        },
        {
          name: 'Prompt Compression',
          description: 'トークン使用量を削減しながら情報を保持',
          keyPoints: [
            'LLMLinguaなどの圧縮技術',
            '重要情報の識別',
            'コスト削減戦略',
          ],
          applications: ['大規模RAGシステム', 'コスト最適化', '長文処理'],
        },
        {
          name: 'Multi-Modal Prompting',
          description: 'テキスト、画像、音声を組み合わせたプロンプト',
          keyPoints: [
            '画像とテキストの統合',
            'Vision-Language Models',
            'クロスモーダル理解',
          ],
          applications: ['画像解析', 'ビジュアルQ&A', 'マルチモーダル検索'],
        },
        {
          name: 'Automatic Prompt Engineering (APE)',
          description: 'プロンプトの自動生成と最適化',
          keyPoints: [
            'メタプロンプティング',
            '進化的アルゴリズム',
            '自動評価',
          ],
          applications: ['大規模システムの最適化', 'A/Bテスト自動化', 'パーソナライゼーション'],
        },
      ],
      resources: [
        {
          type: 'article',
          title: 'Constitutional AI: Harmlessness from AI Feedback',
          description: 'Anthropicの研究論文',
          level: 'advanced',
          topics: ['Constitutional AI', 'AI Safety'],
        },
        {
          type: 'tool',
          title: 'LangChain',
          description: 'LLMアプリケーション開発フレームワーク',
          url: 'https://langchain.com',
          level: 'intermediate',
          topics: ['Framework', 'Development'],
        },
        {
          type: 'course',
          title: 'DeepLearning.AI: ChatGPT Prompt Engineering for Developers',
          description: 'プロンプトエンジニアリングの実践コース',
          level: 'beginner',
          topics: ['Fundamentals', 'Best Practices'],
          estimatedTime: '2-3時間',
        },
      ],
    };

    return { content: advancedTopics };
  }
}
