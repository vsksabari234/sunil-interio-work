import React, { useState } from 'react';
import { X, Download, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl, businessInfo } from '../config/businessInfo';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handleRequestCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadStarted(true);
  };

  const whatsappCatalogUrl = getWhatsAppUrl(
    `Hi Sunil Woodworks, I would like to receive your Woodwork Project Catalog & Ideas PDF on WhatsApp.`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookbook-title"
    >
      <div
        className="relative bg-white text-[#1C110B] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DECE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-[#1C110B] transition-colors cursor-pointer z-10 border border-[#E8DECE] shadow-sm"
          aria-label="Close catalog modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="relative aspect-16/7 bg-[#2E1A11] overflow-hidden flex flex-col justify-end p-6 border-b border-[#E8DECE]">
          <img
            src="/assets/gallery/tv-units/tv-units-01.jpg"
            alt="Sunil Carpentry Works authentic project portfolio"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
          <div className="relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D4A373] block mb-1">
              Project Portfolio & 150+ Authentic Works
            </span>
            <h3 id="lookbook-title" className="font-serif-wood text-2xl font-bold text-white leading-tight">
              Sunil Carpentry Works Project Catalog
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5 bg-[#FAF7F2]">
          {downloadStarted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto border border-[#25D366]/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-wood text-2xl font-bold text-[#1C110B]">
                Catalog Request Received!
              </h4>
              <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed max-w-sm mx-auto">
                We will share our photo catalog of executed wardrobes, kitchen woodwork, and custom furniture directly on your WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href={whatsappCatalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-md transition-colors w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp to Receive Catalog</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed">
                Browse our executed carpentry work across Bengaluru — including fitted wardrobes, modular kitchen woodwork, TV units, teak wood doors, and custom dining sets.
              </p>

              <div className="space-y-2 text-xs text-[#1C110B] bg-white p-4 rounded-xl border border-[#E8DECE]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A532B] shrink-0" />
                  <span>Real project photos with dimension & layout references</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A532B] shrink-0" />
                  <span>Internal wardrobe organizers & storage configurations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8A532B] shrink-0" />
                  <span>Quality hardware & soft-close fitting suggestions</span>
                </div>
              </div>

              {/* Form to receive or direct WhatsApp */}
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappCatalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Delivery via WhatsApp</span>
                </a>

                <div className="relative text-center my-2">
                  <span className="text-[10px] uppercase font-semibold text-[#8A532B] bg-[#FAF7F2] px-2 relative z-10">
                    Or Enter Details Below
                  </span>
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E8DECE]" />
                  </div>
                </div>

                <form onSubmit={handleRequestCatalog} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Enter your WhatsApp number or Email"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#9C8F80]"
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#8A532B] hover:bg-[#724422] rounded-lg transition-colors cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>Get Project Catalog</span>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
