import {
  DashboardLayout,
  DashboardHeader,
  ProfileCard,
  StatsCard,
  QuickActionCard,
  SectionTitle,
} from '../components/dashboard';

const StudentDashboardHome = () => {
  // Mock data - will be replaced with API calls
  const stats = [
    { title: 'Saved Resources', value: 12, description: 'Articles and guides saved', icon: '💾', trend: 'up' as const },
    { title: 'AI Usage', value: 8, description: 'Queries used this month', icon: '🤖', trend: 'neutral' as const },
    { title: 'Resume Created', value: 2, description: 'Resumes in your portfolio', icon: '📄', trend: 'up' as const },
    { title: 'Videos Watched', value: 23, description: 'Total educational videos', icon: '🎬', trend: 'up' as const },
  ];

  const quickActions = [
    {
      title: 'Generate Notes',
      description: 'Create AI-powered study notes from your documents',
      icon: '📝',
      href: '/student/ai-notes',
    },
    {
      title: 'Upload PDF',
      description: 'Upload documents for analysis and learning',
      icon: '📤',
      href: '/student/ai-notes',
    },
    {
      title: 'Build Resume',
      description: 'Create a professional resume with AI assistance',
      icon: '🎯',
      href: '/student/resume',
    },
    {
      title: 'Watch Videos',
      description: 'Access curated video learning resources',
      icon: '📺',
      href: '/student/videos',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <DashboardHeader
          title="Dashboard"
          description="Welcome back! Here's what's happening with your learning journey."
        />

        {/* Profile Section */}
        <section>
          <SectionTitle title="Your Profile" description="Your account information and statistics" />
          <ProfileCard showEditButton={true} />
        </section>

        {/* Stats Section */}
        <section>
          <SectionTitle title="Your Statistics" description="Track your learning progress" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section>
          <SectionTitle
            title="Quick Actions"
            description="Get started with these popular features"
          />
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

        {/* Activity Section */}
        <section>
          <SectionTitle
            title="Recent Activity"
            description="Your latest interactions"
            action={{ label: 'View All', onClick: () => {} }}
          />
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-center py-8">
              <p className="text-slate-600">No recent activity yet.</p>
              <p className="text-sm text-slate-500 mt-2">
                Start using Edulance AI features to see your activity here
              </p>
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboardHome;
