import apiClient from './axios';

export type Note = {
  _id: string;
  originalFileName: string;
  aiSummary: string;
  keyConcepts: string[];
  importantPoints: string[];
  examTips: string;
  textLength: number;
  summaryLength: number;
  processingTime: number;
  createdAt: string;
  status: 'completed' | 'failed' | 'processing';
};

export type UploadResponse = {
  message: string;
  note: {
    _id: string;
    fileName: string;
    summary: string;
    keyConcepts: string[];
    importantPoints: string[];
    examTips: string;
    pageCount: number;
    createdAt: string;
    processingTime: number;
  };
};

export type AIStats = {
  totalNotes: number;
  totalTextProcessed: number;
  avgProcessingTime: number;
  totalTextLength: number;
};

// Upload PDF and generate summary
export const uploadPdfForSummarization = (file: File) => {
  const formData = new FormData();
  formData.append('pdf', file);

  return apiClient.post<UploadResponse>('/ai/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
};

// Get note history
export const getNoteHistory = (page: number = 1, limit: number = 10) =>
  apiClient.get(`/ai/history?page=${page}&limit=${limit}`).then((res) => res.data);

// Get note by ID
export const getNoteById = (id: string) =>
  apiClient.get<{ note: Note }>(`/ai/history/${id}`).then((res) => res.data);

// Delete note
export const deleteNote = (id: string) =>
  apiClient.delete(`/ai/history/${id}`).then((res) => res.data);

// Get AI statistics
export const getAIStats = () =>
  apiClient.get<{ stats: AIStats }>('/ai/stats').then((res) => res.data);
