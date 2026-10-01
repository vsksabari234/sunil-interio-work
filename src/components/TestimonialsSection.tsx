import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Send, ThumbsUp, ShieldCheck } from 'lucide-react';
import { businessInfo } from '../config/businessInfo';
import { getStoredTestimonials, saveNewTestimonial } from '../services/feedbackStorage';
import { Testimonial } from '../data/testimonialsData';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('Homeowner');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setReviews(getStoredTestimonials());

    const handleUpdate = () => {
      setReviews(getStoredTestimonials());
    };
    window.addEventListener('sunil_woodworks_review_added', handleUpdate);
    return () => window.removeEventListener('sunil_woodworks_review_added', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim() || !projectType.trim() || isFlying) return;

    setIsFlying(true);

    const saved = saveNewTestimonial({
      clientName: clientName.trim(),
      clientRole: clientRole.trim() || 'Homeowner',
      projectType: projectType.trim(),
      location: location.trim() || 'Bengaluru',
      quote: quote.trim(),
      rating,
    });

    setReviews((prev) => [saved, ...prev]);

    setTimeout(() => {
      setSubmittedSuccess(true);
      setIsFlying(false);
    }, 550);

    // Reset Form
    setTimeout(() => {
      setClientName('');
      setProjectType('');
      setLocation('');
      setQuote('');
      setRating(5);
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 2800);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C110B] border-b border-[#E8DECE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8A532B] mb-2 flex items-center gap-1.5">
              <span>Customer Experiences & Ratings</span>
            </div>
            <h2 className="font-serif-wood text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C110B] leading-tight [text-wrap:balance]">
              Trusted by Homeowners Across Bengaluru
            </h2>
            <p className="mt-3 text-base text-[#554C43] leading-relaxed">
              Real projects completed across apartments, villas, and independent homes. We take pride in honest communication, durable woodwork, and clean on-site installations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#8A532B] hover:bg-[#703F1E] rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#F3E7DB]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Direct Feedback Submission Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-[#E8DECE] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-[#8A7968] hover:text-[#1C110B] p-1.5 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submittedSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#25D366]/15 text-[#1F512F] rounded-full flex items-center justify-center mx-auto border border-[#25D366]/30">
                    <ThumbsUp className="w-8 h-8 text-[#25D366]" />
                  </div>
                  <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B]">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-sm text-[#554C43] max-w-md mx-auto leading-relaxed">
                    Your project review and rating have been published directly on our website. We truly value your trust in Sunil Woodworks!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8A532B] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Direct Client Review</span>
                    </div>
                    <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B]">
                      Share Your Experience
                    </h3>
                    <p className="text-xs text-[#554C43] mt-1">
                      Have we completed woodwork for your home or office? Your review will be published directly on this website.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating selector */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1C110B] mb-1.5">
                        Your Rating:
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-hidden transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                (hoverRating || rating) >= star
                                  ? 'fill-[#C59B27] text-[#C59B27]'
                                  : 'text-[#D5C7B7]'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-semibold text-[#8A532B] ml-2">
                          {hoverRating || rating} of 5 Stars
                        </span>
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                          Role / Title
                        </label>
                        <select
                          value={clientRole}
                          onChange={(e) => setClientRole(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                        >
                          <option value="Homeowner">Homeowner</option>
                          <option value="Apartment Resident">Apartment Resident</option>
                          <option value="Villa Owner">Villa Owner</option>
                          <option value="Interior Designer">Interior Designer</option>
                          <option value="Architect">Architect</option>
                          <option value="Commercial Client">Commercial Client</option>
                        </select>
                      </div>
                    </div>

                    {/* Project & Bengaluru Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                          Project Executed *
                        </label>
                        <input
                          type="text"
                          required
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          placeholder="e.g. 3BHK Wardrobes & Kitchen"
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                          Location / Area
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Indiranagar, Bengaluru"
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                        />
                      </div>
                    </div>

                    {/* Feedback Comments */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                        Your Feedback / Review *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Tell others about the quality of joinery, wood finishing, fitting accuracy, punctuality, and overall experience with Sunil Woodworks..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] resize-none"
                      />
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        disabled={isFlying}
                        className="px-4 py-2.5 text-xs font-semibold text-[#554C43] hover:text-[#1C110B] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isFlying}
                        className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#2E1A11] hover:bg-[#432719] active:scale-98 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-90"
                      >
                        <Send
                          className={`w-3.5 h-3.5 text-[#D4A373] transition-all duration-300 ${
                            isFlying
                              ? 'animate-flyAway'
                              : 'group-hover:translate-x-1 group-hover:-translate-y-0.5'
                          }`}
                        />
                        <span>{isFlying ? 'Flying Away...' : 'Submit Review Directly'}</span>
                      </button>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>
        )}

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#E8DECE] shadow-2xs flex flex-col justify-between hover:border-[#8A532B]/40 transition-colors"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-[#C59B27]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#3E3832] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-[#E8DECE]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-serif-wood text-base font-bold text-[#1C110B]">
                    {item.clientName}
                  </h4>
                  {item.verifiedProject && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1F512F] bg-[#E9F7EF] border border-[#B9E6C9] px-2 py-0.5 rounded-sm">
                      <CheckCircle className="w-3 h-3 text-[#25D366]" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8A532B] font-medium">
                  {item.clientRole}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#6B6258] mt-2">
                  <span className="truncate max-w-[170px]">{item.projectType}</span>
                  <span className="text-[#8A532B] font-medium shrink-0 ml-2">{item.location}</span>
                </div>
                {item.date && (
                  <div className="text-[10px] text-[#9C8F80] mt-1 text-right">
                    {item.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Homeowner Review Invitation Bar */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-xl border border-[#E8DECE] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-serif-wood text-lg sm:text-xl font-bold text-[#1C110B] mb-1">
              Have we crafted woodwork for your residence?
            </h4>
            <p className="text-xs sm:text-sm text-[#554C43]">
              Share your direct feedback on joinery quality, finish, and service to appear right here on our client testimonial wall.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2E1A11] hover:bg-[#432719] rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D4A373]" />
            <span>Leave Client Feedback</span>
          </button>
        </div>

      </div>
    </section>
  );
};
