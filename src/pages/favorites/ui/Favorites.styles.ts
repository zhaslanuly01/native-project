import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 8,
  },
  logoutText: {
    color: "#dc2626",
    fontWeight: "700",
  },

  uploadCardWrap: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },

  listContent: {
    padding: 12,
    gap: 12,
    flexGrow: 1,
  },

  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
  },
});
