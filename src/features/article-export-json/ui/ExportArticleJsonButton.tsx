import React, { useCallback } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import { Article } from "@/src/entities/article";
import { useExportArticleJson } from "../model/useExportArticleJson";
import { styles } from "./ExportArticleJsonButton.styles";

type Props = {
  article: Article;
};

export const ExportArticleJsonButton = React.memo(
  function ExportArticleJsonButton({ article }: Props) {
    const { exportJson, isLoading, error } = useExportArticleJson();

    const handlePress = useCallback(async () => {
      const uri = await exportJson(article);

      if (uri) {
        Alert.alert("Успешно", `JSON сохранён:\n${uri}`);
        return;
      }

      Alert.alert("Ошибка", error || "Не удалось сохранить JSON");
    }, [article, error, exportJson]);

    return (
      <View>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>
            {isLoading ? "Сохранение JSON..." : "Скачать JSON статьи"}
          </Text>
        </Pressable>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);
