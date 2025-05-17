import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { withAlpha } from "../../utils/Color_helper";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: withAlpha(colors.clay, 0.5),
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Poppins600",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.darkOlive,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins600",
    color: colors.white,
  },
  footer: {
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
  },
  logo: {
    marginTop: 20,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: colors.darkOlive,
    textDecorationLine: "underline",
  },
});
