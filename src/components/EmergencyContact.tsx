import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  // Mail,
  Copy,
  Check,
  // MapPin,
  AlertTriangle,
  UserCheck,
  Search,
  Globe,
  Building2,
  PhoneCall,
  Crown
} from 'lucide-react';

export interface SeverityItem {
  severity: string;
  definition: string;
  contact: string;
  level: 'P1' | 'P2' | 'P3' | 'P4';
}

export interface ContactItem {
  name: string;
  role: string;
  email: string;
  location: 'Onsite' | 'Offshore';
}

export interface ITManagerItem {
  name: string;
  email: string;
  location: 'Onsite' | 'Offshore';
}

export const EmergencyContact: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Onsite' | 'Offshore'>('All');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };



  // Exact Contact Details data from user image
  const contactDetails: ContactItem[] = [
    {
      name: 'Jakirhussain Bashee',
      role: 'Delivery Manager',
      email: 'Jakirhussain.Bashee@insmed.com',
      location: 'Onsite'
    },
    {
      name: 'Ruban Soundrapandyan',
      role: 'BI Tech Lead',
      email: 'Ruban.Soundrapandyan@insmed.com',
      location: 'Onsite'
    },
    {
      name: 'Gajapathy Ramalingam',
      role: 'Data Tech Lead',
      email: 'Gajapathy.Ramalingam@Insmed.com',
      location: 'Onsite'
    },
    {
      name: 'Gayathri Ingersal',
      role: 'Operations Lead',
      email: 'Gayathri.Ingersal@insmed.com',
      location: 'Onsite'
    },
    {
      name: 'Sam Rajesh',
      role: 'Delivery Manager',
      email: 'Sam.Rajesh@insmed.com',
      location: 'Offshore'
    },
    {
      name: 'Gladwin Antony',
      role: 'BI Tech Lead',
      email: 'Gladwin.Antony@insmed.com',
      location: 'Offshore'
    },
    {
      name: 'Samuel Godwin',
      role: 'Operations Manager',
      email: 'Samuel.Godwin@insmed.com',
      location: 'Offshore'
    }
  ];

  // Exact IT Manager data from user image
  const itManagers: ITManagerItem[] = [
    {
      name: 'Logaraj Kanthasamy',
      email: 'logaraj.kanthasamy@insmed.com',
      location: 'Onsite'
    },
    {
      name: 'Premkumar Shanmugasundaram',
      email: 'Premkumar.Shanmugasundaram@insmed.com',
      location: 'Onsite'
    }
  ];

  // Filtering for contacts
  const filteredContacts = contactDetails.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'All' || c.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 font-sans pb-16 antialiased">
      {/* Hero Top Header */}
      {/* <div className="relative bg-gradient-to-r from-sky-100/90 via-blue-100/80 to-indigo-100/90 border-b border-sky-200/80 pt-6 sm:pt-8 pb-8 sm:pb-10 shadow-xs overflow-hidden">
        <div className="absolute top-[-30px] left-12 w-64 h-64 bg-sky-300/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-30px] right-12 w-64 h-64 bg-blue-300/40 rounded-full blur-2xl pointer-events-none" /> */}

        <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-sky-200/60 via-blue-200/50 to-indigo-200/60 backdrop-blur-xl border border-sky-300/70 rounded-2xl p-5 sm:p-7 shadow-md shadow-sky-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                  Emergency Contact
                </h1>
                {/* <p className="text-blue-600/90 text-xs sm:text-sm mt-1 font-medium">
                  Severity Guidelines, Operational Contacts & IT Manager Escalation Pathways
                </p> */}
              </div>
            </div>

            {/* <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-sky-200 shadow-2xs">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">7 Key Contacts</span>
                <span className="text-slate-500">4 Onsite • 3 Offshore</span>
              </div>
            </div> */}
          </div>
        </div>
      {/* </div> */}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-8">

        {/* SECTION 1: SEVERITY GUIDELINES */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Severity Guidelines
              </h2>
              {/* <p className="text-slate-500 text-xs sm:text-sm font-normal">
                Standardized definitions and immediate contact protocol based on incident impact
              </p> */}
            </div>
          </div>

          {/* SEVERITY CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
            {/* P1 - Critical Card */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-red-600 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-red-300 transition-all duration-200 flex flex-col justify-between h-full group">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-100 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    P1 - Critical
                  </span>
                </div>

                <div className="min-h-[52px] flex flex-col justify-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Definition
                  </span>
                  <p className="text-slate-900 font-bold text-xs leading-snug">
                    Production down, major business impact
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 bg-red-50/50 -mx-4 -mb-4 p-3 px-4 rounded-b-xl flex items-start gap-2.5 min-h-[68px]">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-red-800 uppercase block tracking-wider mb-0.5">
                    Contact
                  </span>
                  <p className="text-[11px] font-semibold text-slate-800 leading-snug">
                    Tech & Operations Leads & Delivery Manager Immediately
                  </p>
                </div>
              </div>
            </div>

            {/* P2 - High Card */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-orange-500 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between h-full group">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-100 text-orange-800 border border-orange-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    P2 - High
                  </span>
                </div>

                <div className="min-h-[52px] flex flex-col justify-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Definition
                  </span>
                  <p className="text-slate-900 font-bold text-xs leading-snug">
                    Significant functionality impacted
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 bg-orange-50/50 -mx-4 -mb-4 p-3 px-4 rounded-b-xl flex items-start gap-2.5 min-h-[68px]">
                <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-orange-800 uppercase block tracking-wider mb-0.5">
                    Contact
                  </span>
                  <p className="text-[11px] font-semibold text-slate-800 leading-snug">
                    Tech & Operations Lead
                  </p>
                </div>
              </div>
            </div>

            {/* P3 - Medium Card */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-200 flex flex-col justify-between h-full group">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    P3 - Medium
                  </span>
                </div>

                <div className="min-h-[52px] flex flex-col justify-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Definition
                  </span>
                  <p className="text-slate-900 font-bold text-xs leading-snug">
                    Limited business impact
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 bg-amber-50/50 -mx-4 -mb-4 p-3 px-4 rounded-b-xl flex items-start gap-2.5 min-h-[68px]">
                <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase block tracking-wider mb-0.5">
                    Contact
                  </span>
                  <p className="text-[11px] font-semibold text-slate-800 leading-snug">
                    Operations Lead during business hours
                  </p>
                </div>
              </div>
            </div>

            {/* P4 - Low Card */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-blue-500 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between h-full group">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    P4 - Low
                  </span>
                </div>

                <div className="min-h-[52px] flex flex-col justify-start">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Definition
                  </span>
                  <p className="text-slate-900 font-bold text-xs leading-snug">
                    Minor issue or enhancement request
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 bg-blue-50/50 -mx-4 -mb-4 p-3 px-4 rounded-b-xl flex items-start gap-2.5 min-h-[68px]">
                <UserCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-blue-800 uppercase block tracking-wider mb-0.5">
                    Contact
                  </span>
                  <p className="text-[11px] font-semibold text-slate-800 leading-snug">
                    Normal support process
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTACT DETAILS */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Contact Details
                </h2>
                {/* <p className="text-slate-500 text-xs sm:text-sm font-normal">
                  Primary delivery and technical leads for BI & Data platform operations
                </p> */}
              </div>
            </div>

            {/* Search & Location Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-center">
                <button
                  onClick={() => setLocationFilter('All')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    locationFilter === 'All' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setLocationFilter('Onsite')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    locationFilter === 'Onsite' ? 'bg-white text-emerald-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  Onsite
                </button>
                <button
                  onClick={() => setLocationFilter('Offshore')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    locationFilter === 'Offshore' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  Offshore
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Table */}
          <div className="overflow-hidden rounded-xl border border-blue-200/80 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1D70F5] text-white">
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold border-r border-blue-600">
                    Name
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold border-r border-blue-600">
                    Role
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold border-r border-blue-600">
                    Email Id
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-center">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/90 text-slate-800">
                {filteredContacts.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition duration-150">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200/80">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-700 border-r border-slate-200/80">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200">
                        {c.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 border-r border-slate-200/80 font-mono text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={`mailto:${c.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {c.email}
                        </a>
                        <button
                          onClick={() => handleCopy(c.email)}
                          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition cursor-pointer"
                          title="Copy email"
                        >
                          {copiedEmail === c.email ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      {c.location === 'Onsite' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                          Onsite
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <Globe className="w-3.5 h-3.5 text-indigo-600" />
                          Offshore
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 text-sm">
                      No contacts matching your filter or search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* SECTION 3: ESCALATION CALLOUT NOTICE */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-xl shadow-xs shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">
                Critical Escalation Policy
              </span>
              <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed">
                If you are unable to reach the assigned Technical Lead or Delivery Manager during a critical incident, please escalate immediately to the IT Manager.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: IT MANAGER */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/70 p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D70F5] tracking-tight">
                IT Manager
              </h2>
              {/* <p className="text-slate-500 text-xs sm:text-sm font-normal">
                Executive escalation contacts for unblocked critical resolution
              </p> */}
            </div>
          </div>

          {/* IT Manager Table */}
          <div className="overflow-hidden rounded-xl border border-blue-200/80 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1D70F5] text-white">
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold border-r border-blue-600 w-1/3">
                    Name
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold border-r border-blue-600 w-1/2">
                    Email Id
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 font-extrabold text-center w-1/6">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/90 text-slate-800">
                {itManagers.map((mgr, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition duration-150">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                          {mgr.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span>{mgr.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 border-r border-slate-200/80 font-mono text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={`mailto:${mgr.email}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          {mgr.email}
                        </a>
                        <button
                          onClick={() => handleCopy(mgr.email)}
                          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition cursor-pointer"
                          title="Copy email"
                        >
                          {copiedEmail === mgr.email ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                        {mgr.location}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyContact;
