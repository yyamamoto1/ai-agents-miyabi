import { BaseAgent, AgentTask, AgentConfig } from '../../core/BaseAgent.js';

/**
 * AIProgrammingLanguageTutor
 * あらゆるプログラミング言語の学習をサポートする教育エージェント
 */

export interface ProgrammingTutorTaskInput {
  taskType: 'syntax-teaching' | 'best-practices' | 'code-review' | 'concept-explanation' | 'algorithm-teaching' | 'debugging-help' | 'roadmap';
  language: string; // 'python', 'javascript', 'typescript', 'go', 'rust', 'java', 'cpp', etc.
  level?: 'beginner' | 'intermediate' | 'advanced';
  topic?: string;
  code?: string; // For code review or debugging
  specificQuestion?: string;
  learningGoal?: string;
}

export interface ProgrammingTutorTaskOutput {
  success: boolean;
  data: {
    explanation?: LanguageExplanation;
    bestPractices?: BestPractice[];
    review?: CodeReview;
    concept?: ConceptExplanation;
    algorithm?: AlgorithmGuide;
    debuggingSuggestion?: DebuggingSuggestion;
    roadmap?: LanguageRoadmap;
    exercises?: Exercise[];
    resources?: LearningResource[];
  };
  metadata: {
    language: string;
    taskType: string;
    level: string;
    generatedAt: string;
  };
}

interface LanguageExplanation {
  language: string;
  topic: string;
  overview: string;
  syntax: SyntaxExample[];
  commonPatterns: Pattern[];
  pitfalls: string[];
  practiceExercises: string[];
}

interface SyntaxExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
  output?: string;
  variations?: string[];
}

interface Pattern {
  name: string;
  description: string;
  example: string;
  whenToUse: string[];
}

interface BestPractice {
  category: string;
  principle: string;
  description: string;
  goodExample: string;
  badExample: string;
  reasoning: string;
  relatedPrinciples: string[];
}

interface CodeReview {
  originalCode: string;
  language: string;
  overallScore: number; // 1-10
  strengths: string[];
  issues: Issue[];
  improvedCode: string;
  learningPoints: string[];
}

interface Issue {
  severity: 'critical' | 'major' | 'minor' | 'suggestion';
  category: string;
  description: string;
  lineNumber?: number;
  suggestion: string;
  example?: string;
}

interface ConceptExplanation {
  concept: string;
  language: string;
  explanation: string;
  importance: string;
  prerequisites: string[];
  examples: ConceptExample[];
  commonMisconceptions: string[];
  practicalApplications: string[];
  relatedConcepts: string[];
}

interface ConceptExample {
  scenario: string;
  code: string;
  stepByStep: string[];
  visualization?: string;
}

interface AlgorithmGuide {
  algorithmName: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  whenToUse: string[];
  implementation: LanguageImplementation[];
  visualExplanation: string;
  practiceProblems: string[];
}

interface LanguageImplementation {
  language: string;
  code: string;
  explanation: string;
  optimizations?: string[];
}

interface DebuggingSuggestion {
  originalCode: string;
  language: string;
  identifiedIssues: DebugIssue[];
  debuggingSteps: string[];
  fixedCode: string;
  preventionTips: string[];
}

interface DebugIssue {
  type: string;
  description: string;
  location: string;
  impact: string;
  fix: string;
}

interface LanguageRoadmap {
  language: string;
  title: string;
  totalDuration: string;
  prerequisites: string[];
  phases: LearningPhase[];
  milestones: Milestone[];
  projects: ProjectSuggestion[];
  careerPaths: string[];
}

interface LearningPhase {
  phase: number;
  name: string;
  duration: string;
  topics: string[];
  skills: string[];
  projects: string[];
  resources: string[];
}

interface Milestone {
  name: string;
  description: string;
  skills: string[];
  assessment: string;
}

interface ProjectSuggestion {
  name: string;
  difficulty: string;
  description: string;
  skills: string[];
  estimatedTime: string;
}

interface Exercise {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  requirements: string[];
  hints: string[];
  testCases?: TestCase[];
  solution?: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

interface LearningResource {
  type: 'documentation' | 'tutorial' | 'course' | 'book' | 'video' | 'tool';
  title: string;
  description: string;
  url?: string;
  level: string;
}

export class AIProgrammingLanguageTutor extends BaseAgent {
  private languageKnowledge: Map<string, any>;

  constructor() {
    const config: AgentConfig = {
      name: 'AI Programming Language Tutor',
      role: 'プログラミング言語教育の専門家',
      category: 'education',
      description: 'あらゆるプログラミング言語の学習をサポート。構文、ベストプラクティス、コードレビュー、アルゴリズム教育を提供',
      capabilities: [
        '多言語対応（Python, JavaScript, TypeScript, Go, Rust, Java, C++等）',
        '構文とパターンの教育',
        'コードレビューとフィードバック',
        'アルゴリズムとデータ構造の解説',
        'デバッグ支援',
        '学習ロードマップ作成',
      ],
    };
    super(config);
    this.languageKnowledge = new Map();
  }

  protected async setup(): Promise<void> {
    this.log('AIProgrammingLanguageTutor初期化中...');
    await this.initializeLanguageKnowledge();
    this.log('AIProgrammingLanguageTutor初期化完了');
  }

  protected async process(task: AgentTask): Promise<ProgrammingTutorTaskOutput> {
    const input = task.input as ProgrammingTutorTaskInput;

    this.log(`プログラミング教育タスク処理開始: ${input.language} - ${input.taskType}`);

    try {
      let result: any;

      switch (input.taskType) {
        case 'syntax-teaching':
          result = await this.teachSyntax(input);
          break;
        case 'best-practices':
          result = await this.provideBestPractices(input);
          break;
        case 'code-review':
          result = await this.reviewCode(input);
          break;
        case 'concept-explanation':
          result = await this.explainConcept(input);
          break;
        case 'algorithm-teaching':
          result = await this.teachAlgorithm(input);
          break;
        case 'debugging-help':
          result = await this.helpDebugging(input);
          break;
        case 'roadmap':
          result = await this.generateRoadmap(input);
          break;
        default:
          throw new Error(`未対応のタスクタイプ: ${input.taskType}`);
      }

      return {
        success: true,
        data: result,
        metadata: {
          language: input.language,
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
    this.log('AIProgrammingLanguageTutorクリーンアップ');
    this.languageKnowledge.clear();
  }

  private async initializeLanguageKnowledge(): Promise<void> {
    // 主要プログラミング言語の特徴を登録
    this.languageKnowledge.set('languages', {
      python: {
        paradigm: ['オブジェクト指向', '手続き型', '関数型'],
        typing: '動的型付け',
        useCases: ['Web開発', 'データサイエンス', '機械学習', '自動化'],
        difficulty: '初級',
      },
      javascript: {
        paradigm: ['イベント駆動', 'プロトタイプベース', '関数型'],
        typing: '動的型付け',
        useCases: ['Web開発', 'フロントエンド', 'Node.js', 'フルスタック'],
        difficulty: '初級〜中級',
      },
      typescript: {
        paradigm: ['オブジェクト指向', '静的型付け'],
        typing: '静的型付け',
        useCases: ['大規模Web開発', 'エンタープライズアプリ'],
        difficulty: '中級',
      },
      go: {
        paradigm: ['並行処理', 'シンプル設計'],
        typing: '静的型付け',
        useCases: ['Webサーバー', 'マイクロサービス', 'CLIツール'],
        difficulty: '中級',
      },
      rust: {
        paradigm: ['システムプログラミング', '安全性重視'],
        typing: '静的型付け（強力）',
        useCases: ['システムソフトウェア', 'WebAssembly', 'パフォーマンス重視'],
        difficulty: '上級',
      },
    });
  }

  private async teachSyntax(input: ProgrammingTutorTaskInput): Promise<{ explanation: LanguageExplanation; exercises: Exercise[] }> {
    const { language, topic, level } = input;

    // 言語別の構文教育コンテンツ
    const syntaxGuides: Record<string, any> = {
      python: {
        variables: {
          language: 'Python',
          topic: '変数とデータ型',
          overview: 'Pythonは動的型付け言語で、変数宣言時に型を指定する必要がありません。代入時に自動的に型が決まります。',
          syntax: [
            {
              title: '変数の宣言と代入',
              description: 'Pythonでは変数名 = 値の形式で変数を宣言します',
              code: `# 整数
age = 25

# 浮動小数点数
price = 19.99

# 文字列
name = "太郎"

# ブール値
is_active = True

# 複数の変数を同時に代入
x, y, z = 10, 20, 30`,
              explanation: '変数名は小文字とアンダースコアを使うのが慣例（snake_case）',
              output: '変数が作成され、値が格納されます',
            },
            {
              title: 'データ型の確認',
              description: 'type()関数で変数の型を確認できます',
              code: `age = 25
print(type(age))  # <class 'int'>

name = "太郎"
print(type(name))  # <class 'str'>`,
              explanation: 'Pythonは実行時に型を判定するため、同じ変数に異なる型を再代入できます',
            },
          ],
          commonPatterns: [
            {
              name: 'スワップ（値の交換）',
              description: 'Pythonでは一時変数なしで2つの変数の値を交換できます',
              example: `a, b = 10, 20
a, b = b, a  # Pythonic way
print(a, b)  # 20 10`,
              whenToUse: ['値の交換', '配列の要素入れ替え'],
            },
          ],
          pitfalls: [
            '変数名にキーワード（if, for, class等）は使えない',
            'Pythonは大文字小文字を区別する（name と Name は別の変数）',
            'グローバル変数と関数内のローカル変数の混同',
          ],
          practiceExercises: [
            '3つの変数（name, age, city）を作成し、自己紹介文を出力',
            '2つの数値を交換するプログラム',
            '異なるデータ型（int, float, str, list）の変数を作成し、それぞれの型を出力',
          ],
        },
        functions: {
          language: 'Python',
          topic: '関数の定義と使用',
          overview: '関数は再利用可能なコードブロックで、defキーワードで定義します',
          syntax: [
            {
              title: '基本的な関数',
              description: 'def キーワードで関数を定義',
              code: `def greet(name):
    """挨拶を返す関数"""
    return f"こんにちは、{name}さん！"

# 関数の呼び出し
message = greet("太郎")
print(message)  # こんにちは、太郎さん！`,
              explanation: 'ドックストリング（"""で囲まれた部分）は関数の説明を記述',
            },
            {
              title: 'デフォルト引数',
              description: '引数にデフォルト値を設定できます',
              code: `def power(base, exponent=2):
    """べき乗を計算（デフォルトは2乗）"""
    return base ** exponent

print(power(5))      # 25 (5^2)
print(power(5, 3))   # 125 (5^3)`,
              explanation: 'デフォルト引数は省略可能。呼び出し時に指定しなければデフォルト値が使われる',
            },
            {
              title: '可変長引数',
              description: '*args と **kwargs で任意の数の引数を受け取れます',
              code: `def sum_all(*numbers):
    """すべての数値の合計を返す"""
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # 15

def print_info(**kwargs):
    """キーワード引数を表示"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="太郎", age=25, city="東京")`,
              explanation: '*argsはタプル、**kwargsは辞書として受け取られます',
            },
          ],
          commonPatterns: [
            {
              name: 'ラムダ関数',
              description: '1行の無名関数を定義',
              example: `# 通常の関数
def square(x):
    return x ** 2

# ラムダ関数
square_lambda = lambda x: x ** 2

# sortのキーとして使用
users = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
sorted_users = sorted(users, key=lambda u: u['age'])`,
              whenToUse: ['短い処理', 'sortやfilterのキー関数', 'map関数'],
            },
          ],
          pitfalls: [
            'デフォルト引数にミュータブルな値（リストや辞書）を使うとバグの原因に',
            '関数内でglobal変数を変更する際はglobalキーワードが必要',
          ],
          practiceExercises: [
            '2つの数値を受け取り、和・差・積・商を返す関数を作成',
            '可変長引数で複数の数値の平均を計算する関数',
            'ラムダ関数で文字列リストを長さでソート',
          ],
        },
      },
      javascript: {
        variables: {
          language: 'JavaScript',
          topic: '変数宣言（let, const, var）',
          overview: 'JavaScriptにはvar、let、constの3つの変数宣言方法があります。モダンなコードではletとconstを使います。',
          syntax: [
            {
              title: 'let, const, var の違い',
              description: '変数のスコープと再代入の可否',
              code: `// const: 再代入不可、ブロックスコープ
const PI = 3.14159;
// PI = 3.14; // エラー！

// let: 再代入可能、ブロックスコープ
let age = 25;
age = 26; // OK

// var: 再代入可能、関数スコープ（非推奨）
var oldStyle = "使わない";`,
              explanation: '基本的にconstを使い、再代入が必要な場合のみletを使用。varは使わない。',
            },
            {
              title: 'データ型',
              description: 'JavaScriptの基本的なデータ型',
              code: `// プリミティブ型
const num = 42;              // Number
const str = "Hello";         // String
const bool = true;           // Boolean
const nothing = null;        // Null
let notDefined;              // Undefined
const sym = Symbol("id");    // Symbol
const bigNum = 123n;         // BigInt

// オブジェクト型
const arr = [1, 2, 3];
const obj = { name: "太郎", age: 25 };
const func = function() {};`,
              explanation: 'typeof演算子で型を確認できます',
            },
          ],
          commonPatterns: [
            {
              name: '分割代入',
              description: '配列やオブジェクトから値を取り出す',
              example: `// 配列の分割代入
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// オブジェクトの分割代入
const user = { name: "太郎", age: 25, city: "東京" };
const { name, age } = user;`,
              whenToUse: ['関数の戻り値', 'プロパティの取得', 'React等のフレームワーク'],
            },
          ],
          pitfalls: [
            'constはオブジェクトや配列の中身は変更可能（参照の再代入だけ不可）',
            'var のホイスティング（巻き上げ）による予期しない動作',
            'グローバルスコープでのvar使用は名前空間を汚染',
          ],
          practiceExercises: [
            'ユーザー情報オブジェクトを作成し、分割代入で取得',
            '配列の最初と最後の要素を分割代入で取得',
            'constで宣言したオブジェクトのプロパティを変更',
          ],
        },
      },
      typescript: {
        types: {
          language: 'TypeScript',
          topic: '型システムの基礎',
          overview: 'TypeScriptはJavaScriptに静的型付けを追加した言語です',
          syntax: [
            {
              title: '基本的な型アノテーション',
              description: '変数に型を明示的に指定',
              code: `// プリミティブ型
let age: number = 25;
let name: string = "太郎";
let isActive: boolean = true;

// 配列
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// タプル
let tuple: [string, number] = ["age", 25];

// any（型チェックをスキップ - 非推奨）
let anything: any = "文字列";
anything = 123; // OK but not recommended`,
              explanation: '型推論があるため、多くの場合型アノテーションは省略可能',
            },
            {
              title: 'インターフェースと型エイリアス',
              description: 'カスタム型の定義',
              code: `// Interface
interface User {
  name: string;
  age: number;
  email?: string; // オプショナル
}

// Type Alias
type ID = string | number;
type Status = "active" | "inactive" | "pending";

const user: User = {
  name: "太郎",
  age: 25,
};

const userId: ID = "user_123";
const status: Status = "active";`,
              explanation: 'InterfaceとTypeの使い分けは状況による。Interfaceは拡張が容易',
            },
            {
              title: 'ジェネリクス',
              description: '型パラメータを使った汎用的な関数・クラス',
              code: `// ジェネリック関数
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("Hello");

// ジェネリックインターフェース
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "text" };`,
              explanation: 'ジェネリクスにより型安全性を保ちながら汎用的なコードを書ける',
            },
          ],
          commonPatterns: [
            {
              name: 'Union Types',
              description: '複数の型を許容',
              example: `type Result = Success | Error;
type ID = string | number;

function printId(id: ID) {
  console.log(id);
}

printId(123);
printId("abc-123");`,
              whenToUse: ['複数の型を受け入れる関数', 'APIレスポンスの型定義'],
            },
          ],
          pitfalls: [
            'any の多用は型安全性を失う',
            '型アサーション（as）の誤用',
            'strict モードを有効にしないと型チェックが緩い',
          ],
          practiceExercises: [
            'User インターフェースを定義し、ユーザー配列を作成',
            'ジェネリック関数で配列の最初の要素を返す first<T> 関数を作成',
            'Union Typesで成功・エラーを表現する Result 型を定義',
          ],
        },
      },
    };

    // 指定された言語とトピックに基づいてコンテンツを取得
    const guide = syntaxGuides[language.toLowerCase()]?.[topic || 'variables'] || syntaxGuides.python.variables;

    // 練習問題を生成
    const exercises: Exercise[] = guide.practiceExercises.map((ex: string, index: number) => ({
      id: `${language}-${topic}-${index + 1}`,
      title: ex,
      difficulty: level || 'beginner',
      description: ex,
      requirements: ['基本的な構文の理解'],
      hints: ['ドキュメントを参照', 'エラーメッセージを確認'],
    }));

    return {
      explanation: guide,
      exercises,
    };
  }

  private async provideBestPractices(input: ProgrammingTutorTaskInput): Promise<{ bestPractices: BestPractice[] }> {
    const { language } = input;

    const practices: Record<string, BestPractice[]> = {
      python: [
        {
          category: 'コーディングスタイル',
          principle: 'PEP 8に従う',
          description: 'Pythonの公式スタイルガイドPEP 8に従うことで、読みやすく一貫性のあるコードを書く',
          goodExample: `# Good: snake_case、適切なスペース
def calculate_total_price(items, tax_rate):
    total = sum(item.price for item in items)
    return total * (1 + tax_rate)`,
          badExample: `# Bad: camelCase、スペース不足
def calculateTotalPrice(items,tax_rate):
    total=sum(item.price for item in items)
    return total*(1+tax_rate)`,
          reasoning: 'Pythonコミュニティ標準に従うことで、他の開発者が読みやすくなる',
          relatedPrinciples: ['可読性', '一貫性'],
        },
        {
          category: 'データ構造',
          principle: 'リスト内包表記を活用',
          description: 'forループよりもリスト内包表記を使うことで、簡潔で読みやすいコードになる',
          goodExample: `# Good: リスト内包表記
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]`,
          badExample: `# Bad: 冗長なforループ
squares = []
for x in range(10):
    squares.append(x**2)`,
          reasoning: 'より Pythonic で、パフォーマンスも良い',
          relatedPrinciples: ['簡潔性', 'Pythonic'],
        },
        {
          category: 'エラーハンドリング',
          principle: 'EAFP（許可より寛容を求める）',
          description: 'Pythonでは事前チェックより例外処理を使う',
          goodExample: `# Good: EAFP
try:
    value = my_dict[key]
except KeyError:
    value = default_value`,
          badExample: `# Bad: LBYL (Look Before You Leap)
if key in my_dict:
    value = my_dict[key]
else:
    value = default_value`,
          reasoning: 'EAFPはより Pythonic で、競合状態を回避できる',
          relatedPrinciples: ['Pythonic', '例外処理'],
        },
      ],
      javascript: [
        {
          category: '変数宣言',
          principle: 'const を優先、必要なら let、var は使わない',
          description: '再代入が不要ならconst、必要ならletを使う',
          goodExample: `// Good
const MAX_USERS = 100;
let count = 0;
count++;`,
          badExample: `// Bad
var MAX_USERS = 100;
var count = 0;
count++;`,
          reasoning: 'constは意図しない再代入を防ぎ、letはブロックスコープで予測可能',
          relatedPrinciples: ['イミュータビリティ', 'スコープ'],
        },
        {
          category: '非同期処理',
          principle: 'async/await を使う',
          description: 'Promiseチェーンよりasync/awaitの方が読みやすい',
          goodExample: `// Good: async/await
async function fetchUserData(userId) {
  try {
    const user = await fetch(\`/api/users/\${userId}\`);
    const data = await user.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}`,
          badExample: `// Bad: Promise chain
function fetchUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(user => user.json())
    .then(data => data)
    .catch(error => console.error("Error:", error));
}`,
          reasoning: 'async/awaitは同期的な見た目で非同期処理を書け、エラーハンドリングも直感的',
          relatedPrinciples: ['可読性', 'エラーハンドリング'],
        },
      ],
      typescript: [
        {
          category: '型安全性',
          principle: 'any を避ける',
          description: 'anyは型チェックを無効化するため、極力避ける',
          goodExample: `// Good: 適切な型定義
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User | null {
  // ...
}`,
          badExample: `// Bad: any の使用
function getUser(id: any): any {
  // ...
}`,
          reasoning: 'anyは TypeScript の利点を失う。unknown や適切な型を使う',
          relatedPrinciples: ['型安全性', 'バグ予防'],
        },
        {
          category: '型定義',
          principle: 'strictモードを有効にする',
          description: 'tsconfig.json で strict: true にする',
          goodExample: `// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}`,
          badExample: `// tsconfig.json
{
  "compilerOptions": {
    "strict": false
  }
}`,
          reasoning: 'strictモードで多くのバグを事前に検出できる',
          relatedPrinciples: ['型安全性', '品質保証'],
        },
      ],
    };

    return {
      bestPractices: practices[language.toLowerCase()] || practices.python,
    };
  }

  private async reviewCode(input: ProgrammingTutorTaskInput): Promise<{ review: CodeReview }> {
    const { code, language } = input;

    if (!code) {
      throw new Error('コードレビューにはコードが必要です');
    }

    // 簡易的なコードレビュー（実際はより詳細な分析が必要）
    const issues: Issue[] = [];

    // 共通的なコードスメルをチェック
    if (code.length > 1000) {
      issues.push({
        severity: 'suggestion',
        category: 'コードの長さ',
        description: 'コードが長すぎます（1000文字以上）',
        suggestion: '関数やクラスに分割することを検討してください',
      });
    }

    if (language.toLowerCase() === 'python') {
      if (code.includes('import *')) {
        issues.push({
          severity: 'major',
          category: 'インポート',
          description: 'ワイルドカードインポートが使用されています',
          suggestion: '必要なモジュールのみを明示的にインポートしてください',
          example: 'from module import specific_function',
        });
      }
    }

    const review: CodeReview = {
      originalCode: code,
      language,
      overallScore: 7, // 仮のスコア
      strengths: [
        'コードが明確に構造化されている',
        '適切な変数名が使用されている',
      ],
      issues,
      improvedCode: code, // 実際は改善版を生成
      learningPoints: [
        '関数は1つの責任を持つべき（Single Responsibility Principle）',
        'コメントは「なぜ」を説明し、「何を」はコード自体が説明すべき',
      ],
    };

    return { review };
  }

  private async explainConcept(input: ProgrammingTutorTaskInput): Promise<{ concept: ConceptExplanation }> {
    const { language, topic } = input;

    // 概念の説明例
    const concepts: Record<string, any> = {
      'python-closure': {
        concept: 'クロージャ（Closure）',
        language: 'Python',
        explanation: 'クロージャは、関数が定義されたスコープの変数を、その関数が実行される時に参照できる仕組みです。内部関数が外部関数のローカル変数を「記憶」します。',
        importance: '状態を持つ関数を作成でき、デコレータやファクトリパターンに活用できます',
        prerequisites: ['関数の基礎', 'スコープの理解', '内部関数'],
        examples: [
          {
            scenario: 'カウンターの作成',
            code: `def make_counter():
    count = 0  # 外部関数のローカル変数

    def increment():
        nonlocal count  # 外部変数を変更するためnonlocal宣言
        count += 1
        return count

    return increment

# 使用例
counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3`,
            stepByStep: [
              'make_counter() が呼ばれ、count = 0 が作成される',
              '内部関数 increment が定義される（この時点で count を参照）',
              'increment 関数が返される',
              'counter() を呼ぶたびに、記憶されている count が更新される',
            ],
          },
        ],
        commonMisconceptions: [
          'クロージャは関数のコピーを作るわけではない',
          'すべての内部関数がクロージャではない（外部変数を参照する場合のみ）',
        ],
        practicalApplications: [
          'デコレータの実装',
          'コールバック関数',
          'イベントハンドラ',
        ],
        relatedConcepts: ['スコープ', 'デコレータ', 'ファーストクラス関数'],
      },
    };

    const key = `${language.toLowerCase()}-${topic}`;
    const concept = concepts[key] || {
      concept: topic || '指定された概念',
      language,
      explanation: 'この概念について詳しく説明します...',
      importance: '重要な概念です',
      prerequisites: [],
      examples: [],
      commonMisconceptions: [],
      practicalApplications: [],
      relatedConcepts: [],
    };

    return { concept };
  }

  private async teachAlgorithm(input: ProgrammingTutorTaskInput): Promise<{ algorithm: AlgorithmGuide }> {
    const { topic } = input;

    // アルゴリズムガイドの例
    const algorithms: Record<string, AlgorithmGuide> = {
      'binary-search': {
        algorithmName: '二分探索（Binary Search）',
        description: 'ソート済み配列から目的の値を効率的に検索するアルゴリズム',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1) - 反復的実装、O(log n) - 再帰的実装',
        whenToUse: [
          'ソート済みの配列で検索する場合',
          '大量のデータから高速に検索したい場合',
          '範囲検索（最初の出現、最後の出現）',
        ],
        implementation: [
          {
            language: 'Python',
            code: `def binary_search(arr, target):
    """二分探索の実装（反復版）"""
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # 見つかった
        elif arr[mid] < target:
            left = mid + 1  # 右半分を探索
        else:
            right = mid - 1  # 左半分を探索

    return -1  # 見つからなかった

# 使用例
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
result = binary_search(numbers, 7)
print(f"インデックス: {result}")  # インデックス: 3`,
            explanation: '配列を半分ずつ分割して探索範囲を狭めていく',
          },
          {
            language: 'JavaScript',
            code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 使用例
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
const result = binarySearch(numbers, 7);
console.log(\`インデックス: \${result}\`);`,
            explanation: 'Python版と同じロジックをJavaScriptで実装',
          },
        ],
        visualExplanation: `
配列: [1, 3, 5, 7, 9, 11, 13, 15]、目標: 7

Step 1: left=0, right=7, mid=3 → arr[3]=7 ✓ 見つかった！

もし目標が11の場合:
Step 1: left=0, right=7, mid=3 → arr[3]=7 < 11、右半分へ
Step 2: left=4, right=7, mid=5 → arr[5]=11 ✓ 見つかった！
`,
        practiceProblems: [
          'LeetCode 704: Binary Search',
          'LeetCode 35: Search Insert Position',
          'LeetCode 34: Find First and Last Position of Element in Sorted Array',
        ],
      },
    };

    return {
      algorithm: algorithms[topic || 'binary-search'] || algorithms['binary-search'],
    };
  }

  private async helpDebugging(input: ProgrammingTutorTaskInput): Promise<{ debuggingSuggestion: DebuggingSuggestion }> {
    const { code, language } = input;

    if (!code) {
      throw new Error('デバッグにはコードが必要です');
    }

    const issues: DebugIssue[] = [
      {
        type: '構文エラー',
        description: 'セミコロンや括弧の不一致',
        location: '行 5',
        impact: 'コードが実行できません',
        fix: '括弧やセミコロンを確認してください',
      },
    ];

    const suggestion: DebuggingSuggestion = {
      originalCode: code,
      language,
      identifiedIssues: issues,
      debuggingSteps: [
        'エラーメッセージを注意深く読む',
        'エラーが発生した行番号を確認',
        'print/console.logでデバッグ出力',
        'デバッガーを使ってステップ実行',
      ],
      fixedCode: code, // 実際は修正版を生成
      preventionTips: [
        'リンターを使用する',
        'テストを書く',
        'コードレビューを受ける',
      ],
    };

    return { debuggingSuggestion: suggestion };
  }

  private async generateRoadmap(input: ProgrammingTutorTaskInput): Promise<{ roadmap: LanguageRoadmap }> {
    const { language } = input;

    const roadmaps: Record<string, LanguageRoadmap> = {
      python: {
        language: 'Python',
        title: 'Python学習ロードマップ',
        totalDuration: '3-6ヶ月（初心者から中級者まで）',
        prerequisites: [
          '基本的なコンピュータ操作',
          'テキストエディタの使用',
        ],
        phases: [
          {
            phase: 1,
            name: 'Python基礎',
            duration: '4-6週間',
            topics: [
              '変数とデータ型',
              '制御構文（if, for, while）',
              '関数の定義と使用',
              'リスト、辞書、タプル',
              'ファイル操作',
            ],
            skills: [
              '基本的なプログラムが書ける',
              'データを操作できる',
              '関数を作成できる',
            ],
            projects: [
              '電卓プログラム',
              'ToDoリストCLI',
              '簡易テキスト分析ツール',
            ],
            resources: [
              'Python公式チュートリアル',
              'Real Python',
              'Codecademy Python Course',
            ],
          },
          {
            phase: 2,
            name: 'オブジェクト指向とモジュール',
            duration: '3-4週間',
            topics: [
              'クラスとオブジェクト',
              '継承とポリモーフィズム',
              'モジュールとパッケージ',
              '例外処理',
              'デコレータ',
            ],
            skills: [
              'OOPでコードを設計できる',
              'サードパーティライブラリを使える',
              'エラーハンドリングができる',
            ],
            projects: [
              '図書館管理システム',
              'Webスクレイピングツール',
              'APIクライアント',
            ],
            resources: [
              'Python OOP Tutorial',
              'Effective Python',
            ],
          },
          {
            phase: 3,
            name: '実践的な開発',
            duration: '6-8週間',
            topics: [
              'Webフレームワーク（Flask/Django）',
              'データベース（SQL）',
              'テスト（unittest, pytest）',
              'Git/GitHub',
              'デプロイメント',
            ],
            skills: [
              'Webアプリを作成できる',
              'データベースを操作できる',
              'チーム開発ができる',
            ],
            projects: [
              'ブログアプリケーション',
              'REST API',
              'データ分析プロジェクト',
            ],
            resources: [
              'Flask公式ドキュメント',
              'Django Girls Tutorial',
              'Test-Driven Development with Python',
            ],
          },
        ],
        milestones: [
          {
            name: 'Python基礎マスター',
            description: '基本的な構文とデータ構造を理解',
            skills: ['変数', '制御構文', '関数', 'データ構造'],
            assessment: '簡単なCLIアプリケーションを作成できる',
          },
          {
            name: 'Pythonista',
            description: 'OOPと実践的なライブラリ使用',
            skills: ['クラス設計', 'ライブラリ活用', 'エラーハンドリング'],
            assessment: '小規模なプロジェクトを完成できる',
          },
          {
            name: 'Python開発者',
            description: '実務レベルのアプリケーション開発',
            skills: ['Webフレームワーク', 'DB操作', 'テスト', 'デプロイ'],
            assessment: 'Webアプリケーションを本番環境にデプロイできる',
          },
        ],
        projects: [
          {
            name: 'コマンドラインToDoアプリ',
            difficulty: '初級',
            description: 'タスクの追加・削除・表示機能を持つCLIツール',
            skills: ['ファイル操作', 'リスト操作', '関数'],
            estimatedTime: '1週間',
          },
          {
            name: 'Webスクレイピングツール',
            difficulty: '中級',
            description: 'BeautifulSoupでWebページから情報を抽出',
            skills: ['HTTP', 'HTML解析', 'データ保存'],
            estimatedTime: '2週間',
          },
          {
            name: 'FlaskブログアプリDjango',
            difficulty: '中級〜上級',
            description: '認証、投稿、コメント機能を持つブログ',
            skills: ['Webフレームワーク', 'データベース', '認証'],
            estimatedTime: '4-6週間',
          },
        ],
        careerPaths: [
          'Webバックエンド開発者',
          'データサイエンティスト',
          '機械学習エンジニア',
          '自動化エンジニア',
          'DevOpsエンジニア',
        ],
      },
    };

    return {
      roadmap: roadmaps[language.toLowerCase()] || roadmaps.python,
    };
  }
}
