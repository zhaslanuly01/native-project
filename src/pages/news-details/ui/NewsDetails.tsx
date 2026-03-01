import { Article } from "@/src/entities/article";
import { RootStackParamList } from "@/src/shared/types/router.types";
import { Page } from "@/src/shared/ui/Page";
import { ArticleWebViewViewer } from "@/src/widgets/article-webview-viewer";
import { NewsDetailsActions } from "@/src/widgets/news-details-actions";
import { NewsDetailsContent } from "@/src/widgets/news-details-content";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./NewsDetails.styles";

type NewsDetailsRouteProp = RouteProp<RootStackParamList, "NewsDetails">;

export default function NewsDetailsPage() {
  const route = useRoute<NewsDetailsRouteProp>();
  const { article } = route.params;

  const [showWebView, setShowWebView] = useState(false);

  const formattedDate = useMemo(() => {
    if (!article?.publishedAt) return "Дата не указана";
    return new Date(article.publishedAt).toLocaleString();
  }, [article?.publishedAt]);

  const handleOpenWebView = useCallback(() => {
    setShowWebView(true);
  }, []);

  const handleCloseWebView = useCallback(() => {
    setShowWebView(false);
  }, []);

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
        <ArticleWebViewViewer url={article.url} onBack={handleCloseWebView} />
      </Page>
    );
  }

  return (
    <Page>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NewsDetailsActions article={article as Article} />

        <NewsDetailsContent
          article={article as Article}
          formattedDate={formattedDate}
        />

        <Pressable style={styles.openWebButton} onPress={handleOpenWebView}>
          <Text style={styles.openWebButtonText}>
            Открыть оригинал во встроенном WebView
          </Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}
