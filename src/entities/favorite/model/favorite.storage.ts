import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoriteArticle } from "./favorite.types";

const FAVORITES_KEY = "favorite_articles_v1";

export async function loadFavoritesFromStorage(): Promise<FavoriteArticle[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteArticle[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveFavoritesToStorage(items: FavoriteArticle[]) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {
    // можно показать toast/log
  }
}
