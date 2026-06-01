type ProjectStatusCardProps = {
  title: string;
  status: string;
  deadline?: string;
  description: string;
  freelancerName?: string;
};

const ProjectStatusCard = ({ title, status, deadline, description, freelancerName }: ProjectStatusCardProps) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{freelancerName ? `Freelancer: ${freelancerName}` : 'Project workflow'}</p>
      </div>
      <span className="rounded-full bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{status}</span>
    </div>
    <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    {deadline && <p className="mt-4 text-sm font-semibold text-slate-900">Deadline: {new Date(deadline).toLocaleDateString()}</p>}
  </article>
);

export default ProjectStatusCard;
