import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { colors } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import SearchIcon from "../../assets/images/search-icon.svg";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainTabParamList } from "../../navigation/MainTabNavigator";
import { useSearchVideos } from "../../api/youtubeHooks";
import { VideoItem, mapYouTubeVideoToVideoItem } from "../../api/videoMapper";
import {
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDebounce } from "../../utils/useDebounce";
import VideoCard from "./components/VideoCard";

type SearchScreenRouteProp = RouteProp<MainTabParamList, "SearchTab">;

export const SearchScreen: React.FC = () => {
  const route = useRoute<SearchScreenRouteProp>();
  const initialQuery = route.params?.query || "";
  const initialMaxResults = route.params?.maxResults || undefined;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Most popular");
  const [orderParam, setOrderParam] = useState("viewCount");
  const [reverseChronology, setReverseChronology] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: searchData,
    isLoading,
    error,
    refetch,
  } = useSearchVideos(
    debouncedSearchQuery,
    initialMaxResults,
    orderParam,
    reverseChronology
  );

  React.useEffect(() => {
    if (searchData) {
      setVideos(searchData.videos.map(mapYouTubeVideoToVideoItem));
      setTotalResults(searchData.totalResults);
    }
  }, [searchData]);

  React.useEffect(() => {
    if (initialQuery) {
      refetch();
    }
  }, [initialQuery, refetch]);

  React.useEffect(() => {
    if (route.params?.query && route.params.query !== searchQuery) {
      setSearchQuery(route.params.query);
    }
  }, [route.params?.query]);

  React.useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.trim() !== "") {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      refetch();
    }
  };

  const handleSortPress = () => {
    setIsModalVisible(true);
  };

  const handleSortOptionSelect = (option: string) => {
    setSortOption(option);
    setIsModalVisible(false);

    let newOrderParam = "viewCount";
    let newReverseChronology = false;

    switch (option) {
      case "Upload date: latest":
        newOrderParam = "date";
        newReverseChronology = false;
        break;
      case "Upload date: oldest":
        newOrderParam = "date";
        newReverseChronology = true;
        break;
      case "Most popular":
        newOrderParam = "viewCount";
        newReverseChronology = false;
        break;
      default:
        newOrderParam = "relevance";
        newReverseChronology = false;
    }

    if (
      newOrderParam !== orderParam ||
      newReverseChronology !== reverseChronology
    ) {
      setOrderParam(newOrderParam);
      setReverseChronology(newReverseChronology);
      if (searchQuery.trim() !== "") {
        setTimeout(() => refetch(), 100);
      }
    }
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <VideoCard item={item} onPress={() => {}} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon style={styles.searchIcon} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Szukaj filmów..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.resultsWrapper}>
          <Text style={styles.resultsText}>
            {totalResults} results found for
            {searchQuery.trim() !== "" ? `: "${searchQuery}"` : ":"}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSortPress} style={styles.sortWrapper}>
          <Text style={styles.sortText}>Sort by: </Text>
          <Text style={styles.sortValue}>{sortOption}</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.oliveGreen} />
          ) : error ? (
            <Text style={styles.placeholderText}>
              Wystąpił błąd podczas wyszukiwania.
            </Text>
          ) : videos.length > 0 ? (
            <FlatList
              data={videos}
              renderItem={renderVideoItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />
          ) : (
            <Text style={styles.placeholderText}>
              Brak wyników wyszukiwania.
            </Text>
          )}
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort records by:</Text>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSortOptionSelect("Upload date: latest")}
            >
              <View style={styles.radioButton}>
                {sortOption === "Upload date: latest" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.sortOptionText}>Upload date: latest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSortOptionSelect("Upload date: oldest")}
            >
              <View style={styles.radioButton}>
                {sortOption === "Upload date: oldest" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.sortOptionText}>Upload date: oldest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSortOptionSelect("Most popular")}
            >
              <View style={styles.radioButton}>
                {sortOption === "Most popular" && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.sortOptionText}>Most popular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomColor: colors.text,
    borderBottomWidth: 1,
    backgroundColor: colors.cream,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cream,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.text,
    height: 44,
    paddingLeft: 12,
  },
  searchIconContainer: {
    justifyContent: "center",
    marginRight: 8,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins400",
    fontSize: 16,
    color: colors.text,
  },
  resultsWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsText: {
    fontFamily: "Poppins400",
    fontSize: 10,
    color: colors.text,
  },
  sortWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  sortText: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
  },
  sortValue: {
    fontFamily: "Poppins600",
    fontSize: 12,
    color: colors.text,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Poppins400",
    fontSize: 16,
    color: colors.text,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  videoItemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  thumbnail: {
    width: 120,
    height: 90,
  },
  videoInfoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  videoTitle: {
    fontFamily: "Poppins600",
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  channelName: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
    marginBottom: 4,
  },
  videoDate: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.cream,
    padding: 24,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: {
    fontFamily: "Poppins600",
    fontSize: 18,
    color: colors.text,
    marginBottom: 24,
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
  },
  sortOptionText: {
    fontFamily: "Poppins400",
    fontSize: 16,
    color: colors.text,
  },
  confirmButton: {
    backgroundColor: colors.text,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  confirmButtonText: {
    fontFamily: "Poppins600",
    fontSize: 16,
    color: colors.white,
  },
});
