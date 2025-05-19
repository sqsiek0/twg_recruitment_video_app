import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { colors } from "../../constants/Colors";
import { useVideoDetails } from "../../api/youtubeHooks";
import Video, { VideoRef } from "react-native-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./VideoDetailsScreen.styles";

import BackwardIcon from "../../assets/images/backward-icon.svg";
import PlayIcon from "../../assets/images/play-icon.svg";
import PauseIcon from "../../assets/images/pause-icon.svg";
import ForwardIcon from "../../assets/images/forward-icon.svg";
import ViewsIcon from "../../assets/images/views-icon.svg";
import LikesIcon from "../../assets/images/likes-icon.svg";
import LeftArrowIcon from "../../assets/images/leftarrow-icon.svg";
import VolumeIcon from "../../assets/images/volume-icon.svg";
import FullscreenIcon from "../../assets/images/fullscreen-icon.svg";
import AirplayIcon from "../../assets/images/airplay-icon.svg";

type Props = NativeStackScreenProps<RootStackParamList, "VideoDetailsScreen">;

const VideoDetailsScreen = ({ route, navigation }: Props) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "notes">("details");
  const insets = useSafeAreaInsets(); // Pobieramy informacje o bezpiecznym obszarze
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { videoId } = route.params;
  const { data: videoDetails, isLoading, error } = useVideoDetails(videoId);

  const videoData = videoDetails || {
    id: "",
    title: "Ładowanie...",
    channelTitle: "Ładowanie...",
    description: "Ładowanie opisu...",
    publishedAt: "",
    thumbnails: {
      default: { url: "", width: 0, height: 0 },
      medium: { url: "", width: 0, height: 0 },
      high: { url: "", width: 0, height: 0 },
    },
    statistics: {
      viewCount: "0",
      likeCount: "0",
    },
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const onBuffer = () => {
    console.log("Buforowanie...");
  };

  const onError = (error: any) => {
    console.error("Error podczas ładowania wideo:", error);
  };

  const onLoad = (data: { duration: number }) => {
    setDuration(data.duration);
    console.log("Wideo załadowane, czas trwania:", data.duration);
  };

  const onProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  const onFullscreenPlayerWillDismiss = () => {
    setIsFullscreen(false);
    showControls();
    hideControlsWithDelay();
  };

  const onFullscreenPlayerDidPresent = () => {
    setIsFullscreen(true);
    showControls();
    hideControlsWithDelay();
  };

  const handleBackward = () => {
    if (videoRef.current && currentTime > 10) {
      videoRef.current.seek(currentTime - 10);
    } else {
      videoRef.current?.seek(0);
    }
  };

  const handleForward = () => {
    if (videoRef.current && currentTime + 10 < duration) {
      videoRef.current.seek(currentTime + 10);
    }
  };

  const handlePlayPause = () => {
    setPaused(!paused);
    showControls();

    if (paused) {
      hideControlsWithDelay();
    }
  };

  const showControls = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }

    setControlsVisible(true);
  };

  const hideControls = () => {
    setControlsVisible(false);
  };

  const hideControlsWithDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (!paused) {
        hideControls();
      }
    }, 3000);
  };

  const handleVideoPress = () => {
    if (controlsVisible) {
      hideControls();
    } else {
      showControls();
      hideControlsWithDelay();
    }
  };

  const handleToggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  useEffect(() => {
    if (!paused) {
      hideControlsWithDelay();
    }
  }, [paused]);

  const renderTabContent = () => {
    if (activeTab === "details") {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{videoData.description}</Text>

          <View style={styles.statisticsContainer}>
            <View style={styles.statItem}>
              <ViewsIcon width={24} height={24} />
              <Text style={styles.statText}>
                {videoData.statistics?.viewCount
                  ? parseInt(videoData.statistics.viewCount).toLocaleString()
                  : "Brak danych"}{" "}
                views
              </Text>
            </View>
            <View style={styles.statItem}>
              <LikesIcon width={24} height={24} />
              <Text style={styles.statText}>
                {videoData.statistics?.likeCount
                  ? parseInt(videoData.statistics.likeCount).toLocaleString()
                  : "Brak danych"}{" "}
                likes
              </Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.tabContent}>
        <Text style={styles.notesText}>Notatki nie są jeszcze dostępne</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.oliveGreen} />
        <Text style={styles.loadingText}>Ładowanie szczegółów...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text
          style={{
            fontSize: 16,
            color: "red",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Wystąpił błąd podczas ładowania danych.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.oliveGreen,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Powrót
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleVideoPress}
            style={styles.video}
          >
            <Video
              ref={videoRef}
              source={require("../../assets/video/broadchurch.mp4")}
              style={styles.video}
              resizeMode="contain"
              paused={paused}
              onLoad={onLoad}
              onProgress={onProgress}
              onBuffer={onBuffer}
              onError={onError}
              controls={false}
              repeat={false}
              onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
              onFullscreenPlayerDidPresent={onFullscreenPlayerDidPresent}
            />
          </TouchableOpacity>

          {/* Video Controls - Top */}
          {controlsVisible && (
            <View style={styles.videoControlsTop}>
              <View
                style={{
                  paddingTop: insets.top,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <LeftArrowIcon width={20} height={20} />
                </TouchableOpacity>

                <View style={styles.controlsRight}>
                  <TouchableOpacity style={styles.iconButton}>
                    <VolumeIcon width={20} height={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.iconButton, {}]}>
                    <AirplayIcon width={20} height={20} strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Video Controls - Center Overlay */}
          {controlsVisible && (
            <View style={styles.videoControlsOverlay}>
              <TouchableOpacity
                onPress={handleBackward}
                style={styles.iconButton}
              >
                <BackwardIcon width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePlayPause}
                style={styles.iconButton}
              >
                {paused ? (
                  <PlayIcon width={20} height={20} />
                ) : (
                  <PauseIcon width={20} height={20} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleForward}
                style={styles.iconButton}
              >
                <ForwardIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          )}

          {/* Video Controls - Bottom - Time and Fullscreen */}
          {controlsVisible && (
            <View style={styles.videoControlsBottom}>
              <Text style={styles.timerText}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleToggleFullscreen}
              >
                <FullscreenIcon width={20} height={20} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          )}

          {/* Video Progress Bar */}
          {controlsVisible && (
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground} />
              <View
                style={[
                  styles.progressBar,
                  { width: `${(currentTime / duration) * 100}%` },
                ]}
              />
              <View
                style={[
                  styles.progressBarThumb,
                  { left: `${(currentTime / duration) * 100}%` },
                ]}
              />
            </View>
          )}
        </View>

        {/* Video Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.videoTitle}>{videoData.title}</Text>
        </View>

        {/* Channel Info */}
        <View style={styles.channelContainer}>
          <View style={styles.channelAvatar}>
            <Text style={styles.avatarText}>
              {videoData.channelTitle?.charAt(0) || "?"}
            </Text>
          </View>
          <Text style={styles.channelName}>{videoData.channelTitle}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "details" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("details")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "details" && styles.activeTabText,
              ]}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "notes" && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab("notes")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "notes" && styles.activeTabText,
              ]}
            >
              Notes
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

export default VideoDetailsScreen;
