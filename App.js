import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import Onboarding from "react-native-onboarding-swiper";
import * as NavigationBar from "expo-navigation-bar";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const webViewRef = useRef(null);

  // 🧭 Enable immersive full-screen mode (Android)
  useEffect(() => {
    if (Platform.OS === "android") {
      const enableImmersiveMode = async () => {
        try {
          await NavigationBar.setBehaviorAsync("inset-swipe");
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBackgroundColorAsync("transparent");
        } catch (error) {
          console.warn("NavigationBar error:", error);
        }
      };
      enableImmersiveMode();

      const rehideTimer = setInterval(async () => {
        try {
          await NavigationBar.setVisibilityAsync("hidden");
        } catch {}
      }, 5000);

      return () => clearInterval(rehideTimer);
    }
  }, []);

  // 🕶️ Hide status bar
  useEffect(() => {
    StatusBar.setHidden(true, "fade");
    return () => StatusBar.setHidden(false, "fade");
  }, []);

  // 🧠 Check first launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await AsyncStorage.getItem("alreadyLaunched");
      if (value === null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  // 🌐 Check internet connection
  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    };
    checkConnection();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // 🔙 Handle Android hardware back button
  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true; // prevent app exit
      }
      return false; // exit app
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // 🌀 Loader while checking first launch
  if (isFirstLaunch === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // 🎬 Onboarding screens
  if (isFirstLaunch === true) {
    return (
      <Onboarding
        onSkip={() => setIsFirstLaunch(false)}
        onDone={() => setIsFirstLaunch(false)}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                source={require("./assets/illustration1.png")}
                style={styles.image}
              />
            ),
            title: "Welcome!",
            subtitle: "Discover awesome content from our website.",
          },
          {
            backgroundColor: "#f0f8ff",
            image: (
              <Image
                source={require("./assets/illustration2.png")}
                style={styles.image}
              />
            ),
            title: "Stay Connected",
            subtitle: "Access everything on the go, anytime.",
          },
          {
            backgroundColor: "#e0f7fa",
            image: (
              <Image
                source={require("./assets/illustration3.png")}
                style={styles.image}
              />
            ),
            title: "Let's Get Started",
            subtitle: "Tap Done to start exploring!",
          },
        ]}
      />
    );
  }

  // ❌ Offline screen
  if (!isConnected) {
    // Auto-exit after 3 seconds only on Android
    if (Platform.OS === "android") {
      setTimeout(() => {
        BackHandler.exitApp();
      }, 3000);
    }

    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.offlineTitle}>No Internet Connection</Text>
        <Text style={styles.text}>
          {Platform.OS === "android"
            ? "The app will close automatically."
            : "Please check your network and retry."}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const state = await NetInfo.fetch();
            setIsConnected(state.isConnected);
          }}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 🌐 Main WebView
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={styles.loader}
          />
        )}
        <WebView
          ref={webViewRef}
          source={{ uri: "https://apims-sdo.vercel.app/" }}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          originWhitelist={["*"]}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          setSupportMultipleWindows={false}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  image: { width: 250, height: 250, resizeMode: "contain" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  offlineTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginTop: 10, textAlign: "center" },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
  