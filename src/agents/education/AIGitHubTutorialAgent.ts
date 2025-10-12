/**
 * AIGitHubTutorialAgent - GitHub学習支援の専門エージェント
 * GitHub基礎から応用まで、段階的な学習ガイドを提供
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';

export interface GitHubTutorialTaskInput {
  taskType: 'basics' | 'repository' | 'branching' | 'pr-review' | 'actions' | 'collaboration' | 'roadmap';
  level?: 'beginner' | 'intermediate' | 'advanced';
  specificTopic?: string;
  learnerGoal?: string;
}

export class AIGitHubTutorialAgent extends BaseAgent {
  constructor() {
    const config = {
      name: 'AI GitHub Tutorial Agent',
      role: 'GitHub学習支援の専門家',
      category: 'education',
      description: 'GitHub基礎から応用まで段階的な学習支援',
      capabilities: [
        'GitHub基礎学習',
        'リポジトリ管理指導',
        'ブランチ戦略説明',
        'プルリクエスト指導',
        'GitHub Actions設定',
        'コラボレーション支援',
      ],
      maxRetries: 2,
      timeout: 30000,
    };

    super(config);
  }

  async setup(): Promise<void> {
    this.log('AI GitHub Tutorial Agent setup completed');
  }

  async process(task: AgentTask): Promise<any> {
    const input = task.input as GitHubTutorialTaskInput;
    this.log(`Processing GitHub tutorial: ${input.taskType} (Level: ${input.level || 'beginner'})`);

    switch (input.taskType) {
      case 'basics':
        return await this.teachBasics(input);
      case 'repository':
        return await this.teachRepositoryManagement(input);
      case 'branching':
        return await this.teachBranchingStrategy(input);
      case 'pr-review':
        return await this.teachPRAndReview(input);
      case 'actions':
        return await this.teachGitHubActions(input);
      case 'collaboration':
        return await this.teachCollaboration(input);
      case 'roadmap':
        return await this.generateLearningRoadmap(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * GitHub基礎を教える
   */
  private async teachBasics(input: GitHubTutorialTaskInput) {
    const level = input.level || 'beginner';

    const lessons = {
      beginner: {
        title: 'GitHub入門 - 基礎の基礎',
        concepts: [
          {
            name: 'Gitとは何か',
            description: 'バージョン管理システムの基本概念',
            example: 'ファイルの変更履歴を記録し、過去の状態に戻せる仕組み',
          },
          {
            name: 'GitHubとは何か',
            description: 'Gitリポジトリのホスティングサービス',
            example: 'コードを保存・共有・協力するためのプラットフォーム',
          },
          {
            name: 'リポジトリ（Repository）',
            description: 'プロジェクトのファイルと履歴を保存する場所',
            example: '自分のプロジェクトフォルダのようなもの',
          },
          {
            name: 'コミット（Commit）',
            description: '変更を記録する単位',
            example: 'ゲームのセーブポイントのようなもの',
          },
        ],
        practicalSteps: [
          '1. GitHubアカウントを作成する',
          '2. 初めてのリポジトリを作成する',
          '3. README.mdファイルを編集する',
          '4. 変更をコミットする',
          '5. コミット履歴を確認する',
        ],
        commands: [
          {
            command: 'git init',
            description: '新しいGitリポジトリを初期化',
          },
          {
            command: 'git add <ファイル名>',
            description: 'ファイルをステージングエリアに追加',
          },
          {
            command: 'git commit -m "メッセージ"',
            description: '変更をコミット',
          },
          {
            command: 'git status',
            description: '現在の状態を確認',
          },
        ],
      },
      intermediate: {
        title: 'GitHub中級 - 実践的な使い方',
        concepts: [
          {
            name: 'リモートとローカル',
            description: 'GitHub（リモート）とPC（ローカル）の関係',
            example: 'クラウドとローカルPCの同期',
          },
          {
            name: 'クローンとフォーク',
            description: 'リポジトリのコピー方法',
            example: 'clone = 自分用、fork = 他人のプロジェクトをコピー',
          },
          {
            name: '.gitignore',
            description: 'Gitで管理しないファイルの指定',
            example: 'node_modules/, .env などを除外',
          },
        ],
        practicalSteps: [
          '1. リモートリポジトリをクローンする',
          '2. ローカルで変更を加える',
          '3. 変更をプッシュする',
          '4. .gitignoreを設定する',
          '5. リモートから最新を取得（pull）する',
        ],
        commands: [
          {
            command: 'git clone <URL>',
            description: 'リモートリポジトリをクローン',
          },
          {
            command: 'git push origin main',
            description: 'ローカルの変更をリモートにプッシュ',
          },
          {
            command: 'git pull origin main',
            description: 'リモートの最新をローカルに取得',
          },
          {
            command: 'git remote -v',
            description: 'リモートリポジトリの確認',
          },
        ],
      },
      advanced: {
        title: 'GitHub上級 - プロフェッショナルな使い方',
        concepts: [
          {
            name: 'Git Hooks',
            description: 'コミット時などに自動実行されるスクリプト',
            example: 'pre-commit: コミット前にリンターを実行',
          },
          {
            name: 'Rebase vs Merge',
            description: 'ブランチ統合の2つの方法',
            example: 'Rebase: 履歴を綺麗に、Merge: 履歴を保持',
          },
          {
            name: 'Cherry-pick',
            description: '特定のコミットだけを取り込む',
            example: '他のブランチから1つのコミットだけ持ってくる',
          },
        ],
        practicalSteps: [
          '1. インタラクティブRebaseで履歴を整理',
          '2. Cherry-pickで特定コミットを適用',
          '3. Git Hooksをセットアップ',
          '4. サブモジュールの管理',
          '5. Git bisectでバグ原因を特定',
        ],
        commands: [
          {
            command: 'git rebase -i HEAD~3',
            description: '直近3コミットをインタラクティブにRebase',
          },
          {
            command: 'git cherry-pick <commit-hash>',
            description: '特定のコミットを適用',
          },
          {
            command: 'git bisect start',
            description: 'バイナリサーチでバグ原因を特定',
          },
        ],
      },
    };

    const lesson = lessons[level];

    return {
      lesson,
      nextSteps: this.getNextSteps(level),
      resources: this.getResources('basics', level),
      quiz: this.generateQuiz('basics', level),
    };
  }

  /**
   * リポジトリ管理を教える
   */
  private async teachRepositoryManagement(input: GitHubTutorialTaskInput) {
    return {
      title: 'リポジトリ管理のベストプラクティス',
      topics: [
        {
          name: 'README.mdの書き方',
          importance: 'critical',
          content: {
            sections: [
              'プロジェクト概要',
              'インストール方法',
              '使い方',
              'コントリビューション方法',
              'ライセンス',
            ],
            tips: [
              'バッジを使って視覚的に',
              'スクリーンショットを含める',
              'デモリンクを追加',
            ],
          },
        },
        {
          name: 'ライセンスの選び方',
          importance: 'high',
          content: {
            licenses: [
              {
                name: 'MIT License',
                useCase: 'オープンで自由なプロジェクト',
                features: ['商用利用OK', '改変OK', '再配布OK'],
              },
              {
                name: 'Apache 2.0',
                useCase: '特許権も明示したい場合',
                features: ['MIT + 特許権の明示'],
              },
              {
                name: 'GPL',
                useCase: '派生作品もオープンソースにしたい',
                features: ['コピーレフト型'],
              },
            ],
          },
        },
        {
          name: 'イシューテンプレート',
          importance: 'medium',
          content: {
            types: ['バグ報告', '機能リクエスト', '質問'],
            benefits: ['報告の質が上がる', '対応が効率化'],
          },
        },
        {
          name: 'リリース管理',
          importance: 'high',
          content: {
            strategy: 'セマンティックバージョニング（SemVer）',
            format: 'MAJOR.MINOR.PATCH',
            example: '1.2.3',
            rules: [
              'MAJOR: 互換性のない変更',
              'MINOR: 後方互換性のある機能追加',
              'PATCH: 後方互換性のあるバグ修正',
            ],
          },
        },
      ],
      practicalExercise: {
        task: '実際にプロジェクトを作成し、上記の要素を全て実装してみましょう',
        steps: [
          '新しいリポジトリを作成',
          '包括的なREADME.mdを書く',
          'ライセンスを選択・追加',
          'イシューテンプレートを設定',
          'v1.0.0のリリースを作成',
        ],
      },
    };
  }

  /**
   * ブランチ戦略を教える
   */
  private async teachBranchingStrategy(input: GitHubTutorialTaskInput) {
    return {
      title: 'ブランチ戦略のベストプラクティス',
      strategies: [
        {
          name: 'Git Flow',
          bestFor: '大規模プロジェクト、定期リリース',
          branches: {
            main: '本番環境のコード',
            develop: '開発中のコード',
            feature: '新機能開発（feature/機能名）',
            release: 'リリース準備（release/バージョン）',
            hotfix: '緊急バグ修正（hotfix/バグ名）',
          },
          workflow: [
            '1. developからfeatureブランチを作成',
            '2. 機能開発完了後、developにマージ',
            '3. リリース時、developからreleaseブランチ作成',
            '4. テスト後、releaseをmainとdevelopにマージ',
            '5. 緊急バグはhotfixで対応',
          ],
        },
        {
          name: 'GitHub Flow',
          bestFor: '小〜中規模、継続的デプロイ',
          branches: {
            main: '常にデプロイ可能な状態',
            feature: '機能開発・バグ修正',
          },
          workflow: [
            '1. mainから機能ブランチを作成',
            '2. 開発してコミット',
            '3. プルリクエストを作成',
            '4. レビュー・承認',
            '5. mainにマージしてデプロイ',
          ],
        },
        {
          name: 'Trunk Based Development',
          bestFor: '高頻度デプロイ、小さい変更',
          branches: {
            main: 'すべての開発が行われる',
            shortLived: '数時間〜1日のみ存在する短命ブランチ',
          },
          workflow: [
            '1. mainから短命ブランチを作成',
            '2. 小さい変更を加える',
            '3. すぐにmainにマージ',
            '4. フィーチャーフラグで機能を制御',
          ],
        },
      ],
      branchNamingConventions: {
        prefixes: [
          'feature/ - 新機能',
          'fix/ - バグ修正',
          'hotfix/ - 緊急修正',
          'refactor/ - リファクタリング',
          'docs/ - ドキュメント',
          'test/ - テスト追加',
        ],
        examples: [
          'feature/user-authentication',
          'fix/login-error',
          'refactor/payment-module',
        ],
      },
      commands: [
        {
          command: 'git branch <ブランチ名>',
          description: '新しいブランチを作成',
        },
        {
          command: 'git checkout -b <ブランチ名>',
          description: 'ブランチを作成して切り替え',
        },
        {
          command: 'git branch -d <ブランチ名>',
          description: 'ブランチを削除',
        },
        {
          command: 'git merge <ブランチ名>',
          description: 'ブランチをマージ',
        },
      ],
    };
  }

  /**
   * プルリクエストとコードレビューを教える
   */
  private async teachPRAndReview(input: GitHubTutorialTaskInput) {
    return {
      title: 'プルリクエスト＆コードレビューのベストプラクティス',
      prCreation: {
        title: '良いPRの作り方',
        rules: [
          {
            rule: '小さく、焦点を絞る',
            reason: 'レビューしやすく、早くマージできる',
            guideline: '1つのPRで1つの機能・修正',
          },
          {
            rule: '説明的なタイトル',
            examples: [
              '✅ Add user authentication with JWT',
              '❌ Update files',
            ],
          },
          {
            rule: '詳細な説明文',
            template: `## 変更内容
- 何を変更したか
- なぜ変更したか

## テスト方法
- 動作確認の手順

## スクリーンショット
- UIの変更がある場合`,
          },
          {
            rule: 'レビュアーを指定',
            tip: '適切な人を@メンションで指定',
          },
        ],
      },
      reviewProcess: {
        title: 'コードレビューの進め方',
        reviewerGuidelines: [
          {
            point: '建設的なコメント',
            good: '「ここを○○にすると、より読みやすくなります」',
            bad: '「これは悪いコードです」',
          },
          {
            point: '質問形式で提案',
            example: '「この部分は○○の方が良いかもしれませんが、どう思いますか？」',
          },
          {
            point: '重要度を明示',
            levels: [
              'nit (nitpick): 些細な指摘',
              'suggestion: 提案',
              'concern: 懸念事項',
              'blocker: マージ前に必ず修正',
            ],
          },
        ],
        authorGuidelines: [
          '指摘を真摯に受け止める',
          '防御的にならない',
          '不明点は質問する',
          '修正後にコメントを解決',
        ],
      },
      prCommands: [
        {
          command: 'gh pr create',
          description: 'GitHub CLIでPR作成',
        },
        {
          command: 'gh pr review <PR番号>',
          description: 'PRをレビュー',
        },
        {
          command: 'gh pr merge <PR番号>',
          description: 'PRをマージ',
        },
      ],
      checklistTemplate: {
        prAuthor: [
          '[] テストが通ることを確認',
          '[] コードにコメントを追加（複雑な部分）',
          '[] ドキュメントを更新',
          '[] レビュアーを指定',
        ],
        reviewer: [
          '[] コードの論理的な正しさ',
          '[] テストの網羅性',
          '[] パフォーマンスへの影響',
          '[] セキュリティ上の問題',
          '[] 可読性・保守性',
        ],
      },
    };
  }

  /**
   * GitHub Actionsを教える
   */
  private async teachGitHubActions(input: GitHubTutorialTaskInput) {
    return {
      title: 'GitHub Actions入門 - CI/CD自動化',
      basics: {
        whatIsIt: 'GitHubが提供するCI/CDプラットフォーム',
        benefits: [
          'コミット時に自動でテストを実行',
          'テスト通過後に自動デプロイ',
          '定期的なタスクの実行',
          '無料枠が豊富（パブリックリポジトリは無制限）',
        ],
      },
      keyComponents: {
        workflow: 'ワークフロー全体の定義',
        job: '複数のstepをまとめた単位',
        step: '個々の実行タスク',
        action: '再利用可能なステップ',
      },
      basicExamples: [
        {
          name: 'Node.jsプロジェクトのCI',
          useCase: 'コミット時にテストを自動実行',
          yaml: `name: Node.js CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test`,
        },
        {
          name: '自動デプロイ',
          useCase: 'mainブランチへのマージ時に自動デプロイ',
          yaml: `name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/myapp
            git pull origin main
            npm install
            npm run build
            pm2 restart myapp`,
        },
      ],
      advancedTopics: [
        {
          name: 'シークレット管理',
          description: 'APIキーやパスワードを安全に管理',
          howTo: 'Settings > Secrets and variables > Actionsで設定',
        },
        {
          name: 'キャッシング',
          description: 'ビルド時間を短縮',
          example: 'actions/cache アクション使用',
        },
        {
          name: 'マトリックスビルド',
          description: '複数環境で並列テスト',
          example: 'Node 18, 20, 22で同時テスト',
        },
      ],
    };
  }

  /**
   * コラボレーションを教える
   */
  private async teachCollaboration(input: GitHubTutorialTaskInput) {
    return {
      title: 'GitHubでのチームコラボレーション',
      teamWorkflow: {
        roles: [
          {
            role: 'Owner',
            permissions: '全ての権限',
            responsibilities: ['リポジトリ設定', 'メンバー管理'],
          },
          {
            role: 'Maintainer',
            permissions: 'コードとイシュー管理',
            responsibilities: ['PR承認', 'リリース管理'],
          },
          {
            role: 'Contributor',
            permissions: 'コード貢献',
            responsibilities: ['PRの作成', 'イシュー報告'],
          },
        ],
      },
      protectionRules: {
        title: 'ブランチ保護ルール',
        recommendations: [
          {
            rule: 'Require pull request reviews',
            setting: '最低1人の承認が必要',
            benefit: 'コード品質の担保',
          },
          {
            rule: 'Require status checks',
            setting: 'CI/CDが通らないとマージ不可',
            benefit: 'バグの混入防止',
          },
          {
            rule: 'Restrict who can push',
            setting: 'mainへの直接プッシュ禁止',
            benefit: '履歴の保護',
          },
        ],
      },
      communicationTools: [
        {
          tool: 'Issues',
          useCase: 'バグ報告、機能要望、タスク管理',
          tips: ['ラベルで分類', 'マイルストーンで管理'],
        },
        {
          tool: 'Discussions',
          useCase: 'アイデア議論、Q&A',
          tips: ['カテゴリ分け', 'ベストアンサー選定'],
        },
        {
          tool: 'Projects',
          useCase: 'カンバンボードで進捗管理',
          tips: ['自動化ルール活用', '複数リポジトリ対応'],
        },
      ],
      bestPractices: [
        'コミットメッセージは明確に（Conventional Commits推奨）',
        'こまめにコミット、こまめにプッシュ',
        'コンフリクトは早めに解決',
        'ドキュメントを常に最新に',
        'コードレビューは48時間以内に',
      ],
    };
  }

  /**
   * 学習ロードマップを生成
   */
  private async generateLearningRoadmap(input: GitHubTutorialTaskInput) {
    const goal = input.learnerGoal || '実務でGitHubを使いこなせるようになる';

    return {
      title: 'GitHub学習ロードマップ',
      goal,
      phases: [
        {
          phase: 'Phase 1: 基礎固め（1-2週間）',
          objectives: ['GitとGitHubの基本概念理解', '基本コマンド習得'],
          tasks: [
            'GitHubアカウント作成',
            'Git基本コマンド練習（add, commit, push, pull）',
            '初めてのリポジトリ作成',
            'README.md作成',
          ],
          resources: ['Pro Git Book（日本語版）', 'GitHub Learning Lab'],
        },
        {
          phase: 'Phase 2: 実践（2-3週間）',
          objectives: ['ブランチ操作', 'PR作成・レビュー'],
          tasks: [
            'ブランチ戦略の理解（GitHub Flow）',
            'feature ブランチでの開発練習',
            'PRの作成・マージ',
            'コンフリクトの解決',
          ],
          resources: ['実際のOSSプロジェクトへの貢献'],
        },
        {
          phase: 'Phase 3: チーム開発（3-4週間）',
          objectives: ['チーム協業スキル', 'コードレビュー能力'],
          tasks: [
            'ブランチ保護ルールの設定',
            'イシュー管理',
            'Projects（カンバン）の活用',
            'コードレビューの実践',
          ],
          resources: ['チーム開発プロジェクトに参加'],
        },
        {
          phase: 'Phase 4: 自動化（2-3週間）',
          objectives: ['CI/CD構築', 'GitHub Actions習得'],
          tasks: [
            'GitHub Actions基礎',
            'テスト自動化',
            'デプロイ自動化',
            'カスタムActionの作成',
          ],
          resources: ['GitHub Actions公式ドキュメント'],
        },
      ],
      milestones: [
        {
          milestone: '個人プロジェクトをGitHubで管理',
          criteria: ['適切なREADME', 'ライセンス選定', '定期的なコミット'],
        },
        {
          milestone: 'OSSにコントリビュート',
          criteria: ['イシュー報告', 'バグ修正PR', 'ドキュメント改善'],
        },
        {
          milestone: 'チーム開発をリード',
          criteria: ['ブランチ戦略策定', 'PRレビュー', 'CI/CD構築'],
        },
      ],
    };
  }

  /**
   * 次のステップを提案
   */
  private getNextSteps(currentLevel: string): string[] {
    const steps: Record<string, string[]> = {
      beginner: [
        '実際にGitHubリポジトリを作成してみる',
        'README.mdに自己紹介を書く',
        '毎日コミットする習慣をつける',
        'GitHub Profileをカスタマイズする',
      ],
      intermediate: [
        'ブランチを作成して機能開発を体験',
        'プルリクエストを作成してみる',
        'GitHub Actionsで簡単なCIを設定',
        'オープンソースプロジェクトにイシューを報告',
      ],
      advanced: [
        'カスタムGitHub Actionを作成',
        '複雑なワークフローの設計',
        'OSSプロジェクトのメンテナーになる',
        'GitHub APIを使った自動化ツール開発',
      ],
    };

    return steps[currentLevel] || [];
  }

  /**
   * 学習リソースを提供
   */
  private getResources(topic: string, level: string) {
    return {
      documentation: [
        'GitHub公式ドキュメント: https://docs.github.com',
        'Pro Git Book（日本語版）: https://git-scm.com/book/ja/v2',
      ],
      tutorials: [
        'GitHub Learning Lab',
        'GitHub Skills',
        'Udemy: Git/GitHub入門コース',
      ],
      practice: [
        'GitHub Sandbox: 練習用リポジトリ',
        'First Contributions: 初めてのOSS貢献',
      ],
    };
  }

  /**
   * 理解度クイズを生成
   */
  private generateQuiz(topic: string, level: string) {
    const quizzes: Record<string, any> = {
      beginner: [
        {
          question: 'Gitで変更を記録する単位を何と言いますか？',
          options: ['コミット', 'プッシュ', 'マージ', 'クローン'],
          answer: 'コミット',
        },
        {
          question: 'GitHubとGitの違いは何ですか？',
          options: [
            'Gitはバージョン管理システム、GitHubはホスティングサービス',
            '同じもの',
            'Gitはオンライン、GitHubはオフライン',
          ],
          answer: 'Gitはバージョン管理システム、GitHubはホスティングサービス',
        },
      ],
    };

    return quizzes[level] || [];
  }

  async cleanup(): Promise<void> {
    this.log('AI GitHub Tutorial Agent cleanup completed');
  }
}
