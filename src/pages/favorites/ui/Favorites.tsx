import { Page } from "@/src/shared/ui/Page";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FavoritesPage() {
  return (
    <Page>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          Здесь будет список избранных новостей
        </Text>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
