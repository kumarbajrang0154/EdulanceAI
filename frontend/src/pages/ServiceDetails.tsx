import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <RequestForm onSubmit={handleRequest} />
    </div>
  );
};

export default ServiceDetails;
