import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  // FileText,
  Layers,
  ShieldCheck,
  // Zap,
  Server,
  Kanban,
  FileCheck,
  Headphones,
  Users,
  AlertTriangle,
  Puzzle,
  // ChevronRight,
  // ChevronLeft,
  // Clock,
  Send,
  // PlusCircle,
  X,
  // Play,
  // Pause,
  Inbox,
  // HelpCircle,
  // Layout,
  // Code,
  Rocket,
  // Eye,
  // UserCheck,
  // BookOpen,
  // Activity,
  // MessageSquare,
  // RefreshCw,
  // FileSpreadsheet,
  // Compass,
  // CheckSquare,
  // BarChart3,
  Sliders
} from 'lucide-react';

export const ChangeMnagement: React.FC = () => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for new change request
  const [formData, setFormData] = useState({
    source: 'ServiceNow',
    title: '',
    description: '',
    impact: 'Medium',
    urgency: 'Medium',
    requesterEmail: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.requesterEmail) {
      alert('Please fill in all required fields.');
      return;
    }
    const crId = `CR-${Math.floor(10000 + Math.random() * 90000)}`;
    setIsSubmitModalOpen(false);
    showToast(`Change Request #${crId} submitted successfully!`);
  };

  // Change Request Sources (Icon / Logo + Title only, no description)
  const requestSources = [
    {
      title: 'ServiceNow',
      icon: <Server className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-[#EEF4FF] text-blue-600 border-blue-200'
    },
    {
      title: 'Jira',
      icon: <Kanban className="w-6 h-6 text-indigo-600" />,
      iconBg: 'bg-[#F0EEFF] text-indigo-600 border-indigo-200'
    },
    {
      title: 'Confluence',
      icon: <FileCheck className="w-6 h-6 text-cyan-600" />,
      iconBg: 'bg-[#EBFBFF] text-cyan-600 border-cyan-200'
    },
    {
      title: 'Tech Support',
      icon: <Headphones className="w-6 h-6 text-slate-700" />,
      iconBg: 'bg-[#F1F5F9] text-slate-700 border-slate-300'
    },
    {
      title: 'Business Stakeholders / SMEs',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-[#F8F0FF] text-purple-600 border-purple-200'
    },
    {
      title: 'Production Incidents',
      icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
      iconBg: 'bg-[#FFF0F2] text-rose-600 border-rose-200'
    },
    {
      title: 'Vendor or System Enhancements',
      icon: <Puzzle className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-[#FFF8EB] text-amber-600 border-amber-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
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
                <GitPullRequest className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Change Management
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Controlled Release Governance & Enterprise Change Control
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-10 lg:p-12 space-y-12">

          {/* SECTION 2: CHANGE REQUEST SOURCES (INFINITE AUTO MARQUEE SLIDER) */}
          <div className="space-y-4 pt-2">
            <style>{`
              @keyframes sources-marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-sources-marquee {
                display: flex;
                width: max-content;
                animation: sources-marquee 25s linear infinite;
              }
              .animate-sources-marquee:hover {
                animation-play-state: paused;
              }
            `}</style>

            {/* Slider Header - Clean Title */}
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D70F5] tracking-tight">
                Change Request Sources
              </h3>
            </div>

            {/* Infinite Continuous Moving Cards Container (No Scrollbar) */}
            <div className="relative overflow-hidden w-full py-2">
              {/* Fade masks at edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="animate-sources-marquee flex items-center gap-4">
                {[...requestSources, ...requestSources].map((src, idx) => (
                  <div
                    key={idx}
                    className="min-w-[210px] sm:min-w-[240px] max-w-[260px] p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition-all duration-300 shrink-0 flex flex-col items-start gap-3.5 group"
                  >
                    {/* Icon / Logo */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${src.iconBg} shadow-2xs group-hover:scale-105 transition-transform`}>
                      {src.icon}
                    </div>

                    {/* Heading Title directly under icon */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                        {src.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SECTION 3: GOVERNANCE & LIFECYCLE PROCESS (DESIGNED CARDS WITH EXACT CONTENT) */}
          <div className="space-y-6 pt-6 border-t border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#1D70F5]" />
                <span>Governance & Lifecycle Workflow</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                4 End-to-End Stages
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Change Intake & Assessment */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-blue-400/80 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50/80 border border-blue-100 px-2.5 py-0.5 rounded-md">
                      Stage 01
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1D70F5] tracking-tight mb-2">
                  Change Intake & Assessment
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  All incoming requests are reviewed to understand the business need, scope, impact, risk, dependencies, and estimated effort. During intake, requests are validated, categorized, and prepared for prioritization.
                </p>
              </div>

              {/* 2. Prioritization & Governance */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-indigo-400/80 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50/80 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                      Stage 02
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1D70F5] tracking-tight mb-2">
                  Prioritization & Governance
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Changes are prioritized based on business impact, urgency, risk, compliance requirements, and resource availability. Requests are reviewed during governance discussions with Business SMEs, Project Management, Technical Leads, and QA before implementation is approved.
                </p>
              </div>

              {/* 3. Implementation & Tracking */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-amber-400/80 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50/80 border border-amber-100 px-2.5 py-0.5 rounded-md">
                      Stage 03
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1D70F5] tracking-tight mb-2">
                  Implementation & Tracking
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Approved changes are planned, assigned, developed, tested, and validated following the enterprise SDLC. Progress is tracked using ServiceNow for change records, Jira for implementation activities, and Confluence for supporting documentation and knowledge sharing.
                </p>
              </div>

              {/* 4. Release & Closure */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-emerald-400/80 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50/80 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                      Stage 04
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1D70F5] tracking-tight mb-2">
                  Release & Closure
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Following successful testing and ServiceNow approvals, changes are deployed according to the approved release schedule. After deployment, production validation, documentation updates, knowledge transfer, and formal change closure are completed to ensure end-to-end traceability.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL: Submit Change Request --- */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="bg-[#1D70F5] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-white" />
                <h3 className="font-bold text-lg">Submit Change Request</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg transition hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Change Request Source
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="ServiceNow">ServiceNow</option>
                  <option value="Jira">Jira</option>
                  <option value="Confluence">Confluence</option>
                  <option value="Tech Support">Tech Support</option>
                  <option value="Business Stakeholders / SMEs">Business Stakeholders / SMEs</option>
                  <option value="Production Incidents">Production Incidents</option>
                  <option value="Vendor or System Enhancements">Vendor or System Enhancements</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Impact
                  </label>
                  <select
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="High">High Impact</option>
                    <option value="Medium">Medium Impact</option>
                    <option value="Low">Low Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="High">High Urgency</option>
                    <option value="Medium">Medium Urgency</option>
                    <option value="Low">Low Urgency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Change Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Qlik Sense Finance Dashboard Enhancement"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description & Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Business requirement details, systems affected, dependencies..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Requester Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@company.com"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ChangeMnagement;
