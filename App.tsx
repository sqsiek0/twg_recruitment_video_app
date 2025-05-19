import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import { ActivityIndicator, View } from "react-native";
import { QueryProvider } from "./src/api/queryProvider";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins100: require("./src/assets/fonts/Poppins-Thin.ttf"),
    Poppins200: require("./src/assets/fonts/Poppins-ExtraLight.ttf"),
    Poppins300: require("./src/assets/fonts/Poppins-Light.ttf"),
    Poppins400: require("./src/assets/fonts/Poppins-Regular.ttf"),
    Poppins500: require("./src/assets/fonts/Poppins-Medium.ttf"),
    Poppins600: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    Poppins700: require("./src/assets/fonts/Poppins-Bold.ttf"),
    Poppins800: require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    Poppins900: require("./src/assets/fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryProvider>
      <AppNavigator />
    </QueryProvider>
  );
}
