interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
  href?: string;
}

const QuickActionCard = ({
  title,
  description,
  icon,
  onClick,
  href,
}: QuickActionCardProps) => {
  const content = (
    <div className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-4">
        Get Started
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md hover:bg-blue-50 transition-all duration-200 cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md hover:bg-blue-50 transition-all duration-200"
    >
      {content}
    </button>
  );
};

export default QuickActionCard;
