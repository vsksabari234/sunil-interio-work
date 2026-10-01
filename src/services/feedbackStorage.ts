import { testimonialsData, Testimonial } from '../data/testimonialsData';

const STORAGE_KEY = 'sunil_woodworks_client_reviews';

export const getStoredTestimonials = (): Testimonial[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return testimonialsData;
    const custom = JSON.parse(raw);
    if (!Array.isArray(custom)) return testimonialsData;
    // Combine custom reviews first, then base ones
    return [...custom, ...testimonialsData];
  } catch (err) {
    console.error('Error reading reviews from localStorage:', err);
    return testimonialsData;
  }
};

export const saveNewTestimonial = (review: Omit<Testimonial, 'id' | 'date' | 'verifiedProject'>): Testimonial => {
  const newReview: Testimonial = {
    ...review,
    id: `custom-review-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    verifiedProject: true,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const custom: Testimonial[] = raw ? JSON.parse(raw) : [];
    custom.unshift(newReview);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sunil_woodworks_review_added'));
    }
  } catch (err) {
    console.error('Error saving review to localStorage:', err);
  }

  return newReview;
};
