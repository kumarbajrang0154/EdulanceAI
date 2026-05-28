import apiClient from './axios';

export type ResumeTemplate = 'modern' | 'minimal' | 'professional';

export type ResumeEducation = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

export type ResumeExperience = {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
};

export type ResumeProject = {
  name: string;
  description: string;
  link: string;
  technologies: string;
};

export type ResumeCertification = {
  name: string;
  issuer: string;
  date: string;
};

export type ResumeSocialLinks = {
  linkedin: string;
  github: string;
  website: string;
  twitter: string;
};

export type ResumePersonalInfo = {
  name: string;
  email: string;
  phone: string;
  headline: string;
  location: string;
  website: string;
};

export type Resume = {
  _id?: string;
  title: string;
  template: ResumeTemplate;
  personalInfo: ResumePersonalInfo;
  about: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: string[];
  certifications: ResumeCertification[];
  achievements: string[];
  socialLinks: ResumeSocialLinks;
  createdAt?: string;
  updatedAt?: string;
};

export const getResumes = () => apiClient.get<{ resumes: Resume[] }>('/resume').then((res) => res.data.resumes);
export const getResume = (id: string) => apiClient.get<{ resume: Resume }>(`/resume/${id}`).then((res) => res.data.resume);
export const createResume = (payload: Resume) => apiClient.post<{ resume: Resume }>('/resume/create', payload).then((res) => res.data.resume);
export const updateResume = (id: string, payload: Resume) => apiClient.put<{ resume: Resume }>(`/resume/${id}`, payload).then((res) => res.data.resume);
export const deleteResume = (id: string) => apiClient.delete(`/resume/${id}`);
export const duplicateResume = (id: string) => apiClient.post<{ resume: Resume }>(`/resume/duplicate/${id}`).then((res) => res.data.resume);
export const downloadResume = (id: string) =>
  apiClient
    .post(`/resume/download/${id}`, undefined, { responseType: 'blob' })
    .then((res) => res.data);
