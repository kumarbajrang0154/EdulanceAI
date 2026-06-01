import { FormEvent, useEffect, useState } from 'react';
import * as adminService from '../services/admin';

const AdminVideoManagement = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({ title: '', description: '', url: '', category: '', tags: '' });

  const loadVideos = async () => {
    try {
      setLoading(true);
      const { videos: fetchedVideos } = await adminService.getVideos();
      setVideos(fetchedVideos);
    } catch (err) {
      setError('Unable to load videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadVideos();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { video } = await adminService.createVideo({
        ...formState,
        tags: formState.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      });
      setVideos((current) => [video, ...current]);
      setFormState({ title: '', description: '', url: '', category: '', tags: '' });
    } catch (err) {
      setError('Unable to add video.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminService.deleteVideo(id);
      setVideos((current) => current.filter((video) => video._id !== id));
    } catch (err) {
      setError('Unable to remove video.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Video library</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Manage training content</h2>
          <p className="mt-2 text-sm text-slate-600">Publish new documentation videos, categorize resources, and archive outdated content.</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Add new video</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Title</label>
              <input
                value={formState.title}
                onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                placeholder="Video title"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">URL</label>
              <input
                value={formState.url}
                onChange={(event) => setFormState({ ...formState, url: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Category</label>
              <input
                value={formState.category}
                onChange={(event) => setFormState({ ...formState, category: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Tags</label>
              <input
                value={formState.tags}
                onChange={(event) => setFormState({ ...formState, tags: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                placeholder="tag1, tag2"
              />
            </div>
            <button className="w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Publish video
            </button>
          </form>
        </section>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Created</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  Loading videos…
                </td>
              </tr>
            ) : videos.length ? (
              videos.map((video) => (
                <tr key={video._id}>
                  <td className="px-6 py-4">{video.title}</td>
                  <td className="px-6 py-4">{video.category}</td>
                  <td className="px-6 py-4 capitalize">{video.status}</td>
                  <td className="px-6 py-4">{new Date(video.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 space-x-2">
                    <a href={video.url} target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-800 transition hover:bg-slate-200">
                      Preview
                    </a>
                    <button
                      onClick={() => void handleDelete(video._id)}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-10 text-slate-500" colSpan={5}>
                  No videos available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVideoManagement;
