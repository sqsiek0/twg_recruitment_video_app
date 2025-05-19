import React, { useState } from "react";
import { View, StyleSheet, TextInput, SafeAreaView, Text } from "react-native";
import { colors } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import SearchIcon from "../../assets/images/search-icon.svg";

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon style={styles.searchIcon} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Szukaj filmów..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {searchQuery ? `Wyniki wyszukiwania dla: "${searchQuery}"` : "1157 results found for: \"React Native\""}
          </Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <Text style={styles.sortValue}>Most popular</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.placeholderText}>Tutaj będą wyniki wyszukiwania</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomColor: colors.text,
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
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
    paddingLeft: 12,
  },
  searchIconContainer: {
    justifyContent: "center",
    marginRight: 8,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins400",
    fontSize: 16,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  resultsText: {
    fontFamily: "Poppins400",
    fontSize: 14,
    color: colors.text,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortLabel: {
    fontFamily: "Poppins400",
    fontSize: 14,
    color: colors.text,
    marginRight: 5,
  },
  sortValue: {
    fontFamily: "Poppins600",
    fontSize: 14,
    color: colors.text,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Poppins400",
    fontSize: 16,
    color: colors.text,
  },
});
