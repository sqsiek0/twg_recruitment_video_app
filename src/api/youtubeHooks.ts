import { useQuery } from '@tanstack/react-query';
import { youtubeApi, YouTubeVideo } from './youtubeApi';

export const useSearchVideos = (query: string, maxResults: number = 10) => {
  return useQuery<YouTubeVideo[], Error>({
    queryKey: ['searchVideos', query, maxResults],
    queryFn: async () => {
      console.log(`🔄 Faktyczne wywołanie API wyszukiwania dla zapytania: ${query}`);
      const result = await youtubeApi.searchVideos(query, maxResults);
      console.log(`✅ Dane wyszukiwania pobrane dla: ${query}, liczba filmów: ${result.length}`);
      return result;
    },
    enabled: query.length > 0,
  });
};


export const useVideoDetails = (videoId: string) => {
  return useQuery<YouTubeVideo | null, Error>({
    queryKey: ['videoDetails', videoId],
    queryFn: async () => {
      console.log(`🔄 Faktyczne wywołanie API dla szczegółów filmu: ${videoId}`);
      const result = await youtubeApi.getVideoById(videoId);
      console.log(`✅ Szczegóły filmu pobrane: ${result?.title || 'brak danych'}`);
      return result;
    },
    enabled: !!videoId, 
  });
};

export const useCategoryVideos = (category: string, maxResults: number = 10) => {
  return useQuery<YouTubeVideo[], Error>({
    queryKey: ['categoryVideos', category, maxResults],
    queryFn: async () => {
      console.log(`🔄 Faktyczne wywołanie API dla kategorii: ${category}`);
      const result = await youtubeApi.searchVideos(category, maxResults);
      console.log(`✅ Dane pobrane dla kategorii: ${category}, liczba filmów: ${result.length}`);
      return result;
    },
    enabled: !!category, 
  });
};
