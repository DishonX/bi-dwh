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


// Custom high-fidelity Insmed logo matching the official design
  const InsmedLogo = () => (
    <div className="flex flex-col items-center justify-center select-none py-0.5">
      <div className="flex items-center gap-0.5 justify-center mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00b050]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#00a2ed]" />
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
      </div>
      <span className="text-xs font-bold tracking-tight text-[#1b365d] font-sans">
        insmed
      </span>
    </div>
  );

  // Exact Connector Components that span the absolute gap width and touch the borders perfectly
  const ConnectorRight = ({ width }: { width: number }) => (
    <div 
      style={{ width: `${width}px` }} 
      className="h-[2px] bg-[#00a2ed] relative flex-shrink-0 self-center"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#00a2ed]" />
    </div>
  );

  const ConnectorLeft = ({ width }: { width: number }) => (
    <div 
      style={{ width: `${width}px` }} 
      className="h-[2px] bg-[#00a2ed] relative flex-shrink-0 self-center"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-[#00a2ed]" />
    </div>
  );


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

            <div className="border-b border-slate-100 pb-1 mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D70F5] tracking-tight mb-4">
                Overview
              </h3>
            </div>

      <p className='mb-2'>We follow the Change Management process to review, approve, implement, and track all changes in a controlled and compliant manner.</p>

        {/* ----------------- PIXEL-PERFECT FLOWCHART ----------------- */}
        <div className="mb-6 mt-4 overflow-x-auto pb-4 scrollbar-thin" id="flowchart-container">
          <div className="w-[1000px] py-4 px-2 flex flex-col select-none">
            
            {/* ROW 1: Intake (Right Arrow Flow) */}
            <div className="flex h-[110px] w-[1000px] flex-shrink-0">
              
              {/* Box 1: Custom ServiceNow / JIRA + Email Box */}
              <div className="w-[170px] h-[110px] border-2 border-slate-400 dark:border-slate-600 rounded-lg flex flex-col overflow-hidden bg-white dark:bg-slate-950 flex-shrink-0 shadow-sm">
                <div className="bg-slate-50 dark:bg-slate-900 h-1/2 p-2 flex flex-col justify-center text-center border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Change request from
                  </span>
                  <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    ServiceNow / JIRA
                  </span>
                </div>
                <div className="h-1/2 p-1.5 flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                  <InsmedLogo />
                  <span className="text-[8px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    Email • Insmed
                  </span>
                </div>
              </div>

              <ConnectorRight width={37.5} />

              {/* Box 2: Acknowledge & Update Smartsheet */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-1">
                  Acknowledge & Update Smartsheet
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorRight width={37.5} />

              {/* Box 3: Requirement Gathering */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  Requirement Gathering
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorRight width={37.5} />

              {/* Box 4: Analyze / Clarifying */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Analyze / Clarifying questions with requester
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorRight width={37.5} />

              {/* Box 5: Create Technical Documents */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  Create Technical documents
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

            </div>

            {/* VERTICAL CONNECTOR: ROW 1 -> ROW 2 */}
            <div className="w-[1000px] h-10 relative flex-shrink-0">
              <div className="absolute" style={{ left: '914px', top: '0px' }}>
                <svg width="2" height="40" className="text-[#00a2ed] overflow-visible">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="2" />
                  <path d="M-4 34 L0 40 L4 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* ROW 2: Development & Design (Left Arrow Flow) */}
            <div className="flex h-[110px] w-[1000px] flex-shrink-0">
              
              {/* Box 9: Testing */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  Testing
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 8: Development */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  Development
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 7: Split Design Sign off (Users & Insmed) */}
              <div className="w-[170px] h-[110px] flex gap-2 flex-shrink-0">
                <div className="w-[81px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between text-center shadow-sm">
                  <span className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Design Sign off
                  </span>
                  <span className="text-[8.5px] font-bold text-[#00a2ed]">
                    Users
                  </span>
                </div>
                <div className="w-[81px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-1.5 flex flex-col justify-between text-center shadow-sm">
                  <span className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Design Sign off
                  </span>
                  <span className="text-[8.5px] font-bold text-[#00a2ed]">
                    Insmed
                  </span>
                </div>
              </div>

              <ConnectorLeft width={245} />

              {/* Box 6: Design and Mockup */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  Design and Mockup
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

            </div>

            {/* ROW-TO-ROW CONNECTOR: ROW 2 -> ROW 3 (Left-to-Right Loop back) */}
            <div className="w-[1000px] h-10 relative flex-shrink-0">
              <svg className="absolute inset-0 w-full h-full text-[#00a2ed]" xmlns="http://www.w3.org/2000/svg">
                {/* Center of Box 9 is at x=85, center of Box 10 is at x=915 */}
                <path 
                  d="M 85 0 L 85 20 L 914 20 L 914 40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                />
                <path 
                  d="M 910 34 L 914 40 L 918 34" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            {/* ROW 3: UAT & QA (Left Arrow Flow) */}
            <div className="flex h-[110px] w-[1000px] flex-shrink-0">
              
              {/* Box 13: UAT Signoff */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  UAT Signoff
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  User
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 12: UAT Review */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  UAT Review
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Users
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 11: UAT Deployment */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  UAT Deployment
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Admin
                </span>
              </div>

              <ConnectorLeft width={245} />

              {/* Box 10: Prepare UAT Document */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-2.5 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Prepare UAT Deployment Document and get a review from team member
                </span>
                <span className="text-[8.5px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

            </div>

            {/* ROW-TO-ROW CONNECTOR: ROW 3 -> ROW 4 (Left-to-Right Loop back) */}
            <div className="w-[1000px] h-10 relative flex-shrink-0">
              <svg className="absolute inset-0 w-full h-full text-[#00a2ed]" xmlns="http://www.w3.org/2000/svg">
                {/* Center of Box 13 is at x=85, center of Box 14 is at x=915 */}
                <path 
                  d="M 85 0 L 85 20 L 914 20 L 914 40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                />
                <path 
                  d="M 910 34 L 914 40 L 918 34" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            {/* ROW 4: Production Release & Smoke Testing (Left Arrow Flow) */}
            <div className="flex h-[110px] w-[1000px] flex-shrink-0">
              
              {/* Box 18: Update Smartsheet & ServiceNow */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Update Smartsheet and ServiceNow
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 17: Communicate */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-1">
                  Communicate to User and Sign off
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 16: Smoke Testing */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-2 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Smoke Testing
                </span>
                <span className="text-[8.5px] font-bold text-[#00a2ed] leading-tight">
                  Development Team / Delivery Management Team
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 15: PROD Deployment */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-3 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug mt-2">
                  PROD Deployment
                </span>
                <span className="text-[9px] font-bold text-[#00a2ed] tracking-wide">
                  Admin
                </span>
              </div>

              <ConnectorLeft width={37.5} />

              {/* Box 14: KT to Ops */}
              <div className="w-[170px] h-[110px] border-2 border-[#00a2ed] bg-white dark:bg-slate-950 rounded-lg p-2 flex flex-col justify-between text-center flex-shrink-0 shadow-sm hover:border-blue-500 transition-colors">
                <span className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  KT to Ops Team Prepare PROD Deployment Document and get a review from team member
                </span>
                <span className="text-[8.5px] font-bold text-[#00a2ed] tracking-wide">
                  Development Team
                </span>
              </div>

            </div>

          </div>
        </div>
        {/* ----------------- END OF FLOWCHART ----------------- */}


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
