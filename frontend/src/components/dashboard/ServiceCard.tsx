import { ServiceItem } from '../../services/freelancer';

const ServiceCard = ({ service }: { service: ServiceItem }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{service.category}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">${service.price}</span>
    </div>
    <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
        {service.deliveryTime}
      </span>
      {service.tags.map((tag) => (
        <span key={tag} className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600">
          {tag}
        </span>
      ))}
    </div>
  </article>
);

export default ServiceCard;
