export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string; // e.g. "Homeowner", "Interior Designer", "Architect"
  projectType: string;
  location: string;
  quote: string;
  date: string;
  rating: number; // 5
  verifiedProject: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    clientName: "Rajesh & Priya Venkatesh",
    clientRole: "Homeowners",
    projectType: "Full Home Woodwork & Fitted Wardrobes",
    location: "Indiranagar, Bengaluru",
    quote:
      "Sunil and his carpentry team did excellent work for our 3BHK apartment. The floor-to-ceiling wardrobes in our bedrooms and the wooden partition screen between living and dining were fitted with great accuracy. Transparent material pricing and completed right on schedule.",
    date: "August 2026",
    rating: 5,
    verifiedProject: true,
  },
  {
    id: "test-02",
    clientName: "Ar. Ananya Sen",
    clientRole: "Architect & Interior Designer",
    projectType: "Custom Teak Doors & Wall Paneling",
    location: "Sadashivanagar Villa",
    quote:
      "Finding skilled carpenters who understand precise joinery tolerances is hard. Sunil Woodworks built our solid teak entrance door and custom wooden wall panels. Their craftsmanship, attention to door alignment, and prompt communication made the project smooth.",
    date: "July 2026",
    rating: 5,
    verifiedProject: true,
  },
  {
    id: "test-03",
    clientName: "Dr. Vikram Hegde",
    clientRole: "Homeowner",
    projectType: "Modular Kitchen & Hydraulic Bed",
    location: "Whitefield, Bengaluru",
    quote:
      "Unlike modular showroom brands who charge heavy commissions and send inexperienced daily-wage helpers, Sunil personally took site measurements and supervised the entire woodwork. The kitchen carcases are solid and the storage bed works effortlessly.",
    date: "May 2026",
    rating: 5,
    verifiedProject: true,
  },
];
