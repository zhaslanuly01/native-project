import { downloadRemoteFile, saveImageToGallery } from "@/src/shared/lib/files";
import { useState } from "react";

export function useDownloadArticleImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const downloadImage = async (url: string, articleTitle?: string) => {
    setError(null);
    setProgress(0);
    setIsLoading(true);

    try {
      const safeName = (articleTitle || "news_image")
        .replace(/[^\wа-яА-Я-_]+/g, "_")
        .slice(0, 40);

      const fileName = `${safeName}_${Date.now()}.jpg`;

      const uri = await downloadRemoteFile(url, fileName);

      await saveImageToGallery(uri);

      setProgress(100);
      return uri;
    } catch (e: any) {
      console.log("[downloadImage] error:", e);
      setError(e?.message || "Ошибка загрузки изображения");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadImage, isLoading, progress, error };
}
