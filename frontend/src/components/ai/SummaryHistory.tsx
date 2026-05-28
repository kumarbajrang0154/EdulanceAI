import { useState, type MouseEvent } from 'react';
import { deleteNote } from '../../services/ai';

interface HistoryItem {
  _id: string;
  originalFileName: string;
  createdAt: string;
  summaryLength: number;
  textLength: number;
  processingTime: number;
}

interface SummaryHistoryProps {
  items: HistoryItem[];
  onItemClick: (id: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const SummaryHistory = ({
  items,
  onItemClick,
  onRefresh,
  isLoading = false,
}: SummaryHistoryProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this summary?')) return;

    setDeletingId(id);
    try {
      await deleteNote(id);
      onRefresh();
    } catch (error) {
      alert('Failed to delete summary');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-2xl mb-2">📚</p>
        <p className="text-slate-600 font-medium">No summaries yet</p>
        <p className="text-sm text-slate-500 mt-2">
          Upload a PDF to generate your first AI summary
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => onItemClick(item._id)}
          className="rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md hover:bg-blue-50 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 truncate">
                {item.originalFileName}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                📅 {formatDate(item.createdAt)}
              </p>
              <div className="flex gap-4 text-xs text-slate-600 mt-2">
                <span>📖 {formatFileSize(item.textLength)} text</span>
                <span>📝 {formatFileSize(item.summaryLength)} summary</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleDelete(item._id, e)}
                disabled={deletingId === item._id || isLoading}
                className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors disabled:opacity-50"
                title="Delete summary"
              >
                {deletingId === item._id ? (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-red-600 animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
              <svg
                className="w-5 h-5 text-slate-400"
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
        </div>
      ))}
    </div>
  );
};

export default SummaryHistory;
