import { useEffect, useState } from 'react';
import ProjectStatusCard from '../components/marketplace/ProjectStatusCard';
import { fetchProjectsForFreelancer, updateProjectStatus } from '../services/marketplace';

const FreelancerProjects = () => {
  const [projects, setProjects] = useState<Array<{ _id: string; title: string; description: string; status: string; deadline?: string; serviceId: { title: string }; updates: string[]; submittedFiles: string[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectsForFreelancer();
      setProjects(data);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleStatusChange = async (projectId: string, nextStatus: string) => {
    try {
      setMessage('Updating project status...');
      await updateProjectStatus(projectId, { status: nextStatus });
      setMessage('Project status updated.');
      loadProjects();
    } catch {
      setMessage('Unable to update project status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Project workflow</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage active projects</h1>
        <p className="mt-2 text-sm text-slate-600">Update statuses and keep your service delivery pipeline moving.</p>
      </div>

      {message && <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">{message}</div>}

      <div className="grid gap-4 xl:grid-cols-2">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading projects...</div>
        ) : projects.length ? (
          projects.map((project) => (
            <article key={project._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
              <ProjectStatusCard
                title={project.title}
                description={project.description}
                status={project.status}
                deadline={project.deadline}
                freelancerName={project.serviceId.title}
              />
              <div className="mt-5 flex flex-wrap gap-3">
                {project.status === 'Accepted' && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(project._id, 'In Progress')}
                    className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Start work
                  </button>
                )}
                {project.status === 'In Progress' && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(project._id, 'Submitted')}
                    className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Submit update
                  </button>
                )}
                {project.status === 'Submitted' && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(project._id, 'Completed')}
                    className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Mark completed
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">No active projects available.</div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProjects;
