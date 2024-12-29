import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import { Button, Dialog, PaperProvider, Portal } from "react-native-paper";
import API_URL from "../../config/config";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token } = response.data.data;
      await AsyncStorage.setItem("token", token);
      setDialogMessage("Login successful!");
      setIsSuccess(true);
      setDialogVisible(true);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      setDialogMessage(errorMessage);
      setIsSuccess(false);
      setDialogVisible(true);
    }
  };

  const handleDialogDismiss = () => {
    setDialogVisible(false);
    if (isSuccess) {
      router.replace("/(tabs)");
    }
  };

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/auth/RegisterScreen")}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
            <Dialog.Title>
              {isSuccess ? "Success" : "Login Failed"}
            </Dialog.Title>
            <Dialog.Content>
              <Text>{dialogMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDialogDismiss}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ThemedView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFAF0", // Latar belakang warna krem terang yang cerah
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF6347", // Warna merah tomat cerah untuk judul
  },
  subtitle: {
    fontSize: 18,
    color: "#FF8C00", // Warna oranye cerah untuk subtitle
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#FFD700", // Warna kuning cerah untuk border
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff", // Latar belakang putih untuk input
    shadowColor: "#000", // Bayangan untuk input
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#32CD32", // Warna hijau cerah untuk tombol login
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3, // Memberikan efek bayangan untuk tombol
  },
  loginButtonText: {
    color: "#fff", // Teks putih untuk tombol login
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#32CD32", // Warna hijau cerah untuk border tombol register
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Tidak ada warna latar belakang
  },
  registerButtonText: {
    color: "#32CD32", // Warna hijau cerah untuk teks tombol register
    fontSize: 18,
    fontWeight: "600",
  },
});
