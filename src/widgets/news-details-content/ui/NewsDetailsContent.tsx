import React from "react";
import { Image, Text, View } from "react-native";

import { Article } from "@/src/entities/article";
import { styles } from "./NewsDetailsContent.styles";

type Props = {
  article: Article;
  formattedDate: string;
};

export function NewsDetailsContent({ article, formattedDate }: Props) {
  return (
    <>
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

      {!article.content && !!article.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Текст статьи</Text>
          <Text style={styles.bodyText}>
            Полный текст недоступен из API. Откройте оригинальную статью во
            встроенном WebView.
          </Text>
        </View>
      )}
    </>
  );
}
