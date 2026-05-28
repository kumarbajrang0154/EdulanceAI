import { Resume } from '../../services/resume';

interface ResumeCardProps {
  resume: Resume;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const ResumeCard = ({ resume, active, onSelect, onDelete, onDuplicate }: ResumeCardProps) => (
  <div
    onClick={onSelect}
    className={`cursor-pointer rounded-3xl border p-4 transition ${
      active ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{resume.title || 'Untitled Resume'}</p>
        <p className="text-xs text-slate-500">{resume.template} template</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[.18em] text-slate-500">
        {resume.skills?.length || 0} skills
      </span>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDuplicate();
        }}
        className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-50"
      >
        Duplicate
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
        className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 transition hover:bg-red-100"
      >
        Delete
      </button>
    </div>
  </div>
);

export default ResumeCard;
