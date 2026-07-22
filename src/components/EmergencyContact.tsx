import React, { useState, useMemo } from "react";
import { 
  AlertTriangle, 
  Search, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Filter, 
  X, 
  Send, 
  ChevronRight, 
  PhoneCall, 
  ShieldAlert, 
  Clock, 
  ExternalLink,
  Laptop
} from "lucide-react";

// --- DATA STRUCTURES ---

interface SeverityGuideline {
  id: "P1" | "P2" | "P3" | "P4";
  title: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  hoverBorderColor: string;
  bgColor: string;
  description: string;
  contactInstructions: string;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  roleCategory: "Delivery" | "Tech" | "Operations" | "Management";
  email: string;
  location: "Onsite" | "Offshore";
  isPrimary: boolean;
}

const SEVERITY_GUIDELINES: SeverityGuideline[] = [
  {
    id: "P1",
    title: "Critical",
    badgeColor: "bg-[#e12d2d]",
    textColor: "text-[#e12d2d]",
    borderColor: "border-red-100",
    hoverBorderColor: "hover:border-red-400",
    bgColor: "bg-red-50/40",
    description: "Production down or major business impact.",
    contactInstructions: "Tech & Operations Leads and Delivery Manager Immediately"
  },
  {
    id: "P2",
    title: "High",
    badgeColor: "bg-[#ff941a]",
    textColor: "text-[#d97706]",
    borderColor: "border-amber-100",
    hoverBorderColor: "hover:border-amber-400",
    bgColor: "bg-amber-50/30",
    description: "Significant functionality impacted.",
    contactInstructions: "Tech & Operations Lead"
  },
  {
    id: "P3",
    title: "Medium",
    badgeColor: "bg-[#ffcc00]",
    textColor: "text-[#a16207]",
    borderColor: "border-yellow-100",
    hoverBorderColor: "hover:border-yellow-400",
    bgColor: "bg-yellow-50/20",
    description: "Limited business impact.",
    contactInstructions: "Operations Lead During Business Hours"
  },
  {
    id: "P4",
    title: "Low",
    badgeColor: "bg-[#107c41]",
    textColor: "text-[#107c41]",
    borderColor: "border-emerald-100",
    hoverBorderColor: "hover:border-emerald-400",
    bgColor: "bg-emerald-50/20",
    description: "Minor issue or enhancement request.",
    contactInstructions: "Normal Support Process"
  }
];

const CONTACT_DIRECTORY: Contact[] = [
  {
    id: "1",
    name: "Jakirhussain Bashee",
    role: "Delivery Manager",
    roleCategory: "Delivery",
    email: "Jakirhussain.Bashee@insmed.com",
    location: "Onsite",
    isPrimary: true
  },
  {
    id: "2",
    name: "Ruban Soundrapandyan",
    role: "BI Tech Lead",
    roleCategory: "Tech",
    email: "Ruban.Soundrapandyan@insmed.com",
    location: "Onsite",
    isPrimary: true
  },
  {
    id: "3",
    name: "Gajapathy Ramalingam",
    role: "Data Tech Lead",
    roleCategory: "Tech",
    email: "Gajapathy.Ramalingam@Insmed.com ",
    location: "Onsite",
    isPrimary: true
  },
  {
    id: "4",
    name: "Gayathri Ingersal",
    role: "Operations Lead",
    roleCategory: "Operations",
    email: "Gayathri.Ingersal@insmed.com ",
    location: "Onsite",
    isPrimary: true
  },
  {
    id: "5",
    name: "Sam Rajesh ",
    role: "Delivery Manager",
    roleCategory: "Delivery",
    email: "Sam.Rajesh@insmed.com",
    location: "Offshore",
    isPrimary: true
  },
  {
    id: "6",
    name: "Gladwin Antony",
    role: "BI Tech Lead",
    roleCategory: "Tech",
    email: "Gladwin.Antony@insmed.com",
    location: "Offshore",
    isPrimary: true
  },
  {
    id: "7",
    name: "Samuel Godwin",
    role: "Operations Manager",
    roleCategory: "Operations",
    email: "Samuel.Godwin@insmed.com",
    location: "Offshore",
    isPrimary: true
  }
];

const IT_MANAGERS: Contact[] = [
  {
    id: "it-1",
    name: "Logaraj Kanthasamy",
    role: "IT Manager",
    roleCategory: "Management",
    email: "logaraj.kanthasamy@insmed.com",
    location: "Onsite",
    isPrimary: false
  },
  {
    id: "it-2",
    name: "Premkumar Shanmugasundaram",
    role: "IT Manager",
    roleCategory: "Management",
    email: "Premkumar.Shanmugasundaram@insmed.com",
    location: "Onsite",
    isPrimary: false
  }
];

export default function EmergencyContact() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  
  // Highlighting active contacts based on selected severity guideline
  const [selectedSeverityId, setSelectedSeverityId] = useState<"P1" | "P2" | "P3" | "P4" | null>(null);

  // Copy Clipboard Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Incident Assistant Modal State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantSeverity, setAssistantSeverity] = useState<"P1" | "P2" | "P3" | "P4">("P1");
  const [assistantSystem, setAssistantSystem] = useState("");
  const [assistantDesc, setAssistantDesc] = useState("");
  const [assistantSubmitted, setAssistantSubmitted] = useState(false);

  // Copy helper
  const handleCopy = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Check if a contact is responsible for the currently selected severity
  const isContactRelevantForSeverity = (contact: Contact, severity: "P1" | "P2" | "P3" | "P4" | null): boolean => {
    if (!severity) return true;
    
    const roleLower = contact.role.toLowerCase();
    
    if (severity === "P1") {
      // "Tech & Operations Leads and Delivery Manager Immediately"
      return (
        roleLower.includes("tech lead") || 
        roleLower.includes("operations lead") || 
        roleLower.includes("delivery manager")
      );
    }
    if (severity === "P2") {
      // "Tech & Operations Lead"
      return roleLower.includes("tech lead") || roleLower.includes("operations lead");
    }
    if (severity === "P3") {
      // "Operations Lead During Business Hours"
      return roleLower.includes("operations lead") || roleLower.includes("operations manager");
    }
    if (severity === "P4") {
      // "Normal Support Process"
      return true; // Everyone can assist or normal channel
    }
    return true;
  };

  // Filtered contacts list
  const filteredContacts = useMemo(() => {
    return CONTACT_DIRECTORY.filter(contact => {
      // Search Match
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Role Match
      const matchesRole = 
        selectedRole === "All" || 
        (selectedRole === "Delivery" && contact.roleCategory === "Delivery") ||
        (selectedRole === "Tech" && contact.roleCategory === "Tech") ||
        (selectedRole === "Operations" && contact.roleCategory === "Operations");

      // Location Match
      const matchesLocation = 
        selectedLocation === "All" || 
        contact.location === selectedLocation;

      // Severity Highlight logic
      const matchesSeverity = isContactRelevantForSeverity(contact, selectedSeverityId);

      return matchesSearch && matchesRole && matchesLocation && matchesSeverity;
    });
  }, [searchQuery, selectedRole, selectedLocation, selectedSeverityId]);

  // Draft Escalation Email Content
  const generatedEmailDetails = useMemo(() => {
    const severityObj = SEVERITY_GUIDELINES.find(g => g.id === assistantSeverity);
    const targetContacts = CONTACT_DIRECTORY.filter(c => isContactRelevantForSeverity(c, assistantSeverity));
    const recipientEmails = targetContacts.map(c => c.email).join("; ");
    
    const subject = `[${assistantSeverity} ESCALATION] ${assistantSystem || "System"} Incident - Immediate Attention Required`;
    const body = `Hi Support Team,

This is a ${assistantSeverity} (${severityObj?.title}) escalation concerning the following issue:

System/Service: ${assistantSystem || "[Specify System Name]"}
Description of Impact: ${assistantDesc || "[Specify Description of Impact]"}

Severity level guidelines recommend contacting: ${severityObj?.contactInstructions}.

Please respond to this ticket immediately with status updates.

Thank you,
[Your Name]`;

    const mailtoUrl = `mailto:${recipientEmails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return {
      recipients: targetContacts,
      emailsString: recipientEmails,
      subject,
      body,
      mailtoUrl
    };
  }, [assistantSeverity, assistantSystem, assistantDesc]);

  return (
    <div className="min-h-screen bg-[#f4f7fa] py-12 px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* --- HEADER --- */}
        {/* <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Operational Directory
              </span>
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10">
                v2.1
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Incident Escalation Portal
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Reference official severity guidelines and locate primary contacts during system events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAssistantSubmitted(false);
                setIsAssistantOpen(true);
              }}
              id="btn-incident-assistant"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-150 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              Incident Helper
            </button>
          </div>
        </header> */}

        {/* --- SEVERITY GUIDELINES SECTION --- */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-blue-600" />
                Severity Guidelines
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click on a tier to highlight and filter the designated contact team members below.
              </p>
            </div>
            {selectedSeverityId && (
              <button
                onClick={() => setSelectedSeverityId(null)}
                className="self-start text-xs font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-xs"
              >
                Clear Severity Filter
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEVERITY_GUIDELINES.map((item) => {
              const isSelected = selectedSeverityId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSeverityId(isSelected ? null : item.id)}
                  id={`severity-card-${item.id}`}
                  className={`relative flex flex-col justify-between p-6 bg-white rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    isSelected 
                      ? "ring-2 ring-blue-600 border-transparent shadow-md transform -translate-y-0.5" 
                      : `${item.borderColor} ${item.hoverBorderColor}`
                  } ${selectedSeverityId && !isSelected ? "opacity-60 hover:opacity-100" : ""}`}
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white font-black text-sm shadow-xs ${item.badgeColor}`}>
                        {item.id}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          Active Filter
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed min-h-[32px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Line & Contacts info */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Contact Instruction
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-normal">
                      {item.contactInstructions}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- CONTROLLER & FILTERS FOR DIRECTORY --- */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search by name, role, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search-input"
                className="block w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fafc] text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Role filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  id="role-filter"
                  className="bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All">All Roles</option>
                  <option value="Delivery">Delivery Management</option>
                  <option value="Tech">Technical Leads</option>
                  <option value="Operations">Operations Team</option>
                </select>
              </div>

              {/* Location filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100">
                <Laptop className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  id="location-filter"
                  className="bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="All">All Locations</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Offshore">Offshore</option>
                </select>
              </div>

              {/* Reset Filters button */}
              {(searchQuery || selectedRole !== "All" || selectedLocation !== "All" || selectedSeverityId) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRole("All");
                    setSelectedLocation("All");
                    setSelectedSeverityId(null);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors px-2 py-1"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {selectedSeverityId && (
            <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/80 rounded-xl px-4 py-2 text-xs text-blue-800">
              <span className="font-bold">Active severity filter:</span>
              <span>Showing team members recommended for <strong>{selectedSeverityId} ({SEVERITY_GUIDELINES.find(s=>s.id===selectedSeverityId)?.title})</strong>.</span>
            </div>
          )}
        </section>

        {/* --- PRIMARY CONTACT DIRECTORY --- */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Primary Contact Directory
            </h2>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
              {filteredContacts.length} Contacts listed
            </span>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl py-12 px-4 text-center">
              <p className="text-slate-500 text-sm">No contacts found matching the filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRole("All");
                  setSelectedLocation("All");
                  setSelectedSeverityId(null);
                }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  id={`contact-card-${contact.id}`}
                  className="group bg-white rounded-2xl shadow-xs border border-slate-100 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Header bar with Name */}
                    <div className="bg-[#1266f1] text-white text-center font-bold py-3 px-4 shadow-sm relative group-hover:bg-[#0c56d0] transition-colors duration-200">
                      <span className="tracking-wide text-sm">{contact.name}</span>
                    </div>

                    {/* Body content */}
                    <div className="p-5 space-y-4">
                      {/* Role */}
                      <div>
                        <span className="text-xs font-semibold text-blue-600 block">
                          {contact.role}
                        </span>
                      </div>

                      {/* Email Row with action */}
                      <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100/50 group/email">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-xs text-slate-600 font-medium hover:text-blue-600 truncate flex items-center gap-1.5 focus:outline-none"
                          title="Click to write email"
                        >
                          <Mail className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopy(contact.email, contact.id)}
                          className="p-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
                          title="Copy email to clipboard"
                        >
                          {copiedId === contact.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Location Pin Line */}
                  <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className={`h-3.5 w-3.5 ${contact.location === "Onsite" ? "text-red-500" : "text-blue-500"}`} />
                      <span className="font-medium text-slate-600">{contact.location}</span>
                    </div>
                    
                    {/* Action pill */}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider flex items-center gap-0.5"
                    >
                      Email 
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- CRITICAL ESCALATION WARNING BOX --- */}
        <section 
          id="critical-warning-box"
          className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4 transition-all hover:shadow-sm"
        >
          <div className="bg-[#fef3c7] p-2.5 rounded-xl border border-[#fcd34d] text-amber-700 flex-shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              Critical Incident Escalation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you are unable to reach the assigned Technical Lead or Delivery Manager during a critical incident, please escalate immediately to the IT Manager.
            </p>
          </div>
        </section>

        {/* --- IT MANAGERS SECTION --- */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              IT Managers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ultimate escalation path for unresolved severe outages or blockages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IT_MANAGERS.map((manager) => (
              <div
                key={manager.id}
                id={`it-manager-card-${manager.id}`}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-800">{manager.name}</h3>
                  
                  {/* Email & location row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 group/it-mail">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <a 
                        href={`mailto:${manager.email}`} 
                        className="font-medium text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        {manager.email}
                      </a>
                      <button
                        onClick={() => handleCopy(manager.email, manager.id)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copiedId === manager.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-red-500" />
                      <span className="font-medium text-slate-600">{manager.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={`mailto:${manager.email}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    Contact Escalation
                    <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- INCIDENT HELPER MODAL --- */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsAssistantOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100">
              
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
                    <ShieldAlert className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900" id="modal-title">
                      Incident Escalation Assistant
                    </h3>
                    <p className="text-[11px] text-slate-500">Draft your crisis email with correct stakeholders instantly.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAssistantOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {!assistantSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setAssistantSubmitted(true); }} className="space-y-4">
                    
                    {/* Severity Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Incident Severity Level</label>
                      <div className="grid grid-cols-4 gap-2">
                        {SEVERITY_GUIDELINES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setAssistantSeverity(s.id)}
                            className={`py-2 px-1 text-xs font-black rounded-lg border text-center transition-all ${
                              assistantSeverity === s.id
                                ? "bg-slate-900 text-white border-transparent shadow-xs scale-102"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {s.id}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-1">
                        Recommended contacts: <span className="font-medium text-slate-700">{SEVERITY_GUIDELINES.find(g => g.id === assistantSeverity)?.contactInstructions}</span>
                      </p>
                    </div>

                    {/* Affected System */}
                    <div className="space-y-1.5">
                      <label htmlFor="system-input" className="text-xs font-bold text-slate-700 block">
                        Affected System / Service Name
                      </label>
                      <input
                        type="text"
                        id="system-input"
                        required
                        placeholder="e.g. Payment Gateway API, BI Dashboard"
                        value={assistantSystem}
                        onChange={(e) => setAssistantSystem(e.target.value)}
                        className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl bg-[#f8fafc] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Impact description */}
                    <div className="space-y-1.5">
                      <label htmlFor="desc-input" className="text-xs font-bold text-slate-700 block">
                        Describe the Incident Impact
                      </label>
                      <textarea
                        id="desc-input"
                        rows={3}
                        required
                        placeholder="e.g. Users receiving 500 errors during checkout since 05:30 UTC."
                        value={assistantDesc}
                        onChange={(e) => setAssistantDesc(e.target.value)}
                        className="w-full text-sm px-3.5 py-2 border border-slate-200 rounded-xl bg-[#f8fafc] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors cursor-pointer"
                      >
                        Generate Escalation Email
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-5">
                    {/* Success notification banner */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-2.5">
                      <div className="bg-emerald-100 text-emerald-800 p-1 rounded-md mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Email Blueprint Ready!</h4>
                        <p className="text-[11px] text-slate-500">Formulated for {generatedEmailDetails.recipients.length} target contact(s).</p>
                      </div>
                    </div>

                    {/* Targets detail */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recipients ({generatedEmailDetails.recipients.length})</span>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedEmailDetails.recipients.map(c => (
                          <span key={c.id} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/50">
                            {c.name} ({c.role})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subject line blueprint */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subject</span>
                        <button
                          onClick={() => handleCopy(generatedEmailDetails.subject, "copy-subject")}
                          className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                        >
                          {copiedId === "copy-subject" ? "Copied!" : "Copy Subject"}
                        </button>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-700 font-semibold break-all">
                        {generatedEmailDetails.subject}
                      </div>
                    </div>

                    {/* Body blueprint */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email Body Preview</span>
                        <button
                          onClick={() => handleCopy(generatedEmailDetails.body, "copy-body")}
                          className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                        >
                          {copiedId === "copy-body" ? "Copied!" : "Copy Body"}
                        </button>
                      </div>
                      <pre className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-[11px] text-slate-700 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {generatedEmailDetails.body}
                      </pre>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setAssistantSubmitted(false)}
                        className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Edit Information
                      </button>
                      <a
                        href={generatedEmailDetails.mailtoUrl}
                        className="w-full sm:flex-1 inline-flex justify-center items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors text-center"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Open Mail Client
                      </a>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
