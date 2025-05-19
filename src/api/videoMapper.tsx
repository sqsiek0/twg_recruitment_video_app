import { YouTubeVideo } from "./youtubeApi";
import { ImageRequireSource } from "react-native";

export interface VideoItem {
  id: string;
  title: string;
  date: string;
  thumbnailUrl?: string;
  channelTitle?: string;
  description?: string;
  image?: ImageRequireSource;
}

export const mapYouTubeVideoToVideoItem = (
  youtubeVideo: YouTubeVideo
): VideoItem => {
  const publishedDate = new Date(youtubeVideo.publishedAt);
  const day = publishedDate.getDate().toString().padStart(2, "0");
  const month = (publishedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = publishedDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return {
    id: youtubeVideo.id,
    title: youtubeVideo.title,
    date: formattedDate,
    thumbnailUrl:
      youtubeVideo.thumbnails.high?.url ||
      youtubeVideo.thumbnails.medium?.url ||
      youtubeVideo.thumbnails.default?.url,
    channelTitle: youtubeVideo.channelTitle,
    description: youtubeVideo.description,
  };
};
