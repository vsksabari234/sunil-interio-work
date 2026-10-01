import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { getWhatsAppUrl, businessInfo } from '../config/businessInfo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preSelectedService || 'Custom Furniture',
    scope: 'Single Item / Room',
    preferredMaterial: 'Solid Wood / Hardwood',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    return [
      `🪵 *New Carpentry Quote Request*`,
      ``,
      `👤 *Name:* ${formData.name.trim()}`,
      `📞 *Phone:* ${formData.phone.trim()}`,
      formData.email.trim() ? `📧 *Email:* ${formData.email.trim()}` : null,
      `🛠️ *Service Required:* ${formData.service}`,
      `📐 *Project Scope:* ${formData.scope}`,
      `🌲 *Material Preference:* ${formData.preferredMaterial}`,
      formData.message.trim()
        ? `📝 *Project Details / Sizes:* ${formData.message.trim()}`
        : `📝 *Requirements:* Please contact me for site measurements and quotation.`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = buildWhatsAppMessage();
    const targetUrl = getWhatsAppUrl(formattedMessage);
    setGeneratedWhatsAppUrl(targetUrl);

    setIsSubmitting(true);

    // Launch WhatsApp directly in a new tab
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback handled by on-screen direct link
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  const activeWhatsAppUrl = generatedWhatsAppUrl || getWhatsAppUrl(buildWhatsAppMessage());

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div
        className="relative bg-white text-[#1C110B] rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#E8DECE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6B6258] hover:text-[#1C110B] hover:bg-[#FAF7F2] transition-colors cursor-pointer border border-[#E8DECE]"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#E9F7EF] text-[#25D366] rounded-full flex items-center justify-center mx-auto border border-[#B9E6C9]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B]">
              Quote Details Ready for WhatsApp!
            </h3>
            <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed max-w-sm mx-auto">
              Your details have been formatted and directed to Master Carpenter Sunil on WhatsApp ({businessInfo.phoneDisplay}). If WhatsApp did not open automatically, tap below:
            </p>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={activeWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba5a] shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open in WhatsApp ({businessInfo.phoneDisplay})</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    service: preSelectedService || 'Custom Furniture',
                    scope: 'Single Item / Room',
                    preferredMaterial: 'Solid Wood / Hardwood',
                    message: '',
                  });
                }}
                className="w-full py-2.5 px-4 rounded-lg border border-[#E8DECE] text-[#554C43] hover:text-[#1C110B] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Send Another Quote Request
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A532B] block mb-1">
                Direct Carpenter Quotation
              </span>
              <h3 id="quote-modal-title" className="font-serif-wood text-2xl font-bold text-[#1C110B]">
                Request a Custom Woodwork Quote
              </h3>
              <p className="text-xs text-[#554C43] mt-1">
                Fill out the details below or message us directly on WhatsApp for an immediate response.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Full Name */}
              <div>
                <label className="block font-semibold text-[#1C110B] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border ${
                    formErrors.name ? 'border-red-500' : 'border-[#E8DECE]'
                  } text-[#1C110B] placeholder:text-[#9C8F80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-[11px] mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1C110B] mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border ${
                      formErrors.phone ? 'border-red-500' : 'border-[#E8DECE]'
                    } text-[#1C110B] placeholder:text-[#9C8F80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-[11px] mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-[#1C110B] mb-1">
                    Email <span className="text-[#9C8F80] text-[11px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-[#1C110B] placeholder:text-[#9C8F80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block font-semibold text-[#1C110B] mb-1">
                  Woodwork Requirement
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-[#1C110B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="Complete Home Woodwork">Complete Home Woodwork (2BHK / 3BHK / Villa)</option>
                  <option value="General Repair / Alteration">General Carpentry / Fitting Work</option>
                </select>
              </div>

              {/* Scope & Material Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1C110B] mb-1">
                    Project Scope
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-[#1C110B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                  >
                    <option value="Single Item / Room">Single Item or Room</option>
                    <option value="2BHK Woodwork">2BHK Full Woodwork</option>
                    <option value="3BHK Woodwork">3BHK Full Woodwork</option>
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Office / Commercial">Office / Commercial Space</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1C110B] mb-1">
                    Material Preference
                  </label>
                  <select
                    value={formData.preferredMaterial}
                    onChange={(e) => setFormData({ ...formData, preferredMaterial: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-[#1C110B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                  >
                    <option value="Solid Teak / Hardwood">Solid Teak / Natural Wood</option>
                    <option value="BWP Plywood + Laminate">BWP Marine Plywood + Laminate</option>
                    <option value="Plywood + Natural Veneer">Plywood + Natural Veneer Finish</option>
                    <option value="Acrylic / High Gloss">High-Gloss / Acrylic Kitchen Shutters</option>
                    <option value="Open to Recommendation">Open to Carpenter's Suggestion</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-semibold text-[#1C110B] mb-1">
                  Project Notes or Approximate Sizes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Need an 8ft x 7ft wardrobe with loft for master bedroom, sliding doors preferred."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] text-[#1C110B] placeholder:text-[#9C8F80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B]"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1caa4f] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {isSubmitting
                      ? 'Formatting & Opening WhatsApp...'
                      : `Send Quote Request via WhatsApp (${businessInfo.phoneDisplay})`}
                  </span>
                </button>
                <p className="text-[11px] text-center text-[#6B6258] flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
                  <span>Connects your project specifications directly with Master Sunil on WhatsApp.</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
