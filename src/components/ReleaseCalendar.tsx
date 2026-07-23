import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  UserCheck, 
  X,
  Share2,
  Link2,
  FileSpreadsheet,
  Settings2,
  Info
} from 'lucide-react';

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

export default function ReleaseCalendar() {
  const [selectedDayName, setSelectedDayName] = useState<string>('Tue, Jul 1');
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
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

  const selectedDayObj = calendarDays.find(d => d.displayDayName === selectedDayName) || calendarDays[3];

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

        <div className="max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <CalendarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Release Calendar
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Scheduled Release Windows, Production Deployments & Governance Schedule
                </p>
              </div>
            </div>
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
              The Enterprise BI Release Calendar provides visibility into all planned release windows, scheduled system deployments, and environment change freezes across global regions.
            </p>
          </div>
        </div> */}

        {/* RELEASE CALENDAR MAIN COMPONENT */}
        <div className="space-y-5">
          {/* TOP TOOLBAR CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsNewReleaseModalOpen(true)}
                className="bg-[#1D70F5] hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add new item</span>
              </button>

              <button
                onClick={() => showToast('Share link generated and copied to clipboard!')}
                className="bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share</span>
              </button>

              <button
                onClick={() => showToast('Calendar deep link copied to clipboard!')}
                className="bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Link2 className="w-4 h-4 text-slate-500" />
                <span>Copy link</span>
              </button>

              <button
                onClick={() => showToast('Exporting July 2026 Release Schedule to Excel...')}
                className="bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                <span>Export to Excel</span>
              </button>

              <button
                onClick={() => showToast('Automated release notification workflows configured.')}
                className="bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Settings2 className="w-4 h-4 text-slate-500" />
                <span>Workflows</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 pr-1">
              <span>Release calendar 2026</span>
              <Info className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition" />
            </div>
          </div>

          {/* MAIN TWO-COLUMN LAYOUT: CALENDAR GRID & DAY DETAILS SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT COLUMN: MONTH VIEW CALENDAR GRID (8 COLS) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-5 shadow-xs">
              
              {/* CALENDAR HEADER & MONTH NAV */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedDayName('Wed, Jul 1')}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                  >
                    Today
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight ml-1">
                    July 2026
                  </h2>
                </div>

                <span className="text-[11px] font-bold text-blue-600 bg-blue-50/80 border border-blue-200/80 px-3 py-1 rounded-md">
                  Active Calendar Month
                </span>
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
                {calendarDays.map((dayItem, idx) => {
                  const isSelected = dayItem.displayDayName === selectedDayName;
                  const isPrevNext = dayItem.month !== 'current';
                  const hasEvents = dayItem.events && dayItem.events.length > 0;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDayName(dayItem.displayDayName)}
                      className={`min-h-[82px] sm:min-h-[96px] rounded-xl p-2 font-bold text-xs flex flex-col justify-between transition-all cursor-pointer relative ${
                        isPrevNext
                          ? 'bg-slate-50/50 text-slate-300 border border-slate-100'
                          : isSelected
                          ? 'bg-blue-50/40 border-2 border-blue-500 shadow-2xs'
                          : 'bg-white hover:bg-slate-50/80 border border-slate-200/90 text-slate-800'
                      }`}
                    >
                      {/* TOP ROW OF DAY CELL: Date number & optional event indicator dot */}
                      <div className="flex items-start justify-between w-full">
                        <span className={`text-xs ${isPrevNext ? 'text-slate-300' : isSelected ? 'text-blue-700 font-extrabold' : 'text-slate-800'}`}>
                          {dayItem.month === 'prev' && idx === 0 ? `Jun ${dayItem.dateNum}` : dayItem.month === 'next' ? `Aug ${dayItem.dateNum}` : dayItem.month === 'current' && dayItem.dateNum === 1 ? `Jul 1` : dayItem.dateNum}
                        </span>

                        {dayItem.isDot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                        )}
                      </div>

                      {/* MIDDLE / BOTTOM: EVENT BADGES PREVIEW */}
                      {hasEvents && dayItem.events && (
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
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: SELECTED DAY SIDEBAR PANEL (4 COLS) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-6 shadow-xs min-h-[460px] flex flex-col justify-between">
              
              {/* SIDEBAR HEADER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {selectedDayName}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedDayName('Wed, Jul 1')}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* CONTENT AREA: EVENT LIST OR EMPTY STATE */}
                {selectedDayObj && selectedDayObj.events && selectedDayObj.events.length > 0 ? (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Scheduled Events ({selectedDayObj.events.length})
                    </span>

                    {selectedDayObj.events.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-3.5 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-200 transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded">
                            {evt.version}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            evt.environment === 'PROD' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {evt.environment}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                          {evt.title}
                        </h4>

                        <div className="space-y-1 text-[11px] text-slate-500 pt-1">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>{evt.timeWindow}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{evt.owner}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* EMPTY STATE WITH HOT AIR BALLOON ARTWORK */
                  <div className="py-12 px-4 text-center space-y-4">
                    <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
                      <svg className="w-full h-full text-slate-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M50 18 C34 18 24 28 24 42 C24 56 38 68 50 72 C62 68 76 56 76 42 C76 28 66 18 50 18 Z" strokeDasharray="3 3" />
                        <ellipse cx="50" cy="42" rx="12" ry="24" strokeDasharray="3 3" />
                        <line x1="50" y1="18" x2="50" y2="66" strokeDasharray="3 3" />
                        <line x1="42" y1="68" x2="42" y2="78" />
                        <line x1="58" y1="68" x2="58" y2="78" />
                        <rect x="40" y="78" width="20" height="12" rx="2" strokeDasharray="2 2" />
                        <circle cx="20" cy="48" r="3" />
                        <line x1="18.5" y1="48" x2="21.5" y2="48" />
                        <circle cx="80" cy="42" r="3" />
                        <line x1="78.5" y1="42" x2="81.5" y2="42" />
                      </svg>
                    </div>

                    <p className="text-sm font-semibold text-slate-400">
                      No events for the day
                    </p>
                  </div>
                )}
              </div>

              {/* BOTTOM BUTTON: SCHEDULE RELEASE EVENT */}
              <button
                onClick={() => setIsNewReleaseModalOpen(true)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs mt-4"
              >
                <Plus className="w-4 h-4 text-slate-500" />
                <span>Schedule Release Event</span>
              </button>

            </div>

          </div>

        </div>

      </div>

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
