import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Layers, Sparkles, MessageCircle, Calendar, Camera } from 'lucide-react';
import { ProjectItem } from '../data/galleryData';
import { getWhatsAppUrl } from '../config/businessInfo';
import { CarpentryBlueprintPlaceholder } from './CarpentryBlueprintPlaceholder';

interface LightboxProps {
  project: ProjectItem | null;
  photoUrl?: string | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  project,
  photoUrl,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  onOpenUpload,
}) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  const whatsappInquiryMessage = `Hi Sunil Woodworks, I was looking at your gallery project "${project.title}" (${project.woodSpecies}) in ${project.location}. I would like to enquire about a similar custom woodwork design for my home.`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative bg-white text-[#1C110B] rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row overflow-hidden shadow-2xl border border-[#E8DECE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1C110B] shadow-md transition-colors cursor-pointer border border-[#E8DECE]"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame (Left / Top) */}
        <div className="relative flex-1 bg-[#1C110B] flex items-center justify-center min-h-[300px] sm:min-h-[420px] lg:min-h-[560px] overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={project.title}
              className="w-full h-full object-contain max-h-[70vh] lg:max-h-[85vh] select-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <CarpentryBlueprintPlaceholder
                category={project.category}
                title={project.title}
                material={project.woodSpecies}
                className="w-full h-full"
                onUploadClick={() => onOpenUpload && onOpenUpload(project.category, project.id)}
              />
            </div>
          )}

          {/* Previous / Next Arrow Controls */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#8A532B] text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] border border-white/20 z-10"
            aria-label="Previous project"
            title="Previous project (Arrow Left)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#8A532B] text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] border border-white/20 z-10"
            aria-label="Next project"
            title="Next project (Arrow Right)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter Badge */}
          <div className="absolute bottom-3 left-4 text-xs font-mono text-white/90 bg-black/75 border border-white/20 px-2.5 py-1 rounded-md backdrop-blur-xs z-10">
            {currentIndex + 1} / {totalCount}
          </div>
        </div>

        {/* Project Details Sidebar (Right / Bottom) */}
        <div className="w-full lg:w-96 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-[85vh] bg-[#FAF7F2] border-t lg:border-t-0 lg:border-l border-[#E8DECE]">
          <div>
            {/* Category & Location */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A532B] mb-2">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-[#C59B27]">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 inline text-[#8A532B]" />
                {project.location}
              </span>
            </div>

            <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B] leading-snug mb-3">
              {project.title}
            </h3>

            <p className="text-sm text-[#554C43] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Specifications list */}
            <div className="space-y-3 pt-4 border-t border-[#E8DECE] text-xs">
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#8A532B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1C110B] block">Material & Wood</span>
                  <span className="text-[#554C43]">{project.woodSpecies}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8A532B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1C110B] block">Finish</span>
                  <span className="text-[#554C43]">{project.finish}</span>
                </div>
              </div>

              {project.dimensions && (
                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 text-[#8A532B] shrink-0 font-mono font-bold text-center">📐</span>
                  <div>
                    <span className="font-semibold text-[#1C110B] block">Dimensions</span>
                    <span className="text-[#554C43]">{project.dimensions}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#8A532B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1C110B] block">Completed</span>
                  <span className="text-[#554C43]">{project.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA in Modal */}
          <div className="pt-6 border-t border-[#E8DECE] mt-6 space-y-2.5">
            {onOpenUpload && (
              <button
                type="button"
                onClick={() => onOpenUpload(project.category, project.id)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#8A532B] bg-white hover:bg-[#FAF7F2] border border-[#D4A373] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-[#8A532B]" />
                <span>Upload Site Photo for this Project</span>
              </button>
            )}

            <a
              href={getWhatsAppUrl(whatsappInquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#1b9d4c] rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-[#6B6258]">
              Speak directly with carpenter Sunil about this project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
