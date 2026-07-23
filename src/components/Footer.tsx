import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1D70F5] text-white py-3 px-4 sm:px-8 text-xs font-sans border-t border-blue-500/40 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        {/* Branding & Operational Status */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-blue-200" />
            <span> BI DWH Operations</span>
          </div>
          <span className="hidden sm:inline text-blue-300/80">•</span>
          <span className="text-blue-100 font-medium">© 2026 Insmed Incorporated. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/25 font-semibold text-[11px] backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
