import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout, DashboardHeader } from '../components/dashboard';
import LoadingSpinner from '../components/LoadingSpinner';
import ResumeForm from '../components/resume/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import ResumeCard from '../components/resume/ResumeCard';
import TemplateSelector from '../components/resume/TemplateSelector';
import {
  createResume,
  deleteResume,
  duplicateResume,
  downloadResume,
  getResumes,
  updateResume,
  type Resume,
  type ResumeTemplate,
} from '../services/resume';

const emptyResume = (): Resume => ({
  title: 'New Resume',
  template: 'professional',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    headline: '',
    location: '',
    website: '',
  },
  about: '',
  education: [
    {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    },
  ],
  experience: [
    {
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      summary: '',
    },
  ],
  projects: [
    {
      name: '',
      description: '',
      link: '',
      technologies: '',
    },
  ],
  skills: [''],
  certifications: [
    {
      name: '',
      issuer: '',
      date: '',
    },
  ],
  achievements: [''],
  socialLinks: {
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
  },
});

const normalizeResume = (resume: Resume) => ({
  ...resume,
  education: resume.education.filter((item) => item.institution || item.degree || item.fieldOfStudy || item.description),
  experience: resume.experience.filter((item) => item.company || item.title || item.summary),
  projects: resume.projects.filter((item) => item.name || item.description),
  skills: resume.skills.map((skill) => skill.trim()).filter(Boolean),
  certifications: resume.certifications.filter((item) => item.name || item.issuer),
  achievements: resume.achievements.map((item) => item.trim()).filter(Boolean),
});

const ResumeBuilderPage = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [workingResume, setWorkingResume] = useState<Resume>(emptyResume());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedResume = useMemo(
    () => resumes.find((item) => item._id === activeResumeId) || null,
    [resumes, activeResumeId],
  );

  const loadResumes = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const list = await getResumes();
      setResumes(list);
      if (list.length > 0) {
        const first = list[0];
        setActiveResumeId(first._id ?? null);
        setWorkingResume(first);
      } else {
        setActiveResumeId(null);
        setWorkingResume(emptyResume());
      }
    } catch {
      setError('Unable to load resumes. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  useEffect(() => {
    if (selectedResume) {
      setWorkingResume(selectedResume);
    }
  }, [selectedResume]);

  const handleCreateNew = () => {
    setActiveResumeId(null);
    setWorkingResume(emptyResume());
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const payload = normalizeResume(workingResume);
      let saved: Resume;
      if (workingResume._id) {
        saved = await updateResume(workingResume._id, payload);
      } else {
        saved = await createResume(payload);
      }
      await loadResumes();
      setActiveResumeId(saved._id ?? null);
      setWorkingResume(saved);
    } catch {
      setError('Unable to save resume. Please review your information and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (resumeId: string) => {
    setError(null);
    try {
      await deleteResume(resumeId);
      await loadResumes();
      setActiveResumeId(null);
      setWorkingResume(emptyResume());
    } catch {
      setError('Unable to delete the resume.');
    }
  };

  const handleDuplicate = async (resumeId: string) => {
    setError(null);
    try {
      const duplicated = await duplicateResume(resumeId);
      await loadResumes();
      setActiveResumeId(duplicated._id ?? null);
      setWorkingResume(duplicated);
    } catch {
      setError('Unable to duplicate the resume.');
    }
  };

  const handleDownload = async () => {
    if (!workingResume._id) {
      setError('Save the resume before downloading.');
      return;
    }
    setIsDownloading(true);
    setError(null);
    try {
      const file = await downloadResume(workingResume._id);
      const blob = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${workingResume.title || 'resume'}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Unable to generate PDF. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTemplateChange = (template: ResumeTemplate) => {
    setWorkingResume({ ...workingResume, template });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Resume Builder"
          description="Create, edit, preview, and download professional resumes with a responsive builder."
        />

        <section className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Resume Library</h3>
                  <p className="text-sm text-slate-500">Manage multiple resume versions for your career goals.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Create new resume
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
                  <LoadingSpinner />
                </div>
              ) : resumes.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-100">
                  <p className="text-sm text-slate-600">No resumes saved yet. Start with a new resume and save it to your account.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <ResumeCard
                      key={resume._id}
                      resume={resume}
                      active={resume._id === activeResumeId}
                      onSelect={() => {
                        setActiveResumeId(resume._id ?? null);
                        setWorkingResume(resume);
                      }}
                      onDelete={() => resume._id && handleDelete(resume._id)}
                      onDuplicate={() => resume._id && handleDuplicate(resume._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Editor Actions</h3>
                  <p className="text-sm text-slate-500">Save or export the current resume after making updates.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? 'Saving...' : 'Save resume'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading || !workingResume._id}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                  </button>
                </div>
              </div>
            </div>

            <TemplateSelector selectedTemplate={workingResume.template} onTemplateChange={handleTemplateChange} />

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div>
                <ResumeForm resume={workingResume} onChange={setWorkingResume} />
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Live Preview</h3>
                    <p className="text-sm text-slate-500">Review your resume layout as you edit content.</p>
                  </div>
                </div>
                <ResumePreview resume={workingResume} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilderPage;
