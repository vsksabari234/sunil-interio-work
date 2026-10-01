import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../data/galleryData';
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 sm:top-3 sm:right-3 z-30 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer border border-white/20 shadow-lg"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame - Pure Photo Showcase */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 shadow-2xl">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={project.title}
              className="w-auto h-auto max-h-[85vh] max-w-full object-contain rounded-xl select-none"
            />
          ) : (
            <div className="w-full min-h-[360px] sm:min-h-[480px] flex flex-col items-center justify-center">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#8A532B] text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] border border-white/20 z-20"
            aria-label="Previous project"
            title="Previous project (Arrow Left)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#8A532B] text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] border border-white/20 z-20"
            aria-label="Next project"
            title="Next project (Arrow Right)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Counter Badge */}
          <div className="absolute bottom-4 left-4 text-xs font-mono text-white/90 bg-black/75 border border-white/20 px-3 py-1 rounded-md backdrop-blur-xs z-20">
            {currentIndex + 1} / {totalCount}
          </div>
        </div>
      </div>
    </div>
  );
};
