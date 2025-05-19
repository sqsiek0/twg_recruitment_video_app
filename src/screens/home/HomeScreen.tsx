import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { MainTabParamList } from "../../navigation/MainTabNavigator";
import HomeHeader from "./HomeHeader";
import { colors } from "../../constants/Colors";
import { styles } from "./HomeScreenStyles";
import { useCategoryVideos } from "../../api/youtubeHooks";
import { mapYouTubeVideoToVideoItem } from "../../api/videoMapper";
import { VideoItem } from "../../api/videoMapper";
import { useState, useEffect } from "react";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "HomeTab">,
  NativeStackScreenProps<RootStackParamList>
>;

const fallbackVideoData: VideoItem[] = [
  {
    id: "1",
    title: "React Native in 100 seconds",
    date: "12.08.2024",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    date: "12.08.2024",
    image: require("../../assets/images/logo.png"),
  },
];

export function HomeScreen({ navigation }: Props) {
  const [reactNativeVideos, setReactNativeVideos] = useState<VideoItem[]>([]);
  const [reactVideos, setReactVideos] = useState<VideoItem[]>([
    ...fallbackVideoData,
  ]);
  const [typescriptVideos, setTypescriptVideos] = useState<VideoItem[]>([
    ...fallbackVideoData,
  ]);

  const {
    data: reactNativeData,
    isLoading: isLoadingReactNative,
    error: reactNativeError,
  } = useCategoryVideos("React Native tutorials");

  //   const {
  //     data: reactData,
  //     isLoading: isLoadingReact,
  //     error: reactError,
  //   } = useCategoryVideos("React tutorials");

  //   const {
  //     data: typescriptData,
  //     isLoading: isLoadingTypescript,
  //     error: typescriptError,
  //   } = useCategoryVideos("Typescript tutorials");

  useEffect(() => {
    if (reactNativeData) {
      setReactNativeVideos(
        reactNativeData.videos.map(mapYouTubeVideoToVideoItem)
      );
    }
    //   if (reactData) {
    //     setReactVideos(reactData.map(mapYouTubeVideoToVideoItem));
    //   }
    //   if (typescriptData) {
    //     setTypescriptVideos(typescriptData.map(mapYouTubeVideoToVideoItem));
    //   }
  }, [reactNativeData]);

  const goToVideoDetails = (videoId: string) => {
    navigation.navigate("VideoDetailsScreen", { videoId });
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => goToVideoDetails(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <View style={styles.videoImageWrapper}>
          {item.thumbnailUrl ? (
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          ) : (
            <Image
              source={item.image || require("../../assets/images/logo.png")}
              style={styles.videoImage}
            />
          )}
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.videoDate}>{item.date}</Text>
        {item.channelTitle && (
          <Text
            style={[styles.videoDate, { textAlign: "left" }]}
            numberOfLines={1}
          >
            {item.channelTitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (
    title: string,
    data: VideoItem[],
    isLoading: boolean,
    error: Error | null
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SearchTab", { query: title, maxResults: 50 })
          }
        >
          <Text style={styles.sectionAction}>Show more</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.oliveGreen} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Nie udało się załadować danych. Spróbuj ponownie.
          </Text>
        </View>
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Brak dostępnych filmów</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <FlatList
        data={[{ key: "content" }]}
        renderItem={() => (
          <View style={styles.content}>
            {renderSection(
              "React Native",
              reactNativeVideos.length > 0
                ? reactNativeVideos
                : fallbackVideoData,
              isLoadingReactNative,
              reactNativeError
            )}

            {renderSection(
              "React",
              reactVideos.length > 0 ? reactVideos : fallbackVideoData,
              //   isLoadingReact,
              //   reactError
              false,
              null
            )}

            {renderSection(
              "TypeScript",
              typescriptVideos.length > 0
                ? typescriptVideos
                : fallbackVideoData,
              //   isLoadingTypescript,
              //   typescriptError
              false,
              null
            )}
          </View>
        )}
        keyExtractor={() => "main"}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
