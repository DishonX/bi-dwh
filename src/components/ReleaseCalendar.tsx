import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
//   Clock, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
//   UserCheck, 
  X,
//   Share2,
//   Link2,
//   FileSpreadsheet,
//   Settings2,
//   Info,
//   Search,
//   ListFilter,
//   Layers,
//   Sparkles,
//   Tag
} from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  shortLabel: string;
  badgeType: 'blue' | 'green' | 'amber';
  version: string;
  environment: 'PROD' | 'UAT' | 'QA';
  timeWindow: string;
  owner: string;
  date: string; // YYYY-MM-DD
}

// Initial Extract of All Releases from Attached Documents (Jan - Oct 2026)
const INITIAL_RELEASES_DATA: CalendarEvent[] = [
  // --- JANUARY 2026 ---
  {
    id: 'EVT-JAN-01',
    date: '2026-01-06',
    title: 'Continuation Curve – Logic Change Phase I',
    shortLabel: 'Continuation Curve Phase I',
    badgeType: 'blue',
    version: 'v4.1.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Commercial Analytics'
  },
  {
    id: 'EVT-JAN-02',
    date: '2026-01-08',
    title: 'Global Medical – MOL QBR',
    shortLabel: 'Global Medical MOL QBR',
    badgeType: 'blue',
    version: 'v4.1.1',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Global Medical BI'
  },
  {
    id: 'EVT-JAN-03',
    date: '2026-01-08',
    title: 'Patient Services Phase I & II Leadership Scorecard',
    shortLabel: 'Patient Services Scorecard',
    badgeType: 'green',
    version: 'v4.1.2',
    environment: 'PROD',
    timeWindow: '03:00 AM - 05:00 AM EST',
    owner: 'Patient Services IT'
  },
  {
    id: 'EVT-JAN-04',
    date: '2026-01-08',
    title: 'SLT Weekly Performance Scorecard',
    shortLabel: 'SLT Performance Scorecard',
    badgeType: 'blue',
    version: 'v4.1.3',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:00 AM EST',
    owner: 'Leadership Reporting'
  },
  {
    id: 'EVT-JAN-05',
    date: '2026-01-08',
    title: 'Brinsupri Writers',
    shortLabel: 'Brinsupri Writers Data',
    badgeType: 'amber',
    version: 'v4.1.4',
    environment: 'UAT',
    timeWindow: '06:00 AM - 07:00 AM EST',
    owner: 'Brand Analytics'
  },
  {
    id: 'EVT-JAN-06',
    date: '2026-01-22',
    title: 'Global Study Dashboard – Incident (Horizontal)',
    shortLabel: 'Global Study Dashboard',
    badgeType: 'blue',
    version: 'v4.2.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'Clinical Data Eng'
  },
  {
    id: 'EVT-JAN-07',
    date: '2026-01-22',
    title: "Audit Dashboard – 'Adverse Events' to 'Notice'",
    shortLabel: 'Audit Dashboard AE Notice',
    badgeType: 'blue',
    version: 'v4.2.1',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'GxP Compliance'
  },
  {
    id: 'EVT-JAN-08',
    date: '2026-01-22',
    title: 'Audit Dashboard – Label Changes & Onboarding',
    shortLabel: 'Audit Label Changes',
    badgeType: 'blue',
    version: 'v4.2.2',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Quality Analytics'
  },
  {
    id: 'EVT-JAN-09',
    date: '2026-01-22',
    title: 'Clinical Trends Assessment – Remove Less Used Filters',
    shortLabel: 'Clinical Trends Filters',
    badgeType: 'green',
    version: 'v4.2.3',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:00 AM EST',
    owner: 'Clinical BI'
  },
  {
    id: 'EVT-JAN-10',
    date: '2026-01-22',
    title: 'Global Medical – MSL QBR',
    shortLabel: 'Global Medical MSL QBR',
    badgeType: 'blue',
    version: 'v4.2.4',
    environment: 'PROD',
    timeWindow: '04:30 AM - 05:30 AM EST',
    owner: 'MSL Operations'
  },
  {
    id: 'EVT-JAN-11',
    date: '2026-01-22',
    title: 'MRC Dashboard – Phase I',
    shortLabel: 'MRC Dashboard Phase I',
    badgeType: 'amber',
    version: 'v4.2.5',
    environment: 'UAT',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Medical Affairs'
  },
  {
    id: 'EVT-JAN-12',
    date: '2026-01-22',
    title: 'Global Field Medical Dashboard – Extend to EU',
    shortLabel: 'Field Medical EU Extension',
    badgeType: 'blue',
    version: 'v4.2.6',
    environment: 'PROD',
    timeWindow: '05:30 AM - 07:00 AM EST',
    owner: 'EMEA Field Ops'
  },
  {
    id: 'EVT-JAN-13',
    date: '2026-01-22',
    title: 'HCP Dynamic Audience Segment Target List',
    shortLabel: 'HCP Audience Target List',
    badgeType: 'blue',
    version: 'v4.2.7',
    environment: 'PROD',
    timeWindow: '06:00 AM - 07:30 AM EST',
    owner: 'Commercial Marketing'
  },
  {
    id: 'EVT-JAN-14',
    date: '2026-01-22',
    title: 'SLT Weekly Performance Report – Enhancement',
    shortLabel: 'SLT Weekly Report Enh.',
    badgeType: 'green',
    version: 'v4.2.8',
    environment: 'PROD',
    timeWindow: '06:30 AM - 07:30 AM EST',
    owner: 'BI Operations'
  },
  {
    id: 'EVT-JAN-15',
    date: '2026-01-22',
    title: 'Arikayce Dynamic Marketing target HCPs',
    shortLabel: 'Arikayce Marketing HCPs',
    badgeType: 'blue',
    version: 'v4.2.9',
    environment: 'PROD',
    timeWindow: '07:00 AM - 08:00 AM EST',
    owner: 'Arikayce Analytics'
  },
  {
    id: 'EVT-JAN-16',
    date: '2026-01-22',
    title: 'Arikayce Dynamic Trigger file',
    shortLabel: 'Arikayce Trigger File',
    badgeType: 'blue',
    version: 'v4.2.10',
    environment: 'PROD',
    timeWindow: '07:30 AM - 08:30 AM EST',
    owner: 'Data Integration'
  },
  {
    id: 'EVT-JAN-17',
    date: '2026-01-26',
    title: 'Global Medical – MOL QBR Patient Services',
    shortLabel: 'MOL QBR Patient Services',
    badgeType: 'green',
    version: 'v4.2.11',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Global Medical IT'
  },
  {
    id: 'EVT-JAN-18',
    date: '2026-01-30',
    title: 'Continuation Curve – Logic Change Phase II',
    shortLabel: 'Continuation Curve Phase II',
    badgeType: 'blue',
    version: 'v4.3.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'Commercial Analytics'
  },

  // --- FEBRUARY 2026 ---
  {
    id: 'EVT-FEB-01',
    date: '2026-02-05',
    title: 'Performance Vs Budget',
    shortLabel: 'Performance Vs Budget',
    badgeType: 'blue',
    version: 'v4.3.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Finance BI'
  },
  {
    id: 'EVT-FEB-02',
    date: '2026-02-05',
    title: 'Concur - Product data update',
    shortLabel: 'Concur Product Data',
    badgeType: 'blue',
    version: 'v4.3.2',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'ERP Data Services'
  },
  {
    id: 'EVT-FEB-03',
    date: '2026-02-05',
    title: 'GRP Monitoring Automation',
    shortLabel: 'GRP Monitoring Auto',
    badgeType: 'green',
    version: 'v4.3.3',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Data Governance'
  },
  {
    id: 'EVT-FEB-04',
    date: '2026-02-12',
    title: 'Channel Mix and Inventory Data - Automation',
    shortLabel: 'Channel Mix Automation',
    badgeType: 'blue',
    version: 'v4.4.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Supply Chain BI'
  },
  {
    id: 'EVT-FEB-05',
    date: '2026-02-12',
    title: 'SLT Weekly Performance Report – Enhancement',
    shortLabel: 'SLT Performance Enh.',
    badgeType: 'blue',
    version: 'v4.4.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'BI Operations'
  },
  {
    id: 'EVT-FEB-06',
    date: '2026-02-12',
    title: 'Continuation Curve – Logic Change Phase III',
    shortLabel: 'Continuation Curve Ph III',
    badgeType: 'amber',
    version: 'v4.4.2',
    environment: 'UAT',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'Commercial Analytics'
  },
  {
    id: 'EVT-FEB-07',
    date: '2026-02-12',
    title: 'Dispense & Inventory Report - Automated Pipeline',
    shortLabel: 'Dispense & Inventory Auto',
    badgeType: 'blue',
    version: 'v4.4.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Inventory Data Team'
  },
  {
    id: 'EVT-FEB-08',
    date: '2026-02-12',
    title: 'Veeva Hierarchy Onboard',
    shortLabel: 'Veeva Hierarchy Onboard',
    badgeType: 'blue',
    version: 'v4.4.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Commercial CRM'
  },
  {
    id: 'EVT-FEB-09',
    date: '2026-02-12',
    title: 'RRD – Roster Member Report',
    shortLabel: 'RRD Roster Report',
    badgeType: 'green',
    version: 'v4.4.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:00 AM EST',
    owner: 'Field Ops IT'
  },
  {
    id: 'EVT-FEB-10',
    date: '2026-02-12',
    title: 'EMEA Sales NPP',
    shortLabel: 'EMEA Sales NPP',
    badgeType: 'blue',
    version: 'v4.4.6',
    environment: 'PROD',
    timeWindow: '04:30 AM - 05:30 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-FEB-11',
    date: '2026-02-12',
    title: 'UPP – DQ',
    shortLabel: 'UPP Data Quality',
    badgeType: 'blue',
    version: 'v4.4.7',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:00 AM EST',
    owner: 'DQ Engineering'
  },
  {
    id: 'EVT-FEB-12',
    date: '2026-02-12',
    title: 'IOD/POD – Add a new column called "Batch Number"',
    shortLabel: 'IOD/POD Batch Column',
    badgeType: 'blue',
    version: 'v4.4.8',
    environment: 'PROD',
    timeWindow: '05:30 AM - 06:30 AM EST',
    owner: 'Supply Chain BI'
  },
  {
    id: 'EVT-FEB-13',
    date: '2026-02-12',
    title: 'Order File – Remove Credit and Debit Notes',
    shortLabel: 'Order File Notes Update',
    badgeType: 'blue',
    version: 'v4.4.9',
    environment: 'PROD',
    timeWindow: '06:00 AM - 07:00 AM EST',
    owner: 'Order Mgmt Data'
  },
  {
    id: 'EVT-FEB-14',
    date: '2026-02-12',
    title: 'Incentive Calculation Report 2026-H1',
    shortLabel: 'Incentive Calculation H1',
    badgeType: 'green',
    version: 'v4.4.10',
    environment: 'PROD',
    timeWindow: '06:30 AM - 08:00 AM EST',
    owner: 'Sales Comp Team'
  },
  {
    id: 'EVT-FEB-15',
    date: '2026-02-19',
    title: 'Budget Data load',
    shortLabel: 'Budget Data Load',
    badgeType: 'blue',
    version: 'v4.5.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Finance IT'
  },

  // --- MARCH 2026 ---
  {
    id: 'EVT-MAR-01',
    date: '2026-03-05',
    title: 'Oracle-EPM automation',
    shortLabel: 'Oracle EPM Automation',
    badgeType: 'blue',
    version: 'v4.6.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Finance Engineering'
  },
  {
    id: 'EVT-MAR-02',
    date: '2026-03-05',
    title: 'Veeva CRM Myinsights',
    shortLabel: 'Veeva CRM Myinsights',
    badgeType: 'blue',
    version: 'v4.6.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Commercial CRM'
  },
  {
    id: 'EVT-MAR-03',
    date: '2026-03-05',
    title: 'EMEA Sales BR update – Include ZPR0 Condition',
    shortLabel: 'EMEA Sales ZPR0 Update',
    badgeType: 'blue',
    version: 'v4.6.2',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'EMEA Sales BI'
  },
  {
    id: 'EVT-MAR-04',
    date: '2026-03-05',
    title: 'EMEA Sales BR update - Excluding Replacement',
    shortLabel: 'EMEA Sales Exclude Repl.',
    badgeType: 'green',
    version: 'v4.6.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'EMEA Sales BI'
  },
  {
    id: 'EVT-MAR-05',
    date: '2026-03-05',
    title: 'Customer Master Data – Credit Limit',
    shortLabel: 'Customer Master Credit',
    badgeType: 'blue',
    version: 'v4.6.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'MDM Data Team'
  },
  {
    id: 'EVT-MAR-06',
    date: '2026-03-05',
    title: 'Patient Services Scorecard – Enhancement',
    shortLabel: 'Patient Services Enh.',
    badgeType: 'blue',
    version: 'v4.6.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Patient Services'
  },
  {
    id: 'EVT-MAR-07',
    date: '2026-03-05',
    title: 'UPP – DQ',
    shortLabel: 'UPP Data Quality Sync',
    badgeType: 'amber',
    version: 'v4.6.6',
    environment: 'UAT',
    timeWindow: '04:30 AM - 05:30 AM EST',
    owner: 'DQ Engineering'
  },
  {
    id: 'EVT-MAR-08',
    date: '2026-03-05',
    title: 'Rearrange EF metrics; add LTD, YTD turnover',
    shortLabel: 'Rearrange EF Metrics',
    badgeType: 'blue',
    version: 'v4.6.7',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Executive Analytics'
  },
  {
    id: 'EVT-MAR-09',
    date: '2026-03-05',
    title: 'Channel Mix and Inventory Data - Automation',
    shortLabel: 'Channel Mix Auto Sync',
    badgeType: 'blue',
    version: 'v4.6.8',
    environment: 'PROD',
    timeWindow: '05:30 AM - 07:00 AM EST',
    owner: 'Supply Chain Data'
  },
  {
    id: 'EVT-MAR-10',
    date: '2026-03-05',
    title: 'Field Medical Dashboard – (Label & filter changes)',
    shortLabel: 'Field Medical Labels',
    badgeType: 'green',
    version: 'v4.6.9',
    environment: 'PROD',
    timeWindow: '06:00 AM - 07:00 AM EST',
    owner: 'Field Medical'
  },
  {
    id: 'EVT-MAR-11',
    date: '2026-03-05',
    title: 'Restricting Patient Data in PEP integration.',
    shortLabel: 'Restrict Patient Data PEP',
    badgeType: 'blue',
    version: 'v4.6.10',
    environment: 'PROD',
    timeWindow: '06:30 AM - 08:00 AM EST',
    owner: 'Security & Compliance'
  },
  {
    id: 'EVT-MAR-12',
    date: '2026-03-12',
    title: 'Corporate Web Insights Dashboard',
    shortLabel: 'Corporate Web Insights',
    badgeType: 'blue',
    version: 'v4.7.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Digital Analytics'
  },
  {
    id: 'EVT-MAR-13',
    date: '2026-03-13',
    title: 'Snowflake Cost Optimization',
    shortLabel: 'Snowflake Cost Opt.',
    badgeType: 'green',
    version: 'v4.7.1',
    environment: 'PROD',
    timeWindow: '01:00 AM - 02:30 AM EST',
    owner: 'Cloud Infrastructure'
  },
  {
    id: 'EVT-MAR-14',
    date: '2026-03-13',
    title: 'Issue in Accessing Invoice Image in Qlik Report',
    shortLabel: 'Qlik Invoice Image Fix',
    badgeType: 'blue',
    version: 'v4.7.2',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:00 AM EST',
    owner: 'Qlik Operations'
  },
  {
    id: 'EVT-MAR-15',
    date: '2026-03-19',
    title: 'Prime location extract file transfer – Automation',
    shortLabel: 'Prime Location Transfer',
    badgeType: 'blue',
    version: 'v4.8.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 02:30 AM EST',
    owner: 'Data Integration'
  },
  {
    id: 'EVT-MAR-16',
    date: '2026-03-19',
    title: 'Global Sales Dashboard - Regional View',
    shortLabel: 'Global Sales Dashboard',
    badgeType: 'blue',
    version: 'v4.8.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Global Sales BI'
  },
  {
    id: 'EVT-MAR-17',
    date: '2026-03-19',
    title: 'Self Service AI project',
    shortLabel: 'Self Service AI Project',
    badgeType: 'amber',
    version: 'v4.8.2',
    environment: 'UAT',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'AI & Innovation'
  },
  {
    id: 'EVT-MAR-18',
    date: '2026-03-19',
    title: 'Pricing MDM & Reconciliation Report',
    shortLabel: 'Pricing MDM Reconcile',
    badgeType: 'blue',
    version: 'v4.8.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Pricing & Contracts'
  },
  {
    id: 'EVT-MAR-19',
    date: '2026-03-19',
    title: 'INQUA: Germany NPS Territory Integration',
    shortLabel: 'Germany NPS Territory',
    badgeType: 'blue',
    version: 'v4.8.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-MAR-20',
    date: '2026-03-19',
    title: 'Maxor name change to VytlOne – All system updates',
    shortLabel: 'Maxor to VytlOne Name',
    badgeType: 'green',
    version: 'v4.8.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Master Data Ops'
  },
  {
    id: 'EVT-MAR-21',
    date: '2026-03-19',
    title: 'HCP 360 – New columns (Trailist & Last EFR)',
    shortLabel: 'HCP 360 Trailist Columns',
    badgeType: 'blue',
    version: 'v4.8.6',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'HCP Data Platform'
  },
  {
    id: 'EVT-MAR-22',
    date: '2026-03-19',
    title: 'Oracle-EPM automation Phase 2',
    shortLabel: 'Oracle EPM Phase 2',
    badgeType: 'blue',
    version: 'v4.8.7',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Finance IT'
  },
  {
    id: 'EVT-MAR-23',
    date: '2026-03-20',
    title: 'Migration Siebel CTMS to Veeva CTMS',
    shortLabel: 'Siebel to Veeva CTMS',
    badgeType: 'blue',
    version: 'v4.8.8',
    environment: 'PROD',
    timeWindow: '02:00 AM - 06:00 AM EST',
    owner: 'Clinical Systems'
  },
  {
    id: 'EVT-MAR-24',
    date: '2026-03-21',
    title: 'Json to CSV Config Migration',
    shortLabel: 'Json to CSV Config',
    badgeType: 'green',
    version: 'v4.8.9',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Core Middleware'
  },
  {
    id: 'EVT-MAR-25',
    date: '2026-03-23',
    title: 'EPM vs Qlik Data Validation Variance',
    shortLabel: 'EPM vs Qlik Variance',
    badgeType: 'blue',
    version: 'v4.8.10',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'DQ Engineering'
  },

  // --- APRIL 2026 ---
  {
    id: 'EVT-APR-01',
    date: '2026-04-02',
    title: 'Pricing MDM & Reconciliation Report',
    shortLabel: 'Pricing MDM Reconcile',
    badgeType: 'blue',
    version: 'v4.9.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 02:30 AM EST',
    owner: 'Pricing Analytics'
  },
  {
    id: 'EVT-APR-02',
    date: '2026-04-02',
    title: 'PDT & Customer MDM – Reconciliation Report',
    shortLabel: 'PDT & Customer MDM',
    badgeType: 'blue',
    version: 'v4.9.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'MDM Team'
  },
  {
    id: 'EVT-APR-03',
    date: '2026-04-02',
    title: 'Field Medical Dashboard – MSL Changes',
    shortLabel: 'Field Medical MSL Changes',
    badgeType: 'green',
    version: 'v4.9.2',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'Field Medical'
  },
  {
    id: 'EVT-APR-04',
    date: '2026-04-02',
    title: 'Direct Patients to PEP Data Integration',
    shortLabel: 'Direct Patients PEP Sync',
    badgeType: 'blue',
    version: 'v4.9.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Patient Services'
  },
  {
    id: 'EVT-APR-05',
    date: '2026-04-02',
    title: 'Adoption Ladder',
    shortLabel: 'Adoption Ladder Analytics',
    badgeType: 'blue',
    version: 'v4.9.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Brand Strategy'
  },
  {
    id: 'EVT-APR-06',
    date: '2026-04-02',
    title: 'Dashboard Monitoring Automation',
    shortLabel: 'Dashboard Monitor Auto',
    badgeType: 'green',
    version: 'v4.9.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:00 AM EST',
    owner: 'BI Operations'
  },
  {
    id: 'EVT-APR-07',
    date: '2026-04-02',
    title: 'Average Dispense Per Patient',
    shortLabel: 'Average Dispense Patient',
    badgeType: 'blue',
    version: 'v4.9.6',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'Patient Analytics'
  },
  {
    id: 'EVT-APR-08',
    date: '2026-04-02',
    title: 'Global Sales Dashboard',
    shortLabel: 'Global Sales Dashboard',
    badgeType: 'blue',
    version: 'v4.9.7',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Global Sales IT'
  },
  {
    id: 'EVT-APR-09',
    date: '2026-04-02',
    title: 'Arvato Sales Report Cloud – New Business Integration',
    shortLabel: 'Arvato Sales Cloud Sync',
    badgeType: 'blue',
    version: 'v4.9.8',
    environment: 'PROD',
    timeWindow: '05:30 AM - 07:00 AM EST',
    owner: 'Trade Analytics'
  },
  {
    id: 'EVT-APR-10',
    date: '2026-04-06',
    title: 'Field Medical Dashboard – MSL Changes Phase II',
    shortLabel: 'Field Medical MSL Ph II',
    badgeType: 'blue',
    version: 'v4.10.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Field Medical'
  },
  {
    id: 'EVT-APR-11',
    date: '2026-04-06',
    title: 'Performance Goals - Data Integration into DWH',
    shortLabel: 'Performance Goals DWH',
    badgeType: 'green',
    version: 'v4.10.1',
    environment: 'PROD',
    timeWindow: '03:00 AM - 05:00 AM EST',
    owner: 'HR & Comp Analytics'
  },
  {
    id: 'EVT-APR-12',
    date: '2026-04-16',
    title: 'Pricing MDM & Reconciliation Report – Patient Data',
    shortLabel: 'Pricing MDM Patient Data',
    badgeType: 'blue',
    version: 'v4.10.2',
    environment: 'PROD',
    timeWindow: '01:30 AM - 03:00 AM EST',
    owner: 'Pricing & Contracts'
  },
  {
    id: 'EVT-APR-13',
    date: '2026-04-16',
    title: 'Investigator Dashboard - Load and enable metrics',
    shortLabel: 'Investigator Dashboard',
    badgeType: 'blue',
    version: 'v4.10.3',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Clinical Operations'
  },
  {
    id: 'EVT-APR-14',
    date: '2026-04-16',
    title: 'Snowflake Data warehouse bundle update',
    shortLabel: 'Snowflake DWH Bundle',
    badgeType: 'blue',
    version: 'v4.10.4',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:30 AM EST',
    owner: 'Data Platform'
  },
  {
    id: 'EVT-APR-15',
    date: '2026-04-16',
    title: 'Program Consent Status - Add "No" option',
    shortLabel: 'Program Consent Option',
    badgeType: 'green',
    version: 'v4.10.5',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Consent Governance'
  },
  {
    id: 'EVT-APR-16',
    date: '2026-04-16',
    title: 'Kaiser and Accredo Changes (CM-234) (Patient)',
    shortLabel: 'Kaiser & Accredo Changes',
    badgeType: 'amber',
    version: 'v4.10.6',
    environment: 'UAT',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Specialty Pharmacy'
  },
  {
    id: 'EVT-APR-17',
    date: '2026-04-17',
    title: 'PRIME location extract framework - Configuration',
    shortLabel: 'PRIME Location Config',
    badgeType: 'blue',
    version: 'v4.10.7',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Extract Framework'
  },
  {
    id: 'EVT-APR-18',
    date: '2026-04-20',
    title: 'Veeva Non-Visitable HCOs DWH',
    shortLabel: 'Veeva Non-Visitable HCOs',
    badgeType: 'blue',
    version: 'v4.10.8',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'CRM Data Engineering'
  },
  {
    id: 'EVT-APR-19',
    date: '2026-04-23',
    title: 'NCFBE Writer Segment (CM-211) (Brinsupri)',
    shortLabel: 'NCFBE Writer Segment',
    badgeType: 'blue',
    version: 'v4.10.9',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Brinsupri Brand'
  },
  {
    id: 'EVT-APR-20',
    date: '2026-04-23',
    title: 'Risk Based Monitoring Analytics-Phase II',
    shortLabel: 'Risk Based Monitoring Ph II',
    badgeType: 'blue',
    version: 'v4.10.10',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Clinical Quality'
  },
  {
    id: 'EVT-APR-21',
    date: '2026-04-23',
    title: 'Streamlined SLT Scorecard (CM-207)',
    shortLabel: 'Streamlined SLT Scorecard',
    badgeType: 'green',
    version: 'v4.10.11',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'BI Executive'
  },
  {
    id: 'EVT-APR-22',
    date: '2026-04-23',
    title: 'ASD SP Data Exclusion (CM-142)',
    shortLabel: 'ASD SP Data Exclusion',
    badgeType: 'blue',
    version: 'v4.10.12',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'ASD Data Team'
  },
  {
    id: 'EVT-APR-23',
    date: '2026-04-23',
    title: 'Brinsupri Trigger File Outbound',
    shortLabel: 'Brinsupri Trigger Outbound',
    badgeType: 'blue',
    version: 'v4.10.13',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Outbound Data Ops'
  },
  {
    id: 'EVT-APR-24',
    date: '2026-04-24',
    title: 'Risk Based Monitoring Analytics-Phase II Sync',
    shortLabel: 'Risk Based Monitoring Sync',
    badgeType: 'blue',
    version: 'v4.10.14',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Clinical Quality'
  },
  {
    id: 'EVT-APR-25',
    date: '2026-04-24',
    title: 'RRD – User group',
    shortLabel: 'RRD User Group Update',
    badgeType: 'green',
    version: 'v4.10.15',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:00 AM EST',
    owner: 'Field Operations'
  },
  {
    id: 'EVT-APR-26',
    date: '2026-04-30',
    title: 'Tebra New Data Interface Integration',
    shortLabel: 'Tebra Data Interface',
    badgeType: 'blue',
    version: 'v4.10.16',
    environment: 'PROD',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'Data Integration'
  },

  // --- MAY 2026 ---
  {
    id: 'EVT-MAY-01',
    date: '2026-05-01',
    title: 'Tebra Data Interface Integration',
    shortLabel: 'Tebra Integration Patch',
    badgeType: 'blue',
    version: 'v4.11.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Data Integration'
  },
  {
    id: 'EVT-MAY-02',
    date: '2026-05-06',
    title: 'DX Web Registration Data Integration',
    shortLabel: 'DX Web Registration Data',
    badgeType: 'blue',
    version: 'v4.11.1',
    environment: 'PROD',
    timeWindow: '01:30 AM - 03:30 AM EST',
    owner: 'Digital Web Team'
  },
  {
    id: 'EVT-MAY-03',
    date: '2026-05-07',
    title: 'KeDB AI',
    shortLabel: 'KeDB AI Assistant',
    badgeType: 'amber',
    version: 'v4.11.2',
    environment: 'UAT',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'AI & Knowledge Management'
  },
  {
    id: 'EVT-MAY-04',
    date: '2026-05-07',
    title: 'Clinical Trends Assessment dashboard - Enhancement',
    shortLabel: 'Clinical Trends Enh.',
    badgeType: 'blue',
    version: 'v4.11.3',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Clinical BI'
  },
  {
    id: 'EVT-MAY-05',
    date: '2026-05-07',
    title: 'Quality Analytics & Rept. Platform (Bundle Update)',
    shortLabel: 'Quality Analytics Bundle',
    badgeType: 'blue',
    version: 'v4.11.4',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'Quality IT'
  },
  {
    id: 'EVT-MAY-06',
    date: '2026-05-07',
    title: 'MRC PPT Report',
    shortLabel: 'MRC PPT Report Gen',
    badgeType: 'green',
    version: 'v4.11.5',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:00 AM EST',
    owner: 'Medical Reporting'
  },
  {
    id: 'EVT-MAY-07',
    date: '2026-05-07',
    title: 'Arikayce ASD NBRx calculation changes (CM-190)',
    shortLabel: 'Arikayce ASD NBRx',
    badgeType: 'blue',
    version: 'v4.11.6',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Arikayce Brand'
  },
  {
    id: 'EVT-MAY-08',
    date: '2026-05-07',
    title: 'SP Direct Patient Information in PEP',
    shortLabel: 'SP Direct Patient PEP',
    badgeType: 'blue',
    version: 'v4.11.7',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Patient Services'
  },
  {
    id: 'EVT-MAY-09',
    date: '2026-05-07',
    title: 'ASD – Orders, Inventory & WOH Status Report',
    shortLabel: 'ASD Orders & Inventory',
    badgeType: 'blue',
    version: 'v4.11.8',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'Supply Chain Analytics'
  },
  {
    id: 'EVT-MAY-10',
    date: '2026-05-07',
    title: 'Brinsupri HCP Dynamic Targets',
    shortLabel: 'Brinsupri HCP Dynamic',
    badgeType: 'blue',
    version: 'v4.11.9',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Commercial Marketing'
  },
  {
    id: 'EVT-MAY-11',
    date: '2026-05-07',
    title: 'DX Web Registration Data Integration - Hotfix',
    shortLabel: 'DX Web Hotfix',
    badgeType: 'green',
    version: 'v4.11.10',
    environment: 'PROD',
    timeWindow: '05:30 AM - 06:30 AM EST',
    owner: 'Digital Web Team'
  },
  {
    id: 'EVT-MAY-12',
    date: '2026-05-07',
    title: 'Mediservice – New Business rule for Lamira',
    shortLabel: 'Mediservice Lamira Rule',
    badgeType: 'blue',
    version: 'v4.11.11',
    environment: 'PROD',
    timeWindow: '06:00 AM - 07:00 AM EST',
    owner: 'Commercial Ops'
  },
  {
    id: 'EVT-MAY-13',
    date: '2026-05-07',
    title: 'Italy NPS – Business rule Enhancement',
    shortLabel: 'Italy NPS Rule Enh.',
    badgeType: 'blue',
    version: 'v4.11.12',
    environment: 'PROD',
    timeWindow: '06:30 AM - 07:30 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-MAY-14',
    date: '2026-05-07',
    title: 'Underscore Brinsupri Dynamic HCP Target',
    shortLabel: 'Brinsupri Dynamic HCP',
    badgeType: 'blue',
    version: 'v4.11.13',
    environment: 'PROD',
    timeWindow: '07:00 AM - 08:00 AM EST',
    owner: 'Commercial Marketing'
  },
  {
    id: 'EVT-MAY-15',
    date: '2026-05-07',
    title: 'Diagnostic Analytics – Call Activity [Enhancement]',
    shortLabel: 'Diagnostic Call Activity',
    badgeType: 'green',
    version: 'v4.11.14',
    environment: 'PROD',
    timeWindow: '07:30 AM - 08:30 AM EST',
    owner: 'Field Analytics'
  },
  {
    id: 'EVT-MAY-16',
    date: '2026-05-07',
    title: 'Snowflake Environment creation (database)',
    shortLabel: 'Snowflake DB Provisioning',
    badgeType: 'blue',
    version: 'v4.11.15',
    environment: 'PROD',
    timeWindow: '08:00 AM - 09:30 AM EST',
    owner: 'Cloud Infrastructure'
  },
  {
    id: 'EVT-MAY-17',
    date: '2026-05-10',
    title: 'Veeva CRM Myinsights',
    shortLabel: 'Veeva CRM Myinsights',
    badgeType: 'blue',
    version: 'v4.11.16',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Commercial CRM'
  },
  {
    id: 'EVT-MAY-18',
    date: '2026-05-10',
    title: 'Nitro to CRM integration',
    shortLabel: 'Nitro to CRM Sync',
    badgeType: 'blue',
    version: 'v4.11.17',
    environment: 'PROD',
    timeWindow: '03:00 AM - 05:00 AM EST',
    owner: 'Data Integration'
  },
  {
    id: 'EVT-MAY-19',
    date: '2026-05-21',
    title: 'Quality Analytics & Rept. Platform',
    shortLabel: 'Quality Analytics Platform',
    badgeType: 'blue',
    version: 'v4.12.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Quality IT'
  },
  {
    id: 'EVT-MAY-20',
    date: '2026-05-21',
    title: 'Field Medical Dashboard – Mashup Framework',
    shortLabel: 'Field Medical Mashup',
    badgeType: 'blue',
    version: 'v4.12.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Field Medical'
  },
  {
    id: 'EVT-MAY-21',
    date: '2026-05-21',
    title: 'Corporate Web Insights Dashboard',
    shortLabel: 'Corporate Web Insights',
    badgeType: 'blue',
    version: 'v4.12.2',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'Digital Web Team'
  },
  {
    id: 'EVT-MAY-22',
    date: '2026-05-21',
    title: 'MOL Dashboard and Mashup',
    shortLabel: 'MOL Dashboard Mashup',
    badgeType: 'green',
    version: 'v4.12.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Global Medical'
  },
  {
    id: 'EVT-MAY-23',
    date: '2026-05-21',
    title: 'Channel Mix Format for 340B replenishment',
    shortLabel: 'Channel Mix 340B Format',
    badgeType: 'blue',
    version: 'v4.12.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Trade Analytics'
  },
  {
    id: 'EVT-MAY-24',
    date: '2026-05-21',
    title: 'Average Dispense - addition of +/- restart',
    shortLabel: 'Average Dispense Restart',
    badgeType: 'blue',
    version: 'v4.12.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'Patient Analytics'
  },
  {
    id: 'EVT-MAY-25',
    date: '2026-05-21',
    title: 'Brinsupri Marketing Trigger Outbound Enhancement',
    shortLabel: 'Brinsupri Marketing Trigger',
    badgeType: 'blue',
    version: 'v4.12.6',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'Outbound Data Ops'
  },
  {
    id: 'EVT-MAY-26',
    date: '2026-05-28',
    title: 'Dx Acceleration PPT',
    shortLabel: 'Dx Acceleration PPT',
    badgeType: 'green',
    version: 'v4.12.7',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Diagnostics Analytics'
  },
  {
    id: 'EVT-MAY-27',
    date: '2026-05-29',
    title: 'Commercial Self Service AI',
    shortLabel: 'Commercial Self Service AI',
    badgeType: 'amber',
    version: 'v4.12.8',
    environment: 'UAT',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'AI & Innovation'
  },

  // --- JUNE 2026 ---
  {
    id: 'EVT-JUN-01',
    date: '2026-06-04',
    title: 'SP Direct Patient Information in PEP',
    shortLabel: 'SP Direct Patient PEP',
    badgeType: 'blue',
    version: 'v4.13.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 02:30 AM EST',
    owner: 'Patient Services'
  },
  {
    id: 'EVT-JUN-02',
    date: '2026-06-04',
    title: 'MOL Dashboard and Mashup',
    shortLabel: 'MOL Dashboard Mashup',
    badgeType: 'blue',
    version: 'v4.13.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Global Medical'
  },
  {
    id: 'EVT-JUN-03',
    date: '2026-06-04',
    title: 'Performance vs Budget – Cosmetic changes',
    shortLabel: 'Performance vs Budget UI',
    badgeType: 'green',
    version: 'v4.13.2',
    environment: 'PROD',
    timeWindow: '02:30 AM - 03:30 AM EST',
    owner: 'Finance BI'
  },
  {
    id: 'EVT-JUN-04',
    date: '2026-06-04',
    title: 'Italy NPS – Business rule Enhancement (EMEA)',
    shortLabel: 'Italy NPS Rule EMEA',
    badgeType: 'blue',
    version: 'v4.13.3',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-JUN-05',
    date: '2026-06-04',
    title: 'Mediservice – New Business rule for Lamira',
    shortLabel: 'Mediservice Lamira Rule',
    badgeType: 'blue',
    version: 'v4.13.4',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Commercial Ops'
  },
  {
    id: 'EVT-JUN-06',
    date: '2026-06-04',
    title: 'Field Medical – MSL KMI Module',
    shortLabel: 'Field Medical MSL KMI',
    badgeType: 'blue',
    version: 'v4.13.5',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:30 AM EST',
    owner: 'MSL Operations'
  },
  {
    id: 'EVT-JUN-07',
    date: '2026-06-04',
    title: 'Diagnostic Analytics – Call Activity [Enhancement]',
    shortLabel: 'Diagnostic Call Enh.',
    badgeType: 'green',
    version: 'v4.13.6',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'Field Analytics'
  },
  {
    id: 'EVT-JUN-08',
    date: '2026-06-08',
    title: 'KeDB AI',
    shortLabel: 'KeDB AI System Release',
    badgeType: 'amber',
    version: 'v4.13.7',
    environment: 'UAT',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'AI & Knowledge Team'
  },
  {
    id: 'EVT-JUN-09',
    date: '2026-06-08',
    title: 'SharePoint Portal Managed Services',
    shortLabel: 'SharePoint Managed Portal',
    badgeType: 'blue',
    version: 'v4.13.8',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Collaboration IT'
  },
  {
    id: 'EVT-JUN-10',
    date: '2026-06-15',
    title: 'Performance vs Budget [Brinsupri Launch]',
    shortLabel: 'Performance vs Budget Brinsupri',
    badgeType: 'blue',
    version: 'v4.14.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:30 AM EST',
    owner: 'Finance BI'
  },
  {
    id: 'EVT-JUN-11',
    date: '2026-06-16',
    title: 'Concur Data - Nitro to Spendmate',
    shortLabel: 'Concur Nitro to Spendmate',
    badgeType: 'blue',
    version: 'v4.14.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'ERP Data Integration'
  },
  {
    id: 'EVT-JUN-12',
    date: '2026-06-18',
    title: 'Global Finance, Global Study Dashboard',
    shortLabel: 'Global Finance & Study',
    badgeType: 'blue',
    version: 'v4.14.2',
    environment: 'PROD',
    timeWindow: '01:00 AM - 03:00 AM EST',
    owner: 'Global Finance IT'
  },
  {
    id: 'EVT-JUN-13',
    date: '2026-06-18',
    title: 'Global Study Dashboard - Phase III with Metrics',
    shortLabel: 'Global Study Phase III',
    badgeType: 'blue',
    version: 'v4.14.3',
    environment: 'PROD',
    timeWindow: '01:30 AM - 03:30 AM EST',
    owner: 'Clinical Analytics'
  },
  {
    id: 'EVT-JUN-14',
    date: '2026-06-18',
    title: 'Quality Analytics & Rept. Platform PPT Report',
    shortLabel: 'Quality Analytics PPT',
    badgeType: 'green',
    version: 'v4.14.4',
    environment: 'PROD',
    timeWindow: '02:00 AM - 03:30 AM EST',
    owner: 'Quality IT'
  },
  {
    id: 'EVT-JUN-15',
    date: '2026-06-18',
    title: 'DE/AT NPS by Territory - Evolution of the Index',
    shortLabel: 'DE/AT NPS Evolution',
    badgeType: 'blue',
    version: 'v4.14.5',
    environment: 'PROD',
    timeWindow: '02:30 AM - 04:00 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-JUN-16',
    date: '2026-06-18',
    title: 'Channel Management - DCA Patient Detail',
    shortLabel: 'Channel Mgmt DCA Patient',
    badgeType: 'blue',
    version: 'v4.14.6',
    environment: 'PROD',
    timeWindow: '03:00 AM - 04:30 AM EST',
    owner: 'Trade Analytics'
  },
  {
    id: 'EVT-JUN-17',
    date: '2026-06-18',
    title: 'ASD – Orders, Inventory & WOH Status Report',
    shortLabel: 'ASD Orders & WOH',
    badgeType: 'blue',
    version: 'v4.14.7',
    environment: 'PROD',
    timeWindow: '03:30 AM - 05:00 AM EST',
    owner: 'Supply Chain BI'
  },
  {
    id: 'EVT-JUN-18',
    date: '2026-06-18',
    title: 'US Sales Report Enhancement',
    shortLabel: 'US Sales Report Enh.',
    badgeType: 'green',
    version: 'v4.14.8',
    environment: 'PROD',
    timeWindow: '04:00 AM - 05:00 AM EST',
    owner: 'US Commercial BI'
  },
  {
    id: 'EVT-JUN-19',
    date: '2026-06-18',
    title: 'Veeva CRM – Brinsupri Product Segmentation',
    shortLabel: 'Veeva CRM Brinsupri Seg.',
    badgeType: 'blue',
    version: 'v4.14.9',
    environment: 'PROD',
    timeWindow: '04:30 AM - 06:00 AM EST',
    owner: 'Commercial CRM'
  },
  {
    id: 'EVT-JUN-20',
    date: '2026-06-18',
    title: 'Ambit Data integration',
    shortLabel: 'Ambit Data Integration',
    badgeType: 'blue',
    version: 'v4.14.10',
    environment: 'PROD',
    timeWindow: '05:00 AM - 06:30 AM EST',
    owner: 'Data Engineering'
  },
  {
    id: 'EVT-JUN-21',
    date: '2026-06-18',
    title: 'Arikayce Sales report Enhancement',
    shortLabel: 'Arikayce Sales Report Enh.',
    badgeType: 'green',
    version: 'v4.14.11',
    environment: 'PROD',
    timeWindow: '05:30 AM - 06:30 AM EST',
    owner: 'Arikayce Brand'
  },

  // --- JULY 2026 ---
  {
    id: 'EVT-JUL-01',
    date: '2026-07-02',
    title: 'Clinical Trends Assessment Dashboard – Phase 2',
    shortLabel: 'Clinical Trends Ph 2',
    badgeType: 'blue',
    version: 'v4.15.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Clinical Analytics'
  },
  {
    id: 'EVT-JUL-02',
    date: '2026-07-02',
    title: 'Global Finance – Self Service Reporting Platform',
    shortLabel: 'Global Finance Self Service',
    badgeType: 'blue',
    version: 'v4.15.1',
    environment: 'PROD',
    timeWindow: '03:00 AM - 05:00 AM EST',
    owner: 'Finance BI'
  },
  {
    id: 'EVT-JUL-03',
    date: '2026-07-02',
    title: 'EMEA CRM – Marketing Dashboard',
    shortLabel: 'EMEA CRM Marketing',
    badgeType: 'amber',
    version: 'v4.15.2',
    environment: 'UAT',
    timeWindow: '04:00 AM - 06:00 AM EST',
    owner: 'EMEA Commercial'
  },
  {
    id: 'EVT-JUL-04',
    date: '2026-07-06',
    title: 'DE/AT NPS by Territory - Evolution of the Index',
    shortLabel: 'DE/AT NPS Evolution',
    badgeType: 'green',
    version: 'v4.15.3',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'EMEA Analytics'
  },
  {
    id: 'EVT-JUL-05',
    date: '2026-07-16',
    title: 'Self-Service AI Phase 2',
    shortLabel: 'Self-Service AI Ph 2',
    badgeType: 'blue',
    version: 'v4.16.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'AI & Innovation'
  },
  {
    id: 'EVT-JUL-06',
    date: '2026-07-16',
    title: 'Global Study Dashboard - Phase III with Metrics',
    shortLabel: 'Global Study Ph III Metrics',
    badgeType: 'blue',
    version: 'v4.16.1',
    environment: 'PROD',
    timeWindow: '03:00 AM - 05:30 AM EST',
    owner: 'Clinical Data Eng'
  },

  // --- AUGUST 2026 ---
  {
    id: 'EVT-AUG-01',
    date: '2026-08-06',
    title: 'Vendor Oversight Dashboard – Phase III',
    shortLabel: 'Vendor Oversight Ph III',
    badgeType: 'blue',
    version: 'v4.17.0',
    environment: 'PROD',
    timeWindow: '02:00 AM - 05:00 AM EST',
    owner: 'Vendor Governance'
  },
  {
    id: 'EVT-AUG-02',
    date: '2026-08-30',
    title: 'Data Migration – Nitro to Snowflake',
    shortLabel: 'Data Migration Nitro to Snowflake',
    badgeType: 'amber',
    version: 'v4.18.0',
    environment: 'UAT',
    timeWindow: '01:00 AM - 06:00 AM EST',
    owner: 'Data Platform'
  },

  // --- SEPTEMBER 2026 ---
  {
    id: 'EVT-SEP-01',
    date: '2026-09-29',
    title: 'US Commercial Data Platform',
    shortLabel: 'US Commercial Data Platform',
    badgeType: 'blue',
    version: 'v5.0.0',
    environment: 'PROD',
    timeWindow: '01:00 AM - 06:00 AM EST',
    owner: 'US Commercial BI'
  },

  // --- OCTOBER 2026 ---
  {
    id: 'EVT-OCT-01',
    date: '2026-10-04',
    title: 'SharePoint Portal Managed Services',
    shortLabel: 'SharePoint Managed Services',
    badgeType: 'green',
    version: 'v5.0.1',
    environment: 'PROD',
    timeWindow: '02:00 AM - 04:00 AM EST',
    owner: 'Collaboration Services'
  }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ReleaseCalendar() {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>(INITIAL_RELEASES_DATA);
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(6); // Default: July (index 6)
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-07-02');
  const [searchQuery, _setSearchQuery] = useState<string>('');
  const [selectedEnvFilter, _setSelectedEnvFilter] = useState<string>('ALL');
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Form State
  const [newTitle, setNewTitle] = useState('');
  const [newVersion, _setNewVersion] = useState('v4.19.0');
  const [newEnv, _setNewEnv] = useState<'PROD' | 'UAT' | 'QA'>('PROD');
  const [newDate, setNewDate] = useState('2026-07-15');
  const [newTime, _setNewTime] = useState('02:00 AM - 04:00 AM EST');
  const [newOwner, _setNewOwner] = useState('BI Operations');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Month Navigation Handlers
  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  // Filter events by Search Query & Environment
  const filteredEvents = useMemo(() => {
    return allEvents.filter(evt => {
      const matchesSearch = searchQuery.trim() === '' || 
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.version.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesEnv = selectedEnvFilter === 'ALL' || evt.environment === selectedEnvFilter;

      return matchesSearch && matchesEnv;
    });
  }, [allEvents, searchQuery, selectedEnvFilter]);

  // Compute Calendar Grid Days for (currentYear, currentMonthIndex)
  const calendarGrid = useMemo(() => {
    const days = [];
    const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    // Previous Month Fillers
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = totalDaysInPrevMonth - i;
      const prevMonth = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
      const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      days.push({
        dateNum: dayNum,
        monthType: 'prev' as const,
        dateStr,
        displayLabel: `${MONTH_NAMES[prevMonth].substring(0, 3)} ${dayNum}`,
        events: filteredEvents.filter(e => e.date === dateStr)
      });
    }

    // Current Month Days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dateNum: d,
        monthType: 'current' as const,
        dateStr,
        displayLabel: `${MONTH_NAMES[currentMonthIndex].substring(0, 3)} ${d}`,
        events: filteredEvents.filter(e => e.date === dateStr)
      });
    }

    // Next Month Fillers to complete 35 or 42 grid cells
    const totalCells = days.length > 35 ? 42 : 35;
    const remainingCells = totalCells - days.length;
    for (let n = 1; n <= remainingCells; n++) {
      const nextMonth = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
      const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;

      days.push({
        dateNum: n,
        monthType: 'next' as const,
        dateStr,
        displayLabel: `${MONTH_NAMES[nextMonth].substring(0, 3)} ${n}`,
        events: filteredEvents.filter(e => e.date === dateStr)
      });
    }

    return days;
  }, [currentYear, currentMonthIndex, filteredEvents]);

  // Selected Day Object & Events
  const selectedDayItem = useMemo(() => {
    return calendarGrid.find(cell => cell.dateStr === selectedDateStr) || {
      dateStr: selectedDateStr,
      events: filteredEvents.filter(e => e.date === selectedDateStr)
    };
  }, [calendarGrid, selectedDateStr, filteredEvents]);

  // Format Selected Date for Display
  const formattedSelectedDateDisplay = useMemo(() => {
    try {
      const [y, m, d] = selectedDateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return selectedDateStr;
    }
  }, [selectedDateStr]);

  // Handle Add Release Form
  const handleCreateRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter a valid release title.');
      return;
    }

    const createdEvt: CalendarEvent = {
      id: `EVT-${Date.now()}`,
      title: newTitle,
      shortLabel: newTitle.length > 22 ? `${newTitle.substring(0, 20)}...` : newTitle,
      badgeType: newEnv === 'PROD' ? 'blue' : newEnv === 'UAT' ? 'amber' : 'green',
      version: newVersion,
      environment: newEnv,
      date: newDate,
      timeWindow: newTime,
      owner: newOwner
    };

    setAllEvents(prev => [createdEvt, ...prev]);
    setSelectedDateStr(newDate);
    setIsNewReleaseModalOpen(false);

    // Auto set current calendar month to the month of the newly added date
    const [y, m] = newDate.split('-').map(Number);
    if (y) setCurrentYear(y);
    if (m) setCurrentMonthIndex(m - 1);

    showToast(`New Release "${newTitle}" scheduled on ${newDate}!`);
    setNewTitle('');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Top Header Banner */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden">
        <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Release Calendar
                </h1>
                {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Scheduled Release Windows, Production Deployments & Governance Schedule
                </p> */}
              </div>
            </div>

            {/* <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-sky-200 shadow-2xs text-xs font-bold text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{allEvents.length} Production Releases Mapped (2026)</span>
            </div> */}
          </div>
        </div>
      {/* </div> */}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">
        
        {/* OVERVIEW CARD */}
        {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
            Overview
          </h2>
          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              The Enterprise BI Release Calendar provides complete visibility into all planned release windows, scheduled system deployments, and environment change freezes across global regions from January through October 2026.
            </p>
          </div>
        </div> */}

        {/* MAIN VIEW: CALENDAR GRID OR TABLE VIEW */}
        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT COLUMN: MONTH VIEW CALENDAR GRID (8 COLS) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-5 shadow-xs">
              
              {/* CALENDAR HEADER & MONTH NAV */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCurrentYear(2026);
                      setCurrentMonthIndex(6); // Jul 2026
                      setSelectedDateStr('2026-07-02');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                  >
                    Today (Jul 2026)
                  </button>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight ml-1">
                    {MONTH_NAMES[currentMonthIndex]} {currentYear}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNewReleaseModalOpen(true)}
                    className="bg-[#1D70F5] hover:bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add item</span>
                  </button>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50/80 border border-blue-200/80 px-3 py-1 rounded-lg">
                    {calendarGrid.reduce((sum, day) => sum + day.events.length, 0)} Releases Scheduled
                  </span>
                </div>
              </div>

              {/* CALENDAR DAYS OF WEEK HEADERS */}
              <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>

              {/* CALENDAR 7-COLUMN MONTH GRID */}
              <div className="grid grid-cols-7 gap-2">
                {calendarGrid.map((dayItem, idx) => {
                  const isSelected = dayItem.dateStr === selectedDateStr;
                  const isPrevNext = dayItem.monthType !== 'current';
                  const hasEvents = dayItem.events && dayItem.events.length > 0;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDateStr(dayItem.dateStr)}
                      className={`min-h-[88px] sm:min-h-[102px] rounded-xl p-2 font-bold text-xs flex flex-col justify-between transition-all cursor-pointer relative ${
                        isPrevNext
                          ? 'bg-slate-50/40 text-slate-300 border border-slate-100'
                          : isSelected
                          ? 'bg-blue-50/60 border-2 border-blue-500 shadow-xs'
                          : 'bg-white hover:bg-slate-50/90 border border-slate-200/90 text-slate-800'
                      }`}
                    >
                      {/* TOP ROW OF DAY CELL */}
                      <div className="flex items-start justify-between w-full">
                        <span className={`text-xs ${
                          isPrevNext 
                            ? 'text-slate-300 font-medium' 
                            : isSelected 
                            ? 'text-blue-700 font-black' 
                            : 'text-slate-800 font-extrabold'
                        }`}>
                          {dayItem.displayLabel}
                        </span>

                        {hasEvents && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 shadow-xs animate-pulse"></span>
                        )}
                      </div>

                      {/* MIDDLE / BOTTOM: EVENT BADGES PREVIEW */}
                      {hasEvents ? (
                        <div className="space-y-1 w-full mt-1">
                          {/* Primary Event Badge */}
                          <div className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded truncate ${
                            dayItem.events[0].badgeType === 'green'
                              ? 'bg-emerald-100/90 text-emerald-800 border border-emerald-200/80'
                              : dayItem.events[0].badgeType === 'amber'
                              ? 'bg-amber-100/90 text-amber-800 border border-amber-200/80'
                              : 'bg-blue-100/90 text-blue-800 border border-blue-200/80'
                          }`}>
                            {dayItem.events[0].shortLabel}
                          </div>

                          {/* Additional Count Indicator */}
                          {dayItem.events.length > 1 && (
                            <div className="text-[9px] font-extrabold text-blue-600 text-right pr-0.5">
                              + {dayItem.events.length - 1} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="min-h-[20px]"></div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: SELECTED DAY SIDEBAR PANEL (4 COLS) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-5 shadow-xs min-h-[480px] flex flex-col justify-between">
              
              {/* SIDEBAR HEADER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {formattedSelectedDateDisplay}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">
                    {selectedDateStr}
                  </span>
                </div>

                {/* CONTENT AREA: EVENT LIST OR EMPTY STATE */}
                {selectedDayItem && selectedDayItem.events && selectedDayItem.events.length > 0 ? (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Scheduled Events ({selectedDayItem.events.length})
                    </span>

                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                      {selectedDayItem.events.map((evt) => (
                        <div
                          key={evt.id}
                          className="p-3.5 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/90 transition-all flex items-start justify-between gap-2 group"
                        >
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                            {evt.title}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                            evt.environment === 'PROD' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {evt.environment}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* EMPTY STATE */
                  <div className="py-14 px-4 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto relative flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
                      <CalendarIcon className="w-8 h-8 text-slate-300" />
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-500">
                      No release events scheduled for {formattedSelectedDateDisplay}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Use the button below to schedule a new release on this date.
                    </p>
                  </div>
                )}
              </div>

              {/* BOTTOM BUTTON: SCHEDULE RELEASE EVENT */}
              <button
                onClick={() => {
                  setNewDate(selectedDateStr);
                  setIsNewReleaseModalOpen(true);
                }}
                className="w-full py-2.5 bg-[#1D70F5] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer mt-4"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Schedule Release on {selectedDateStr}</span>
              </button>

            </div>

          </div>
        ) : (
          /* ALL LIST TABLE VIEW */
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/50 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  All Scheduled Releases ({filteredEvents.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Extracted from enterprise release roadmap documents (Jan - Oct 2026)
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                Sorted by Target Release Date
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Release Title</th>
                    <th className="py-3 px-4">Target Date</th>
                    <th className="py-3 px-4">Version</th>
                    <th className="py-3 px-4">Window</th>
                    <th className="py-3 px-4">Owner / Squad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 text-slate-700">
                  {filteredEvents.map((evt) => (
                    <tr 
                      key={evt.id}
                      onClick={() => {
                        setSelectedDateStr(evt.date);
                        setViewMode('calendar');
                      }}
                      className="hover:bg-blue-50/40 transition cursor-pointer"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {evt.title}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                        {evt.date}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {evt.version}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {evt.timeWindow}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {evt.owner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* NEW RELEASE MODAL */}
      {isNewReleaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsNewReleaseModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Schedule Release Item
              </h3>
            </div>

            <form onSubmit={handleCreateRelease} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Scheduled Date *</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Release Version Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Trends Assessment v4.12.0"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewReleaseModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
