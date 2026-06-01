type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
    <label className="block text-sm font-medium text-slate-700">Search services</label>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by service title, category, or skill"
      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    />
  </div>
);

export default SearchBar;
