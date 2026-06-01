const SkillsSection = ({ skills }: { skills: string[] }) => (
  <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Skills</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Core competencies</h2>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-600">{skills.length} skills</span>
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      {skills.length
        ? skills.map((skill) => (
            <span key={skill} className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              {skill}
            </span>
          ))
        : <p className="text-sm text-slate-500">Add your strongest skills to your profile in settings.</p>}
    </div>
  </section>
);

export default SkillsSection;
