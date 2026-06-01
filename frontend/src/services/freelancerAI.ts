import apiClient from './axios';

export type ProposalInput = {
  projectTitle: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  skills: string[];
  proposalStyle: string;
  templateType: string;
  category: string;
  deliveryExpectations: string;
};

export type ProposalResponse = {
  proposal: string;
  rawResponse?: string;
  history?: ProposalHistoryItem;
};

export type CoverLetterInput = {
  projectTitle: string;
  projectDescription: string;
  timeline: string;
  skills: string[];
  proposalStyle: string;
  deliveryExpectations: string;
};

export type CoverLetterResponse = {
  coverLetter: string;
  rawResponse?: string;
};

export type PricingSuggestionInput = {
  category: string;
  projectComplexity: string;
  skills: string[];
  deliveryExpectations: string;
  budget: string;
  timeline: string;
};

export type PricingSuggestionResult = {
  estimatedPrice: string;
  estimatedTimeline: string;
  serviceRecommendations: string;
  recommendationSummary: string;
  reasoning?: string;
};

export type ProposalHistoryItem = {
  _id: string;
  userId: string;
  projectTitle: string;
  proposalType: string;
  templateType: string;
  generatedProposal: string;
  sourceInput: Record<string, any>;
  budget?: string;
  timeline?: string;
  skills?: string[];
  projectDescription?: string;
  createdAt: string;
};

export type PricingSuggestionHistoryItem = {
  _id: string;
  userId: string;
  category: string;
  projectComplexity: string;
  estimatedPrice: string;
  estimatedTimeline: string;
  recommendationSummary: string;
  inputDetails: Record<string, any>;
  createdAt: string;
};

export const generateProposal = (payload: ProposalInput) =>
  apiClient.post<{ proposal: string; rawResponse?: string; history: ProposalHistoryItem }>('/ai/proposal/generate', payload).then((res) => res.data);

export const generateCoverLetter = (payload: CoverLetterInput) =>
  apiClient.post<CoverLetterResponse>('/ai/cover-letter/generate', payload).then((res) => res.data);

export const suggestPricing = (payload: PricingSuggestionInput) =>
  apiClient.post<{ pricing: PricingSuggestionResult }>('/ai/pricing/suggest', payload).then((res) => res.data);

export const fetchProposalHistory = () =>
  apiClient.get<{ proposals: ProposalHistoryItem[] }>('/proposals/history').then((res) => res.data);

export const fetchProposalById = (id: string) =>
  apiClient.get<{ proposal: ProposalHistoryItem }>(`/proposals/${id}`).then((res) => res.data);

export const deleteProposalById = (id: string) =>
  apiClient.delete(`/proposals/${id}`).then((res) => res.data);

export const fetchPricingHistory = () =>
  apiClient.get<{ pricingHistory: PricingSuggestionHistoryItem[] }>('/ai/pricing/history').then((res) => res.data);
