import { useState, useMemo } from 'react';
import {
  // CheckCircle2,
  FileCheck2,
  // ShieldCheck,
  Search,
  Filter,
  X,
  AlertCircle
} from 'lucide-react';

export interface SoxAuditProcess {
  id: string;
  relevantItProcess: string;
  application: string;
  frequency: string;
  folder: string;
}

export default function Sox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('All');

  // SOX Audit Processes List matching attached image table exactly
  const [auditProcessList] = useState<SoxAuditProcess[]>([
    {
      id: 'SOX-PROC-001',
      relevantItProcess: 'Snowflake User Access Review',
      application: 'Snowflake',
      frequency: 'Semi-annual',
      folder: 'Snowflake User Access'
    },
    {
      id: 'SOX-PROC-002',
      relevantItProcess: 'Snowflake Role to Permission Review',
      application: 'Snowflake',
      frequency: 'Annual',
      folder: 'Snowflake Role to Permission'
    },
    {
      id: 'SOX-PROC-003',
      relevantItProcess: 'Snowflake / AWS Change Monitoring',
      application: 'Snowflake/AWS',
      frequency: 'Semi-Annual (FY26)',
      folder: 'Snowflake Change Monitoring / AWS Change Monitoring'
    },
    {
      id: 'SOX-PROC-004',
      relevantItProcess: 'AWS User Access Review',
      application: 'AWS',
      frequency: 'Semi-annual (FY26)',
      folder: 'AWS User Access'
    },
    {
      id: 'SOX-PROC-005',
      relevantItProcess: 'AWS Role to Permission',
      application: 'AWS',
      frequency: 'Annual',
      folder: 'AWS Role to Permission'
    },
    {
      id: 'SOX-PROC-006',
      relevantItProcess: 'Qlik User Access Review',
      application: 'Qlik',
      frequency: 'Semi-annual',
      folder: 'Qlik User Access'
    },
    {
      id: 'SOX-PROC-007',
      relevantItProcess: 'Qlik Role to Permission Review',
      application: 'Qlik',
      frequency: 'Annual',
      folder: 'Qlik Role to Permission'
    },
    {
      id: 'SOX-PROC-008',
      relevantItProcess: 'Qlik Change Management',
      application: 'Qlik',
      frequency: 'Ad hoc',
      folder: 'Qlik Change Management'
    },
    {
      id: 'SOX-PROC-009',
      relevantItProcess: 'Qlik Change Monitoring',
      application: 'Qlik',
      frequency: 'Semi-Annual (FY26)',
      folder: 'Qlik Change Monitoring'
    },
    {
      id: 'SOX-PROC-010',
      relevantItProcess: 'Reporting Stack – Common Authentication',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Annual',
      folder: 'Reporting Stack – Common Authentication'
    },
    {
      id: 'SOX-PROC-011',
      relevantItProcess: 'Reporting Stack – Common Job Monitoring – Samples test for design',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Adhoc',
      folder: 'Reporting Stack'
    },
    {
      id: 'SOX-PROC-012',
      relevantItProcess: 'Reporting Stack – Common Job Monitoring – Full listing',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Semi-Annual (FY26)',
      folder: 'Reporting Stack'
    },
    {
      id: 'SOX-PROC-013',
      relevantItProcess: 'Reporting Stack – Common Change Management – Samples',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Adhoc',
      folder: 'Reporting Stack'
    },
    {
      id: 'SOX-PROC-014',
      relevantItProcess: 'Reporting Stack – Common Change Management –Full listing',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Semi-Annual (FY26)',
      folder: 'Reporting Stack'
    },
    {
      id: 'SOX-PROC-015',
      relevantItProcess: 'SOC1 type 2 report evaluation',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Annual',
      folder: 'SOC1 type 2 report'
    },
    {
      id: 'SOX-PROC-016',
      relevantItProcess: 'Functional controls for Transaction details and PO details',
      application: 'Snowflake/AWS/Qlik',
      frequency: 'Annual',
      folder: 'Functional controls'
    }
  ]);

  const frequencies = ['All', 'Semi-annual', 'Semi-Annual (FY26)', 'Annual', 'Ad hoc', 'Adhoc'];

  const filteredProcesses = useMemo(() => {
    return auditProcessList.filter((proc) => {
      const matchesSearch =
        proc.relevantItProcess.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proc.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proc.folder.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFrequency = selectedFrequency === 'All' || proc.frequency === selectedFrequency;

      return matchesSearch && matchesFrequency;
    });
  }, [auditProcessList, searchQuery, selectedFrequency]);

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Light Blue Glassmorphism Hero Top Header */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Branding & Header */}
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-600/15 border border-blue-400/30 rounded-xl text-blue-600 shadow-inner shrink-0">
              <FileCheck2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  SOX Audit & Compliance Hub
                </h1>
                {/* <span className="bg-blue-600/10 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-300/50">
                  FY2026 ITGC
                </span> */}
              </div>
              {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                Sarbanes-Oxley IT General Controls (ITGC), Access Controls & Financial Data Audit Trail
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6">

        {/* RELEVANT IT PROCESSES TABLE CONTAINER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
          
          {/* Table Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              {/* <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>IT General Controls Audit Directory</span>
              </div> */}
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                 Audit and Schedule — Financial Software System
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search process, app, folder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Badge */}
              {/* <div className="text-xs font-semibold text-slate-500 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 text-emerald-800 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Audit Status: Active & Compliant</span>
              </div> */}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Frequency:
            </span>
            {frequencies.map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition shrink-0 cursor-pointer ${
                  selectedFrequency === freq
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 min-w-[280px]">Relevant IT Processes</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Application</th>
                  <th className="py-3.5 px-4 min-w-[140px]">Frequency</th>
                  <th className="py-3.5 px-4 min-w-[280px]">Folder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProcesses.length > 0 ? (
                  filteredProcesses.map((proc, index) => (
                    <tr
                      key={proc.id || index}
                      className="hover:bg-slate-50/80 transition"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 leading-snug">
                          {proc.relevantItProcess}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {proc.application}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200/80 inline-block">
                          {proc.frequency}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {proc.folder}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-sm text-slate-600">No IT Processes match your filters</p>
                      <p className="text-xs mt-1">Try clearing your search query or selecting "All" frequencies.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedFrequency('All');
                        }}
                        className="mt-3 text-xs font-bold text-blue-600 hover:underline"
                      >
                        Reset Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Showing {filteredProcesses.length} of {auditProcessList.length} ITGC Control Processes</span>
            <span className="font-mono">SOX Section 404 IT Compliance</span>
          </div> */}
        </div>

      </div>
    </div>
  );
}
