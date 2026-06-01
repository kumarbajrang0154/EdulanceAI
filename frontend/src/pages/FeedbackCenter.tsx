import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SectionTitle } from '../components/dashboard';
import { submitFeedback, getFeedback } from '../services/feedback';

const FeedbackCenter = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [feedbackType, setFeedbackType] = useState('general');
  const [status, setStatus] = useState('pending');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getFeedback({ status: 'pending' });
      setHistory(data.feedback || []);
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await submitFeedback({ message, rating, feedbackType, source: 'platform' });
      setSuccess('Feedback submitted successfully.');
      setMessage('');
      setRating(5);
      await loadHistory();
    } catch (err) {
      setError('Unable to submit feedback.');
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionTitle
          title="Feedback Center"
          description="Submit feedback, report issues, and review your latest feedback activity."
        />

        <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">Send Feedback</h2>
            <p className="mt-2 text-sm text-slate-600">Share platform feedback or report an issue to the team.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-900">Type</label>
                <select
                  value={feedbackType}
                  onChange={(event) => setFeedbackType(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <option value="general">General feedback</option>
                  <option value="issue">Report an issue</option>
                  <option value="resource">Learning resource request</option>
                  <option value="course">Course suggestion</option>
                </select>
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
                <label className="text-sm font-medium text-slate-900">Your feedback</label>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 h-36 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  placeholder="Describe your feedback or report an issue"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-emerald-600">{success}</p>}
              <button
                type="submit"
                className="rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit feedback
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">Recent Feedback</h2>
            <p className="mt-2 text-sm text-slate-600">Your latest feedback entries are shown here.</p>
            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-sm text-slate-500">Loading history…</p>
              ) : history.length ? (
                history.map((item) => (
                  <article key={item._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">{item.feedbackType}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{item.message}</p>
                    <p className="mt-3 text-xs text-slate-500">Rating: {item.rating} / 5</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-slate-500">No feedback history found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackCenter;
