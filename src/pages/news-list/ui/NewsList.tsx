import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  Text,
  View,
} from "react-native";

import { Article, NewsCard } from "@/src/entities/article";
import { useGetTopHeadlinesQuery } from "@/src/entities/article/api/articleApi";
import { Category, DateFilter, NewsFilters } from "@/src/features/news-filters";
import { useDebounce } from "@/src/shared/lib";
import { RootStackParamList, RootTabParamList } from "@/src/shared/types";
import { ErrorView, Loader, Page } from "@/src/shared/ui";
import { styles } from "./NewsList.styles";

type NewsListPageNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "NewsList">,
  NativeStackNavigationProp<RootStackParamList>
>;

const PAGE_SIZE = 20;

export default function NewsListPage() {
  const navigation = useNavigation<NewsListPageNavigationProp>();

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshingLocal, setIsRefreshingLocal] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [category, setCategory] = useState<Category | undefined>(undefined);

  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const onEndReachedCalledDuringMoment = useRef(false);

  const queryArgs = useMemo(
    () => ({
      country: "us" as const,
      pageSize: PAGE_SIZE,
      page,
      q: debouncedQuery || undefined,
      category,
    }),
    [page, debouncedQuery, category]
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTopHeadlinesQuery(queryArgs);

  const filteredArticles = useMemo(() => {
    if (dateFilter === "all") return articles;

    const now = new Date();
    const start = new Date();

    if (dateFilter === "today") {
      start.setHours(0, 0, 0, 0);
    }

    if (dateFilter === "7days") {
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
    }

    return articles.filter((article) => {
      const publishedAt = new Date(article.publishedAt);
      return publishedAt >= start;
    });
  }, [articles, dateFilter]);

  const handleRefresh = async () => {
    setIsRefreshingLocal(true);
    setHasMore(true);
    onEndReachedCalledDuringMoment.current = false;

    try {
      if (page === 1) {
        await refetch();
      } else {
        setPage(1);
      }
    } finally {
      if (page === 1) setIsRefreshingLocal(false);
    }
  };

  const handleLoadMore = () => {
    if (onEndReachedCalledDuringMoment.current) return;

    if (
      isLoading ||
      isFetching ||
      isLoadingMore ||
      isRefreshingLocal ||
      !hasMore
    ) {
      return;
    }

    onEndReachedCalledDuringMoment.current = true;
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  const onPressArticle = useCallback(
    (article: Article) => {
      navigation.navigate("NewsDetails", {
        article: {
          url: article.url,
          title: article.title,
          description: article.description,
          content: article.content,
          author: article.author,
          publishedAt: article.publishedAt,
          urlToImage: article.urlToImage,
          source: article.source,
        },
        from: "NewsList",
      });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item: Article) => item.url, []);

  const renderItem = useCallback<ListRenderItem<Article>>(
    ({ item }) => <NewsCard article={item} onPress={onPressArticle} />,
    [onPressArticle]
  );

  useEffect(() => {
    if (!data) return;

    const incoming = data.articles ?? [];

    setArticles((prev) => {
      if (page === 1) return incoming;

      const seen = new Set(prev.map((a) => a.url));
      const uniqueIncoming = incoming.filter((a) => !seen.has(a.url));

      return [...prev, ...uniqueIncoming];
    });

    const totalResults = data.totalResults ?? 0;

    setHasMore(page * PAGE_SIZE < totalResults);
    setIsLoadingMore(false);
    setIsRefreshingLocal(false);

    onEndReachedCalledDuringMoment.current = false;
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
    setIsLoadingMore(false);
    onEndReachedCalledDuringMoment.current = false;
  }, [debouncedQuery, category]);

  if (isLoading && page === 1) return <Loader />;

  if (isError && articles.length === 0) {
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
      <NewsFilters
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        category={category}
        onChangeCategory={setCategory}
        dateFilter={dateFilter}
        onChangeDateFilter={setDateFilter}
      />
      <FlatList
        data={filteredArticles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onRefresh={handleRefresh}
        refreshing={isRefreshingLocal || (isFetching && page === 1)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMoment.current = false;
        }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          !isLoading && !isFetching ? (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>Нет новостей</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator />
            </View>
          ) : !hasMore && filteredArticles.length > 0 ? (
            <View style={styles.footerEnd}>
              <Text style={styles.footerEndText}>Больше новостей нет</Text>
            </View>
          ) : null
        }
      />
    </Page>
  );
}
