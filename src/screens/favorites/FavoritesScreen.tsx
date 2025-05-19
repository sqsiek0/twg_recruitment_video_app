import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../../navigation/MainTabNavigator";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "FavoritesTab">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function FavoritesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ulubione</Text>
        <Text style={styles.text}>Zawartość ekranu ulubionych filmów</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.oliveGreen,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
