import React from "react";
import { Pressable, Text, View } from "react-native";
import { useFileUpload } from "../model/useFileUpload";

export function FileUploadCard() {
  const {
    selectedFile,
    progress,
    isUploading,
    error,
    isSuccess,
    handlePickFile,
    handleUpload,
    handleCancel,
  } = useFileUpload();

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#111827",
        gap: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
        Отправить файл
      </Text>

      <Pressable
        onPress={handlePickFile}
        style={{ padding: 12, borderRadius: 10, backgroundColor: "#1f2937" }}
      >
        <Text style={{ color: "white" }}>
          {selectedFile ? "Выбрать другой файл" : "Выбрать файл"}
        </Text>
      </Pressable>

      {selectedFile && (
        <View>
          <Text style={{ color: "#d1d5db" }}>Имя: {selectedFile.name}</Text>
          <Text style={{ color: "#d1d5db" }}>
            Размер: {selectedFile.size} bytes
          </Text>
          <Text style={{ color: "#d1d5db" }}>Тип: {selectedFile.mimeType}</Text>
        </View>
      )}

      <Pressable
        onPress={handleUpload}
        disabled={!selectedFile || isUploading}
        style={{
          padding: 12,
          borderRadius: 10,
          backgroundColor: !selectedFile || isUploading ? "#374151" : "#2563eb",
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isUploading ? `Загрузка... ${progress}%` : "Отправить файл"}
        </Text>
      </Pressable>

      {isUploading && (
        <Pressable
          onPress={handleCancel}
          style={{ padding: 10, borderRadius: 10, backgroundColor: "#7f1d1d" }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Отменить</Text>
        </Pressable>
      )}

      {isSuccess && (
        <Text style={{ color: "#22c55e" }}>✅ Файл успешно отправлен</Text>
      )}
      {error && <Text style={{ color: "#ef4444" }}>❌ {error.message}</Text>}
    </View>
  );
}
