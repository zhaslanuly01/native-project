import * as MediaLibrary from "expo-media-library";

export async function saveImageToGallery(localUri: string) {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Нет доступа к галерее");
  }

  await MediaLibrary.saveToLibraryAsync(localUri);
}
