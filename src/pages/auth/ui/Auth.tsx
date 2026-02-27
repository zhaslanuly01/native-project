import { useBiometricLogin } from "@/src/features/biometric-login";
import { Page } from "@/src/shared/ui/Page";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AuthPage() {
  const { loading, error, loginWithBiometrics, loginWithoutBiometricsForDemo } =
    useBiometricLogin();

  return (
    <Page>
      <View style={styles.container}>
        <Text style={styles.title}>Добро пожаловать</Text>
        <Text style={styles.subtitle}>
          Авторизация через Face ID / Touch ID / Fingerprint
        </Text>

        <Pressable
          style={styles.primaryBtn}
          onPress={loginWithBiometrics}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryBtnText}>Войти</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.secondaryBtn}
          onPress={loginWithoutBiometricsForDemo}
          disabled={loading}
        >
          <Text style={styles.secondaryBtnText}>Демо</Text>
        </Pressable>

        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: { color: "#fff", fontWeight: "600" },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#111", fontWeight: "600" },
  error: { marginTop: 12, color: "#c00", textAlign: "center" },
});
