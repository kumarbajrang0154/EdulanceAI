import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SectionTitle } from '../components/dashboard';
import { getMyReviews, createReview } from '../services/reviews';

const ReviewsDashboard = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [targetUserId, setTargetUserId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const loadReviews = async () => {
    try {
      const data = await getMyReviews();
      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch {
      setReviews([]);
      setAverageRating(0);
      setTotalReviews(0);
    }
  };

  useEffect(() => {
    void loadReviews();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createReview({ targetUserId, rating, comment, reviewType: 'freelancer' });
      setMessage('Review submitted for moderation.');
      setTargetUserId('');
      setRating(5);
      setComment('');
    } catch {
      setMessage('Unable to submit review.');
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionTitle
          title="Reviews Dashboard"
          description="See your received ratings and submit feedback for coworkers or freelancers."
        />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Rating summary</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{averageRating.toFixed(1)}</p>
              <p className="mt-2 text-sm text-slate-500">Based on {totalReviews} review{totalReviews === 1 ? '' : 's'}.</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600">Submit a review for a team member or freelancer. Reviews are moderated before they appear on profiles.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">Review target user ID</label>
                  <input
                    value={targetUserId}
                    onChange={(event) => setTargetUserId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    placeholder="Enter target user id"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">Rating</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                    className="mt-3 w-full"
                  />
                  <div className="mt-2 text-sm text-slate-600">Rating: {rating} / 5</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    placeholder="Leave a helpful review comment"
                    required
                  />
                </div>
                <button className="rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Submit review
                </button>
                {message && <p className="text-sm text-slate-600">{message}</p>}
              </form>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">Your reviews</h2>
          <p className="mt-2 text-sm text-slate-600">All visible reviews submitted about your work.</p>
          <div className="mt-6 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-500">No visible reviews yet.</p>
            ) : (
              reviews.map((item) => (
                <article key={item._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.reviewerId?.fullName || 'Reviewer'}</p>
                      <p className="text-xs text-slate-500">{item.reviewType}</p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">{item.rating} / 5</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.comment}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ReviewsDashboard;
