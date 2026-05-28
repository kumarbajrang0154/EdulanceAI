import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';

const VideoLearningPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Video Learning"
          description="Access curated video resources for your learning journey"
        />

        <section>
          <SectionTitle
            title="Learning Playlists"
            description="Organized video collections by topic"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '📚', title: 'Web Development', videos: 0 },
              { icon: '🐍', title: 'Python Basics', videos: 0 },
              { icon: '☕', title: 'Java Fundamentals', videos: 0 },
              { icon: '🗄️', title: 'Database Design', videos: 0 },
            ].map((playlist) => (
              <article
                key={playlist.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl">{playlist.icon}</p>
                    <h4 className="font-semibold text-slate-900 mt-2">{playlist.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{playlist.videos} videos</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">→</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Featured Videos" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <article key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-full h-40 bg-slate-300 flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900">Video Title {i}</h4>
                  <p className="text-xs text-slate-500 mt-2">Duration: 15 min</p>
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
