interface SummaryDisplayProps {
  fileName: string;
  summary: string;
  keyConcepts: string[];
  importantPoints: string[];
  examTips: string;
  processingTime: number;
}

const SummaryDisplay = ({
  fileName,
  summary,
  keyConcepts,
  importantPoints,
  examTips,
  processingTime,
}: SummaryDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* File Info Header */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">PDF Summary</p>
            <h3 className="text-xl font-semibold text-slate-900 mt-2">{fileName}</h3>
            <p className="text-sm text-slate-600 mt-2">
              ⏱️ Processed in {(processingTime / 1000).toFixed(2)} seconds
            </p>
          </div>
          <div className="text-3xl">✨</div>
        </div>
      </div>

      {/* Main Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-3">
          📝 Summary
        </h4>
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
      </div>

      {/* Key Concepts */}
      {keyConcepts && keyConcepts.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">
            💡 Key Concepts
          </h4>
          <div className="space-y-2">
            {keyConcepts.map((concept, idx) => (
              <div key={idx} className="flex gap-3 text-slate-700">
                <span className="text-blue-600 font-semibold">•</span>
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Points */}
      {importantPoints && importantPoints.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">
            ⭐ Important Points
          </h4>
          <div className="space-y-2">
            {importantPoints.map((point, idx) => (
              <div key={idx} className="flex gap-3 text-slate-700">
                <span className="text-amber-600 font-semibold">→</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Tips */}
      {examTips && (
        <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
          <h4 className="text-sm uppercase tracking-wide text-green-700 font-semibold mb-3">
            🎯 Exam Preparation Tips
          </h4>
          <p className="text-green-800 leading-relaxed whitespace-pre-wrap">{examTips}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryDisplay;
