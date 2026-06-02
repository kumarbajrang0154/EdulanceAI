import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FreelancerProfileCard from '../components/marketplace/FreelancerProfileCard';
import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import { fetchMarketplaceServices } from '../services/marketplace';
import { createReview, getReviewsForUser } from '../services/reviews';
import apiClient from '../services/axios';
import { FreelancerProfile } from '../services/freelancer';
import { MarketplaceServiceItem } from '../services/marketplace';

const FreelancerProfilePage = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [services, setServices] = useState<MarketplaceServiceItem[]>([]);
  const [reviews, setReviews] = useState<Array<{ _id: string; rating: number; comment: string; reviewerId: { _id: string; fullName: string } }>>([]);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const profileResponse = await apiClient.get<{ profile: FreelancerProfile }>(`/freelancer/profile/${userId}`);
        setProfile(profileResponse.data.profile);
        const serviceResults = await fetchMarketplaceServices({ userId, sort: 'latest' });
        setServices(serviceResults);
        const reviewResponse = await getReviewsForUser(userId);
        setReviews(reviewResponse.reviews || []);
      } catch {
        setError('Unable to load freelancer profile.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userId || !reviewComment.trim()) {
      return;
    }
    setSubmittingReview(true);
    try {
      await createReview({
        targetUserId: userId,
        rating: reviewRating,
        comment: reviewComment,
        reviewType: 'freelancer',
      });
      setReviewComment('');
      setReviewRating(5);
      const reviewResponse = await getReviewsForUser(userId);
      setReviews(reviewResponse.reviews || []);
    } catch {
      setError('Unable to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const averageCommentScore = reviews.length
    ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading freelancer profile...</div>;
  }

  if (error || !profile) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm shadow-red-100">{error || 'Profile not found.'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Freelancer profile</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{profile.experienceLevel} freelancer</h1>
        <p className="mt-2 text-sm text-slate-600">View services and profile details for this freelancer.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <FreelancerProfileCard profile={profile} />
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Services</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Published services</h2>
          <div className="mt-6 grid gap-4">
            {services.length ? services.map((service) => <MarketplaceCard key={service._id} service={service} />) : <p className="text-sm text-slate-500">No active services published yet.</p>}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reviews</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Client feedback</h2>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-700">Average {averageCommentScore}</div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {reviews.length ? (
              reviews.map((review) => (
                <article key={review._id} className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900">{review.reviewerId.fullName}</span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">{review.rating} / 5</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{review.comment}</p>
                </article>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-8 text-sm text-slate-500">No reviews have been published yet.</div>
            )}
          </div>

          {user?.role === 'student' && (
            <form className="rounded-3xl bg-slate-50 p-6" onSubmit={handleReviewSubmit}>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Leave a review</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Share your experience</h2>
              <div className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(event) => setReviewRating(Number(event.target.value))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} stars
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium text-slate-700">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(event) => setReviewComment(event.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  placeholder="Describe what worked well and the outcome."
                  required
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default FreelancerProfilePage;
