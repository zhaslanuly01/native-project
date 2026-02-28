import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<{
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  edges?: Edge[];
}>;

export const Page = ({
  children,
  style,
  contentStyle,
  edges = ["left", "right", "bottom"],
}: Props) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
});
