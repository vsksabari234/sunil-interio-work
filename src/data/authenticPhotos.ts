// Authentic portfolio photos extracted from Master Sunil's official works catalog (157 real photos)

export const photoCollections = {
  mainDoors: Array.from({ length: 23 }, (_, i) => 
    `/assets/gallery/main-doors/main-doors-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  woodenWindows: Array.from({ length: 13 }, (_, i) => 
    `/assets/gallery/wooden-windows/wooden-windows-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  wardrobes: Array.from({ length: 34 }, (_, i) => 
    `/assets/gallery/wardrobes/wardrobes-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  modularKitchen: Array.from({ length: 21 }, (_, i) => 
    `/assets/gallery/modular-kitchen/modular-kitchen-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  tvUnits: Array.from({ length: 13 }, (_, i) => 
    `/assets/gallery/tv-units/tv-units-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  poojaUnits: Array.from({ length: 3 }, (_, i) => 
    `/assets/gallery/pooja-units/pooja-units-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  falseCeiling: Array.from({ length: 10 }, (_, i) => 
    `/assets/gallery/false-ceiling/false-ceiling-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  staircaseRailings: Array.from({ length: 8 }, (_, i) => 
    `/assets/gallery/staircase-railings/staircase-railings-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  bedroomFurniture: Array.from({ length: 3 }, (_, i) => 
    `/assets/gallery/bedroom-furniture/bedroom-furniture-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  bathroomVanity: Array.from({ length: 2 }, (_, i) => 
    `/assets/gallery/bathroom-vanity/bathroom-vanity-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  studyOffice: Array.from({ length: 4 }, (_, i) => 
    `/assets/gallery/study-office/study-office-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  decorativePanels: Array.from({ length: 17 }, (_, i) => 
    `/assets/gallery/decorative-panels/decorative-panels-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  interiorWoodwork: Array.from({ length: 5 }, (_, i) => 
    `/assets/gallery/interior-woodwork/interior-woodwork-${String(i + 1).padStart(2, '0')}.jpg`
  ),
  hero: '/assets/hero/main-image.jpeg',
};

export const authenticPhotos = {
  // Hero Showcases & Main Highlights
  heroDoor: '/assets/gallery/main-doors/main-doors-01.jpg',
  heroTvUnit: '/assets/gallery/tv-units/tv-units-01.jpg',
  heroWardrobe: '/assets/gallery/wardrobes/wardrobes-01.jpg',
  heroKitchen: '/assets/gallery/modular-kitchen/modular-kitchen-01.jpg',

  // Specific Category Highlights
  ganeshaDoor: '/assets/gallery/main-doors/main-doors-02.jpg',
  templePoojaEntrance: '/assets/gallery/pooja-units/pooja-units-01.jpg',
  poojaMandir: '/assets/gallery/pooja-units/pooja-units-02.jpg',
  bedFrame: '/assets/gallery/bedroom-furniture/bedroom-furniture-01.jpg',
  hydraulicBedMechanism: '/assets/gallery/bedroom-furniture/bedroom-furniture-02.jpg',
  glassProfileWardrobe: '/assets/gallery/wardrobes/wardrobes-05.jpg',
  roomDividerPartition: '/assets/gallery/decorative-panels/decorative-panels-01.jpg',
  onSiteWorkshop: '/assets/gallery/tv-units/tv-units-02.jpg',
  glassSlidingPartition: '/assets/gallery/wooden-windows/wooden-windows-01.jpg',
  woodenCeiling: '/assets/gallery/false-ceiling/false-ceiling-01.jpg',
  teakWindowGrill: '/assets/gallery/wooden-windows/wooden-windows-02.jpg',
  studyCornerDesk: '/assets/gallery/study-office/study-office-01.jpg',
  staircaseLed: '/assets/gallery/staircase-railings/staircase-railings-01.jpg',
  bathroomVanityItem: '/assets/gallery/bathroom-vanity/bathroom-vanity-01.jpg',
};

// Deterministic helper to get a real photo from the corresponding authentic array
function getFromCollection(list: string[], key: string): string {
  if (!list.length) return authenticPhotos.heroDoor;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % list.length;
  return list[idx];
}

export const getAuthenticPhotoFor = (id?: string, category?: string): string | null => {
  if (!id && !category) return authenticPhotos.heroDoor;

  const key = id || category || '';

  // Direct ID mappings for Hero & special showcases
  if (id === 'tv-unit' || id === 'proj-59' || id === 'tv-entertainment') {
    return '/assets/gallery/tv-units/tv-units-01.jpg';
  }
  if (id === 'wardrobe' || id === 'proj-13' || id === 'wardrobes-storage') {
    return '/assets/gallery/wardrobes/wardrobes-01.jpg';
  }
  if (id === 'kitchen' || id === 'proj-25' || id === 'modular-kitchens') {
    return '/assets/gallery/modular-kitchen/modular-kitchen-01.jpg';
  }
  if (id === 'door' || id === 'proj-49' || id === 'doors-frames' || id === 'doors-woodwork') {
    return '/assets/gallery/main-doors/main-doors-01.jpg';
  }
  if (id === 'custom-furniture') {
    return '/assets/gallery/study-office/study-office-01.jpg';
  }
  if (id === 'proj-50') return authenticPhotos.ganeshaDoor;
  if (id === 'proj-51') return authenticPhotos.templePoojaEntrance;
  if (id === 'proj-89' || id === 'pooja-mandirs') return authenticPhotos.poojaMandir;
  if (id === 'beds-bedroom' || id === 'proj-37') return authenticPhotos.bedFrame;
  if (id === 'proj-38') return authenticPhotos.hydraulicBedMechanism;
  if (id === 'proj-14') return authenticPhotos.glassProfileWardrobe;
  if (id === 'architectural-interior' || id === 'proj-90') return authenticPhotos.roomDividerPartition;
  if (id === 'proj-86') return authenticPhotos.woodenCeiling;
  if (id === 'proj-53' || id === 'proj-73') return authenticPhotos.glassSlidingPartition;
  if (id === 'proj-52' || id === 'proj-54') return authenticPhotos.teakWindowGrill;
  if (id === 'proj-01' || id === 'home-office-studies') return authenticPhotos.studyCornerDesk;

  // Category based matching to the 157 authentic work photos
  switch (category) {
    case 'doors':
      return getFromCollection(photoCollections.mainDoors, key);
    case 'wooden-windows':
      return getFromCollection(photoCollections.woodenWindows, key);
    case 'wardrobes':
      return getFromCollection(photoCollections.wardrobes, key);
    case 'kitchens':
    case 'cabinets':
      return getFromCollection(photoCollections.modularKitchen, key);
    case 'tv-units':
      return getFromCollection(photoCollections.tvUnits, key);
    case 'pooja-units':
      return getFromCollection(photoCollections.poojaUnits, key);
    case 'bedrooms':
      return getFromCollection(photoCollections.bedroomFurniture, key);
    case 'furniture':
      return getFromCollection(photoCollections.studyOffice.concat(photoCollections.bedroomFurniture), key);
    case 'interior-work':
      return getFromCollection(photoCollections.interiorWoodwork.concat(photoCollections.decorativePanels, photoCollections.falseCeiling), key);
    case 'other':
      return getFromCollection(photoCollections.decorativePanels.concat(photoCollections.staircaseRailings, photoCollections.falseCeiling), key);
    default:
      return getFromCollection(photoCollections.mainDoors, key);
  }
};
