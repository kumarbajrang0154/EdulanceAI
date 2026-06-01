import { useEffect, useState } from 'react';
import { createService, deleteServiceItem, fetchServices, ServiceItem, updateService } from '../services/freelancer';
import ServiceCard from '../components/dashboard/ServiceCard';

const initialFormState = {
  title: '',
  description: '',
  category: '',
  price: '',
  deliveryTime: '',
  tags: '',
  thumbnail: '',
};

const FreelancerServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadServices = async () => {
    try {
      const response = await fetchServices();
      setServices(response);
    } catch {
      setServices([]);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialFormState);
    setMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      price: Number(form.price) || 0,
      deliveryTime: form.deliveryTime,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      thumbnail: form.thumbnail,
    };

    try {
      if (editingId) {
        await updateService(editingId, payload);
        setMessage('Service updated successfully.');
      } else {
        await createService(payload);
        setMessage('Service created successfully.');
      }
      resetForm();
      loadServices();
    } catch {
      setMessage('Unable to save service.');
    }
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      category: service.category,
      price: String(service.price),
      deliveryTime: service.deliveryTime,
      tags: service.tags.join(', '),
      thumbnail: service.thumbnail,
    });
    setMessage('Editing service. Save to update.');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteServiceItem(id);
      loadServices();
      setMessage('Service deleted successfully.');
    } catch {
      setMessage('Unable to delete service.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Service structure</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Manage freelancer services</h2>
        <p className="mt-2 text-sm text-slate-600">Build a scalable service catalog for the marketplace.</p>
      </div>

      {message && <p className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Service title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            required
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Price</span>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Delivery time</span>
            <input
              type="text"
              value={form.deliveryTime}
              onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
              placeholder="e.g. 3 days"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Thumbnail</span>
            <input
              type="text"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              placeholder="Image URL"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Tags</span>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="UI/UX, branding, web app"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            {editingId ? 'Update service' : 'Add new service'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service._id} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <ServiceCard service={service} />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleEdit(service)}
                className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(service._id)}
                className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerServices;
