import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";
import VideoDetailsScreen from "../screens/video/VideoDetailsScreen";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  VideoDetailsScreen: { videoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoDetailsScreen"
          component={VideoDetailsScreen}
          options={{
            headerShown: false,
            title: "Szczegóły wideo",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
