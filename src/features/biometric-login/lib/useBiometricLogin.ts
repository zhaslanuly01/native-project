import type { AppDispatch } from "@/src/app/providers/store";
import {
  selectBiometricsEnabled,
  setAuthenticated,
  setSessionInitialized,
} from "@/src/entities/session";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateWithBiometrics,
  canUseBiometrics,
} from "../model/biometric";

export function useBiometricLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const biometricsEnabled = useSelector(selectBiometricsEnabled);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithBiometrics = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!biometricsEnabled) {
        setError("Biometric authentication is disabled");
        return false;
      }

      const capability = await canUseBiometrics();

      if (!capability.available) {
        setError(
          `Biometrics unavailable (hardware: ${capability.hasHardware}, enrolled: ${capability.isEnrolled})`
        );
        return false;
      }
      const result = await authenticateWithBiometrics();

      if (result.success) {
        dispatch(setAuthenticated(true));
        await sessionStorage.saveAuth(true);
        return true;
      }

      setError("Authentication was cancelled or failed");
      return false;
    } catch (e) {
      setError("Biometric authentication failed");
      return false;
    } finally {
      setLoading(false);
      dispatch(setSessionInitialized(true));
    }
  };

  const loginWithoutBiometricsForDemo = async () => {
    dispatch(setAuthenticated(true));
    await sessionStorage.saveAuth(true);
    dispatch(setSessionInitialized(true));
  };

  return {
    loading,
    error,
    loginWithBiometrics,
    loginWithoutBiometricsForDemo,
  };
}
