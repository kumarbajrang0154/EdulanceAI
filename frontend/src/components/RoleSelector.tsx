type RoleSelectorProps = {
  role: 'student' | 'freelancer';
  onChange: (value: 'student' | 'freelancer') => void;
};

const RoleSelector = ({ role, onChange }: RoleSelectorProps) => (
  <label className="block text-sm font-medium text-slate-700">
    Role
    <select
      value={role}
      onChange={(event) => onChange(event.target.value as 'student' | 'freelancer')}
      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    >
      <option value="student">Student</option>
      <option value="freelancer">Freelancer</option>
    </select>
  </label>
);

export default RoleSelector;
