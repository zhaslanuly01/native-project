import React from "react";
import { Pressable, Text } from "react-native";

import { Article } from "@/src/entities/article";
import { useToggleFavoriteArticle } from "../model/useToggleFavorite";
import { styles } from "./ToggleFavoriteArticleButton.styles";

type Props = {
  article: Article;
};

export const ToggleFavoriteArticleButton = React.memo(
  function ToggleFavoriteArticleButton({ article }: Props) {
    const { isFavorite, toggle } = useToggleFavoriteArticle(article);

    return (
      <Pressable style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {isFavorite ? "★ Удалить из избранного" : "☆ В избранное"}
        </Text>
      </Pressable>
    );
  }
);
