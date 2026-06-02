import apiClient from './axios';

export type VideoContent = {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  createdAt: string;
};

export type VideoLibraryResponse = {
  videos: VideoContent[];
};

export type WatchVideoResponse = {
  video: VideoContent;
};

export const getVideoLibrary = () => apiClient.get<VideoLibraryResponse>('/placement/videos').then((res) => res.data);

export const watchVideo = (videoId: string) =>
  apiClient.post<WatchVideoResponse>(`/placement/videos/watch/${videoId}`).then((res) => res.data);
