import { useEffect, useState } from 'react';
import * as adminService from '../services/admin';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const { feedback: fetchedFeedback } = await adminService.getFeedback({ status: 'pending' });
      setFeedback(fetchedFeedback);
    } catch (err) {
      setError('Unable to load feedback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadFeedback();
  }, []);

  const handleModeration = async (id: string, status: 'approved' | 'removed') => {
    try {
      const { feedback: updated } = await adminService.moderateFeedback(id, { status });
      setFeedback((current) => current.filter((item) => item._id !== id).concat(updated));
    } catch (err) {
      setError('Unable to update feedback.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Customer experience</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Feedback moderation</h2>
        <p className="mt-2 text-sm text-slate-600">Review recent platform feedback and remove any content that violates community standards.</p>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Rating</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  Loading feedback…
                </td>
              </tr>
            ) : feedback.length ? (
              feedback.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4">
                    <div>{item.user?.fullName}</div>
                    <div className="text-xs text-slate-500">{item.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xl whitespace-pre-wrap break-words">{item.message}</td>
                  <td className="px-6 py-4">{item.rating} / 5</td>
                  <td className="px-6 py-4 capitalize">{item.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => void handleModeration(item._id, 'approved')}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => void handleModeration(item._id, 'removed')}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  No pending feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedback;
