import React, { useCallback } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { Article } from "@/src/entities/article";
import { useDownloadArticleImage } from "../model/useDownloadArticleImage";
import { styles } from "./DownloadArticleImageButton.styles";

type Props = {
  article: Article;
};

export const DownloadArticleImageButton = React.memo(
  function DownloadArticleImageButton({ article }: Props) {
    const { downloadImage, isLoading, progress, error } =
      useDownloadArticleImage();

    const handlePress = useCallback(async () => {
      if (!article.urlToImage) {
        Alert.alert("Ошибка", "У статьи нет изображения");
        return;
      }

      const uri = await downloadImage(article.urlToImage, article.title);

      if (uri) {
        Alert.alert("Успешно", "Изображение скачано и сохранено в галерею");
        return;
      }

      Alert.alert(
        "Ошибка",
        error || "Не удалось скачать/сохранить изображение"
      );
    }, [article.title, article.urlToImage, downloadImage, error]);

    return (
      <View>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>
            {isLoading
              ? `Скачивание изображения... ${progress}%`
              : "Скачать изображение"}
          </Text>
        </Pressable>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);
