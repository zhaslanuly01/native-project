import { NewsDetailsPage } from "@/src/pages/news-details";
import { RootStackParamList } from "@/src/shared/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootTabs } from "./RootTabs";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RootTabs"
          component={RootTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsPage}
          options={{ title: "Article" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
