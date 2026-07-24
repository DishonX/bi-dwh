import  { useState } from 'react';
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

// interface DataPipelineAsset {
//   id: string;
//   name: string;
//   schema: string;
//   type: 'Fact Table' | 'Dimension' | 'Semantic Model' | 'Staging Pipeline' | 'Analytical View';
//   engine: 'Snowflake' | 'PostgreSQL' | 'BigQuery' | 'SQL Server';
//   domain: string;
//   rowCount: string;
//   sizeGb: string;
//   frequency: 'Real-time' | 'Hourly' | 'Daily' | 'Weekly';
//   qualityScore: number;
//   ownerTeam: string;
//   downstreamDashboardsCount: number;
// }

// interface ReviewControlAsset {
//   id: string;
//   reviewItem: string;
//   platform: string;
//   frequency: string;
//   scope: string;
// }

interface SnowflakeDataAsset {
  id: string;
  snowflakeAccount: string;
  region: string;
  dataSource: string;
  dbName: string;
  schemaName: string;
  snowflakeTableName: string;
  fileName: string;
  fileDescription: string;
}

export default function InventoryData() {
  const [activeTab, setActiveTab] = useState<'dashboards_by_geo' | 'dashboards_and_data_assets_grid'>('dashboards_by_geo');
  
  // Dashboard state & filters
  const [dashSearch, setDashSearch] = useState('');
  // const [dashPlatformFilter, setDashPlatformFilter] = useState('All');
  const [geoFilter, setGeoFilter] = useState<'All' | 'US' | 'EMEA' | 'Japan'>('All');
  // const [selectedGeoDash, setSelectedGeoDash] = useState<DashboardAsset | null>(null);

  // Data Assets state & filters
  const [dataSearch, setDataSearch] = useState('');
  // const [gridAssetCategory, setGridAssetCategory] = useState<'All' | 'Snowflake Data' | 'Audit Controls' | 'Dashboards'>('All');

  // Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Geo Dashboards Data for US, EMEA, Japan updated from attached image content
  const regionalDashboards: DashboardAsset[] = [
    // US REGION (Column 1)
    {
      id: 'DASH-US-001',
      title: 'Diagnostic Analytics',
      description: 'US diagnostic analytics, diagnostic test volumes, provider trends, and testing adoption metrics.',
      domain: 'Medical Affairs',
      platform: 'Qlik Sense',
      owner: 'US Diagnostic Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 04:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 340,
      upstreamTables: ['fact_us_diagnostic_tests', 'dim_us_provider_master'],
      url: 'https://analytics.enterprise.com/reports/diagnostic-analytics',
      geo: 'US'
    },
    {
      id: 'DASH-US-002',
      title: 'Executive Summary',
      description: 'High-level executive dashboard showing key commercial KPIs, revenue tracking, and operational metrics.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US VP Commercial Operations',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 05:30 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 520,
      upstreamTables: ['fact_us_exec_revenue_daily', 'dim_us_territory_master'],
      url: 'https://analytics.enterprise.com/reports/executive-summary',
      geo: 'US'
    },
    {
      id: 'DASH-US-003',
      title: 'Self Service DSPV',
      description: 'Drug Safety & Pharmacovigilance self-service portal, safety signal monitoring, and adverse event trends.',
      domain: 'Compliance',
      platform: 'Qlik Sense',
      owner: 'Global Pharmacovigilance SME',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 11:00 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 210,
      upstreamTables: ['fact_dspv_safety_events', 'dim_pv_case_registry'],
      url: 'https://analytics.enterprise.com/reports/self-service-dspv',
      geo: 'US'
    },
    {
      id: 'DASH-US-004',
      title: 'Field Analytics',
      description: 'Field force activity metrics, account coverage, call plans, and representative engagement tracking.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US Field Operations SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 02:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 410,
      upstreamTables: ['fact_us_field_calls', 'dim_us_account_master'],
      url: 'https://analytics.enterprise.com/reports/field-analytics',
      geo: 'US'
    },
    {
      id: 'DASH-US-005',
      title: 'Sales Leadership',
      description: 'Commercial sales leadership dashboard, regional performance comparison, and revenue variance vs targets.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'US Commercial Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 01:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 380,
      upstreamTables: ['fact_us_sales_daily', 'dim_us_territory_master'],
      url: 'https://analytics.enterprise.com/reports/sales-leadership',
      geo: 'US'
    },
    {
      id: 'DASH-US-006',
      title: 'Arikares Trainer',
      description: 'Arikares trainer engagement, nurse training completion rates, and patient onboarding activity.',
      domain: 'Medical Affairs',
      platform: 'Qlik Sense',
      owner: 'Patient Support Services Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 09:00 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 195,
      upstreamTables: ['fact_arikares_trainings', 'dim_patient_support_representatives'],
      url: 'https://analytics.enterprise.com/reports/arikares-trainer',
      geo: 'US'
    },
    {
      id: 'DASH-US-007',
      title: 'Performance Vs Budget',
      description: 'Financial performance analysis, actual vs budget variance, department spend, and cost center tracking.',
      domain: 'Finance',
      platform: 'Power BI',
      owner: 'US Financial Planning & Analysis Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 03:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 290,
      upstreamTables: ['fact_us_budget_actuals', 'dim_us_cost_center'],
      url: 'https://analytics.enterprise.com/reports/performance-vs-budget',
      geo: 'US'
    },
    {
      id: 'DASH-US-008',
      title: 'Arikayce PAL Activities Distribution',
      description: 'Patient Access Liaison (PAL) activity distribution, field interactions, and regional support metrics.',
      domain: 'Commercial',
      platform: 'Qlik Sense',
      owner: 'Arikayce PAL Program Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 01:30 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 260,
      upstreamTables: ['fact_pal_activities', 'dim_pal_territory_mapping'],
      url: 'https://analytics.enterprise.com/reports/arikayce-pal-activities',
      geo: 'US'
    },
    {
      id: 'DASH-US-009',
      title: 'iCIMS Talent Acquisition',
      description: 'HR & Talent acquisition metrics, requisition aging, candidate pipeline, and hiring velocity.',
      domain: 'R&D',
      platform: 'ThoughtSpot',
      owner: 'Global HR Operations Lead',
      certified: true,
      securityLevel: 'Internal',
      lastRefresh: '2026-07-22 08:00 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 150,
      upstreamTables: ['fact_icims_candidates', 'dim_job_requisitions'],
      url: 'https://analytics.enterprise.com/reports/icims-talent-acquisition',
      geo: 'US'
    },
    {
      id: 'DASH-US-010',
      title: 'IT Service Management',
      description: 'Enterprise IT service tickets, incident resolution times, SLA compliance, and system uptime status.',
      domain: 'Compliance',
      platform: 'Power BI',
      owner: 'IT Service Management SME',
      certified: true,
      securityLevel: 'Internal',
      lastRefresh: '2026-07-23 06:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 310,
      upstreamTables: ['fact_itsm_incidents', 'dim_itsm_service_catalog'],
      url: 'https://analytics.enterprise.com/reports/it-service-management',
      geo: 'US'
    },
    {
      id: 'DASH-US-011',
      title: 'inLighten Engagement',
      description: 'Internal employee engagement, portal usage metrics, training module completions, and content reach.',
      domain: 'R&D',
      platform: 'Qlik Sense',
      owner: 'Internal Communications Lead',
      certified: true,
      securityLevel: 'Internal',
      lastRefresh: '2026-07-22 10:30 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 220,
      upstreamTables: ['fact_inlighten_views', 'dim_employee_directory'],
      url: 'https://analytics.enterprise.com/reports/inlighten-engagement',
      geo: 'US'
    },
    {
      id: 'DASH-US-012',
      title: 'AKM Marketing',
      description: 'Arikayce Key Account Marketing performance, campaign execution, digital reach, and HCP engagement.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'AKM Marketing Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 02:45 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 275,
      upstreamTables: ['fact_akm_campaign_logs', 'dim_hcp_account_master'],
      url: 'https://analytics.enterprise.com/reports/akm-marketing',
      geo: 'US'
    },
    {
      id: 'DASH-US-013',
      title: 'Digital Marketing - HCP CRM',
      description: 'HCP CRM digital marketing activity, email open rates, click-through metrics, and channel conversion.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Digital Marketing Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 03:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 330,
      upstreamTables: ['fact_hcp_crm_interactions', 'dim_hcp_target_list'],
      url: 'https://analytics.enterprise.com/reports/digital-marketing-hcp-crm',
      geo: 'US'
    },
    {
      id: 'DASH-US-014',
      title: 'HCP NPP Marketing',
      description: 'Non-Personal Promotion (NPP) marketing analytics, digital advertising ROI, and educational portal traffic.',
      domain: 'Commercial',
      platform: 'Qlik Sense',
      owner: 'NPP Marketing Manager',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 01:20 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 240,
      upstreamTables: ['fact_npp_digital_events', 'dim_marketing_campaigns'],
      url: 'https://analytics.enterprise.com/reports/hcp-npp-marketing',
      geo: 'US'
    },
    {
      id: 'DASH-US-015',
      title: 'Global Medical Affairs',
      description: 'Global medical inquiry management, scientific exchange metrics, MSL field activities, and publication tracking.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'Global Medical Affairs SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 04:30 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 310,
      upstreamTables: ['fact_medical_inquiries', 'dim_msl_territories'],
      url: 'https://analytics.enterprise.com/reports/global-medical-affairs',
      geo: 'US'
    },
    {
      id: 'DASH-US-016',
      title: 'US Medical Affairs Executive',
      description: 'Executive dashboard for US Medical Affairs leadership, strategic priorities, and MSL field interaction summary.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'US Medical Affairs Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 05:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 285,
      upstreamTables: ['fact_us_msl_interactions', 'dim_us_key_opinion_leaders'],
      url: 'https://analytics.enterprise.com/reports/us-medical-affairs-executive',
      geo: 'US'
    },
    {
      id: 'DASH-US-017',
      title: 'EMEA Medical Affairs',
      description: 'EMEA regional medical affairs dashboard, MSL coverage, country-level scientific engagement, and congresses.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'EMEA Medical Affairs Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 03:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 230,
      upstreamTables: ['fact_emea_msl_engagements', 'dim_emea_country_master'],
      url: 'https://analytics.enterprise.com/reports/emea-medical-affairs-us-view',
      geo: 'US'
    },
    {
      id: 'DASH-US-018',
      title: 'ARIKAYCE Patient PQC Summaries',
      description: 'Product Quality Complaint (PQC) summaries for ARIKAYCE, complaint classification, batch analysis, and resolution time.',
      domain: 'Compliance',
      platform: 'Qlik Sense',
      owner: 'Quality Assurance & PQC Manager',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 11:45 PM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 180,
      upstreamTables: ['fact_pqc_cases', 'dim_product_batches'],
      url: 'https://analytics.enterprise.com/reports/arikayce-pqc-summaries',
      geo: 'US'
    },
    {
      id: 'DASH-US-019',
      title: 'SC Reconciliation Report',
      description: 'Supply chain inventory reconciliation, 3PL warehouse data matching, shipment tracking, and order alignment.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'US Supply Chain Operations SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 02:00 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 215,
      upstreamTables: ['fact_sc_reconciliation_daily', 'dim_3pl_warehouses'],
      url: 'https://analytics.enterprise.com/reports/sc-reconciliation-report',
      geo: 'US'
    },
    {
      id: 'DASH-US-020',
      title: 'Channel Management',
      description: 'Specialty pharmacy channel analytics, specialty distributor inventory, refill rates, and drop-off analysis.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Channel Strategy Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 04:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 360,
      upstreamTables: ['fact_channel_dispense_daily', 'dim_specialty_pharmacies'],
      url: 'https://analytics.enterprise.com/reports/channel-management',
      geo: 'US'
    },
    {
      id: 'DASH-US-021',
      title: 'Inventory Analysis',
      description: 'Comprehensive inventory levels across depots, expiration tracking, stock safety buffers, and order fulfillment.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'Global Inventory Manager',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 03:45 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 295,
      upstreamTables: ['fact_inventory_snapshot', 'dim_depot_locations'],
      url: 'https://analytics.enterprise.com/reports/inventory-analysis',
      geo: 'US'
    },
    {
      id: 'DASH-US-022',
      title: 'Patient Service Reporting',
      description: 'Patient support hub performance, benefits verification, co-pay assistance metrics, and therapy continuation.',
      domain: 'Commercial',
      platform: 'Qlik Sense',
      owner: 'Patient Support Hub Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 05:15 AM EST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 410,
      upstreamTables: ['fact_patient_hub_enrollments', 'dim_copay_programs'],
      url: 'https://analytics.enterprise.com/reports/patient-service-reporting',
      geo: 'US'
    },

    // EMEA REGION (Column 2)
    {
      id: 'DASH-EMEA-001',
      title: 'EMEA Activity Report',
      description: 'EMEA regional operations, field activities, regional meetings, and client interaction logs.',
      domain: 'Medical Affairs',
      platform: 'Power BI',
      owner: 'EMEA Operations Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 03:30 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 310,
      upstreamTables: ['fact_emea_activity_monthly', 'dim_emea_country_master'],
      url: 'https://analytics.enterprise.com/reports/emea-activity-report',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-002',
      title: 'EMEA Sales',
      description: 'Pan-European commercial revenue, distributor metrics, currency variance, and country sales trends.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'EMEA Commercial Director',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 06:00 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 410,
      upstreamTables: ['fact_emea_sales_ledger', 'dim_emea_distributor'],
      url: 'https://analytics.enterprise.com/reports/emea-sales',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-003',
      title: 'EMEA Supply Chain',
      description: 'EMEA warehouse inventory, distribution hub logistics, shipment status, and transit times across Europe.',
      domain: 'Supply Chain',
      platform: 'Power BI',
      owner: 'EMEA Supply Chain Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-23 01:45 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 195,
      upstreamTables: ['fact_emea_inventory', 'dim_emea_warehouse_nodes'],
      url: 'https://analytics.enterprise.com/reports/emea-supply-chain',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-004',
      title: 'QPPV Self Service',
      description: 'Qualified Person for Pharmacovigilance (QPPV) self-service analytics, EU safety reporting, and audit logs.',
      domain: 'Compliance',
      platform: 'Qlik Sense',
      owner: 'EU QPPV Compliance Officer',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 10:15 PM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 140,
      upstreamTables: ['fact_qppv_safety_audits', 'dim_eu_pv_regulations'],
      url: 'https://analytics.enterprise.com/reports/qppv-self-service',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-005',
      title: 'EMEA Compliance',
      description: 'European regulatory compliance monitoring, audit tracking, policy adherence reports, and EFPIA transparency.',
      domain: 'Compliance',
      platform: 'Tableau',
      owner: 'EU Regulatory Affairs SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 05:00 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 165,
      upstreamTables: ['fact_eu_regulatory_logs', 'dim_eu_policy_framework'],
      url: 'https://analytics.enterprise.com/reports/emea-compliance',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-006',
      title: 'Oracle Cloud Exchange Rates',
      description: 'Daily FX currency exchange rates feed, EMEA financial consolidation rates, and foreign transaction conversions.',
      domain: 'Finance',
      platform: 'Power BI',
      owner: 'EMEA Treasury SME',
      certified: true,
      securityLevel: 'Internal',
      lastRefresh: '2026-07-23 02:30 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 220,
      upstreamTables: ['fact_oracle_fx_rates', 'dim_currencies'],
      url: 'https://analytics.enterprise.com/reports/oracle-cloud-exchange-rates',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-007',
      title: 'Oracle Cloud COA segment values',
      description: 'Chart of Accounts (COA) segment values, general ledger mapping, cost center definitions, and financial reporting hierarchy.',
      domain: 'Finance',
      platform: 'Power BI',
      owner: 'EMEA Financial Systems Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-22 11:00 PM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 185,
      upstreamTables: ['fact_oracle_coa_segments', 'dim_gl_account_mapping'],
      url: 'https://analytics.enterprise.com/reports/oracle-cloud-coa-segments',
      geo: 'EMEA'
    },
    {
      id: 'DASH-EMEA-008',
      title: 'Arvato Sales Report Cloud',
      description: 'Arvato 3PL sales reporting, order fulfillment metrics, European inventory staging, and logistics distribution.',
      domain: 'Supply Chain',
      platform: 'ThoughtSpot',
      owner: 'Arvato Logistics Account Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-23 04:00 AM CET',
      refreshSLA: '100% Compliant',
      monthlyUsers: 170,
      upstreamTables: ['fact_arvato_sales_feed', 'dim_arvato_hubs'],
      url: 'https://analytics.enterprise.com/reports/arvato-sales-report-cloud',
      geo: 'EMEA'
    },

    // JAPAN REGION (Column 3)
    {
      id: 'DASH-JP-001',
      title: 'Japan Sales',
      description: 'Japan commercial sales overview, wholesaler sell-in / sell-out metrics, and quarterly revenue tracking.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan Commercial Analytics Lead',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 09:00 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 380,
      upstreamTables: ['fact_jp_wholesaler_sales', 'dim_jp_pricing_list'],
      url: 'https://analytics.enterprise.com/reports/japan-sales',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-002',
      title: 'Japan Sales Performance',
      description: 'Territory-level sales performance in Japan, representative targets vs actuals, and product adoption rate.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan Sales Operations Manager',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 08:30 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 290,
      upstreamTables: ['fact_jp_regional_performance', 'dim_jp_region_master'],
      url: 'https://analytics.enterprise.com/reports/japan-sales-performance',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-003',
      title: 'Japan Activity Summary',
      description: 'Japan field team activity summary, hospital & clinic visits, speaker events, and HCP interaction logs.',
      domain: 'Commercial',
      platform: 'Qlik Sense',
      owner: 'Japan Field Activity SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 07:00 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 245,
      upstreamTables: ['fact_jp_field_activities', 'dim_jp_institution_master'],
      url: 'https://analytics.enterprise.com/reports/japan-activity-summary',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-004',
      title: 'Japan Sales Data Extract',
      description: 'Raw sales data extract feed for Japan wholesalers, automated data quality checks, and DWH staging logs.',
      domain: 'Commercial',
      platform: 'Power BI',
      owner: 'Japan Data Engineering Lead',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-23 06:30 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 160,
      upstreamTables: ['fact_jp_raw_wholesaler_extract', 'dim_jp_wholesalers'],
      url: 'https://analytics.enterprise.com/reports/japan-sales-data-extract',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-005',
      title: 'Incentive Calc 2025 H2',
      description: 'Sales incentive compensation calculations for 2025 H2, payout quota attainment, and territory bonus breakdown.',
      domain: 'Finance',
      platform: 'Power BI',
      owner: 'Japan Compensation & HR SME',
      certified: true,
      securityLevel: 'Restricted',
      lastRefresh: '2026-07-22 08:00 PM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 140,
      upstreamTables: ['fact_jp_incentive_calc_h2', 'dim_jp_sales_reps'],
      url: 'https://analytics.enterprise.com/reports/incentive-calc-2025-h2',
      geo: 'Japan'
    },
    {
      id: 'DASH-JP-006',
      title: 'HCP Mind',
      description: 'Healthcare Professional (HCP) brand perception, opinion leader mindshare tracking, and scientific survey insights in Japan.',
      domain: 'Medical Affairs',
      platform: 'ThoughtSpot',
      owner: 'Japan Medical Insights SME',
      certified: true,
      securityLevel: 'Confidential',
      lastRefresh: '2026-07-23 08:15 AM JST',
      refreshSLA: '100% Compliant',
      monthlyUsers: 190,
      upstreamTables: ['fact_jp_hcp_surveys', 'dim_jp_kol_registry'],
      url: 'https://analytics.enterprise.com/reports/hcp-mind',
      geo: 'Japan'
    }
  ];

  // Sample Data Assets & Pipelines Catalog Data
  // const dataAssets: DataPipelineAsset[] = [
  //   {
  //     id: 'TBL-DWH-01',
  //     name: 'fact_commercial_sales_daily',
  //     schema: 'commercial_dwh',
  //     type: 'Fact Table',
  //     engine: 'PostgreSQL',
  //     domain: 'Commercial',
  //     rowCount: '48.2 M',
  //     sizeGb: '14.8 GB',
  //     frequency: 'Daily',
  //     qualityScore: 99.4,
  //     ownerTeam: 'DWH Data Engineering',
  //     downstreamDashboardsCount: 8
  //   },
  //   {
  //     id: 'TBL-DWH-02',
  //     name: 'dim_healthcare_provider_v2',
  //     schema: 'master_data',
  //     type: 'Dimension',
  //     engine: 'PostgreSQL',
  //     domain: 'Master Data',
  //     rowCount: '1.2 M',
  //     sizeGb: '1.4 GB',
  //     frequency: 'Daily',
  //     qualityScore: 98.9,
  //     ownerTeam: 'Master Data Governance',
  //     downstreamDashboardsCount: 14
  //   },
  //   {
  //     id: 'TBL-DWH-03',
  //     name: 'semantic_global_sales_mart',
  //     schema: 'semantic_layer',
  //     type: 'Semantic Model',
  //     engine: 'PostgreSQL',
  //     domain: 'Commercial & Finance',
  //     rowCount: '12.5 M',
  //     sizeGb: '5.2 GB',
  //     frequency: 'Hourly',
  //     qualityScore: 99.8,
  //     ownerTeam: 'BI Semantic Modeling',
  //     downstreamDashboardsCount: 12
  //   },
  //   {
  //     id: 'TBL-DWH-04',
  //     name: 'pipe_veeva_crm_incremental',
  //     schema: 'staging_ingest',
  //     type: 'Staging Pipeline',
  //     engine: 'PostgreSQL',
  //     domain: 'Commercial Operations',
  //     rowCount: '850 K / day',
  //     sizeGb: '850 MB',
  //     frequency: 'Hourly',
  //     qualityScore: 97.5,
  //     ownerTeam: 'Data Integration Engineering',
  //     downstreamDashboardsCount: 5
  //   },
  //   {
  //     id: 'TBL-DWH-05',
  //     name: 'fact_inventory_snapshot',
  //     schema: 'supply_chain_dwh',
  //     type: 'Fact Table',
  //     engine: 'PostgreSQL',
  //     domain: 'Supply Chain',
  //     rowCount: '8.4 M',
  //     sizeGb: '3.1 GB',
  //     frequency: 'Daily',
  //     qualityScore: 99.1,
  //     ownerTeam: 'Supply Chain Engineering',
  //     downstreamDashboardsCount: 6
  //   },
  //   {
  //     id: 'TBL-DWH-06',
  //     name: 'vw_executive_kpi_aggregated',
  //     schema: 'reporting_views',
  //     type: 'Analytical View',
  //     engine: 'PostgreSQL',
  //     domain: 'Executive Reporting',
  //     rowCount: '450 K',
  //     sizeGb: '120 MB',
  //     frequency: 'Real-time',
  //     qualityScore: 100.0,
  //     ownerTeam: 'BI Core Operations',
  //     downstreamDashboardsCount: 9
  //   }
  // ];

  // Audit Review & Control Governance Assets (From Attached Image Specification)
  // const reviewControlAssets: ReviewControlAsset[] = [
  //   {
  //     id: 'REV-001',
  //     reviewItem: 'Snowflake User Access Review',
  //     platform: 'Snowflake',
  //     frequency: 'Semi-annual',
  //     scope: 'Snowflake User Access'
  //   },
  //   {
  //     id: 'REV-002',
  //     reviewItem: 'Snowflake Role to Permission Review',
  //     platform: 'Snowflake',
  //     frequency: 'Annual',
  //     scope: 'Snowflake Role to Permission'
  //   },
  //   {
  //     id: 'REV-003',
  //     reviewItem: 'Snowflake / AWS Change Monitoring',
  //     platform: 'Snowflake/AWS',
  //     frequency: 'Semi-Annual (FY26)',
  //     scope: 'Snowflake Change Monitoring / AWS Change Monitoring'
  //   },
  //   {
  //     id: 'REV-004',
  //     reviewItem: 'AWS User Access Review',
  //     platform: 'AWS',
  //     frequency: 'Semi-annual (FY26)',
  //     scope: 'AWS User Access'
  //   },
  //   {
  //     id: 'REV-005',
  //     reviewItem: 'AWS Role to Permission',
  //     platform: 'AWS',
  //     frequency: 'Annual',
  //     scope: 'AWS Role to Permission'
  //   },
  //   {
  //     id: 'REV-006',
  //     reviewItem: 'Qlik User Access Review',
  //     platform: 'Qlik',
  //     frequency: 'Semi-annual',
  //     scope: 'Qlik User Access'
  //   },
  //   {
  //     id: 'REV-007',
  //     reviewItem: 'Qlik Role to Permission Review',
  //     platform: 'Qlik',
  //     frequency: 'Annual',
  //     scope: 'Qlik Role to Permission'
  //   },
  //   {
  //     id: 'REV-008',
  //     reviewItem: 'Qlik Change Management',
  //     platform: 'Qlik',
  //     frequency: 'Ad hoc',
  //     scope: 'Qlik Change Management'
  //   },
  //   {
  //     id: 'REV-009',
  //     reviewItem: 'Qlik Change Monitoring',
  //     platform: 'Qlik',
  //     frequency: 'Semi-Annual (FY26)',
  //     scope: 'Qlik Change Monitoring'
  //   },
  //   {
  //     id: 'REV-010',
  //     reviewItem: 'Reporting Stack – Common Authentication',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Annual',
  //     scope: 'Reporting Stack – Common Authentication'
  //   },
  //   {
  //     id: 'REV-011',
  //     reviewItem: 'Reporting Stack – Common Job Monitoring – Samples test for design',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Adhoc',
  //     scope: 'Reporting Stack'
  //   },
  //   {
  //     id: 'REV-012',
  //     reviewItem: 'Reporting Stack – Common Job Monitoring – Full listing',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Semi-Annual (FY26)',
  //     scope: 'Reporting Stack'
  //   },
  //   {
  //     id: 'REV-013',
  //     reviewItem: 'Reporting Stack – Common Change Management – Samples',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Adhoc',
  //     scope: 'Reporting Stack'
  //   },
  //   {
  //     id: 'REV-014',
  //     reviewItem: 'Reporting Stack – Common Change Management –Full listing',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Semi-Annual (FY26)',
  //     scope: 'Reporting Stack'
  //   },
  //   {
  //     id: 'REV-015',
  //     reviewItem: 'SOC1 type 2 report evaluation',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Annual',
  //     scope: 'SOC1 type 2 report'
  //   },
  //   {
  //     id: 'REV-016',
  //     reviewItem: 'Functional controls for Transaction details and PO details',
  //     platform: 'Snowflake/AWS/Qlik',
  //     frequency: 'Annual',
  //     scope: 'Functional controls'
  //   }
  // ];

  // Data Assets Catalog (Using Attached Image Columns: Snowflake Account, Region, Data Source, DB Name, Schema Name, Snowflake Table Name, File Name, File Description)
  const snowflakeDataAssets: SnowflakeDataAsset[] = [
    {
      id: 'SNOW-001',
      snowflakeAccount: 'INSMED_PROD_US.EAST1',
      region: 'US',
      dataSource: 'Veeva CRM',
      dbName: 'COMMERCIAL_DB',
      schemaName: 'RAW_VEEVA',
      snowflakeTableName: 'FACT_CALL_ACTIVITY',
      fileName: 'veeva_call_export_daily.csv',
      fileDescription: 'Daily incremental sales force call logs and practitioner interaction records.'
    },
    {
      id: 'SNOW-002',
      snowflakeAccount: 'INSMED_PROD_US.EAST1',
      region: 'US',
      dataSource: 'IQVIA APLD',
      dbName: 'COMMERCIAL_DB',
      schemaName: 'COMMERCIAL_MARTS',
      snowflakeTableName: 'FACT_APLD_PATIENT_CLAIMS',
      fileName: 'iqvia_apld_claims_weekly.parquet',
      fileDescription: 'Longitudinal prescription and diagnosis claims dataset for market share tracking.'
    },
    {
      id: 'SNOW-003',
      snowflakeAccount: 'INSMED_GLOBAL_EU.WEST1',
      region: 'EMEA',
      dataSource: 'SAP S/4HANA',
      dbName: 'FINANCE_DB',
      schemaName: 'FIN_MARTS',
      snowflakeTableName: 'FACT_GL_BALANCES',
      fileName: 'sap_gl_trial_balance.orc',
      fileDescription: 'General Ledger trial balances and cost center postings for EMEA financial reporting.'
    },
    {
      id: 'SNOW-004',
      snowflakeAccount: 'INSMED_GLOBAL_AP.NE1',
      region: 'Japan',
      dataSource: 'JAPIC Regulatory',
      dbName: 'COMPLIANCE_DB',
      schemaName: 'COMPL_RAW',
      snowflakeTableName: 'DIM_JAPAN_REGULATORY_SUBMISSIONS',
      fileName: 'japan_pmda_filings_v2.json',
      fileDescription: 'PMDA regulatory agency submission records and safety surveillance logs for Japan.'
    },
    {
      id: 'SNOW-005',
      snowflakeAccount: 'INSMED_PROD_US.EAST1',
      region: 'US',
      dataSource: 'AWS S3 Landing',
      dbName: 'MEDICAL_AFFAIRS_DB',
      schemaName: 'MED_STAGING',
      snowflakeTableName: 'FACT_DIAGNOSTIC_TESTS',
      fileName: 'lab_diagnostic_volume_monthly.csv',
      fileDescription: 'Monthly diagnostic test order volumes and laboratory processing metrics.'
    },
    {
      id: 'SNOW-006',
      snowflakeAccount: 'INSMED_GLOBAL_EU.WEST1',
      region: 'EMEA',
      dataSource: 'Qlik Replicate',
      dbName: 'OPERATIONS_DB',
      schemaName: 'SUPPLY_CHAIN',
      snowflakeTableName: 'FACT_SHIPMENT_TRACKING',
      fileName: 'emea_logistics_shipments.avro',
      fileDescription: 'Real-time cold-chain shipment status and inventory distribution tracking.'
    },
    {
      id: 'SNOW-007',
      snowflakeAccount: 'INSMED_PROD_US.EAST1',
      region: 'US',
      dataSource: 'Workday HR',
      dbName: 'ENTERPRISE_DB',
      schemaName: 'HR_ANALYTICS',
      snowflakeTableName: 'DIM_EMPLOYEE_MASTER',
      fileName: 'workday_headcount_snapshot.parquet',
      fileDescription: 'Global organizational hierarchy, headcount snapshots, and department mappings.'
    },
    {
      id: 'SNOW-008',
      snowflakeAccount: 'INSMED_GLOBAL_EU.WEST1',
      region: 'EMEA',
      dataSource: 'Veeva Vault',
      dbName: 'RND_CLINICAL_DB',
      schemaName: 'CLINICAL_TRIALS',
      snowflakeTableName: 'FACT_SUBJECT_ENROLLMENT',
      fileName: 'veeva_trial_enrollment_weekly.csv',
      fileDescription: 'Clinical trial patient enrollment progress and site milestone monitoring.'
    }
  ];

  // Filtering Regional Dashboards
  const filteredRegionalDashboards = regionalDashboards.filter((dash) => {
    const matchesSearch = dash.title.toLowerCase().includes(dashSearch.toLowerCase());
    const matchesGeo = geoFilter === 'All' || dash.geo === geoFilter;
    return matchesSearch && matchesGeo;
  });

  const usDashboards = filteredRegionalDashboards.filter(d => d.geo === 'US');
  const emeaDashboards = filteredRegionalDashboards.filter(d => d.geo === 'EMEA');
  const japanDashboards = filteredRegionalDashboards.filter(d => d.geo === 'Japan');

  // Filtering Snowflake Data Assets (Attached Image Schema)
  const filteredSnowflakeAssets = snowflakeDataAssets.filter((asset) => {
    const query = dataSearch.toLowerCase();
    return (
      asset.snowflakeAccount.toLowerCase().includes(query) ||
      asset.region.toLowerCase().includes(query) ||
      asset.dataSource.toLowerCase().includes(query) ||
      asset.dbName.toLowerCase().includes(query) ||
      asset.schemaName.toLowerCase().includes(query) ||
      asset.snowflakeTableName.toLowerCase().includes(query) ||
      asset.fileName.toLowerCase().includes(query) ||
      asset.fileDescription.toLowerCase().includes(query)
    );
  });

  // Filtering Review Controls
  // const filteredReviewControls = reviewControlAssets.filter((ctrl) => {
  //   const query = dataSearch.toLowerCase();
  //   return (
  //     ctrl.reviewItem.toLowerCase().includes(query) ||
  //     ctrl.platform.toLowerCase().includes(query) ||
  //     ctrl.frequency.toLowerCase().includes(query) ||
  //     ctrl.scope.toLowerCase().includes(query)
  //   );
  // });

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
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6">

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
                  placeholder="Search dashboard name..."
                  value={dashSearch}
                  onChange={(e) => setDashSearch(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
                {dashSearch && (
                  <button 
                    onClick={() => setDashSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
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
              </div>

            </div>

            {/* RESPONSIVE 3-COLUMN REGIONAL DASHBOARD TABLE */}
            <div className="rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden bg-white">
              
              {/* SOLID BLUE HEADER ROW (US | EMEA | JAPAN) */}
              <div className="bg-[#1D70F5] grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-blue-400/30 text-white font-bold text-sm">
                {(geoFilter === 'All' || geoFilter === 'US') && (
                  <div className="py-3 px-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <span className="text-base">🇺🇸</span> */}
                      <span className="tracking-wider uppercase font-black text-sm">US </span>
                    </div>
                    <span className="text-[11px] bg-white/20 text-white font-mono px-2.5 py-0.5 rounded-full font-bold">
                      {usDashboards.length} Reports
                    </span>
                  </div>
                )}
                {(geoFilter === 'All' || geoFilter === 'EMEA') && (
                  <div className="py-3 px-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <span className="text-base">🇪🇺</span> */}
                      <span className="tracking-wider uppercase font-black text-sm">EMEA </span>
                    </div>
                    <span className="text-[11px] bg-white/20 text-white font-mono px-2.5 py-0.5 rounded-full font-bold">
                      {emeaDashboards.length} Reports
                    </span>
                  </div>
                )}
                {(geoFilter === 'All' || geoFilter === 'Japan') && (
                  <div className="py-3 px-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <span className="text-base">🇯🇵</span> */}
                      <span className="tracking-wider uppercase font-black text-sm">JAPAN </span>
                    </div>
                    <span className="text-[11px] bg-white/20 text-white font-mono px-2.5 py-0.5 rounded-full font-bold">
                      {japanDashboards.length} Reports
                    </span>
                  </div>
                )}
              </div>

              {/* THREE CLEAN TABLE COLUMNS WITH SOLID VERTICAL DIVIDERS */}
              <div className={`grid grid-cols-1 ${
                geoFilter === 'All' ? 'lg:grid-cols-3' : 'grid-cols-1'
              } divide-y lg:divide-y-0 lg:divide-x divide-slate-200/90 bg-white min-h-[380px]`}>
                
                {/* COLUMN 1: US */}
                {(geoFilter === 'All' || geoFilter === 'US') && (
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {usDashboards.map((dash, index) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-semibold text-xs sm:text-[13px] text-slate-900 truncate block min-w-0">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {usDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No US dashboards match the filter.
                      </div>
                    )}
                  </div>
                )}

                {/* COLUMN 2: EMEA */}
                {(geoFilter === 'All' || geoFilter === 'EMEA') && (
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {emeaDashboards.map((dash, index) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-semibold text-xs sm:text-[13px] text-slate-900 truncate block min-w-0">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {emeaDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No EMEA dashboards match the filter.
                      </div>
                    )}
                  </div>
                )}

                {/* COLUMN 3: JAPAN */}
                {(geoFilter === 'All' || geoFilter === 'Japan') && (
                  <div className="divide-y divide-slate-100 flex flex-col">
                    {japanDashboards.map((dash, index) => (
                      <div
                        key={dash.id}
                        className="px-4 py-3 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-slate-800"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 w-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-semibold text-xs sm:text-[13px] text-slate-900 truncate block min-w-0">
                            {dash.title}
                          </span>
                        </div>
                      </div>
                    ))}

                    {japanDashboards.length === 0 && (
                      <div className="text-center py-12 text-xs text-slate-400 font-medium">
                        No Japan dashboards match the filter.
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DASHBOARDS AND DATA ASSETS GRID */}
        {activeTab === 'dashboards_and_data_assets_grid' && (
          <div className="space-y-6">
            
            {/* Filter Search Control */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Snowflake account, table name, file name, source, DB or schema..."
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Comprehensive Tables */}
            <div className="space-y-8">
              
              {/* 1. SNOWFLAKE DATA ASSETS TABLE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span>Snowflake Data Warehouse & Storage Assets</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {filteredSnowflakeAssets.length} Registered Tables
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1100px]">
                      <thead>
                        <tr className="bg-slate-100/90 border-b border-slate-200 text-[11px] font-black uppercase text-slate-600 tracking-wider">
                          <th className="py-3.5 px-4">Snowflake Account</th>
                          <th className="py-3.5 px-3">Region</th>
                          <th className="py-3.5 px-4">Data Source</th>
                          <th className="py-3.5 px-4">DB Name</th>
                          <th className="py-3.5 px-4">Schema Name</th>
                          <th className="py-3.5 px-4">Snowflake Table Name</th>
                          <th className="py-3.5 px-4">File Name</th>
                          <th className="py-3.5 px-5">File Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {filteredSnowflakeAssets.map((asset) => (
                          <tr
                            key={asset.id}
                            className="hover:bg-blue-50/40 transition-colors"
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-800 text-xs whitespace-nowrap">
                              {asset.snowflakeAccount}
                            </td>
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-black ${
                                asset.region === 'US' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                asset.region === 'EMEA' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                                'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}>
                                {asset.region}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                              {asset.dataSource}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs font-bold text-blue-700 whitespace-nowrap">
                              {asset.dbName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600 whitespace-nowrap">
                              {asset.schemaName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs font-extrabold text-slate-900 whitespace-nowrap">
                              {asset.snowflakeTableName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-xs text-slate-600 whitespace-nowrap">
                              {asset.fileName}
                            </td>
                            <td className="py-3.5 px-5 text-xs font-medium text-slate-600 max-w-xs">
                              {asset.fileDescription}
                            </td>
                          </tr>
                        ))}

                        {filteredSnowflakeAssets.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-10 text-center text-slate-400 text-xs font-medium">
                              No Snowflake data assets match the search filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

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
