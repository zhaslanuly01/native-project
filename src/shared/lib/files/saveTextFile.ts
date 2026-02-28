import { File, Paths } from "expo-file-system";

export async function saveTextFile(fileName: string, content: string) {
  const file = new File(Paths.document, fileName);

  file.write(content);

  return file.uri;
}
