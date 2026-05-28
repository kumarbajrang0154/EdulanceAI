import { Resume } from '../../services/resume';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview = ({ resume }: ResumePreviewProps) => {
  const personal = resume.personalInfo;
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900 shadow-sm shadow-slate-100">
      <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{personal.name || 'Your Name'}</h2>
            <p className="text-sm text-slate-600">{personal.headline || 'Experienced student ready to contribute with strong skills and a growth mindset.'}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            {personal.location && <span>{personal.location}</span>}
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </div>

      {resume.about && (
        <section className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Profile</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">{resume.about}</p>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {resume.experience?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Experience</h3>
              <div className="mt-4 space-y-4">
                {resume.experience.map((experience, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-900">{experience.title || 'Role'}</p>
                      <span className="text-xs text-slate-500">{experience.startDate} — {experience.endDate || 'Present'}</span>
                    </div>
                    <p className="text-sm text-slate-600">{experience.company || 'Company'}</p>
                    {experience.summary && <p className="mt-2 text-sm leading-6 text-slate-700">{experience.summary}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.education?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Education</h3>
              <div className="mt-4 space-y-4">
                {resume.education.map((education, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-900">{education.degree || 'Degree'}</p>
                      <span className="text-xs text-slate-500">{education.startDate} — {education.endDate || 'Present'}</span>
                    </div>
                    <p className="text-sm text-slate-600">{education.institution || 'Institution'}</p>
                    {education.description && <p className="mt-2 text-sm leading-6 text-slate-700">{education.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.projects?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Projects</h3>
              <div className="mt-4 space-y-4">
                {resume.projects.map((project, index) => (
                  <div key={index}>
                    <p className="font-semibold text-slate-900">{project.name || 'Project'}</p>
                    {project.link && <p className="text-xs uppercase tracking-[.18em] text-blue-600">{project.link}</p>}
                    {project.description && <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {resume.skills?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resume.certifications?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Certifications</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {resume.certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-medium text-slate-900">{cert.name || 'Certification'}</p>
                    <p className="text-slate-500">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.achievements?.length > 0 && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[.18em] text-slate-700">Achievements</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
                {resume.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;
