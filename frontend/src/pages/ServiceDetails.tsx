import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ServiceDetailsCard from '../components/marketplace/ServiceDetailsCard';
import RequestForm from '../components/marketplace/RequestForm';
import { fetchServiceDetails, createServiceRequest, MarketplaceServiceItem } from '../services/marketplace';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState<MarketplaceServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadService = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchServiceDetails(id);
        setService(data);
      } catch {
        setError('Unable to load service details.');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleRequest = async (message: string) => {
    if (!service) {
      throw new Error('Service missing');
    }
    await createServiceRequest({ serviceId: service._id, message });
  };

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading service details...</div>;
  }

  if (error || !service) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm shadow-red-100">{error || 'Service not found.'}</div>;
  }

  return (
    <div className="space-y-6">
      <ServiceDetailsCard service={service} />
      {typeof service.userId !== 'string' && service.userId?._id && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Freelancer</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-100">
              {service.userId.profileImage ? (
                <img src={service.userId.profileImage} alt={service.userId.fullName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-500">?</div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">{service.userId.fullName}</p>
              <Link to={`/marketplace/freelancer/${service.userId._id}`} className="text-sm font-medium text-brand-600 hover:text-brand-800">View profile</Link>
            </div>
          </div>
        </div>
      )}
      <RequestForm onSubmit={handleRequest} />
    </div>
  );
};

export default ServiceDetails;
