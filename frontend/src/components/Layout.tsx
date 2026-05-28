import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 md:px-8">
      <Sidebar />
      <main className="flex-1 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
