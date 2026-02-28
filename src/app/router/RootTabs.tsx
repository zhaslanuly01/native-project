import { FavoritesPage } from "@/src/pages/favorites";
import { NewsListPage } from "@/src/pages/news-list";
import { RootTabParamList } from "@/src/shared/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          if (route.name === "NewsList") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else {
            iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
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
