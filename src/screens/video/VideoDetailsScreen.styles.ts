import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/Colors";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH * 9) / 16,
    backgroundColor: "#000",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoControlsTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 22,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlsRight: {
    flexDirection: "row",
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 22,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  timerContainer: {
    justifyContent: "center",
  },
  timerText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  rightControls: {
    flexDirection: "row",
  },
  controlButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  progressBarBackground: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#ff0000",
  },
  progressBarThumb: {
    position: "absolute",
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#ff0000",
    top: -4,
    marginLeft: -6,
  },
  videoControlsBottom: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  videoControlsOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(50,50,50,0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  titleContainer: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: colors.text,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  channelName: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: colors.text,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.oliveGreen,
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#888",
  },
  activeTabText: {
    color: colors.text,
  },
  tabContent: {
    padding: 16,
  },
  descriptionLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors.text,
    lineHeight: 20,
  },
  statisticsContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 5,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: colors.text,
  },
  notesText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors.text,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cream,
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: colors.text,
  },
});
