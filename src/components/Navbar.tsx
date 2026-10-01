import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, MessageSquarePlus } from 'lucide-react';
import { businessInfo, getPhoneUrl, getWhatsAppUrl } from '../config/businessInfo';

interface NavbarProps {
  onOpenQuote: (serviceName?: string) => void;
  onOpenLookbook?: () => void;
  onOpenFeedback?: () => void;
  onOpenUpload?: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenLookbook, onOpenFeedback, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8DECE] py-3.5'
            : 'bg-[#FAF7F2]/90 backdrop-blur-xs border-b border-[#E8DECE]/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3-Zone Architecture */}
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Logo Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] rounded-lg"
              aria-label="Sunil Interior Work - Home"
            >
              <img
                src="/sunil-logo.jpg"
                alt="Sunil Interior Work Logo"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg object-contain border border-[#E8DECE] shadow-2xs group-hover:scale-105 transition-transform bg-[#FAF7F2]"
              />
              <div className="flex flex-col">
                <span className="font-serif-wood text-xl sm:text-2xl font-bold tracking-tight text-[#1C110B] group-hover:text-[#8A532B] transition-colors leading-none">
                  Sunil Interior Work
                </span>
                <span className="hidden sm:block text-[9px] tracking-wider text-[#8A532B] uppercase font-semibold mt-1">
                  Crafting Wood · Creating Spaces
                </span>
              </div>
            </a>

            {/* Zone 2: Clean text navigation links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-1 text-xs lg:text-sm tracking-wide transition-colors hover:text-[#8A532B] ${
                      isActive ? 'text-[#8A532B] font-semibold' : 'text-[#554C43]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#8A532B] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-3">
              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={onOpenFeedback}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8A532B] hover:text-[#5A3825] bg-white hover:bg-[#FAF7F2] border border-[#D4A373] rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Share your review or customer feedback"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-[#8A532B]" />
                  <span>Feedback</span>
                </button>
              )}

              <a
                href={getPhoneUrl()}
                className="hidden lg:flex items-center gap-2 text-xs font-semibold text-[#4A423B] hover:text-[#8A532B] transition-colors px-3 py-2 rounded-md hover:bg-[#F5EFEB]"
                title="Direct Phone Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="whitespace-nowrap font-mono">{businessInfo.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wide text-white bg-[#2E1A11] hover:bg-[#432719] active:bg-[#1E110A] rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] cursor-pointer"
              >
                Get a Quote
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-[#1C110B] hover:bg-[#F5EFEB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#FAF7F2] p-6 shadow-2xl flex flex-col justify-between border-l border-[#E8DECE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8DECE]">
                <div>
                  <span className="font-serif-wood text-xl font-bold text-[#1C110B]">Sunil Woodworks</span>
                  <p className="text-[11px] text-[#8A532B] font-medium tracking-wide">Custom Carpentry Services</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-[#4A423B] hover:bg-[#E8DECE]/40"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col py-6 gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-[#2E1A11] hover:bg-white hover:text-[#8A532B] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#8A532B]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8DECE] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Get a Free Quote
              </button>

              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenFeedback();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#8A532B] bg-white border border-[#D4A373] rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-[#8A532B]" />
                  <span>Give Feedback</span>
                </button>
              )}

              {onOpenLookbook && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLookbook();
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#8A532B] bg-white border border-[#E8DECE] rounded-lg hover:bg-[#F5EFEB] transition-colors cursor-pointer"
                >
                  Download Project Catalog (PDF)
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getPhoneUrl()}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#E8DECE] rounded-lg text-xs font-semibold text-[#1C110B] bg-white hover:bg-[#F5EFEB] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8A532B]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
