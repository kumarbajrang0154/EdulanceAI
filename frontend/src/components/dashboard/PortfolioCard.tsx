import { PortfolioItem } from '../../services/freelancer';

const PortfolioCard = ({ portfolio }: { portfolio: PortfolioItem }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
    <h3 className="text-xl font-semibold text-slate-900">{portfolio.title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-600">{portfolio.description}</p>
    <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
      {portfolio.technologies.map((tech) => (
        <span key={tech} className="rounded-full bg-slate-100 px-3 py-1">
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-5 flex flex-wrap gap-3 text-sm">
      {portfolio.liveLink && (
        <a href={portfolio.liveLink} target="_blank" rel="noreferrer" className="rounded-full bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100">
          Live preview
        </a>
      )}
      {portfolio.githubLink && (
        <a href={portfolio.githubLink} target="_blank" rel="noreferrer" className="rounded-full bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100">
          GitHub
        </a>
      )}
    </div>
  </article>
);

export default PortfolioCard;
