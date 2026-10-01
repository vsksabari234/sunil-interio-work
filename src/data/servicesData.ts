export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tagline?: string;
  detailedSpecs?: string[];
  recommendedMaterials?: string[];
  category?: string;
}

/**
 * Sunil Carpentry Works Services Showcase
 * All real images extracted from the workshop portfolio
 */
export const servicesData: ServiceItem[] = [
  {
    id: "main-doors",
    title: "Main Doors & Carved Entrances",
    description:
      "Solid wood entrance doors, traditional carved pooja doors, modern fluted panels and heavy teak frames built for durability and elegance.",
    image: "/assets/gallery/main-doors/main-doors-01.jpg",
    category: "doors",
    tagline: "Solid Teak & Hand-Carved Joinery",
  },
  {
    id: "wardrobes-storage",
    title: "Fitted Wardrobes & Lofts",
    description:
      "Floor-to-ceiling sliding wardrobes, walk-in closets, dresser units, loft cabinets, and hydraulic internal fittings designed to fit your room perfectly.",
    image: "/assets/gallery/wardrobes/wardrobes-01.jpg",
    category: "wardrobes",
    tagline: "Custom Internal Storage & Sliding Doors",
  },
  {
    id: "modular-kitchens",
    title: "Modular Kitchen Woodwork",
    description:
      "Kitchen cabinetry, breakfast counters, tandem drawers, bottle pull-outs, and waterproof BWP marine ply carcass designed for daily Indian cooking.",
    image: "/assets/gallery/modular-kitchen/modular-kitchen-01.jpg",
    category: "kitchens",
    tagline: "100% BWP Marine Ply & Acrylic Finishes",
  },
  {
    id: "tv-units-cabinets",
    title: "TV Units & Wall Paneling",
    description:
      "Living room entertainment consoles, marble-finish accent backdrops, acoustic fluted slats, and warm LED cove lighting built to order.",
    image: "/assets/gallery/tv-units/tv-units-01.jpg",
    category: "tv-units",
    tagline: "Floating Consoles & Acoustic Wooden Slats",
  },
  {
    id: "pooja-units",
    title: "Pooja Units & Mandirs",
    description:
      "Dedicated prayer room woodwork, traditional temple arches, brass bells, jaali cutouts, and teak wood pooja mandirs crafted with care and reverence.",
    image: "/assets/gallery/pooja-units/pooja-units-02.jpg",
    category: "pooja-units",
    tagline: "Traditional Craftsmanship & Sacred Detailing",
  },
  {
    id: "wooden-windows",
    title: "Wooden Windows & Shutters",
    description:
      "Window frames, louvers, sliding balcony wooden partitions, glass-inset shutters, and wooden grill woodwork built for natural light and ventilation.",
    image: "/assets/gallery/wooden-windows/wooden-windows-01.jpg",
    category: "wooden-windows",
    tagline: "Weatherproof Frames & Traditional Louvers",
  },
  {
    id: "staircase-ceilings",
    title: "Staircases, Railings & Ceilings",
    description:
      "Solid timber handrails, glass railings, illuminated floating staircases, and wooden false ceilings with warm cove lighting.",
    image: "/assets/gallery/staircase-railings/staircase-railings-01.jpg",
    category: "interior-work",
    tagline: "Architectural Woodwork & Glass Accents",
  },
  {
    id: "custom-furniture",
    title: "Custom Furniture & Studies",
    description:
      "King and queen bed frames with hydraulic storage, ergonomic study desks, reception counters, and bespoke dining furniture.",
    image: "/assets/gallery/study-office/study-office-01.jpg",
    category: "furniture",
    tagline: "Made-to-Measure Solid Wood & Engineered Ply",
  },
];
