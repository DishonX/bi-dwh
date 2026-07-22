import  { useState } from 'react';
import { 
  Rocket, 
  Calendar, 
  // CheckCircle2, 
  Clock, 
  // Layers, 
  // ShieldCheck, 
  // Inbox, 
  GitBranch, 
  // PlusCircle, 
  Search, 
  // Filter, 
  ChevronRight, 
  // Server, 
  // FileText, 
  UserCheck, 
  // AlertCircle,
  Tag,
  // ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  // Code,
  // Eye,
  // MessageSquare,
  X
} from 'lucide-react';

interface ReleaseItem {
  id: string;
  version: string;
  title: string;
  type: 'Major Release' | 'Minor Release' | 'Patch' | 'Emergency Fix';
  environment: 'PROD' | 'UAT' | 'QA';
  scheduledDate: string;
  timeWindow: string;
  owner: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Pending Approval';
  changesCount: number;
}

export default function ReleaseMangement() {
  const [activeTab, setActiveTab] = useState<'process' | 'calendar'>('process');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<ReleaseItem | null>(null);

  // Sample Release Calendar Data
  const releases: ReleaseItem[] = [
    {
      id: 'REL-2026-08',
      version: 'v4.12.0',
      title: 'Q3 Enterprise BI Data Warehouse Patch & Schema Upgrade',
      type: 'Major Release',
      environment: 'PROD',
      scheduledDate: '2026-08-01',
      timeWindow: '02:00 AM - 05:00 AM EST',
      owner: 'BI Operations Team',
      status: 'Scheduled',
      changesCount: 12
    },
    {
      id: 'REL-2026-07',
      version: 'v4.11.3',
      title: 'Commercial Analytics Dashboard Performance Optimization',
      type: 'Minor Release',
      environment: 'PROD',
      scheduledDate: '2026-07-25',
      timeWindow: '11:00 PM - 01:00 AM EST',
      owner: 'Analytics Delivery Lead',
      status: 'In Progress',
      changesCount: 5
    },
    {
      id: 'REL-2026-06',
      version: 'v4.11.2-hotfix',
      title: 'Financial Reporting API Connection Emergency Patch',
      type: 'Emergency Fix',
      environment: 'PROD',
      scheduledDate: '2026-07-20',
      timeWindow: '04:00 AM - 05:00 AM EST',
      owner: 'Platform Engineering',
      status: 'Completed',
      changesCount: 1
    },
    {
      id: 'REL-2026-09',
      version: 'v4.13.0-rc1',
      title: 'Supply Chain Forecast Model UAT Validation Deployment',
      type: 'Major Release',
      environment: 'UAT',
      scheduledDate: '2026-08-10',
      timeWindow: '09:00 AM - 12:00 PM EST',
      owner: 'Supply Chain SME Team',
      status: 'Pending Approval',
      changesCount: 8
    }
  ];

  const filteredReleases = releases.filter((rel) => {
    const matchesSearch = rel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rel.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rel.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || rel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <Rocket className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Release Management
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Controlled Release Governance & Enterprise Deployments
                </p>
              </div>
            </div>

          </div>
        </div>
      {/* </div> */}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">
        
        {/* OVERVIEW CARD (MATCHING ATTACHED IMAGE EXACTLY) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
            Overview
          </h2>
          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              The Insmed Enterprise BI Operations team operates under a robust and structured Release Management Framework designed to ensure that every deployment into production is controlled, traceable, and of the highest quality.
            </p>
            <p>
              This framework is a critical pillar of the team's broader BI DWH Operations Management model, which spans across Daily Monitoring, Incident Management, Change Management, Platform Administration, and Audit & Assurance.
            </p>
          </div>
        </div>

        {/* MODERN SEGMENTED TAB BUTTONS */}
        <div className="inline-flex p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/70 shadow-inner gap-1">
          <button
            onClick={() => setActiveTab('process')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'process'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Release Process</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-[#1D70F5] text-white shadow-md shadow-blue-500/30 ring-1 ring-white/20 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Release Calendar</span>
          </button>
        </div>

        {/* TAB 1: RELEASE PROCESS FLOWCHART (EXACT ATTACHED IMAGE FLOW) */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
                  Release Process
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  End-to-End Enterprise Deployment & Governance Workflow
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                8 Sequential Lifecycle Stages
              </span>
            </div>

            {/* FLOWCHART VIEW (DESKTOP & TABLET 2-ROW CONNECTED SERPENTINE DIAGRAM) */}
            <div className="hidden lg:block space-y-8 py-2">
              {/* ROW 1: STEPS 1 TO 4 (LEFT TO RIGHT FLOW ->) */}
              <div className="grid grid-cols-4 gap-4 relative">
                
                {/* STEP 1 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[140px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 01</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">SIT</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Development Team</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[140px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 02</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">UAT Deployment</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Admin</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[140px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 03</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">UAT Review</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">User</span>
                  </div>
                  <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[140px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 04</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">UAT Signoff</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">User</span>
                  </div>
                </div>

              </div>

              {/* VERTICAL CONNECTOR ARROW (FROM STEP 4 TO STEP 5) */}
              <div className="flex justify-end pr-[11%] -my-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-200 shadow-xs">
                  <ArrowDown className="w-5 h-5" />
                </div>
              </div>

              {/* ROW 2: STEPS 8 <- 7 <- 6 <- 5 (RIGHT TO LEFT FLOW <- AS IN ATTACHED IMAGE) */}
              <div className="grid grid-cols-4 gap-4 relative">
                
                {/* STEP 8 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[160px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Step 08</span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mt-1">
                        Communicate to User, Sign off, Close the Ticket & Update ServiceNow
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Operations Team</span>
                  </div>
                </div>

                {/* STEP 7 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[160px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 07</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">Smoke Testing</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Operations Team</span>
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>

                {/* STEP 6 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[160px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 06</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">Prod Deployment</h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Admin</span>
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="relative">
                  <div className="h-full bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center group min-h-[160px]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step 05</span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mt-1">
                        Prepare PROD Deployment Document and get a review from team member
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-[#1D70F5] mt-3">Operations Team</span>
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 shadow-xs">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>

            {/* MOBILE & TABLET RESPONSIVE CARDS VIEW */}
            <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { step: '01', title: 'SIT', team: 'Development Team' },
                { step: '02', title: 'UAT Deployment', team: 'Admin' },
                { step: '03', title: 'UAT Review', team: 'User' },
                { step: '04', title: 'UAT Signoff', team: 'User' },
                { step: '05', title: 'Prepare PROD Deployment Document and get a review from team member', team: 'Operations Team' },
                { step: '06', title: 'Prod Deployment', team: 'Admin' },
                { step: '07', title: 'Smoke Testing', team: 'Operations Team' },
                { step: '08', title: 'Communicate to User, Sign off, Close the Ticket & Update ServiceNow', team: 'Operations Team' }
              ].map((item) => (
                <div key={item.step} className="bg-white border-2 border-blue-500/80 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      Step {item.step}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-[#1D70F5]">
                      {item.team}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: RELEASE CALENDAR SCHEDULE */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
                  Release Calendar & Deployments
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Scheduled release windows, versions, and deployment statuses across environments
                </p>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search version, title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Approval">Pending Approval</option>
                </select>
              </div>
            </div>

            {/* Release Items Table / Cards */}
            <div className="space-y-4">
              {filteredReleases.length === 0 ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-sm">No release records found matching filters.</p>
                </div>
              ) : (
                filteredReleases.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedRelease(rel)}
                    className="p-5 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {rel.id}
                        </span>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                          {rel.version}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          rel.environment === 'PROD' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rel.environment}
                        </span>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          rel.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          rel.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          rel.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {rel.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1D70F5] transition-colors">
                        {rel.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          {rel.scheduledDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {rel.timeWindow}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          {rel.owner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {rel.changesCount} Included Changes
                        </span>
                      </div>
                    </div>

                    <div className="self-end md:self-center shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1D70F5] group-hover:translate-x-0.5 transition-transform">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* DETAIL MODAL */}
      {selectedRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedRelease(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedRelease.id}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {selectedRelease.version}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedRelease.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block font-medium">Type</span>
                <span className="font-semibold text-slate-800">{selectedRelease.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Environment</span>
                <span className="font-semibold text-slate-800">{selectedRelease.environment}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Scheduled Date</span>
                <span className="font-semibold text-slate-800">{selectedRelease.scheduledDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Time Window</span>
                <span className="font-semibold text-slate-800">{selectedRelease.timeWindow}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Owner Team</span>
                <span className="font-semibold text-slate-800">{selectedRelease.owner}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Status</span>
                <span className="font-semibold text-emerald-600">{selectedRelease.status}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRelease(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW RELEASE MODAL */}
      {isNewReleaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsNewReleaseModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              Schedule New Production Release
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Release Version Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Commercial BI Data Refresh Patch"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Version Number</label>
                  <input
                    type="text"
                    placeholder="e.g. v4.13.0"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Environment</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500">
                    <option value="PROD">PROD</option>
                    <option value="UAT">UAT</option>
                    <option value="QA">QA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Time Window</label>
                  <input
                    type="text"
                    placeholder="02:00 AM - 04:00 AM EST"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsNewReleaseModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsNewReleaseModalOpen(false);
                  setActiveTab('calendar');
                }}
                className="px-4 py-2 bg-[#1D70F5] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm"
              >
                Confirm & Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
