import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  ActivityIndicator,
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from "react-native-paper";
import API_URL from "@/config/config";

type UserProfile = {
  username: string;
  email: string;
  avatar: string; // Menambahkan field avatar untuk URL foto profil
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get<{ data: UserProfile }>(
        `${API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data.data); // Pastikan avatar berisi URL gambar
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setDialogVisible(true);
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/auth/LoginScreen");
  };

  if (loading) {
    return (
      <PaperProvider>
        <ThemedView style={styles.container}>
          <ActivityIndicator animating={true} />
        </ThemedView>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        {profile ? (
          <View style={styles.profileContainer}>
            {/* Gambar Avatar menggunakan URL */}
            <Image
              source={{ uri: "https://i.pinimg.com/236x/8a/dc/57/8adc57bcd3d3af88f34ff524fe7a136f.jpg" }} // Gunakan URL gambar avatar
              style={styles.avatar}
            />
            <ThemedText style={styles.title}>
              Welcome, {profile.username}
            </ThemedText>
            <ThemedText style={styles.label}>Email:</ThemedText>
            <ThemedText style={styles.value}>{profile.email}</ThemedText>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              Log Out
            </Button>
          </View>
        ) : (
          <ThemedText>No profile data available</ThemedText>
        )}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Logout</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={confirmLogout}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ThemedView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFAF0", // Latar belakang krim terang
  },
  profileContainer: {
    width: "80%",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Efek bayangan
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#007BFF", // Border biru
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    color: "#007BFF", // Warna biru untuk label
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "#FF6347", // Tombol log out dengan warna merah terang
  },
});

export default ProfileScreen;
