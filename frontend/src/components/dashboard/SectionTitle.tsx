interface SectionTitleProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const SectionTitle = ({ title, description, action }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default SectionTitle;
