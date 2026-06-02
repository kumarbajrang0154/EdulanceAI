import apiClient from './axios';
import { ServiceItem, FreelancerProfile } from './freelancer';

export type MarketplaceServiceItem = ServiceItem & {
  userId: string | { _id: string; fullName: string; profileImage?: string };
  status: string;
  features: string[];
  revisions: number;
  publishedAt?: string;
};

export type ServiceRequestItem = {
  _id: string;
  senderId: { _id: string; fullName: string; email: string };
  freelancerId: { _id: string; fullName: string; email: string; profileImage?: string };
  serviceId: MarketplaceServiceItem;
  message: string;
  requestStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectItem = {
  _id: string;
  clientId: { _id: string; fullName: string; email: string };
  freelancerId: { _id: string; fullName: string; email: string; profileImage?: string };
  serviceId: MarketplaceServiceItem;
  title: string;
  description: string;
  status: string;
  deadline?: string;
  submittedFiles: string[];
  updates: string[];
  createdAt: string;
  updatedAt: string;
};

export const fetchMarketplaceServices = async (params: Record<string, string | number | undefined>) => {
  const queryParams = new URLSearchParams({ marketplace: 'true' });
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.set(key, String(value));
    }
  });
  const response = await apiClient.get<{ services: MarketplaceServiceItem[] }>(`/services?${queryParams.toString()}`);
  return response.data.services;
};

export const fetchServiceDetails = async (id: string) => {
  const response = await apiClient.get<{ service: MarketplaceServiceItem }>(`/services/${id}`);
  return response.data.service;
};

export const fetchFreelancerProfileByService = async (service: MarketplaceServiceItem) => {
  const profileResponse = await apiClient.get<{ profile: FreelancerProfile }>(`/freelancer/profile?userId=${service.userId}`);
  return profileResponse.data.profile;
};

export const createServiceRequest = async (payload: { serviceId: string; message: string }) => {
  const response = await apiClient.post<{ request: ServiceRequestItem }>('/requests/create', payload);
  return response.data.request;
};

export const fetchRequestsForFreelancer = async () => {
  const response = await apiClient.get<{ requests: ServiceRequestItem[] }>('/requests/freelancer');
  return response.data.requests;
};

export const fetchRequestsForUser = async () => {
  const response = await apiClient.get<{ requests: ServiceRequestItem[] }>('/requests/user');
  return response.data.requests;
};

export const updateServiceRequest = async (id: string, payload: { requestStatus: string }) => {
  const response = await apiClient.put<{ request: ServiceRequestItem }>('/requests/' + id, payload);
  return response.data.request;
};

export const fetchProjectsForFreelancer = async () => {
  const response = await apiClient.get<{ projects: ProjectItem[] }>('/projects/freelancer');
  return response.data.projects;
};

export const fetchProjectsForUser = async () => {
  const response = await apiClient.get<{ projects: ProjectItem[] }>('/projects/user');
  return response.data.projects;
};

export const createProject = async (payload: {
  clientId: string;
  serviceId: string;
  title: string;
  description: string;
  deadline?: string;
}) => {
  const response = await apiClient.post<{ project: ProjectItem }>('/projects/create', payload);
  return response.data.project;
};

export const updateProjectStatus = async (id: string, payload: { status: string; submittedFiles?: string[] }) => {
  const response = await apiClient.put<{ project: ProjectItem }>(`/projects/${id}/status`, payload);
  return response.data.project;
};
