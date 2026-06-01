import { useEffect, useState } from 'react';
import { createPortfolio, deletePortfolioItem, fetchPortfolio, PortfolioItem, updatePortfolio } from '../services/freelancer';
import PortfolioCard from '../components/dashboard/PortfolioCard';

const initialFormState = {
  title: '',
  description: '',
  technologies: '',
  images: '',
  liveLink: '',
  githubLink: '',
};

const FreelancerPortfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const portfolio = await fetchPortfolio();
      setItems(portfolio);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
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
      technologies: form.technologies.split(',').map((tech) => tech.trim()).filter(Boolean),
      images: form.images.split(',').map((img) => img.trim()).filter(Boolean),
      liveLink: form.liveLink,
      githubLink: form.githubLink,
    };

    try {
      if (editingId) {
        await updatePortfolio(editingId, payload);
        setMessage('Portfolio updated successfully.');
      } else {
        await createPortfolio(payload);
        setMessage('Portfolio project created successfully.');
      }
      resetForm();
      loadItems();
    } catch {
      setMessage('Unable to save portfolio entry.');
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      technologies: item.technologies.join(', '),
      images: item.images.join(', '),
      liveLink: item.liveLink,
      githubLink: item.githubLink,
    });
    setMessage('Editing portfolio item. Save to update.');
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePortfolioItem(id);
      loadItems();
      setMessage('Portfolio item deleted.');
    } catch {
      setMessage('Unable to delete portfolio item.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Portfolio management</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Project showcase</h2>
        <p className="mt-2 text-sm text-slate-600">Create, update, and manage portfolio items for future clients.</p>
      </div>

      {message && <p className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Live link</span>
            <input
              type="url"
              value={form.liveLink}
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
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
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Technologies</span>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="React, Node.js, Tailwind"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">GitHub link</span>
            <input
              type="url"
              value={form.githubLink}
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Images</span>
          <input
            type="text"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            placeholder="Image URLs separated by comma"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            {editingId ? 'Update portfolio' : 'Add portfolio item'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="group relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
            <PortfolioCard portfolio={item} />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                onClick={() => handleDelete(item._id)}
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

export default FreelancerPortfolio;
