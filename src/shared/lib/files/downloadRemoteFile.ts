import { File, Paths } from "expo-file-system";

export async function downloadRemoteFile(url: string, fileName: string) {
  const file = new File(Paths.document, fileName);

  try {
    await File.downloadFileAsync(url, file);

    return file.uri;
  } catch (e: any) {
    throw new Error(e?.message || "Ошибка загрузки файла");
  }
}
