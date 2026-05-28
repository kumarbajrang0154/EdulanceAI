import { useState } from 'react';
import {
  DashboardLayout,
  DashboardHeader,
  SectionTitle,
} from '../components/dashboard';
import { PDFUploader, SummaryDisplay, AIAlert } from '../components/ai';
import { type UploadResponse } from '../services/ai';

interface SummaryData {
  _id: string;
  fileName: string;
  summary: string;
  keyConcepts: string[];
  importantPoints: string[];
  examTips: string;
  pageCount: number;
  processingTime: number;
}

const AINotesPage = () => {
  const [currentSummary, setCurrentSummary] = useState<SummaryData | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleUploadSuccess = (note: UploadResponse['note']) => {
    setCurrentSummary({
      _id: note._id,
      fileName: note.fileName,
      summary: note.summary,
      keyConcepts: note.keyConcepts,
      importantPoints: note.importantPoints,
      examTips: note.examTips,
      pageCount: note.pageCount,
      processingTime: note.processingTime,
    });
    setAlert({
      type: 'success',
      message: '✨ PDF processed successfully! Your summary is ready.',
    });
  };

  const handleUploadError = (error: string) => {
    setAlert({
      type: 'error',
      message: error || 'Failed to process PDF. Please try again.',
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="AI Notes Summary"
          description="Upload your study notes and get AI-powered summaries with key concepts and exam tips"
        />

        {/* Alert Messages */}
        {alert && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <AIAlert
              type={alert.type}
              message={alert.message}
              onClose={closeAlert}
              autoClose={true}
              autoCloseTime={6000}
            />
          </div>
        )}

        {/* Current Summary or Upload Section */}
        {currentSummary ? (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Your Latest Summary</h2>
                <p className="text-sm text-slate-600 mt-1">Review the AI-generated summary below</p>
              </div>
              <button
                onClick={() => setCurrentSummary(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                ← Upload Another PDF
              </button>
            </div>
            <SummaryDisplay
              fileName={currentSummary.fileName}
              summary={currentSummary.summary}
              keyConcepts={currentSummary.keyConcepts}
              importantPoints={currentSummary.importantPoints}
              examTips={currentSummary.examTips}
              processingTime={currentSummary.processingTime}
            />
          </section>
        ) : (
          <section>
            <SectionTitle
              title="Upload PDF Notes"
              description="Drag and drop or click to upload your study notes"
            />
            <PDFUploader
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
            />
          </section>
        )}

        {/* How It Works */}
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50 p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">⚡ How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Upload', desc: 'Drop your PDF file' },
              { num: '2', title: 'Extract', desc: 'Text is extracted' },
              { num: '3', title: 'Analyze', desc: 'AI processes content' },
              { num: '4', title: 'Summary', desc: 'Get results' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto mb-2">
                  {step.num}
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-sm font-semibold text-amber-900 mb-3">💡 Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>✓ Upload clear, well-formatted PDFs for best results</li>
            <li>✓ PDFs with 10+ pages work best</li>
            <li>✓ Avoid image-based PDFs (scanned documents may not work)</li>
            <li>✓ Maximum file size: 25MB</li>
          </ul>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AINotesPage;
