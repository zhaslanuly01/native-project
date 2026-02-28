import { LocalFile } from "@/src/entities/file";
import { File } from "expo-file-system";

export async function readTextFile(file: LocalFile): Promise<string> {
  try {
    const fsFile = new File(file.uri);
    const content = await fsFile.text();
    return content;
  } catch (e) {
    const err = new Error("Не удалось прочитать файл");
    (err as any).code = "READ_FILE_ERROR";
    throw err;
  }
}
