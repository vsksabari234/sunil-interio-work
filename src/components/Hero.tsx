import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { businessInfo, getWhatsAppUrl } from '../config/businessInfo';
import { useProjectPhotos } from '../hooks/useProjectPhotos';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreWork: (category?: string) => void;
  onOpenLookbook?: () => void;
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onExploreWork,
}) => {
  const { getPhotoFor } = useProjectPhotos();

  const previewItems = [
    {
      id: 'tv-unit',
      category: 'tv-units',
      label: 'TV Unit',
      caption: 'Backlit Marble & Fluted Teak Wall Console',
    },
    {
      id: 'wardrobe',
      category: 'wardrobes',
      label: 'Wardrobe',
      caption: 'Teak Laminate with Diagonal Brass Inlays',
    },
    {
      id: 'kitchen',
      category: 'modular-kitchen',
      label: 'Kitchen',
      caption: 'Waterproof Plywood Modular Kitchen with Tandem Drawers',
    },
    {
      id: 'door',
      category: 'main-doors',
      label: 'Main Door',
      caption: 'Handcrafted Teak Main Entrance Door with Carved Relief',
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#140C07] text-white pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-[#3E291C]"
    >
      {/* Permanent Fixed Full-Width Hero Page Background Image - Never Changes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/assets/hero/hero-tv-unit-wide.jpg"
          alt="Sunil Woodworks Custom Carpentry Bengaluru"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center lg:object-[65%_center] brightness-105 contrast-105 transition-all duration-700 ease-out"
        />

        {/* Cinematic Gradient Vignettes: dark on left for text legibility, clear and vibrant on right for the TV unit woodwork */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0704]/95 via-[#0D0704]/60 sm:via-[#0D0704]/45 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0704] via-transparent to-[#0D0704]/30 z-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          
          {/* Editorial Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-[#D4A373]">
            <span>RT Nagar, Bangalore</span>
            <span aria-hidden="true" className="text-[#D4A373]/40">·</span>
            <span>Direct Workshop Carpentry</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="font-serif-wood text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              {businessInfo.tagline}
            </h1>
            <p className="text-lg sm:text-xl text-[#D4A373] font-medium leading-snug">
              Custom woodwork, fitted wardrobes, modular kitchens & bespoke furniture built to last.
            </p>
          </div>

          {/* Value Proposition */}
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            Led by master carpenter Sunil, our workshop crafts durable wooden furniture and custom interiors for homes across Bengaluru. Deal directly with the craftsmen who measure, build, and install your woodwork—with clear pricing, honest materials, and zero middlemen.
          </p>

          {/* Core Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-[#1C110B] bg-[#D4A373] hover:bg-[#e2b487] rounded-lg transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 text-[#1C110B]" />
            </button>

            <button
              type="button"
              onClick={() => onExploreWork()}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-lg transition-all backdrop-blur-md shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span>View Our Work</span>
            </button>

            <a
              href={getWhatsAppUrl("Hi Sunil Woodworks, I would like to consult with you about custom carpentry for my home.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Trust Markers */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-white tabular-nums">18+ Yrs</span>
              <span className="text-xs text-white/70 mt-0.5 block leading-tight">Bengaluru Joinery Experience</span>
            </div>
            <div>
              <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-white tabular-nums">90+</span>
              <span className="text-xs text-white/70 mt-0.5 block leading-tight">Homes Furnished & Fitted</span>
            </div>
            <div>
              <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-white tabular-nums">IS:710</span>
              <span className="text-xs text-white/70 mt-0.5 block leading-tight">100% Calibrated Marine Ply</span>
            </div>
            <div>
              <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-white tabular-nums">Direct</span>
              <span className="text-xs text-white/70 mt-0.5 block leading-tight">Workshop Pricing & Guarantee</span>
            </div>
          </div>

        </div>

        {/* Gallery Preview Bar with Gallery Button After The Photos */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/15 flex items-center justify-start gap-3.5 flex-wrap sm:flex-nowrap mr-auto">
          {/* 4 Preview Thumbnails for Gallery */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {previewItems.map((item) => {
              const thumbPhoto = getPhotoFor(item.id, item.category);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onExploreWork(item.category)}
                  className="relative rounded-xl overflow-hidden border-2 border-white/40 hover:border-[#D4A373] hover:scale-105 hover:shadow-xl transition-all cursor-pointer aspect-4/3 w-19 sm:w-24 md:w-26 shrink-0 group/thumb shadow-md bg-[#2E1A11]"
                  title={`Click to view ${item.label} in Gallery`}
                >
                  {thumbPhoto ? (
                    <img
                      src={thumbPhoto}
                      alt={item.label}
                      className="w-full h-full object-cover brightness-105 contrast-105 transition-transform duration-300 group-hover/thumb:scale-110"
                    />
                  ) : (
                    <div className="p-1 bg-[#2E1A11] text-center w-full h-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#D4A373] leading-tight">
                        {item.label}
                      </span>
                    </div>
                  )}

                  {/* High-legibility label overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-1 sm:p-1.5 pointer-events-none group-hover/thumb:from-black/95">
                    <span className="text-[10px] sm:text-[11px] font-semibold truncate leading-tight text-white group-hover/thumb:text-[#D4A373] transition-colors">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

            {/* Gallery Button Placed Right After The Photos */}
            <button
              type="button"
              onClick={() => onExploreWork()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#C59B27] hover:from-[#e2b487] hover:to-[#d4a838] text-[#1C110B] text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-102 cursor-pointer shrink-0 whitespace-nowrap group"
              title="Open full gallery with all 156 photos"
            >
              <Sparkles className="w-4 h-4 text-[#8A532B] group-hover:rotate-12 transition-transform" />
              <span>View All 156 Photos →</span>
            </button>
        </div>

      </div>
    </section>
  );
};
