import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { VideoItem } from "../../../api/videoMapper";
import { colors } from "../../../constants/Colors";

interface Props {
  item: VideoItem;
  onPress?: () => void;
}

const VideoCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />

    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.channel}>{item.channelTitle}</Text>

      <Text style={styles.description} numberOfLines={2}>
        {item.description ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      </Text>

      <Text style={styles.date}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  info: {
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  title: {
    fontFamily: "Poppins600",
    fontSize: 16,
    color: colors.text,
    marginBottom: 6,
  },
  channel: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
    marginBottom: 16,
  },
  date: {
    fontFamily: "Poppins400",
    fontSize: 12,
    color: colors.text,
    alignSelf: "flex-end",
  },
});

export default VideoCard;
