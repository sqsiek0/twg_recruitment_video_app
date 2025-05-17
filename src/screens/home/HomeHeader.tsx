import React from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../../constants/Colors";
import SearchIcon from "../../assets/images/search-icon.svg";
import SettingsIcon from "../../assets/images/settings-icon.svg";

export default function HomeHeader() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon style={styles.searchIcon} />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Szukaj filmów..."
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => console.log("Ustawienia naciśnięte")}
        >
          <SettingsIcon style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cream,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cream,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.text,
    height: 44,
  },
  searchIconContainer: {
    paddingLeft: 12,
    height: "100%",
    justifyContent: "center",
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingLeft: 8,
    paddingRight: 16,
    color: colors.text,
    fontSize: 16,
  },
  settingsButton: {
    marginLeft: 16,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: colors.amber,
  },
});
