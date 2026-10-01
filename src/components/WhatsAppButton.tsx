import React, { useState } from 'react';
import { MessageCircle, X, MapPin, Ruler, Sparkles, ChevronRight } from 'lucide-react';
import { getWhatsAppUrl, businessInfo } from '../config/businessInfo';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts = [
    {
      label: 'Book Free Site Measurement',
      icon: Ruler,
      msg: 'Hi Sunil Woodworks, I would like to schedule a free site measurement and consultation for my home.',
    },
    {
      label: 'Wardrobe & Storage Estimate',
      icon: Sparkles,
      msg: 'Hi Sunil Woodworks, I would like to get a quote for custom floor-to-ceiling fitted wardrobes.',
    },
    {
      label: 'Modular Kitchen Woodwork',
      icon: Sparkles,
      msg: 'Hi Sunil Woodworks, I want to discuss waterproof plywood modular kitchen woodwork.',
    },
    {
      label: 'Custom Furniture / Woodwork',
      icon: MapPin,
      msg: 'Hi Sunil Woodworks, I would like to discuss custom furniture and interior woodwork for my home.',
    },
  ];

  return (
    <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Action Popover */}
      {isOpen && (
        <div className="mb-3 w-[290px] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-[#E8DECE] overflow-hidden animate-fadeIn text-[#1C110B]">
          {/* Header */}
          <div className="bg-[#2E1A11] p-4 text-white flex items-center justify-between border-b border-[#3E291C]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4 fill-current stroke-none" />
              </div>
              <div>
                <span className="text-xs font-bold block leading-tight">{businessInfo.name}</span>
                <span className="text-[10px] text-[#25D366] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
                  Direct Carpenter WhatsApp
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#FAF7F2]/80 hover:text-white p-1"
              aria-label="Close WhatsApp prompt menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick choices list */}
          <div className="p-3 bg-[#FAF7F2] space-y-1.5 text-xs">
            <p className="text-[11px] font-semibold text-[#8A532B] uppercase tracking-wider px-1 mb-1">
              How can Sunil help you?
            </p>
            {quickPrompts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={getWhatsAppUrl(item.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-white hover:bg-[#FAF7F2] rounded-xl border border-[#E8DECE] text-[#1C110B] transition-colors group hover:border-[#8A532B]"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#8A532B] group-hover:text-[#724422]" />
                    <span className="font-medium text-xs text-[#1C110B]">{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A532B] group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            })}
          </div>

          {/* Footer Direct link */}
          <div className="p-2.5 bg-white border-t border-[#E8DECE] text-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#25D366] hover:underline"
            >
              Or type a custom message →
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat with Sunil Woodworks on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
