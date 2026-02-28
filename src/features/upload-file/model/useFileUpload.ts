import { FileTransferError, LocalFile } from "@/src/entities/file";
import { useRef, useState } from "react";
import { pickFile } from "../lib/pickFile";
import { fakeUploadFile } from "../lib/uploadFile";

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

  return {
    code: "UNKNOWN",
    message: error?.message || "Неизвестная ошибка загрузки.",
  };
}

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<LocalFile | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<FileTransferError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const handlePickFile = async () => {
    setError(null);
    setIsSuccess(false);

    const file = await pickFile();
    if (!file) return;

    setSelectedFile(file);
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
      await fakeUploadFile(selectedFile, {
        onProgress: setProgress,
        signal: controller.signal,
      });
      setIsSuccess(true);
    } catch (e) {
      setError(mapError(e));
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
