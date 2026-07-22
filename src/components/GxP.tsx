import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Lock,
  FileCheck2,
  GitPullRequest,
  Sparkles,
  Database,
  Activity,
  FileSpreadsheet
} from 'lucide-react';

export default function GxP() {
  const purposeList = [
    {
      icon: ShieldCheck,
      text: 'Supports regulated business processes and decision-making.',
      tag: 'Governance',
      colorBg: 'bg-indigo-500/10',
      colorBorder: 'border-indigo-200',
      colorText: 'text-indigo-600',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      accentGlow: 'from-indigo-500/10 to-transparent'
    },
    {
      icon: BarChart3,
      text: 'Provides trusted reporting, dashboards, and analytics.',
      tag: 'Analytics',
      colorBg: 'bg-sky-500/10',
      colorBorder: 'border-sky-200',
      colorText: 'text-sky-600',
      badgeBg: 'bg-sky-100 text-sky-800',
      accentGlow: 'from-sky-500/10 to-transparent'
    },
    {
      icon: Lock,
      text: 'Ensures data accuracy, security, and compliance.',
      tag: 'Security',
      colorBg: 'bg-amber-500/10',
      colorBorder: 'border-amber-200',
      colorText: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-800',
      accentGlow: 'from-amber-500/10 to-transparent'
    },
    {
      icon: FileCheck2,
      text: 'Maintains audit trails and controlled user access.',
      tag: 'Auditability',
      colorBg: 'bg-emerald-500/10',
      colorBorder: 'border-emerald-200',
      colorText: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      accentGlow: 'from-emerald-500/10 to-transparent'
    },
    {
      icon: GitPullRequest,
      text: 'Follows validated change management and release processes.',
      tag: 'Validation',
      colorBg: 'bg-purple-500/10',
      colorBorder: 'border-purple-200',
      colorText: 'text-purple-600',
      badgeBg: 'bg-purple-100 text-purple-800',
      accentGlow: 'from-purple-500/10 to-transparent'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Light Blue Glassmorphism Hero Top Header */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden"> */}
        {/* Soft Ambient Light Glows */}
        {/* <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Branding & Header */}
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <Award className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
                  <span>GxP</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">Validated System</span>
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  GxP Validated Environment & Regulatory Quality Compliance
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/90 px-3.5 py-2 rounded-xl text-emerald-800 text-xs font-bold shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>GxP Validated Environment</span>
            </div> */}

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 space-y-8">
        
        {/* Section 1: GxP Validated Platform Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 relative overflow-hidden transition hover:shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/70 via-indigo-50/40 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-2.5 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Regulatory Quality Framework</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight">
              GxP Validated Platform
            </h2>

            <div className="bg-gradient-to-br from-slate-50/90 via-blue-50/30 to-indigo-50/20 border border-slate-200/80 p-5 sm:p-6 rounded-2xl shadow-2xs">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                This platform operates within a GxP-validated environment, ensuring compliance with applicable regulatory and quality requirements. It is designed to securely collect, process, analyze, and report business-critical data while maintaining data integrity, traceability, and auditability.
              </p>
            </div>

            {/* Colorful Accent Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500 text-white rounded-lg shadow-2xs">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Pillar 1</div>
                  <div className="text-xs font-extrabold text-emerald-950">Data Integrity</div>
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-200/80 p-3 rounded-xl flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-lg shadow-2xs">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Pillar 2</div>
                  <div className="text-xs font-extrabold text-blue-950">Traceability</div>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl flex items-center gap-2.5">
                <div className="p-2 bg-amber-500 text-white rounded-lg shadow-2xs">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Pillar 3</div>
                  <div className="text-xs font-extrabold text-amber-950">Auditability</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Purpose & Usage Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight">
              Purpose & Usage:
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              5 Core Objectives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {purposeList.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden bg-slate-50/90 hover:bg-white border ${item.colorBorder} hover:shadow-md rounded-2xl p-5 transition duration-200 space-y-4 flex flex-col justify-between group`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accentGlow} rounded-bl-full pointer-events-none`}></div>

                  <div className="space-y-3.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 ${item.colorBg} ${item.colorText} rounded-2xl border ${item.colorBorder} shadow-2xs group-hover:scale-105 transition duration-200`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${item.badgeBg}`}>
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

