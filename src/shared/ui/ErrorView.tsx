import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  message?: string;
};

export const ErrorView = ({ message = "Something went wrong" }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ошибка</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
