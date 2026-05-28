import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';
import {
  deleteSavedResource,
  getSavedResources,
  type SavedResource,
} from '../services/placement';

const SavedResourcesPage = () => {
  const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'All' | 'article' | 'video' | 'document' | 'guide' | 'practice'>('All');

  const loadSavedResources = async () => {
    setLoading(true);
    try {
      const { savedResources } = await getSavedResources();
      setSavedResources(savedResources);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedResources();
  }, []);

  const handleRemove = async (id: string) => {
    setLoading(true);
    try {
      await deleteSavedResource(id);
      setSavedResources((prev) => prev.filter((item) => item._id !== id));
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = useMemo(
    () =>
      savedResources.filter((item) =>
        filter === 'All' ? true : item.resource.type === filter,
      ),
    [filter, savedResources],
  );

  const resourceCounts = useMemo(() => {
    const counts = { article: 0, video: 0, document: 0, guide: 0, practice: 0 };
    savedResources.forEach((item) => {
      counts[item.resource.type] += 1;
    });
    return counts;
  }, [savedResources]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Saved Resources"
          description="Manage all your saved learning materials in one place."
        />

        <section>
          <SectionTitle
            title="Your Resources"
            description="Access saved articles, documents, videos, and study guides."
          />

          <div className="mb-6 flex flex-wrap gap-2">
            {['All', 'article', 'video', 'document', 'guide', 'practice'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option === 'All' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {filteredResources.length === 0 ? (
            <article className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-2xl mb-2">💾</p>
              <p className="text-slate-600">No saved resources yet.</p>
              <p className="text-sm text-slate-500 mt-2">Save articles, videos, and guides while preparing for placements.</p>
            </article>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((item) => (
                <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.resource.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.resource.description}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                      {item.resource.type}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                    <a href={item.resource.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">
                      Open Resource
                    </a>
                    <button
                      disabled={loading}
                      onClick={() => handleRemove(item._id)}
                      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionTitle title="Saved Resource Breakdown" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { icon: '📄', label: 'Articles', count: resourceCounts.article },
              { icon: '🎬', label: 'Videos', count: resourceCounts.video },
              { icon: '📋', label: 'Documents', count: resourceCounts.document },
              { icon: '📘', label: 'Guides', count: resourceCounts.guide },
              { icon: '🔧', label: 'Practice', count: resourceCounts.practice },
            ].map((category) => (
              <article key={category.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h4 className="font-semibold text-slate-900">{category.label}</h4>
                <p className="text-sm text-slate-600 mt-1">{category.count} saved</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SavedResourcesPage;
