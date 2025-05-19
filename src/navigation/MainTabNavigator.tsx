import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/Colors";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SearchScreen } from "../screens/search/SearchScreen";
import { SvgProps } from "react-native-svg";

// Importujemy ikony
import HomeIcon from "../assets/images/home-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: { query: string; maxResults?: number };
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabBarIcons: Record<string, React.FC<SvgProps>> = {
  HomeTab: HomeIcon,
  SearchTab: SearchIcon,
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          const IconComponent = tabBarIcons[route.name];
          return (
            <View style={styles.tabItemContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <View style={styles.iconContainer}>
                <IconComponent width={size} height={size} color={color} />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: colors.oliveGreen,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: styles.tabBar,
        animation: "shift",
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={[
              styles.tabBarLabel,
              {
                fontFamily: focused ? "Poppins600" : "Poppins400",
                color,
              },
            ]}
          >
            {route.name === "HomeTab" ? "Home" : "Search"}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SearchTab" component={SearchScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.text,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    height: Platform.OS === "ios" ? 85 : 65,
  },
  tabBarLabel: {
    fontSize: 14,
    marginBottom: Platform.OS === "ios" ? 0 : -5,
    fontWeight: "bold",
  },
  tabItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIndicator: {
    position: "absolute",
    top: -15,
    width: 30,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.oliveGreen,
  },
});
