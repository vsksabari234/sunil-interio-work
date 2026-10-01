import React, { useState } from 'react';
import { X, Star, Send, ThumbsUp, ShieldCheck } from 'lucide-react';
import { saveNewTestimonial } from '../services/feedbackStorage';
import { Testimonial } from '../data/testimonialsData';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmitted?: (newReview: Testimonial) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onFeedbackSubmitted,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('Homeowner');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim() || !projectType.trim() || isFlying) return;

    // Trigger simple logo fly away
    setIsFlying(true);

    const saved = saveNewTestimonial({
      clientName: clientName.trim(),
      clientRole: clientRole.trim() || 'Homeowner',
      projectType: projectType.trim(),
      location: location.trim() || 'Bengaluru',
      quote: quote.trim(),
      rating,
    });

    if (onFeedbackSubmitted) {
      onFeedbackSubmitted(saved);
    }

    // Transition smoothly after logo flies away
    setTimeout(() => {
      setSubmittedSuccess(true);
      setIsFlying(false);
    }, 550);

    setTimeout(() => {
      setClientName('');
      setProjectType('');
      setLocation('');
      setQuote('');
      setRating(5);
      setSubmittedSuccess(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DECE] shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6B6258] hover:text-[#1C110B] rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="Close feedback modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 bg-[#E9F7EF] text-[#25D366] rounded-full flex items-center justify-center mx-auto border border-[#B9E6C9] shadow-sm animate-bounce">
              <ThumbsUp className="w-7 h-7" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DECE] text-[11px] font-mono font-semibold text-[#8A532B]">
              <span>✈ Paper Plane Landed Safely</span>
            </div>

            <h3 className="font-serif-wood text-2xl font-bold text-[#1C110B]">
              Thank You for Your Feedback!
            </h3>
            <p className="text-sm text-[#554C43] max-w-sm mx-auto leading-relaxed">
              Your review has taken flight and is recorded on our client wall. We deeply appreciate your trust in Sunil Woodworks!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A532B] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#8A532B]" />
                <span>Verified Client Feedback</span>
              </div>
              <h3
                id="feedback-modal-title"
                className="font-serif-wood text-2xl font-bold text-[#1C110B]"
              >
                Share Your Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#554C43] mt-1">
                Have we crafted woodwork for your home or office? Tell us how we did.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-[#1C110B] mb-1.5">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl transition-transform hover:scale-110 cursor-pointer focus-visible:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'fill-[#C59B27] text-[#C59B27]'
                            : 'text-[#E8DECE]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-[#8A532B] ml-2">
                    {rating === 5 ? '5 Stars (Excellent)' : `${rating} Stars`}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="e.g. Homeowner, Architect"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                  />
                </div>
              </div>

              {/* Project Type & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Woodwork Type *
                  </label>
                  <input
                    required
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="e.g. Wardrobes & Kitchen"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1C110B] mb-1">
                    Area / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Whitefield, Bengaluru"
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
                  placeholder="Tell others about the joinery quality, finish, alignment, fitting accuracy, punctuality, and overall experience with Sunil Woodworks..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8DECE] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A532B] text-[#1C110B] resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
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
                  <span>{isFlying ? 'Flying Away...' : 'Submit Feedback'}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
