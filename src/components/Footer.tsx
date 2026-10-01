import React from 'react';
import {
  businessInfo,
  getPhoneUrl,
  getWhatsAppUrl,
  getEmailUrl,
} from '../config/businessInfo';
import { Phone, MessageCircle, Mail, MapPin, ArrowUp, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C110B] text-white pt-16 pb-12 border-t border-[#3D2619]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/sunil-logo.jpg"
                alt="Sunil Interior Work Logo"
                className="w-12 h-12 rounded-lg object-contain bg-[#FAF7F2] p-1 border border-white/10"
              />
              <div>
                <span className="font-serif-wood text-2xl font-bold tracking-tight text-white block leading-tight">
                  Sunil Interior Work
                </span>
                <span className="text-[10px] tracking-wider text-[#D4A373] uppercase block font-semibold">
                  Crafting Wood · Creating Spaces
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              Local carpentry and custom woodwork business in Bengaluru specializing in bespoke furniture, modular wardrobes, custom kitchens, doors, TV units, and on-site interior woodwork.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white/5 hover:bg-[#8A532B] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-white/5 hover:bg-[#8A532B] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-[#25D366]/20 hover:bg-[#25D366] flex items-center justify-center text-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A373] block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A373] block">
              Carpentry Services
            </span>
            <ul className="space-y-1.5 text-xs text-[#FAF7F2]/80">
              <li>Custom Solid Wood Furniture</li>
              <li>Floor-to-Ceiling Wardrobes & Walk-Ins</li>
              <li>Waterproof Modular Kitchens (IS:710)</li>
              <li>Hydraulic Bed Frames & Headboards</li>
              <li>Solid Teak Entrance Pivot Doors</li>
              <li>Floating TV Consoles & Slatted Walls</li>
              <li>Dining Credenzas & Glass Cabinets</li>
              <li>Architectural Partition Jaalis & Rafters</li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A373] block">
              Contact & Workshop
            </span>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>{businessInfo.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href={getPhoneUrl()} className="hover:text-white transition-colors font-medium">
                  {businessInfo.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href={getEmailUrl()} className="hover:text-white transition-colors">
                  {businessInfo.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#FAF7F2]/60">
                <span>Working: {businessInfo.workingHours.weekdays}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} Sunil Woodworks. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Domain: {businessInfo.domain}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#D4A373] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
