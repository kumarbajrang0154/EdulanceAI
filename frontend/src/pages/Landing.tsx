import { Link } from 'react-router-dom';

const Landing = () => (
  <section className="grid min-h-[calc(100vh-96px)] place-items-center py-16">
    <div className="mx-auto w-full max-w-5xl space-y-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-100">
      <div className="space-y-5 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-700">Edulance AI</p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Build learning and freelancing experiences with AI-first SaaS architecture.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
          Launch a scalable platform for students, educators, and freelancers with a focused foundation for rapid growth.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/signup" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Get Started
          </Link>
          <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Existing account
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
