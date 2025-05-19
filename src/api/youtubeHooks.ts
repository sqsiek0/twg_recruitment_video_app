import { useQuery } from '@tanstack/react-query';
import { youtubeApi, YouTubeVideo, SearchVideosResult } from './youtubeApi';

export const useSearchVideos = (query: string, maxResults: number = 10, order?: string, shouldReverseChronology: boolean = false) => {
  return useQuery<SearchVideosResult, Error>({
    queryKey: ['searchVideos', query, maxResults, order, shouldReverseChronology],
    queryFn: async () => {
      console.log(`🔄 Faktyczne wywołanie API wyszukiwania dla zapytania: ${query} z sortowaniem: ${order || 'domyślne'}, odwrócona chronologia: ${shouldReverseChronology}`);
      
      let publishedBefore;
      if (shouldReverseChronology && order === 'date') {
        const oldDate = new Date();
        oldDate.setFullYear(oldDate.getFullYear() - 10);
        publishedBefore = oldDate.toISOString();
      }
      
      const result = await youtubeApi.searchVideos(query, maxResults, undefined, order, publishedBefore);
      console.log(`✅ Dane wyszukiwania pobrane dla: ${query}, liczba filmów: ${result.videos.length}, całkowita liczba: ${result.totalResults}`);
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
  return useQuery<SearchVideosResult, Error>({
    queryKey: ['categoryVideos', category, maxResults],
    queryFn: async () => {
      console.log(`🔄 Faktyczne wywołanie API dla kategorii: ${category}`);
      const result = await youtubeApi.searchVideos(category, maxResults);
      console.log(`✅ Dane pobrane dla kategorii: ${category}, liczba filmów: ${result.videos.length}, całkowita liczba: ${result.totalResults}`);
      return result;
    },
    enabled: !!category, 
  });
};
