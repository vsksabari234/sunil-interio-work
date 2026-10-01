/**
 * Sunil Woodworks - Central Business Configuration
 * Easily update phone numbers, addresses, WhatsApp links, and company details.
 */

export interface BusinessConfig {
  name: string;
  tagline: string;
  domain: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  serviceAreas: string[];
  workingHours: {
    weekdays: string;
    sunday: string;
  };
  social: {
    instagram: string;
    facebook: string;
    googleMaps: string;
  };
}

export const businessInfo: BusinessConfig = {
  name: "Sunil Interior Works",
  tagline: "Crafting Spaces. Building Elegance.",
  domain: "sunilinteriorworks.in",
  phoneDisplay: "+91 85310 86715",
  phoneDial: "+918531086715",
  whatsappNumber: "918531086715",
  whatsappMessage: "Hi Sunil Interior Works, I would like to enquire about your interior and carpentry services.",
  email: "enquiry@sunilinteriorworks.in",
  address: {
    street: "RT Nagar Main Road",
    locality: "RT Nagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560032",
    full: "RT Nagar, Bangalore, Karnataka 560032",
  },
  serviceAreas: [
    "RT Nagar",
    "Hebbal",
    "Sanjay Nagar",
    "Sadashivanagar",
    "Malleshwaram",
    "Indiranagar",
    "Koramangala",
    "HSR Layout",
    "Whitefield",
    "Sarjapur Road",
    "Jayanagar",
    "JP Nagar",
    "Greater Bangalore & Surrounding Suburbs",
  ],
  workingHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 7:30 PM",
    sunday: "Sunday: By Appointment Only",
  },
  social: {
    instagram: "https://instagram.com/sunilwoodworks",
    facebook: "https://facebook.com/sunilwoodworks",
    googleMaps: "https://maps.google.com/?q=Sunil+Woodworks+RT+Nagar+Bangalore",
  },
};

/**
 * Helper to build custom WhatsApp enquiry URLs
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || businessInfo.whatsappMessage);
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${text}`;
}

export function getPhoneUrl(): string {
  return `tel:${businessInfo.phoneDial}`;
}

export function getEmailUrl(): string {
  return `mailto:${businessInfo.email}?subject=Woodwork%20Project%20Enquiry%20-%20Sunil%20Woodworks`;
}
