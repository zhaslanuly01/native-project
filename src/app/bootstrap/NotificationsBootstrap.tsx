import { requestNotificationsPermission } from "@/src/shared/lib/notifications";
import React, { PropsWithChildren, useEffect } from "react";

export function NotificationsBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    let isMounted = true;

    const initNotifications = async () => {
      try {
        const ok = await requestNotificationsPermission();
        if (isMounted) {
          console.log("notifications permission granted:", ok);
        }
      } catch (e) {
        console.log("notifications permission error:", e);
      }
    };

    initNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{children}</>;
}
