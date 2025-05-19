import React from "react";
import { Text, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./LoginStyles";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Logo from "../../assets/images/logo.svg";
import AppIcon from "../../assets/images/app-icon.svg";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.imageWrapper}>
        <AppIcon />
      </View>

      <Text style={styles.title}>
        Welcome to the best YouTube-based learning application.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Main")}
      >
        <Text style={styles.buttonText}>Log in as guest</Text>
      </TouchableOpacity>

      <Text style={[styles.footer]}>
        By continuing you agree with{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://google.com")}
        >
          Terms and Conditions
        </Text>{" "}
        and{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://google.com")}
        >
          Privacy Policy
        </Text>
      </Text>
    </SafeAreaView>
  );
}
