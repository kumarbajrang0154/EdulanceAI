import { useEffect, useState } from 'react';
import * as adminService from '../services/admin';

const AdminVerifications = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRequests = async () => {
    try {
      setLoading(true);
      const { requests: fetchedRequests } = await adminService.getVerificationRequests();
      setRequests(fetchedRequests);
    } catch (err) {
      setError('Unable to load verification requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRequests();
  }, []);

  const handleModeration = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { request } = await adminService.moderateVerificationRequest(id, { status });
      setRequests((current) => current.map((item) => (item._id === id ? request : item)));
    } catch (err) {
      setError('Unable to update verification request.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trust and verification</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Freelancer approvals</h2>
        <p className="mt-2 text-sm text-slate-600">Approve or reject verification requests, and review supporting details.</p>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Requested Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Submitted</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  Loading requests…
                </td>
              </tr>
            ) : requests.length ? (
              requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4">
                    <div>{request.user?.fullName}</div>
                    <div className="text-xs text-slate-500">{request.user?.email}</div>
                  </td>
                  <td className="px-6 py-4">{request.requestedRole}</td>
                  <td className="px-6 py-4 capitalize">{request.status}</td>
                  <td className="px-6 py-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => void handleModeration(request._id, 'approved')}
                      disabled={request.status !== 'pending'}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => void handleModeration(request._id, 'rejected')}
                      disabled={request.status !== 'pending'}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  No verification requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerifications;
