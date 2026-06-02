import apiClient from './axios';

export type FreelancerProfile = {
  userId: string;
  bio: string;
  skills: string[];
  experienceLevel: string;
  portfolioLinks: string[];
  socialLinks: {
    linkedin: string;
    github: string;
    website: string;
    twitter: string;
  };
  availabilityStatus: string;
  profileImage: string;
};

export type PortfolioItem = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveLink: string;
  githubLink: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  deliveryTime: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};

export const fetchFreelancerProfile = async () => {
  const response = await apiClient.get<{ profile: FreelancerProfile }>('/freelancer/profile');
  return response.data.profile;
};

export const updateFreelancerProfile = async (profile: Partial<FreelancerProfile>) => {
  const response = await apiClient.put<{ profile: FreelancerProfile }>('/freelancer/profile', profile);
  return response.data.profile;
};

export const fetchPortfolio = async () => {
  const response = await apiClient.get<{ portfolios: PortfolioItem[] }>('/portfolio');
  return response.data.portfolios;
};

export const createPortfolio = async (payload: Omit<PortfolioItem, '_id' | 'createdAt' | 'updatedAt'>) => {
  const response = await apiClient.post<{ portfolio: PortfolioItem }>('/portfolio/create', payload);
  return response.data.portfolio;
};

export type FreelancerDashboardSummary = {
  totalServices: number;
  activeServices: number;
  portfolioCount: number;
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  submittedProjects: number;
  totalEarnings: number;
  pendingRevenue: number;
  averageRating: number;
  totalReviews: number;
};

export const fetchFreelancerDashboard = async () => {
  const response = await apiClient.get<{ dashboard: FreelancerDashboardSummary }>('/auth/freelancer-dashboard');
  return response.data.dashboard;
};

export const updatePortfolio = async (id: string, payload: Partial<PortfolioItem>) => {
  const response = await apiClient.put<{ portfolio: PortfolioItem }>(`/portfolio/${id}`, payload);
  return response.data.portfolio;
};

export const deletePortfolioItem = async (id: string) => {
  const response = await apiClient.delete<{ message: string }>(`/portfolio/${id}`);
  return response.data;
};

export const fetchServices = async () => {
  const response = await apiClient.get<{ services: ServiceItem[] }>('/services');
  return response.data.services;
};

export const createService = async (payload: Omit<ServiceItem, '_id' | 'createdAt' | 'updatedAt'>) => {
  const response = await apiClient.post<{ service: ServiceItem }>('/services/create', payload);
  return response.data.service;
};

export const updateService = async (id: string, payload: Partial<ServiceItem>) => {
  const response = await apiClient.put<{ service: ServiceItem }>(`/services/${id}`, payload);
  return response.data.service;
};

export const deleteServiceItem = async (id: string) => {
  const response = await apiClient.delete<{ message: string }>(`/services/${id}`);
  return response.data;
};
