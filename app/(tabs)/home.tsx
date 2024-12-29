import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

const HomeScreen = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.icons8.com/?size=64&id=9zcV0gKAozhn&format=png",
            }} // Ganti dengan URL logo yang sesuai
          />
          <Text style={styles.headerTitle}>Welcome Back!</Text>
        </View>

        {/* Main Content Section */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Explore Our App</Text>
          <Text style={styles.subtitle}>Find exciting features and tools</Text>
          <Text style={styles.description}>
            Discover the latest updates and enhancements designed to make your
            experience even better. Stay connected with friends and family, and
            enjoy seamless navigation.
          </Text>

          {/* Additional Information or Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Key Features</Text>
            <Text style={styles.infoDescription}>
              - Stay connected with real-time notifications
            </Text>
            <Text style={styles.infoDescription}>
              - Enjoy seamless navigation across the app
            </Text>
            <Text style={styles.infoDescription}>
              - Customize your experience to suit your needs
            </Text>
          </View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAF0", // Light cream background
  },
  header: {
    backgroundColor: "#FF6347", // Tomato red background for the header
    paddingTop: 40, // Adjusted to give space for the status bar
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6347", // Tomato red title color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FF8C00", // Orange subtitle color
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333", // Dark text for better readability
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 20,
  },
  infoSection: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 3, // Shadow for depth
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6347", // Tomato red for the section title
    marginBottom: 10,
  },
  infoDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default HomeScreen;
