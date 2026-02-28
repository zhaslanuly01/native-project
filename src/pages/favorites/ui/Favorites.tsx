import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useLayoutEffect } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { removeFavorite, selectFavorites } from "@/src/entities/favorite";
import { useLogout } from "@/src/features/logout";
import { FileUploadCard } from "@/src/features/upload-file";
import { RootStackParamList } from "@/src/shared/types/router.types";
import { Page } from "@/src/shared/ui/Page";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesPage() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { logout } = useLogout();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={logout}
          hitSlop={8}
          style={{ paddingHorizontal: 8 }}
        >
          <Text style={{ color: "#dc2626", fontWeight: "700" }}>Выйти</Text>
        </Pressable>
      ),
    });
  }, [navigation, logout]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <Page>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 12,
          gap: 8,
        }}
      >
        <FileUploadCard />
      </View>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ padding: 12, gap: 12, flexGrow: 1 }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 6 }}>
              Избранные
            </Text>
            <Text style={{ color: "#666", textAlign: "center" }}>
              Пока нет сохранённых статей
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 12,
              gap: 8,
            }}
          >
            {!!item.urlToImage && (
              <Image
                source={{ uri: item.urlToImage }}
                style={{ width: "100%", height: 180, borderRadius: 10 }}
                resizeMode="cover"
              />
            )}

            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {item.title}
            </Text>

            {!!item.description && (
              <Text style={{ color: "#555" }} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <Pressable
                onPress={() =>
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
                  })
                }
                style={{
                  flex: 1,
                  backgroundColor: "#2563eb",
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Открыть
                </Text>
              </Pressable>

              <Pressable
                onPress={() => dispatch(removeFavorite(item.id))}
                style={{
                  flex: 1,
                  backgroundColor: "#dc2626",
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Удалить
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </Page>
  );
}
