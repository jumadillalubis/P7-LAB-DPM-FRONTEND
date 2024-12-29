import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  Card,
  PaperProvider,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import API_URL from "@/config/config";

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const ExploreScreen = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/explore`);
      const data = await response.json();
      setItems(data.items);
      setFilteredItems(data.items);
    } catch (error) {
      console.error("Failed to fetch items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredItems(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    const filtered = items.filter(
      (item) => item.category === category || category === ""
    );
    setFilteredItems(filtered);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push(`/explore/${item.id}`)}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Content>
          <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.cardDescription}>
            {item.description}
          </ThemedText>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Explore</ThemedText>

        {/* Pencarian */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Filter berdasarkan kategori */}
        <View style={styles.filterContainer}>
          <Button
            onPress={() => handleCategoryFilter("")}
            mode="outlined"
            style={styles.filterButton}
          >
            All
          </Button>
          <Button
            onPress={() => handleCategoryFilter("Technology")}
            mode="outlined"
            style={styles.filterButton}
          >
            Technology
          </Button>
          <Button
            onPress={() => handleCategoryFilter("Health")}
            mode="outlined"
            style={styles.filterButton}
          >
            Health
          </Button>
          <Button
            onPress={() => handleCategoryFilter("Lifestyle")}
            mode="outlined"
            style={styles.filterButton}
          >
            Lifestyle
          </Button>
        </View>

        {/* Tombol Refresh */}
        <Button
          onPress={fetchItems}
          mode="contained"
          style={styles.refreshButton}
        >
          Refresh
        </Button>

        {/* Menampilkan loading indicator */}
        {loading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}
      </ThemedView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFAF0", // Latar belakang krim terang
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Warna teks judul
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    height: 45,
    borderColor: "#007BFF", // Border biru terang
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#ADD8E6", // Biru muda untuk tombol filter
    borderColor: "#ADD8E6",
  },
  refreshButton: {
    marginBottom: 16,
    marginTop: 10,
    backgroundColor: "#FF6347", // Tombol refresh dengan warna merah terang
  },
  list: {
    paddingBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF", // Warna biru terang untuk judul
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});

export default ExploreScreen;
