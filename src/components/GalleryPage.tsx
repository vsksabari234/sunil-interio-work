import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  FileDown, 
  Maximize2, 
  ZoomIn, 
  ZoomOut,
  SlidersHorizontal,
  Layers,
  CheckCircle2,
  Calendar,
  MapPin,
  Ruler
} from 'lucide-react';
import { 
  allGalleryPhotos, 
  allGalleryCategories, 
  GalleryPhotoItem, 
  GalleryPageCategoryId 
} from '../data/allGalleryPhotos';
import { businessInfo, getWhatsAppUrl, getPhoneUrl } from '../config/businessInfo';

interface GalleryPageProps {
  onNavigateHome: () => void;
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenLookbook?: () => void;
  initialCategory?: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigateHome,
  onOpenQuote,
  onOpenLookbook,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryPageCategoryId>(() => {
    if (initialCategory && allGalleryCategories.some(c => c.id === initialCategory)) {
      return initialCategory as GalleryPageCategoryId;
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewColumns, setViewColumns] = useState<'normal' | 'large'>('normal');

  // Sync category if initialCategory changes
  useEffect(() => {
    if (initialCategory && allGalleryCategories.some(c => c.id === initialCategory)) {
      setSelectedCategory(initialCategory as GalleryPageCategoryId);
    }
  }, [initialCategory]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Filter photos based on category & search query
  const filteredPhotos = useMemo(() => {
    return allGalleryPhotos.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.woodType.toLowerCase().includes(q) ||
        item.room.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
        setIsZoomed(false);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const activeLightboxPhoto: GalleryPhotoItem | null =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] || null : null;

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    setIsZoomed(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C110B] flex flex-col font-sans">
      
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8DECE] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Back to Home & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#8A532B] hover:text-[#5A3825] bg-[#FAF7F2] hover:bg-[#F3ECE4] border border-[#E8DECE] transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="h-6 w-px bg-[#E8DECE] hidden sm:block" />

            <div 
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img
                src="/sunil-logo-transparent.png"
                alt="Sunil Woodworks"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden md:block">
                <span className="font-serif-wood text-base font-bold text-[#1C110B] block leading-tight">Sunil Woodworks</span>
                <span className="text-[10px] text-[#8A532B] font-medium tracking-wide">Bengaluru Carpentry Archive</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenLookbook && (
              <button
                type="button"
                onClick={onOpenLookbook}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#8A532B] bg-white border border-[#E8DECE] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}

            <a
              href={getWhatsAppUrl("Hi Sunil Woodworks, I was browsing your 156-photo gallery page and want to enquire about custom carpentry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] rounded-lg transition-all shadow-sm cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        
        {/* Hero Title Section */}
        <section className="bg-gradient-to-b from-white to-[#FAF7F2] border-b border-[#E8DECE] py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A532B]/10 text-[#8A532B] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Project Archive · 156 Authentic Photos</span>
              </div>

              <h1 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight [text-wrap:balance]">
                Our Works Gallery
              </h1>

              <p className="mt-3 text-sm sm:text-base text-[#554C43] leading-relaxed">
                Explore all 156 documented residential carpentry projects built and installed across Bengaluru by Sunil Woodworks. From solid teak entrance doors to modular kitchens, floor-to-ceiling wardrobes, and acoustic TV consoles.
              </p>

              {/* Live Search Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A532B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by woodwork type (e.g. Teak, Wardrobe, Kitchen, Door, Fluted, Marble)..."
                    className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E8DECE] rounded-xl text-xs sm:text-sm text-[#1C110B] placeholder:text-[#8C827A] focus:outline-none focus:ring-2 focus:ring-[#8A532B]/30 focus:border-[#8A532B] shadow-2xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#8C827A] hover:text-[#1C110B]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* View Column Controls */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto bg-white p-1 rounded-xl border border-[#E8DECE] shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewColumns('normal')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      viewColumns === 'normal'
                        ? 'bg-[#2E1A11] text-white'
                        : 'text-[#554C43] hover:text-[#1C110B]'
                    }`}
                  >
                    Compact (4 Col)
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewColumns('large')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      viewColumns === 'large'
                        ? 'bg-[#2E1A11] text-white'
                        : 'text-[#554C43] hover:text-[#1C110B]'
                    }`}
                  >
                    Large Cards
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Category Tabs Filter Bar */}
        <section className="sticky top-16 sm:top-18 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DECE] py-3.5 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
              {allGalleryCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8A532B] text-white shadow-xs'
                        : 'bg-white text-[#554C43] border border-[#E8DECE] hover:border-[#D4A373] hover:text-[#1C110B]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isSelected ? 'bg-white/20 text-white font-bold' : 'bg-[#FAF7F2] text-[#8A532B]'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* Active Filter Status & Count */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E8DECE]">
            <p className="text-xs sm:text-sm font-medium text-[#554C43]">
              Showing <span className="font-bold text-[#1C110B]">{filteredPhotos.length}</span> of 156 authentic photos
              {selectedCategory !== 'all' && (
                <span className="text-[#8A532B] font-semibold"> in {allGalleryCategories.find(c => c.id === selectedCategory)?.label}</span>
              )}
              {searchQuery && (
                <span className="text-[#8A532B]"> matching "{searchQuery}"</span>
              )}
            </p>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#8A532B] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DECE] p-8">
              <Search className="w-10 h-10 text-[#8C827A] mx-auto mb-3" />
              <h3 className="font-serif-wood text-xl font-bold text-[#1C110B]">No photos found</h3>
              <p className="text-sm text-[#554C43] mt-1 max-w-md mx-auto">
                No photos matched "{searchQuery}". Try searching for teak, wardrobe, kitchen, doors, or fluted panels.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#8A532B] hover:bg-[#724422] cursor-pointer"
              >
                View All 156 Photos
              </button>
            </div>
          ) : (
            <div className={`grid gap-3 sm:gap-4.5 ${
              viewColumns === 'normal' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative rounded-xl overflow-hidden border border-[#E8DECE] hover:border-[#D4A373] shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer bg-[#FAF7F2] aspect-4/3"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay & Hover Expand Icon + Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 sm:p-3.5">
                    {/* Top Category Badge */}
                    <div className="self-start">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide bg-black/60 backdrop-blur-xs text-[#D4A373] border border-white/20">
                        {photo.categoryLabel}
                      </span>
                    </div>

                    {/* Bottom Title on Hover */}
                    <div>
                      <h4 className="font-serif-wood text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] text-[#D4A373] mt-0.5 flex items-center gap-1 font-mono">
                        <Maximize2 className="w-3 h-3" />
                        <span>Click to view full photo</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* Bottom Conversion Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#2E1A11] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-[#3E291C]">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A373] block mb-2">
                Custom Joinery & Interior Carpentry
              </span>
              <h2 className="font-serif-wood text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Want similar custom woodwork crafted for your home?
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                Send us any photo from this gallery or your own floor plan. Master Sunil will personally provide material recommendations, timber species options, and an honest quote.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-[#1C110B] bg-[#D4A373] hover:bg-[#e2b487] rounded-lg transition-all shadow-md cursor-pointer"
                >
                  Request a Free Quote
                </button>

                <a
                  href={getWhatsAppUrl("Hi Sunil Woodworks, I was browsing your full gallery and would like a quote for custom carpentry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={getPhoneUrl()}
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Call {businessInfo.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Full-Screen Interactive Lightbox */}
      {activeLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/40 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[11px] font-mono text-[#D4A373] uppercase tracking-wider block">
                Photo {lightboxIndex! + 1} of {filteredPhotos.length} · {activeLightboxPhoto.categoryLabel}
              </span>
              <h2 className="font-serif-wood text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                {activeLightboxPhoto.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Stage */}
          <div
            className="flex-1 relative flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo Viewport */}
            <div className="max-w-5xl max-h-[72vh] flex items-center justify-center overflow-auto rounded-xl">
              <img
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.title}
                className={`max-w-full max-h-[72vh] object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Details Bar */}
          <div
            className="p-4 sm:p-5 bg-black/85 border-t border-white/10 text-white z-10 flex flex-col sm:flex-row items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-[#8A532B] font-bold text-white">
                  {activeLightboxPhoto.woodType}
                </span>
                <span className="text-white/60">·</span>
                <span className="text-white/80">{activeLightboxPhoto.room}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1 max-w-xl line-clamp-1">
                {activeLightboxPhoto.specs}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={getWhatsAppUrl(`Hi Sunil Woodworks, I would like to enquire about this project from your gallery: "${activeLightboxPhoto.title}" (${activeLightboxPhoto.src}). Could you please share estimate details?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire This Photo on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  onOpenQuote(activeLightboxPhoto.categoryLabel);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-[#1C110B] bg-[#D4A373] hover:bg-[#e2b487] transition-colors cursor-pointer"
              >
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
