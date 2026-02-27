import type { AppDispatch } from "@/src/app/providers/store";
import {
  setAuthenticated,
  setBiometricsEnabled,
  setSessionInitialized,
} from "@/src/entities/session";
import React, { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";

export function SessionBootstrap({ children }: PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [auth, biometricsEnabled] = await Promise.all([
          sessionStorage.getAuth(),
          sessionStorage.getBiometricsEnabled(),
        ]);

        if (!mounted) return;

        dispatch(setAuthenticated(auth));
        dispatch(setBiometricsEnabled(biometricsEnabled));
      } finally {
        if (mounted) dispatch(setSessionInitialized(true));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return <>{children}</>;
}
