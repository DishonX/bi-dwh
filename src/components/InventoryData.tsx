import React, { useState } from 'react';
import {
  LayoutDashboard,
  Database,
  Search,
  Filter,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Server,
  Layers,
  FileText,
  UserCheck,
  Tag,
  BarChart3,
  RefreshCw,
  Eye,
  ChevronRight,
  X,
  TrendingUp,
  Table,
  Cpu,
  Lock,
  Sparkles,
  Zap,
  Info
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
  const [activeTab, setActiveTab] = useState<'dashboards' | 'data_assets'>('dashboards');
  
  // Dashboard state & filters
  const [dashSearch, setDashSearch] = useState('');
  const [dashDomainFilter, setDashDomainFilter] = useState('All');
  const [dashPlatformFilter, setDashPlatformFilter] = useState('All');
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardAsset | null>(null);

  // Data Assets state & filters
  const [dataSearch, setDataSearch] = useState('');
  const [dataTypeFilter, setDataTypeFilter] = useState('All');
  const [selectedDataAsset, setSelectedDataAsset] = useState<DataPipelineAsset | null>(null);

  // Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sample Dashboards Catalog Data
  const dashboards: DashboardAsset[] = [
    {
      id: 'DASH-BI-001',
      title: 'Commercial Executive Sales & Target Performance',
      description: 'Global commercial product performance, target achievement rates, territory breakdown, and prescription volume analytics.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Commercial Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 04:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 340,
      upstreamTables: ['fact_commercial_sales_daily', 'dim_healthcare_provider', 'dim_territory_hierarchy'],
      url: 'https://powerbi.enterprise.insmed.com/reports/commercial-exec'
    },
    {
      id: 'DASH-BI-002',
      title: 'Medical Affairs Thought Leader & Trial Tracker',
      description: 'Key Opinion Leader engagement metrics, medical inquiry fulfillment, and clinical trial site monitoring dashboard.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'Medical Operations SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 05:30 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 185,
      upstreamTables: ['fact_kol_engagements', 'dim_medical_inquiry', 'fact_trial_milestones'],
      url: 'https://powerbi.enterprise.insmed.com/reports/medical-affairs'
    },
    {
      id: 'DASH-BI-003',
      title: 'Global Supply Chain Inventory & Batch Traceability',
      description: 'Real-time pharmaceutical warehouse inventory, batch expiration alerts, cold chain monitoring, and fulfillment SLA analytics.',
      domain: 'Supply Chain',
      platform: 'Tableau',
      owner: 'Supply Chain BI Team',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 02:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 210,
      upstreamTables: ['fact_inventory_snapshot', 'dim_batch_lot', 'dim_distribution_center'],
      url: 'https://tableau.enterprise.insmed.com/views/supply-chain-traceability'
    },
    {
      id: 'DASH-BI-004',
      title: 'Financial Revenue Recognition & Cost Allocation',
      description: 'GAAP revenue recognition, gross-to-net adjustment forecasts, departmental OPEX variance, and BI DWH cost allocation.',
      domain: 'Finance',
      platform: 'Power BI',
      owner: 'Financial Planning & Analysis',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-21 11:00 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 95,
      upstreamTables: ['fact_gl_transactions', 'fact_g2n_accruals', 'dim_cost_center'],
      url: 'https://powerbi.enterprise.insmed.com/reports/finance-g2n'
    },
    {
      id: 'DASH-BI-005',
      title: 'R&D Early Pipeline Milestone & Compound Tracking',
      description: 'Pre-clinical and Phase I/II trial timeline tracking, compound toxicity scores, and laboratory resource utilization.',
      domain: 'R&D',
      platform: 'ThoughtSpot',
      owner: 'R&D Informatics Lead',
      certified: false,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 06:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 140,
      upstreamTables: ['fact_lab_experiments', 'dim_compound_registry'],
      url: 'https://thoughtspot.enterprise.insmed.com/pinboards/rd-pipeline'
    },
    {
      id: 'DASH-BI-006',
      title: 'Enterprise Audit & Regulatory Compliance Monitor',
      description: '21 CFR Part 11 audit trail logs, data access entitlement reviews, and GxP validation compliance monitoring.',
      domain: 'Compliance',
      platform: 'Power BI',
      owner: 'Audit & Compliance Officer',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 01:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 60,
      upstreamTables: ['fact_system_access_logs', 'dim_compliance_policy'],
      url: 'https://powerbi.enterprise.insmed.com/reports/audit-gxp'
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

  // Filtering Dashboards
  const filteredDashboards = dashboards.filter((dash) => {
    const matchesSearch = dash.title.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          dash.id.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          dash.owner.toLowerCase().includes(dashSearch.toLowerCase());
    const matchesDomain = dashDomainFilter === 'All' || dash.domain === dashDomainFilter;
    const matchesPlatform = dashPlatformFilter === 'All' || dash.platform === dashPlatformFilter;
    return matchesSearch && matchesDomain && matchesPlatform;
  });

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

        <div className="mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Branding & Header */}
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-blue-600/15 border border-blue-400/30 rounded-xl text-blue-700 shadow-inner">
                <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D70F5] tracking-tight">
                  Inventory of Dashboards & Data Assets
                </h1>
                <p className="text-blue-900/80 text-xs sm:text-sm mt-1 font-medium">
                  Centralized Enterprise Catalog, Data Lineage & Governance Asset Register
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">
        
        {/* OVERVIEW CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
            Overview
          </h2>
          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              The Insmed Enterprise BI Data Catalog provides a single source of truth for all production BI dashboards, executive Power BI reports, data warehouse schema tables, semantic models, and ETL data pipelines.
            </p>
            <p>
              This asset inventory enables strict governance, end-to-end data lineage tracking, certification status monitoring, access control levels, and SLA assurance across business domains.
            </p>
          </div>
        </div>

        {/* MODERN SEGMENTED TAB BUTTONS */}
        <div className="inline-flex p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/70 shadow-inner gap-1">
          <button
            onClick={() => setActiveTab('dashboards')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboards'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboards & Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('data_assets')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'data_assets'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Assets & Pipelines</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARDS & REPORTS CATALOG */}
        {activeTab === 'dashboards' && (
          <div className="space-y-6">
            
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Dashboards</span>
                <div className="text-2xl font-black text-slate-900">42 Cataloged</div>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +4 added this month
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certified Production</span>
                <div className="text-2xl font-black text-blue-600">36 Verified</div>
                <span className="text-[11px] text-slate-500 font-medium">85.7% Certification Rate</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Monthly Users</span>
                <div className="text-2xl font-black text-indigo-600">1,240 Viewers</div>
                <span className="text-[11px] text-slate-500 font-medium">Across 6 Domains</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Refresh SLA Status</span>
                <div className="text-2xl font-black text-emerald-600">99.2% On-Time</div>
                <span className="text-[11px] text-emerald-600 font-bold">Daily Auto-Refresh</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dashboard title, ID, or SME owner..."
                  value={dashSearch}
                  onChange={(e) => setDashSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
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
                    <option value="R&D">R&D</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                <div>
                  <select
                    value={dashPlatformFilter}
                    onChange={(e) => setDashPlatformFilter(e.target.value)}
                    className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold text-slate-700"
                  >
                    <option value="All">All Platforms</option>
                    <option value="Power BI">Power BI</option>
                    <option value="Tableau">Tableau</option>
                    <option value="ThoughtSpot">ThoughtSpot</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Dashboard Asset Table View */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                      <th className="py-3.5 px-5">Dashboard Identifier & Name</th>
                      <th className="py-3.5 px-4">Domain</th>
                      <th className="py-3.5 px-4">Platform</th>
                      <th className="py-3.5 px-4">SME Lead</th>
                      <th className="py-3.5 px-4">Certification</th>
                      <th className="py-3.5 px-4">Monthly Users</th>
                      <th className="py-3.5 px-4">Refresh SLA</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredDashboards.map((dash) => (
                      <tr
                        key={dash.id}
                        onClick={() => setSelectedDashboard(dash)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-5">
                          <div className="space-y-0.5 max-w-md">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                {dash.id}
                              </span>
                            </div>
                            <span className="font-bold text-slate-900 group-hover:text-[#1D70F5] transition-colors block">
                              {dash.title}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {dash.description}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200/70 px-2.5 py-1 rounded-lg text-xs">
                            {dash.domain}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-lg text-xs">
                            {dash.platform}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-800">{dash.owner}</span>
                        </td>

                        <td className="py-4 px-4">
                          {dash.certified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Certified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                              <Clock className="w-3 h-3 text-amber-600" />
                              In Review
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 font-extrabold text-indigo-600">
                          {dash.monthlyUsers} Viewers
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {dash.refreshSLA}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1D70F5] group-hover:translate-x-0.5 transition-transform">
                            <span>Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DATA ASSETS & PIPELINES CATALOG */}
        {activeTab === 'data_assets' && (
          <div className="space-y-6">
            
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Managed Data Tables</span>
                <div className="text-2xl font-black text-slate-900">128 Schema Objects</div>
                <span className="text-[11px] text-blue-600 font-bold">In PostgreSQL DWH</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Data Quality Score</span>
                <div className="text-2xl font-black text-emerald-600">99.1% Average</div>
                <span className="text-[11px] text-slate-500 font-medium">Automated DQ Rules</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Storage Footprint</span>
                <div className="text-2xl font-black text-indigo-600">320 GB</div>
                <span className="text-[11px] text-slate-500 font-medium">Compressed DWH Tables</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active ETL Pipelines</span>
                <div className="text-2xl font-black text-purple-600">24 Pipelines</div>
                <span className="text-[11px] text-emerald-600 font-bold">0 Failed Runs</span>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search table name, schema, or ID..."
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div>
                <select
                  value={dataTypeFilter}
                  onChange={(e) => setDataTypeFilter(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold text-slate-700"
                >
                  <option value="All">All Asset Types</option>
                  <option value="Fact Table">Fact Table</option>
                  <option value="Dimension">Dimension</option>
                  <option value="Semantic Model">Semantic Model</option>
                  <option value="Staging Pipeline">Staging Pipeline</option>
                  <option value="Analytical View">Analytical View</option>
                </select>
              </div>
            </div>

            {/* Data Assets Table View */}
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
                      <th className="py-3.5 px-4">Connected Reports</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredDataAssets.map((asset) => (
                      <tr
                        key={asset.id}
                        onClick={() => setSelectedDataAsset(asset)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-5">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-900 group-hover:text-[#1D70F5] transition-colors block">
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

                        <td className="py-4 px-4">
                          <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                            {asset.downstreamDashboardsCount} Dashboards
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1D70F5] group-hover:translate-x-0.5 transition-transform">
                            <span>Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
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

      {/* DASHBOARD DETAIL MODAL */}
      {selectedDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedDashboard(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedDashboard.id}
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  {selectedDashboard.domain}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedDashboard.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {selectedDashboard.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">BI Platform</span>
                <span className="font-bold text-slate-800">{selectedDashboard.platform}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">SME Owner</span>
                <span className="font-bold text-slate-800">{selectedDashboard.owner}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Security Level</span>
                <span className="font-bold text-amber-700">{selectedDashboard.securityLevel}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Last SLA Refresh</span>
                <span className="font-bold text-emerald-600">{selectedDashboard.lastRefresh}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Upstream Data Warehouse Lineage Tables:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDashboard.upstreamTables.map((tbl) => (
                  <span key={tbl} className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg">
                    {tbl}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <a
                href={selectedDashboard.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm"
              >
                <span>Launch Report</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedDashboard(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DATA ASSET DETAIL MODAL */}
      {selectedDataAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedDataAsset(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedDataAsset.id}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {selectedDataAsset.type}
                </span>
              </div>
              <h3 className="text-xl font-bold font-mono text-slate-900">
                {selectedDataAsset.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-medium">Schema Path</span>
                <span className="font-bold text-slate-800">{selectedDataAsset.schema}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Database Engine</span>
                <span className="font-bold text-blue-700">{selectedDataAsset.engine}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Total Row Count</span>
                <span className="font-bold text-slate-800">{selectedDataAsset.rowCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Table Size</span>
                <span className="font-bold text-slate-800">{selectedDataAsset.sizeGb}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">ETL Refresh Frequency</span>
                <span className="font-bold text-emerald-600">{selectedDataAsset.frequency}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Data Quality Index</span>
                <span className="font-bold text-emerald-600">{selectedDataAsset.qualityScore}% Passed</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDataAsset(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
