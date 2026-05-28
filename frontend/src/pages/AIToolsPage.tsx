import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';

const AIToolsPage = () => {
  const tools = [
    {
      title: 'Note Generator',
      description: 'Generate study notes from your documents',
      icon: '📝',
      status: 'Coming Soon',
    },
    {
      title: 'Code Explainer',
      description: 'Understand complex code with AI',
      icon: '💻',
      status: 'Coming Soon',
    },
    {
      title: 'Question Generator',
      description: 'Create practice questions from content',
      icon: '❓',
      status: 'Coming Soon',
    },
    {
      title: 'Essay Reviewer',
      description: 'Get AI feedback on your essays',
      icon: '📋',
      status: 'Coming Soon',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="AI Tools"
          description="Powerful AI-powered tools to enhance your learning experience"
        />

        <section>
          <SectionTitle title="Available Tools" description="Explore our collection of AI features" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <article
                key={tool.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{tool.description}</p>
                <div className="mt-4">
                  <span className="inline-block px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    {tool.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              🚀 More AI tools are being developed and will be available soon!
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AIToolsPage;
