import axios from 'axios';
import Config from 'react-native-config';


const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const YOUTUBE_API_KEY = Config.YOUTUBE_API_KEY;

const youtubeClient = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
  params: {
    key: YOUTUBE_API_KEY,
    part: 'snippet',
  },
});

export interface YouTubeVideo {
  
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  channelTitle: string;
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
  tags?: string[];
}

export interface SearchVideosResult {
  videos: YouTubeVideo[];
  totalResults: number;
}

export interface YouTubeSearchResponse {
  items: {
    id: {
      kind: string;
      videoId?: string;
      channelId?: string;
      playlistId?: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
      };
      channelTitle: string;
    };
  }[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

const mapSearchResultToVideo = (item: any): YouTubeVideo => {
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails,
    channelTitle: item.snippet.channelTitle,
    tags: item.snippet.tags || [],
  };
};

export const youtubeApi = {
  searchVideos: async (query: string, maxResults: number = 10, pageToken?: string, order?: string, publishedBefore?: string): Promise<SearchVideosResult> => {
    try {
      const params: any = {
        q: query,
        maxResults,
        pageToken,
        type: 'video',
        order: order || 'viewCount',
      };
      
      if (publishedBefore) {
        params.publishedBefore = publishedBefore;
      }
      
      const response = await youtubeClient.get('/search', {
        params: params,
      });

      const data = response.data as YouTubeSearchResponse;
      const videos = data.items
        .filter(item => item.id.videoId)
        .map(mapSearchResultToVideo);
      
      return {
        videos,
        totalResults: data.pageInfo.totalResults
      };
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      throw error;
    }
  },

  getVideoById: async (videoId: string): Promise<YouTubeVideo | null> => {
    try {
      const response = await youtubeClient.get('/videos', {
        params: {
          id: videoId,
          part: 'snippet,statistics,contentDetails',
        },
      });
      

      const data = response.data;
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle,
          tags: item.snippet.tags || [],
          
          statistics: item.statistics || {
            viewCount: "0",
            likeCount: "0",
          },
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching YouTube video details:', error);
      throw error;
    }
  },
};
