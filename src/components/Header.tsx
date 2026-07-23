import { useState, useEffect, useRef, type ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Terminal, 
  BarChart3, 
  Cpu, 
  BookOpen, 
  HelpCircle, 
  Activity,
  Database,
  PhoneCall,
  Layers,
  CalendarCheck2,
  Home
} from "lucide-react";

// Types for navigation items
interface DropdownItem {
  title: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  iconBg: string;
  iconColor: string;
}

interface NavItem {
  id: string;
  label: string;
  to?: string;
  icon?: ComponentType<{ className?: string }>;
  iconBg?: string;
  iconColor?: string;
  dropdownItems?: DropdownItem[];
}

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  // const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track scroll position to style navbar dynamically
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigation config with vibrant colorful icons
  const navigationItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      iconBg: "bg-blue-100 text-blue-600 border border-blue-200/80",
      iconColor: "text-blue-600",
      to: "/"
    },
    {
      id: "Operations",
      label: "Operations",
      icon: Layers,
      iconBg: "bg-purple-100 text-purple-700 border border-purple-300/80",
      iconColor: "text-purple-700",
      dropdownItems: [
        {
          title: "Access Management",
          to: "/access-management",
          icon: ShieldCheck,
          iconBg: "bg-blue-100/90 text-blue-700 border border-blue-200/80",
          iconColor: "text-blue-700",
        },
        {
          title: "Report an Incident",
          to: "/report-an-incident",
          icon: Terminal,
          iconBg: "bg-amber-100/90 text-amber-700 border border-amber-200/80",
          iconColor: "text-amber-700",
          badge: "New",
        },
        {
          title: "Change Management",
          to: "/change-management",
          icon: BarChart3,
          iconBg: "bg-emerald-100/90 text-emerald-700 border border-emerald-200/80",
          iconColor: "text-emerald-700",
        },
        {
          title: "Release Management",
          to: "/release_management",
          icon: Cpu,
          iconBg: "bg-purple-100/90 text-purple-700 border border-purple-200/80",
          iconColor: "text-purple-700",
        },
        {
          title: "Inventory of Data and Databoards",
          to: "/data-inventory",
          icon: Activity,
          iconBg: "bg-sky-100/90 text-sky-700 border border-sky-200/80",
          iconColor: "text-sky-700",
        },
      ]
    },
    {
      id: "resources",
      label: "Audit Schedule and Activities",
      icon: CalendarCheck2,
      iconBg: "bg-emerald-100 text-emerald-600 border border-emerald-200/80",
      iconColor: "text-emerald-600",
      dropdownItems: [
        {
          title: "Sox Audit and activities",
          to: "/sox-audit",
          icon: BookOpen,
          iconBg: "bg-indigo-100/90 text-indigo-700 border border-indigo-200/80",
          iconColor: "text-indigo-700",
        },
        {
          title: "GxP",
          to: "/gxp",
          icon: HelpCircle,
          iconBg: "bg-rose-100/90 text-rose-700 border border-rose-200/80",
          iconColor: "text-rose-700",
        }
      ]
    },
    {
      id: "pricing",
      label: "Emergency Contact",
      icon: PhoneCall,
      iconBg: "bg-rose-100 text-rose-600 border border-rose-200/80",
      iconColor: "text-rose-600",
      to: "/emergency-contact"
    }
  ];

  const handleDropdownTriggerClick = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleMobileDropdown = (id: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === id ? null : id);
  };

  const handleLinkClick = (to: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(to);
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white border-b border-slate-200/90 transition-all duration-200 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-md" : "shadow-xs"
      }`}
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand area with Blue Theme */}
          <NavLink 
            to="/" 
            onClick={() => handleLinkClick("/")}
            className="flex items-center gap-3 cursor-pointer focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-all duration-200 shrink-0">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                BI DWH Operations
              </span>
              <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase -mt-0.5 hidden xs:block">
                Enterprise Data Governance
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation in Blue Theme */}
          <nav className="hidden md:flex items-center space-x-1.5" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const hasDropdown = !!item.dropdownItems;
              const isOpen = activeDropdown === item.id;
              const ItemIcon = item.icon;

              return (
                <div key={item.id} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() => handleDropdownTriggerClick(item.id)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer ${
                        isOpen
                          ? "text-blue-700 bg-blue-50 border border-blue-200/90 shadow-2xs font-bold"
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
                      }`}
                    >
                      {ItemIcon && (
                        <div className={`p-1 rounded-md shrink-0 flex items-center justify-center transition-colors ${item.iconBg || "bg-blue-100 text-blue-600"}`}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                        }`} 
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to || "/"}
                      onClick={() => handleLinkClick(item.to || "/")}
                      className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 hover:text-blue-600 hover:bg-blue-50/60"
                    >
                      {ItemIcon && (
                        <div className={`p-1 rounded-md shrink-0 flex items-center justify-center transition-colors ${item.iconBg || "bg-rose-100 text-rose-600"}`}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span>{item.label}</span>
                    </NavLink>
                  )}

                  {/* Dropdown Menu (Desktop) */}
                  {hasDropdown && isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-blue-950/10 p-2 grid grid-cols-1 gap-1 z-50 animate-in fade-in duration-200">
                      {item.dropdownItems?.map((subItem) => {
                        const SubIcon = subItem.icon;

                        return (
                          <NavLink
                            key={subItem.title}
                            to={subItem.to}
                            onClick={() => handleLinkClick(subItem.to)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                          >
                            <div className={`p-2 rounded-lg transition-all duration-200 shrink-0 ${subItem.iconBg || "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}>
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600">
                                {subItem.title}
                              </span>
                              {/* {subItem.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                                  {subItem.badge}
                                </span>
                              )} */}
                            </div>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation in Blue Theme */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl">
          <div className="px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
            
            {navigationItems.map((item) => {
              const hasDropdown = !!item.dropdownItems;
              const isDropdownOpen = mobileDropdownOpen === item.id;
              const ItemIcon = item.icon;

              return (
                <div key={item.id} className="space-y-1">
                  {hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-colors cursor-pointer ${
                          isDropdownOpen
                            ? "bg-blue-50 text-blue-700 border border-blue-200/80"
                            : "text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {ItemIcon && (
                            <div className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center ${item.iconBg || "bg-blue-100 text-blue-600"}`}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                          }`} 
                        />
                      </button>

                      {/* Collapsible Mobile Submenu */}
                      {isDropdownOpen && (
                        <div className="pl-2 pr-1 py-1.5 mt-1 space-y-1 bg-slate-50/70 rounded-xl border border-slate-200/60">
                          {item.dropdownItems?.map((subItem) => {
                            const SubIcon = subItem.icon;

                            return (
                              <NavLink
                                key={subItem.title}
                                to={subItem.to}
                                onClick={() => handleLinkClick(subItem.to)}
                                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors text-slate-700 hover:text-blue-600 hover:bg-white"
                              >
                                <div className={`p-1.5 rounded-md shrink-0 ${subItem.iconBg || "bg-blue-50 text-blue-600"}`}>
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                                  <span className="text-xs font-bold">{subItem.title}</span>
                                  {/* {subItem.badge && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                                      {subItem.badge}
                                    </span>
                                  )} */}
                                </div>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.to || "/"}
                      onClick={() => handleLinkClick(item.to || "/")}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-colors text-slate-800 hover:bg-slate-50"
                    >
                      {ItemIcon && (
                        <div className={`p-1.5 rounded-lg shrink-0 flex items-center justify-center ${item.iconBg || "bg-rose-100 text-rose-600"}`}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span>{item.label}</span>
                    </NavLink>
                  )}
                </div>
              );
            })}

            <div className="pt-2 text-center text-[10px] font-bold tracking-wider uppercase text-slate-400">
              BI Enterprise Operations Portal
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

