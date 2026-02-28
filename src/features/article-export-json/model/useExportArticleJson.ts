import { Article } from "@/src/entities/article";
import { File, Paths } from "expo-file-system";
import { useState } from "react";

export function useExportArticleJson() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportJson = async (article: Article) => {
    setError(null);
    setIsLoading(true);

    try {
      const safeTitle = (article.title || "article")
        .replace(/[^\wа-яА-Я-_]+/g, "_")
        .slice(0, 40);

      const file = new File(Paths.document, `${safeTitle}.json`);
      file.write(JSON.stringify(article, null, 2));

      return file.uri;
    } catch (e: any) {
      setError(e?.message || "Не удалось сохранить JSON");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { exportJson, isLoading, error };
}
