import React, { useState } from 'react';
import { ArrowRight, Compass, MessageCircle, Camera } from 'lucide-react';
import { businessInfo, getPhoneUrl, getWhatsAppUrl } from '../config/businessInfo';
import { useProjectPhotos } from '../hooks/useProjectPhotos';
import { CarpentryBlueprintPlaceholder } from './CarpentryBlueprintPlaceholder';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreWork: () => void;
  onOpenLookbook?: () => void;
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onExploreWork,
  onOpenLookbook,
  onOpenUpload,
}) => {
  const { getPhotoFor } = useProjectPhotos();

  const heroShowcases = [
    {
      id: 'tv-unit',
      category: 'tv-units',
      label: 'TV Unit & Acoustic Slats',
      caption: 'Backlit Marble & Fluted Teak Wall Console',
      location: 'Completed Installation · Bengaluru',
      specs: 'Wall TV Unit with Marble Panel & Concealed LED Channels',
    },
    {
      id: 'wardrobe',
      category: 'wardrobes',
      label: 'Fitted Sliding Wardrobe',
      caption: 'Teak Laminate with Diagonal Brass Inlays',
      location: 'Master Bedroom · Indiranagar',
      specs: 'Floor-to-Ceiling 3-Door Sliding Wardrobe with Overhead Lofts',
    },
    {
      id: 'kitchen',
      category: 'kitchens',
      label: 'Modular Kitchen',
      caption: 'Waterproof Plywood Modular Kitchen with Tandem Drawers',
      location: 'Island Kitchen · Sadashivanagar',
      specs: '100% BWP Marine Ply Carcass & High-Gloss Shutters',
    },
    {
      id: 'door',
      category: 'doors',
      label: 'Teak Entrance Door',
      caption: 'Handcrafted Teak Main Entrance Door with Carved Relief',
      location: 'Villa Entrance · Whitefield',
      specs: 'Solid Seasoned Teak Wood with Traditional Joinery',
    },
  ];

  const [activeShowcase, setActiveShowcase] = useState(0);
  const current = heroShowcases[activeShowcase];
  const activePhoto = getPhotoFor(current.id, current.category);

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authentic Brand Messaging (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Unboxed Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A532B]">
              <span>RT Nagar, Bangalore</span>
              <span aria-hidden="true" className="text-[#8A532B]/40">·</span>
              <span>Direct Workshop Carpentry</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif-wood text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C110B] leading-[1.08] [text-wrap:balance]">
                {businessInfo.tagline}
              </h1>
              <p className="text-lg sm:text-xl text-[#8A532B] font-medium leading-snug">
                Custom woodwork, fitted wardrobes, modular kitchens & bespoke furniture built to last.
              </p>
            </div>

            {/* Authentic Value Proposition */}
            <p className="text-base text-[#554C43] leading-relaxed max-w-2xl">
              Led by master carpenter Sunil, our workshop crafts durable wooden furniture and custom interiors for homes across Bengaluru. Deal directly with the craftsmen who measure, build, and install your woodwork—with clear pricing, honest materials, and zero middlemen.
            </p>

            {/* Core Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#2E1A11] hover:bg-[#432719] rounded-lg transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1C110B] bg-white hover:bg-[#F5EFEB] border border-[#E8DECE] rounded-lg transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] cursor-pointer"
              >
                <span>View Our Work</span>
              </button>

              <a
                href={getWhatsAppUrl("Hi Sunil Woodworks, I would like to consult with you about custom carpentry for my home.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#1F512F] bg-[#E9F7EF] hover:bg-[#d8f3e5] border border-[#B9E6C9] rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Claim-to-Proof Adjacency: Clean Unboxed Trust Markers */}
            <div className="pt-6 border-t border-[#E8DECE] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] tabular-nums">18+ Yrs</span>
                <span className="text-xs text-[#6B6258] mt-0.5 block leading-tight">Bengaluru Joinery Experience</span>
              </div>
              <div>
                <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] tabular-nums">90+</span>
                <span className="text-xs text-[#6B6258] mt-0.5 block leading-tight">Homes Furnished & Fitted</span>
              </div>
              <div>
                <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] tabular-nums">IS:710</span>
                <span className="text-xs text-[#6B6258] mt-0.5 block leading-tight">100% Calibrated Marine Ply</span>
              </div>
              <div>
                <span className="block font-serif-wood text-2xl sm:text-3xl font-bold text-[#1C110B] tabular-nums">Direct</span>
                <span className="text-xs text-[#6B6258] mt-0.5 block leading-tight">Workshop Pricing & Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Real Project Switcher (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8DECE] bg-white shadow-xl">
              
              {/* Main Active Project Visual */}
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#2E1A11]">
                {activePhoto ? (
                  <div className="relative w-full h-full">
                    <img
                      key={current.id}
                      src={activePhoto}
                      alt={current.caption}
                      className="w-full h-full object-cover object-center animate-fadeIn"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4A373] mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#C59B27] inline-block" />
                        <span>{current.location}</span>
                      </div>
                      <p className="font-serif-wood text-lg sm:text-xl font-bold text-white leading-snug">
                        {current.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <CarpentryBlueprintPlaceholder
                    category={current.category}
                    title={current.caption}
                    material={current.specs}
                    onUploadClick={() => onOpenUpload && onOpenUpload(current.category, current.id)}
                  />
                )}
              </div>

              {/* Real Project Thumbnails Selector */}
              <div className="p-3 bg-[#FAF7F2] border-t border-[#E8DECE]">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A532B]">
                    Portfolio Highlights (Click to Preview):
                  </span>
                  <span className="text-[10px] text-[#6B6258] font-mono">
                    {activeShowcase + 1} / {heroShowcases.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {heroShowcases.map((item, idx) => {
                    const thumbPhoto = getPhotoFor(item.id, item.category);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveShowcase(idx)}
                        className={`relative rounded-lg overflow-hidden border transition-all cursor-pointer aspect-4/3 flex items-center justify-center ${
                          activeShowcase === idx
                            ? 'border-[#8A532B] ring-2 ring-[#8A532B]/40 scale-102 bg-[#2E1A11]'
                            : 'border-[#E8DECE] bg-[#FAF7F2] opacity-80 hover:opacity-100'
                        }`}
                        title={item.label}
                      >
                        {thumbPhoto ? (
                          <img
                            src={thumbPhoto}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="p-1 text-center">
                            <span className="text-[10px] font-bold text-[#8A532B] block line-clamp-2 leading-tight">
                              {item.label}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick direct contact strip under hero image */}
              <div className="p-3.5 bg-white border-t border-[#E8DECE] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#554C43]">
                  <Compass className="w-4 h-4 text-[#8A532B] shrink-0" />
                  <span className="truncate">Workshop: Timber Yard Layout, Bengaluru</span>
                </div>
                <a
                  href={getPhoneUrl()}
                  className="font-bold text-[#8A532B] hover:text-[#2E1A11] shrink-0 transition-colors"
                >
                  Call: {businessInfo.phoneDisplay}
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
