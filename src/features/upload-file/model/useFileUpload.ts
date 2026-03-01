import {
  addFavorite,
  saveFavoritesToStorage,
  selectFavorites,
} from "@/src/entities/favorite";
import { FileTransferError, LocalFile } from "@/src/entities/file";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { pickFile } from "../lib/pickFile";
import { readTextFile } from "../lib/readJsonFile";
import { parseImportedFavoriteArticle } from "../lib/validateArticleJson";

function mapError(error: any): FileTransferError {
  const code = error?.code;

  if (code === "FILE_TOO_LARGE") {
    return { code, message: "Файл слишком большой. Максимум 10MB." };
  }
  if (code === "USER_CANCELLED") {
    return { code, message: "Загрузка отменена." };
  }
  if (code === "NETWORK") {
    return { code, message: "Сетевая ошибка. Попробуйте ещё раз." };
  }
  if (code === "INVALID_FILE_TYPE") {
    return { code, message: "Разрешены только JSON файлы (.json)." };
  }
  if (code === "INVALID_JSON") {
    return { code, message: "Файл не является корректным JSON." };
  }
  if (code === "INVALID_STRUCTURE") {
    return {
      code,
      message: "JSON не соответствует структуре FavoriteArticle.",
    };
  }
  if (code === "READ_FILE_ERROR") {
    return { code, message: "Не удалось прочитать файл." };
  }

  return {
    code: "UNKNOWN",
    message: error?.message || "Неизвестная ошибка загрузки.",
  };
}

export function useFileUpload() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<FileTransferError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handlePickFile = async () => {
    try {
      setError(null);
      setIsSuccess(false);

      const file = await pickFile();
      if (!file) return;

      setSelectedFile(file);
    } catch (e) {
      const mapped = mapError(e);
      setError(mapped);
      Alert.alert("Ошибка", mapped.message);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setError(null);
    setIsSuccess(false);
    setProgress(0);
    setIsUploading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        const err = new Error("Размер файла превышает 10MB");
        (err as any).code = "FILE_TOO_LARGE";
        throw err;
      }

      const isJsonMime = selectedFile.mimeType?.includes("json");
      const isJsonExt = selectedFile.name.toLowerCase().endsWith(".json");
      if (!isJsonMime && !isJsonExt) {
        const err = new Error("Только JSON");
        (err as any).code = "INVALID_FILE_TYPE";
        throw err;
      }

      setProgress(10);

      if (controller.signal.aborted) {
        const err = new Error("Загрузка отменена");
        (err as any).code = "USER_CANCELLED";
        throw err;
      }

      const raw = await readTextFile(selectedFile);
      setProgress(50);

      if (controller.signal.aborted) {
        const err = new Error("Загрузка отменена");
        (err as any).code = "USER_CANCELLED";
        throw err;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        const err = new Error("Некорректный JSON");
        (err as any).code = "INVALID_JSON";
        throw err;
      }

      const article = parseImportedFavoriteArticle(parsed);

      if (!article) {
        const err = new Error("Неверная структура JSON");
        (err as any).code = "INVALID_STRUCTURE";
        throw err;
      }

      dispatch(addFavorite(article));

      const exists = favorites.some((item) => item.id === article.id);
      const nextItems = exists ? favorites : [article, ...favorites];
      await saveFavoritesToStorage(nextItems);

      setProgress(100);
      setIsSuccess(true);

      Alert.alert("Успешно", "Статья импортирована в избранное");
    } catch (e) {
      const mapped = mapError(e);
      setError(mapped);
      Alert.alert("Ошибка импорта", mapped.message);
    } finally {
      setIsUploading(false);
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const reset = () => {
    setSelectedFile(null);
    setProgress(0);
    setError(null);
    setIsSuccess(false);
    setIsUploading(false);
  };

  return {
    selectedFile,
    progress,
    isUploading,
    error,
    isSuccess,
    handlePickFile,
    handleUpload,
    handleCancel,
    reset,
  };
}
