/**
 * AIPRSpecialistAgent - PR・広報戦略の専門家
 * プレスリリース、メディア対応、危機管理、ブランドストーリーテリング、インフルエンサーリレーション
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface PRSpecialistTaskInput {
  taskType:
    | 'press-release'
    | 'media-outreach'
    | 'crisis-management'
    | 'brand-storytelling'
    | 'influencer-relations'
    | 'pr-strategy'
    | 'media-monitoring';
  topic?: string;
  announcement?: AnnouncementDetails;
  crisis?: CrisisDetails;
  targetMedia?: MediaTarget[];
  influencers?: InfluencerProfile[];
  period?: string;
}

export interface AnnouncementDetails {
  type: 'product-launch' | 'funding' | 'partnership' | 'award' | 'milestone' | 'event';
  title: string;
  summary: string;
  date: string;
  keyMessages: string[];
  targetAudience: string[];
  supporting Data?: any;
}

export interface CrisisDetails {
  type: 'product-issue' | 'security-breach' | 'negative-review' | 'legal-issue' | 'executive-scandal' | 'service-outage';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedStakeholders: string[];
  timeline: string;
}

export interface MediaTarget {
  name: string;
  type: 'newspaper' | 'magazine' | 'online' | 'tv' | 'radio' | 'podcast';
  tier: 'tier1' | 'tier2' | 'tier3';
  audience: string;
  reach: number;
  contact?: MediaContact;
}

export interface MediaContact {
  name: string;
  role: string;
  email: string;
  phone?: string;
  relationship: 'strong' | 'medium' | 'new';
}

export interface InfluencerProfile {
  name: string;
  platform: 'twitter' | 'instagram' | 'youtube' | 'linkedin' | 'tiktok' | 'blog';
  followers: number;
  engagement Rate: number;
  niche: string[];
  previousCollaboration?: boolean;
}

export class AIPRSpecialistAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.PR_SPECIALIST);
  }

  protected async setup(): Promise<void> {
    this.log('AI PR Specialist Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as PRSpecialistTaskInput;
    this.log(`Processing ${input.taskType} task`);

    switch (input.taskType) {
      case 'press-release':
        return await this.createPressRelease(input);
      case 'media-outreach':
        return await this.planMediaOutreach(input);
      case 'crisis-management':
        return await this.manageCrisis(input);
      case 'brand-storytelling':
        return await this.developBrandStory(input);
      case 'influencer-relations':
        return await this.manageInfluencerRelations(input);
      case 'pr-strategy':
        return await this.createPRStrategy(input);
      case 'media-monitoring':
        return await this.monitorMedia(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * プレスリリース作成
   */
  private async createPressRelease(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Creating press release...');

    const announcement = input.announcement || this.generateSampleAnnouncement();

    const pressRelease = {
      type: 'プレスリリース',
      announcement: announcement.type,
      headline: announcement.title,
      structure: {
        header: {
          forImmediateRelease: '報道関係者各位',
          date: announcement.date,
          contact: {
            company: '株式会社サンプル',
            prDepartment: '広報部',
            name: '山田太郎',
            phone: '03-1234-5678',
            email: 'pr@sample.com',
          },
        },
        headline: {
          main: announcement.title,
          characterCount: announcement.title.length,
          optimization: [
            '具体的数字含む（例: 業界初、100万ユーザー突破）',
            'ベネフィット明確',
            '40-60文字推奨',
          ],
        },
        leadParagraph: {
          content: this.generateLeadParagraph(announcement),
          elements: ['5W1H（誰が、何を、いつ、どこで、なぜ、どのように）', '最重要情報を凝縮'],
          characterCount: 150,
        },
        bodyParagraphs: [
          {
            section: '背景・課題',
            content: [
              '市場環境: AI導入が加速する中、業務効率化ニーズ急増',
              '課題: 既存ツールは高額・複雑・導入期間長い',
              '顧客ペインポイント: 中小企業がAI活用できない',
            ],
          },
          {
            section: '発表内容詳細',
            content: [
              `${announcement.summary}`,
              '主要機能: 24/7自動対応、多言語サポート、API連携',
              '価格: 月額¥50,000〜（従来比50%コスト削減）',
              '提供開始: 2025年11月1日',
            ],
          },
          {
            section: 'ベネフィット',
            content: [
              '業務効率10倍向上',
              '人件費50%削減',
              '導入期間1週間（従来3ヶ月）',
              '顧客満足度向上（24/7対応）',
            ],
          },
          {
            section: '実績・社会的証明',
            content: [
              '導入企業1,000社突破',
              '業界リーダー10社が採用',
              '顧客満足度98%',
              '月間処理100万件達成',
            ],
          },
          {
            section: '今後の展望',
            content: [
              '2026年までにユーザー10,000社目標',
              'グローバル展開（アジア5カ国）',
              '新機能追加（音声認識、画像解析）',
              'パートナーシップ拡大',
            ],
          },
        ],
        quotes: [
          {
            speaker: '代表取締役CEO 田中一郎',
            role: '経営トップ、ビジョン',
            quote:
              '「私たちは、すべての企業がAIの恩恵を受けられる世界を目指しています。本製品は、中小企業でも簡単に導入できる革新的ソリューションです。業務効率化により、企業は本来のビジネスに集中できるようになります。」',
          },
          {
            speaker: 'プロダクト責任者 佐藤花子',
            role: '製品詳細、技術',
            quote:
              '「最新のAI技術を活用し、従来の1/10のコストで実現しました。ユーザーフィードバックを重視し、使いやすさを徹底追求しています。」',
          },
          {
            speaker: '導入企業（株式会社ABC） 営業部長 鈴木太郎様',
            role: '顧客の声、実績',
            quote:
              '「導入後、問い合わせ対応時間が80%削減されました。スタッフは戦略的業務に集中でき、売上が30%増加しました。」',
          },
        ],
        boilerplate: {
          companyName: '株式会社サンプル',
          description:
            '株式会社サンプルは、2020年設立のAIソリューションプロバイダーです。「AIで世界中のビジネスを加速する」をミッションに、中小企業向けAIツールを開発・提供しています。累計1,000社以上の導入実績を持ち、業務効率化・コスト削減に貢献しています。',
          website: 'https://www.sample.com',
          socialMedia: {
            twitter: '@sample_official',
            facebook: '/sample.official',
            linkedin: '/company/sample',
          },
        },
        additionalInfo: {
          images: [
            'プロダクトスクリーンショット（高解像度）',
            '導入事例インフォグラフィック',
            'CEOプロフィール写真',
          ],
          videos: ['プロダクトデモ動画（2分）', 'CEO メッセージ動画（1分）'],
          documents: ['詳細資料PDF', '導入事例集', 'FAQシート'],
        },
      },
      distributionPlan: {
        prWireServices: [
          {
            service: 'PR TIMES',
            reach: '大手メディア・Web媒体',
            cost: 30000,
            expectedPickup: '50-100媒体',
          },
          {
            service: '共同通信PRワイヤー',
            reach: '新聞社・通信社',
            cost: 50000,
            expectedPickup: '主要新聞掲載可能性',
          },
          {
            service: '@Press',
            reach: 'Web媒体特化',
            cost: 30000,
            expectedPickup: '30-80媒体',
          },
        ],
        directOutreach: {
          tier1Media: [
            { outlet: '日経新聞', journalist: '田中記者（テック担当）', method: '事前ブリーフィング' },
            { outlet: 'TechCrunch Japan', journalist: '山田編集長', method: '独占インタビュー提案' },
            { outlet: 'ITmedia', journalist: '佐藤記者（AI担当）', method: 'プレスリリース + 補足資料' },
          ],
          tier2Media: [
            { outlet: 'CNET Japan', method: 'プレスリリース送付' },
            { outlet: 'ZDNet Japan', method: 'プレスリリース送付' },
            { outlet: 'Impress Watch', method: 'プレスリリース送付' },
          ],
          industryMedia: [
            { outlet: '日経クロステック', method: '寄稿提案' },
            { outlet: 'ビジネス+IT', method: '導入事例インタビュー' },
          ],
        },
        socialMedia: {
          ownedChannels: [
            { platform: 'Twitter', action: 'リリース投稿 + スレッド解説', timing: '10:00' },
            { platform: 'LinkedIn', action: 'CEOメッセージ投稿', timing: '10:30' },
            { platform: 'Facebook', action: 'ビジュアル重視投稿', timing: '11:00' },
            { platform: 'Instagram', action: 'インフォグラフィック', timing: '12:00' },
          ],
          paidPromotion: {
            budget: 200000,
            platforms: ['Twitter', 'LinkedIn'],
            targeting: 'ビジネス意思決定者、テック関心層',
            objective: 'リーチ最大化',
          },
        },
        emailOutreach: {
          customerBase: {
            segment: '既存顧客10,000件',
            subject: '【重要】新機能リリースのお知らせ',
            timing: '11:00',
          },
          prospectList: {
            segment: 'リード50,000件',
            subject: '業界初！AIで業務効率10倍の秘密',
            timing: '14:00',
          },
          partnerList: {
            segment: 'パートナー企業500社',
            subject: '協業機会拡大のご案内',
            timing: '10:00',
          },
        },
      },
      timeline: {
        t_minus_14days: [
          'プレスリリース草稿完成',
          'Tier1メディア事前アプローチ',
          '資料・画像準備',
        ],
        t_minus_7days: [
          'プレスリリース最終化',
          '配信サービス登録',
          'メディアブリーフィング（Tier1）',
        ],
        t_minus_3days: ['エンバーゴ設定（Tier1独占期間）', 'SNS投稿予約', 'Email準備'],
        launchDay: [
          '10:00 プレスリリース配信',
          '10:00-12:00 SNS投稿',
          '11:00 Email送信',
          '終日 メディア問い合わせ対応',
        ],
        t_plus_1_7days: ['メディア掲載モニタリング', '追加取材対応', '掲載記事シェア'],
      },
      successMetrics: {
        mediaPickup: {
          target: '80媒体以上',
          tier1: '5媒体以上',
          tier2: '15媒体以上',
          tier3: '60媒体以上',
        },
        reach: {
          estimatedImpressions: 5000000,
          websiteTraffic: '+50,000訪問',
          socialEngagement: '10,000いいね・シェア',
        },
        businessImpact: {
          leads: '+500件',
          inquiries: '+200件',
          mediaValue: '¥10,000,000（広告換算）',
        },
      },
      expectedResults: {
        immediate: {
          day1: '配信80媒体、Web掲載50件、SNSリーチ100万',
          week1: 'Tier1掲載5件、問い合わせ200件、ウェブ訪問+50,000',
        },
        mediumTerm: {
          month1: 'リード+500件、商談+100件、ブランド認知度+15%',
          month3: '売上貢献¥50M、メディア価値¥10M、SEO効果（被リンク+50）',
        },
      },
      summary: `プレスリリース作成完了。「${announcement.title}」5段落構成、CEO・担当者・顧客3者コメント。PR TIMES等3サービス配信、Tier1直接アプローチ、SNS・Email連動。目標80媒体掲載、リーチ500万、リード+500件。`,
    };

    return pressRelease;
  }

  /**
   * メディアアウトリーチ計画
   */
  private async planMediaOutreach(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Planning media outreach...');

    const mediaTargets = input.targetMedia || this.generateSampleMediaTargets();

    const outreachPlan = {
      objective: 'メディア露出最大化、ブランド認知度向上',
      targetMediaList: {
        tier1: {
          description: '全国紙・主要オンラインメディア（到達1,000万人以上）',
          outlets: [
            {
              name: '日本経済新聞',
              type: 'newspaper',
              reach: 30000000,
              focus: 'ビジネス・テクノロジー',
              journalist: {
                name: '田中太郎',
                role: 'テクノロジー担当記者',
                email: 'example@example.com',
                relationship: 'medium',
                notes: '過去にAI関連記事執筆、データ重視',
              },
              approach: '事前ブリーフィング + 独自データ提供',
              expectedOutcome: '記事掲載（500-1,000字）',
            },
            {
              name: 'TechCrunch Japan',
              type: 'online',
              reach: 20000000,
              focus: 'スタートアップ・テクノロジー',
              journalist: {
                name: '山田花子',
                role: '編集長',
                email: 'yamada@techcrunch.jp',
                relationship: 'strong',
                notes: '過去に2回取材、スタートアップ支援的',
              },
              approach: '独占インタビュー提案（CEO）',
              expectedOutcome: '特集記事（2,000字以上） + SNS拡散',
            },
            {
              name: 'NHK ニュース',
              type: 'tv',
              reach: 50000000,
              focus: '社会・経済',
              journalist: {
                name: '佐藤一郎',
                role: '経済部ディレクター',
                email: 'sato@nhk.or.jp',
                relationship: 'new',
                notes: 'AI特集企画中との情報',
              },
              approach: 'プレスリリース + 映像素材提供 + 取材誘致',
              expectedOutcome: 'ニュースセグメント（2-3分）',
            },
          ],
          totalReach: 100000000,
          priority: 'Critical',
        },
        tier2: {
          description: '専門誌・業界メディア（到達100万-1,000万人）',
          outlets: [
            { name: 'ITmedia', type: 'online', reach: 15000000, focus: 'IT・ビジネス' },
            { name: 'CNET Japan', type: 'online', reach: 12000000, focus: 'テクノロジー' },
            { name: 'ZDNet Japan', type: 'online', reach: 10000000, focus: 'エンタープライズIT' },
            { name: 'Impress Watch', type: 'online', reach: 8000000, focus: 'テック・ガジェット' },
            { name: '日経クロステック', type: 'online', reach: 5000000, focus: 'ビジネスIT' },
            { name: 'ビジネス+IT', type: 'online', reach: 4000000, focus: 'ビジネステクノロジー' },
          ],
          totalReach: 54000000,
          approach: 'プレスリリース配信 + 個別フォローアップ',
          priority: 'High',
        },
        tier3: {
          description: 'ニッチメディア・ブログ（到達10万-100万人）',
          outlets: [
            { name: 'マーケジン', type: 'online', reach: 3000000, focus: 'マーケティング' },
            { name: 'THE BRIDGE', type: 'online', reach: 2000000, focus: 'スタートアップ' },
            { name: 'ASCII.jp', type: 'online', reach: 5000000, focus: 'テクノロジー全般' },
            { name: 'SalesZine', type: 'online', reach: 1000000, focus: '営業・セールス' },
          ],
          totalReach: 11000000,
          approach: 'プレスリリース配信',
          priority: 'Medium',
        },
      },
      outreachStrategy: {
        relationshipBuilding: {
          ongoing: [
            '月次: 業界ニュースレター配信（価値ある情報提供）',
            '四半期: メディアブリーフィング（業界トレンド共有）',
            '適宜: 独自調査データ提供（記事ネタ提供）',
            '年2回: メディアイベント開催（懇親会）',
          ],
          newRelationships: [
            'LinkedIn接続 + パーソナライズメッセージ',
            '過去記事への感想・フィードバック',
            '関連イベントでのネットワーキング',
          ],
        },
        pitchingTechniques: {
          personalization: {
            research: [
              '記者の過去記事分析（関心トピック把握）',
              'SNS活動確認（最近の関心事）',
              '媒体の編集方針理解',
            ],
            customization: [
              '記者の関心に合わせた角度提案',
              '過去記事への言及',
              '独自データ・視点提供',
            ],
          },
          timing: {
            bestTimes: [
              '火曜-木曜 10:00-11:00（週明け・週末避ける）',
              '締切前日は避ける',
              '業界イベント前後（関連性高い時期）',
            ],
            urgency: [
              '独占期間設定（Tier1に24-48時間エンバーゴ）',
              'ニュースバリュー強調（業界初、記録達成等）',
            ],
          },
          followUp: {
            sequence: [
              'Day 0: 初回ピッチメール',
              'Day 3: フォローアップ（追加情報提供）',
              'Day 7: 電話フォロー（興味確認）',
              'Day 14: 別角度での再ピッチ',
            ],
            persistence: '最大3回まで、しつこくならない',
          },
        },
        pitchTemplate: {
          emailSubject: '[記者名]様 | [媒体読者にとってのベネフィット]',
          emailBody: `
件名例: 「田中様 | 日経読者向け: AI導入コスト50%削減の新手法」

田中様

お世話になっております。株式会社サンプル 広報の山田と申します。

貴誌で連載されている「AI導入最前線」を拝読し、大変興味深く感じました。
特に、[具体的記事タイトル]での[具体的ポイント]は、まさに業界の課題を的確に捉えていると感じました。

今回、貴誌の読者様にご関心いただけると思われる情報がございます:

【見出し】中小企業のAI導入を阻む「3つの壁」を破る新ソリューション

【ポイント】
- 導入コスト: 従来の1/10（¥500万→¥50万）
- 導入期間: 3ヶ月→1週間に短縮
- 専門知識不要: ノーコードで設定可能

【独自データ】
当社が1,000社調査した結果、中小企業の82%が「コスト」を理由にAI導入を断念。
本ソリューションにより、この障壁を克服できます。

【取材機会】
- CEO インタビュー（AIビジネス展望）
- 導入企業の成功事例（売上30%増の具体例）
- プロダクトデモ（実際の動作確認）

ご興味があれば、詳細資料をお送りいたします。
また、[曜日・時間]に15分ほどお電話でご説明させていただくことも可能です。

ご多忙の中恐縮ですが、ご検討いただけますと幸いです。

株式会社サンプル 広報部
山田太郎
Email: pr@sample.com / Tel: 03-1234-5678
          `,
        },
      },
      contentOfferings: {
        exclusiveContent: {
          tier1Only: [
            'エンバーゴ付き事前情報（24-48時間独占）',
            'CEO独占インタビュー',
            '未発表データ・調査結果',
            '業界予測・見解',
          ],
        },
        sharedContent: {
          allMedia: [
            'プレスリリース',
            '高解像度画像・動画',
            'プロダクトデモ',
            '導入事例',
            'ファクトシート',
          ],
        },
        valueAddedContent: {
          ongoing: [
            '業界レポート（四半期）',
            '専門家コメント（トレンド関連）',
            '独自調査データ',
            'インフォグラフィック',
          ],
        },
      },
      measurementTracking: {
        kpi: {
          outreach: {
            emailsSent: 50,
            openRate: '目標35%以上',
            responseRate: '目標15%以上',
            meetingsBooked: '目標10件以上',
          },
          coverage: {
            totalMentions: '目標80件以上',
            tier1Placements: '目標5件以上',
            tier2Placements: '目標15件以上',
            tier3Placements: '目標60件以上',
          },
          reach: {
            totalImpressions: '目標100M以上',
            websiteReferrals: '目標50,000訪問',
            socialShares: '目標10,000シェア',
          },
        },
        tools: {
          mediaMonitoring: 'Googleアラート、Mention、Meltwater',
          analytics: 'Google Analytics（参照元トラッキング）',
          crm: 'メディア関係管理（Notion/Airtable）',
        },
      },
      timeline: {
        week1_2: {
          focus: 'リスト作成・リサーチ',
          tasks: [
            'ターゲットメディア50件リスト化',
            '記者プロフィール調査',
            'ピッチ資料準備',
          ],
        },
        week3_4: {
          focus: 'Tier1アウトリーチ',
          tasks: [
            'Tier1メディア個別ピッチ（10件）',
            '事前ブリーフィング実施',
            'フォローアップ',
          ],
        },
        week5_6: {
          focus: 'Tier2-3アウトリーチ',
          tasks: [
            'Tier2-3メディア一斉ピッチ（40件）',
            'プレスリリース配信',
            '問い合わせ対応',
          ],
        },
        week7_8: {
          focus: '取材対応・フォロー',
          tasks: [
            '取材・インタビュー対応',
            '追加情報提供',
            '掲載記事シェア',
          ],
        },
      },
      expectedResults: {
        coverage: {
          tier1: '5媒体（日経、TechCrunch、NHK等）',
          tier2: '15媒体（ITmedia、CNET等）',
          tier3: '60媒体（ブログ、ニッチメディア）',
          total: '80媒体',
        },
        reach: {
          estimatedImpressions: 100000000,
          uniqueVisitors: 20000000,
          socialEngagement: 50000,
        },
        businessImpact: {
          websiteTraffic: '+100,000訪問',
          leads: '+800件',
          mediaValue: '¥20,000,000（広告換算）',
          seoImpact: '被リンク+80件、DA+5',
        },
      },
      summary: `メディアアウトリーチ計画完了。Tier1（日経・TechCrunch・NHK）10件、Tier2-3 40件。個別ピッチ、独占コンテンツ提供、8週間計画で80媒体掲載、リーチ1億、メディア価値¥20M達成見込み。`,
    };

    return outreachPlan;
  }

  /**
   * 危機管理
   */
  private async manageCrisis(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Managing crisis situation...');

    const crisis = input.crisis || this.generateSampleCrisis();

    const crisisManagement = {
      crisisType: crisis.type,
      severity: crisis.severity,
      description: crisis.description,
      immediateResponse: {
        phase1: {
          timeframe: '0-1時間（Golden Hour）',
          actions: [
            {
              priority: 'Critical',
              action: '危機管理チーム招集',
              team: ['CEO', 'PR責任者', '法務', '技術責任者', '顧客対応責任者'],
              method: '緊急会議（即座）',
            },
            {
              priority: 'Critical',
              action: '事実確認・情報収集',
              tasks: [
                '被害状況確認（影響範囲、深刻度）',
                '原因特定（技術チーム）',
                'タイムライン整理（いつ、何が、なぜ）',
                'ステークホルダー特定（顧客、パートナー、従業員、投資家、メディア）',
              ],
            },
            {
              priority: 'Critical',
              action: 'ソーシャルメディア監視強化',
              method: '自動アラート設定、24時間モニタリング体制',
            },
            {
              priority: 'High',
              action: '初期声明準備',
              content: [
                '事実認識の表明',
                '深刻さの理解',
                '調査中であることの明言',
                '次の更新タイミング予告',
              ],
              approvalProcess: 'CEO + 法務承認必須',
            },
          ],
        },
        phase2: {
          timeframe: '1-3時間',
          actions: [
            {
              priority: 'Critical',
              action: '公式声明発表',
              channels: [
                '自社ウェブサイト（専用ページ作成）',
                'SNS（Twitter、Facebook、LinkedIn）',
                '報道機関へのプレスリリース',
                '顧客へのEmail',
              ],
              statementTemplate: this.generateCrisisStatement(crisis),
            },
            {
              priority: 'Critical',
              action: 'ステークホルダー直接連絡',
              targets: [
                { stakeholder: '主要顧客（Top 100）', method: '電話 + Email',担当: 'アカウントマネージャー' },
                { stakeholder: 'パートナー企業', method: 'Email', 担当: 'パートナーシップチーム' },
                { stakeholder: '投資家', method: '電話', 担当: 'CFO' },
                { stakeholder: '従業員', method: '全社ミーティング + Email', 担当: 'CEO' },
              ],
            },
            {
              priority: 'High',
              action: 'メディア問い合わせ窓口設置',
              setup: [
                '専用電話回線',
                '専用Email（crisis@sample.com）',
                'FAQシート準備',
                '担当者トレーニング（統一メッセージ）',
              ],
            },
          ],
        },
        phase3: {
          timeframe: '3-24時間',
          actions: [
            {
              priority: 'High',
              action: '定期アップデート配信',
              frequency: '4-6時間ごと',
              content: [
                '進捗状況',
                '新たに判明した事実',
                '対策実施状況',
                '次回アップデート予告',
              ],
            },
            {
              priority: 'High',
              action: 'メディア対応',
              approach: [
                '取材要請には積極対応（透明性重視）',
                'スポークスパーソン指定（CEO or PR責任者）',
                'メッセージ統一（全員が同じ情報）',
              ],
            },
            {
              priority: 'Medium',
              action: 'ソーシャルリスニング',
              monitoring: [
                'ブランドメンション追跡',
                'センチメント分析',
                '誤情報・デマ特定',
                'インフルエンサー反応確認',
              ],
            },
          ],
        },
      },
      communicationStrategy: {
        keyMessages: {
          acknowledge: [
            '問題を深刻に受け止めている',
            '影響を受けた方々へのお詫び',
            '責任を認識している',
          ],
          transparency: [
            '事実を隠さず公開',
            '調査状況の定期報告',
            '質問に誠実に回答',
          ],
          action: [
            '即座の対策実施',
            '原因究明の徹底',
            '再発防止策',
          ],
          commitment: [
            '顧客第一の姿勢',
            '信頼回復への決意',
            '長期的な改善',
          ],
        },
        tone: {
          do: [
            '誠実、謙虚、共感的',
            '事実ベース、具体的',
            '責任ある、行動志向',
          ],
          dont: [
            '防衛的、言い訳がましい',
            '曖昧、抽象的',
            '他者への責任転嫁',
          ],
        },
        messageFramework: {
          whatHappened: '何が起きたか（事実）',
          whatWereДoing: '何をしているか（対策）',
          whatWevelearned: '何を学んだか（反省）',
          whatsNext: '今後どうするか（再発防止）',
        },
      },
      channelStrategy: {
        ownedMedia: {
          website: {
            action: '専用危機管理ページ作成',
            url: 'https://www.sample.com/crisis-response',
            content: [
              '最新アップデート（タイムスタンプ）',
              'FAQ',
              '問い合わせ先',
              '過去のアップデート履歴',
            ],
            update: '4-6時間ごと',
          },
          social: {
            twitter: {
              action: 'スレッド投稿 + ピン固定',
              frequency: '新情報ごと',
              tone: '簡潔、事実ベース',
            },
            facebook: {
              action: '詳細投稿',
              comments: '積極的に返信、丁寧に対応',
            },
            linkedin: {
              action: 'B2B向け専門的説明',
              audience: 'ビジネスパートナー、投資家',
            },
          },
          email: {
            customers: {
              segment: '影響を受けた顧客 + 全顧客',
              timing: '初期声明後1時間以内',
              content: 'パーソナライズされた説明、対応策',
            },
            partners: {
              timing: '顧客Email直後',
              content: 'ビジネスへの影響、サポート体制',
            },
            employees: {
              timing: '外部発表と同時',
              content: '内部状況、外部対応方針、統一メッセージ',
            },
          },
        },
        earnedMedia: {
          proactive: {
            pressRelease: '公式声明としてプレスリリース配信',
            mediaKit: '背景資料、FAQ、スポークスパーソン情報',
            interviews: 'Tier1メディアにCEOインタビュー提供',
          },
          reactive: {
            mediaInquiries: '24時間以内に全て回答',
            factChecking: 'デマ・誤報に即座訂正',
            monitoring: 'メディア掲載リアルタイム追跡',
          },
        },
      },
      recoveryPlan: {
        shortTerm: {
          timeframe: '1-7日',
          objectives: [
            '初期対応完了、被害拡大防止',
            'ステークホルダー安心確保',
            'メディア報道の沈静化',
          ],
          actions: [
            '技術的修正完了・検証',
            '全ステークホルダーへの説明完了',
            '補償・サポート開始',
            '詳細調査報告書公開',
          ],
        },
        mediumTerm: {
          timeframe: '1-4週間',
          objectives: [
            '信頼回復開始',
            '通常業務復帰',
            'ブランドイメージ修復',
          ],
          actions: [
            '再発防止策実装',
            '第三者監査実施・結果公表',
            'ポジティブストーリー展開（改善活動、顧客サポート事例）',
            '業界イベント登壇（透明性アピール）',
          ],
        },
        longTerm: {
          timeframe: '1-6ヶ月',
          objectives: [
            '完全信頼回復',
            'ブランド価値向上',
            '危機を機会に変換',
          ],
          actions: [
            '改善成果の可視化（データ公表）',
            '顧客満足度調査・結果公表',
            '業界リーダーシップ発揮（ベストプラクティス共有）',
            'CSR活動強化',
          ],
        },
      },
      riskMitigation: {
        preventativeMeasures: [
          '危機管理マニュアル整備',
          '定期的危機シミュレーション訓練（年4回）',
          'ソーシャルメディア監視体制',
          'スポークスパーソントレーニング',
        ],
        monitoringSystems: [
          'ブランドモニタリングツール（24/7）',
          '顧客フィードバックシステム',
          '内部通報制度',
          '早期警告指標（KRI）設定',
        ],
      },
      successMetrics: {
        immediate: {
          responseTime: '初期声明1時間以内',
          stakeholderReach: '主要ステークホルダー100%連絡',
          mediaAccuracy: '誤報訂正率100%',
        },
        shortTerm: {
          sentimentImprovement: 'ネガティブ80% → 40%（1週間）',
          mediaToPositive: 'ポジティブ報道50%以上（2週間）',
          customerRetention: '解約率10%以内',
        },
        longTerm: {
          brandRecovery: 'ブランド認知度・好感度元の水準に回復（3ヶ月）',
          businessImpact: '売上・成長率元の軌道に復帰（6ヶ月）',
          industryReputation: '業界イベント登壇、メディア寄稿再開',
        },
      },
      summary: `危機管理計画完了。${crisis.severity}レベル「${crisis.type}」対応。Golden Hour（1時間）で初期声明、24時間で全ステークホルダー連絡、1週間で沈静化、3ヶ月で信頼回復目標。透明性・誠実性・迅速性を軸に対応。`,
    };

    return crisisManagement;
  }

  /**
   * ブランドストーリーテリング
   */
  private async developBrandStory(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Developing brand storytelling strategy...');

    const brandStory = {
      objective: 'ブランドアイデンティティ確立、感情的つながり構築',
      brandNarrative: {
        origin Story: {
          title: '起業家の挫折から生まれたソリューション',
          narrative: `
2019年、創業者の田中一郎は、前職で営業マネージャーとして多忙を極めていた。
日々、300件の顧客問い合わせに追われ、重要な商談に集中できない日々。
チームは疲弊し、顧客満足度は低下。何とかしたいと思いながらも、打つ手がなかった。

「このままでは、自分もチームも潰れてしまう」

そんな時、AI技術の可能性を知る。しかし、既存のAIツールは高額で複雑。
中小企業には手が届かない。ならば、自分で作ろう。

退職を決意し、2020年、株式会社サンプルを設立。
「すべての企業が、AIの恩恵を受けられる世界を作る」
それが、私たちのミッションの始まりだった。
          `,
          keyElements: [
            '創業者の個人的体験（共感）',
            '明確な課題（中小企業のAI導入障壁）',
            '使命感（すべての企業にAIを）',
            '挑戦（大企業向けツールに一石を投じる）',
          ],
        },
        missionVision: {
          mission: 'AIで世界中のビジネスを加速する',
          vision: 'すべての企業が、規模に関係なく、AIを活用して成長できる世界',
          values: [
            '顧客第一: 顧客の成功が私たちの成功',
            'イノベーション: 常に改善、常に挑戦',
            'アクセシビリティ: 誰でも使える、手が届く',
            '透明性: オープンで誠実なコミュニケーション',
            'インパクト: 社会に意味ある変化をもたらす',
          ],
        },
        heroJourney: {
          ordinaryWorld: '多くの中小企業がAI導入に苦しんでいた',
          callToAdventure: '創業者自身が直面した課題',
          refusalOfCall: '既存ツールは高額・複雑、諦めかけた',
          meetingMentor: 'テクノロジーの可能性を信じる仲間との出会い',
          crossingThreshold: '起業決意、プロダクト開発開始',
          testsAlliesEnemies: '資金難、技術的困難、大手競合',
          approach: '顧客フィードバック重視、MVP改善',
          ordeal: 'コロナ禍での資金繰り危機',
          reward: '最初の100社導入、顧客の成功事例',
          roadBack: 'プロダクト完成、スケール開始',
          resurrection: '1,000社突破、業界認知獲得',
          returnWithElixir: '中小企業のAI民主化実現、さらなる成長へ',
        },
      },
      storytellingFormats: {
        founderStory: {
          format: 'ロングフォーム記事・動画',
          length: '2,000-3,000語 / 5-7分動画',
          distribution: [
            'Medium（ブログ）',
            'LinkedIn（創業者投稿）',
            'YouTube（ドキュメンタリー風）',
            'Podcast（起業家インタビュー番組）',
          ],
          keyMessages: [
            '個人的挫折から生まれた使命',
            '顧客の痛みを理解（自分が経験）',
            '諦めない姿勢',
            'ビジョンへの情熱',
          ],
        },
        customerSuccessStories: {
          format: 'ケーススタディ・動画証言',
          structure: {
            before: '導入前の課題（共感）',
            challenge: '具体的な痛み（数字で表現）',
            solution: '導入プロセス（簡単さ強調）',
            after: '導入後の変化（劇的改善）',
            results: '定量的成果（売上+30%等）',
            quote: '顧客の生の声',
          },
          examples: [
            {
              customer: '中小EC企業（従業員20名）',
              before: '顧客問い合わせ対応に1日6時間、スタッフ疲弊',
              after: '対応時間80%削減、スタッフは戦略業務へ、売上30%増',
              quote: '「導入前は諦めかけていました。今では、なくてはならない存在です」',
            },
            {
              customer: '製造業（従業員50名）',
              before: '見積もり作成に平均3日、失注リスク',
              after: '見積もり自動化で30分に短縮、受注率20%向上',
              quote: '「お客様の反応スピードが劇的に改善しました」',
            },
          ],
          distribution: [
            'ウェブサイト（専用ページ）',
            'YouTube（短編動画）',
            '営業資料',
            'ウェビナー',
          ],
        },
        behindTheScenes: {
          format: 'SNS投稿・ブログ・Vlog',
          content: [
            'プロダクト開発の舞台裏',
            'チームメンバー紹介',
            'オフィス風景・文化',
            '失敗談・学び',
            '顧客訪問・サポート',
          ],
          frequency: '週2-3回',
          platforms: ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'],
          benefit: '親近感、透明性、人間味',
        },
        dataStories: {
          format: 'インフォグラフィック・レポート',
          topics: [
            '業界調査: 中小企業AI導入率（独自調査）',
            'ベンチマークデータ: AI導入による平均効果',
            'トレンド分析: AI技術の進化予測',
          ],
          storytellingAngle: [
            '課題の深刻さを数字で示す',
            'ソリューションの効果を実証',
            '未来の可能性を描く',
          ],
          distribution: [
            'プレスリリース',
            'メディア寄稿',
            'SNS',
            'ウェビナー',
          ],
        },
      },
      contentCalendar: {
        monthly: {
          week1: {
            theme: 'インスピレーション',
            content: ['創業者メッセージ', 'ビジョン再確認', '業界トレンド'],
          },
          week2: {
            theme: '顧客成功',
            content: ['ケーススタディ', '顧客インタビュー', '成果データ'],
          },
          week3: {
            theme: 'プロダクト・イノベーション',
            content: ['新機能紹介', '開発舞台裏', '技術解説'],
          },
          week4: {
            theme: 'コミュニティ・文化',
            content: ['チーム紹介', '社会貢献活動', 'イベントレポート'],
          },
        },
        quarterly: {
          q1: { bigStory: '年次レポート（前年の成果・学び）' },
          q2: { bigStory: 'プロダクトメジャーアップデート' },
          q3: { bigStory: '顧客サミット（ユーザーカンファレンス）' },
          q4: { bigStory: '来年ビジョン・ロードマップ' },
        },
      },
      channelStrategy: {
        owned: {
          blog: {
            frequency: '週2回',
            topics: ['業界インサイト', 'ハウツー', 'ケーススタディ', '会社ニュース'],
            tone: '専門的だが親しみやすい',
          },
          socialMedia: {
            linkedin: {
              frequency: '週5回',
              content: ['業界トレンド', 'ソートリーダーシップ', 'プロダクト情報'],
              tone: 'プロフェッショナル',
            },
            twitter: {
              frequency: '日3-5回',
              content: ['クイックインサイト', 'ニュース反応', '顧客交流'],
              tone: 'カジュアル、リアルタイム',
            },
            instagram: {
              frequency: '週3回',
              content: ['ビジュアルストーリー', 'チーム文化', 'ビハインドシーン'],
              tone: 'クリエイティブ、人間味',
            },
            youtube: {
              frequency: '月4回',
              content: ['チュートリアル', 'ケーススタディ動画', 'ウェビナー録画'],
              tone: '教育的、価値提供',
            },
          },
          email: {
            newsletter: {
              frequency: '月2回',
              content: ['ハイライト記事', '顧客成功事例', 'プロダクトTips'],
              subscribers: 50000,
            },
          },
        },
        earned: {
          guestPosting: {
            frequency: '月2回',
            outlets: ['TechCrunch', 'Forbes', '日経ビジネス', 'Diamond Online'],
            topics: ['AI導入ベストプラクティス', '業界トレンド予測', 'リーダーシップ'],
          },
          podcast: {
            frequency: '月1回',
            shows: ['スタートアップ系', 'マーケティング系', 'テクノロジー系'],
            format: '創業者・幹部インタビュー',
          },
          speaking: {
            frequency: '四半期1-2回',
            events: ['SXSW', 'WebSummit', 'IVS', 'B Dash Camp', '業界カンファレンス'],
            topics: ['AIの民主化', '中小企業DX', 'スタートアップ成長戦略'],
          },
        },
        paid: {
          sponsoredContent: {
            budget: 500000,
            outlets: ['NewsPicks', 'Forbes JAPAN', 'ビジネス+IT'],
            format: 'ブランドストーリー記事',
          },
          nativeAdvertising: {
            budget: 300000,
            platforms: ['SmartNews', 'Gunosy'],
            content: '顧客成功ストーリー',
          },
        },
      },
      measurementFramework: {
        awareness: {
          metrics: [
            'ブランドメンション数',
            'メディア掲載回数',
            'ソーシャルリーチ',
            'ウェブサイトトラフィック',
          ],
          target: {
            mentions: '月間500件',
            mediaPickup: '月間20件',
            socialReach: '月間100万',
            websiteVisits: '月間50,000',
          },
        },
        engagement: {
          metrics: [
            'ソーシャルエンゲージメント率',
            'ブログ滞在時間',
            '動画視聴完了率',
            'Emailオープン率',
          ],
          target: {
            socialEngagement: '5%以上',
            blogDwellTime: '3分以上',
            videoCompletion: '60%以上',
            emailOpenRate: '30%以上',
          },
        },
        sentiment: {
          metrics: ['ブランドセンチメント（ポジティブ率）', 'NPS（Net Promoter Score）'],
          target: {
            positiveSentiment: '75%以上',
            nps: '50以上',
          },
        },
        business: {
          metrics: [
            'ブランド起因のリード',
            '指名検索数',
            '顧客ライフタイムバリュー',
            '従業員エンゲージメント',
          ],
          target: {
            brandLeads: '月間300件',
            brandedSearch: '月間10,000検索',
            ltv: '+20%向上',
            employeeNPS: '70以上',
          },
        },
      },
      summary: `ブランドストーリーテリング戦略完了。創業者の挫折から生まれた使命、顧客成功物語、舞台裏コンテンツで感情的つながり構築。月次テーマ別（週4テーマ）、5チャネル（Blog・SNS・Email・寄稿・登壇）展開。目標: 月間メンション500件、ポジティブセンチメント75%、ブランドリード300件。`,
    };

    return brandStory;
  }

  /**
   * インフルエンサーリレーション
   */
  private async manageInfluencerRelations(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Managing influencer relations...');

    const influencerRelations = {
      objective: 'ブランド認知拡大、信頼性向上、ターゲットオーディエンスリーチ',
      influencerTiers: {
        mega: {
          definition: 'フォロワー100万人以上',
          examples: [
            {
              name: 'テックインフルエンサーA',
              platform: 'YouTube',
              followers: 1500000,
              engagementRate: 3.5,
              niche: ['テクノロジー', 'ガジェット', 'ビジネスツール'],
              reach: 'マス層',
              cost: '1投稿¥500,000-1,000,000',
              use Case: 'プロダクトローンチ時の大規模認知',
            },
          ],
          strategy: '年1-2回の大型キャンペーンのみ活用',
        },
        macro: {
          definition: 'フォロワー10万-100万人',
          examples: [
            {
              name: 'ビジネス系YouTuber B',
              platform: 'YouTube',
              followers: 500000,
              engagementRate: 4.2,
              niche: ['起業', 'ビジネススキル', '効率化'],
              reach: '起業家・ビジネスパーソン',
              cost: '1投稿¥200,000-400,000',
              useCase: 'プロダクトレビュー、ハウツーコンテンツ',
            },
            {
              name: 'マーケターC（LinkedIn）',
              platform: 'LinkedIn',
              followers: 150000,
              engagementRate: 5.8,
              niche: ['マーケティング', 'SaaS', 'ビジネス成長'],
              reach: 'マーケター、経営層',
              cost: '1投稿¥100,000-200,000',
              useCase: 'ソートリーダーシップ、ケーススタディ共有',
            },
          ],
          strategy: '四半期1-2回のコラボレーション',
        },
        micro: {
          definition: 'フォロワー1万-10万人',
          examples: [
            {
              name: 'スタートアップブロガーD',
              platform: 'Blog + Twitter',
              followers: 50000,
              engagementRate: 8.5,
              niche: ['スタートアップ', 'ツールレビュー', '生産性'],
              reach: 'スタートアップ関係者、アーリーアダプター',
              cost: '1投稿¥50,000-100,000',
              useCase: '詳細レビュー、長文分析',
            },
            {
              name: 'Eコマース専門家E（Instagram）',
              platform: 'Instagram',
              followers: 30000,
              engagementRate: 12.3,
              niche: ['Eコマース', 'マーケティングツール', '売上向上'],
              reach: 'Eコマース事業者',
              cost: '1投稿¥30,000-60,000',
              useCase: '業界特化コンテンツ',
            },
          ],
          strategy: '月2-3件の継続的パートナーシップ',
        },
        nano: {
          definition: 'フォロワー1,000-1万人',
          examples: [
            {
              name: '業界コミュニティリーダー（複数）',
              platform: 'Twitter + LinkedIn',
              followers: 5000,
              engagementRate: 15.0,
              niche: ['特定業界（製造、小売等）', 'ニッチツール'],
              reach: '高度にターゲットされたオーディエンス',
              cost: '製品提供のみ or ¥10,000-20,000',
              useCase: 'コミュニティ内での口コミ、アーリーアダプター獲得',
            },
          ],
          strategy: '月10-20件のアンバサダープログラム',
        },
      },
      relationshipBuilding: {
        identification: {
          criteria: [
            'オーディエンスの関連性（ターゲット市場と一致）',
            'エンゲージメント率（フォロワー数より重要）',
            'コンテンツ品質（ブランド価値観と一致）',
            '過去のパフォーマンス（類似案件での成果）',
            '信頼性（フォロワー本物、スパム行為なし）',
          ],
          tools: [
            'BuzzSumo（インフルエンサー発掘）',
            'Klear（分析・管理）',
            'Upfluence（キャンペーン管理）',
            '手動リサーチ（LinkedIn、Twitter検索）',
          ],
          process: [
            'ステップ1: ニッチ・キーワードで検索',
            'ステップ2: エンゲージメント率・オーディエンス確認',
            'ステップ3: コンテンツ品質評価',
            'ステップ4: 過去案件リサーチ',
            'ステップ5: ショートリスト作成（50-100人）',
          ],
        },
        outreach: {
          approach: {
            doResearch: [
              '過去コンテンツ熟読',
              '興味・関心の理解',
              'パーソナルな接点発見',
            ],
            doPersonalize: [
              '具体的な過去投稿への言及',
              'なぜこのインフルエンサーか明確に',
              '相互メリット提示',
            ],
            dontSpam: [
              'テンプレート丸出しNG',
              '一方的な依頼NG',
              '過度なフォローアップNG',
            ],
          },
          emailTemplate: `
件名: [インフルエンサー名]様のコンテンツに感銘を受けました

[インフルエンサー名]様

初めまして。株式会社サンプルの広報担当、山田と申します。

先日、[具体的な投稿・動画タイトル]を拝見し、特に[具体的ポイント]に大変感銘を受けました。
[フォロワー数]人のフォロワー様が、[インフルエンサー名]様のコンテンツから価値を得ているのも納得です。

私どもは、[製品・サービス説明]を提供しており、
[インフルエンサー名]様のオーディエンスである[ターゲット層]の方々に
まさにお役立ていただけるソリューションです。

具体的には:
- [ベネフィット1]
- [ベネフィット2]
- [ベネフィット3]

つきましては、以下のようなコラボレーションをご提案させていただきます:
1. 製品無料提供 + 率直なレビュー
2. [具体的コンテンツ案（例: ハウツー動画、ケーススタディ）]
3. [報酬・対価]

もちろん、[インフルエンサー名]様のクリエイティブな自由を最大限尊重いたします。

ご興味があれば、15分ほどお電話でお話しさせていただくことも可能です。
[曜日・時間]のご都合はいかがでしょうか？

ご多忙の中恐縮ですが、ご検討いただけますと幸いです。

株式会社サンプル 広報部
山田太郎
Email: pr@sample.com / Tel: 03-1234-5678
          `,
        },
      },
      collaborationTypes: {
        productReview: {
          format: 'インフルエンサーが製品を使用し、率直なレビュー',
          compensation: '製品無料提供 + 報酬（オプション）',
          timeline: '2-4週間（製品試用期間含む）',
          deliverables: [
            'YouTube動画（10-15分）',
            'ブログ記事（2,000語）',
            'SNS投稿（3-5投稿）',
          ],
          disclosure: '#PR #提供 表記必須',
        },
        sponsoredContent: {
          format: 'ブランド協賛コンテンツ',
          compensation: '報酬ベース',
          timeline: '1-2週間',
          deliverables: [
            '統合型コンテンツ（製品が自然に登場）',
            '専用ディスカウントコード',
            'アフィリエイトリンク',
          ],
          disclosure: '#AD #sponsored 表記必須',
        },
        ambassadorProgram: {
          format: '長期パートナーシップ',
          compensation: '月額報酬 + 成果報酬 + 製品',
          duration: '6-12ヶ月',
          deliverables: [
            '月2-4回の投稿',
            'イベント登壇',
            'プロダクトフィードバック',
            'コミュニティ運営',
          ],
          benefits: [
            '安定した露出',
            'ブランドロイヤリティ',
            '本物の推薦',
          ],
        },
        coCreation: {
          format: '共同コンテンツ制作',
          compensation: '相互メリット（露出 vs コンテンツ）',
          examples: [
            'ウェビナー共同開催',
            'eBook共著',
            'ポッドキャスト出演',
            'ケーススタディ作成',
          ],
          benefits: [
            '高品質コンテンツ',
            '相互オーディエンス拡大',
            '専門性アピール',
          ],
        },
        eventParticipation: {
          format: '自社イベントへの招待・登壇',
          compensation: '謝礼 + 旅費 + 露出',
          events: [
            '製品ローンチイベント',
            'ユーザーカンファレンス',
            'ウェビナー',
          ],
          benefits: [
            'リアルタイムエンゲージメント',
            'イベント集客',
            'コンテンツ素材（録画）',
          ],
        },
      },
      campaignManagement: {
        planning: {
          goals: '明確なKPI設定（リーチ、エンゲージメント、コンバージョン）',
          budget: '全体マーケティング予算の10-20%',
          timeline: 'キャンペーン開始4-8週間前から準備',
          briefing: [
            'キャンペーン目的・背景',
            'ターゲットオーディエンス',
            'キーメッセージ',
            'クリエイティブガイドライン',
            'Do's and Don'ts',
            '納期・スケジュール',
          ],
        },
        execution: {
          kickoff: 'インフルエンサーとのキックオフミーティング',
          support: [
            '製品提供・トレーニング',
            '資料・アセット提供',
            '質問対応（24時間以内）',
          ],
          approval: 'コンテンツ事前承認（過度な干渉は避ける）',
          launch: '同時リリース or 段階的リリース',
          amplification: '自社チャネルでシェア・増幅',
        },
        measurement: {
          metrics: {
            reach: 'インプレッション、リーチ、フォロワー増加',
            engagement: 'いいね、コメント、シェア、保存',
            traffic: 'ウェブサイト訪問、リンククリック',
            conversion: 'リード、トライアル、購入',
            sentiment: 'コメント・メンションのセンチメント分析',
            roi: '費用対効果（売上 / インフルエンサー投資）',
          },
          tools: [
            'UTMパラメータ（トラフィック追跡）',
            'ディスカウントコード（コンバージョン追跡）',
            'ソーシャルリスニングツール（エンゲージメント追跡）',
            'Googleアナリティクス（ウェブ行動）',
          ],
          reporting: '週次・月次レポート、インフルエンサーと共有',
        },
      },
      bestPractices: {
        authenticity: [
          'インフルエンサーのクリエイティブ自由を尊重',
          '過度なスクリプト避ける',
          '本物の体験・意見を重視',
        ],
        transparency: [
          'PR表記必須（法的要件）',
          '報酬・対価の明示',
          '期待値の明確化',
        ],
        longTermRelationships: [
          '一度きりでなく、継続的パートナーシップ',
          'インフルエンサーの成長支援',
          '相互メリットの関係',
        ],
        compliance: [
          '景品表示法遵守',
          'ステルスマーケティング禁止',
          'プラットフォームガイドライン遵守',
        ],
      },
      expectedResults: {
        quarterly: {
          influencerPartnerships: 15,
          breakdown: {
            mega: 0,
            macro: 2,
            micro: 8,
            nano: 5,
          },
          budget: 3000000,
        },
        impact: {
          reach: '総リーチ5,000,000人',
          engagement: 'エンゲージメント150,000',
          websiteTraffic: '+20,000訪問',
          leads: '+300件',
          roi: '400%（売上¥12M / 投資¥3M）',
        },
        brandImpact: {
          awareness: 'ブランド認知度+20%',
          consideration: 'ブランド検討率+15%',
          trustサ信頼性+25%（インフルエンサー推薦効果）',
        },
      },
      summary: `インフルエンサーリレーション戦略完了。4層（Mega・Macro・Micro・Nano）15パートナーシップ/四半期。5コラボ形態（レビュー・スポンサー・アンバサダー・共創・イベント）。予算¥3M、目標リーチ500万人、ROI 400%。`,
    };

    return influencerRelations;
  }

  /**
   * PR戦略策定
   */
  private async createPRStrategy(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Creating comprehensive PR strategy...');

    const prStrategy = {
      objective: '12ヶ月でブランド認知度3倍、業界リーダーポジション確立',
      situationAnalysis: {
        swot: {
          strengths: [
            '革新的プロダクト（業界初の機能）',
            '導入実績1,000社',
            '高い顧客満足度（98%）',
            '強力な創業ストーリー',
          ],
          weaknesses: [
            'ブランド認知度低い',
            '大手競合との知名度ギャップ',
            'PR予算限定的',
            'メディアリレーション未成熟',
          ],
          opportunities: [
            'AI市場急成長（年30%成長）',
            'メディアのAI関心高い',
            '中小企業DX機運',
            'インフルエンサー活用余地',
          ],
          threats: [
            '大手テック企業の参入',
            '競合の積極的PR活動',
            'AI規制強化の可能性',
            '市場の飽和',
          ],
        },
        competitorAnalysis: {
          competitor A: {
            prActivity: '月間メディア掲載50件、強力な広報体制',
            strengths: 'ブランド力、予算',
            weaknesses: '革新性欠如、顧客との距離',
            ourDifferentiation: 'ストーリーテリング、顧客密着',
          },
          competitorB: {
            prActivity: 'インフルエンサー活用、SNS強い',
            strengths: 'デジタルマーケティング',
            weaknesses: '信頼性、実績',
            ourDifferentiation: '実績・データ、メディア権威性',
          },
        },
      },
      strategicPillars: {
        pillar1: {
          name: 'ソートリーダーシップ確立',
          objective: 'AI導入の専門家として業界認知',
          tactics: [
            {
              tactic: 'メディア寄稿',
              frequency: '月2回',
              outlets: ['日経ビジネス', 'Forbes', 'Diamond Online', 'TechCrunch'],
              topics: ['AI導入ベストプラクティス', '業界トレンド予測', '中小企業DX'],
            },
            {
              tactic: 'カンファレンス登壇',
              frequency: '四半期2回',
              events: ['IVS', 'B Dash Camp', 'Marketing Summit', 'SaaS Conference'],
              role: 'キーノート or パネリスト',
            },
            {
              tactic: '独自調査発表',
              frequency: '四半期1回',
              topics: ['中小企業AI導入率調査', 'ROI分析レポート', '業界ベンチマーク'],
              distribution: 'プレスリリース + メディア寄稿',
            },
            {
              tactic: 'ポッドキャスト出演',
              frequency: '月1回',
              shows: ['スタートアップ系', 'マーケティング系', 'ビジネス系'],
              format: '創業者・CTO出演',
            },
          ],
          kpi: {
            mediaPickup: '月間20件',
            speaking: '年間8回',
            podcastReach: '累計50万リスナー',
          },
        },
        pillar2: {
          name: 'プロダクト・イノベーション広報',
          objective: '革新性・差別化を訴求',
          tactics: [
            {
              tactic: 'プロダクトローンチPR',
              timing: '新機能・バージョンアップごと',
              approach: [
                'Tier1メディアエンバーゴ（独占）',
                'プレスリリース配信',
                'デモ・ハンズオン',
              ],
            },
            {
              tactic: 'アワード・認証取得',
              targets: [
                'グッドデザイン賞',
                'IT賞（各種）',
                'ISO認証',
                'セキュリティ認証',
              ],
              benefit: '第三者評価、信頼性向上',
            },
            {
              tactic: 'パートナーシップ発表',
              timing: '大手企業・著名ブランドとの提携時',
              approach: '共同プレスリリース、ケーススタディ',
            },
          ],
          kpi: {
            launches: '年間4回',
            awards: '年間2件受賞',
            partnerships: '年間5件発表',
          },
        },
        pillar3: {
          name: '顧客成功ストーリー',
          objective: '実績・信頼性の証明',
          tactics: [
            {
              tactic: 'ケーススタディ制作',
              frequency: '月2件',
              format: ['テキスト記事', '動画証言', 'インフォグラフィック'],
              distribution: ['ウェブサイト', 'SNS', 'メディア提供', '営業資料'],
            },
            {
              tactic: '顧客インタビューメディア掲載',
              frequency: '四半期1件',
              approach: 'メディアに顧客を紹介、第三者視点での紹介',
              benefit: '客観性、信頼性',
            },
            {
              tactic: 'ユーザーカンファレンス',
              frequency: '年1回',
              規模: '300-500名',
              content: ['顧客事例発表', 'ネットワーキング', 'プロダクトロードマップ'],
              prValue: 'メディア招待、SNS拡散、コミュニティ構築',
            },
          ],
          kpi: {
            caseStudies: '年間24件',
            mediaFeatures: '年間4件（顧客登場）',
            conferenceAttendees: 500名,
          },
        },
        pillar4: {
          name: 'インフルエンサー・コミュニティ',
          objective: 'オーガニックな口コミ拡大',
          tactics: [
            {
              tactic: 'インフルエンサーパートナーシップ',
              details: '前述のインフルエンサーリレーション戦略実行',
              frequency: '四半期15件',
            },
            {
              tactic: 'アンバサダープログラム',
              targets: '熱心ユーザー50名',
              incentives: ['早期アクセス', '限定イベント', '特典'],
              activities: ['SNS投稿', 'レビュー', 'コミュニティ運営'],
            },
            {
              tactic: 'オンラインコミュニティ構築',
              platform: 'Slack / Discord',
              members: '1,000名目標',
              content: ['Q&A', 'Tips共有', 'フィードバック', 'ネットワーキング'],
            },
          ],
          kpi: {
            influencerPosts: '四半期15件',
            ambassadors: '50名',
            communityMembers: '1,000名',
          },
        },
      },
      integrated Campaigns: {
        q1: {
          campaign: '新年度キャンペーン',
          theme: '2025年、AIで業務効率革命',
          activities: [
            'プレスリリース: 年間成果報告',
            'メディア寄稿: 2025年AI予測',
            'ウェビナー: 新年度AI導入ガイド',
            'SNSキャンペーン: #AI効率化チャレンジ',
          ],
        },
        q2: {
          campaign: 'プロダクトメジャーアップデート',
          theme: '業界初機能リリース',
          activities: [
            'プレスリリース: 新機能発表',
            'Tier1メディア独占',
            'インフルエンサーレビュー（10件）',
            'ユーザー事例（5件）',
          ],
        },
        q3: {
          campaign: 'ユーザーカンファレンス',
          theme: '顧客成功祭典',
          activities: [
            'イベント開催（500名）',
            'メディア招待・取材',
            'ライブ配信（オンライン1,000名）',
            'ハイライト記事・動画制作',
          ],
        },
        q4: {
          campaign: '年末総括・未来展望',
          theme: '2025年の成果、2026年のビジョン',
          activities: [
            'プレスリリース: 年間ハイライト',
            'アワード応募・受賞発表',
            '2026年ロードマップ発表',
            'メディアラウンドテーブル',
          ],
        },
      },
      budgetAllocation: {
        total: 10000000,
        breakdown: {
          prWireServices: {
            budget: 1000000,
            percentage: 10,
            use: 'プレスリリース配信（月4回）',
          },
          influencerRelations: {
            budget: 3000000,
            percentage: 30,
            use: 'インフルエンサーパートナーシップ（四半期15件）',
          },
          events: {
            budget: 2500000,
            percentage: 25,
            use: 'カンファレンス開催・登壇・スポンサー',
          },
          contentCreation: {
            budget: 1500000,
            percentage: 15,
            use: '動画・記事・デザイン制作',
          },
          mediaMonitoring: {
            budget: 500000,
            percentage: 5,
            use: 'ツール（Meltwater等）',
          },
          contingency: {
            budget: 1500000,
            percentage: 15,
            use: '危機管理、機会対応',
          },
        },
      },
      timeline: {
        month1_3: {
          focus: '基盤構築',
          milestones: [
            'メディアリスト作成（100件）',
            'プレスキット準備',
            '初回プレスリリース配信',
            'インフルエンサー特定・アウトリーチ',
          ],
          kpi: {
            mediaPickup: '20件',
            influencerPosts: '5件',
            websiteTraffic: '+10,000訪問',
          },
        },
        month4_6: {
          focus: 'メディアリレーション強化',
          milestones: [
            'Tier1メディア掲載5件',
            'カンファレンス登壇2回',
            'インフルエンサーキャンペーン実施',
            'ケーススタディ6件公開',
          ],
          kpi: {
            mediaPickup: '40件（累計60件）',
            speakingEngagements: 2,
            influencerReach: '2M',
          },
        },
        month7_9: {
          focus: 'スケール・イベント',
          milestones: [
            'ユーザーカンファレンス開催',
            'アワード受賞',
            'メディア寄稿10本',
            'ポッドキャスト出演6回',
          ],
          kpi: {
            mediaPickup: '60件（累計120件）',
            eventAttendees: 500,
            awards: 1,
          },
        },
        month10_12: {
          focus: 'リーダーシップ確立',
          milestones: [
            '年間成果発表',
            '2026年ビジョン発表',
            'メディアラウンドテーブル',
            'インフルエンサーアンバサダープログラム確立',
          ],
          kpi: {
            mediaPickup: '80件（累計200件）',
            brandAwareness: '+200%',
            industryRanking: 'Top 3認知',
          },
        },
      },
      measurementFramework: {
        outputs: {
          pressReleases: '年間24回',
          mediaPickup: '年間200件',
          socialPosts: '年間500回',
          speakingEngagements: '年間8回',
        },
        outcomes: {
          mediaImpressions: '100M',
          websiteTraffic: '+200,000訪問',
          socialReach: '10M',
          leads: '+2,000件',
        },
        impact: {
          brandAwareness: '+200%',
          brandConsideration: '+150%',
          marketShare: '+5%',
          revenue: '+¥100M（PR起因）',
        },
      },
      summary: `総合PR戦略策定完了。4戦略柱（ソートリーダーシップ・プロダクトPR・顧客ストーリー・インフルエンサー）、四半期統合キャンペーン。予算¥10M、12ヶ月でメディア200件、リーチ100M、ブランド認知度+200%、売上貢献¥100M達成目標。`,
    };

    return prStrategy;
  }

  /**
   * メディアモニタリング
   */
  private async monitorMedia(input: PRSpecialistTaskInput): Promise<any> {
    this.log('Setting up media monitoring system...');

    const mediaMonitoring = {
      objective: 'ブランドメンション追跡、センチメント分析、競合監視、危機早期発見',
      monitoringTargets: {
        brandMentions: {
          keywords: [
            'ブランド名',
            'プロダクト名',
            'CEO名',
            'キーパーソン名',
            'キャンペーンハッシュタグ',
          ],
          channels: ['ニュースメディア', 'ブログ', 'SNS', 'フォーラム', 'レビューサイト'],
          languages: ['日本語', '英語'],
        },
        industryTrends: {
          keywords: [
            'AI自動化',
            'AIツール',
            '業務効率化AI',
            '中小企業DX',
            'マーケティングAI',
          ],
          purpose: '業界トレンド把握、コンテンツネタ発掘',
        },
        competitors: {
          targets: ['競合A', '競合B', '競合C'],
          monitoring: [
            'プレスリリース',
            'メディア掲載',
            'SNS活動',
            '新製品・機能',
            'パートナーシップ',
          ],
          purpose: '競合動向把握、差別化機会発見',
        },
        keyJournalists: {
          targets: ['田中記者（日経）', '山田編集長（TechCrunch）', '佐藤ディレクター（NHK）'],
          monitoring: '記事・投稿、関心トピック',
          purpose: 'ピッチ機会発見、関係構築',
        },
        crisisSignals: {
          keywords: [
            'ブランド名 + 問題',
            'ブランド名 + 不具合',
            'ブランド名 + 炎上',
            'セキュリティ',
            '個人情報',
          ],
          threshold: 'メンション急増（平均の3倍）、ネガティブセンチメント70%以上',
          alertLevel: 'Critical（即座対応）',
        },
      },
      tools: {
        tier1: {
          tool: 'Meltwater',
          coverage: 'グローバルニュース、SNS、ブログ',
          features: [
            'リアルタイムアラート',
            'センチメント分析',
            'インフルエンサー特定',
            'レポート自動生成',
          ],
          cost: '月額¥150,000',
        },
        tier2: {
          tool: 'Brandwatch',
          coverage: 'SNS特化（Twitter、Instagram、Facebook、YouTube、Reddit）',
          features: [
            'ソーシャルリスニング',
            'オーディエンス分析',
            'トレンド発見',
            'ビジュアル分析',
          ],
          cost: '月額¥100,000',
        },
        tier3: {
          tool: 'Google アラート',
          coverage: 'Googleインデックスコンテンツ',
          features: ['基本メンション通知'],
          cost: '無料',
        },
        supplementary: {
          tools: [
            { name: 'TweetDeck', use: 'Twitter リアルタイム監視', cost: '無料' },
            { name: 'Mention', use: 'Web・SNS メンション', cost: '月額¥30,000' },
            { name: 'Talkwalker Alerts', use: 'Google アラート代替', cost: '無料' },
          ],
        },
      },
      alertsConfiguration: {
        realTime: {
          trigger: [
            'Tier1メディア掲載',
            'ネガティブメンション（センチメント<-0.5）',
            '危機キーワード',
            'メンション急増（1時間で10件以上）',
          ],
          delivery: 'Slack通知 + SMS（担当者）',
          response: '1時間以内に確認・対応',
        },
        daily: {
          trigger: '日次サマリー',
          content: [
            '総メンション数',
            'メディア掲載リスト',
            'センチメントスコア',
            'トップメンション',
            '競合動向',
          ],
          delivery: 'Email（毎朝8時）',
        },
        weekly: {
          trigger: '週次レポート',
          content: [
            'メンション推移グラフ',
            'センチメント分析',
            'トップメディア・インフルエンサー',
            '競合比較',
            'トレンドトピック',
          ],
          delivery: 'ダッシュボード + PDF',
          meeting: 'チーム週次ミーティングで共有',
        },
        monthly: {
          trigger: '月次包括レポート',
          content: [
            'メディア価値（AVE）',
            'SOV（Share of Voice）分析',
            'キャンペーン効果測定',
            '競合ベンチマーク',
            '推奨アクション',
          ],
          delivery: 'エグゼクティブプレゼン',
        },
      },
      sentimentAnalysis: {
        methodology: {
          tool: 'AI搭載センチメント分析（Meltwater、Brandwatch）',
          categories: ['ポジティブ', 'ニュートラル', 'ネガティブ'],
          scoring: '-1.0（完全ネガティブ）〜 +1.0（完全ポジティブ）',
          accuracy: '機械学習 + 人間レビュー（サンプル10%）',
        },
        targets: {
          overall: '全体センチメント目標: +0.6以上',
          breakdown: {
            news: '目標: +0.7（権威性）',
            social: '目標: +0.5（カジュアル、賛否両論ありえる）',
            reviews: '目標: +0.8（製品満足度）',
          },
        },
        actionThresholds: {
          positive: {
            threshold: '+0.8以上',
            action: 'ポジティブメンション拡散、感謝メッセージ',
          },
          neutral: {
            threshold: '+0.3〜+0.7',
            action: '通常モニタリング',
          },
          negative: {
            threshold: '-0.3〜+0.3',
            action: '原因分析、改善検討',
          },
          crisis: {
            threshold: '-0.3未満',
            action: '危機管理プロトコル発動',
          },
        },
      },
      competitiveIntelligence: {
        shareOfVoice: {
          definition: '業界メンション全体における自社シェア',
          calculation: '自社メンション / (自社 + 競合A + 競合B + 競合C)',
          currentSOV: '15%',
          targetSOV: '35%（12ヶ月後）',
          benchmark: '競合A 45%、競合B 25%、競合C 15%',
        },
        competitorTracking: {
          alerts: [
            '競合プレスリリース',
            '競合メディア掲載（Tier1）',
            '競合製品発表',
            '競合パートナーシップ',
            '競合ネガティブニュース',
          ],
          analysis: [
            'メッセージング比較',
            'メディア戦略分析',
            '差別化機会発見',
          ],
          action: '競合動向に基づくタイムリーな対応',
        },
      },
      crisisDetection: {
        earlyWarningSignals: [
          {
            signal: 'メンション急増',
            threshold: '平均の3倍以上（1時間）',
            severity: 'Medium-High',
          },
          {
            signal: 'ネガティブセンチメント急上昇',
            threshold: 'ネガティブ70%以上',
            severity: 'High',
          },
          {
            signal: '危機キーワード検出',
            keywords: ['炎上', '不具合', 'セキュリティ侵害', '訴訟'],
            severity: 'Critical',
          },
          {
            signal: 'インフルエンサーネガティブ投稿',
            threshold: 'フォロワー10万人以上',
            severity: 'High',
          },
        ],
        escalationProtocol: {
          level1: {
            severity: 'Low',
            response: 'PR担当者モニタリング',
            timeframe: '24時間以内対応',
          },
          level2: {
            severity: 'Medium',
            response: 'PR責任者へエスカレーション',
            timeframe: '4時間以内対応',
          },
          level3: {
            severity: 'High',
            response: '危機管理チーム招集',
            timeframe: '1時間以内対応',
          },
          level4: {
            severity: 'Critical',
            response: 'CEO含む全社対応',
            timeframe: '即座対応（30分以内）',
          },
        },
      },
      reportingDashboard: {
        realTimeDashboard: {
          tool: 'Looker Studio / Power BI',
          widgets: [
            'メンション数（リアルタイム）',
            'センチメントスコア',
            'トップメンション',
            'メディア掲載',
            'アラート',
          ],
          access: 'PR チーム全員（常時表示）',
        },
        executiveDashboard: {
          frequency: '週次更新',
          metrics: [
            'メディア掲載数',
            'メディア価値（AVE）',
            'SOV',
            'センチメント推移',
            'キャンペーンROI',
          ],
          format: 'ビジュアル重視、1ページサマリー',
        },
      },
      expectedResults: {
        coverage: {
          mentions: '月間500件（現状100件）',
          mediaValue: '月間¥5M',
          sov: '35%（現状15%）',
        },
        sentiment: {
          overall: '+0.65',
          positive: '70%',
          neutral: '25%',
          negative: '5%',
        },
        crisisManagement: {
          detectionTime: '平均15分（発生→検知）',
          responseTime: '平均45分（検知→初期対応）',
          crisisPrevention: '年間3件未然防止',
        },
        competitiveIntelligence: {
          opportunities: '月間5件特定',
          actionableInsights: '週間10件',
        },
      },
      summary: `メディアモニタリング体制構築完了。Meltwater+Brandwatch 24/7監視、4レベルアラート（リアルタイム・日次・週次・月次）。センチメント分析、SOV追跡、危機早期発見。目標: 月間500メンション、センチメント+0.65、SOV 35%、危機検知15分以内。`,
    };

    return mediaMonitoring;
  }

  // ユーティリティメソッド

  private generateSampleAnnouncement(): AnnouncementDetails {
    return {
      type: 'product-launch',
      title: '業界初！AIエージェント「Miyabi」月額¥50,000で中小企業の業務効率10倍へ',
      summary:
        '株式会社サンプルは、中小企業向けAIエージェント「Miyabi」を2025年11月1日にリリース。従来¥500万だったAI導入コストを¥50,000/月に削減し、誰でも簡単に業務自動化を実現。',
      date: '2025-10-15',
      keyMessages: [
        '業界初: 月額¥50,000の低価格AIエージェント',
        '業務効率10倍、人件費50%削減',
        '導入期間1週間（従来3ヶ月）',
        '既に1,000社が導入、顧客満足度98%',
      ],
      targetAudience: ['中小企業経営者', 'マーケティング担当者', 'IT担当者', 'メディア'],
      supportingData: {
        導入実績: 1000,
        顧客満足度: 98,
        平均ROI: 450,
        導入期間: '1週間',
      },
    };
  }

  private generateSampleCrisis(): CrisisDetails {
    return {
      type: 'service-outage',
      severity: 'high',
      description:
        '2025年10月15日 14:00、サーバー障害によりサービスが2時間停止。5,000社の顧客に影響。現在復旧済みだが、データ損失の報告あり。',
      affectedStakeholders: ['顧客5,000社', 'パートナー企業', 'メディア', '投資家', '従業員'],
      timeline:
        '14:00 障害発生 → 14:15 検知 → 14:30 調査開始 → 16:00 復旧 → 16:30 原因特定',
    };
  }

  private generateSampleMediaTargets(): MediaTarget[] {
    return [
      {
        name: '日本経済新聞',
        type: 'newspaper',
        tier: 'tier1',
        audience: 'ビジネスパーソン、経営層',
        reach: 30000000,
        contact: {
          name: '田中太郎',
          role: 'テクノロジー担当記者',
          email: 'example@example.com',
          relationship: 'medium',
        },
      },
      {
        name: 'TechCrunch Japan',
        type: 'online',
        tier: 'tier1',
        audience: 'スタートアップ、テック業界',
        reach: 20000000,
        contact: {
          name: '山田花子',
          role: '編集長',
          email: 'yamada@techcrunch.jp',
          relationship: 'strong',
        },
      },
      {
        name: 'ITmedia',
        type: 'online',
        tier: 'tier2',
        audience: 'IT担当者、ビジネスパーソン',
        reach: 15000000,
      },
    ];
  }

  private generateLeadParagraph(announcement: AnnouncementDetails): string {
    return `株式会社サンプル（本社：東京都、代表取締役CEO：田中一郎）は、${announcement.date}、${announcement.summary}。これにより、これまでAI導入を断念していた中小企業でも、手軽に業務効率化が実現できるようになる。`;
  }

  private generateCrisisStatement(crisis: CrisisDetails): string {
    return `
【公式声明】サービス障害に関するお詫びとご報告

お客様各位

平素より弊社サービスをご利用いただき、誠にありがとうございます。

${crisis.description}

この度のサービス障害により、お客様の業務に多大なるご迷惑をおかけしましたこと、深くお詫び申し上げます。

【現状】
・現在、サービスは完全復旧しております
・障害の原因を特定し、再発防止策を実施いたしました
・データ損失の報告については、個別に調査・対応を進めております

【今後の対応】
・影響を受けたお客様への個別ご連絡
・詳細な調査報告書の作成・公開（48時間以内）
・再発防止策の徹底実施
・補償・サポート体制の整備

お客様の信頼を損ねる事態となりましたこと、重ねてお詫び申し上げます。
今後、このようなことが二度と起こらないよう、全社一丸となって取り組んでまいります。

ご不明な点やご懸念がございましたら、下記までお問い合わせください。
専用サポート窓口: crisis@sample.com / 03-1234-5678（24時間対応）

引き続き、弊社サービスをご愛顧賜りますよう、何卒よろしくお願い申し上げます。

2025年10月15日
株式会社サンプル
代表取締役CEO 田中一郎
    `;
  }

  protected async cleanup(): Promise<void> {
    this.log('AI PR Specialist Agent cleanup completed');
  }
}
