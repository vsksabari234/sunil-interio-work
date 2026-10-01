// Comprehensive dataset of all 156 authentic project photos for the dedicated Gallery Page

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  src: string;
  woodType: string;
  room: string;
  specs: string;
  tags: string[];
}

export const allGalleryCategories = [
  { id: 'all', label: 'All Photos', count: 156 },
  { id: 'wardrobes', label: 'Wardrobes & Storage', count: 34 },
  { id: 'main-doors', label: 'Main Entrance Doors', count: 23 },
  { id: 'modular-kitchen', label: 'Modular Kitchens', count: 21 },
  { id: 'decorative-panels', label: 'Wall Panels & Partitions', count: 17 },
  { id: 'tv-units', label: 'TV Units & Consoles', count: 13 },
  { id: 'wooden-windows', label: 'Windows & Louvers', count: 13 },
  { id: 'false-ceiling', label: 'Wooden False Ceilings', count: 10 },
  { id: 'staircase-railings', label: 'Staircases & Railings', count: 8 },
  { id: 'interior-woodwork', label: 'Interior Fitouts', count: 5 },
  { id: 'study-office', label: 'Study & Home Office', count: 4 },
  { id: 'pooja-units', label: 'Pooja Mandir Units', count: 3 },
  { id: 'bedroom-furniture', label: 'Bedroom Furniture', count: 3 },
  { id: 'bathroom-vanity', label: 'Bathroom Vanities', count: 2 },
] as const;

export type GalleryPageCategoryId = (typeof allGalleryCategories)[number]['id'];

// Helper to build catalog
const generatePhotos = (): GalleryPhotoItem[] => {
  const items: GalleryPhotoItem[] = [];

  // 1. Wardrobes (34 photos)
  for (let i = 1; i <= 34; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `wardrobe-${num}`,
      title: i === 1 
        ? 'Floor-to-Ceiling 3-Door Sliding Wardrobe with Overhead Lofts'
        : i === 5 
        ? 'Black Tinted Glass Profile Wardrobe with Warm LED Strip Lights'
        : `Custom Fitted Wardrobe Installation #${i}`,
      category: 'wardrobes',
      categoryLabel: 'Wardrobes & Storage',
      src: `/assets/gallery/wardrobes/wardrobes-${num}.jpg`,
      woodType: 'Calibrated Marine Ply & Premium Laminate',
      room: 'Master Bedroom',
      specs: 'Soft-close tandem drawers, concealed loft access, anti-warp aluminum profiles',
      tags: ['wardrobe', 'storage', 'sliding', 'bedroom', 'loft', 'plywood', 'laminate'],
    });
  }

  // 2. Main Doors (23 photos)
  for (let i = 1; i <= 23; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `main-doors-${num}`,
      title: i === 1 
        ? 'Handcrafted Solid Teak Main Entrance Door with Carved Relief'
        : i === 2 
        ? 'Lord Ganesha Hand-Carved Teak Villa Entrance Door'
        : `Artisanal Solid Teak Door #${i}`,
      category: 'main-doors',
      categoryLabel: 'Main Entrance Doors',
      src: `/assets/gallery/main-doors/main-doors-${num}.jpg`,
      woodType: '100% Seasoned First-Quality Teak Wood',
      room: 'Main Foyer & Villa Entrance',
      specs: 'Mortise & tenon joinery, heavy-duty brass hinges, PU weatherproof topcoat',
      tags: ['door', 'teak', 'entrance', 'carved', 'villa', 'brass', 'solid wood'],
    });
  }

  // 3. Modular Kitchens (21 photos)
  for (let i = 1; i <= 21; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `modular-kitchen-${num}`,
      title: i === 1 
        ? 'Waterproof BWP Marine Ply Modular Kitchen with Soft-Close Drawers'
        : `Custom Modular Kitchen Layout #${i}`,
      category: 'modular-kitchen',
      categoryLabel: 'Modular Kitchens',
      src: `/assets/gallery/modular-kitchen/modular-kitchen-${num}.jpg`,
      woodType: 'IS:710 Boiling Waterproof (BWP) Marine Ply',
      room: 'Kitchen Area',
      specs: 'Stainless steel corner carousel, hydraulic lift-up cabinets, seamless edge banding',
      tags: ['kitchen', 'modular', 'bwp', 'waterproof', 'drawers', 'cabinets'],
    });
  }

  // 4. Decorative Panels & Partitions (17 photos)
  for (let i = 1; i <= 17; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `decorative-panels-${num}`,
      title: i === 1 
        ? 'Fluted Teak Wood Architectural Partition & Room Divider'
        : `Custom Wood Wall Paneling & Room Divider #${i}`,
      category: 'decorative-panels',
      categoryLabel: 'Wall Panels & Partitions',
      src: `/assets/gallery/decorative-panels/decorative-panels-${num}.jpg`,
      woodType: 'Natural Teak Wood Battens & CNC Jali Panels',
      room: 'Living & Dining Foyer',
      specs: 'Concealed structural bracket mountings, natural satin finish',
      tags: ['panels', 'partition', 'jali', 'fluted', 'divider', 'living room'],
    });
  }

  // 5. TV Units (13 photos)
  for (let i = 1; i <= 13; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `tv-units-${num}`,
      title: i === 1 
        ? 'Backlit Marble & Fluted Teak Wall TV Entertainment Console'
        : `Floating TV Console & Media Wall Unit #${i}`,
      category: 'tv-units',
      categoryLabel: 'TV Units & Consoles',
      src: `/assets/gallery/tv-units/tv-units-${num}.jpg`,
      woodType: 'Teak Veneer & Marine Grade Carcass with LED Channels',
      room: 'Living & Family Room',
      specs: 'Concealed cable management, push-to-open flap doors, acoustic wall slats',
      tags: ['tv unit', 'console', 'entertainment', 'marble', 'led', 'fluted'],
    });
  }

  // 6. Wooden Windows & Louvers (13 photos)
  for (let i = 1; i <= 13; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `wooden-windows-${num}`,
      title: i === 1 
        ? 'Solid Teak Frame Casement Window with Polished Grills'
        : `Teak Wood Window Frame & Shutter #${i}`,
      category: 'wooden-windows',
      categoryLabel: 'Windows & Louvers',
      src: `/assets/gallery/wooden-windows/wooden-windows-${num}.jpg`,
      woodType: 'Seasoned Hardwood & Teak Timber',
      room: 'Exterior Fenestration',
      specs: 'Deep groove rebate, weather-seal gaskets, mosquito mesh integration',
      tags: ['windows', 'teak', 'frames', 'louvers', 'casement', 'exterior'],
    });
  }

  // 7. False Ceilings (10 photos)
  for (let i = 1; i <= 10; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `false-ceiling-${num}`,
      title: `Bespoke Teak Veneer & Rafter Wooden False Ceiling #${i}`,
      category: 'false-ceiling',
      categoryLabel: 'Wooden False Ceilings',
      src: `/assets/gallery/false-ceiling/false-ceiling-${num}.jpg`,
      woodType: 'Lightweight Marine Ply Box Framework & Wood Veneer',
      room: 'Living & Dining Room Ceiling',
      specs: 'Cove lighting channels, seismic anchoring, fire-retardant sealant',
      tags: ['ceiling', 'rafter', 'veneer', 'cove', 'lighting', 'interior'],
    });
  }

  // 8. Staircase Railings (8 photos)
  for (let i = 1; i <= 8; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `staircase-railings-${num}`,
      title: `Solid Teak Handrail & Baluster Staircase Woodwork #${i}`,
      category: 'staircase-railings',
      categoryLabel: 'Staircases & Railings',
      src: `/assets/gallery/staircase-railings/staircase-railings-${num}.jpg`,
      woodType: 'Curved Solid Teak Wood with Glass/Iron Hardware',
      room: 'Duplex Staircase',
      specs: 'Ergonomic hand-grip profile, invisible dowel joints, high-traffic PU polish',
      tags: ['staircase', 'handrail', 'teak', 'steps', 'duplex'],
    });
  }

  // 9. Interior Fitouts (5 photos)
  for (let i = 1; i <= 5; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `interior-woodwork-${num}`,
      title: `Integrated Turnkey Apartment Woodwork Project #${i}`,
      category: 'interior-woodwork',
      categoryLabel: 'Interior Fitouts',
      src: `/assets/gallery/interior-woodwork/interior-woodwork-${num}.jpg`,
      woodType: 'Comprehensive Marine Ply, Teak & Veneer Package',
      room: 'Complete Residence',
      specs: 'Coordinated wood finishes, factory-cut joints, turnkey finish',
      tags: ['interior', 'full home', 'renovation', 'turnkey', 'bengaluru'],
    });
  }

  // 10. Study & Office (4 photos)
  for (let i = 1; i <= 4; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `study-office-${num}`,
      title: `Custom Executive Home Office Study Desk & Bookcase #${i}`,
      category: 'study-office',
      categoryLabel: 'Study & Home Office',
      src: `/assets/gallery/study-office/study-office-${num}.jpg`,
      woodType: 'Calibrated Marine Ply with Scratch-Resistant Laminate',
      room: 'Home Office / Study',
      specs: 'Heavy-duty cable grommets, keyboard tray option, document cubbies',
      tags: ['study', 'office', 'desk', 'workstation', 'bookcase'],
    });
  }

  // 11. Pooja Mandir Units (3 photos)
  for (let i = 1; i <= 3; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `pooja-units-${num}`,
      title: i === 1 
        ? 'Temple Pooja Room Entrance with Teak Bell Door Shutters'
        : i === 2 
        ? 'Solid Teak Pooja Mandir Shrine with Gopuram Carving'
        : `Custom Mandir Woodwork Installation #${i}`,
      category: 'pooja-units',
      categoryLabel: 'Pooja Mandir Units',
      src: `/assets/gallery/pooja-units/pooja-units-${num}.jpg`,
      woodType: 'Sacred First-Cut Solid Teak Wood',
      room: 'Pooja Mandir Sanctuary',
      specs: 'Brass bell cutouts, traditional south Indian pillar relief, diya storage drawers',
      tags: ['pooja', 'mandir', 'temple', 'teak', 'shrine', 'sacred', 'bells'],
    });
  }

  // 12. Bedroom Furniture (3 photos)
  for (let i = 1; i <= 3; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `bedroom-furniture-${num}`,
      title: i === 2 
        ? 'Hydraulic Storage King Bed Frame with Cushioned Teak Headboard'
        : `Custom Solid Wood Platform Bed Frame #${i}`,
      category: 'bedroom-furniture',
      categoryLabel: 'Bedroom Furniture',
      src: `/assets/gallery/bedroom-furniture/bedroom-furniture-${num}.jpg`,
      woodType: 'Solid Teak & Calibrated Marine Ply Internal Ribs',
      room: 'Bedroom',
      specs: 'German gas-lift struts (120kg capacity), squeak-free tongue-and-groove base',
      tags: ['bed', 'hydraulic', 'storage', 'furniture', 'headboard'],
    });
  }

  // 13. Bathroom Vanities (2 photos)
  for (let i = 1; i <= 2; i++) {
    const num = String(i).padStart(2, '0');
    items.push({
      id: `bathroom-vanity-${num}`,
      title: `Waterproof BWP Marine Ply Floating Bathroom Vanity #${i}`,
      category: 'bathroom-vanity',
      categoryLabel: 'Bathroom Vanities',
      src: `/assets/gallery/bathroom-vanity/bathroom-vanity-${num}.jpg`,
      woodType: '100% Calibrated BWP Marine Ply with Acrylic Edges',
      room: 'Master Bathroom',
      specs: 'Water-impermeable polyurethane seal, soft-close siphon cutout drawers',
      tags: ['vanity', 'bathroom', 'waterproof', 'marine ply', 'floating'],
    });
  }

  return items;
};

export const allGalleryPhotos: GalleryPhotoItem[] = generatePhotos();
