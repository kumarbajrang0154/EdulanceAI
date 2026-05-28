import { useEffect, useState } from 'react';
import {
  DashboardLayout,
  DashboardHeader,
  SectionTitle,
} from '../components/dashboard';
import { SummaryHistory, AIAlert } from '../components/ai';
import { getNoteHistory, getNoteById } from '../services/ai';

interface HistoryItem {
  _id: string;
  originalFileName: string;
  createdAt: string;
  summaryLength: number;
  textLength: number;
  processingTime: number;
}

interface FullNote {
  _id: string;
  originalFileName: string;
  aiSummary: string;
  keyConcepts: string[];
  importantPoints: string[];
  examTips: string;
  textLength: number;
  summaryLength: number;
  processingTime: number;
  createdAt: string;
}

const SummaryHistoryPage = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedNote, setSelectedNote] = useState<FullNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadHistory = async (pageNum: number = 1) => {
    setIsLoading(true);
    try {
      const response = await getNoteHistory(pageNum, 10);
      setHistoryItems(response.notes);
      setTotalPages(response.pagination.pages);
      setAlert(null);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to load history';
      setAlert({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = async (id: string) => {
    try {
      const response = await getNoteById(id);
      setSelectedNote(response.note);
    } catch (error: unknown) {
      setAlert({
        type: 'error',
        message: 'Failed to load summary details',
      });
    }
  };

  const handleRefresh = () => {
    setSelectedNote(null);
    loadHistory(page);
    setAlert({
      type: 'success',
      message: 'Summary deleted successfully',
    });
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const fetchHistory = async () => {
      await loadHistory(page);
    };
    void fetchHistory();
  }, [page]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Summary History"
          description="View all your AI-generated summaries and manage your notes"
        />

        {/* Alert Messages */}
        {alert && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <AIAlert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              autoClose={true}
              autoCloseTime={5000}
            />
          </div>
        )}

        {/* Selected Summary View */}
        {selectedNote ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedNote(null)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to History
            </button>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">PDF Summary</p>
                  <h3 className="text-xl font-semibold text-slate-900 mt-2">{selectedNote.originalFileName}</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    📅 {new Date(selectedNote.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="text-3xl">📚</div>
              </div>
            </div>

            {/* Summary Content */}
            <div className="space-y-6">
              {/* Main Summary */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">
                  📝 Summary
                </h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedNote.aiSummary}</p>
              </div>

              {/* Key Concepts */}
              {selectedNote.keyConcepts && selectedNote.keyConcepts.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">
                    💡 Key Concepts
                  </h4>
                  <div className="space-y-2">
                    {selectedNote.keyConcepts.map((concept, idx) => (
                      <div key={idx} className="flex gap-3 text-slate-700">
                        <span className="text-blue-600 font-semibold">•</span>
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Points */}
              {selectedNote.importantPoints && selectedNote.importantPoints.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">
                    ⭐ Important Points
                  </h4>
                  <div className="space-y-2">
                    {selectedNote.importantPoints.map((point, idx) => (
                      <div key={idx} className="flex gap-3 text-slate-700">
                        <span className="text-amber-600 font-semibold">→</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Tips */}
              {selectedNote.examTips && (
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
                  <h4 className="text-sm uppercase tracking-wide text-green-700 font-semibold mb-3">
                    🎯 Exam Preparation Tips
                  </h4>
                  <p className="text-green-800 leading-relaxed whitespace-pre-wrap">{selectedNote.examTips}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* History List */}
            <section>
              <SectionTitle
                title="Your Summaries"
                description={`${historyItems.length} summaries created`}
              />
              <SummaryHistory
                items={historyItems}
                onItemClick={handleItemClick}
                onRefresh={handleRefresh}
                isLoading={isLoading}
              />
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                >
                  ← Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isLoading}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SummaryHistoryPage;
