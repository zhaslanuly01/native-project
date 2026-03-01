import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  description: {
    color: "#555",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  openButton: {
    backgroundColor: "#2563eb",
  },

  removeButton: {
    backgroundColor: "#dc2626",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
