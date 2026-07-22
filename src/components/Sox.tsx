import React, { useState } from 'react';
import {
  CheckCircle2,
  FileCheck2,
  Folder,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface SoxAuditProcess {
  id: string;
  relevantItProcess: string;
  application: string;
  frequency: string;
  folder: string;
}

export default function Sox() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // SOX Audit Processes List
  const auditProcessList: SoxAuditProcess[] = [
    {
      id: 'SOX-PROC-001',
      relevantItProcess: 'User Access Provisioning & RBAC Authorization',
      application: 'Snowflake DWH & Qlik Cloud',
      frequency: 'Continuous',
      folder: 'SOX-2026/Access_Control/Provisioning_Tickets'
    },
    {
      id: 'SOX-PROC-002',
      relevantItProcess: 'Quarterly User Access Recertification (UAR)',
      application: 'Snowflake, Qlik Cloud, Veeva Nitro',
      frequency: 'Quarterly',
      folder: 'SOX-2026/Access_Control/Quarterly_UAR_Signoffs'
    },
    {
      id: 'SOX-PROC-003',
      relevantItProcess: 'Change Advisory Board (CAB) Deployment & Peer Review',
      application: 'BI/DWH Production Pipeline & GitHub CI/CD',
      frequency: 'Continuous',
      folder: 'SOX-2026/Change_Management/CAB_Approval_Logs'
    },
    {
      id: 'SOX-PROC-004',
      relevantItProcess: 'Developer & Deployer Segregation of Duties (SoD)',
      application: 'GitHub & AWS/Cloud Run CI/CD',
      frequency: 'Continuous',
      folder: 'SOX-2026/Segregation_of_Duties/SoD_Audit_Logs'
    },
    {
      id: 'SOX-PROC-005',
      relevantItProcess: 'Automated ETL Job Batch Execution & SLA Monitoring',
      application: 'Talend, Veeva Nitro, Snowflake',
      frequency: 'Daily Batch',
      folder: 'SOX-2026/Operations/ETL_Batch_SLA_Reports'
    },
    {
      id: 'SOX-PROC-006',
      relevantItProcess: 'Financial Data Lineage & GL Reconciliation Check',
      application: 'Commercial & Finance Data Marts',
      frequency: 'Quarterly',
      folder: 'SOX-2026/Data_Integrity/GL_Reconciliations'
    },
    {
      id: 'SOX-PROC-007',
      relevantItProcess: 'Database Backup, Disaster Recovery & Failover Testing',
      application: 'Snowflake & AWS Cloud Storage',
      frequency: 'Annual / Semi-Annually',
      folder: 'SOX-2026/Disaster_Recovery/DR_Restoration_Proof'
    },
    {
      id: 'SOX-PROC-008',
      relevantItProcess: 'Privileged Admin Session Monitoring & MFA Audit',
      application: 'Okta SSO & Active Directory',
      frequency: 'Monthly',
      folder: 'SOX-2026/Access_Control/MFA_Privileged_Logs'
    }
  ];

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
        {/* <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Branding & Header */}
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-blue-600/15 border border-blue-400/30 rounded-xl text-blue-600 shadow-inner">
                <FileCheck2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  SOX Audit & Compliance Hub
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Sarbanes-Oxley IT General Controls (ITGC), Access Controls & Financial Data Audit Trail
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">

        {/* RELEVANT IT PROCESSES TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>IT General Controls Audit Directory</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                SOX Audit IT Processes
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-xs font-semibold text-slate-500 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Audit Status: Active & Compliant</span>
              </div>
            </div>
          </div>

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
                {auditProcessList.map((proc) => (
                  <tr key={proc.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-medium">
                      <div className="font-bold text-slate-900 leading-snug">{proc.relevantItProcess}</div>
                      <div className="text-slate-400 text-[10px] font-mono mt-0.5">{proc.id}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {proc.application}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200/80 inline-block">
                        {proc.frequency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => triggerToast(`Opening evidence folder: ${proc.folder}`)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-mono text-[11px] font-bold hover:underline cursor-pointer bg-slate-50 hover:bg-blue-50/80 px-2.5 py-1 rounded-lg border border-slate-200/80 transition"
                      >
                        <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{proc.folder}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 ml-auto text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}


