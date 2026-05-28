import { Resume } from '../../services/resume';

interface ResumeFormProps {
  resume: Resume;
  onChange: (updated: Resume) => void;
}

const ResumeForm = ({ resume, onChange }: ResumeFormProps) => {
  const handleFieldChange = (field: keyof Resume, value: any) => {
    onChange({ ...resume, [field]: value });
  };

  const handlePersonalChange = (field: keyof Resume['personalInfo'], value: string) => {
    onChange({
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value },
    });
  };

  const updateArrayItem = <T,>(key: keyof Resume, index: number, value: Partial<T>) => {
    const source = [...(resume[key] as T[])];
    source[index] = { ...source[index], ...value } as T;
    onChange({ ...resume, [key]: source });
  };

  const addArrayItem = <T,>(key: keyof Resume, newItem: T) => {
    onChange({ ...resume, [key]: [...(resume[key] as T[]), newItem] });
  };

  const removeArrayItem = (key: keyof Resume, index: number) => {
    const source = [...(resume[key] as any[])];
    source.splice(index, 1);
    onChange({ ...resume, [key]: source });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <h3 className="text-base font-semibold text-slate-900">Resume Basics</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            Title
            <input
              value={resume.title}
              onChange={(event) => handleFieldChange('title', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Headline
            <input
              value={resume.personalInfo.headline}
              onChange={(event) => handlePersonalChange('headline', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Full Name
            <input
              value={resume.personalInfo.name}
              onChange={(event) => handlePersonalChange('name', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Email
            <input
              value={resume.personalInfo.email}
              onChange={(event) => handlePersonalChange('email', event.target.value)}
              type="email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Phone
            <input
              value={resume.personalInfo.phone}
              onChange={(event) => handlePersonalChange('phone', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Location
            <input
              value={resume.personalInfo.location}
              onChange={(event) => handlePersonalChange('location', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700 sm:col-span-2">
            Website / Portfolio
            <input
              value={resume.personalInfo.website}
              onChange={(event) => handlePersonalChange('website', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <h3 className="text-base font-semibold text-slate-900">About / Summary</h3>
        <textarea
          rows={5}
          value={resume.about}
          onChange={(event) => handleFieldChange('about', event.target.value)}
          className="mt-4 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-blue-400"
          placeholder="Summarize your experience, strengths, and career goals."
        />
      </section>

      <section className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Education</h3>
              <p className="text-sm text-slate-500">Add your academic achievements.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                addArrayItem('education', {
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  startDate: '',
                  endDate: '',
                  location: '',
                  description: '',
                })
              }
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add education
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {resume.education.map((education, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Education {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('education', index)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input value={education.institution} onChange={(event) => updateArrayItem('education', index, { institution: event.target.value })} placeholder="Institution" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={education.degree} onChange={(event) => updateArrayItem('education', index, { degree: event.target.value })} placeholder="Degree" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={education.fieldOfStudy} onChange={(event) => updateArrayItem('education', index, { fieldOfStudy: event.target.value })} placeholder="Field of study" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={education.location} onChange={(event) => updateArrayItem('education', index, { location: event.target.value })} placeholder="Location" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={education.startDate} onChange={(event) => updateArrayItem('education', index, { startDate: event.target.value })} placeholder="Start date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={education.endDate} onChange={(event) => updateArrayItem('education', index, { endDate: event.target.value })} placeholder="End date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                </div>
                <textarea value={education.description} onChange={(event) => updateArrayItem('education', index, { description: event.target.value })} placeholder="Description or achievements" rows={3} className="mt-4 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Experience</h3>
              <p className="text-sm text-slate-500">Track work, internships, and volunteer roles.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                addArrayItem('experience', {
                  company: '',
                  title: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  summary: '',
                })
              }
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add experience
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {resume.experience.map((experience, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Experience {index + 1}</p>
                  <button type="button" onClick={() => removeArrayItem('experience', index)} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input value={experience.company} onChange={(event) => updateArrayItem('experience', index, { company: event.target.value })} placeholder="Company" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={experience.title} onChange={(event) => updateArrayItem('experience', index, { title: event.target.value })} placeholder="Title" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={experience.location} onChange={(event) => updateArrayItem('experience', index, { location: event.target.value })} placeholder="Location" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={experience.startDate} onChange={(event) => updateArrayItem('experience', index, { startDate: event.target.value })} placeholder="Start date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={experience.endDate} onChange={(event) => updateArrayItem('experience', index, { endDate: event.target.value })} placeholder="End date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                </div>
                <textarea value={experience.summary} onChange={(event) => updateArrayItem('experience', index, { summary: event.target.value })} placeholder="Summary of responsibilities or achievements" rows={3} className="mt-4 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Projects</h3>
              <p className="text-sm text-slate-500">Showcase your most relevant work.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                addArrayItem('projects', {
                  name: '',
                  description: '',
                  link: '',
                  technologies: '',
                })
              }
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add project
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {resume.projects.map((project, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Project {index + 1}</p>
                  <button type="button" onClick={() => removeArrayItem('projects', index)} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input value={project.name} onChange={(event) => updateArrayItem('projects', index, { name: event.target.value })} placeholder="Project name" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={project.link} onChange={(event) => updateArrayItem('projects', index, { link: event.target.value })} placeholder="Project link" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                </div>
                <input value={project.technologies} onChange={(event) => updateArrayItem('projects', index, { technologies: event.target.value })} placeholder="Technologies" className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                <textarea value={project.description} onChange={(event) => updateArrayItem('projects', index, { description: event.target.value })} placeholder="Description" rows={3} className="mt-4 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Skills & Achievements</h3>
              <p className="text-sm text-slate-500">Add core skills and highlight your achievements.</p>
            </div>
            <button
              type="button"
              onClick={() => addArrayItem('skills', '')}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add skill
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {resume.skills.map((skill, index) => (
              <div key={index} className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <input
                  value={skill}
                  onChange={(event) => {
                    const updatedSkills = [...resume.skills];
                    updatedSkills[index] = event.target.value;
                    onChange({ ...resume, skills: updatedSkills });
                  }}
                  placeholder="Skill"
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                />
                <button type="button" onClick={() => removeArrayItem('skills', index)} className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Certifications</h3>
              <p className="text-sm text-slate-500">Record relevant credentials.</p>
            </div>
            <button
              type="button"
              onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Add certification
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {resume.certifications.map((certification, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Certification {index + 1}</p>
                  <button type="button" onClick={() => removeArrayItem('certifications', index)} className="text-sm text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input value={certification.name} onChange={(event) => updateArrayItem('certifications', index, { name: event.target.value })} placeholder="Name" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={certification.issuer} onChange={(event) => updateArrayItem('certifications', index, { issuer: event.target.value })} placeholder="Issuer" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                  <input value={certification.date} onChange={(event) => updateArrayItem('certifications', index, { date: event.target.value })} placeholder="Date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Achievements</h3>
              <p className="text-sm text-slate-500">Add measurable accomplishments.</p>
            </div>
            <button type="button" onClick={() => addArrayItem('achievements', '')} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
              Add achievement
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {resume.achievements.map((achievement, index) => (
              <div key={index} className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <input
                  value={achievement}
                  onChange={(event) => {
                    const updatedAchievements = [...resume.achievements];
                    updatedAchievements[index] = event.target.value;
                    onChange({ ...resume, achievements: updatedAchievements });
                  }}
                  placeholder="Achievement"
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                />
                <button type="button" onClick={() => removeArrayItem('achievements', index)} className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-base font-semibold text-slate-900">Social Links</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              value={resume.socialLinks.linkedin}
              onChange={(event) => onChange({ ...resume, socialLinks: { ...resume.socialLinks, linkedin: event.target.value } })}
              placeholder="LinkedIn"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
            <input
              value={resume.socialLinks.github}
              onChange={(event) => onChange({ ...resume, socialLinks: { ...resume.socialLinks, github: event.target.value } })}
              placeholder="GitHub"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
            <input
              value={resume.socialLinks.website}
              onChange={(event) => onChange({ ...resume, socialLinks: { ...resume.socialLinks, website: event.target.value } })}
              placeholder="Website"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
            <input
              value={resume.socialLinks.twitter}
              onChange={(event) => onChange({ ...resume, socialLinks: { ...resume.socialLinks, twitter: event.target.value } })}
              placeholder="Twitter"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeForm;
