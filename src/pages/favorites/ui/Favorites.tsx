import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  FavoriteArticle,
  FavoriteCard,
  removeFavorite,
  selectFavorites,
} from "@/src/entities/favorite";
import { useLogout } from "@/src/features/logout";
import { FileUploadCard } from "@/src/features/upload-file";
import { RootStackParamList } from "@/src/shared/types/router.types";
import { Page } from "@/src/shared/ui/Page";
import { styles } from "./Favorites.styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesPage() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { logout } = useLogout();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={logout} hitSlop={8} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти</Text>
        </Pressable>
      ),
    });
  }, [navigation, logout]);

  const keyExtractor = useCallback((item: FavoriteArticle) => item.id, []);

  const onOpenFavorite = useCallback(
    (item: FavoriteArticle) => {
      navigation.navigate("NewsDetails", {
        article: {
          url: item.url,
          title: item.title,
          description: item.description,
          content: item.content,
          author: item.author,
          publishedAt: item.publishedAt,
          urlToImage: item.urlToImage,
          source: { id: null, name: item.sourceName },
        },
        from: "Favorites",
      });
    },
    [navigation]
  );

  const onRemoveFavorite = useCallback(
    (articleId: string) => {
      dispatch(removeFavorite(articleId));
    },
    [dispatch]
  );

  const renderFavoriteItem = useCallback<ListRenderItem<FavoriteArticle>>(
    ({ item }) => (
      <FavoriteCard
        article={item}
        onOpen={onOpenFavorite}
        onRemove={onRemoveFavorite}
      />
    ),
    [onOpenFavorite, onRemoveFavorite]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Избранные</Text>
        <Text style={styles.emptyText}>Пока нет сохранённых статей</Text>
      </View>
    ),
    []
  );

  return (
    <Page>
      <View style={styles.uploadCardWrap}>
        <FileUploadCard />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
      />
    </Page>
  );
}
