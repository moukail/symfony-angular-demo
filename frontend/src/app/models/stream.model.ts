export interface Stream {
  id: string;
  mime_type: string;
  source: string;
  type: 'hls' | 'dash' | 'smooth_streaming' | 'mp4' | 'm3u'; // Based on StreamType enum
  url: string;
  drm: boolean;
  drm_license?: string;
  channelId: string;
}
