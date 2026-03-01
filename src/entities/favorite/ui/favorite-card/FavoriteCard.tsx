import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { FavoriteArticle } from "../../model/favorite.types";
import { styles } from "./FavoriteCard.styles";

type FavoriteCardProps = {
  article: FavoriteArticle;
  onOpen: (article: FavoriteArticle) => void;
  onRemove: (articleId: string) => void;
};

export const FavoriteCard = React.memo(function FavoriteCard({
  article,
  onOpen,
  onRemove,
}: FavoriteCardProps) {
  return (
    <View style={styles.card}>
      {!!article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Text style={styles.title}>{article.title}</Text>

      {!!article.description && (
        <Text style={styles.description} numberOfLines={2}>
          {article.description}
        </Text>
      )}

      <View style={styles.actionsRow}>
        <Pressable
          onPress={() => onOpen(article)}
          style={[styles.actionButton, styles.openButton]}
        >
          <Text style={styles.actionButtonText}>Открыть</Text>
        </Pressable>

        <Pressable
          onPress={() => onRemove(article.id)}
          style={[styles.actionButton, styles.removeButton]}
        >
          <Text style={styles.actionButtonText}>Удалить</Text>
        </Pressable>
      </View>
    </View>
  );
});
