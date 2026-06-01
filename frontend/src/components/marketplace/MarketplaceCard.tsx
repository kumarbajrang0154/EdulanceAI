import { MarketplaceServiceItem } from '../../services/marketplace';
import { Link } from 'react-router-dom';

const MarketplaceCard = ({ service }: { service: MarketplaceServiceItem }) => (
  <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{service.category}</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{service.title}</h3>
      </div>
      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">${service.price}</span>
    </div>
    <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
      {service.tags.slice(0, 4).map((tag) => (
        <span key={tag} className="rounded-full bg-slate-50 px-3 py-1">
          {tag}
        </span>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">{service.deliveryTime} delivery</span>
      <Link
        to={`/marketplace/service/${service._id}`}
        className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
      >
        View service
      </Link>
    </div>
  </article>
);

export default MarketplaceCard;
