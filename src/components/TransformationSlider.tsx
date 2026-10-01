import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, CheckCircle2, Hammer, Ruler } from 'lucide-react';
import { useProjectPhotos } from '../hooks/useProjectPhotos';

export const TransformationSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(52); // Percent
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const { getPhotoFor } = useProjectPhotos();

  const finishedPhoto = '/assets/gallery/tv-units/tv-units-01.jpg';
  const inProgressPhoto = '/assets/gallery/tv-units/tv-units-02.jpg';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2">
            Crafting & Installation
          </div>
          <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight mb-4 [text-wrap:balance]">
            From Workshop Joinery to Clean Home Fitting
          </h2>
          <p className="text-base text-[#554C43] leading-relaxed">
            Drag the slider to see how raw framing, joinery, and sanding transform into a neat, flush-fitted installation in your living space.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-16/10 sm:aspect-16/9 lg:aspect-21/9 rounded-2xl overflow-hidden shadow-xl border border-[#E8DECE] cursor-ew-resize select-none bg-[#1C110B]"
        >
          {/* Base Layer: Finished Installation (Right Side) */}
          {finishedPhoto ? (
            <img
              src={finishedPhoto}
              alt="Finished woodwork installation by Sunil Woodworks"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#1C110B] flex flex-col items-center justify-center p-6 text-center">
              <svg viewBox="0 0 600 300" className="w-full h-full max-h-72 opacity-80" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="300" fill="#24160E" />
                <rect x="100" y="40" width="400" height="220" fill="#2D1A10" stroke="#3E291C" strokeWidth="2" />
                {/* Slats */}
                <line x1="120" y1="40" x2="120" y2="260" stroke="#3D2619" strokeWidth="4" />
                <line x1="140" y1="40" x2="140" y2="260" stroke="#3D2619" strokeWidth="4" />
                <line x1="160" y1="40" x2="160" y2="260" stroke="#3D2619" strokeWidth="4" />
                {/* Marble TV Panel */}
                <rect x="200" y="55" width="220" height="130" fill="#FAF7F2" stroke="#D4A373" strokeWidth="1.5" />
                <text x="270" y="125" fill="#1C110B" fontSize="12" fontFamily="serif" fontWeight="bold">FINISHED TV WALL</text>
                {/* Floating Console */}
                <rect x="180" y="195" width="260" height="45" fill="#140C07" stroke="#D4A373" strokeWidth="2" />
                <line x1="265" y1="195" x2="265" y2="240" stroke="#D4A373" strokeWidth="1" />
                <line x1="350" y1="195" x2="350" y2="240" stroke="#D4A373" strokeWidth="1" />
              </svg>
            </div>
          )}

          {/* Finished Label */}
          <div className="absolute top-4 right-4 z-10 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-md backdrop-blur-xs border border-white/20 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Completed On-Site Installation</span>
          </div>

          {/* Overlay Layer: Workshop Joinery & Crafting (Left Side) */}
          <div
            className="absolute top-0 bottom-0 left-0 overflow-hidden select-none bg-[#24160E] border-r-2 border-[#C59B27]"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={inProgressPhoto}
              alt="Raw on-site carpentry joinery and fitting by Sunil Woodworks"
              className="absolute top-0 left-0 h-full object-cover select-none pointer-events-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            />

            {/* Raw Label */}
            <div className="absolute top-4 left-4 z-10 bg-[#2E1A11]/95 text-white text-xs font-semibold px-3 py-1.5 rounded-md backdrop-blur-xs border border-[#8A532B] flex items-center gap-1.5 pointer-events-none">
              <Hammer className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Workshop Joinery & Precision Framework</span>
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-9 h-9 rounded-full bg-[#C59B27] text-[#140C07] flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Feature Pills under slider */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-[#E8DECE]">
            <span className="text-xs font-bold text-[#8A532B] uppercase tracking-wider block mb-1">
              Step 1: In-Shop Fabrication
            </span>
            <p className="text-xs text-[#554C43]">
              All core carcasses, drawer boxes, and edge-banding are built in our Bengaluru workshop.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E8DECE]">
            <span className="text-xs font-bold text-[#8A532B] uppercase tracking-wider block mb-1">
              Step 2: Clean On-Site Fitting
            </span>
            <p className="text-xs text-[#554C43]">
              Only final assembly, scribing to masonry walls, and alignment is done at your residence.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E8DECE]">
            <span className="text-xs font-bold text-[#8A532B] uppercase tracking-wider block mb-1">
              Step 3: Hardware & Polish
            </span>
            <p className="text-xs text-[#554C43]">
              Fitting of soft-close hinges, sliding channels, locks, and final surface wipe-down.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
