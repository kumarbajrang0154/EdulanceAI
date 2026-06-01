import { MarketplaceServiceItem } from '../../services/marketplace';

const ServiceDetailsCard = ({ service }: { service: MarketplaceServiceItem }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Service overview</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{service.title}</h1>
      </div>
      <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{service.category}</div>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl bg-slate-50 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Price</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">${service.price}</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Delivery</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{service.deliveryTime}</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Revisions</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{service.revisions}</p>
      </div>
    </div>
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-slate-900">What this service includes</h2>
      <ul className="mt-4 grid gap-3">
        {service.features.length ? service.features.map((feature) => (
          <li key={feature} className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            {feature}
          </li>
        )) : <li className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">No features defined yet.</li>}
      </ul>
    </div>
  </section>
);

export default ServiceDetailsCard;
