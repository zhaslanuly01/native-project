import { useBiometricLogin } from "@/src/features/biometric-login";
import { Page } from "@/src/shared/ui/Page";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { styles } from "./Auth.styles";

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
