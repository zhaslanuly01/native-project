import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";

export async function saveImageToGallery(localUri: string) {
  if (Constants.appOwnership === "expo") {
    throw new Error(
      "Сохранение в галерею недоступно в Expo Go. Запусти приложение через development build (expo run:ios)."
    );
  }

  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Нет доступа к галерее");
  }

  await MediaLibrary.saveToLibraryAsync(localUri);
}
