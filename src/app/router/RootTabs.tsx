import { FavoritesPage } from "@/src/pages/favorites";
import { NewsListPage } from "@/src/pages/news-list";
import { RootTabParamList } from "@/src/shared/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="NewsList"
        component={NewsListPage}
        options={{ title: "Новости" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesPage}
        options={{ title: "Избранные" }}
      />
    </Tab.Navigator>
  );
}
