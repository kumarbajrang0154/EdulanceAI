import { useEffect, useState } from 'react';
import { updateServiceRequest, fetchRequestsForFreelancer, ServiceRequestItem } from '../services/marketplace';

const ProjectRequests = () => {
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestsForFreelancer();
      setRequests(data);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdate = async (id: string, status: string) => {
    try {
      setMessage('Updating request...');
      await updateServiceRequest(id, { requestStatus: status });
      setMessage('Request updated successfully.');
      loadRequests();
    } catch {
      setMessage('Unable to update request.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Service requests</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Incoming client requests</h1>
        <p className="mt-2 text-sm text-slate-600">Review requests and manage approvals for your services.</p>
      </div>

      {message && <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">{message}</div>}

      <div className="grid gap-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading requests...</div>
        ) : requests.length ? (
          requests.map((request) => (
            <article key={request._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{request.serviceId.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">From {request.senderId.fullName}</p>
                </div>
                <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{request.requestStatus}</span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{request.message}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {request.requestStatus === 'Pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleUpdate(request._id, 'Accepted')}
                      className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(request._id, 'Rejected')}
                      className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">No incoming requests yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectRequests;
