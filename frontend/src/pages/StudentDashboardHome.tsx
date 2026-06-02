import { useMemo } from 'react';
import {
  DashboardLayout,
  DashboardHeader,
  ProfileCard,
  StatsCard,
  QuickActionCard,
  SectionTitle,
} from '../components/dashboard';
import { useStudentDashboard } from '../hooks/useStudentDashboard';

const StudentDashboardHome = () => {
  const { stats, activity, isLoading, error } = useStudentDashboard();

  const quickActions = [
    {
      title: 'Generate Notes',
      description: 'Create AI-powered study notes from your documents',
      icon: '📝',
      href: '/student/ai-notes',
    },
    {
      title: 'Build Resume',
      description: 'Create a professional resume with AI assistance',
      icon: '🎯',
      href: '/student/resume',
    },
    {
      title: 'Save Resources',
      description: 'Bookmark study guides and placement tools',
      icon: '💾',
      href: '/student/resources',
    },
    {
      title: 'Watch Videos',
      description: 'Access curated video learning resources',
      icon: '📺',
      href: '/student/videos',
    },
  ];

  const statsCards = useMemo(
    () => [
      {
        title: 'Saved Resources',
        value: stats?.resourcesSaved ?? 0,
        description: 'Saved guides and learning references',
        icon: '💾',
        trend: 'up' as const,
      },
      {
        title: 'AI Usage',
        value: stats?.aiUsageCount ?? 0,
        description: 'Summaries generated with AI',
        icon: '🤖',
        trend: 'up' as const,
      },
      {
        title: 'Resume Builds',
        value: stats?.resumeCount ?? 0,
        description: 'Resumes created and managed',
        icon: '📄',
        trend: 'up' as const,
      },
      {
        title: 'Videos Watched',
        value: stats?.videosWatched ?? 0,
        description: 'Learning videos completed',
        icon: '🎬',
        trend: 'up' as const,
      },
    ],
    [stats],
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Dashboard"
          description="Welcome back! Track your progress across AI, placements, and resources."
        />

        <section>
          <SectionTitle title="Your Profile" description="Your account summary and recent progress." />
          <ProfileCard showEditButton={true} />
        </section>

        <section>
          <SectionTitle title="Performance Overview" description="Review the latest summary of your student activity." />

          {error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat) => (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={stat.icon}
                  trend={stat.trend}
                  loading={isLoading}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionTitle title="Quick Actions" description="Jump straight into your most-used tools." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Recent Activity" description="Latest actions from your learning journey." />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {isLoading ? (
              <p className="text-sm text-slate-500">Loading recent activity...</p>
            ) : activity.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg font-medium text-slate-900">No activity tracked yet</p>
                <p className="mt-2 text-sm">Start using the student tools to see recent actions appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activity.map((item) => (
                  <div key={item._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 capitalize">
                          {item.activityType.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-slate-600 mt-2">{JSON.stringify(item.metadata)}</p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboardHome;
