import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  primaryBtn: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: { color: "#fff", fontWeight: "600" },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#111", fontWeight: "600" },
  error: { marginTop: 12, color: "#c00", textAlign: "center" },
});
