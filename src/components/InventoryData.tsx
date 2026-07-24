import { useState } from 'react';
import {
  LayoutDashboard,
  Database,
  Search,
  // Filter,
  // PlusCircle,
  // ExternalLink,
  CheckCircle2,
  // AlertTriangle,
  // Clock,
  // ShieldCheck,
  // Server,
  // Layers,
  // FileText,
  // UserCheck,
  // Tag,
  // BarChart3,
  // RefreshCw,
  // Eye,
  // ChevronRight,
  X,
  // TrendingUp,
  // Table,
  // Cpu,
  // Lock,
  // Sparkles,
  // Zap,
  // Info,
  Globe,
  // MapPin,
  // Building2,
  // Flag
} from 'lucide-react';

interface DashboardAsset {
  id: string;
  title: string;
  description: string;
  domain: 'Commercial' | 'Medical Affairs' | 'Supply Chain' | 'Finance' | 'R&D' | 'Compliance';
  platform: 'Power BI' | 'Tableau' | 'ThoughtSpot' | 'Qlik Sense';
  owner: string;
  certified: boolean;
  securityLevel: 'Restricted' | 'Confidential' | 'Internal';
  lastRefresh: string;
  refreshSLA: '100% Compliant' | 'At Risk' | 'Delayed';
  monthlyUsers: number;
  upstreamTables: string[];
  url: string;
  geo?: 'US' | 'EMEA' | 'Japan';
}

interface DataPipelineAsset {
  id: string;
  name: string;
  schema: string;
  type: 'Fact Table' | 'Dimension' | 'Semantic Model' | 'Staging Pipeline' | 'Analytical View';
  engine: 'Snowflake' | 'PostgreSQL' | 'BigQuery' | 'SQL Server';
  domain: string;
  rowCount: string;
  sizeGb: string;
  frequency: 'Real-time' | 'Hourly' | 'Daily' | 'Weekly';
  qualityScore: number;
  ownerTeam: string;
  downstreamDashboardsCount: number;
}

export default function InventoryData() {
  const [activeTab, setActiveTab] = useState<'dashboards_by_geo' | 'dashboards_and_data_assets_grid'>('dashboards_by_geo');
  
  // Dashboard state & filters
  const [dashSearch, setDashSearch] = useState('');
  const [dashDomainFilter, setDashDomainFilter] = useState('All');
  const [dashPlatformFilter, _setDashPlatformFilter] = useState('All');
  const [geoFilter, setGeoFilter] = useState<'All' | 'US' | 'EMEA' | 'Japan'>('All');
  const [geoViewMode, _setGeoViewMode] = useState<'columns' | 'table'>('columns');

  // Data Assets state & filters
  const [dataSearch, setDataSearch] = useState('');
  const [dataTypeFilter, _setDataTypeFilter] = useState('All');
  const [gridAssetCategory, _setGridAssetCategory] = useState<'All' | 'Dashboards' | 'Data Assets'>('All');

  // Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Geo Dashboards Data for US, EMEA, Japan with clean dummy data
  const regionalDashboards: DashboardAsset[] = [
    // US REGION
    {
      id: 'DASH-US-001',
      title: 'Sales Performance Overview',
      description: 'US commercial sales performance, quarterly revenue tracking, product volume, and territory breakdown.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US Commercial Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 04:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 420,
      upstreamTables: ['fact_us_sales_daily', 'dim_us_territory_master'],
      url: 'https://analytics.enterprise.com/reports/us-sales-overview',
      geo: 'US'
    },
    {
      id: 'DASH-US-002',
      title: 'Executive KPI Summary',
      description: 'US high-level executive performance summary, key operational metrics, and growth forecasts.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US VP Commercial Operations',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 05:30 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 510,
      upstreamTables: ['fact_us_exec_revenue_daily', 'dim_us_territory_master'],
      url: 'https://analytics.enterprise.com/reports/us-executive-summary',
      geo: 'US'
    },
    {
      id: 'DASH-US-003',
      title: 'Customer Experience Analytics',
      description: 'US customer satisfaction metrics, support response times, and sentiment tracking.',
      domain: 'Medical Affairs',
      platform: 'Tableau',
      owner: 'US Customer Experience Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-21 11:00 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 180,
      upstreamTables: ['fact_us_csat_events', 'dim_us_customer_catalog'],
      url: 'https://analytics.enterprise.com/reports/us-customer-experience',
      geo: 'US'
    },
    {
      id: 'DASH-US-004',
      title: 'Field Operations Tracker',
      description: 'US field team performance, regional coverage, account visits, and activity completion rates.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US Field Operations SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 02:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 340,
      upstreamTables: ['fact_us_field_calls', 'dim_us_account_master'],
      url: 'https://analytics.enterprise.com/reports/us-field-operations',
      geo: 'US'
    },
    {
      id: 'DASH-US-005',
      title: 'Marketing Campaign ROI',
      description: 'US digital marketing campaigns, channel engagement, lead conversion rates, and acquisition cost.',
      domain: 'Commercial',
      platform: 'ThoughtSpot',
      owner: 'US Marketing Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 01:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 220,
      upstreamTables: ['fact_us_campaign_metrics', 'dim_us_channel_registry'],
      url: 'https://analytics.enterprise.com/reports/us-marketing-campaigns',
      geo: 'US'
    },
    {
      id: 'DASH-US-006',
      title: 'Supply Chain & Logistics',
      description: 'US inventory levels, fulfillment accuracy, carrier lead times, and warehouse stock tracking.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'US Supply Chain Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 03:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 295,
      upstreamTables: ['fact_us_warehouse_stock', 'dim_us_fulfillment_center'],
      url: 'https://analytics.enterprise.com/reports/us-supply-chain',
      geo: 'US'
    },

    // EMEA REGION
    {
      id: 'DASH-EMEA-001',
      title: 'EMEA Regional Sales Summary',
      description: 'Pan-European commercial revenue, distributor metrics, currency variance, and country trends.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'EMEA Commercial Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 06:00 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 410,
      upstreamTables: ['fact_emea_sales_ledger', 'dim_emea_distributor'],
      url: 'https://analytics.enterprise.com/reports/emea-sales-summary',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-002',
      title: 'EMEA Activity Report',
      description: 'EMEA regional operations, field activities, regional meetings, and client interaction logs.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'EMEA Operations Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 03:30 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 310,
      upstreamTables: ['fact_emea_activity_monthly', 'dim_emea_country_master'],
      url: 'https://analytics.enterprise.com/reports/emea-activity-report',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-003',
      title: 'EMEA Operations & Logistics',
      description: 'EMEA warehouse inventory, distribution hub logistics, shipment status, and transit times.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'EMEA Supply Chain Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 01:45 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 195,
      upstreamTables: ['fact_emea_inventory', 'dim_emea_warehouse_nodes'],
      url: 'https://analytics.enterprise.com/reports/emea-operations',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-004',
      title: 'EMEA Financial Performance',
      description: 'European financial reporting, regional P&L, budget utilization, and operating expense analysis.',
      domain: 'Finance',
      platform: 'ThoughtSpot',
      owner: 'EMEA Finance Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-21 10:15 PM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 280,
      upstreamTables: ['fact_emea_pnl_monthly', 'dim_emea_cost_center'],
      url: 'https://analytics.enterprise.com/reports/emea-financials',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-005',
      title: 'EU Regulatory Compliance',
      description: 'European regulatory compliance monitoring, audit tracking, and policy adherence reports.',
      domain: 'Compliance',
      platform: 'Tableau',
      owner: 'EU Regulatory Affairs SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 05:00 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 165,
      upstreamTables: ['fact_eu_regulatory_logs', 'dim_eu_policy_framework'],
      url: 'https://analytics.enterprise.com/reports/eu-regulatory-compliance',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-006',
      title: 'Pan-European Revenue Tracker',
      description: 'Pan-European product pricing, market access status, revenue targets, and regional growth.',
      domain: 'Finance',
      platform: 'ThoughtSpot',
      owner: 'EMEA Market Access SME',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-21 09:30 PM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 140,
      upstreamTables: ['fact_emea_revenue_targets', 'dim_country_pricing'],
      url: 'https://analytics.enterprise.com/reports/pan-european-revenue',
      geo: 'EMEA'
    },

    // JAPAN REGION
    {
      id: 'DASH-JP-001',
      title: 'APAC Sales Performance',
      description: 'Japan and APAC commercial sales performance, distributor orders, and volume trends.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan Commercial Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 09:00 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 380,
      upstreamTables: ['fact_jp_wholesaler_sales', 'dim_jp_pricing_list'],
      url: 'https://analytics.enterprise.com/reports/apac-sales-performance',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-002',
      title: 'Japan Regional Overview',
      description: 'Territory-level performance, regional sales targets, adoption rates, and quarterly goals.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan Operations Manager',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 08:30 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 290,
      upstreamTables: ['fact_jp_regional_performance', 'dim_jp_region_master'],
      url: 'https://analytics.enterprise.com/reports/japan-regional-overview',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-003',
      title: 'Customer Service Metrics',
      description: 'Japan client support resolution times, inquiry tracking, and service quality scores.',
      domain: 'Medical Affairs',
      platform: 'ThoughtSpot',
      owner: 'Japan Service Quality Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 07:00 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 175,
      upstreamTables: ['fact_jp_support_tickets', 'dim_jp_client_registry'],
      url: 'https://analytics.enterprise.com/reports/japan-customer-service',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-004',
      title: 'Japan Executive Summary',
      description: 'Executive overview of Japan branch metrics, financial performance, and key milestones.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan General Manager',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 08:00 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 210,
      upstreamTables: ['fact_jp_exec_kpi_summary', 'dim_jp_market_forecast'],
      url: 'https://analytics.enterprise.com/reports/japan-executive-summary',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-005',
      title: 'Japan Inventory & Distribution',
      description: 'Wholesaler inventory levels, supply logistics, warehouse stock, and delivery lead times.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'Japan Logistics SME',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 06:30 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 160,
      upstreamTables: ['fact_jp_wholesaler_stocks', 'dim_jp_distribution_nodes'],
      url: 'https://analytics.enterprise.com/reports/japan-inventory-distribution',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-006',
      title: 'Partner & Client Engagement',
      description: 'Key client interaction logs, institutional partner meetings, and regional account engagement.',
      domain: 'Medical Affairs',
      platform: 'Tableau',
      owner: 'Japan Partner Relations Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 08:15 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 150,
      upstreamTables: ['fact_jp_client_engagements', 'dim_jp_partner_accounts'],
      url: 'https://analytics.enterprise.com/reports/japan-partner-engagement',
      geo: 'Japan'
    }
  ];

  // Sample Data Assets & Pipelines Catalog Data
  const dataAssets: DataPipelineAsset[] = [
    {
      id: 'TBL-DWH-01',
      name: 'fact_commercial_sales_daily',
      schema: 'commercial_dwh',
      type: 'Fact Table',
      engine: 'PostgreSQL',
      domain: 'Commercial',
      rowCount: '48.2 M',
      sizeGb: '14.8 GB',
      frequency: 'Daily',
      qualityScore: 99.4,
      ownerTeam: 'DWH Data Engineering',
      downstreamDashboardsCount: 8
    },
    {
      id: 'TBL-DWH-02',
      name: 'dim_healthcare_provider_v2',
      schema: 'master_data',
      type: 'Dimension',
      engine: 'PostgreSQL',
      domain: 'Master Data',
      rowCount: '1.2 M',
      sizeGb: '1.4 GB',
      frequency: 'Daily',
      qualityScore: 98.9,
      ownerTeam: 'Master Data Governance',
      downstreamDashboardsCount: 14
    },
    {
      id: 'TBL-DWH-03',
      name: 'semantic_global_sales_mart',
      schema: 'semantic_layer',
      type: 'Semantic Model',
      engine: 'PostgreSQL',
      domain: 'Commercial & Finance',
      rowCount: '12.5 M',
      sizeGb: '5.2 GB',
      frequency: 'Hourly',
      qualityScore: 99.8,
      ownerTeam: 'BI Semantic Modeling',
      downstreamDashboardsCount: 12
    },
    {
      id: 'TBL-DWH-04',
      name: 'pipe_veeva_crm_incremental',
      schema: 'staging_ingest',
      type: 'Staging Pipeline',
      engine: 'PostgreSQL',
      domain: 'Commercial Operations',
      rowCount: '850 K / day',
      sizeGb: '850 MB',
      frequency: 'Hourly',
      qualityScore: 97.5,
      ownerTeam: 'Data Integration Engineering',
      downstreamDashboardsCount: 5
    },
    {
      id: 'TBL-DWH-05',
      name: 'fact_inventory_snapshot',
      schema: 'supply_chain_dwh',
      type: 'Fact Table',
      engine: 'PostgreSQL',
      domain: 'Supply Chain',
      rowCount: '8.4 M',
      sizeGb: '3.1 GB',
      frequency: 'Daily',
      qualityScore: 99.1,
      ownerTeam: 'Supply Chain Engineering',
      downstreamDashboardsCount: 6
    },
    {
      id: 'TBL-DWH-06',
      name: 'vw_executive_kpi_aggregated',
      schema: 'reporting_views',
      type: 'Analytical View',
      engine: 'PostgreSQL',
      domain: 'Executive Reporting',
      rowCount: '450 K',
      sizeGb: '120 MB',
      frequency: 'Real-time',
      qualityScore: 100.0,
      ownerTeam: 'BI Core Operations',
      downstreamDashboardsCount: 9
    }
  ];

  // Filtering Regional Dashboards
  const filteredRegionalDashboards = regionalDashboards.filter((dash) => {
    const matchesSearch = dash.title.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          dash.id.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          dash.owner.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          dash.domain.toLowerCase().includes(dashSearch.toLowerCase());
    const matchesDomain = dashDomainFilter === 'All' || dash.domain === dashDomainFilter;
    const matchesPlatform = dashPlatformFilter === 'All' || dash.platform === dashPlatformFilter;
    const matchesGeo = geoFilter === 'All' || dash.geo === geoFilter;
    return matchesSearch && matchesDomain && matchesPlatform && matchesGeo;
  });

  const usDashboards = filteredRegionalDashboards.filter(d => d.geo === 'US');
  const emeaDashboards = filteredRegionalDashboards.filter(d => d.geo === 'EMEA');
  const japanDashboards = filteredRegionalDashboards.filter(d => d.geo === 'Japan');

  // Filtering Data Assets
  const filteredDataAssets = dataAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(dataSearch.toLowerCase()) ||
                          asset.id.toLowerCase().includes(dataSearch.toLowerCase()) ||
                          asset.schema.toLowerCase().includes(dataSearch.toLowerCase());
    const matchesType = dataTypeFilter === 'All' || asset.type === dataTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Light Blue Glassmorphism Hero Top Header */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden"> */}
        {/* Soft Ambient Light Glows */}
        {/* <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div> */}
        {/* <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Branding & Header */}
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <LayoutDashboard className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Inventory of Dashboards & Data Assets
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Centralized Enterprise Catalog, Data Lineage & Regional BI Governance Register
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6">
        
        {/* OVERVIEW CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
            Overview
          </h2>
          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              The Insmed Enterprise BI Data Catalog provides a single source of truth for all production BI dashboards, executive Power BI reports, regional analytics, data warehouse schema tables, semantic models, and ETL data pipelines.
            </p>
            <p>
              This asset inventory enables strict governance, end-to-end data lineage tracking, certification status monitoring, access control levels, and SLA assurance across business domains and geographic regions (US, EMEA, Japan).
            </p>
          </div>
        </div>

        {/* MODERN SEGMENTED TAB BUTTONS */}
        <div className="inline-flex p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/70 shadow-inner gap-1 flex-wrap">
          <button
            onClick={() => setActiveTab('dashboards_by_geo')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboards_by_geo'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Dashboards by Geo</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboards_and_data_assets_grid')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboards_and_data_assets_grid'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Database className="w-4 h-4" />
            <span> Data Assets Grid</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARDS BY GEO (ENHANCED 3-COLUMN REGIONAL TABLE) */}
        {activeTab === 'dashboards_by_geo' && (
          <div className="space-y-5">
            
            {/* Filter & Search Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dashboard title, ID, or SME lead..."
                  value={dashSearch}
                  onChange={(e) => setDashSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div>
                  <select
                    value={geoFilter}
                    onChange={(e) => setGeoFilter(e.target.value as any)}
                    className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-bold text-slate-700"
                  >
                    <option value="All">All Regions</option>
                    <option value="US">US Region</option>
                    <option value="EMEA">EMEA Region</option>
                    <option value="Japan">Japan Region</option>
                  </select>
                </div>

                <div>
                  <select
                    value={dashDomainFilter}
                    onChange={(e) => setDashDomainFilter(e.target.value)}
                    className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="All">All Domains</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Medical Affairs">Medical Affairs</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Finance">Finance</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>

            </div>

            {geoViewMode === 'columns' ? (
              /* 3-COLUMN REGIONAL TABLE CONTAINER WITH SOLID BLUE HEADER MATCHING ATTACHED IMAGE */
              <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
                
                {/* SOLID BLUE HEADER ROW (US | EMEA | JAPAN) */}
                <div className="bg-[#1D70F5] grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-blue-400/50 text-white font-bold text-sm">
                  <div className="py-3 px-5 flex items-center justify-between">
                    <span className="tracking-wide uppercase font-extrabold text-sm">US</span>
                  </div>
                  <div className="py-3 px-5 flex items-center justify-between">
                    <span className="tracking-wide uppercase font-extrabold text-sm">EMEA</span>
                  </div>
                  <div className="py-3 px-5 flex items-center justify-between">
                    <span className="tracking-wide uppercase font-extrabold text-sm">JAPAN</span>
                  </div>
                </div>

                {/* THREE CLEAN TABLE COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white min-h-[380px]">
                  
                  {/* COLUMN 1: US */}
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {usDashboards.map((dash) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3.5 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-medium text-sm sm:text-[13px] text-slate-900 truncate">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {usDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No US dashboards found.
                      </div>
                    )}
                  </div>

                  {/* COLUMN 2: EMEA */}
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {emeaDashboards.map((dash) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3.5 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-medium text-sm sm:text-[13px] text-slate-900 truncate">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {emeaDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No EMEA dashboards found.
                      </div>
                    )}
                  </div>

                  {/* COLUMN 3: JAPAN */}
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {japanDashboards.map((dash) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3.5 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-medium text-sm sm:text-[13px] text-slate-900 truncate">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {japanDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No Japan dashboards found.
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ) : (
              /* CONSOLIDATED LIST TABLE VIEW FOR GEO DASHBOARDS */
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                        <th className="py-3.5 px-5">Region</th>
                        <th className="py-3.5 px-4">Dashboard Identifier & Title</th>
                        <th className="py-3.5 px-4">Business Domain</th>
                        <th className="py-3.5 px-4">BI Platform</th>
                        <th className="py-3.5 px-4">SME Lead Owner</th>
                        <th className="py-3.5 px-4">Certification</th>
                        <th className="py-3.5 px-4">Active Viewers</th>
                        <th className="py-3.5 px-4">Last SLA Refresh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {filteredRegionalDashboards.map((dash) => (
                        <tr
                          key={dash.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-4 px-5 whitespace-nowrap">
                            {dash.geo === 'US' && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                                US
                              </span>
                            )}
                            {dash.geo === 'EMEA' && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                                EMEA
                              </span>
                            )}
                            {dash.geo === 'Japan' && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Japan
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-4 max-w-xs">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 inline-block">
                                {dash.id}
                              </span>
                              <span className="font-bold text-slate-900 block leading-snug">
                                {dash.title}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                              {dash.domain}
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {dash.platform}
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700">
                            {dash.owner}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Certified
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap font-bold text-indigo-600 font-mono">
                            {dash.monthlyUsers}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap text-xs font-semibold text-slate-500">
                            {dash.lastRefresh}
                          </td>
                        </tr>
                      ))}

                      {filteredRegionalDashboards.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400 text-xs font-medium">
                            No regional dashboards match the specified search and filter criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: DASHBOARDS AND DATA ASSETS GRID (ALL MODERN TABLES) */}
        {activeTab === 'dashboards_and_data_assets_grid' && (
          <div className="space-y-6">
            
            {/* Filter & Sub-category Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search table name, report title, or schema..."
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>



            </div>

            {/* Comprehensive Modern Tables */}
            <div className="space-y-6">
              
              {/* Dashboards Table */}
              {(gridAssetCategory === 'All' || gridAssetCategory === 'Dashboards') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-blue-600" />
                      <span>Enterprise BI Dashboards & Reports</span>
                    </h3>
                    <span className="text-xs font-bold text-slate-500">
                      {regionalDashboards.length} Production Reports
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                            <th className="py-3.5 px-5">Region</th>
                            <th className="py-3.5 px-4">Dashboard Title & ID</th>
                            <th className="py-3.5 px-4">Domain</th>
                            <th className="py-3.5 px-4">Platform</th>
                            <th className="py-3.5 px-4">SME Owner</th>
                            <th className="py-3.5 px-4">Active Viewers</th>
                            <th className="py-3.5 px-4">SLA Refresh</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                          {regionalDashboards
                            .filter(d => d.title.toLowerCase().includes(dataSearch.toLowerCase()) || d.id.toLowerCase().includes(dataSearch.toLowerCase()))
                            .map((dash) => (
                              <tr
                                key={dash.id}
                                className="hover:bg-slate-50/50 transition-colors"
                              >
                                <td className="py-4 px-5 whitespace-nowrap">
                                  {dash.geo === 'US' && (
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                                      US
                                    </span>
                                  )}
                                  {dash.geo === 'EMEA' && (
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-200">
                                      EMEA
                                    </span>
                                  )}
                                  {dash.geo === 'Japan' && (
                                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      Japan
                                    </span>
                                  )}
                                </td>

                                <td className="py-4 px-4 max-w-xs">
                                  <div className="space-y-1">
                                    <span className="font-bold text-slate-900 block">
                                      {dash.title}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                                      {dash.id}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap">
                                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                                    {dash.domain}
                                  </span>
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap">
                                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                    {dash.platform}
                                  </span>
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700">
                                  {dash.owner}
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap font-bold text-indigo-600 font-mono">
                                  {dash.monthlyUsers}
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap text-xs font-semibold text-slate-500">
                                  {dash.lastRefresh}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Assets Table */}
              {(gridAssetCategory === 'All' || gridAssetCategory === 'Data Assets') && (
                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                      <Database className="w-5 h-5 text-indigo-600" />
                      <span>Data Warehouse Schemas & Pipelines</span>
                    </h3>
                    <span className="text-xs font-bold text-slate-500">
                      {filteredDataAssets.length} Managed Tables
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                            <th className="py-3.5 px-5">Asset Identifier</th>
                            <th className="py-3.5 px-4">Schema & Engine</th>
                            <th className="py-3.5 px-4">Type</th>
                            <th className="py-3.5 px-4">Row Count</th>
                            <th className="py-3.5 px-4">Frequency</th>
                            <th className="py-3.5 px-4">DQ Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                          {filteredDataAssets.map((asset) => (
                            <tr
                              key={asset.id}
                              className="hover:bg-slate-50/50 transition-colors"
                            >
                              <td className="py-4 px-5">
                                <div className="space-y-0.5">
                                  <span className="font-bold text-slate-900 block">
                                    {asset.name}
                                  </span>
                                  <span className="text-[11px] font-mono text-slate-400">
                                    {asset.id} • {asset.domain}
                                  </span>
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="space-y-0.5">
                                  <span className="font-semibold text-slate-700 block">{asset.schema}</span>
                                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                                    {asset.engine}
                                  </span>
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                  {asset.type}
                                </span>
                              </td>

                              <td className="py-4 px-4 font-mono font-semibold text-slate-800">
                                {asset.rowCount}
                              </td>

                              <td className="py-4 px-4">
                                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                  {asset.frequency}
                                </span>
                              </td>

                              <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{asset.qualityScore}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* REGISTER ASSET MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              Register New Dashboard / Data Asset
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Asset Title or Table Name</label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Monthly Sales KPI Report"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category Type</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500">
                    <option value="Dashboard">BI Dashboard / Report</option>
                    <option value="Table">DWH Table / View</option>
                    <option value="Semantic">Semantic Layer Model</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Business Domain</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500">
                    <option value="Commercial">Commercial</option>
                    <option value="Medical Affairs">Medical Affairs</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Finance">Finance</option>
                    <option value="R&D">R&D</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">SME Lead / Owner Email</label>
                <input
                  type="email"
                  placeholder="e.g. lead.sme@insmed.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsRegisterModalOpen(false);
                  showToast('New Asset submitted for Data Catalog registration!');
                }}
                className="px-4 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm"
              >
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
