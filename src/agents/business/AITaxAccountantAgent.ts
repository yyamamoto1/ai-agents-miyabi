import { BaseAgent } from '../base/BaseAgent';

/**
 * AI Tax Accountant (AI税理士)
 * 税務申告・節税対策の専門家
 *
 * 主な機能:
 * - 法人税・消費税・所得税の申告書作成
 * - 税務計画・節税対策提案
 * - 税制改正情報の追跡と影響分析
 * - インボイス制度対応、電子帳簿保存法対応
 * - 税務調査対応支援、質問応答書作成
 * - 国際税務（移転価格、タックスヘイブン対策税制）
 * - 相続税・贈与税シミュレーション
 */

// ========================================
// 型定義
// ========================================

interface TaxAccountantInput {
  taskType: 'tax-filing' | 'tax-planning' | 'tax-reform-analysis' | 'audit-support' | 'international-tax' | 'inheritance-planning' | 'tax-calculation';
  entityType?: 'corporation' | 'individual' | 'sole_proprietor';
  fiscalYear?: FiscalYear;
  financialData?: FinancialData;
  taxType?: TaxType;
  auditInfo?: AuditInfo;
  internationalTransaction?: InternationalTransaction;
  inheritanceInfo?: InheritanceInfo;
}

type TaxType = 'corporate_tax' | 'consumption_tax' | 'income_tax' | 'local_tax' | 'inheritance_tax' | 'gift_tax';

interface FiscalYear {
  start: Date;
  end: Date;
  year: number; // 会計年度（例: 2025年度）
}

interface FinancialData {
  revenue: number;
  expenses: ExpenseBreakdown;
  assets: number;
  liabilities: number;
  capitalGains?: number;
  dividends?: number;
  foreignIncome?: number;
}

interface ExpenseBreakdown {
  personnel: number; // 人件費
  rent: number; // 地代家賃
  utilities: number; // 水道光熱費
  communication: number; // 通信費
  travel: number; // 旅費交通費
  advertising: number; // 広告宣伝費
  entertainment: number; // 交際費
  depreciation: number; // 減価償却費
  other: number;
}

interface AuditInfo {
  auditDate: Date;
  taxOffice: string;
  auditor: string;
  focusAreas: string[];
  requestedDocuments: string[];
}

interface InternationalTransaction {
  type: 'transfer_pricing' | 'foreign_subsidiary' | 'cross_border_service';
  counterparty: string;
  country: string;
  amount: number;
  description: string;
}

interface InheritanceInfo {
  assets: AssetDetail[];
  heirs: Heir[];
  deceasedInfo?: {
    name: string;
    deathDate: Date;
    lastResidence: string;
  };
}

interface AssetDetail {
  type: 'real_estate' | 'securities' | 'cash' | 'business' | 'other';
  description: string;
  value: number;
  location?: string;
}

interface Heir {
  name: string;
  relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  share: number; // 相続割合（0-1）
}

interface TaxAccountantOutput {
  success: boolean;
  taskType: string;
  result: TaxFilingReport | TaxPlanningProposal | TaxReformAnalysis | AuditSupportGuide | InternationalTaxReport | InheritancePlan | TaxCalculation;
  timestamp: Date;
}

// 税務申告書作成
interface TaxFilingReport {
  fiscalYear: FiscalYear;
  entityType: string;
  taxReturns: TaxReturn[];
  summary: TaxSummary;
  deadlines: Deadline[];
  requiredDocuments: string[];
  submissionMethod: string[];
  warnings: Warning[];
}

interface TaxReturn {
  taxType: TaxType;
  taxableIncome: number;
  deductions: Deduction[];
  taxAmount: number;
  prepayments: number; // 予定納税・源泉徴収額
  balanceDue: number; // 納付税額 or 還付税額
  filingDeadline: Date;
  forms: TaxForm[];
}

interface Deduction {
  name: string;
  amount: number;
  category: string;
  notes: string;
}

interface TaxForm {
  formNumber: string;
  formName: string;
  required: boolean;
  data: any;
}

interface TaxSummary {
  totalTaxLiability: number;
  effectiveTaxRate: number; // 実効税率
  comparison: {
    previousYear: number;
    change: number; // 増減額
    changePercentage: number;
  };
}

interface Deadline {
  task: string;
  date: Date;
  priority: 'critical' | 'high' | 'medium';
}

interface Warning {
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendation: string;
}

// 税務計画・節税対策
interface TaxPlanningProposal {
  currentSituation: {
    estimatedTax: number;
    effectiveRate: number;
  };
  strategies: TaxStrategy[];
  projectedSavings: {
    immediate: number;
    yearOne: number;
    longTerm: number;
  };
  implementation: ImplementationPlan;
  risks: string[];
  timeline: string;
}

interface TaxStrategy {
  name: string;
  category: 'deduction' | 'credit' | 'timing' | 'structure' | 'incentive';
  description: string;
  estimatedSaving: number;
  requirements: string[];
  deadline?: Date;
  complexity: 'low' | 'medium' | 'high';
  legalBasis: string;
}

interface ImplementationPlan {
  phases: {
    phase: string;
    actions: string[];
    deadline: Date;
    responsible: string;
  }[];
  resources: string[];
  budget: string;
}

// 税制改正分析
interface TaxReformAnalysis {
  reforms: TaxReform[];
  impactAssessment: ImpactAssessment;
  actionItems: ActionItem[];
  opportunities: Opportunity[];
}

interface TaxReform {
  name: string;
  effectiveDate: Date;
  description: string;
  affectedTaxes: TaxType[];
  keyChanges: string[];
  officialSource: string;
}

interface ImpactAssessment {
  financialImpact: {
    estimated: number;
    best: number;
    worst: number;
  };
  operationalImpact: string[];
  systemChanges: string[];
}

interface ActionItem {
  task: string;
  deadline: Date;
  priority: 'critical' | 'high' | 'medium' | 'low';
  responsible: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface Opportunity {
  description: string;
  benefit: string;
  requirements: string[];
}

// 税務調査対応支援
interface AuditSupportGuide {
  auditInfo: AuditInfo;
  preparation: AuditPreparation;
  responseStrategy: ResponseStrategy;
  riskAssessment: AuditRiskAssessment;
  timeline: AuditTimeline;
}

interface AuditPreparation {
  documentsToPrep are: DocumentChecklist[];
  potentialIssues: PotentialIssue[];
  strengthPoints: string[];
  weakPoints: string[];
}

interface DocumentChecklist {
  category: string;
  documents: {
    name: string;
    status: 'ready' | 'needs_review' | 'missing';
    priority: 'high' | 'medium' | 'low';
  }[];
}

interface PotentialIssue {
  area: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  potentialAdjustment: number;
  defense: string[];
}

interface ResponseStrategy {
  generalApproach: string;
  keyMessages: string[];
  doAndDonts: {
    dos: string[];
    donts: string[];
  };
  negotiationPoints: string[];
}

interface AuditRiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  riskAreas: {
    area: string;
    risk: 'low' | 'medium' | 'high';
  }[];
  estimatedExposure: {
    best: number;
    likely: number;
    worst: number;
  };
}

interface AuditTimeline {
  phases: {
    phase: string;
    duration: string;
    milestones: string[];
  }[];
  totalDuration: string;
}

// 国際税務
interface InternationalTaxReport {
  transaction: InternationalTransaction;
  applicableRules: string[];
  transferPricingAnalysis?: TransferPricingAnalysis;
  withholdingTax: WithholdingTaxInfo;
  treatyBenefits: TreatyBenefits;
  reportingRequirements: ReportingRequirement[];
  risks: InternationalTaxRisk[];
}

interface TransferPricingAnalysis {
  method: string;
  armLengthPrice: number;
  actualPrice: number;
  adjustment: number;
  documentation: string[];
}

interface WithholdingTaxInfo {
  rate: number;
  amount: number;
  filingRequirement: string;
  deadline: Date;
}

interface TreatyBenefits {
  treaty: string;
  benefits: string[];
  requirements: string[];
  potentialSavings: number;
}

interface ReportingRequirement {
  form: string;
  description: string;
  deadline: Date;
  penaltyForNonCompliance: string;
}

interface InternationalTaxRisk {
  risk: string;
  impact: 'low' | 'medium' | 'high';
  mitigation: string[];
}

// 相続税・贈与税計画
interface InheritancePlan {
  assets: AssetSummary;
  heirs: Heir[];
  taxCalculation: InheritanceTaxCalculation;
  strategies: InheritanceStrategy[];
  distribution: DistributionPlan[];
  timeline: string;
  warnings: string[];
}

interface AssetSummary {
  totalValue: number;
  breakdown: {
    type: string;
    value: number;
    percentage: number;
  }[];
}

interface InheritanceTaxCalculation {
  totalAssets: number;
  deductions: {
    basicDeduction: number;
    debtDeduction: number;
    funeralExpenseDeduction: number;
    otherDeductions: number;
  };
  taxableAmount: number;
  taxAmount: number;
  perHeirTax: {
    heir: string;
    share: number;
    taxAmount: number;
  }[];
}

interface InheritanceStrategy {
  strategy: string;
  description: string;
  expectedSavings: number;
  requirements: string[];
  timing: string;
  risks: string[];
}

interface DistributionPlan {
  heir: string;
  assets: {
    description: string;
    value: number;
  }[];
  totalValue: number;
  share: number;
  taxBurden: number;
}

// 税額計算
interface TaxCalculation {
  taxType: TaxType;
  income: number;
  deductions: number;
  taxableIncome: number;
  calculation: {
    bracket: TaxBracket[];
    totalTax: number;
  };
  credits: number;
  finalTax: number;
  effectiveRate: number;
}

interface TaxBracket {
  range: string;
  rate: number;
  amount: number;
  tax: number;
}

// ========================================
// AITaxAccountantAgent クラス
// ========================================

export class AITaxAccountantAgent extends BaseAgent {
  constructor() {
    super(
      'AITaxAccountantAgent',
      '税務申告・節税対策の専門家として、税務計画から申告書作成まで包括的にサポートします',
      ['tax-filing', 'tax-planning', 'tax-reform-analysis', 'audit-support', 'international-tax', 'inheritance-planning', 'tax-calculation']
    );
  }

  /**
   * エージェントのセットアップ
   */
  async setup(): Promise<void> {
    this.log('AI Tax Accountant をセットアップしています...');
    // 初期化処理（税法データベース接続、最新税制情報ロード等）
    this.log('セットアップ完了');
  }

  /**
   * メイン処理
   */
  async process(input: TaxAccountantInput): Promise<TaxAccountantOutput> {
    this.log(`タスクタイプ: ${input.taskType} を処理中...`);

    let result;

    switch (input.taskType) {
      case 'tax-filing':
        if (!input.financialData || !input.fiscalYear) throw new Error('financialData と fiscalYear が必要です');
        result = await this.prepareTaxFiling(input.financialData, input.fiscalYear, input.entityType || 'corporation');
        break;

      case 'tax-planning':
        if (!input.financialData) throw new Error('financialData が必要です');
        result = await this.createTaxPlan(input.financialData, input.entityType || 'corporation');
        break;

      case 'tax-reform-analysis':
        result = await this.analyzeTaxReforms(input.fiscalYear?.year || new Date().getFullYear());
        break;

      case 'audit-support':
        if (!input.auditInfo) throw new Error('auditInfo が必要です');
        result = await this.provideAuditSupport(input.auditInfo, input.financialData);
        break;

      case 'international-tax':
        if (!input.internationalTransaction) throw new Error('internationalTransaction が必要です');
        result = await this.analyzeInternationalTax(input.internationalTransaction);
        break;

      case 'inheritance-planning':
        if (!input.inheritanceInfo) throw new Error('inheritanceInfo が必要です');
        result = await this.planInheritance(input.inheritanceInfo);
        break;

      case 'tax-calculation':
        if (!input.financialData || !input.taxType) throw new Error('financialData と taxType が必要です');
        result = await this.calculateTax(input.financialData, input.taxType);
        break;

      default:
        throw new Error(`未知のタスクタイプ: ${input.taskType}`);
    }

    return {
      success: true,
      taskType: input.taskType,
      result,
      timestamp: new Date()
    };
  }

  /**
   * クリーンアップ処理
   */
  async cleanup(): Promise<void> {
    this.log('AI Tax Accountant をクリーンアップしています...');
    // リソース解放処理
    this.log('クリーンアップ完了');
  }

  // ========================================
  // プライベートメソッド
  // ========================================

  /**
   * 税務申告書作成
   */
  private async prepareTaxFiling(
    financialData: FinancialData,
    fiscalYear: FiscalYear,
    entityType: string
  ): Promise<TaxFilingReport> {
    this.log(`${fiscalYear.year}年度の税務申告書を作成中...`);

    // 法人税計算
    const corporateTax = this.calculateCorporateTax(financialData);

    // 消費税計算
    const consumptionTax = this.calculateConsumptionTax(financialData);

    // 地方税計算
    const localTax = this.calculateLocalTax(financialData);

    const taxReturns: TaxReturn[] = [corporateTax, consumptionTax, localTax];

    return {
      fiscalYear,
      entityType,
      taxReturns,
      summary: this.createTaxSummary(taxReturns),
      deadlines: this.generateDeadlines(fiscalYear),
      requiredDocuments: [
        '法人税申告書（別表一〜十九）',
        '消費税申告書',
        '地方税申告書',
        '決算書（貸借対照表・損益計算書）',
        '勘定科目内訳明細書',
        '法人事業概況説明書'
      ],
      submissionMethod: [
        'e-Tax（電子申告）推奨',
        '税務署窓口提出',
        '郵送提出'
      ],
      warnings: this.identifyWarnings(financialData, taxReturns)
    };
  }

  /**
   * 税務計画・節税対策
   */
  private async createTaxPlan(
    financialData: FinancialData,
    entityType: string
  ): Promise<TaxPlanningProposal> {
    this.log('税務計画を作成中...');

    const currentTax = this.estimateCurrentTax(financialData);
    const strategies = this.identifyTaxStrategies(financialData, entityType);

    const totalSavings = strategies.reduce((sum, s) => sum + s.estimatedSaving, 0);

    return {
      currentSituation: {
        estimatedTax: currentTax,
        effectiveRate: (currentTax / financialData.revenue) * 100
      },
      strategies,
      projectedSavings: {
        immediate: totalSavings * 0.3,
        yearOne: totalSavings,
        longTerm: totalSavings * 3
      },
      implementation: {
        phases: [
          {
            phase: 'フェーズ1: 即時実行可能施策',
            actions: strategies.filter(s => s.complexity === 'low').map(s => s.name),
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            responsible: '経理部門'
          },
          {
            phase: 'フェーズ2: 中期施策',
            actions: strategies.filter(s => s.complexity === 'medium').map(s => s.name),
            deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            responsible: '財務部門・税理士'
          }
        ],
        resources: ['税理士', '会計ソフト', '内部リソース'],
        budget: '50-100万円（税理士報酬含む）'
      },
      risks: [
        '税務調査時の否認リスク',
        '制度変更による効果減少',
        '実行コストが想定以上'
      ],
      timeline: '6-12ヶ月'
    };
  }

  /**
   * 税制改正分析
   */
  private async analyzeTaxReforms(year: number): Promise<TaxReformAnalysis> {
    this.log(`${year}年度の税制改正を分析中...`);

    const reforms: TaxReform[] = [
      {
        name: '電子帳簿保存法の改正',
        effectiveDate: new Date('2024-01-01'),
        description: '電子取引データの電子保存義務化',
        affectedTaxes: ['corporate_tax', 'consumption_tax'],
        keyChanges: [
          '電子取引データは電子保存必須',
          '可視性・検索性の確保',
          'タイムスタンプまたは訂正削除履歴の保存'
        ],
        officialSource: 'https://www.nta.go.jp/'
      },
      {
        name: 'インボイス制度',
        effectiveDate: new Date('2023-10-01'),
        description: '適格請求書等保存方式の開始',
        affectedTaxes: ['consumption_tax'],
        keyChanges: [
          '適格請求書発行事業者の登録必須',
          '仕入税額控除の要件厳格化',
          '経過措置の適用'
        ],
        officialSource: 'https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/invoice.htm'
      }
    ];

    return {
      reforms,
      impactAssessment: {
        financialImpact: {
          estimated: 0,
          best: 0,
          worst: 500000 // システム対応コスト等
        },
        operationalImpact: [
          '会計システムの改修',
          '業務フローの見直し',
          '取引先との調整'
        ],
        systemChanges: [
          '電子帳簿保存システムの導入',
          '請求書発行システムの改修',
          'タイムスタンプ付与機能の追加'
        ]
      },
      actionItems: [
        {
          task: '適格請求書発行事業者の登録',
          deadline: new Date('2024-03-31'),
          priority: 'critical',
          responsible: '経理部',
          status: 'pending'
        },
        {
          task: '会計システムの電子帳簿保存法対応',
          deadline: new Date('2024-12-31'),
          priority: 'high',
          responsible: 'IT部門',
          status: 'in_progress'
        }
      ],
      opportunities: [
        {
          description: '電子化による業務効率化',
          benefit: '経理業務の時間削減、ペーパーレス化',
          requirements: ['システム投資', '社内教育']
        }
      ]
    };
  }

  /**
   * 税務調査対応支援
   */
  private async provideAuditSupport(
    auditInfo: AuditInfo,
    financialData?: FinancialData
  ): Promise<AuditSupportGuide> {
    this.log(`税務調査対応支援を準備中...`);

    return {
      auditInfo,
      preparation: {
        documentsToPrep are: [
          {
            category: '帳簿書類',
            documents: [
              { name: '総勘定元帳', status: 'ready', priority: 'high' },
              { name: '仕訳帳', status: 'ready', priority: 'high' },
              { name: '現金出納帳', status: 'needs_review', priority: 'medium' }
            ]
          },
          {
            category: '証憑書類',
            documents: [
              { name: '請求書・領収書', status: 'ready', priority: 'high' },
              { name: '契約書', status: 'ready', priority: 'high' },
              { name: '銀行取引明細', status: 'ready', priority: 'medium' }
            ]
          }
        ],
        potentialIssues: [
          {
            area: '交際費',
            description: '交際費の損金算入限度額超過の可能性',
            likelihood: 'medium',
            potentialAdjustment: 500000,
            defense: [
              '交際費該当性の検証',
              '会議費との区分の明確化',
              '領収書・出席者リストの整備'
            ]
          }
        ],
        strengthPoints: [
          '適切な帳簿管理',
          '証憑書類の完備',
          '税理士による事前チェック済み'
        ],
        weakPoints: [
          '一部の経費精算が遅延',
          '契約書の保管場所が分散'
        ]
      },
      responseStrategy: {
        generalApproach: '誠実かつ協力的な姿勢で対応。不明点は即答せず確認後に回答',
        keyMessages: [
          '適正な申告を心がけている',
          '指摘事項は真摯に受け止め改善する',
          '税理士と相談しながら対応している'
        ],
        doAndDonts: {
          dos: [
            '質問には正直に回答',
            '確認が必要な事項は保留して後日回答',
            '重要事項は税理士に相談',
            '全ての記録を残す'
          ],
          donts: [
            '不確かな情報で即答',
            '感情的な対応',
            '虚偽の説明',
            '調査官の要請を無視'
          ]
        },
        negotiationPoints: [
          '善意の解釈違いであることを強調',
          '今後の改善策を提示',
          '過去の事例との整合性を主張'
        ]
      },
      riskAssessment: {
        overallRisk: 'medium',
        riskAreas: [
          { area: '交際費', risk: 'medium' },
          { area: '外注費', risk: 'low' },
          { area: '減価償却', risk: 'low' }
        ],
        estimatedExposure: {
          best: 0,
          likely: 300000,
          worst: 1000000
        }
      },
      timeline: {
        phases: [
          {
            phase: '事前準備',
            duration: '1-2週間',
            milestones: ['資料準備', '論点整理', 'シミュレーション']
          },
          {
            phase: '実地調査',
            duration: '2-3日',
            milestones: ['初日: 概況確認', '2日目: 詳細調査', '3日目: まとめ']
          },
          {
            phase: '事後対応',
            duration: '1-2週間',
            milestones: ['修正申告検討', '追加資料提出', '合意形成']
          }
        ],
        totalDuration: '1-2ヶ月'
      }
    };
  }

  /**
   * 国際税務分析
   */
  private async analyzeInternationalTax(
    transaction: InternationalTransaction
  ): Promise<InternationalTaxReport> {
    this.log(`国際取引の税務分析中: ${transaction.description}`);

    return {
      transaction,
      applicableRules: [
        '移転価格税制（租税特別措置法第66条の4）',
        '外国子会社合算税制（タックスヘイブン対策税制）',
        '租税条約'
      ],
      transferPricingAnalysis: transaction.type === 'transfer_pricing' ? {
        method: '独立企業間価格算定方法（TNMM法）',
        armLengthPrice: transaction.amount,
        actualPrice: transaction.amount,
        adjustment: 0,
        documentation: [
          'ローカルファイル',
          'マスターファイル',
          '国別報告書（CbCR）'
        ]
      } : undefined,
      withholdingTax: {
        rate: 20, // 日本の非居住者への支払いに対する源泉徴収税率
        amount: transaction.amount * 0.2,
        filingRequirement: '支払調書の提出',
        deadline: new Date(new Date().getFullYear(), 0, 31) // 翌年1月31日
      },
      treatyBenefits: {
        treaty: `日本・${transaction.country}租税条約`,
        benefits: [
          '源泉徴収税率の軽減（20% → 10%）',
          '二重課税の排除'
        ],
        requirements: [
          '居住者証明書の取得',
          '租税条約届出書の提出'
        ],
        potentialSavings: transaction.amount * 0.1
      },
      reportingRequirements: [
        {
          form: '国外関連者に関する明細書',
          description: '国外関連取引の詳細を記載',
          deadline: new Date(new Date().getFullYear(), 10, 30), // 11月30日
          penaltyForNonCompliance: '30万円以下の罰金'
        }
      ],
      risks: [
        {
          risk: '移転価格課税のリスク',
          impact: 'high',
          mitigation: [
            '適切な価格算定方法の選択',
            'ローカルファイルの整備',
            '事前確認制度（APA）の活用'
          ]
        }
      ]
    };
  }

  /**
   * 相続税・贈与税計画
   */
  private async planInheritance(info: InheritanceInfo): Promise<InheritancePlan> {
    this.log('相続税計画を作成中...');

    const totalAssets = info.assets.reduce((sum, a) => sum + a.value, 0);

    // 基礎控除額: 3,000万円 + 600万円 × 法定相続人数
    const basicDeduction = 30000000 + 6000000 * info.heirs.length;

    const taxableAmount = Math.max(0, totalAssets - basicDeduction);

    // 簡易的な税額計算（実際は複雑な累進課税）
    const taxAmount = this.calculateInheritanceTax(taxableAmount, info.heirs.length);

    return {
      assets: {
        totalValue: totalAssets,
        breakdown: this.categorizeAssets(info.assets)
      },
      heirs: info.heirs,
      taxCalculation: {
        totalAssets,
        deductions: {
          basicDeduction,
          debtDeduction: 0,
          funeralExpenseDeduction: 2000000, // 標準的な葬儀費用
          otherDeductions: 0
        },
        taxableAmount,
        taxAmount,
        perHeirTax: info.heirs.map(heir => ({
          heir: heir.name,
          share: heir.share,
          taxAmount: taxAmount * heir.share
        }))
      },
      strategies: [
        {
          strategy: '生前贈与の活用',
          description: '年間110万円の贈与税非課税枠を活用した計画的な資産移転',
          expectedSavings: 5000000,
          requirements: ['毎年の贈与契約書作成', '贈与税申告'],
          timing: '10年計画',
          risks: ['相続開始前3年以内の贈与は相続財産に持ち戻し']
        },
        {
          strategy: '小規模宅地等の特例',
          description: '自宅敷地の評価額を最大80%減額',
          expectedSavings: 10000000,
          requirements: ['居住継続要件', '保有継続要件'],
          timing: '相続時',
          risks: ['要件を満たせない場合、特例適用不可']
        }
      ],
      distribution: info.heirs.map(heir => {
        const heirAssets = this.allocateAssets(info.assets, heir.share);
        const totalValue = heirAssets.reduce((sum, a) => sum + a.value, 0);
        return {
          heir: heir.name,
          assets: heirAssets,
          totalValue,
          share: heir.share,
          taxBurden: taxAmount * heir.share
        };
      }),
      timeline: '相続開始から10ヶ月以内に申告・納税',
      warnings: [
        '相続税の申告期限は相続開始を知った日から10ヶ月以内',
        '遺産分割協議が未了でも申告は必要',
        '納税資金の準備が必要（物納・延納も検討）'
      ]
    };
  }

  /**
   * 税額計算
   */
  private async calculateTax(
    financialData: FinancialData,
    taxType: TaxType
  ): Promise<TaxCalculation> {
    this.log(`${taxType}の税額を計算中...`);

    if (taxType === 'corporate_tax') {
      const income = financialData.revenue - Object.values(financialData.expenses).reduce((a, b) => a + b, 0);
      const taxableIncome = income; // 簡略化

      // 法人税の税率: 中小企業（年800万円以下15%, 超過分23.2%）
      let tax = 0;
      if (taxableIncome <= 8000000) {
        tax = taxableIncome * 0.15;
      } else {
        tax = 8000000 * 0.15 + (taxableIncome - 8000000) * 0.232;
      }

      return {
        taxType,
        income: financialData.revenue,
        deductions: Object.values(financialData.expenses).reduce((a, b) => a + b, 0),
        taxableIncome,
        calculation: {
          bracket: [
            {
              range: '0 - 8,000,000',
              rate: 15,
              amount: Math.min(taxableIncome, 8000000),
              tax: Math.min(taxableIncome, 8000000) * 0.15
            },
            {
              range: '8,000,000以上',
              rate: 23.2,
              amount: Math.max(0, taxableIncome - 8000000),
              tax: Math.max(0, taxableIncome - 8000000) * 0.232
            }
          ],
          totalTax: tax
        },
        credits: 0,
        finalTax: tax,
        effectiveRate: (tax / income) * 100
      };
    }

    // その他の税種の計算（簡略版）
    return {
      taxType,
      income: financialData.revenue,
      deductions: 0,
      taxableIncome: financialData.revenue,
      calculation: {
        bracket: [],
        totalTax: 0
      },
      credits: 0,
      finalTax: 0,
      effectiveRate: 0
    };
  }

  // ========================================
  // ヘルパーメソッド
  // ========================================

  private calculateCorporateTax(data: FinancialData): TaxReturn {
    const income = data.revenue - Object.values(data.expenses).reduce((a, b) => a + b, 0);
    let tax = 0;
    if (income <= 8000000) {
      tax = income * 0.15;
    } else {
      tax = 8000000 * 0.15 + (income - 8000000) * 0.232;
    }

    return {
      taxType: 'corporate_tax',
      taxableIncome: income,
      deductions: [],
      taxAmount: tax,
      prepayments: 0,
      balanceDue: tax,
      filingDeadline: new Date(new Date().getFullYear(), 4, 31), // 5月31日
      forms: []
    };
  }

  private calculateConsumptionTax(data: FinancialData): TaxReturn {
    const consumptionTaxRate = 0.10;
    const tax = data.revenue * consumptionTaxRate;

    return {
      taxType: 'consumption_tax',
      taxableIncome: data.revenue,
      deductions: [],
      taxAmount: tax,
      prepayments: 0,
      balanceDue: tax,
      filingDeadline: new Date(new Date().getFullYear(), 4, 31),
      forms: []
    };
  }

  private calculateLocalTax(data: FinancialData): TaxReturn {
    const income = data.revenue - Object.values(data.expenses).reduce((a, b) => a + b, 0);
    const corporateTax = income <= 8000000 ? income * 0.15 : 8000000 * 0.15 + (income - 8000000) * 0.232;
    const localTax = corporateTax * 0.104; // 地方法人税10.4%

    return {
      taxType: 'local_tax',
      taxableIncome: income,
      deductions: [],
      taxAmount: localTax,
      prepayments: 0,
      balanceDue: localTax,
      filingDeadline: new Date(new Date().getFullYear(), 4, 31),
      forms: []
    };
  }

  private createTaxSummary(taxReturns: TaxReturn[]): TaxSummary {
    const totalTax = taxReturns.reduce((sum, t) => sum + t.taxAmount, 0);
    return {
      totalTaxLiability: totalTax,
      effectiveTaxRate: 30, // 簡略化
      comparison: {
        previousYear: totalTax * 0.95,
        change: totalTax * 0.05,
        changePercentage: 5
      }
    };
  }

  private generateDeadlines(fiscalYear: FiscalYear): Deadline[] {
    const yearEnd = fiscalYear.end;
    return [
      {
        task: '法人税申告',
        date: new Date(yearEnd.getFullYear(), yearEnd.getMonth() + 2, yearEnd.getDate()),
        priority: 'critical'
      },
      {
        task: '消費税申告',
        date: new Date(yearEnd.getFullYear(), yearEnd.getMonth() + 2, yearEnd.getDate()),
        priority: 'critical'
      }
    ];
  }

  private identifyWarnings(data: FinancialData, taxReturns: TaxReturn[]): Warning[] {
    const warnings: Warning[] = [];

    // 交際費チェック
    if (data.expenses.entertainment > 8000000) {
      warnings.push({
        severity: 'high',
        message: '交際費が損金算入限度額を超過しています',
        recommendation: '超過分は損金不算入となるため、別表加算が必要です'
      });
    }

    return warnings;
  }

  private estimateCurrentTax(data: FinancialData): number {
    const income = data.revenue - Object.values(data.expenses).reduce((a, b) => a + b, 0);
    if (income <= 8000000) {
      return income * 0.15;
    }
    return 8000000 * 0.15 + (income - 8000000) * 0.232;
  }

  private identifyTaxStrategies(data: FinancialData, entityType: string): TaxStrategy[] {
    return [
      {
        name: '中小企業投資促進税制の活用',
        category: 'credit',
        description: '設備投資に対する税額控除（7%）または特別償却（30%）',
        estimatedSaving: 700000,
        requirements: ['対象設備の購入', '明細書の添付'],
        complexity: 'medium',
        legalBasis: '租税特別措置法第42条の6'
      },
      {
        name: '役員報酬の適正化',
        category: 'deduction',
        description: '定期同額給与による損金算入の最適化',
        estimatedSaving: 500000,
        requirements: ['定款変更', '株主総会決議'],
        complexity: 'low',
        legalBasis: '法人税法第34条'
      },
      {
        name: '欠損金の繰越控除',
        category: 'deduction',
        description: '過去の赤字を当期の所得から控除',
        estimatedSaving: 1000000,
        requirements: ['青色申告', '帳簿保存'],
        complexity: 'low',
        legalBasis: '法人税法第57条'
      }
    ];
  }

  private calculateInheritanceTax(taxableAmount: number, heirCount: number): number {
    // 簡易計算（実際は累進課税率表を使用）
    if (taxableAmount <= 10000000) return taxableAmount * 0.10;
    if (taxableAmount <= 30000000) return 10000000 * 0.10 + (taxableAmount - 10000000) * 0.15;
    if (taxableAmount <= 50000000) return 10000000 * 0.10 + 20000000 * 0.15 + (taxableAmount - 30000000) * 0.20;
    return 10000000 * 0.10 + 20000000 * 0.15 + 20000000 * 0.20 + (taxableAmount - 50000000) * 0.30;
  }

  private categorizeAssets(assets: AssetDetail[]): { type: string; value: number; percentage: number }[] {
    const total = assets.reduce((sum, a) => sum + a.value, 0);
    const categorized = assets.reduce((acc, asset) => {
      const existing = acc.find(item => item.type === asset.type);
      if (existing) {
        existing.value += asset.value;
      } else {
        acc.push({ type: asset.type, value: asset.value, percentage: 0 });
      }
      return acc;
    }, [] as { type: string; value: number; percentage: number }[]);

    categorized.forEach(item => {
      item.percentage = (item.value / total) * 100;
    });

    return categorized;
  }

  private allocateAssets(assets: AssetDetail[], share: number): { description: string; value: number }[] {
    return assets.map(asset => ({
      description: asset.description,
      value: asset.value * share
    }));
  }
}
