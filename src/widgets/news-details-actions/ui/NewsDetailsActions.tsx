import React from "react";
import { ScrollView, View } from "react-native";

import { Article } from "@/src/entities/article";
import { DownloadArticleImageButton } from "@/src/features/article-download-image";
import { ExportArticleJsonButton } from "@/src/features/article-export-json";
import { ToggleFavoriteArticleButton } from "@/src/features/toggle-favorite";
import { styles } from "./NewsDetailsActions.styles";

type Props = {
  article: Article;
};

export function NewsDetailsActions({ article }: Props) {
  return (
    <View style={styles.actionsWrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsRow}
      >
        <ToggleFavoriteArticleButton article={article} />
        {!!article.urlToImage && (
          <DownloadArticleImageButton article={article} />
        )}
        <ExportArticleJsonButton article={article} />
      </ScrollView>
    </View>
  );
}
