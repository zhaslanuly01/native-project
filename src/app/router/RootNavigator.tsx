import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";

import {
  selectIsAuthenticated,
  selectSessionInitialized,
} from "@/src/entities/session";
import { AuthPage } from "@/src/pages/auth";
import { NewsDetailsPage } from "@/src/pages/news-details";
import { Loader } from "@/src/shared/ui/Loader";
import { RootTabs } from "./RootTabs";

type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  NewsDetails: { articleUrl: string; title?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialized = useSelector(selectSessionInitialized);

  if (!initialized) return <Loader />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthPage}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="MainTabs"
              component={RootTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewsDetails"
              component={NewsDetailsPage}
              options={{ title: "Детали" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
