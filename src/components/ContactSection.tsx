import React, { useState } from 'react';
import {
  businessInfo,
  getPhoneUrl,
  getWhatsAppUrl,
  getEmailUrl,
} from '../config/businessInfo';
import { servicesData } from '../data/servicesData';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceRequired: initialService || 'Custom Furniture',
    location: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  // Update if initialService changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceRequired: initialService }));
    }
  }, [initialService]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your phone number.';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please share a brief description of your project or requirements.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Save lead to local storage for persistence across reloads
    try {
      const storedLeads = JSON.parse(localStorage.getItem('sunil_woodworks_enquiries') || '[]');
      storedLeads.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('sunil_woodworks_enquiries', JSON.stringify(storedLeads));
    } catch {
      // safe fallback
    }

    // Format clean, professional WhatsApp enquiry message
    const formattedMsg = [
      `*New Carpentry Enquiry - Sunil Woodworks*`,
      ``,
      `👤 *Name:* ${formData.name.trim()}`,
      `📞 *Phone:* ${formData.phone.trim()}`,
      formData.location.trim() ? `📍 *Location:* ${formData.location.trim()}` : null,
      formData.email.trim() ? `✉️ *Email:* ${formData.email.trim()}` : null,
      `🪵 *Service Required:* ${formData.serviceRequired}`,
      ``,
      `📝 *Project Details:*`,
      `${formData.message.trim()}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const targetWhatsAppUrl = getWhatsAppUrl(formattedMsg);
    setWhatsappLink(targetWhatsAppUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Open in a new tab so the app iframe is not replaced by WhatsApp
      try {
        window.open(targetWhatsAppUrl, '_blank', 'noopener,noreferrer');
      } catch (e) {
        // Handled gracefully by the visible WhatsApp button
      }
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2">
            Get in Touch
          </div>
          <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-4 [text-wrap:balance]">
            Let's Discuss Your Woodwork Project
          </h2>
          <p className="text-base text-[#554C43] leading-relaxed">
            Have a custom furniture design, wardrobe requirement, or full-home woodwork plan? Reach out for a free consultation, site measurement, or visit our local workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Workshop Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={getWhatsAppUrl("Hi Sunil Woodworks, I would like to enquire about your carpentry services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={getPhoneUrl()}
                className="flex items-center justify-center gap-2 p-3.5 bg-[#2E1A11] hover:bg-[#432719] text-white rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#D4A373]" />
                <span>Call Directly</span>
              </a>
            </div>

            {/* Structured Details Card */}
            <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#E8DECE] shadow-sm space-y-6">
              
              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] flex items-center justify-center text-[#8A532B] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#8A532B] uppercase tracking-wider block">Phone & WhatsApp</span>
                  <a href={getPhoneUrl()} className="text-sm font-bold text-[#1C110B] hover:text-[#8A532B] block transition-colors font-mono">
                    {businessInfo.phoneDisplay}
                  </a>
                  <span className="text-xs text-[#6B6258]">Direct line for project estimates and queries</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] flex items-center justify-center text-[#8A532B] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#8A532B] uppercase tracking-wider block">Email Inquiries</span>
                  <a href={getEmailUrl()} className="text-sm font-semibold text-[#1C110B] hover:text-[#8A532B] block transition-colors">
                    {businessInfo.email}
                  </a>
                  <span className="text-xs text-[#6B6258]">Send floor plans, sketches, or reference photos</span>
                </div>
              </div>

              {/* Workshop Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] flex items-center justify-center text-[#8A532B] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#8A532B] uppercase tracking-wider block">Workshop Location</span>
                  <address className="not-italic text-xs sm:text-sm text-[#1C110B] font-medium leading-relaxed">
                    {businessInfo.address.full}
                  </address>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E8DECE] flex items-center justify-center text-[#8A532B] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#8A532B] uppercase tracking-wider block">Working Hours</span>
                  <p className="text-xs text-[#1C110B] font-medium">
                    {businessInfo.workingHours.weekdays}
                  </p>
                  <p className="text-xs text-[#6B6258]">
                    {businessInfo.workingHours.sunday}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-9 rounded-xl border border-[#E8DECE] shadow-sm">
              
              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#E9F7EF] text-[#25D366] rounded-full flex items-center justify-center mx-auto border border-[#B9E6C9]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B]">
                    Enquiry Sent to WhatsApp!
                  </h3>
                  <p className="text-sm text-[#554C43] max-w-md mx-auto leading-relaxed">
                    Your details have been formatted and directed to Master Carpenter Sunil on WhatsApp ({businessInfo.phoneDisplay}). If WhatsApp did not open automatically, click the button below:
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappLink || getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
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
                          serviceRequired: 'Custom Furniture',
                          location: '',
                          message: '',
                        });
                      }}
                      className="text-xs font-semibold text-[#8A532B] hover:underline cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B] mb-1">
                      Request a Project Consultation or Free Quote
                    </h3>
                    <p className="text-xs text-[#6B6258] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse"></span>
                      <span>Submitting connects you directly to our WhatsApp ({businessInfo.phoneDisplay}).</span>
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1C110B] mb-1">
                        Full Name <span className="text-[#8A532B]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Ramesh Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#8A7968] ${
                          formErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8DECE]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1C110B] mb-1">
                        Phone Number <span className="text-[#8A532B]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="e.g. +91 98450 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#8A7968] ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8DECE]'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1C110B] mb-1">
                        Email Address <span className="text-[#6B6258] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#8A7968] ${
                          formErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8DECE]'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-location" className="block text-xs font-semibold text-[#1C110B] mb-1">
                        Project Location / Locality
                      </label>
                      <input
                        id="contact-location"
                        type="text"
                        placeholder="e.g. Indiranagar, Whitefield, HSR..."
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#8A7968]"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-[#1C110B] mb-1">
                      Service Required <span className="text-[#8A532B]">*</span>
                    </label>
                    <select
                      id="contact-service"
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] cursor-pointer"
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Home Woodwork Package">Full Home Woodwork Package</option>
                      <option value="Other Custom Requirement">Other Custom Requirement</option>
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1C110B] mb-1">
                      Project Details / Dimensions / Timeline <span className="text-[#8A532B]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Please share details such as number of rooms, approximate dimensions, preferred wood or finishes (laminate, veneer, solid wood), and target timeframe..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#8A7968] resize-y ${
                        formErrors.message ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8DECE]'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] active:bg-[#1E110A] disabled:opacity-90 rounded-lg transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] cursor-pointer"
                    >
                      <Send
                        className={`w-4 h-4 text-[#D4A373] transition-all duration-300 ${
                          isSubmitting
                            ? 'animate-flyAway'
                            : 'group-hover:translate-x-1 group-hover:-translate-y-0.5'
                        }`}
                      />
                      <span>{isSubmitting ? 'Opening WhatsApp...' : `Send Enquiry via WhatsApp (${businessInfo.phoneDisplay})`}</span>
                    </button>
                    <p className="text-[11px] text-center text-[#6B6258] mt-2.5 flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Directly sends your message to Master Carpenter Sunil on WhatsApp.</span>
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
