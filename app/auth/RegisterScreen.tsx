import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { ThemedView } from "@/components/ThemedView";
import { Button, Dialog, PaperProvider, Portal } from "react-native-paper";
import API_URL from "../../config/config";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      router.replace("/auth/LoginScreen");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      setDialogMessage(errorMessage);
      setDialogVisible(true);
    }
  };

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Join us and get started</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/auth/LoginScreen")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Registration Failed</Dialog.Title>
            <Dialog.Content>
              <Text>{dialogMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>OK</Button>
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
    registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#32CD32", // Warna hijau cerah untuk tombol register
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        elevation: 3, // Memberikan efek bayangan untuk tombol
    },
    registerButtonText: {
        color: "#fff", // Teks putih untuk tombol register
        fontSize: 18,
        fontWeight: "600",
    },
    loginButton: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#32CD32", // Warna hijau cerah untuk border tombol login
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", // Tidak ada warna latar belakang
    },
    loginButtonText: {
        color: "#32CD32", // Warna hijau cerah untuk teks tombol login
        fontSize: 18,
        fontWeight: "600",
    },
});
