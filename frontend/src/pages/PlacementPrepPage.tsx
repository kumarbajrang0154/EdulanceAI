import { useEffect, useMemo, useState } from 'react';
import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';
import {
  getPlacementProgress,
  getPlacementResources,
  getPlacementRoadmaps,
  saveResource,
  updatePlacementProgress,
  type PlacementProgress,
  type PlacementResource,
  type PlacementRoadmap,
} from '../services/placement';

const PlacementPrepPage = () => {
  const [roadmaps, setRoadmaps] = useState<PlacementRoadmap[]>([]);
  const [resources, setResources] = useState<PlacementResource[]>([]);
  const [progress, setProgress] = useState<PlacementProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('All');

  const roadmapProgressMap = useMemo(
    () => new Map(progress.map((item) => [item.roadmap._id, item])),
    [progress],
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [roadmapsData, resourcesData, progressData] = await Promise.all([
          getPlacementRoadmaps(),
          getPlacementResources(),
          getPlacementProgress(),
        ]);

        setRoadmaps(roadmapsData.roadmaps);
        setResources(resourcesData.resources);
        setProgress(progressData.progress);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleStartRoadmap = async (roadmapId: string) => {
    setLoading(true);
    try {
      const { progress: updated } = await updatePlacementProgress({ roadmapId, completedSteps: [1] });
      setProgress((prev) => {
        const existing = prev.filter((item) => item.roadmap._id !== updated.roadmap._id);
        return [...existing, updated];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResource = async (resourceId: string) => {
    setLoading(true);
    try {
      await saveResource(resourceId);
    } finally {
      setLoading(false);
    }
  };

  const resourceTypes = ['All', 'article', 'video', 'document', 'guide', 'practice'];
  const filteredResources = resources.filter((resource) => selectedType === 'All' || resource.type === selectedType);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Placement Prep"
          description="Prepare for interviews and placements with curated roadmaps, resources, and progress tracking."
        />

        <section>
          <SectionTitle title="Career Roadmaps" description="Follow structured preparation plans for placements." />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {roadmaps.map((roadmap) => {
              const roadmapProgress = roadmapProgressMap.get(roadmap._id);
              return (
                <article key={roadmap._id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{roadmap.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{roadmap.description}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {roadmap.skillLevel}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div>Category: {roadmap.category}</div>
                    <div>Duration: {roadmap.estimatedDuration}</div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {roadmap.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${roadmapProgress?.progressPercentage ?? 0}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {roadmapProgress ? `${roadmapProgress.progressPercentage}% complete • ${roadmapProgress.status}` : 'Not started yet'}
                    </p>
                  </div>
                  <button
                    disabled={loading}
                    onClick={() => handleStartRoadmap(roadmap._id)}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {roadmapProgress?.status === 'completed' ? 'Review Roadmap' : roadmapProgress ? 'Continue' : 'Start Roadmap'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <SectionTitle
            title="Recommended Resources"
            description="Save articles and tools directly to your placement preparation library."
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {resourceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <article key={resource._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{resource.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                    {resource.type}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Resource
                  </a>
                  <button
                    disabled={loading}
                    onClick={() => handleSaveResource(resource._id)}
                    className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default PlacementPrepPage;
