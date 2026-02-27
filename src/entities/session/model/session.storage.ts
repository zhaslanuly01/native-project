import * as SecureStore from "expo-secure-store";

const KEYS = {
  AUTH: "session:isAuthenticated",
  BIOMETRICS_ENABLED: "session:biometricsEnabled",
};

export const sessionStorage = {
  async saveAuth(value: boolean) {
    await SecureStore.setItemAsync(KEYS.AUTH, String(value));
  },

  async getAuth() {
    const value = await SecureStore.getItemAsync(KEYS.AUTH);
    return value === "true";
  },

  async saveBiometricsEnabled(value: boolean) {
    await SecureStore.setItemAsync(KEYS.BIOMETRICS_ENABLED, String(value));
  },

  async getBiometricsEnabled() {
    const value = await SecureStore.getItemAsync(KEYS.BIOMETRICS_ENABLED);
    if (value == null) return true;
    return value === "true";
  },

  async clearSession() {
    await SecureStore.deleteItemAsync(KEYS.AUTH);
  },
};
