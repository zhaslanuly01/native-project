import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerActions: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  backButtonText: {
    color: "#111",
    fontWeight: "600",
  },

  webViewWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  webview: {
    flex: 1,
  },

  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.92)",
  },

  loaderText: {
    color: "#333",
    fontSize: 14,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  errorText: {
    color: "#dc2626",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },

  url: {
    color: "#555",
    textAlign: "center",
  },
});
