import React, { useState, useMemo } from 'react';
import { ProjectItem, galleryCategories, GalleryCategoryId } from '../data/galleryData';
import { getCategorizedProjects } from '../data/galleryData';
import { Lightbox } from './Lightbox';
import { Search, ArrowUpDown, MapPin, Eye, Camera, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useProjectPhotos } from '../hooks/useProjectPhotos';
import { CarpentryBlueprintPlaceholder } from './CarpentryBlueprintPlaceholder';

interface GallerySectionProps {
  onOpenUpload?: (category?: string, id?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenUpload }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest'>('popularity');
  const [filterPhotosOnly, setFilterPhotosOnly] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const { getPhotoFor } = useProjectPhotos();

  // Filter projects based on active category, search, and photo filter
  const filteredProjects = useMemo(() => {
    let list = getCategorizedProjects(selectedCategory);

    // Apply text search filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p: ProjectItem) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.woodSpecies.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q)
      );
    }

    // Filter to only show projects with live photos if requested
    if (filterPhotosOnly) {
      list = list.filter((p: ProjectItem) => Boolean(getPhotoFor(p.id, p.category)));
    }

    // Sort by criteria
    if (sortBy === 'newest') {
      return [...list].sort((a, b) => b.date.localeCompare(a.date));
    }
    return [...list].sort((a, b) => b.popularity - a.popularity);
  }, [selectedCategory, searchQuery, sortBy, filterPhotosOnly, getPhotoFor]);

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as any);
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
    <section id="gallery" className="py-12 sm:py-16 bg-white text-[#1C110B] border-b border-[#E8DECE] relative">
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
          </div>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8DECE] mb-8 space-y-4 shadow-xs">
          
          {/* Top Row: Search Input + Sort Dropdown + Photos Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6258]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search by wood type, project, or location (e.g., Teak, Wardrobe, Kitchen, Jayanagar)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] placeholder:text-[#9C8F80]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6258] hover:text-[#1C110B] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Toggle: Show Photographed Works */}
            <button
              type="button"
              onClick={() => {
                setFilterPhotosOnly((prev) => !prev);
                setVisibleCount(12);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                filterPhotosOnly
                  ? 'bg-[#2E1A11] text-white border-[#2E1A11]'
                  : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB]'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${filterPhotosOnly ? 'text-[#C59B27]' : 'text-[#8A532B]'}`} />
              <span>Photographed Projects</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="gallery-sort" className="text-xs font-semibold text-[#4A423B] flex items-center gap-1.5 whitespace-nowrap">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8A532B]" />
                <span>Sort:</span>
              </label>
              <select
                id="gallery-sort"
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2.5 text-xs sm:text-sm font-medium bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] cursor-pointer"
              >
                <option value="popularity">Popularity / Featured</option>
                <option value="newest">Recent Projects</option>
              </select>
            </div>
          </div>

          {/* Quick-Search Suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto text-[11px] text-[#554C43] pt-1 pb-1 no-scrollbar">
            <span className="font-semibold text-[#1C110B] shrink-0">Quick Filter:</span>
            {['Teak Wood', 'Wardrobe', 'Modular Kitchen', 'TV Unit', 'Pooja', 'Bed Frame', 'False Ceiling', 'Room Partition'].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => {
                  setSearchQuery(kw);
                  setVisibleCount(12);
                }}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                  searchQuery.toLowerCase() === kw.toLowerCase()
                    ? 'bg-[#2E1A11] text-white border-[#2E1A11]'
                    : 'bg-[#FAF7F2] text-[#4A423B] border-[#E8DECE] hover:bg-[#F5EFEB] hover:text-[#1C110B]'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Bottom Row: Category Buttons */}
          <div className="pt-3 border-t border-[#E8DECE] flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist">
            {galleryCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#2E1A11] text-white border-[#2E1A11] shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#4A423B] hover:bg-[#F5EFEB] hover:text-[#1C110B] border-[#E8DECE]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Results Summary Count */}
          <div className="flex items-center justify-between text-xs text-[#6B6258] pt-1">
            <span>
              Showing <strong className="text-[#1C110B] font-mono tabular-nums">{displayedProjects.length}</strong> of{' '}
              <strong className="text-[#1C110B] font-mono tabular-nums">{filteredProjects.length}</strong> projects
              {searchQuery && ` matching "${searchQuery}"`}
              {filterPhotosOnly && ' (Photos Only)'}
            </span>
            {(selectedCategory !== 'all' || searchQuery || filterPhotosOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setFilterPhotosOnly(false);
                }}
                className="text-[#8A532B] hover:text-[#2E1A11] font-semibold underline underline-offset-2 cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

        </div>

        {/* Gallery Grid */}
        {displayedProjects.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-xl border border-[#E8DECE]">
            <p className="font-serif-wood text-xl text-[#1C110B] font-bold mb-2">No projects matched your criteria</p>
            <p className="text-sm text-[#554C43] mb-5">
              Try adjusting your search terms or unchecking the "Photographed Projects" filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterPhotosOnly(false);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#2E1A11] rounded-lg hover:bg-[#432719] cursor-pointer"
            >
              Reset Filters
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
                  {/* Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#2E1A11]">
                    {photoUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={photoUrl}
                          alt={project.title}
                          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        
                        {/* Live Site Photo Badge */}
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-[#D4A373] border border-white/20">
                          Site Photo
                        </div>

                        <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 group-hover:bg-[#2E1A11] text-white backdrop-blur-xs transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4A373] drop-shadow-xs">
                            {project.categoryLabel}
                          </span>
                          <p className="text-xs text-white/95 truncate flex items-center gap-1 drop-shadow-xs">
                            <MapPin className="w-3 h-3 shrink-0 text-[#C59B27]" />
                            <span>{project.location}</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <CarpentryBlueprintPlaceholder
                        category={project.category}
                        title={project.title}
                        material={project.woodSpecies}
                        onUploadClick={() => onOpenUpload && onOpenUpload(project.category, project.id)}
                      />
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-wood text-lg font-bold text-[#1C110B] leading-snug mb-1 group-hover:text-[#8A532B] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#554C43] line-clamp-2 mb-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8DECE] text-[11px] text-[#6B6258] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1C110B]">Wood / Material:</span>
                        <span className="truncate max-w-[150px] text-right font-medium">{project.woodSpecies}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1C110B]">Finish:</span>
                        <span className="truncate max-w-[150px] text-right">{project.finish}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {displayedProjects.length < filteredProjects.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredProjects.length))}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#8A532B] hover:bg-[#724422] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Load More Projects ({filteredProjects.length - displayedProjects.length} remaining)</span>
            </button>
          </div>
        )}

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
