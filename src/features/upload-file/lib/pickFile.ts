import { LocalFile } from "@/src/entities/file";
import * as DocumentPicker from "expo-document-picker";

export async function pickFile(): Promise<LocalFile | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) return null;

  const asset = result.assets[0];

  return {
    uri: asset.uri,
    name: asset.name ?? "file",
    mimeType: asset.mimeType ?? "application/octet-stream",
    size: asset.size ?? 0,
  };
}
