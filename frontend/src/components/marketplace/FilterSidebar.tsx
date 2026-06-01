type FilterSidebarProps = {
  category: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
};

const categories = ['Web Development', 'UI/UX Design', 'AI/ML', 'Graphic Design', 'Resume Services', 'Content Writing'];

const FilterSidebar = ({ category, minPrice, maxPrice, onCategoryChange, onMinPriceChange, onMaxPriceChange, onClear }: FilterSidebarProps) => (
  <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div>
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Filters</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">Refine results</h2>
    </div>
    <div className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Category</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Min price</span>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => onMinPriceChange(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Max price</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 w-full rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        Clear filters
      </button>
    </div>
  </aside>
);

export default FilterSidebar;
