import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';
import Alert from '../components/Alert';
import { getVideoLibrary, watchVideo, type VideoContent } from '../services/videos';

const VideoLearningPage = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [watching, setWatching] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(videos.map((video) => video.category)))],
    [videos],
  );

  const filteredVideos = useMemo(
    () =>
      videos.filter((video) =>
        selectedCategory === 'All' ? true : video.category === selectedCategory,
      ),
    [selectedCategory, videos],
  );

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const response = await getVideoLibrary();
        setVideos(response.videos || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unable to load videos');
      } finally {
        setLoading(false);
      }
    };

    void loadVideos();
  }, []);

  const handleWatch = async (video: VideoContent) => {
    setWatching(video._id);
    setError(null);

    try {
      await watchVideo(video._id);
      window.open(video.url, '_blank', 'noopener,noreferrer');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to record video watch event');
    } finally {
      setWatching(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Video Learning"
          description="Access curated video courses and track your watch history."
        />

        {error && <Alert message={error} variant="error" />}

        <section>
          <SectionTitle title="Browse Video Library" description="Watch student-focused learning videos curated for placements." />
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              Loading videos…
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
              No videos found for the selected category.
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredVideos.map((video) => (
                <article
                  key={video._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900">{video.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{video.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-slate-100 px-2 py-1 uppercase tracking-wide">{video.category}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-1">{video.views} views</span>
                        {video.featured && <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">Featured</span>}
                      </div>
                    </div>
                    <button
                      disabled={watching === video._id}
                      onClick={() => handleWatch(video)}
                      className="mt-3 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {watching === video._id ? 'Recording…' : 'Watch Now'}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionTitle title="Featured Playlists" description="Recommended playlists for fast placement prep." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Interview Mastery', 'System Design', 'Frontend Career', 'Backend Architecture'].map((playlist) => (
              <article
                key={playlist}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl">🎥</p>
                    <h4 className="font-semibold text-slate-900 mt-3">{playlist}</h4>
                    <p className="mt-2 text-sm text-slate-600">Curated lessons to help you build confidence for interviews.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-700">Updated</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default VideoLearningPage;
