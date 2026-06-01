import { useEffect, useState } from 'react';
import { fetchRequestsForUser, ServiceRequestItem } from '../services/marketplace';

const UserRequestsDashboard = () => {
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      try {
        const data = await fetchRequestsForUser();
        setRequests(data);
      } catch {
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">My requests</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Track your service requests</h1>
        <p className="mt-2 text-sm text-slate-600">Monitor the status of requests you sent to freelancers.</p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading requests...</div>
        ) : requests.length ? (
          requests.map((request) => (
            <article key={request._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{request.serviceId.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">With {request.freelancerId.fullName}</p>
                </div>
                <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{request.requestStatus}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{request.message}</p>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">You have not created any service requests yet.</div>
        )}
      </div>
    </div>
  );
};

export default UserRequestsDashboard;
