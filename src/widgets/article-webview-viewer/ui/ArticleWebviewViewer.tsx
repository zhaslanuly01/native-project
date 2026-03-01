import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { styles } from "./ArticleWebviewViewer.styles";

type Props = {
  url: string;
  onBack: () => void;
};

export function ArticleWebViewViewer({ url, onBack }: Props) {
  const [isLoadingWeb, setIsLoadingWeb] = useState(true);
  const [hasWebError, setHasWebError] = useState(false);

  const handleShouldStartLoad = useCallback((request: { url?: string }) => {
    const requestUrl = request.url ?? "";

    if (
      requestUrl.startsWith("about:srcdoc") ||
      requestUrl.startsWith("about:blank") ||
      requestUrl.startsWith("blob:") ||
      requestUrl.startsWith("data:")
    ) {
      return false;
    }

    return (
      requestUrl.startsWith("http://") || requestUrl.startsWith("https://")
    );
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoadingWeb(true);
    setHasWebError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoadingWeb(false);
  }, []);

  const handleError = useCallback(() => {
    setHasWebError(true);
    setIsLoadingWeb(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад к статье</Text>
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
              {url}
            </Text>
          </View>
        ) : (
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows={false}
            onShouldStartLoadWithRequest={handleShouldStartLoad}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
          />
        )}
      </View>
    </View>
  );
}
