import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { colors } from "../../constants/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "VideoDetailsScreen">;

const VideoDetailsScreen = ({ route, navigation }: Props) => {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły wideo</Text>
      <Text style={styles.videoId}>ID filmu: {videoId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
    color: colors.text,
  },
  videoId: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colors.text,
  },
});

export default VideoDetailsScreen;
