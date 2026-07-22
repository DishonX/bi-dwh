import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  ChevronRight,
  Mail,
  Copy,
  Check,
  BarChart3,
  Database,
  ArrowUpRight,
  Headphones,
  CheckCircle2,
  Cloud,
  Code2,
  Zap,
  Printer,
  AppWindow,
  Snowflake,
  Workflow,
  RefreshCw,
  Brain,
  Users,
  Network,
  Clock,
  ShieldAlert,
  GitPullRequest,
  BookOpen,
  Server,
  Sparkles,
  Activity,
  Stethoscope,
  LayoutDashboard,
  Rocket,
  History
} from 'lucide-react';

interface BiDwhOperationsProps {
  onNavigate?: (page: 'inventory' | 'release' | 'change' | 'incident' | 'access' | 'operations') => void;
}

export default function Home({ onNavigate }: BiDwhOperationsProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // What We Do capabilities with modern icon logos
  const capabilities = [
    { name: 'Operations & Support', icon: Headphones, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: '24×5 Monitoring', icon: Clock, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { name: 'Incident Management', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { name: 'Problem Management', icon: Zap, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { name: 'Change Management', icon: GitPullRequest, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'Service Request Management', icon: CheckCircle2, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { name: 'Knowledge Management', icon: BookOpen, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { name: 'System Administration', icon: Server, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { name: 'Minor Enhancements', icon: Sparkles, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { name: 'Automation & Optimization', icon: Workflow, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Modern Deep Indigo Navy Glassmorphism Hero Top Header */}
    

      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden"> */}
        {/* Soft Ambient Light Glows */}
        {/* <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div> */}
        {/* <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Branding & Header */}
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-blue-600/15 border border-blue-400/30 rounded-xl text-blue-700 shadow-inner">
                    <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D70F5] tracking-tight">
                  BI DWH Operations
                </h1>
                <p className="text-blue-900/80 text-xs sm:text-sm mt-1 font-medium">
                  Insmed's Dedicated Technology & Data Platform Hub
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}


      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">

        {/* Section 1 & Section 2: What Areas We Serve + Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: What areas we serve (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-[#1D70F5] font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Service Ecosystem</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                What areas we serve
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Insmed's technology ecosystem is managed by the BI DWH Operations team, overseeing two core service towers — <strong className="text-[#1D70F5]">Business Intelligence (BI)</strong> and <strong className="text-indigo-600">Data Platform</strong> — built to drive data excellence and business agility.
            </p>

            {/* Two Service Towers Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Business Intelligence Tower */}
              <div className="bg-gradient-to-br from-blue-50/70 via-slate-50 to-sky-50/50 rounded-2xl border border-blue-200/80 p-5 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2.5 pb-2 border-b border-blue-200/60">
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Business Intelligence
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-slate-700 font-medium">
                  
                  {/* Qlik Cloud */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-sky-50 border border-sky-200 text-sky-600 rounded-lg group-hover:bg-sky-600 group-hover:text-white transition">
                      <Cloud className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Qlik Cloud</span>
                  </div>

                  {/* Qlik Sense */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Qlik Sense (Qlik Saas, Managed)</span>
                  </div>

                  {/* Mashup */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-cyan-50 border border-cyan-200 text-cyan-600 rounded-lg group-hover:bg-cyan-600 group-hover:text-white transition">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Mashup</span>
                  </div>

                  {/* Automation */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-amber-50 border border-amber-200 text-amber-600 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">Automation</span>
                  </div>

                  {/* NPrinting */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition">
                      <Printer className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">NPrinting</span>
                  </div>

                  {/* PowerApps */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs hover:border-blue-300 transition group">
                    <div className="p-2 bg-purple-50 border border-purple-200 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
                      <AppWindow className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">PowerApps</span>
                  </div>

                </div>
              </div>

              {/* Data Platform Tower */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-blue-50/50 rounded-2xl border border-indigo-200/80 p-5 space-y-4 shadow-2xs">
                <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-200/60">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Data Platform
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  
                  {/* Commercial Data Warehouse */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-indigo-900">
                      Commercial Data Warehouse
                    </div>
                    <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-lg p-2">
                      <div className="p-1.5 bg-sky-100 text-sky-700 rounded-md">
                        <Snowflake className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-slate-800 text-xs">Snowflake</span>
                    </div>
                  </div>

                  {/* ETL */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-indigo-900">
                      ETL
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-lg p-2">
                        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md">
                          <Workflow className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-800 text-xs">Veeva Nitro</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-lg p-2">
                        <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-md">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-800 text-xs">Talend</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-lg p-2">
                        <div className="p-1.5 bg-amber-100 text-amber-700 rounded-md">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-800 text-xs">AWS Glue</span>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Analytics */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs space-y-2">
                    <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-indigo-900">
                      Advanced Analytics
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-lg p-1.5 justify-center">
                        <Brain className="w-3.5 h-3.5 text-violet-600" />
                        <span className="font-bold text-slate-800 text-[11px]">Cortex</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-lg p-1.5 justify-center">
                        <Users className="w-3.5 h-3.5 text-pink-600" />
                        <span className="font-bold text-slate-800 text-[11px]">Cowork</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-lg p-1.5 justify-center">
                        <Cpu className="w-3.5 h-3.5 text-purple-600" />
                        <span className="font-bold text-slate-800 text-[11px]">CoCo</span>
                      </div>
                    </div>
                  </div>

                  {/* Veeva Network */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-2xs flex items-center gap-2.5">
                    <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-md">
                      <Network className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-slate-900 text-xs">Veeva Network</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Quick Links (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <div className="p-2 bg-blue-50 text-[#1D70F5] rounded-xl border border-blue-200/80">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Quick Links</h3>
                <p className="text-slate-500 text-xs">Navigation Shortcuts</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate?.('inventory')}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition group cursor-pointer border border-blue-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-left">Inventory of Dashboards and Data Assets</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate?.('release')}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition group cursor-pointer border border-teal-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span>Upcoming Releases</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate?.('release')}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 hover:from-purple-700 hover:to-violet-800 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition group cursor-pointer border border-purple-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                    <History className="w-4 h-4" />
                  </div>
                  <span>Previous Releases</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Operations SLA & Live Pipeline Status Card */}
            {/* <div className="pt-2 border-t border-slate-100">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-bold text-xs text-white">Ops Status & SLAs</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    99.98% SLA
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  24×5 proactive system health monitoring & SLA response triage for Qlik Cloud and Snowflake pipelines.
                </p>
              </div>
            </div> */}
          </div>

        </div>

        {/* Section 3: What we do (Icon Logos) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-[#1D70F5] font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Capabilities</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              What we do
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            BI DWH Operations team is Insmed's dedicated technology team, delivering comprehensive BI DWH Operations across two core Service Towers — <strong className="text-[#1D70F5]">Business Intelligence (BI)</strong> and <strong className="text-indigo-600">Data Platform</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {capabilities.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-3 bg-slate-50/90 border border-slate-200/80 rounded-xl p-3.5 hover:bg-white hover:border-blue-300 hover:shadow-xs transition group"
                >
                  <div className={`p-2 rounded-lg border ${item.color} group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-slate-800 group-hover:text-[#1D70F5] transition">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: How can you reach us */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-[#1D70F5] font-bold text-xs uppercase tracking-wider">
              <Headphones className="w-4 h-4" />
              <span>Contact & Escalation</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              How can you reach us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
            
            {/* Tech / Common Support */}
            <div className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-sky-50/50 border border-blue-200/80 rounded-2xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-600 text-white rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                    Tech / Common Support
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mt-3">Qlik Support</h3>
                <p className="text-xs text-slate-600 mt-1">
                  For tech / any common support
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href="mailto:qliksupport@insmed.com"
                  className="text-xs font-mono font-bold text-[#1D70F5] hover:underline"
                >
                  qliksupport@insmed.com
                </a>
                <button
                  onClick={() => handleCopyEmail('qliksupport@insmed.com')}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === 'qliksupport@insmed.com' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Clinical-related issues */}
            <div className="bg-gradient-to-br from-indigo-50/80 via-slate-50 to-blue-50/50 border border-indigo-200/80 rounded-2xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100/80 px-2.5 py-0.5 rounded-full">
                    Clinical Support
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mt-3">Clinical Operations</h3>
                <p className="text-xs text-slate-600 mt-1">
                  For clinical-related issues
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href="mailto:clinicalsupport@insmed.com"
                  className="text-xs font-mono font-bold text-indigo-600 hover:underline"
                >
                  clinicalsupport@insmed.com
                </a>
                <button
                  onClick={() => handleCopyEmail('clinicalsupport@insmed.com')}
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === 'clinicalsupport@insmed.com' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Field Sales Support */}
            <div className="bg-gradient-to-br from-sky-50/80 via-slate-50 to-indigo-50/50 border border-sky-200/80 rounded-2xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sky-600 text-white rounded-lg">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-sky-100/80 px-2.5 py-0.5 rounded-full">
                    Dedicated Field Sales
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mt-3">Dashboard Support</h3>
                <p className="text-xs text-slate-600 mt-1">
                  For dedicated field sales support
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href="mailto:dashboardsupport@insmed.com"
                  className="text-xs font-mono font-bold text-sky-700 hover:underline"
                >
                  dashboardsupport@insmed.com
                </a>
                <button
                  onClick={() => handleCopyEmail('dashboardsupport@insmed.com')}
                  className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-white rounded-lg transition cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail === 'dashboardsupport@insmed.com' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
