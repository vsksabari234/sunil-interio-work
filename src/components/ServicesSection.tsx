import React from 'react';
import { servicesData, ServiceItem } from '../data/servicesData';
import { ArrowRight, MessageSquare, Camera, Hammer } from 'lucide-react';
import { getWhatsAppUrl } from '../config/businessInfo';
import { useProjectPhotos } from '../hooks/useProjectPhotos';

interface ServicesSectionProps {
  onEnquire: (serviceTitle: string) => void;
  previewOnly?: boolean;
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onEnquire,
  onOpenUpload,
}) => {
  const { getPhotoFor } = useProjectPhotos();

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Services Header Matching Site Architecture */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
              <Hammer className="w-4 h-4 text-[#8A532B]" />
              <span>Custom Carpentry & Woodwork</span>
            </div>

            <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-3 [text-wrap:balance]">
              What We Build
            </h2>

            <p className="text-base text-[#554C43] leading-relaxed">
              Custom woodwork designed around your space, needs and style. Handcrafted furniture, modular kitchens, floor-to-ceiling wardrobes and bespoke home interiors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="text-xs font-mono text-[#554C43] bg-white px-3.5 py-2.5 rounded-lg border border-[#E8DECE] shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8A532B]" />
              <span><strong className="text-[#8A532B] font-bold">6 Core</strong> Woodwork Solutions</span>
            </div>
          </div>
        </div>

        {/* Clean Responsive 3-Column × 2-Row Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {servicesData.map((service: ServiceItem, index: number) => {
            const photoUrl = getPhotoFor(service.id, service.category) || service.image;
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#E8DECE]/80 shadow-[0_2px_12px_-2px_rgba(46,26,17,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(46,26,17,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 hover:border-[#8A532B]/40"
              >
                {/* Large Real-World Carpentry / Work Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#2E1A11]">
                  <img
                    src={photoUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-600 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Editorial Index Number Tag */}
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#2E1A11]/85 backdrop-blur-xs text-white text-[11px] font-mono tracking-widest font-semibold border border-white/20">
                    {indexNumber}
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-wood text-xl sm:text-2xl font-bold text-[#1C110B] mb-2 leading-snug group-hover:text-[#8A532B] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#554C43] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Architectural Specifications Pill-Free Specs */}
                    <div className="pt-3 border-t border-[#E8DECE]/80 text-[11px] text-[#6B6258] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A532B] font-semibold">Core:</span>
                        <span className="font-mono">IS:710 Marine Ply / Solid Teak</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A532B] font-semibold">Hardware:</span>
                        <span className="font-mono">Blum / Hettich Soft-Close</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar: Enquire Now / Get a Quote & WhatsApp */}
                  <div className="pt-4 border-t border-[#E8DECE]/80 mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onEnquire(service.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2E1A11] hover:bg-[#432719] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                    </button>

                    <a
                      href={getWhatsAppUrl(`Hi Sunil Woodworks, I would like to enquire about your ${service.title} service.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E9F7EF] text-[#554C43] hover:text-[#1F512F] border border-[#E8DECE] hover:border-[#B9E6C9] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
