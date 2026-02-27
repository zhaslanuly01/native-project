import React, { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  style?: ViewStyle;
}>;

export const Page = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
