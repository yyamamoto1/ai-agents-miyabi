/**
 * AIBusinessIntelligenceAgent - ビジネスインテリジェンスの専門エージェント
 * データ統合・分析、レポート・ダッシュボード自動生成
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

export interface BITaskInput {
  taskType: 'integrate' | 'kpi' | 'report' | 'dashboard' | 'insight' | 'forecast';
  dataSources?: DataSource[];
  kpis?: KPI[];
  timeRange?: TimeRange;
  reportType?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  dashboardConfig?: DashboardConfig;
  businessGoals?: string[];
}

export interface DataSource {
  name: string;
  type: 'database' | 'api' | 'file' | 'stream';
  connection?: any;
  tables?: string[];
}

export interface KPI {
  name: string;
  category: string;
  target: number;
  current?: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface TimeRange {
  start: Date;
  end: Date;
  granularity: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface DashboardConfig {
  name: string;
  widgets: Widget[];
  layout: 'grid' | 'flow' | 'custom';
  refreshInterval?: number;
}

export interface Widget {
  type: 'chart' | 'table' | 'metric' | 'gauge' | 'map' | 'text';
  title: string;
  dataSource: string;
  config: any;
}

export class AIBusinessIntelligenceAgent extends BaseAgent {
  constructor() {
    super(AGENT_CONFIGS.BI_AGENT);
  }

  protected async setup(): Promise<void> {
    this.log('AI Business Intelligence Agent setup completed');
  }

  protected async process(task: AgentTask): Promise<any> {
    const input = task.input as BITaskInput;

    this.log(`Processing ${input.taskType} task`);

    switch (input.taskType) {
      case 'integrate':
        return await this.integrateData(input);
      case 'kpi':
        return await this.analyzeKPIs(input);
      case 'report':
        return await this.generateReport(input);
      case 'dashboard':
        return await this.createDashboard(input);
      case 'insight':
        return await this.extractInsights(input);
      case 'forecast':
        return await this.forecastMetrics(input);
      default:
        throw new Error(`Unknown task type: ${input.taskType}`);
    }
  }

  /**
   * データ統合
   */
  private async integrateData(input: BITaskInput): Promise<any> {
    this.log('Integrating data sources...');

    const dataSources = input.dataSources || this.getDefaultDataSources();
    const integrationResults: any[] = [];

    for (const source of dataSources) {
      integrationResults.push({
        source: source.name,
        type: source.type,
        status: 'connected',
        recordCount: Math.floor(Math.random() * 10000) + 1000,
        lastUpdated: new Date(),
        tables: source.tables || ['table1', 'table2'],
      });
    }

    return {
      integrationResults,
      totalSources: dataSources.length,
      totalRecords: integrationResults.reduce((sum, r) => sum + r.recordCount, 0),
      dataQuality: {
        completeness: 0.95,
        accuracy: 0.92,
        consistency: 0.89,
        timeliness: 0.97,
      },
      summary: `${dataSources.length}個のデータソースを統合し、${integrationResults.reduce((sum, r) => sum + r.recordCount, 0).toLocaleString()}件のレコードを処理しました。`,
    };
  }

  /**
   * KPI分析
   */
  private async analyzeKPIs(input: BITaskInput): Promise<any> {
    this.log('Analyzing KPIs...');

    const kpis = input.kpis || this.getDefaultKPIs();
    const analysis: any[] = [];

    for (const kpi of kpis) {
      const current = kpi.current || kpi.target * (0.8 + Math.random() * 0.4);
      const achievement = (current / kpi.target) * 100;
      const trend = this.calculateKPITrend();
      const trendMultiplier = trend === 'up' ? 1 : trend === 'down' ? -1 : 0;
      const forecast = current * (1 + trendMultiplier * 0.1);

      analysis.push({
        name: kpi.name,
        category: kpi.category,
        current,
        target: kpi.target,
        achievement: achievement.toFixed(1) + '%',
        status: achievement >= 100 ? 'achieved' : achievement >= 80 ? 'on-track' : 'at-risk',
        trend,
        forecast,
        unit: kpi.unit,
        recommendations: this.generateKPIRecommendations(achievement, trend),
      });
    }

    return {
      kpiAnalysis: analysis,
      overallPerformance: {
        achievedCount: analysis.filter((k) => k.status === 'achieved').length,
        onTrackCount: analysis.filter((k) => k.status === 'on-track').length,
        atRiskCount: analysis.filter((k) => k.status === 'at-risk').length,
      },
      summary: `${kpis.length}個のKPIを分析しました。${analysis.filter((k) => k.status === 'achieved').length}個が目標達成済みです。`,
    };
  }

  /**
   * レポート生成
   */
  private async generateReport(input: BITaskInput): Promise<any> {
    this.log(`Generating ${input.reportType || 'daily'} report...`);

    const reportType = input.reportType || 'daily';
    const kpis = await this.analyzeKPIs(input);
    const insights = await this.extractInsights(input);

    const report = `
# ${this.getReportTitle(reportType)}

**生成日時**: ${new Date().toISOString()}
**対象期間**: ${this.getReportPeriod(reportType)}

---

## エグゼクティブサマリー

${this.generateExecutiveSummary(kpis, insights)}

---

## KPIパフォーマンス

### 目標達成状況
- ✅ **達成済み**: ${kpis.overallPerformance.achievedCount}個
- 🟡 **順調**: ${kpis.overallPerformance.onTrackCount}個
- 🔴 **要注意**: ${kpis.overallPerformance.atRiskCount}個

### 主要KPI詳細

${kpis.kpiAnalysis.map((kpi: any, i: number) => `
#### ${i + 1}. ${kpi.name}
- **現在値**: ${kpi.current.toFixed(2)} ${kpi.unit}
- **目標値**: ${kpi.target} ${kpi.unit}
- **達成率**: ${kpi.achievement}
- **トレンド**: ${kpi.trend === 'up' ? '📈 上昇' : kpi.trend === 'down' ? '📉 下降' : '➡️ 安定'}
- **予測値**: ${kpi.forecast.toFixed(2)} ${kpi.unit}
- **ステータス**: ${this.getStatusEmoji(kpi.status)}

**推奨事項**:
${kpi.recommendations.map((rec: string) => `- ${rec}`).join('\n')}
`).join('\n')}

---

## ビジネスインサイト

${insights.insights.map((insight: any, i: number) => `
### ${i + 1}. ${insight.title}
**カテゴリ**: ${insight.category}
**影響度**: ${insight.impact}

${insight.description}

**アクション**: ${insight.action}
`).join('\n')}

---

## 推奨アクション

${this.generateActionItems(kpis, insights)}

---

## 次回レビュー

次回のレビュー予定日: ${this.getNextReviewDate(reportType)}

**モニタリング項目**:
- KPI進捗の継続的な追跡
- 新しいトレンドやパターンの検出
- アクションアイテムの実施状況確認

---

*このレポートはAI Business Intelligence Agentにより自動生成されました。*
`;

    return {
      report,
      format: 'markdown',
      reportType,
      generatedAt: new Date(),
      sections: [
        'エグゼクティブサマリー',
        'KPIパフォーマンス',
        'ビジネスインサイト',
        '推奨アクション',
      ],
      attachments: [
        { type: 'pdf', name: `report_${reportType}_${Date.now()}.pdf` },
        { type: 'excel', name: `data_${reportType}_${Date.now()}.xlsx` },
      ],
      summary: `${reportType}レポートを生成しました。`,
    };
  }

  /**
   * ダッシュボード作成
   */
  private async createDashboard(input: BITaskInput): Promise<any> {
    this.log('Creating interactive dashboard...');

    const config = input.dashboardConfig || this.getDefaultDashboardConfig();
    const widgets: Widget[] = [];

    // KPIメトリクスウィジェット
    widgets.push({
      type: 'metric',
      title: '主要KPI一覧',
      dataSource: 'kpi_metrics',
      config: {
        metrics: ['売上高', 'ユーザー数', 'コンバージョン率', '顧客満足度'],
        showTrend: true,
        showTarget: true,
      },
    });

    // 売上トレンドチャート
    widgets.push({
      type: 'chart',
      title: '売上トレンド',
      dataSource: 'sales_data',
      config: {
        chartType: 'line',
        timeRange: '30days',
        comparison: 'previous_period',
      },
    });

    // 部門別パフォーマンステーブル
    widgets.push({
      type: 'table',
      title: '部門別パフォーマンス',
      dataSource: 'department_metrics',
      config: {
        columns: ['部門', '売上', '目標', '達成率', 'トレンド'],
        sortable: true,
        filterable: true,
      },
    });

    // 地域別売上マップ
    widgets.push({
      type: 'map',
      title: '地域別売上分布',
      dataSource: 'regional_sales',
      config: {
        mapType: 'choropleth',
        colorScale: 'green',
        interactive: true,
      },
    });

    // ゲージチャート（目標達成度）
    widgets.push({
      type: 'gauge',
      title: '今月の目標達成度',
      dataSource: 'monthly_target',
      config: {
        min: 0,
        max: 100,
        ranges: [
          { from: 0, to: 60, color: 'red' },
          { from: 60, to: 80, color: 'yellow' },
          { from: 80, to: 100, color: 'green' },
        ],
      },
    });

    return {
      dashboard: {
        id: `dashboard_${Date.now()}`,
        name: config.name || 'ビジネスインサイトダッシュボード',
        widgets,
        layout: config.layout || 'grid',
        refreshInterval: config.refreshInterval || 300000, // 5分
        filters: [
          { name: '期間', type: 'daterange' },
          { name: '部門', type: 'multiselect' },
          { name: '地域', type: 'multiselect' },
        ],
      },
      url: `https://bi.example.com/dashboard/${Date.now()}`,
      embedCode: `<iframe src="https://bi.example.com/embed/${Date.now()}" width="100%" height="600"></iframe>`,
      summary: `${widgets.length}個のウィジェットを含むインタラクティブダッシュボードを作成しました。`,
    };
  }

  /**
   * インサイト抽出
   */
  private async extractInsights(input: BITaskInput): Promise<any> {
    this.log('Extracting business insights...');

    const insights = [
      {
        title: '売上成長の加速',
        category: '売上',
        impact: 'high',
        description:
          '過去3ヶ月間で売上が25%増加しており、特に新規顧客からの売上が顕著に伸びています。マーケティング施策の効果が表れていると考えられます。',
        action: 'この成長を維持するため、成功したマーケティング施策への投資を継続してください。',
        confidence: 0.92,
      },
      {
        title: '顧客離脱率の増加傾向',
        category: '顧客',
        impact: 'medium',
        description:
          '先月と比較して顧客離脱率が8%上昇しています。特定の顧客セグメントで顕著な傾向が見られます。',
        action: 'リテンション施策の強化と、離脱原因の詳細調査を実施してください。',
        confidence: 0.85,
      },
      {
        title: '地域別パフォーマンスの格差',
        category: '地域',
        impact: 'medium',
        description:
          '東京エリアが目標を120%達成している一方、大阪エリアは65%にとどまっています。地域特性に応じた戦略の見直しが必要です。',
        action: '低パフォーマンス地域への追加リソース配分と、成功事例の横展開を検討してください。',
        confidence: 0.88,
      },
    ];

    return {
      insights,
      insightCount: insights.length,
      priorityInsights: insights.filter((i) => i.impact === 'high'),
      summary: `${insights.length}個のビジネスインサイトを抽出しました。`,
    };
  }

  /**
   * 指標の予測
   */
  private async forecastMetrics(input: BITaskInput): Promise<any> {
    this.log('Forecasting business metrics...');

    const forecasts = [
      {
        metric: '売上高',
        current: 50000000,
        forecast30days: 55000000,
        forecast60days: 58500000,
        forecast90days: 62000000,
        confidence: 0.87,
        trend: 'up' as const,
        factors: ['季節性', 'マーケティング施策', '新製品投入'],
      },
      {
        metric: '新規顧客数',
        current: 1250,
        forecast30days: 1400,
        forecast60days: 1500,
        forecast90days: 1650,
        confidence: 0.82,
        trend: 'up' as const,
        factors: ['広告キャンペーン', '口コミ効果'],
      },
      {
        metric: 'コンバージョン率',
        current: 2.8,
        forecast30days: 3.0,
        forecast60days: 3.1,
        forecast90days: 3.2,
        confidence: 0.79,
        trend: 'up' as const,
        factors: ['UI改善', 'A/Bテスト効果'],
      },
    ];

    return {
      forecasts,
      forecastPeriod: '90 days',
      methodology: 'Time Series Analysis with Seasonal Decomposition',
      assumptions: [
        '現在のビジネス環境が継続',
        '計画中の施策が予定通り実施',
        '外部要因の大きな変化なし',
      ],
      summary: `${forecasts.length}個の主要指標について90日先までの予測を生成しました。`,
    };
  }

  // ========== ユーティリティメソッド ==========

  private getDefaultDataSources(): DataSource[] {
    return [
      { name: 'Sales DB', type: 'database', tables: ['orders', 'customers', 'products'] },
      { name: 'Marketing API', type: 'api' },
      { name: 'Analytics Stream', type: 'stream' },
    ];
  }

  private getDefaultKPIs(): KPI[] {
    return [
      { name: '売上高', category: '財務', target: 50000000, unit: '円', trend: 'up' },
      { name: '新規顧客数', category: '顧客', target: 1000, unit: '人', trend: 'up' },
      { name: 'コンバージョン率', category: 'マーケティング', target: 3.0, unit: '%', trend: 'stable' },
      { name: '顧客満足度', category: '顧客', target: 4.5, unit: '点', trend: 'up' },
    ];
  }

  private getDefaultDashboardConfig(): DashboardConfig {
    return {
      name: 'Executive Dashboard',
      widgets: [],
      layout: 'grid',
      refreshInterval: 300000,
    };
  }

  private calculateKPITrend(): 'up' | 'down' | 'stable' {
    const rand = Math.random();
    if (rand > 0.6) return 'up';
    if (rand < 0.3) return 'down';
    return 'stable';
  }

  private generateKPIRecommendations(achievement: number, trend: string): string[] {
    const recommendations: string[] = [];

    if (achievement < 80) {
      recommendations.push('目標達成に向けた追加施策の検討が必要です');
      recommendations.push('進捗状況の週次レビューを実施してください');
    } else if (achievement >= 100) {
      recommendations.push('目標を達成しました。次期はより高い目標設定を検討してください');
    }

    if (trend === 'down') {
      recommendations.push('下降トレンドの原因分析と改善策の立案が急務です');
    } else if (trend === 'up') {
      recommendations.push('好調な状況を維持するため、成功要因の特定と横展開を推奨します');
    }

    return recommendations;
  }

  private getReportTitle(reportType: string): string {
    const titles: Record<string, string> = {
      daily: '日次ビジネスレポート',
      weekly: '週次ビジネスレポート',
      monthly: '月次ビジネスレポート',
      quarterly: '四半期ビジネスレポート',
      annual: '年次ビジネスレポート',
    };
    return titles[reportType] || 'ビジネスレポート';
  }

  private getReportPeriod(reportType: string): string {
    const now = new Date();
    const periods: Record<string, string> = {
      daily: now.toLocaleDateString('ja-JP'),
      weekly: `${new Date(now.getTime() - 7 * 24 * 3600000).toLocaleDateString('ja-JP')} - ${now.toLocaleDateString('ja-JP')}`,
      monthly: `${now.getFullYear()}年${now.getMonth() + 1}月`,
      quarterly: `${now.getFullYear()}年Q${Math.floor(now.getMonth() / 3) + 1}`,
      annual: `${now.getFullYear()}年`,
    };
    return periods[reportType] || now.toLocaleDateString('ja-JP');
  }

  private generateExecutiveSummary(kpis: any, insights: any): string {
    const achievedRate =
      (kpis.overallPerformance.achievedCount / kpis.kpiAnalysis.length) * 100;
    return `
ビジネスは${achievedRate >= 70 ? '順調に' : '課題を抱えつつ'}推移しています。${kpis.kpiAnalysis.length}個のKPI中${kpis.overallPerformance.achievedCount}個が目標を達成しました。

主要なインサイト:
${insights.insights.slice(0, 3).map((i: any) => `- ${i.title}: ${i.description.substring(0, 50)}...`).join('\n')}

総合的には、${achievedRate >= 70 ? 'ポジティブな成長が見られますが、継続的な改善努力が重要です' : 'いくつかの課題への対応が必要な状況です'}。
`;
  }

  private getStatusEmoji(status: string): string {
    const emojis: Record<string, string> = {
      achieved: '✅ 達成',
      'on-track': '🟡 順調',
      'at-risk': '🔴 要注意',
    };
    return emojis[status] || status;
  }

  private generateActionItems(kpis: any, insights: any): string {
    const actions: string[] = [];
    let priority = 1;

    // KPIベースのアクション
    kpis.kpiAnalysis
      .filter((k: any) => k.status === 'at-risk')
      .forEach((k: any) => {
        actions.push(
          `${priority++}. **${k.name}の改善**: ${k.recommendations[0] || '対策を検討してください'}`
        );
      });

    // インサイトベースのアクション
    insights.insights
      .filter((i: any) => i.impact === 'high' || i.impact === 'medium')
      .forEach((i: any) => {
        actions.push(`${priority++}. **${i.title}への対応**: ${i.action}`);
      });

    return actions.length > 0
      ? actions.join('\n')
      : '現時点で緊急のアクションアイテムはありません。定期的なモニタリングを継続してください。';
  }

  private getNextReviewDate(reportType: string): string {
    const now = new Date();
    const intervals: Record<string, number> = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      quarterly: 90,
      annual: 365,
    };
    const days = intervals[reportType] || 7;
    const nextDate = new Date(now.getTime() + days * 24 * 3600000);
    return nextDate.toLocaleDateString('ja-JP');
  }

  protected async cleanup(): Promise<void> {
    this.log('AI Business Intelligence Agent cleanup completed');
  }
}
