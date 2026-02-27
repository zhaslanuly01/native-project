import * as LocalAuthentication from "expo-local-authentication";

export async function canUseBiometrics() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  return {
    hasHardware,
    isEnrolled,
    available: hasHardware && isEnrolled,
  };
}

export async function authenticateWithBiometrics() {
  return LocalAuthentication.authenticateAsync({
    promptMessage: "Войдите чтобы продолжить",
    cancelLabel: "Отменить",
    disableDeviceFallback: false,
  });
}
