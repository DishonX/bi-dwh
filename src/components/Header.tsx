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
  Sparkles
} from "lucide-react";

// Types for navigation items
interface DropdownItem {
  title: string;
  description: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  to?: string;
  dropdownItems?: DropdownItem[];
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [_scrolled, setScrolled] = useState(false);
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

  // Navigation config (exactly matching your list, mapped with react-router paths)
  const navigationItems: NavItem[] = [
    {
      id: "Operations",
      label: "Operations",
      dropdownItems: [
        {
          title: "Access Management",
          description: "High-grade security, collaboration spaces, and compliance modules.",
          to: "/access-management",
          icon: ShieldCheck,
        },
        {
          title: "Report an Incident",
          description: "Robust AI reasoning and model fine-tuning directly in your codebase.",
          to: "/report-an-incident",
          icon: Terminal,
          badge: "New",
        },
        {
          title: "Change Management",
          description: "Real-time metric streams, query auditing, and structured reports.",
          to: "/change-management",
          icon: BarChart3,
        },
        {
          title: "Release Management",
          description: "Connect your entire app workspace with zero-latency triggers.",
          to: "/release_management",
          icon: Cpu,
        },
        {
          title: "Inventory of Data and Databoards",
          description: "Connect your entire app workspace with zero-latency triggers.",
          to: "/data-inventory",
          icon: Activity,
        },
      ]
    },
    {
      id: "resources",
      label: "Audit Schedule and Activities",
      dropdownItems: [
        {
          title: "Sox Audit and activities",
          description: "Comprehensive integration guides, fast tutorials, and references.",
          to: "/sox-audit",
          icon: BookOpen,
        },
        {
          title: "GxP",
          description: "Access our expert support team and extensive self-help archives.",
          to: "/gxp",
          icon: HelpCircle,
        }
      ]
    },
    {
      id: "pricing",
      label: "Emergency Contact",
      to: "/emergency-contact"
    }
  ];

  const handleDropdownTriggerClick = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleMobileDropdown = (id: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === id ? null : id);
  };

  return (
    <header 
      ref={headerRef}
      className="relative z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand area */}
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer focus:outline-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 dark:shadow-none">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
              BI DWH Operations
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const hasDropdown = !!item.dropdownItems;
              const isOpen = activeDropdown === item.id;

              return (
                <div key={item.id} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() => handleDropdownTriggerClick(item.id)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                        isOpen
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      {item.label}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-indigo-500" : "text-zinc-400"
                        }`} 
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to || "/"}
                      className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {/* Dropdown Menu (Desktop) */}
                  {hasDropdown && isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/40 dark:shadow-none p-4 grid grid-cols-1 gap-2 z-50 animate-in fade-in duration-200">
                      {item.dropdownItems?.map((subItem) => {
                        const SubIcon = subItem.icon;

                        return (
                          <NavLink
                            key={subItem.title}
                            to={subItem.to}
                            onClick={() => setActiveDropdown(null)}
                            className={({ isActive }) => `flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                              isActive
                                ? "bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            {({ isActive }) => (
                              <>
                                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                  isActive
                                    ? "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                                }`}>
                                  <SubIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                                    <span className={isActive ? "text-indigo-900 dark:text-indigo-300" : "text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"}>
                                      {subItem.title}
                                    </span>
                                    {/* {subItem.badge && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/40">
                                        {subItem.badge}
                                      </span>
                                    )} */}
                                  </div>
                                </div>
                              </>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Actions - Simplified for Information Site */}
          {/* <div className="hidden md:flex items-center space-x-3">
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
              VERTEX INFO HUB
            </span>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-lg">
          <div className="px-4 py-4 space-y-3 max-h-[85vh] overflow-y-auto">
            
            {navigationItems.map((item) => {
              const hasDropdown = !!item.dropdownItems;
              const isDropdownOpen = mobileDropdownOpen === item.id;

              return (
                <div key={item.id} className="space-y-1">
                  {hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileDropdown(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                          isDropdownOpen
                            ? "bg-zinc-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180 text-indigo-500" : "text-zinc-400"
                          }`} 
                        />
                      </button>

                      {/* Collapsible Mobile Submenu */}
                      {isDropdownOpen && (
                        <div className="pl-3 pr-1 py-1 mt-1 space-y-1 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl">
                          {item.dropdownItems?.map((subItem) => {
                            const SubIcon = subItem.icon;

                            return (
                              <NavLink
                                key={subItem.title}
                                to={subItem.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => `w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                                  isActive
                                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 font-medium"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                                }`}
                              >
                                {({ isActive }) => (
                                  <>
                                    <div className={`p-1.5 rounded-md ${
                                      isActive 
                                        ? "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400" 
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                    }`}>
                                      <SubIcon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-semibold">{subItem.title}</span>
                                        {/* {subItem.badge && (
                                          <span className="text-[9px] px-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                                            {subItem.badge}
                                          </span>
                                        )} */}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.to || "/"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `w-full flex items-center px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              );
            })}

            {/* Simplified footer indicator in mobile menu */}
            <div className="pt-2 text-center text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              VERTEX INFORMATION PORTAL
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
