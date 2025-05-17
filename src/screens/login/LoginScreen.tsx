// src/screens/login/LoginScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { styles } from "./LoginStyles";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YouTube Learn</Text>
      <Text style={styles.footer}>
        By continuing you agree with Terms and Privacy Policy
      </Text>
      <Button
        title="Login with Google"
        color="#1e88e5"
        onPress={() => {
          navigation.replace("Home");
        }}
      ></Button>
    </View>
  );
}
