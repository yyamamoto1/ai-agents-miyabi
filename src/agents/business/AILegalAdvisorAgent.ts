import { BaseAgent } from '../base/BaseAgent';

/**
 * AI Legal Advisor
 * 法務支援の専門家
 *
 * 主な機能:
 * - 契約書レビュー
 * - リスク評価
 * - コンプライアンスチェック
 * - 法的文書生成支援
 * - 法規制調査
 */

// ========================================
// 型定義
// ========================================

interface LegalAdvisorInput {
  taskType: 'contract-review' | 'risk-assessment' | 'compliance-check' | 'document-generation' | 'regulation-research' | 'legal-consultation' | 'dispute-analysis';
  document?: LegalDocument;
  businessActivity?: BusinessActivity;
  jurisdiction?: string;
  documentType?: DocumentType;
  disputeCase?: DisputeCase;
}

interface LegalDocument {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  parties: Party[];
  effectiveDate?: Date;
  expirationDate?: Date;
  jurisdiction: string;
  language: 'ja' | 'en';
}

type DocumentType =
  | 'NDA' // 秘密保持契約
  | 'service_agreement' // サービス契約
  | 'employment_contract' // 雇用契約
  | 'partnership_agreement' // パートナーシップ契約
  | 'license_agreement' // ライセンス契約
  | 'terms_of_service' // 利用規約
  | 'privacy_policy' // プライバシーポリシー
  | 'sales_contract' // 売買契約
  | 'lease_agreement' // 賃貸借契約
  | 'consulting_agreement'; // コンサルティング契約

interface Party {
  name: string;
  type: 'individual' | 'corporation';
  role: 'provider' | 'client' | 'partner' | 'employee' | 'employer';
  jurisdiction: string;
}

interface BusinessActivity {
  description: string;
  industry: string;
  jurisdiction: string;
  involvedParties: string[];
  dataHandling?: DataHandlingInfo;
}

interface DataHandlingInfo {
  collectsPersonalData: boolean;
  dataTypes: string[];
  storageLoc location: string[];
  thirdPartySharing: boolean;
}

interface DisputeCase {
  id: string;
  description: string;
  parties: string[];
  claimAmount?: number;
  jurisdiction: string;
  relatedDocuments: string[];
}

interface LegalAdvisorOutput {
  success: boolean;
  taskType: string;
  result: ContractReview | RiskAssessment | ComplianceReport | DocumentDraft | RegulationResearch | LegalConsultation | DisputeAnalysis;
  timestamp: Date;
}

// 契約書レビュー
interface ContractReview {
  documentId: string;
  documentType: DocumentType;
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  keyTerms: KeyTerm[];
  risks: Risk[];
  recommendations: Recommendation[];
  clauseAnalysis: ClauseAnalysis[];
  comparisonToStandard: ComparisonResult;
}

interface KeyTerm {
  term: string;
  definition: string;
  importance: 'low' | 'medium' | 'high';
  location: string; // セクション番号
}

interface Risk {
  category: 'legal' | 'financial' | 'operational' | 'reputational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedClause: string;
  mitigation: string[];
}

interface Recommendation {
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'add_clause' | 'modify_clause' | 'remove_clause' | 'clarify';
  description: string;
  suggestedText?: string;
  rationale: string;
}

interface ClauseAnalysis {
  clauseTitle: string;
  content: string;
  assessment: 'favorable' | 'neutral' | 'unfavorable' | 'missing';
  concerns: string[];
  suggestions: string[];
}

interface ComparisonResult {
  standardClauses: {
    present: string[];
    missing: string[];
  };
  deviations: string[];
  overallAlignment: number; // 0-100パーセンテージ
}

// リスク評価
interface RiskAssessment {
  activity: string;
  jurisdiction: string;
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  legalRisks: LegalRisk[];
  complianceRequirements: ComplianceRequirement[];
  recommendations: string[];
  estimatedCost: {
    compliance: string;
    potentialLiability: string;
  };
}

interface LegalRisk {
  category: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'severe';
  mitigation: string[];
  relatedLaws: string[];
}

interface ComplianceRequirement {
  law: string;
  description: string;
  deadline?: Date;
  responsible: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'unknown';
  actions: string[];
}

// コンプライアンスレポート
interface ComplianceReport {
  activity: string;
  jurisdiction: string;
  complianceScore: number; // 0-100
  applicableLaws: ApplicableLaw[];
  violations: Violation[];
  gaps: ComplianceGap[];
  actionPlan: ActionItem[];
  certifications: Certification[];
}

interface ApplicableLaw {
  name: string;
  jurisdiction: string;
  category: 'data_protection' | 'labor' | 'tax' | 'consumer_protection' | 'industry_specific';
  requirements: string[];
  penalties: string;
}

interface Violation {
  law: string;
  description: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  potentialPenalty: string;
  remediation: string[];
}

interface ComplianceGap {
  area: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

interface ActionItem {
  task: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  responsible: string;
  deadline: Date;
  status: 'pending' | 'in_progress' | 'completed';
}

interface Certification {
  name: string;
  description: string;
  required: boolean;
  cost: string;
  timeline: string;
}

// 法的文書生成
interface DocumentDraft {
  documentType: DocumentType;
  title: string;
  sections: DocumentSection[];
  boilerplate: string[];
  customization: CustomizationGuide;
  reviewChecklist: string[];
}

interface DocumentSection {
  title: string;
  content: string;
  mandatory: boolean;
  notes: string[];
}

interface CustomizationGuide {
  requiredFields: string[];
  optionalFields: string[];
  jurisdictionSpecific: string[];
  instructions: string[];
}

// 法規制調査
interface RegulationResearch {
  query: string;
  jurisdiction: string;
  applicableLaws: LawSummary[];
  recentChanges: RegulatoryChange[];
  upcomingChanges: UpcomingChange[];
  bestPractices: string[];
  references: Reference[];
}

interface LawSummary {
  name: string;
  jurisdiction: string;
  effectiveDate: Date;
  summary: string;
  keyProvisions: string[];
  applicability: string;
  officialSource: string;
}

interface RegulatoryChange {
  law: string;
  changeDate: Date;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionRequired: string[];
}

interface UpcomingChange {
  law: string;
  proposedDate: Date;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  preparationSteps: string[];
}

interface Reference {
  title: string;
  url: string;
  type: 'statute' | 'case_law' | 'regulation' | 'guideline' | 'article';
  relevance: number; // 0-1
}

// 法的相談
interface LegalConsultation {
  query: string;
  analysis: string;
  applicableLaws: string[];
  options: LegalOption[];
  risks: string[];
  recommendations: string[];
  nextSteps: string[];
  disclaimer: string;
}

interface LegalOption {
  option: string;
  pros: string[];
  cons: string[];
  cost: string;
  timeline: string;
  risk: 'low' | 'medium' | 'high';
}

// 紛争分析
interface DisputeAnalysis {
  caseId: string;
  disputeType: string;
  strengths: string[];
  weaknesses: string[];
  legalMerit: 'weak' | 'moderate' | 'strong';
  estimatedOutcome: string;
  strategy: LegalStrategy;
  costs: CostEstimate;
  timeline: DisputeTimeline;
}

interface LegalStrategy {
  recommendedApproach: 'negotiation' | 'mediation' | 'arbitration' | 'litigation';
  rationale: string;
  tactics: string[];
  risks: string[];
}

interface CostEstimate {
  legalFees: string;
  courtCosts: string;
  potentialAward: string;
  totalEstimate: string;
}

interface DisputeTimeline {
  phases: {
    phase: string;
    duration: string;
    milestones: string[];
  }[];
  totalDuration: string;
}

// ========================================
// AILegalAdvisorAgent クラス
// ========================================

export class AILegalAdvisorAgent extends BaseAgent {
  constructor() {
    super(
      'AILegalAdvisorAgent',
      '法務支援の専門家として、契約書レビュー、コンプライアンスチェック、法的助言を提供します',
      ['contract-review', 'risk-assessment', 'compliance-check', 'document-generation', 'regulation-research', 'legal-consultation', 'dispute-analysis']
    );
  }

  /**
   * エージェントのセットアップ
   */
  async setup(): Promise<void> {
    this.log('AI Legal Advisor をセットアップしています...');
    // 初期化処理（法規制データベース接続、モデルロード等）
    this.log('セットアップ完了');
  }

  /**
   * メイン処理
   */
  async process(input: LegalAdvisorInput): Promise<LegalAdvisorOutput> {
    this.log(`タスクタイプ: ${input.taskType} を処理中...`);

    let result;

    switch (input.taskType) {
      case 'contract-review':
        if (!input.document) throw new Error('document が必要です');
        result = await this.reviewContract(input.document);
        break;

      case 'risk-assessment':
        if (!input.businessActivity) throw new Error('businessActivity が必要です');
        result = await this.assessRisk(input.businessActivity);
        break;

      case 'compliance-check':
        if (!input.businessActivity) throw new Error('businessActivity が必要です');
        result = await this.checkCompliance(input.businessActivity);
        break;

      case 'document-generation':
        if (!input.documentType) throw new Error('documentType が必要です');
        result = await this.generateDocument(input.documentType, input.jurisdiction || 'JP');
        break;

      case 'regulation-research':
        if (!input.businessActivity) throw new Error('businessActivity が必要です');
        result = await this.researchRegulations(input.businessActivity);
        break;

      case 'legal-consultation':
        if (!input.businessActivity) throw new Error('businessActivity が必要です');
        result = await this.provideLegalConsultation(input.businessActivity);
        break;

      case 'dispute-analysis':
        if (!input.disputeCase) throw new Error('disputeCase が必要です');
        result = await this.analyzeDispute(input.disputeCase);
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
    this.log('AI Legal Advisor をクリーンアップしています...');
    // リソース解放処理
    this.log('クリーンアップ完了');
  }

  // ========================================
  // プライベートメソッド
  // ========================================

  /**
   * 契約書レビュー
   */
  private async reviewContract(document: LegalDocument): Promise<ContractReview> {
    this.log(`契約書 "${document.title}" をレビュー中...`);

    // リスク評価
    const risks = this.identifyContractRisks(document);
    const overallRiskLevel = this.calculateOverallRisk(risks);

    // 主要条項の抽出
    const keyTerms = this.extractKeyTerms(document);

    // 条項分析
    const clauseAnalysis = this.analyzeC lauses(document);

    // 推奨事項の生成
    const recommendations = this.generateRecommendations(risks, clauseAnalysis);

    return {
      documentId: document.id,
      documentType: document.type,
      overallRiskLevel,
      summary: `${document.type}契約書のレビュー結果: ${risks.length}件のリスクを特定。${recommendations.filter(r => r.priority === 'critical' || r.priority === 'high').length}件の重要な推奨事項があります。`,
      keyTerms,
      risks,
      recommendations,
      clauseAnalysis,
      comparisonToStandard: this.compareToStandard(document)
    };
  }

  /**
   * リスク評価
   */
  private async assessRisk(activity: BusinessActivity): Promise<RiskAssessment> {
    this.log(`ビジネス活動のリスク評価中: ${activity.description}`);

    const legalRisks = this.identifyLegalRisks(activity);
    const complianceRequirements = this.identifyComplianceRequirements(activity);

    return {
      activity: activity.description,
      jurisdiction: activity.jurisdiction,
      overallRisk: this.calculateBusinessRisk(legalRisks),
      legalRisks,
      complianceRequirements,
      recommendations: [
        '個人情報保護法に基づくプライバシーポリシーの整備',
        '利用規約の作成と適切な同意取得',
        'データセキュリティ対策の実施'
      ],
      estimatedCost: {
        compliance: '初期: 50-100万円、年間: 20-50万円',
        potentialLiability: '違反時: 最大1億円の罰金'
      }
    };
  }

  /**
   * コンプライアンスチェック
   */
  private async checkCompliance(activity: BusinessActivity): Promise<ComplianceReport> {
    this.log(`コンプライアンスチェック中: ${activity.description}`);

    const applicableLaws = this.getApplicableLaws(activity);
    const violations = this.checkViolations(activity, applicableLaws);
    const gaps = this.identifyGaps(activity, applicableLaws);

    const complianceScore = this.calculateComplianceScore(applicableLaws, violations, gaps);

    return {
      activity: activity.description,
      jurisdiction: activity.jurisdiction,
      complianceScore,
      applicableLaws,
      violations,
      gaps,
      actionPlan: this.createActionPlan(gaps, violations),
      certifications: [
        {
          name: 'プライバシーマーク',
          description: '個人情報保護の第三者認証',
          required: false,
          cost: '初回: 30-50万円、更新: 20-30万円',
          timeline: '3-6ヶ月'
        },
        {
          name: 'ISMS（ISO27001）',
          description: '情報セキュリティマネジメントシステム',
          required: false,
          cost: '50-100万円',
          timeline: '6-12ヶ月'
        }
      ]
    };
  }

  /**
   * 法的文書生成
   */
  private async generateDocument(type: DocumentType, jurisdiction: string): Promise<DocumentDraft> {
    this.log(`${type}文書のドラフトを生成中...`);

    const sections = this.generateDocumentSections(type, jurisdiction);

    return {
      documentType: type,
      title: this.getDocumentTitle(type),
      sections,
      boilerplate: [
        '本契約に関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とする',
        '本契約は日本法に準拠し、日本法に従って解釈されるものとする'
      ],
      customization: {
        requiredFields: ['当事者名', '契約日', '有効期間'],
        optionalFields: ['特記事項', '添付資料'],
        jurisdictionSpecific: ['管轄裁判所', '準拠法'],
        instructions: [
          '[ ]内の項目を実際の内容に置き換えてください',
          '赤字の箇所は特に注意が必要です',
          '弁護士によるレビューを推奨します'
        ]
      },
      reviewChecklist: [
        '当事者情報が正確か',
        '契約期間が明確か',
        '対価・支払条件が明記されているか',
        '解除条件が適切か',
        '秘密保持条項が含まれているか',
        '紛争解決方法が定められているか'
      ]
    };
  }

  /**
   * 法規制調査
   */
  private async researchRegulations(activity: BusinessActivity): Promise<RegulationResearch> {
    this.log(`法規制調査中: ${activity.description}`);

    return {
      query: activity.description,
      jurisdiction: activity.jurisdiction,
      applicableLaws: [
        {
          name: '個人情報保護法',
          jurisdiction: '日本',
          effectiveDate: new Date('2022-04-01'),
          summary: '個人情報の適正な取扱いを定めた法律',
          keyProvisions: [
            '利用目的の特定・通知',
            '適正な取得',
            '安全管理措置',
            '第三者提供の制限'
          ],
          applicability: 'オンラインサービスで個人情報を取り扱う場合は適用',
          officialSource: 'https://www.ppc.go.jp/'
        }
      ],
      recentChanges: [
        {
          law: '個人情報保護法',
          changeDate: new Date('2022-04-01'),
          description: '個人関連情報の第三者提供規制の導入',
          impact: 'high',
          actionRequired: [
            'プライバシーポリシーの更新',
            '第三者提供記録の整備'
          ]
        }
      ],
      upcomingChanges: [
        {
          law: '電気通信事業法',
          proposedDate: new Date('2026-04-01'),
          description: 'クッキー規制の強化',
          likelihood: 'high',
          preparationSteps: [
            'クッキーポリシーの見直し',
            '同意取得メカニズムの実装'
          ]
        }
      ],
      bestPractices: [
        'プライバシーバイデザインの採用',
        '定期的なコンプライアンス監査',
        '従業員向けトレーニングの実施'
      ],
      references: [
        {
          title: '個人情報保護委員会ガイドライン',
          url: 'https://www.ppc.go.jp/personalinfo/legal/',
          type: 'guideline',
          relevance: 0.95
        }
      ]
    };
  }

  /**
   * 法的相談
   */
  private async provideLegalConsultation(activity: BusinessActivity): Promise<LegalConsultation> {
    this.log(`法的相談を提供中: ${activity.description}`);

    return {
      query: activity.description,
      analysis: `${activity.description}について、以下の法的論点があります。個人情報保護法、電気通信事業法、特定商取引法等が関連する可能性があります。`,
      applicableLaws: [
        '個人情報保護法',
        '電気通信事業法',
        '特定商取引法',
        '不正競争防止法'
      ],
      options: [
        {
          option: '自社で対応',
          pros: ['コストを抑えられる', '迅速に対応できる'],
          cons: ['専門知識が必要', 'リスクが残る可能性'],
          cost: '社内リソースのみ',
          timeline: '1-2週間',
          risk: 'medium'
        },
        {
          option: '弁護士に相談',
          pros: ['専門的な助言が得られる', 'リスクを最小化'],
          cons: ['費用がかかる'],
          cost: '10-30万円',
          timeline: '2-4週間',
          risk: 'low'
        }
      ],
      risks: [
        '法令違反による罰則（最大1億円）',
        '行政指導・改善命令',
        '顧客からの訴訟リスク',
        'レピュテーションリスク'
      ],
      recommendations: [
        '弁護士による包括的なレビューを推奨',
        'プライバシーポリシー・利用規約の整備',
        'コンプライアンス体制の構築'
      ],
      nextSteps: [
        '弁護士事務所に相談予約',
        '関連資料の準備',
        '社内体制の見直し'
      ],
      disclaimer: '本情報は一般的な法的情報であり、特定の法的助言ではありません。具体的な案件については、必ず弁護士にご相談ください。'
    };
  }

  /**
   * 紛争分析
   */
  private async analyzeDispute(disputeCase: DisputeCase): Promise<DisputeAnalysis> {
    this.log(`紛争ケース ${disputeCase.id} を分析中...`);

    return {
      caseId: disputeCase.id,
      disputeType: '契約違反',
      strengths: [
        '契約書に明確な違反条項が存在',
        '証拠が充実している',
        '判例が有利'
      ],
      weaknesses: [
        '損害額の立証が困難',
        '相手方にも抗弁事由がある'
      ],
      legalMerit: 'moderate',
      estimatedOutcome: '和解による解決が妥当。請求額の50-70%程度の回収が見込まれる',
      strategy: {
        recommendedApproach: 'mediation',
        rationale: '訴訟コストと時間を考慮すると、調停による早期解決が最適',
        tactics: [
          '証拠を整理して強い立場を構築',
          '相手方の事情を考慮した現実的な和解案を提示',
          '必要に応じて訴訟も辞さない姿勢を示す'
        ],
        risks: [
          '調停不成立の場合、訴訟に移行',
          '和解額が期待より低い可能性'
        ]
      },
      costs: {
        legalFees: '調停: 30-50万円、訴訟: 100-200万円',
        courtCosts: '10-30万円',
        potentialAward: disputeCase.claimAmount ? `${(disputeCase.claimAmount * 0.6).toLocaleString()}円` : '未定',
        totalEstimate: '40-80万円（調停の場合）'
      },
      timeline: {
        phases: [
          {
            phase: '調停申立',
            duration: '1ヶ月',
            milestones: ['申立書作成', '証拠準備', '申立']
          },
          {
            phase: '調停期日',
            duration: '2-4ヶ月',
            milestones: ['第1回期日', '和解交渉', '合意書作成']
          }
        ],
        totalDuration: '3-5ヶ月'
      }
    };
  }

  // ========================================
  // ヘルパーメソッド
  // ========================================

  private identifyContractRisks(document: LegalDocument): Risk[] {
    return [
      {
        category: 'legal',
        severity: 'high',
        description: '契約解除条項が一方的に不利',
        affectedClause: '第10条（契約解除）',
        mitigation: [
          '双方平等な解除条件に修正',
          '解除時の損害賠償条項を明確化'
        ]
      },
      {
        category: 'financial',
        severity: 'medium',
        description: '損害賠償額の上限が未設定',
        affectedClause: '第15条（損害賠償）',
        mitigation: [
          '損害賠償額の上限を設定',
          '間接損害の除外を明記'
        ]
      }
    ];
  }

  private calculateOverallRisk(risks: Risk[]): 'low' | 'medium' | 'high' | 'critical' {
    const hasCritical = risks.some(r => r.severity === 'critical');
    if (hasCritical) return 'critical';

    const highCount = risks.filter(r => r.severity === 'high').length;
    if (highCount >= 2) return 'high';
    if (highCount >= 1) return 'medium';

    return 'low';
  }

  private extractKeyTerms(document: LegalDocument): KeyTerm[] {
    return [
      {
        term: '本契約',
        definition: '本契約書に記載された全ての条項',
        importance: 'high',
        location: '第1条'
      }
    ];
  }

  private analyzeClauses(document: LegalDocument): ClauseAnalysis[] {
    return [
      {
        clauseTitle: '契約期間',
        content: '契約期間は締結日から1年間とする',
        assessment: 'neutral',
        concerns: ['自動更新条項が不明確'],
        suggestions: ['自動更新の可否を明記', '更新拒絶の通知期限を設定']
      }
    ];
  }

  private generateRecommendations(risks: Risk[], clauseAnalysis: ClauseAnalysis[]): Recommendation[] {
    return [
      {
        priority: 'high',
        type: 'modify_clause',
        description: '契約解除条項を双方平等に修正',
        suggestedText: '各当事者は、相手方が本契約に違反し、催告後30日以内に是正されない場合、本契約を解除できる',
        rationale: '一方的な解除権は不公平であり、紛争の原因となる'
      }
    ];
  }

  private compareToStandard(document: LegalDocument): ComparisonResult {
    return {
      standardClauses: {
        present: ['秘密保持', '契約期間', '解除'],
        missing: ['知的財産権', '準拠法', '管轄裁判所']
      },
      deviations: ['損害賠償額の上限未設定'],
      overallAlignment: 70
    };
  }

  private identifyLegalRisks(activity: BusinessActivity): LegalRisk[] {
    return [
      {
        category: '個人情報保護',
        description: '個人情報の不適切な取扱いによる法令違反',
        likelihood: 'medium',
        impact: 'high',
        mitigation: [
          'プライバシーポリシーの整備',
          '安全管理措置の実施',
          '個人情報保護委員会への届出'
        ],
        relatedLaws: ['個人情報保護法']
      }
    ];
  }

  private identifyComplianceRequirements(activity: BusinessActivity): ComplianceRequirement[] {
    return [
      {
        law: '個人情報保護法',
        description: '利用目的の特定・通知',
        responsible: 'コンプライアンス担当',
        status: 'partial',
        actions: [
          'プライバシーポリシーの作成',
          'ウェブサイトへの掲載',
          '社内規程の整備'
        ]
      }
    ];
  }

  private calculateBusinessRisk(risks: LegalRisk[]): 'low' | 'medium' | 'high' | 'critical' {
    const highImpact = risks.filter(r => r.impact === 'high' || r.impact === 'severe').length;
    if (highImpact >= 2) return 'high';
    if (highImpact >= 1) return 'medium';
    return 'low';
  }

  private getApplicableLaws(activity: BusinessActivity): ApplicableLaw[] {
    return [
      {
        name: '個人情報保護法',
        jurisdiction: '日本',
        category: 'data_protection',
        requirements: [
          '利用目的の特定・通知',
          '適正な取得',
          '安全管理措置',
          '第三者提供の制限'
        ],
        penalties: '最大1億円の罰金'
      }
    ];
  }

  private checkViolations(activity: BusinessActivity, laws: ApplicableLaw[]): Violation[] {
    // 実際にはビジネス活動と法令を照合
    return [];
  }

  private identifyGaps(activity: BusinessActivity, laws: ApplicableLaw[]): ComplianceGap[] {
    return [
      {
        area: 'プライバシーポリシー',
        description: 'プライバシーポリシーが未整備',
        priority: 'high',
        recommendations: [
          '弁護士監修のもとプライバシーポリシーを作成',
          'ウェブサイトに掲載',
          '定期的な見直し'
        ]
      }
    ];
  }

  private calculateComplianceScore(laws: ApplicableLaw[], violations: Violation[], gaps: ComplianceGap[]): number {
    const base = 100;
    const violationPenalty = violations.length * 20;
    const gapPenalty = gaps.length * 10;
    return Math.max(0, base - violationPenalty - gapPenalty);
  }

  private createActionPlan(gaps: ComplianceGap[], violations: Violation[]): ActionItem[] {
    return [
      {
        task: 'プライバシーポリシーの作成',
        priority: 'high',
        responsible: '法務部',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
        status: 'pending'
      }
    ];
  }

  private generateDocumentSections(type: DocumentType, jurisdiction: string): DocumentSection[] {
    if (type === 'NDA') {
      return [
        {
          title: '第1条（目的）',
          content: '本契約は、[当事者A]と[当事者B]との間で開示される秘密情報の取扱いについて定めることを目的とする。',
          mandatory: true,
          notes: ['契約の目的を明確に記載']
        },
        {
          title: '第2条（秘密情報の定義）',
          content: '本契約において「秘密情報」とは、以下の情報をいう...',
          mandatory: true,
          notes: ['秘密情報の範囲を具体的に定義']
        }
      ];
    }
    return [];
  }

  private getDocumentTitle(type: DocumentType): string {
    const titles: { [key in DocumentType]: string } = {
      'NDA': '秘密保持契約書',
      'service_agreement': 'サービス利用契約書',
      'employment_contract': '雇用契約書',
      'partnership_agreement': 'パートナーシップ契約書',
      'license_agreement': 'ライセンス契約書',
      'terms_of_service': '利用規約',
      'privacy_policy': 'プライバシーポリシー',
      'sales_contract': '売買契約書',
      'lease_agreement': '賃貸借契約書',
      'consulting_agreement': 'コンサルティング契約書'
    };
    return titles[type];
  }
}
