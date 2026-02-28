import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationsPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("news-updates", {
      name: "News Updates",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  return true;
}

export async function sendLocalNewsNotification(params: {
  title: string;
  body: string;
}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: params.title,
      body: params.body,
    },
    trigger: null,
  });
}

export async function sendFavoriteAddedNotification(articleTitle: string) {
  await sendLocalNewsNotification({
    title: "Добавлено в избранное",
    body: articleTitle,
  });
}
