import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 8,
    backgroundColor: "#f7f7f7",
  },

  scrollContent: {
    padding: 12,
    paddingBottom: 24,
    backgroundColor: "#f7f7f7",
    gap: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  actionButtonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#e9ecef",
    borderRadius: 10,
  },
  actionButtonSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  actionButtonPrimary: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#111827",
    borderRadius: 10,
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  coverImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
    color: "#111",
  },

  metaBlock: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#555",
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#333",
  },

  openWebButton: {
    marginTop: 4,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  openWebButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },

  webViewWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },

  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    gap: 8,
  },
  loaderText: {
    fontSize: 14,
    color: "#444",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#c0392b",
    textAlign: "center",
    marginBottom: 8,
  },
  url: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
