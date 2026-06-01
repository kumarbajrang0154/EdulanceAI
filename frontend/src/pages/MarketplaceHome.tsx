import { useEffect, useMemo, useState } from 'react';
import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import SearchBar from '../components/marketplace/SearchBar';
import FilterSidebar from '../components/marketplace/FilterSidebar';
import { fetchMarketplaceServices, MarketplaceServiceItem } from '../services/marketplace';

const MarketplaceHome = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('latest');
  const [services, setServices] = useState<MarketplaceServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = useMemo(
    () => ({ search, category, minPrice, maxPrice, sort }),
    [search, category, minPrice, maxPrice, sort],
  );

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const queryParams = {
          search: filters.search,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sort: filters.sort === 'priceAsc' || filters.sort === 'priceDesc' ? filters.sort : undefined,
        };
        const data = await fetchMarketplaceServices(queryParams);
        setServices(data);
      } catch {
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Marketplace</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Browse freelancer services</h1>
        <p className="mt-2 text-sm text-slate-600">Discover curated services across web, design, AI and writing.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <FilterSidebar
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={setCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onClear={() => {
            setCategory('');
            setMinPrice('');
            setMaxPrice('');
            setSearch('');
            setSort('latest');
          }}
        />

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_auto] xl:items-center">
            <SearchBar value={search} onChange={setSearch} />
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
              <label className="block text-sm font-medium text-slate-700">Sort by</label>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              >
                <option value="latest">Latest</option>
                <option value="priceAsc">Price: Low to high</option>
                <option value="priceDesc">Price: High to low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading services...</div>
            ) : services.length ? (
              services.map((service) => <MarketplaceCard key={service._id} service={service} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">No services match your search.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHome;
