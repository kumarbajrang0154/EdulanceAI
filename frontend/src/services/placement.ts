import apiClient from './axios';

export type PlacementStep = {
  order: number;
  title: string;
  description: string;
};

export type PlacementRoadmap = {
  _id: string;
  title: string;
  description: string;
  category: string;
  skillLevel: string;
  estimatedDuration: string;
  tags: string[];
  steps: PlacementStep[];
};

export type PlacementResource = {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'document' | 'guide' | 'practice';
  category: string;
  url: string;
  tags: string[];
  source: string;
};

export type SavedResource = {
  _id: string;
  resource: PlacementResource;
  notes: string;
  savedAt: string;
};

export type PlacementProgress = {
  _id: string;
  roadmap: PlacementRoadmap;
  completedSteps: number[];
  currentStep: number;
  progressPercentage: number;
  status: 'not-started' | 'in-progress' | 'completed';
  lastUpdated: string;
};

export const getPlacementRoadmaps = () =>
  apiClient.get<{ roadmaps: PlacementRoadmap[] }>('/placement/roadmaps').then((res) => res.data);

export const getPlacementResources = (params?: { type?: string; category?: string; search?: string }) =>
  apiClient
    .get<{ resources: PlacementResource[] }>('/placement/resources', { params })
    .then((res) => res.data);

export const getSavedResources = () =>
  apiClient.get<{ savedResources: SavedResource[] }>('/placement/saved').then((res) => res.data);

export const saveResource = (resourceId: string, notes?: string) =>
  apiClient.post('/placement/saved', { resourceId, notes }).then((res) => res.data);

export const deleteSavedResource = (savedResourceId: string) =>
  apiClient.delete(`/placement/saved/${savedResourceId}`).then((res) => res.data);

export const getPlacementProgress = () =>
  apiClient.get<{ progress: PlacementProgress[] }>('/placement/progress').then((res) => res.data);

export const updatePlacementProgress = (payload: { roadmapId: string; completedSteps?: number[]; status?: string }) =>
  apiClient.put('/placement/progress', payload).then((res) => res.data);
