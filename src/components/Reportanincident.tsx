import React, { useState } from 'react';
import inc from '../assets/reportinc.png'
import {
  AlertTriangle,
  ShieldAlert,
  Database,
  Sparkles,
  Rocket,
  Wrench,
  Sliders,
  GitPullRequest,
  FileSpreadsheet,
  ArrowRightLeft,
  UserCheck,
  FileWarning,
  History,
  // PlusCircle,
  X,
  Send,
  CheckCircle2,
  // ChevronRight,
  // ArrowRight,
  Info
} from 'lucide-react';

export interface ReportedIncident {
  id: string;
  category: string;
  severity: 'P1 - Critical' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
  title: string;
  description: string;
  reporterEmail: string;
  status: 'Open' | 'Triaged' | 'In Progress' | 'Resolved';
  assignedTeam: 'Operations Team' | 'Development Team';
  reportedAt: string;
}

export const Reportanincident: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    category: 'Access Issue',
    severity: 'P3 - Medium' as ReportedIncident['severity'],
    title: '',
    description: '',
    reporterEmail: ''
  });

  // Recent submitted tickets list
  const [incidents, setIncidents] = useState<ReportedIncident[]>([
    {
      id: 'INC-88301',
      category: 'Access Issue',
      severity: 'P2 - High',
      title: 'Qlik Sense authentication failure for Finance team',
      description: 'Multiple users in finance receiving 403 Forbidden errors when attempting to access Q1 Revenue dashboard.',
      reporterEmail: 'user@company.com',
      status: 'In Progress',
      assignedTeam: 'Operations Team',
      reportedAt: 'Today, 10:15 AM'
    }
  ]);

  // Categories matching user's exact content with visual modern icons
  const categories = [
    {
      title: 'Access Issue',
      desc: 'Broken or denied access to systems/applications',
      icon: <ShieldAlert className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'Data Request',
      desc: 'Requests for data or reports',
      icon: <Database className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Enhancement',
      desc: 'Feature improvement requests',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Deployment',
      desc: 'Release or deployment-related issues',
      icon: <Rocket className="w-5 h-5 text-rose-600" />
    },
    {
      title: 'System Maintenance',
      desc: 'Routine maintenance tasks',
      icon: <Wrench className="w-5 h-5 text-slate-600" />
    },
    {
      title: 'New Requirement',
      desc: 'New feature or business requirement',
      icon: <Sliders className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Process Improvement',
      desc: 'Workflow or process optimization',
      icon: <GitPullRequest className="w-5 h-5 text-teal-600" />
    },
    {
      title: 'Source Data Issue / Source File Delay',
      desc: 'Incorrect, missing, or delayed source data',
      icon: <FileSpreadsheet className="w-5 h-5 text-orange-600" />
    },
    {
      title: 'Outbound / Inbound Issue',
      desc: 'Data flow issues between systems',
      icon: <ArrowRightLeft className="w-5 h-5 text-cyan-600" />
    },
    {
      title: 'User Access / User Access Issue',
      desc: 'Access provisioning or access problems',
      icon: <UserCheck className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Report Issue',
      desc: 'Report errors or data discrepancies',
      icon: <FileWarning className="w-5 h-5 text-red-600" />
    }
  ];

  // Exact SLA rules from user's content
  const slaRules = [
    {
      severity: 'P1 - Critical',
      definition: 'Production down, major business impact',
      sla: 'Incident Resolution Time – 8 Hours',
      badgeBg: 'bg-red-50 text-red-700 border-red-200'
    },
    {
      severity: 'P2 - High',
      definition: 'Significant functionality impacted',
      sla: 'Incident Resolution Time – 12 Hours',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      severity: 'P3 - Medium',
      definition: 'Limited business impact',
      sla: 'Incident Resolution Time – 24 Hours',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      severity: 'P4 - Low',
      definition: 'Minor issue or enhancement request',
      sla: 'Incident Resolution Time – 48 Hours',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200'
    }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenModal = (catTitle?: string) => {
    if (catTitle) {
      setFormData((prev) => ({ ...prev, category: catTitle }));
    }
    setIsReportModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.reporterEmail) {
      alert('Please fill in all required fields.');
      return;
    }

    const newIncident: ReportedIncident = {
      id: `INC-${Math.floor(80000 + Math.random() * 19000)}`,
      category: formData.category,
      severity: formData.severity,
      title: formData.title,
      description: formData.description,
      reporterEmail: formData.reporterEmail,
      status: 'Open',
      assignedTeam: formData.category.includes('Enhancement') || formData.category.includes('New Requirement')
        ? 'Development Team'
        : 'Operations Team',
      reportedAt: 'Just now'
    };

    setIncidents([newIncident, ...incidents]);
    setIsReportModalOpen(false);
    showToast(`Incident #${newIncident.id} reported successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Light Blue Glassmorphism Hero Top Header */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden"> */}
        {/* Soft Ambient Light Glows */}
        {/* <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div> */}
        {/* <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Title & Branding */}
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Report an Incident
                </h1>
                {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  IT Service Disruption Governance & Incident Response
                </p> */}
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-10 lg:p-12 space-y-10 sm:space-y-12">

          {/* Section 1: Incident Management */}
          <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100 rounded-2xl p-6 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight flex items-center gap-2">
              <Info className="w-5 h-5 text-[#1D70F5]" />
              <span>Incident Management</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-7">
              Incident management is the process organizations use to detect, respond to, and resolve unplanned IT service disruptions.
            </p>
          </div>

          {/* Section 2: Incident types/categories */}
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D70F5] tracking-tight">
                Incident types/categories
              </h3>
            </div>

            {/* Modern Clean Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 hover:border-blue-300 hover:shadow-xs transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                      {cat.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {cat.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-normal">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Incident Management Process */}
          <div className="space-y-6 pt-2">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D70F5] tracking-tight">
                Incident Management Process
              </h3>
              {/* <p className="text-xs text-slate-500 mt-0.5">End-to-end incident lifecycle and escalation workflow</p> */}
            </div>

            {/* Sleek Modern Workflow Pipeline */}
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 overflow-x-auto shadow-xs">
                <img src={inc}/>
            </div>
          </div>

          {/* Section 4: Service lease agreement (SLA) */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D70F5] tracking-tight">
                Service lease agreement (SLA)
              </h3>
              {/* <p className="text-xs text-slate-500 mt-0.5">Response and resolution target timelines by severity</p> */}
            </div>

            {/* Modern Refined SLA Table */}
            <div className="overflow-hidden border border-blue-200/90 rounded-2xl bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1D70F5] text-white">
                    <th className="py-3.5 px-5 font-bold border-r border-blue-600 w-1/4">Severity</th>
                    <th className="py-3.5 px-5 font-bold border-r border-blue-600 w-2/4">Definition</th>
                    <th className="py-3.5 px-5 font-bold w-1/4">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {slaRules.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-5 font-bold border-r border-slate-200">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${rule.badgeBg}`}>
                          {rule.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-slate-800 border-r border-slate-200">
                        {rule.definition}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-slate-700">
                        {rule.sla}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL: Report Incident Form --- */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
            <div className="bg-[#1D70F5] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h3 className="font-bold text-lg">Report an Incident</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg transition hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value as ReportedIncident['severity'] })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="P1 - Critical">P1 - Critical (8 Hours SLA)</option>
                  <option value="P2 - High">P2 - High (12 Hours SLA)</option>
                  <option value="P3 - Medium">P3 - Medium (24 Hours SLA)</option>
                  <option value="P4 - Low">P4 - Low (48 Hours SLA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Summary of issue..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe error symptoms, steps to reproduce..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Reporter Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@company.com"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DRAWER: Incident Tracking --- */}
      {isHistoryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white h-full max-w-md w-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-800 text-lg">Reported Incidents</h3>
                </div>
                <button
                  onClick={() => setIsHistoryDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-white shadow-xs space-y-2 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-600">{inc.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                        {inc.status}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">
                      {inc.title}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{inc.description}</p>

                    <div className="text-[11px] text-slate-400 pt-1 flex justify-between border-t border-slate-100">
                      <span>Assigned: {inc.assignedTeam}</span>
                      <span>{inc.reportedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsHistoryDrawerOpen(false);
                  handleOpenModal();
                }}
                className="w-full py-2.5 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition"
              >
                + Report New Incident
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Reportanincident;
