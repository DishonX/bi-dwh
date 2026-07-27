import  { useState } from 'react';
import release from '../assets/release.png'
import { 
  Rocket, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  // Layers, 
  // ShieldCheck, 
  // Inbox, 
  GitBranch, 
  Plus, 
  // Search, 
  // Filter, 
  ChevronRight, 
  ChevronLeft,
  // Server, 
  // FileText, 
  UserCheck, 
  // AlertCircle,
  // Tag,
  // ArrowUpRight,
  // ArrowRight,
  // ArrowLeft,
  // ArrowDown,
  // Code,
  // Eye,
  // MessageSquare,
  X,
  // Share2,
  // Link2,
  // FileSpreadsheet,
  // Settings2,
  // Info
} from 'lucide-react';
import DRCalendar from './DRCalendar';

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

interface CalendarEvent {
  id: string;
  title: string;
  shortLabel: string;
  badgeType: 'blue' | 'green' | 'amber';
  version: string;
  environment: 'PROD' | 'UAT' | 'QA';
  timeWindow: string;
  owner: string;
}

interface CalendarDayItem {
  dateNum: number;
  month: 'prev' | 'current' | 'next';
  displayDayName: string; // e.g. "Wed, Jul 1" or "Thu, Jul 2"
  fullDate: string;
  events?: CalendarEvent[];
  isDot?: boolean;
}

export default function ReleaseMangement() {
  const [activeTab, setActiveTab] = useState<'process' | 'calendar'>('process');
  // const [searchQuery, setSearchQuery] = useState('');
  // const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<ReleaseItem | null>(null);
  const [selectedDayName, setSelectedDayName] = useState<string>('Tue, Jul 1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calendar Day Events Mapping
  const calendarDays: CalendarDayItem[] = [
    // Prev Month Days
    { dateNum: 28, month: 'prev', displayDayName: 'Sun, Jun 28', fullDate: '2026-06-28' },
    { dateNum: 29, month: 'prev', displayDayName: 'Mon, Jun 29', fullDate: '2026-06-29' },
    { dateNum: 30, month: 'prev', displayDayName: 'Tue, Jun 30', fullDate: '2026-06-30' },

    // July 2026 Days
    { dateNum: 1, month: 'current', displayDayName: 'Wed, Jul 1', fullDate: '2026-07-01' },
    { 
      dateNum: 2, 
      month: 'current', 
      displayDayName: 'Thu, Jul 2', 
      fullDate: '2026-07-02',
      isDot: true,
      events: [
        {
          id: 'EVT-01',
          title: 'Clinical Trial Phase 3 Data Pipeline Upgrade',
          shortLabel: 'Clinical Trial Ph...',
          badgeType: 'blue',
          version: 'v4.12.0',
          environment: 'PROD',
          timeWindow: '02:00 AM - 05:00 AM EST',
          owner: 'Clinical Data Eng'
        },
        {
          id: 'EVT-02',
          title: 'EDW Patient Analytics Hotfix',
          shortLabel: 'EDW Patient Analytics',
          badgeType: 'blue',
          version: 'v4.11.4',
          environment: 'PROD',
          timeWindow: '06:00 AM - 07:00 AM EST',
          owner: 'BI Operations'
        },
        {
          id: 'EVT-03',
          title: 'Veeva CRM Field Data Sync',
          shortLabel: 'Veeva CRM Data Sync',
          badgeType: 'amber',
          version: 'v4.11.5-rc',
          environment: 'UAT',
          timeWindow: '10:00 AM - 12:00 PM EST',
          owner: 'Commercial Analytics'
        }
      ]
    },
    { dateNum: 3, month: 'current', displayDayName: 'Fri, Jul 3', fullDate: '2026-07-03' },
    { dateNum: 4, month: 'current', displayDayName: 'Sat, Jul 4', fullDate: '2026-07-04' },
    { dateNum: 5, month: 'current', displayDayName: 'Sun, Jul 5', fullDate: '2026-07-05' },
    { 
      dateNum: 6, 
      month: 'current', 
      displayDayName: 'Mon, Jul 6', 
      fullDate: '2026-07-06',
      isDot: true,
      events: [
        {
          id: 'EVT-04',
          title: 'DE/AT NPrinting Report Release',
          shortLabel: 'DE/AT NPrinting...',
          badgeType: 'green',
          version: 'v4.11.3',
          environment: 'PROD',
          timeWindow: '11:00 PM - 01:00 AM EST',
          owner: 'EMEA BI Team'
        }
      ]
    },
    { dateNum: 7, month: 'current', displayDayName: 'Tue, Jul 7', fullDate: '2026-07-07' },
    { dateNum: 8, month: 'current', displayDayName: 'Wed, Jul 8', fullDate: '2026-07-08' },
    { dateNum: 9, month: 'current', displayDayName: 'Thu, Jul 9', fullDate: '2026-07-09' },
    { dateNum: 10, month: 'current', displayDayName: 'Fri, Jul 10', fullDate: '2026-07-10' },
    { dateNum: 11, month: 'current', displayDayName: 'Sat, Jul 11', fullDate: '2026-07-11' },
    { dateNum: 12, month: 'current', displayDayName: 'Sun, Jul 12', fullDate: '2026-07-12' },
    { dateNum: 13, month: 'current', displayDayName: 'Mon, Jul 13', fullDate: '2026-07-13' },
    { dateNum: 14, month: 'current', displayDayName: 'Tue, Jul 14', fullDate: '2026-07-14' },
    { dateNum: 15, month: 'current', displayDayName: 'Wed, Jul 15', fullDate: '2026-07-15' },
    { 
      dateNum: 16, 
      month: 'current', 
      displayDayName: 'Thu, Jul 16', 
      fullDate: '2026-07-16',
      isDot: true,
      events: [
        {
          id: 'EVT-05',
          title: 'Global Supply Chain Analytics Pipeline',
          shortLabel: 'Global Supply C...',
          badgeType: 'blue',
          version: 'v4.13.0',
          environment: 'UAT',
          timeWindow: '09:00 AM - 12:00 PM EST',
          owner: 'Supply Chain SME'
        },
        {
          id: 'EVT-06',
          title: 'EMEA Financial API Patch',
          shortLabel: 'EMEA Financial API',
          badgeType: 'blue',
          version: 'v4.11.6',
          environment: 'PROD',
          timeWindow: '03:00 AM - 04:00 AM EST',
          owner: 'Finance BI'
        }
      ]
    },
    { dateNum: 17, month: 'current', displayDayName: 'Fri, Jul 17', fullDate: '2026-07-17' },
    { dateNum: 18, month: 'current', displayDayName: 'Sat, Jul 18', fullDate: '2026-07-18' },
    { dateNum: 19, month: 'current', displayDayName: 'Sun, Jul 19', fullDate: '2026-07-19' },
    { dateNum: 20, month: 'current', displayDayName: 'Mon, Jul 20', fullDate: '2026-07-20' },
    { dateNum: 21, month: 'current', displayDayName: 'Tue, Jul 21', fullDate: '2026-07-21' },
    { dateNum: 22, month: 'current', displayDayName: 'Wed, Jul 22', fullDate: '2026-07-22' },
    { dateNum: 23, month: 'current', displayDayName: 'Thu, Jul 23', fullDate: '2026-07-23' },
    { dateNum: 24, month: 'current', displayDayName: 'Fri, Jul 24', fullDate: '2026-07-24' },
    { dateNum: 25, month: 'current', displayDayName: 'Sat, Jul 25', fullDate: '2026-07-25' },
    { dateNum: 26, month: 'current', displayDayName: 'Sun, Jul 26', fullDate: '2026-07-26' },
    { dateNum: 27, month: 'current', displayDayName: 'Mon, Jul 27', fullDate: '2026-07-27' },
    { dateNum: 28, month: 'current', displayDayName: 'Tue, Jul 28', fullDate: '2026-07-28' },
    { dateNum: 29, month: 'current', displayDayName: 'Wed, Jul 29', fullDate: '2026-07-29' },
    { dateNum: 30, month: 'current', displayDayName: 'Thu, Jul 30', fullDate: '2026-07-30' },
    { dateNum: 31, month: 'current', displayDayName: 'Fri, Jul 31', fullDate: '2026-07-31' },

    // Next Month Day
    { dateNum: 1, month: 'next', displayDayName: 'Sat, Aug 1', fullDate: '2026-08-01' }
  ];

  // const selectedDayObj = calendarDays.find(d => d.displayDayName === selectedDayName) || calendarDays[3];

  // Sample Release Calendar Process List
  // const releases: ReleaseItem[] = [
  //   {
  //     id: 'REL-2026-08',
  //     version: 'v4.12.0',
  //     title: 'Q3 Enterprise BI Data Warehouse Patch & Schema Upgrade',
  //     type: 'Major Release',
  //     environment: 'PROD',
  //     scheduledDate: '2026-08-01',
  //     timeWindow: '02:00 AM - 05:00 AM EST',
  //     owner: 'BI Operations Team',
  //     status: 'Scheduled',
  //     changesCount: 12
  //   },
  //   {
  //     id: 'REL-2026-07',
  //     version: 'v4.11.3',
  //     title: 'Commercial Analytics Dashboard Performance Optimization',
  //     type: 'Minor Release',
  //     environment: 'PROD',
  //     scheduledDate: '2026-07-25',
  //     timeWindow: '11:00 PM - 01:00 AM EST',
  //     owner: 'Analytics Delivery Lead',
  //     status: 'In Progress',
  //     changesCount: 5
  //   },
  //   {
  //     id: 'REL-2026-06',
  //     version: 'v4.11.2-hotfix',
  //     title: 'Financial Reporting API Connection Emergency Patch',
  //     type: 'Emergency Fix',
  //     environment: 'PROD',
  //     scheduledDate: '2026-07-20',
  //     timeWindow: '04:00 AM - 05:00 AM EST',
  //     owner: 'Platform Engineering',
  //     status: 'Completed',
  //     changesCount: 1
  //   },
  //   {
  //     id: 'REL-2026-09',
  //     version: 'v4.13.0-rc1',
  //     title: 'Supply Chain Forecast Model UAT Validation Deployment',
  //     type: 'Major Release',
  //     environment: 'UAT',
  //     scheduledDate: '2026-08-10',
  //     timeWindow: '09:00 AM - 12:00 PM EST',
  //     owner: 'Supply Chain SME Team',
  //     status: 'Pending Approval',
  //     changesCount: 8
  //   }
  // ];

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Top Header */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden">
        <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div> */}

        <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <Rocket className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Release Management
                </h1>
                  {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                    Controlled Release Governance & Enterprise Deployments
                  </p> */}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">
        
        {/* OVERVIEW CARD */}
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
            <CalendarIcon className="w-4 h-4" />
            <span>Release Calendar</span>
          </button>
        </div>

        {/* TAB 1: RELEASE PROCESS FLOWCHART */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
                  Release Process
                </h2>
                {/* <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  End-to-End Enterprise Deployment & Governance Workflow
                </p> */}
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                8 Sequential Lifecycle Stages
              </span>
            </div>

              <img src={release}/>

          </div>
        )}

        {/* TAB 2: RELEASE CALENDAR (EXACT ATTACHED SCREENSHOT DESIGN) */}
        {activeTab === 'calendar' && (
          <div className="space-y-5">
            {/* TOP TOOLBAR CARD */}
   
            <DRCalendar/>

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
                  showToast('New release scheduled successfully!');
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
