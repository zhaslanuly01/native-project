import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  chipsRow: {
    gap: 8,
    paddingRight: 12,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  chipActive: {
    backgroundColor: "#111",
    borderColor: "#111",
  },

  chipText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },

  chipTextActive: {
    color: "#fff",
  },
});
