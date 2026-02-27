import { RootNavigator, StoreProvider } from "@/src/app";
import React from "react";

export default function App() {
  return (
    <StoreProvider>
      <RootNavigator />
    </StoreProvider>
  );
}
