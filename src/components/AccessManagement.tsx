import React, { useState } from 'react';
import {
  BarChart3,
  Snowflake,
  Share2,
  Info,
  Clock,
  Users,
  X,
  HelpCircle,
  // CheckCircle2,
  ShieldCheck,
  // Send,
  ExternalLink,
  // ChevronRight
} from 'lucide-react';

import one from '../assets/qlikchart.png';
import two from '../assets/snowflake.png';
import three from '../assets/talendflowchart.png';

export type PlatformType = 'qlik' | 'snowflake' | 'talend';

export const AccessManagement: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('qlik');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Content configuration based on platform
  const getPlatformDetails = () => {
    switch (activePlatform) {
      case 'qlik':
        return {
          image: one,
          title: 'Qlik Access',
          description: 'Raise requests for Qlik user access, stream publishing, and license authorizations.',
          bannerGradient: 'bg-gradient-to-r from-[#004D25] via-[#00873D] to-[#00A84B]',
          badgeLogo: (
            <div className="bg-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/60 shrink-0">
              <div className="w-6 h-6 rounded-full border-[2.5px] border-[#009845] flex items-center justify-center p-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#009845]" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-xl font-sans">
                Qlik
              </span>
            </div>
          ),
          icon: <Users className="w-6 h-6 text-emerald-600" />,
          requestUrl: 'https://insmed.service-now.com/it?id=sc_cat_item&sys_id=83464e331bd1b5509595a60bbc4bcb98&sysparm_category=e6c9f36e1bd582109595a60bbc4bcb62',
          notes: [
            'For Bulk User Access Requests and for S3 access, users should raise a request to Qlik Support.',
            'For Platform-Level Access (Qlik, Snowflake, Talend and AWS development-related access), requests should be routed through Qlik Support.'
          ],
          sla: [
            { definition: 'User access related request / Service Requests', hours: '24 Hours' },
            { definition: 'End user needs guidance, User access related queries', hours: '48 Hours' }
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
          image: two,
          title: 'Snowflake Access',
          description: 'Raise requests for Snowflake warehouse roles, database privileges, and user access.',
          bannerGradient: 'bg-gradient-to-r from-[#091E3A] via-[#0076C5] to-[#29B5E8]',
          badgeLogo: (
            <div className="bg-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/60 shrink-0">
              <Snowflake className="w-6 h-6 text-[#29B5E8]" />
              <span className="font-extrabold text-slate-900 tracking-tight text-xl font-sans">
                snowflake
              </span>
            </div>
          ),
          icon: <Snowflake className="w-6 h-6 text-sky-600" />,
          requestUrl: 'https://insmed.service-now.com/it?id=sc_cat_item&sys_id=67ffbbf787ac0754ee2bca29cebb3568&sysparm_category=e6c9f36e1bd582109595a60bbc4bcb62',
          notes: [
            'For Bulk User Access Requests and for S3 access, users should raise a request to Qlik Support.',
            'For Platform-Level Access (Qlik, Snowflake, Talend and AWS development-related access), requests should be routed through Qlik Support.'
          ],
          sla: [
            { definition: 'User access related request / Service Requests', hours: '12 Hours' },
            { definition: 'End user needs guidance, User access related queries', hours: '24 Hours' }
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
          image: three,
          title: 'Talend Access',
          description: 'Raise requests for Talend TAC/Management Console access, project permissions, and deployment rights.',
          bannerGradient: 'bg-gradient-to-r from-[#20102B] via-[#E93E3A] to-[#FF6B35]',
          badgeLogo: (
            <div className="bg-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-white/60 shrink-0">
              <Share2 className="w-6 h-6 text-[#FF5D5B]" />
              <span className="font-extrabold text-slate-900 tracking-tight text-xl font-sans">
                talend
              </span>
            </div>
          ),
          icon: <Share2 className="w-6 h-6 text-rose-600" />,
          requestUrl: null,
          notes: [
            'For Bulk User Access Requests and for S3 access, users should raise a request to Qlik Support.',
            'For Platform-Level Access (Qlik, Snowflake, Talend and AWS development-related access), requests should be routed through Qlik Support.'
          ],
          sla: [
            { definition: 'User access related request / Service Requests', hours: '24 Hours' },
            { definition: 'End user needs guidance, User access related queries', hours: '36 Hours' }
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
      <div className="max-w-7xl mx-auto px-4 mt-6 sm:px-6 lg:px-8 relative z-10">
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
              {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                Enterprise User Authorization & Governance Portal
              </p> */}
            </div>
          </div>

          {/* Quick Support Action Button */}
          {/* <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-blue-700 hover:text-blue-800 rounded-xl font-semibold text-xs sm:text-sm shadow-xs border border-blue-200/80 transition-all duration-200 cursor-pointer self-start md:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Support Desk</span>
          </button> */}
        </div>
      </div>

      {/* Top Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-20">
        <div className="flex items-center justify-start gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {/* Qlik Access Tab */}
          <button
            onClick={() => setActivePlatform('qlik')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap ${
              activePlatform === 'qlik'
                ? 'bg-[#00873D] text-white ring-2 ring-[#00873D]/40 shadow-md shadow-emerald-700/20 font-bold'
                : 'bg-white text-slate-700 hover:bg-emerald-50/80 border border-slate-200/90 hover:text-[#00873D] hover:border-emerald-300'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activePlatform === 'qlik' ? 'text-white' : 'text-[#00873D]'}`} />
            <span>Qlik Access</span>
          </button>

          {/* Snowflake Access Tab */}
          <button
            onClick={() => setActivePlatform('snowflake')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap ${
              activePlatform === 'snowflake'
                ? 'bg-[#0076C5] text-white ring-2 ring-[#0076C5]/40 shadow-md shadow-sky-700/20 font-bold'
                : 'bg-white text-slate-700 hover:bg-sky-50/80 border border-slate-200/90 hover:text-[#0076C5] hover:border-sky-300'
            }`}
          >
            <Snowflake className={`w-4 h-4 ${activePlatform === 'snowflake' ? 'text-white' : 'text-[#0076C5]'}`} />
            <span>Snowflake Access</span>
          </button>

          {/* Talend Access Tab */}
          <button
            onClick={() => setActivePlatform('talend')}
            className={`flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap ${
              activePlatform === 'talend'
                ? 'bg-[#E93E3A] text-white ring-2 ring-[#E93E3A]/40 shadow-md shadow-rose-700/20 font-bold'
                : 'bg-white text-slate-700 hover:bg-rose-50/80 border border-slate-200/90 hover:text-[#E93E3A] hover:border-rose-300'
            }`}
          >
            <Share2 className={`w-4 h-4 ${activePlatform === 'talend' ? 'text-white' : 'text-[#E93E3A]'}`} />
            <span>Talend Access</span>
          </button>
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-8 lg:p-10 space-y-10 sm:space-y-12">

          {/* Card Sub-Header Banner */}
          <div className={`${platformInfo.bannerGradient} rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden transition-all duration-300`}>
            {/* Soft background ambient overlay */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Title & Description */}
            <div className="relative z-10 text-center sm:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-xs">
                {platformInfo.title}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-2 font-medium max-w-xl">
                {platformInfo.description}
              </p>
            </div>

            {/* Brand Cloud Badge on Right */}
            <div className="relative z-10 shrink-0">
              {platformInfo.badgeLogo}
            </div>
          </div>

          {/* ServiceNow Direct Access Request Link Box */}
          {platformInfo.requestUrl ? (
            <div className="bg-[#F8FAFC] border border-blue-200/80 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 transition-all">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="p-3 bg-blue-100/90 text-[#1D70F5] rounded-2xl shrink-0 hidden sm:block">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                    {platformInfo.title} Request Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    Click the button below to open the official ServiceNow access request catalog item in a new tab.
                  </p>
                </div>
              </div>

              <a
                href={platformInfo.requestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1D70F5] hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Raise Access Request</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center text-slate-600 text-xs sm:text-sm">
              <span className="font-semibold text-slate-800">Note for Talend Access: </span>
              Direct self-service request form is not available for Talend. Please route platform-level access requests through Qlik Support.
            </div>
          )}

          {/* Section: ACCESS REQUEST PROCESS */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A428A] tracking-wider uppercase">
                ACCESS REQUEST PROCESS
              </h3>
            </div>

            {/* Process Step Image */}
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 p-2 shadow-xs">
              <img
                src={platformInfo.image}
                alt={`${platformInfo.title} process`}
                className="w-full h-auto max-h-[480px] object-contain mx-auto rounded-lg"
              />
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
          {/* <div className="bg-[#EBF3FE] border border-blue-100/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-0 text-sm text-[#1D70F5]">
            <div className="flex items-center gap-2.5 font-medium">
              <Info className="w-4 h-4 shrink-0 text-[#1D70F5]" />
              <span>For any platform access questions or bulk provisioning, contact the support team.</span>
            </div>

            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="text-xs font-bold underline hover:text-blue-800 transition cursor-pointer self-end sm:self-auto flex items-center gap-1"
            >
              <span>Contact Support</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div> */}

        </div>
      </div>

      {/* --- MODAL: Support Team Contact Modal --- */}
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
              className="w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessManagement;
