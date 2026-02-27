import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Article } from "@/src/entities/article";
import { useGetTopHeadlinesQuery } from "@/src/entities/article/api/articleApi";
import { RootStackParamList, RootTabParamList } from "@/src/shared/types";
import { ErrorView, Loader, Page } from "@/src/shared/ui";

type NewsListPageNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "NewsList">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function NewsListPage() {
  const navigation = useNavigation<NewsListPageNavigationProp>();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTopHeadlinesQuery({
      country: "us",
      pageSize: 20,
    });

  const onPressArticle = (article: Article) => {
    navigation.navigate("NewsDetails", {
      articleUrl: article.url,
      title: article.title,
    });
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <Page>
        <ErrorView
          message={`Не удалось загрузить новости: ${JSON.stringify(error)}`}
        />
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Повторить</Text>
        </Pressable>
      </Page>
    );
  }

  return (
    <Page>
      <FlatList
        data={data?.articles ?? []}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => onPressArticle(item)}>
            <Text style={styles.title}>{item.title}</Text>

            {!!item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            <View style={styles.metaRow}>
              <Text style={styles.source}>{item.source.name}</Text>
              <Text style={styles.date}>
                {new Date(item.publishedAt).toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Нет новостей</Text>
          </View>
        }
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 12,
    gap: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 10,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  source: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  emptyWrap: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
  },
  retryButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
