import PlacementRoadmap from '../models/PlacementRoadmap.js';
import PlacementResource from '../models/PlacementResource.js';
import StudentProgress from '../models/StudentProgress.js';
import SavedResource from '../models/SavedResource.js';

const defaultRoadmaps = [
  {
    title: 'Full Stack Interview Roadmap',
    description: 'A complete roadmap for web development placement preparation.',
    category: 'Full Stack',
    skillLevel: 'Intermediate',
    estimatedDuration: '4 weeks',
    tags: ['frontend', 'backend', 'interview'],
    steps: [
      { order: 1, title: 'Data Structures & Algorithms', description: 'Learn problem solving patterns and coding challenges.' },
      { order: 2, title: 'System Design Basics', description: 'Master design principles for scalable applications.' },
      { order: 3, title: 'Frontend Deep Dive', description: 'Review React, state management, and component patterns.' },
      { order: 4, title: 'Backend APIs', description: 'Build and test REST/GraphQL services with authentication.' },
      { order: 5, title: 'Mock Interview Practice', description: 'Practice common questions and behavior interview answers.' },
    ],
  },
  {
    title: 'Data Science Placement Roadmap',
    description: 'Structured preparation path for data science and ML interviews.',
    category: 'Data Science',
    skillLevel: 'Advanced',
    estimatedDuration: '5 weeks',
    tags: ['statistics', 'python', 'ml'],
    steps: [
      { order: 1, title: 'Python & Data Wrangling', description: 'Cover pandas, NumPy, and data preprocessing workflows.' },
      { order: 2, title: 'Machine Learning Fundamentals', description: 'Review supervised and unsupervised algorithms.' },
      { order: 3, title: 'Model Evaluation', description: 'Practice model selection, metrics, and validation.' },
      { order: 4, title: 'SQL & Data Modeling', description: 'Master SQL queries, joins, and analytic functions.' },
      { order: 5, title: 'Case Study Practice', description: 'Solve real business data problems with structured thinking.' },
    ],
  },
];

const defaultResources = [
  {
    title: 'Top 50 Interview Questions for Developers',
    description: 'A curated list of common placement interview questions and sample answers.',
    type: 'article',
    category: 'Interview',
    url: 'https://example.com/interview-questions',
    tags: ['interview', 'questions'],
  },
  {
    title: 'DSA Practice Tracker',
    description: 'Track your data structures and algorithm practice with daily challenges.',
    type: 'guide',
    category: 'DSA',
    url: 'https://example.com/dsa-practice',
    tags: ['dsa', 'practice'],
  },
  {
    title: 'System Design for Beginners',
    description: 'A practical guide for preparing system design interviews.',
    type: 'video',
    category: 'System Design',
    url: 'https://example.com/system-design',
    tags: ['system design', 'architecture'],
  },
  {
    title: 'Aptitude and Logical Reasoning Workbook',
    description: 'Practice book covering aptitude, reasoning, and quantitative questions.',
    type: 'document',
    category: 'Aptitude',
    url: 'https://example.com/aptitude-workbook',
    tags: ['aptitude', 'reasoning'],
  },
];

const seedRoadmaps = async () => {
  const count = await PlacementRoadmap.countDocuments();
  if (count === 0) {
    return PlacementRoadmap.create(defaultRoadmaps);
  }
  return PlacementRoadmap.find();
};

const seedResources = async () => {
  const count = await PlacementResource.countDocuments();
  if (count === 0) {
    return PlacementResource.create(defaultResources);
  }
  return PlacementResource.find();
};

export const getPlacementRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await seedRoadmaps();
    res.json({ roadmaps });
  } catch (err) {
    next(err);
  }
};

export const getPlacementRoadmapById = async (req, res, next) => {
  try {
    const roadmap = await PlacementRoadmap.findById(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    res.json({ roadmap });
  } catch (err) {
    next(err);
  }
};

export const getPlacementResources = async (req, res, next) => {
  try {
    const resources = await seedResources();
    const { type, category, search } = req.query;
    let filtered = resources;

    if (type) {
      filtered = filtered.filter((item) => item.type === String(type));
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === String(category));
    }
    if (search) {
      const query = String(search).toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    res.json({ resources: filtered });
  } catch (err) {
    next(err);
  }
};

export const getSavedResources = async (req, res, next) => {
  try {
    const savedResources = await SavedResource.find({ user: req.user.id }).populate('resource');
    res.json({ savedResources });
  } catch (err) {
    next(err);
  }
};

export const addSavedResource = async (req, res, next) => {
  try {
    const { resourceId, notes } = req.body;
    if (!resourceId) {
      return res.status(400).json({ message: 'resourceId is required' });
    }

    const resource = await PlacementResource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const existing = await SavedResource.findOne({ user: req.user.id, resource: resourceId });
    if (existing) {
      return res.status(409).json({ message: 'Resource already saved' });
    }

    const savedResource = await SavedResource.create({ user: req.user.id, resource: resourceId, notes: notes || '' });
    res.status(201).json({ savedResource });
  } catch (err) {
    next(err);
  }
};

export const removeSavedResource = async (req, res, next) => {
  try {
    const savedResource = await SavedResource.findOneAndDelete({ user: req.user.id, _id: req.params.id });
    if (!savedResource) {
      return res.status(404).json({ message: 'Saved resource not found' });
    }
    res.json({ message: 'Saved resource removed successfully' });
  } catch (err) {
    next(err);
  }
};

const getProgressStatus = (roadmap, completedSteps) => {
  const totalSteps = roadmap.steps.length;
  const completedCount = completedSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const status = completedCount === 0 ? 'not-started' : completedCount >= totalSteps ? 'completed' : 'in-progress';

  return { progressPercentage, status, currentStep: Math.min(totalSteps, completedCount + 1) || 1 };
};

export const getPlacementProgress = async (req, res, next) => {
  try {
    const progress = await StudentProgress.find({ user: req.user.id }).populate('roadmap');
    res.json({ progress });
  } catch (err) {
    next(err);
  }
};

export const updatePlacementProgress = async (req, res, next) => {
  try {
    const { roadmapId, completedSteps = [], status } = req.body;
    if (!roadmapId) {
      return res.status(400).json({ message: 'roadmapId is required' });
    }

    const roadmap = await PlacementRoadmap.findById(roadmapId);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    const progress = await StudentProgress.findOne({ user: req.user.id, roadmap: roadmapId });
    const mergedSteps = Array.from(new Set([...(progress?.completedSteps || []), ...completedSteps].map(Number))).sort((a, b) => a - b);
    const computed = getProgressStatus(roadmap, mergedSteps);

    const updated = await StudentProgress.findOneAndUpdate(
      { user: req.user.id, roadmap: roadmapId },
      {
        user: req.user.id,
        roadmap: roadmapId,
        completedSteps: mergedSteps,
        currentStep: computed.currentStep,
        progressPercentage: computed.progressPercentage,
        status: status || computed.status,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ).populate('roadmap');

    res.json({ progress: updated });
  } catch (err) {
    next(err);
  }
};
