import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  actionsWrap: {
    marginBottom: 12,
  },

  actionsRow: {
    gap: 8,
    paddingHorizontal: 0,
  },

  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  errorText: {
    color: "#dc2626",
    marginTop: 6,
    fontSize: 13,
  },
});
