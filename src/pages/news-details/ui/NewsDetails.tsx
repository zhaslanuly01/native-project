import { RootStackParamList } from "@/src/shared/types/router.types";
import { Page } from "@/src/shared/ui/Page";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export default function NewsDetailsPage() {
  const route = useRoute<NewsDetailsRouteProp>();
  const { articleUrl, title } = route.params;

  return (
    <Page>
      <View style={styles.container}>
        <Text style={styles.title}>{title || "News Details"}</Text>
        <Text style={styles.label}>URL:</Text>
        <Text style={styles.url}>{articleUrl}</Text>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  url: {
    fontSize: 13,
    color: "#444",
  },
});
