import React from 'react';
import { businessInfo, getPhoneUrl, getWhatsAppUrl } from '../config/businessInfo';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

interface FinalCTASectionProps {
  onOpenQuote: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#2E1A11] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D4A373] mb-3 block">
          Have a Project in Mind?
        </span>

        <h2 className="font-serif-wood text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 [text-wrap:balance]">
          Let's Build Something Beautiful with Wood.
        </h2>

        <p className="text-base sm:text-lg text-[#FAF7F2]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          From a single custom dining table to complete woodwork for your new apartment or house. Speak directly with master carpenter Sunil today.
        </p>

        {/* 3 Buttons: WhatsApp Us, Call Now, Get a Quote */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={getWhatsAppUrl("Hi Sunil Woodworks, I have a project in mind and would like to consult with you.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1b9d4c] transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={getPhoneUrl()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-[#1C110B] bg-white hover:bg-[#FAF7F2] transition-all shadow-md cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#8A532B]" />
            <span>Call Now ({businessInfo.phoneDisplay})</span>
          </a>

          <button
            type="button"
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-[#140C07] bg-[#C59B27] hover:bg-[#d8ab31] transition-all shadow-md cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 text-[#140C07]" />
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF7F2]/70">
          <span>Direct Carpenter Pricing</span>
          <span aria-hidden="true" className="text-[#C59B27]">·</span>
          <span>Free Site Measurement</span>
          <span aria-hidden="true" className="text-[#C59B27]">·</span>
          <span>Quality Wood & Plywood</span>
          <span aria-hidden="true" className="text-[#C59B27]">·</span>
          <span>Neat On-Site Fitting</span>
        </div>
      </div>
    </section>
  );
};
