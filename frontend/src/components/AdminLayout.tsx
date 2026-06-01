import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 md:px-8">
      <Sidebar />
      <main className="flex-1 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Platform management</h1>
          <p className="mt-2 text-sm text-slate-600">Use the side navigation to manage users, content, and platform health.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">{children}</div>
      </main>
    </div>
  </div>
);

export default AdminLayout;
