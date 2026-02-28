import { Article } from "@/src/entities/article";
import React, { memo, useMemo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./NewsCard.styles";

type Props = {
  article: Article;
  onPress: (article: Article) => void;
};

function NewsCardComponent({ article, onPress }: Props) {
  const formattedDate = useMemo(() => {
    return new Date(article.publishedAt).toLocaleDateString();
  }, [article.publishedAt]);

  return (
    <Pressable style={styles.card} onPress={() => onPress(article)}>
      {article.urlToImage ? (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Без изображения</Text>
        </View>
      )}

      <Text style={styles.title}>{article.title}</Text>

      {!!article.description && (
        <Text style={styles.description} numberOfLines={2}>
          {article.description}
        </Text>
      )}

      <View style={styles.metaRow}>
        <Text style={styles.source}>{article.source.name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
}

export const NewsCard = memo(NewsCardComponent);
