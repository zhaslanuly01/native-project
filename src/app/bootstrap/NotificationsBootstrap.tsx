import { requestNotificationsPermission } from "@/src/shared/lib/notifications";
import React, { PropsWithChildren, useEffect } from "react";

export function NotificationsBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    let isMounted = true;

    const initNotifications = async () => {
      await requestNotificationsPermission();
    };

    initNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{children}</>;
}
