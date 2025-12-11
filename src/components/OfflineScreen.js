// components/OfflineScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  BackHandler,
  Modal,
} from "react-native";

export default function OfflineScreen({ onRetry }) {
  // Auto-close sa Android after 6 seconds
  useEffect(() => {
    if (Platform.OS === "android") {
      const timer = setTimeout(() => {
        BackHandler.exitApp();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.message}>
            {Platform.OS === "android"
              ? "Please check your connection.\nThe app will close in a few seconds."
              : "Please connect to the internet and try again."}
          </Text>
          <TouchableOpacity style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent dark overlay
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#ffffff",
    width: "85%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#333333",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});