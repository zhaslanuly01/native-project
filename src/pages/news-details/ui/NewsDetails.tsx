import { Article } from "@/src/entities/article";
import { selectIsFavoriteByUrl, toggleFavorite } from "@/src/entities/favorite";
import { useDownloadArticleImage } from "@/src/features/article-download-image";
import { useExportArticleJson } from "@/src/features/article-export-json";
import { sendFavoriteAddedNotification } from "@/src/shared/lib/notifications";
import { RootStackParamList } from "@/src/shared/types/router.types";
import { Page } from "@/src/shared/ui/Page";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./NewsDetails.styles";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export default function NewsDetailsPage() {
  const dispatch = useDispatch();
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;
  const isFavorite = useSelector(selectIsFavoriteByUrl(article.url));

  const [showWebView, setShowWebView] = useState(false);
  const [isLoadingWeb, setIsLoadingWeb] = useState(true);
  const [hasWebError, setHasWebError] = useState(false);

  const formattedDate = useMemo(() => {
    if (!article?.publishedAt) return "Дата не указана";
    return new Date(article.publishedAt).toLocaleString();
  }, [article?.publishedAt]);

  const favoritePayload = {
    id: article.url,
    url: article.url,
    title: article.title ?? "Без названия",
    description: article.description ?? null,
    content: article.content ?? null,
    author: article.author ?? null,
    publishedAt: article.publishedAt ?? "",
    urlToImage: article.urlToImage ?? null,
    sourceName: article.source?.name ?? "Не указан",
  };

  const {
    downloadImage,
    isLoading: isDownloadingImage,
    progress: imageDownloadProgress,
    error: imageDownloadError,
  } = useDownloadArticleImage();

  const {
    exportJson,
    isLoading: isExportingJson,
    error: exportJsonError,
  } = useExportArticleJson();

  const handleDownloadImage = async () => {
    if (!article.urlToImage) {
      Alert.alert("Ошибка", "У статьи нет изображения");
      return;
    }

    const uri = await downloadImage(article.urlToImage, article.title);

    if (uri) {
      Alert.alert("Успешно", "Изображение скачано и сохранено в галерею");
    } else {
      Alert.alert(
        "Ошибка",
        imageDownloadError || "Не удалось скачать/сохранить изображение"
      );
    }
  };

  const handleExportJson = async () => {
    const uri = await exportJson(article as Article);

    if (uri) {
      Alert.alert("Успешно", `JSON сохранён:\n${uri}`);
    } else {
      Alert.alert("Ошибка", exportJsonError || "Не удалось сохранить JSON");
    }
  };

  const handleToggleFavorite = async () => {
    const wasFavorite = isFavorite;

    dispatch(toggleFavorite(favoritePayload));

    if (!wasFavorite) {
      try {
        await sendFavoriteAddedNotification(article.title || "Статья");
      } catch (e) {
        console.log("Notification error:", e);
      }
    }
  };

  if (!article?.url) {
    return (
      <Page>
        <View style={styles.center}>
          <Text style={styles.errorText}>Некорректные данные статьи</Text>
        </View>
      </Page>
    );
  }

  if (showWebView) {
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.actionButtonSecondary}
              onPress={() => setShowWebView(false)}
            >
              <Text style={styles.actionButtonSecondaryText}>
                ← Назад к статье
              </Text>
            </Pressable>
          </View>

          <View style={styles.webViewWrapper}>
            {isLoadingWeb && (
              <View style={styles.loaderOverlay}>
                <ActivityIndicator size="large" />
                <Text style={styles.loaderText}>Загрузка оригинала...</Text>
              </View>
            )}

            {hasWebError ? (
              <View style={styles.center}>
                <Text style={styles.errorText}>
                  Не удалось загрузить оригинальную статью
                </Text>
                <Text style={styles.url} numberOfLines={2}>
                  {article.url}
                </Text>
              </View>
            ) : (
              <WebView
                source={{ uri: article.url }}
                style={styles.webview}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
                setSupportMultipleWindows={false}
                onShouldStartLoadWithRequest={(request) => {
                  const url = request.url ?? "";

                  if (
                    url.startsWith("about:srcdoc") ||
                    url.startsWith("about:blank") ||
                    url.startsWith("blob:") ||
                    url.startsWith("data:")
                  ) {
                    return false;
                  }

                  return (
                    url.startsWith("http://") || url.startsWith("https://")
                  );
                }}
                onLoadStart={() => {
                  setIsLoadingWeb(true);
                  setHasWebError(false);
                }}
                onLoadEnd={() => setIsLoadingWeb(false)}
                onError={() => {
                  setHasWebError(true);
                  setIsLoadingWeb(false);
                }}
              />
            )}
          </View>
        </View>
      </Page>
    );
  }

  return (
    <Page>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerActions}>
          <Pressable
            style={styles.actionButtonPrimary}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.actionButtonPrimaryText}>
              {isFavorite ? "★ Удалить из избранного" : "☆ В избранное"}
            </Text>
          </Pressable>
          {!!article.urlToImage && (
            <Pressable
              style={styles.openWebButton}
              onPress={handleDownloadImage}
            >
              <Text style={styles.openWebButtonText}>
                {isDownloadingImage
                  ? `Скачивание изображения... ${imageDownloadProgress}%`
                  : "Скачать изображение"}
              </Text>
            </Pressable>
          )}

          <Pressable style={styles.openWebButton} onPress={handleExportJson}>
            <Text style={styles.openWebButtonText}>
              {isExportingJson ? "Сохранение JSON..." : "Скачать JSON статьи"}
            </Text>
          </Pressable>

          {!!imageDownloadError && (
            <Text style={styles.errorText}>{imageDownloadError}</Text>
          )}

          {!!exportJsonError && (
            <Text style={styles.errorText}>{exportJsonError}</Text>
          )}
        </View>

        {!!article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        )}

        <Text style={styles.title}>{article.title || "Без названия"}</Text>

        <View style={styles.metaBlock}>
          <Text style={styles.metaText}>
            Источник: {article.source?.name || "Не указан"}
          </Text>
          <Text style={styles.metaText}>
            Автор: {article.author || "Не указан"}
          </Text>
          <Text style={styles.metaText}>Дата: {formattedDate}</Text>
        </View>

        {!!article.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Краткое описание</Text>
            <Text style={styles.bodyText}>{article.description}</Text>
          </View>
        )}

        {!!article.content && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Полный текст</Text>
            <Text style={styles.bodyText}>{article.content}</Text>
          </View>
        )}

        {!article.content && article.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Текст статьи</Text>
            <Text style={styles.bodyText}>
              Полный текст недоступен из API. Откройте оригинальную статью во
              встроенном WebView.
            </Text>
          </View>
        )}

        <Pressable
          style={styles.openWebButton}
          onPress={() => {
            setHasWebError(false);
            setIsLoadingWeb(true);
            setShowWebView(true);
          }}
        >
          <Text style={styles.openWebButtonText}>
            Открыть оригинал во встроенном WebView
          </Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}
