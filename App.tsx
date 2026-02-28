import { StoreProvider } from "@/src/app/providers/StoreProvider";
import RootNavigator from "@/src/app/router/RootNavigator";
import React from "react";
import { NotificationsBootstrap, SessionBootstrap } from "./src/app";

export default function App() {
  return (
    <StoreProvider>
      <SessionBootstrap>
        <NotificationsBootstrap>
          <RootNavigator />
        </NotificationsBootstrap>
      </SessionBootstrap>
    </StoreProvider>
  );
}
