import React, { useState } from 'react';
import {
  BarChart3,
  Snowflake,
  Share2,
  FileText,
  ClipboardCheck,
  UserCog,
  MessageSquare,
  CheckSquare,
  Info,
  Clock,
  Users,
  X,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export type PlatformType = 'qlik' | 'snowflake' | 'talend';

export const AccessManagement: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('qlik');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Content configuration based on platform
  const getPlatformDetails = () => {
    switch (activePlatform) {
      case 'qlik':
        return {
          title: 'Qlik Access',
          description: 'Raise requests for Qlik user access and modifications.',
          icon: <Users className="w-6 h-6 text-blue-600" />,
          notes: [
            'Bulk access requests should be routed through Qlik Support.',
            'Provide complete business justification.',
            'Access changes require approval.',
            'User receives confirmation after provisioning.'
          ],
          sla: [
            { definition: 'Service Requests', hours: '24 Hours' },
            { definition: 'Access Queries', hours: '48 Hours' }
          ],
          accessTypes: [
            'Professional User',
            'Analyzer User',
            'Developer / Admin',
            'Stream Publisher'
          ]
        };

      case 'snowflake':
        return {
          title: 'Snowflake Access',
          description: 'Raise requests for Snowflake warehouse roles, database privileges, and user access.',
          icon: <Snowflake className="w-6 h-6 text-blue-600" />,
          notes: [
            'Account roles require manager and security custodian approval.',
            'Provide database/schema name and required privilege level (Read/Write/Admin).',
            'Production data access requires secondary MFA verification.',
            'User receives confirmation after role provisioning.'
          ],
          sla: [
            { definition: 'Service Requests', hours: '12 Hours' },
            { definition: 'Access Queries', hours: '24 Hours' }
          ],
          accessTypes: [
            'Read-Only (ANALYTICS_ROLE)',
            'Read-Write (TRANSFORMER_ROLE)',
            'Database Admin (DBA_ROLE)',
            'Account Admin (ACCOUNTADMIN)'
          ]
        };

      case 'talend':
        return {
          title: 'Talend Access',
          description: 'Raise requests for Talend TAC/Management Console access, project permissions, and deployment rights.',
          icon: <Share2 className="w-6 h-6 text-blue-600" />,
          notes: [
            'Production job execution rights require Senior Lead approval.',
            'TAC project access requires specific Git repository permissions.',
            'Access changes require lead developer sign-off.',
            'User receives confirmation after environment provisioning.'
          ],
          sla: [
            { definition: 'Service Requests', hours: '24 Hours' },
            { definition: 'Access Queries', hours: '36 Hours' }
          ],
          accessTypes: [
            'Developer Access (TAC)',
            'Operator Access (Job Execution)',
            'Project Manager Role',
            'Admin Console Access'
          ]
        };
    }
  };

  const platformInfo = getPlatformDetails();

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Light Blue Glassmorphism Hero Top Header */}
      <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Title & Branding */}
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Access Management
                </h1>
                <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Enterprise User Authorization & Governance Portal
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Top Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-7 relative z-20">
        <div className="flex items-center justify-start gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {/* Qlik Access Tab */}
          <button
            onClick={() => setActivePlatform('qlik')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap ${
              activePlatform === 'qlik'
                ? 'bg-[#1D70F5] text-white ring-2 ring-blue-400/30 shadow-blue-500/25'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 hover:text-blue-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Qlik Access</span>
          </button>

          {/* Snowflake Access Tab */}
          <button
            onClick={() => setActivePlatform('snowflake')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap ${
              activePlatform === 'snowflake'
                ? 'bg-[#1D70F5] text-white ring-2 ring-blue-400/30 shadow-blue-500/25'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 hover:text-blue-600'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span>Snowflake Access</span>
          </button>

          {/* Talend Access Tab */}
          <button
            onClick={() => setActivePlatform('talend')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap ${
              activePlatform === 'talend'
                ? 'bg-[#1D70F5] text-white ring-2 ring-blue-400/30 shadow-blue-500/25'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 hover:text-blue-600'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Talend Access</span>
          </button>
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">

          {/* Card Sub-Header */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100/80 flex items-center justify-center shrink-0 border border-blue-200/60 shadow-xs">
                {platformInfo.icon}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                  {platformInfo.title}
                </h2>
                <p className="text-slate-500 text-sm mt-0.5 font-normal">
                  {platformInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Section: ACCESS REQUEST PROCESS */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A428A] tracking-wider uppercase">
                ACCESS REQUEST PROCESS
              </h3>
            </div>

            {/* Process Step Cards in a single line */}
            <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto pt-6 pb-4 px-1 scrollbar-none w-full">
              {/* Step 01 */}
              <div className="flex-1 min-w-[130px] sm:min-w-0 relative flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 pt-7 sm:pt-8 text-center shadow-xs hover:border-blue-300 transition-all group">
                {/* Number Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1D70F5] text-white text-xs font-extrabold flex items-center justify-center shadow-md z-10">
                  01
                </div>

                {/* Step Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Step Title & Subtitle */}
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Submit Request</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-1 min-h-[28px] sm:min-h-[32px] leading-tight">
                  {activePlatform === 'qlik' && 'In Qlik Support'}
                  {activePlatform === 'snowflake' && 'In Snowflake Portal'}
                  {activePlatform === 'talend' && 'In Talend Support Desk'}
                </p>

                {/* Tag Badge */}
                <span className="mt-3 inline-block px-3 py-0.5 sm:py-1 bg-blue-50/80 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium">
                  User
                </span>
              </div>

              {/* Arrow Connector 1 */}
              <div className="text-blue-400 font-bold text-sm sm:text-lg shrink-0 px-0.5 select-none">
                →
              </div>

              {/* Step 02 */}
              <div className="flex-1 min-w-[130px] sm:min-w-0 relative flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 pt-7 sm:pt-8 text-center shadow-xs hover:border-blue-300 transition-all group">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1D70F5] text-white text-xs font-extrabold flex items-center justify-center shadow-md z-10">
                  02
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Collect Inputs</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-1 min-h-[28px] sm:min-h-[32px] leading-tight">Obtain Approval</p>

                <span className="mt-3 inline-block px-3 py-0.5 sm:py-1 bg-blue-50/80 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium">
                  Admin
                </span>
              </div>

              {/* Arrow Connector 2 */}
              <div className="text-blue-400 font-bold text-sm sm:text-lg shrink-0 px-0.5 select-none">
                →
              </div>

              {/* Step 03 */}
              <div className="flex-1 min-w-[130px] sm:min-w-0 relative flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 pt-7 sm:pt-8 text-center shadow-xs hover:border-blue-300 transition-all group">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1D70F5] text-white text-xs font-extrabold flex items-center justify-center shadow-md z-10">
                  03
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <UserCog className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Add / Remove</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-1 min-h-[28px] sm:min-h-[32px] leading-tight">
                  {activePlatform === 'qlik' && 'User Access'}
                  {activePlatform === 'snowflake' && 'Role Provisioning'}
                  {activePlatform === 'talend' && 'Project Assignment'}
                </p>

                <span className="mt-3 inline-block px-3 py-0.5 sm:py-1 bg-blue-50/80 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium">
                  Admin
                </span>
              </div>

              {/* Arrow Connector 3 */}
              <div className="text-blue-400 font-bold text-sm sm:text-lg shrink-0 px-0.5 select-none">
                →
              </div>

              {/* Step 04 */}
              <div className="flex-1 min-w-[130px] sm:min-w-0 relative flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 pt-7 sm:pt-8 text-center shadow-xs hover:border-blue-300 transition-all group">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1D70F5] text-white text-xs font-extrabold flex items-center justify-center shadow-md z-10">
                  04
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Communicate</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-1 min-h-[28px] sm:min-h-[32px] leading-tight">To User</p>

                <span className="mt-3 inline-block px-3 py-0.5 sm:py-1 bg-blue-50/80 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium">
                  Admin
                </span>
              </div>

              {/* Arrow Connector 4 */}
              <div className="text-blue-400 font-bold text-sm sm:text-lg shrink-0 px-0.5 select-none">
                →
              </div>

              {/* Step 05 */}
              <div className="flex-1 min-w-[130px] sm:min-w-0 relative flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 pt-7 sm:pt-8 text-center shadow-xs hover:border-blue-300 transition-all group">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1D70F5] text-white text-xs font-extrabold flex items-center justify-center shadow-md z-10">
                  05
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Sign Off</h4>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-1 min-h-[28px] sm:min-h-[32px] leading-tight">Close Ticket</p>

                <span className="mt-3 inline-block px-3 py-0.5 sm:py-1 bg-blue-50/80 text-blue-600 rounded-full text-[10px] sm:text-xs font-medium">
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Key Notes & SLA Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Key Notes Card */}
            <div className="bg-[#F4F8FE] border border-blue-100 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-[#1D70F5]" />
                  <h4 className="font-bold text-slate-800 text-base">Key Notes</h4>
                </div>

                <ul className="space-y-3 text-slate-700 text-sm">
                  {platformInfo.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SLA Table Card */}
            <div className="bg-[#F4F8FE] border border-blue-100 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#1D70F5]" />
                  <h4 className="font-bold text-slate-800 text-base">SLA</h4>
                </div>

                <div className="overflow-hidden rounded-xl border border-blue-200/80 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#1D70F5] text-white">
                        <th className="py-3 px-4 font-semibold w-2/3 border-b border-blue-600">Definition</th>
                        <th className="py-3 px-4 font-semibold w-1/3 border-b border-blue-600">SLA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 text-slate-700">
                      {platformInfo.sla.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="py-3.5 px-4 font-medium">{item.definition}</td>
                          <td className="py-3.5 px-4">{item.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Contact Support Alert */}
          <div className="bg-[#EBF3FE] border border-blue-100/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-0 text-sm text-[#1D70F5]">
            <div className="flex items-center gap-2.5 font-medium">
              <Info className="w-4 h-4 shrink-0 text-[#1D70F5]" />
              <span>For any questions, contact the support team.</span>
            </div>

            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="text-xs font-bold underline hover:text-blue-800 transition cursor-pointer self-end sm:self-auto"
            >
              Contact Support →
            </button>
          </div>

        </div>
      </div>

      {/* --- MODAL 2: Support Team Contact Modal --- */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-100">
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Support Team Contact</h3>
                <p className="text-xs text-slate-500">Enterprise Data Access Desk</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="font-semibold text-slate-800 text-xs uppercase mb-1">Email Support</div>
                <div className="text-blue-600 font-mono text-xs">access-support@company.com</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="font-semibold text-slate-800 text-xs uppercase mb-1">Live Chat / Slack Channel</div>
                <div className="text-slate-700 text-xs">#data-access-support (Mon-Fri 8AM - 6PM EST)</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="font-semibold text-slate-800 text-xs uppercase mb-1">Escalations</div>
                <div className="text-slate-700 text-xs">Contact On-Call Data Admin via IT Portal</div>
              </div>
            </div>

            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-800 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AccessManagement;
