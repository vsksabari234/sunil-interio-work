import React from 'react';
import { businessInfo } from '../config/businessInfo';
import { MapPin, Compass, ShieldCheck, Wrench, Sparkles, Check, Camera, Hammer } from 'lucide-react';
import { useProjectPhotos } from '../hooks/useProjectPhotos';

interface AboutSectionProps {
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const { getPhotoFor } = useProjectPhotos();
  const workshopPhoto = '/assets/gallery/pooja-units/pooja-units-02.jpg';

  return (
    <section id="about" className="py-16 sm:py-24 bg-white text-[#1C110B] border-b border-[#E8DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
            <Hammer className="w-4 h-4 text-[#8A532B]" />
            <span>Master Carpenter Heritage</span>
          </div>
          <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-4 [text-wrap:balance]">
            Reliable Carpentry Built with Integrity & Skill
          </h2>
          <p className="text-base text-[#554C43] leading-relaxed">
            Sunil Woodworks is an independent carpentry and custom woodwork business based in RT Nagar, Bangalore, Karnataka. We specialize in custom-built furniture, fitted wardrobes, modular kitchens, and residential interior woodwork.
          </p>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Asset (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8DECE] bg-[#FAF7F2] shadow-md group">
              <div className="aspect-4/3 overflow-hidden bg-[#2E1A11] flex items-center justify-center">
                <img
                  src={workshopPhoto}
                  alt="Sunil Woodworks workshop joinery in Bengaluru"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E8DECE]">
                <p className="text-xs font-semibold text-[#1C110B]">
                  Accurate Measurements & Solid Joinery
                </p>
                <p className="text-[11px] text-[#6B6258] mt-0.5">
                  Crafted and pre-assembled by our carpentry team in our RT Nagar, Bangalore workshop.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B] mb-3">
                Our Carpentry Approach
              </h3>
              <p className="text-sm sm:text-base text-[#554C43] leading-relaxed mb-4">
                We believe that good woodwork should be strong, durable, and practical. Unlike mass-produced flatpack furniture made from weak particle boards that swell when exposed to moisture, our workshop uses solid wood and quality plywood.
              </p>
              <p className="text-sm sm:text-base text-[#554C43] leading-relaxed">
                Whether you prefer solid teak, hardwood frames, or waterproof plywood with laminates and natural veneers, we build each piece with strong joinery, square edges, and smooth finishes that stand the test of time.
              </p>
            </div>

            {/* Checklist of Real Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Direct carpenter consultation & advice",
                "Laser on-site measurements",
                "Solid joinery built for long-term use",
                "Quality plywood, laminates & hardware",
                "Neat on-site fitting & clean work",
                "Transparent pricing with no surprises",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1C110B]">
                  <Check className="w-4 h-4 text-[#8A532B] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DECE]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A532B] uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4 text-[#8A532B]" />
                <span>Our Service Commitment</span>
              </div>
              <p className="text-xs text-[#554C43] leading-relaxed">
                We work directly with homeowners, architects, and interior designers across residential apartments, independent villas, and offices. Master carpenter Sunil personally oversees every project from the first measurement to final door alignment.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
