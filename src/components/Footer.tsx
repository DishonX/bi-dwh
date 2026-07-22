import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface FooterProps {
  onContactClick?: () => void;
  onLinkClick?: (section: string) => void;
}

export default function Footer({ onContactClick, onLinkClick }: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      // Automatically reset message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 5000);
    }
  };

  const handleNavClick = (sectionId: string, label: string) => {
    if (onLinkClick) {
      onLinkClick(label);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="fipsar-footer"
      className="relative w-full bg-[#023F9E] text-white pt-16 pb-8 overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-12 xl:px-24 2xl:px-36 w-full">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 xl:gap-12 items-start">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-block"
              >
                <img
                  id="footer-logo-img"
                  className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                  src="https://fipsar.com/assets/img/Fipsar-logo.jpg"
                  alt="Fipsar Logo"
                  referrerPolicy="no-referrer"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-[19px] sm:text-[21px] font-semibold tracking-tight">
              Solutions
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("services-and-solutions", "Our Services")}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("our-solutions", "Industries")}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  Industries
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("why-choose-us-section", "Partnerships")}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  Partnerships
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-[19px] sm:text-[21px] font-semibold tracking-tight">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleNavClick("who-we-are-section", "About Us")}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onContactClick) onContactClick();
                    const element = document.getElementById("services-and-solutions");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("featured-insights-section", "Resources")}
                  className="text-white/85 hover:text-white transition-colors duration-200 text-[15px] sm:text-[16px] text-left cursor-pointer"
                >
                  Resources
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Consult CTA */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-white text-[20px] sm:text-[23px] font-semibold tracking-tight leading-snug">
              Ready to Transform Together?
            </h3>
            <p className="text-white/90 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-md">
              Partner with us to solve complex challenges, drive innovation and create lasting impact.
            </p>
            
            {/* Consultation Action Form */}
            <form onSubmit={handleSubmit} className="w-full pt-2">
              {!submitted ? (
                <div className="flex flex-col sm:flex-row gap-3 items-stretch w-full max-w-md">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Business mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white text-neutral-800 placeholder-neutral-400 font-sans px-4 py-3 rounded-lg border-0 outline-none select-text text-[15px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0254D2] hover:bg-[#024bc2] text-white px-5 py-3 rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 transition-all duration-300 md:active:scale-98 cursor-pointer whitespace-nowrap border border-white/10 shadow-sm"
                  >
                    Schedule a consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#012d73]/60 border border-white/20 rounded-lg p-3 max-w-md text-[14px]"
                >
                  <p className="font-medium text-white">
                    Thank you! We've received your inquiry at <span className="underline">{email}</span>. One of our specialists will reach out to you shortly.
                  </p>
                </motion.div>
              )}
            </form>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-white/20 mt-12 mb-6" />

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-white/80 text-[12.5px] sm:text-[13.5px] gap-4">
          <div>
            Copyright © 2026 Fipsar . All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
            <a href="#privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white transition-colors duration-150">Terms & Conditions</a>
            <span>|</span>
            <a href="#cookie" className="hover:text-white transition-colors duration-150">Cookie Policy</a>
            <span>|</span>
            <a href="#disclaimer" className="hover:text-white transition-colors duration-150">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
