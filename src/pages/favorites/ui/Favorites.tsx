import { useLogout } from "@/src/features/logout";
import { Page } from "@/src/shared/ui/Page";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FavoritesPage() {
  const { logout } = useLogout();

  return (
    <Page>
      <View style={styles.container}>
        <Text style={styles.title}>Избранные</Text>
        <Text style={styles.subtitle}>
          Здесь будет список избранных новостей
        </Text>

        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Выйти</Text>
        </Pressable>
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
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: "#c62828",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});
