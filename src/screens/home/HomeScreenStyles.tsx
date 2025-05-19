import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.55;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
    paddingTop: 16,
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
    color: "#61dafb",
    letterSpacing: 1,
  },
  nativeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#61dafb",
    letterSpacing: 1,
  },
  videoInfo: {
    paddingTop: 6,
    paddingHorizontal: 10,
    paddingBottom: 12,
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
  loaderContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  errorContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#e53935",
    textAlign: "center",
  },
  emptyContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: colors.text,
    opacity: 0.7,
    textAlign: "center",
  },
});
