import React, { useState, useMemo } from 'react';
import { ProjectItem, galleryCategories, GalleryCategoryId } from '../data/galleryData';
import { getCategorizedProjects } from '../data/galleryData';
import { Lightbox } from './Lightbox';
import { Sparkles, FileText } from 'lucide-react';
import { useProjectPhotos } from '../hooks/useProjectPhotos';
import { CarpentryBlueprintPlaceholder } from './CarpentryBlueprintPlaceholder';

interface GallerySectionProps {
  onOpenUpload?: (category?: string, id?: string) => void;
  onOpenLookbook?: () => void;
  onNavigateToGallery?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  onOpenUpload, 
  onOpenLookbook,
  onNavigateToGallery 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const { getPhotoFor } = useProjectPhotos();

  // Count items per category for clean count badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: getCategorizedProjects('all').length };
    galleryCategories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = getCategorizedProjects(cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    const list = getCategorizedProjects(selectedCategory);
    return [...list].sort((a: ProjectItem, b: ProjectItem) => b.popularity - a.popularity);
  }, [selectedCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const activeLightboxProject = lightboxIndex !== null ? displayedProjects[lightboxIndex] : null;
  const activeLightboxPhoto = activeLightboxProject
    ? getPhotoFor(activeLightboxProject.id, activeLightboxProject.category)
    : null;

  const handleCategoryChange = (catId: GalleryCategoryId) => {
    setSelectedCategory(catId);
    setVisibleCount(12);
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev! === displayedProjects.length - 1 ? 0 : prev! + 1
    );
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev! === 0 ? displayedProjects.length - 1 : prev! - 1
    );
  };

  return (
    <section id="gallery" className="scroll-mt-24 pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white text-[#1C110B] border-b border-[#E8DECE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8A532B]" />
              <span>Executed Residential Work</span>
            </div>
            <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight [text-wrap:balance]">
              Our Executed Work & Portfolio
            </h2>
            <p className="mt-3 text-base text-[#554C43] leading-relaxed">
              Explore authentic site photography and bespoke woodwork crafted by Sunil Woodworks—from solid teak entrance doors and fluted TV consoles to modular kitchens and fitted wardrobes across Bengaluru.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs font-mono text-[#554C43] bg-white px-3.5 py-2.5 rounded-lg border border-[#E8DECE] shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8A532B]" />
              <span>90+ Documented Projects</span>
            </div>

            {onNavigateToGallery && (
              <button
                type="button"
                onClick={onNavigateToGallery}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#8A532B] hover:bg-[#724422] shadow-sm hover:shadow-md transition-all cursor-pointer"
                title="Open dedicated Gallery Page with all 156 authentic photos"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>View All 156 Photos Page →</span>
              </button>
            )}

            {onOpenLookbook && (
              <button
                type="button"
                onClick={onOpenLookbook}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-[#8A532B] bg-[#FAF7F2] hover:bg-[#F3ECE4] border border-[#D4A373] shadow-2xs transition-colors cursor-pointer"
                title="View & Download Sunil Woodworks Portfolio Catalog"
              >
                <FileText className="w-3.5 h-3.5 text-[#8A532B]" />
                <span>Download Project Catalog (PDF)</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs Filter - Redesigned Artisanal Segmented Dock */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#FAF7F2] border border-[#E8DECE] rounded-2xl shadow-2xs max-w-4xl"
            role="tablist"
            aria-label="Filter portfolio by category"
          >
            {galleryCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`group relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2E1A11] text-white font-semibold shadow-xs'
                      : 'text-[#554C43] hover:text-[#1C110B] hover:bg-white/90 font-medium'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shrink-0" />
                  )}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-full transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-[#D4A373]'
                        : 'bg-[#E8DECE]/70 text-[#6B6258] group-hover:bg-[#E8DECE] group-hover:text-[#1C110B]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {displayedProjects.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#E8DECE]">
            <p className="font-serif-wood text-xl text-[#1C110B] font-bold mb-2">No projects found in this category</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 text-xs font-bold text-white bg-[#2E1A11] rounded-lg hover:bg-[#432719] cursor-pointer mt-3"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProjects.map((project, index) => {
              const photoUrl = getPhotoFor(project.id, project.category);

              return (
                <div
                  key={project.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group bg-white rounded-xl border border-[#E8DECE] overflow-hidden shadow-2xs hover:border-[#8A532B]/50 hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-0.5"
                >
                  {/* Image Container - Clean Pure Photo */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#2E1A11]">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <CarpentryBlueprintPlaceholder
                        category={project.category}
                        title={project.title}
                        material={project.woodSpecies}
                        onUploadClick={() => onOpenUpload && onOpenUpload(project.category, project.id)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button & Catalog Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {displayedProjects.length < filteredProjects.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredProjects.length))}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#8A532B] hover:bg-[#724422] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Load More Projects ({filteredProjects.length - displayedProjects.length} remaining)</span>
            </button>
          )}

          {onNavigateToGallery && (
            <button
              type="button"
              onClick={onNavigateToGallery}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Browse All 156 Photos Page</span>
            </button>
          )}

          {onOpenLookbook && (
            <button
              type="button"
              onClick={onOpenLookbook}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-[#1C110B] bg-white hover:bg-[#FAF7F2] border border-[#D4A373] shadow-2xs transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#8A532B]" />
              <span>Download Full Project Catalog (PDF)</span>
            </button>
          )}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxProject && (
        <Lightbox
          project={activeLightboxProject}
          photoUrl={activeLightboxPhoto}
          onClose={() => setLightboxIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          currentIndex={lightboxIndex!}
          totalCount={displayedProjects.length}
          onOpenUpload={onOpenUpload}
        />
      )}
    </section>
  );
};
