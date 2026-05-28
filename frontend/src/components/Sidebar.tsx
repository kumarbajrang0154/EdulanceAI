import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const items =
    user.role === 'freelancer'
      ? ['Contracts', 'Proposals', 'Income', 'Messages']
      : user.role === 'admin'
      ? ['Users', 'Approvals', 'Reports', 'System']
      : ['Courses', 'Assignments', 'Progress', 'Messages'];

  return (
    <aside className="hidden w-72 shrink-0 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 lg:block">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[.3em] text-slate-500">Welcome, {user.fullName.split(' ')[0]}</p>
        <ul className="space-y-3 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="rounded-2xl px-4 py-3 transition hover:bg-slate-50">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
