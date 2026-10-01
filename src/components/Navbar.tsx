import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowRight, MessageSquarePlus } from 'lucide-react';
import { businessInfo, getPhoneUrl, getWhatsAppUrl } from '../config/businessInfo';

interface NavbarProps {
  onOpenQuote: (serviceName?: string) => void;
  onOpenLookbook?: () => void;
  onOpenFeedback?: () => void;
  onOpenUpload?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToHome?: (sectionId?: string) => void;
  currentPage?: 'home' | 'gallery';
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuote, 
  onOpenLookbook, 
  onOpenFeedback, 
  onNavigateToGallery,
  onNavigateToHome,
  currentPage = 'home',
  activeSection = 'home' 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling and enable smooth scrolling inside mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', isHome: true },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery-page', isGallery: true, badge: '156' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isGallery?: boolean) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isGallery || href === '#gallery-page' || href === '#all-photos') {
      if (onNavigateToGallery) {
        onNavigateToGallery();
        return;
      }
    }

    if (currentPage === 'gallery') {
      const sectionId = href.replace('#', '');
      if (onNavigateToHome) {
        onNavigateToHome(sectionId);
        return;
      }
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] rounded-lg py-0.5"
              aria-label="Sunil Interior Work - Home"
            >
              <img
                src="/sunil-logo-transparent.png"
                alt="Sunil Interior Work - Woodcraft Logo"
                className="h-11 sm:h-13 w-auto max-w-[170px] sm:max-w-[200px] object-contain group-hover:scale-105 transition-transform drop-shadow-xs"
              />
            </a>

            {/* Zone 2: Clean text navigation links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = (currentPage === 'gallery' && link.isGallery) || 
                  (currentPage === 'home' && activeSection === link.href.replace('#', ''));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.isGallery)}
                    className={`relative py-1 text-xs lg:text-sm tracking-wide transition-colors hover:text-[#8A532B] flex items-center gap-1.5 ${
                      isActive ? 'text-[#8A532B] font-semibold' : 'text-[#554C43]'
                    } ${link.isGallery ? 'font-bold text-[#8A532B]' : ''}`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                        isActive ? 'bg-[#8A532B] text-white' : 'bg-[#E8DECE]/80 text-[#8A532B]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
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
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E8DECE] overflow-y-auto overscroll-contain z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 flex flex-col min-h-full justify-between pb-32">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#E8DECE]">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/sunil-logo-transparent.png"
                      alt="Sunil Woodworks"
                      className="h-8 w-auto object-contain"
                    />
                    <div>
                      <span className="font-serif-wood text-base font-bold text-[#1C110B] block leading-tight">Sunil Woodworks</span>
                      <p className="text-[10px] text-[#8A532B] font-medium tracking-wide">Custom Carpentry Services</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-[#4A423B] hover:bg-[#E8DECE]/60 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col py-4 gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.isGallery)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                        link.isGallery 
                          ? 'bg-[#8A532B]/10 text-[#8A532B] font-bold border border-[#8A532B]/30' 
                          : 'text-[#2E1A11] hover:bg-white hover:text-[#8A532B]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#8A532B] text-white">
                            {link.badge} Photos
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8A532B]" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-5 border-t border-[#E8DECE] space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full py-3 text-center text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] active:bg-[#1a0e09] rounded-lg transition-colors cursor-pointer shadow-sm"
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
                    className="w-full py-2.5 text-center text-xs font-semibold text-[#8A532B] bg-white border border-[#D4A373] rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-[#8A532B]" />
                    <span>Give Feedback</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={getPhoneUrl()}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#E8DECE] rounded-lg text-xs font-semibold text-[#1C110B] bg-white hover:bg-[#F5EFEB] transition-colors shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8A532B]" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
