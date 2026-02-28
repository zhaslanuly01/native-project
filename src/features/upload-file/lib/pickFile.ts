import { LocalFile } from "@/src/entities/file";
import * as DocumentPicker from "expo-document-picker";

export async function pickFile(): Promise<LocalFile | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/json"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || !result.assets?.length) return null;

    const asset = result.assets[0];

    return {
      uri: asset.uri,
      name: asset.name ?? "file.json",
      mimeType: asset.mimeType ?? "application/json",
      size: asset.size ?? 0,
    };
  } catch (e) {
    const err = new Error("Не удалось выбрать файл");
    (err as any).code = "PICKER_ERROR";
    throw err;
  }
}
