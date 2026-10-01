import React from 'react';
import { Phone, MessageCircle, Star } from 'lucide-react';
import { getPhoneUrl, getWhatsAppUrl, businessInfo } from '../config/businessInfo';

interface MobileQuickBarProps {
  onOpenQuote?: () => void;
  onOpenLookbook?: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E8DECE] px-4 py-2 shadow-2xl flex items-center justify-around gap-2">
      {/* Call Button */}
      <a
        href={getPhoneUrl()}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#1C110B] hover:bg-[#FAF7F2] transition-colors"
      >
        <Phone className="w-4.5 h-4.5 text-[#8A532B] mb-0.5" />
        <span className="text-[11px] font-semibold">Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppUrl("Hi Sunil Woodworks, I would like to enquire about custom carpentry for my home.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 transition-colors"
      >
        <MessageCircle className="w-4.5 h-4.5 text-[#25D366] mb-0.5" />
        <span className="text-[11px] font-bold">WhatsApp</span>
      </a>

      {/* Client Reviews Link */}
      <a
        href="#reviews"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('reviews');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg text-[#1C110B] hover:bg-[#FAF7F2] transition-colors"
      >
        <Star className="w-4.5 h-4.5 text-[#C59B27] mb-0.5" />
        <span className="text-[11px] font-semibold">Reviews</span>
      </a>
    </div>
  );
};
