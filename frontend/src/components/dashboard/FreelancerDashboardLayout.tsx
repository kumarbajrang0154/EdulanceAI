import { Outlet } from 'react-router-dom';
import FreelancerNavbar from './FreelancerNavbar';
import FreelancerSidebar from './FreelancerSidebar';

const FreelancerDashboardLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <FreelancerNavbar />
    <div className="mx-auto flex max-w-[1440px] gap-6 px-4 py-6 md:px-8">
      <FreelancerSidebar />
      <main className="flex-1 min-h-[calc(100vh-96px)] rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
        <Outlet />
      </main>
    </div>
  </div>
);

export default FreelancerDashboardLayout;
