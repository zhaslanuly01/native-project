import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "native-project",
  slug: "native-project",
  scheme: "nativeproject",
  ios: {
    ...config.ios,
    bundleIdentifier: "com.islam.newsapp",
    supportsTablet: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        "Разрешите доступ к фото для сохранения изображений из новостей.",
      NSPhotoLibraryAddUsageDescription:
        "Разрешите сохранять изображения в галерею.",
    },
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-media-library",
      {
        photosPermission: "Разрешите доступ к фото для чтения медиа.",
        savePhotosPermission: "Разрешите сохранять изображения в галерею.",
      },
    ],
    [
      "expo-file-system",
      {
        supportsOpeningDocumentsInPlace: true,
        enableFileSharing: true,
      },
    ],
  ],
});
