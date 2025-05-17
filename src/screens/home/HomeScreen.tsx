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
} from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { MainTabParamList } from "../../navigation/MainTabNavigator";
import HomeHeader from "./HomeHeader";
import { colors } from "../../constants/Colors";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "HomeTab">,
  NativeStackScreenProps<RootStackParamList>
>;

// Interfejs dla danych filmów
interface VideoItem {
  id: string;
  title: string;
  date: string;
  image: any;
}

// Przykładowe dane
const videoData: VideoItem[] = [
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
  {
    id: "3",
    title: "Advanced React Native Techniques",
    date: "14.08.2024",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: "4",
    title: "Building UI Components in React Native",
    date: "16.08.2024",
    image: require("../../assets/images/logo.png"),
  },
];

const recommendedVideos: VideoItem[] = [
  {
    id: "5",
    title: "Animations in React Native",
    date: "10.08.2024",
    image: require("../../assets/images/logo.png"),
  },
  {
    id: "6",
    title: "Navigation best practices in React Native",
    date: "15.08.2024",
    image: require("../../assets/images/logo.png"),
  },
];

export function HomeScreen({ navigation }: Props) {
  // Funkcja do nawigacji na ekran szczegółów wideo
  const goToVideoDetails = (videoId: string) => {
    // Nawigujemy najpierw do "Main" aby mieć dostęp do "VideoDetailsScreen"
    navigation.navigate("VideoDetailsScreen", { videoId });
  };

  // Funkcja renderująca pojedynczy element wideo
  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => goToVideoDetails(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <View style={styles.videoImageWrapper}>
          <Image source={item.image} style={styles.videoImage} />
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.videoDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <FlatList
        data={[{ key: "content" }]}
        renderItem={() => (
          <View style={styles.content}>
            {/* Pierwsza sekcja - React Native */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>React Native</Text>
                <TouchableOpacity
                  onPress={() => console.log("Show more pressed")}
                >
                  <Text style={styles.sectionAction}>Show more</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={videoData}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>

            {/* Druga sekcja - Polecane */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Polecane</Text>
                <TouchableOpacity
                  onPress={() => console.log("Show more pressed")}
                >
                  <Text style={styles.sectionAction}>Show more</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recommendedVideos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>

            {/* Trzecia sekcja - Popularne */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popularne</Text>
                <TouchableOpacity
                  onPress={() => console.log("Show more pressed")}
                >
                  <Text style={styles.sectionAction}>Show more</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={videoData.slice(0, 3)}
                renderItem={renderVideoItem}
                keyExtractor={(item) => `popular-${item.id}`}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          </View>
        )}
        keyExtractor={() => "main"}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.55;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: colors.text,
  },
  sectionAction: {
    fontSize: 14,
    color: colors.oliveGreen,
    fontFamily: "Poppins-Medium",
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  videoItem: {
    width: ITEM_WIDTH,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: "#000",
    boxShadow: "0 0px 1px rgba(0, 0, 0, 0.01)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    height: 120,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
  },
  videoImageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  videoImage: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    opacity: 0.5,
  },
  badgeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(79, 198, 225, 0.9)",
    padding: 4,
    alignItems: "center",
  },
  badgeText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  badgeSubtext: {
    color: colors.white,
    fontSize: 10,
    fontFamily: "Poppins-Medium",
  },
  reactLogoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    marginTop: -20,
    alignItems: "center",
  },
  reactLogoInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  reactLogoText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#61dafb", // kolor React
    letterSpacing: 1,
  },
  nativeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#61dafb", // kolor React
    letterSpacing: 1,
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
    color: colors.text,
  },
  videoDate: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: colors.text,
    opacity: 0.7,
    textAlign: "right",
  },
});
