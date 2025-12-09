import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  StatusBar,
  BackHandler,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as NavigationBar from "expo-navigation-bar";

import OnboardingScreen from "./screens/OnboardingScreen";
import WebViewScreen from "./components/WebViewScreen";
import OfflineScreen from "./components/OfflineScreen";
import Loader from "./components/Loader";

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const webViewRef = useRef(null);

  // First launch check
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  // Internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  }, []);

  // Android immersive mode + hide status bar
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("inset-swipe");
      const timer = setInterval(() => NavigationBar.setVisibilityAsync("hidden"), 5000);
      return () => clearInterval(timer);
    }
    StatusBar.setHidden(true);
  }, []);

  // Back button handling
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (isFirstLaunch) return <OnboardingScreen onFinish={() => setIsFirstLaunch(false)} />;
  if (!isConnected) return <OfflineScreen onRetry={async () => setIsConnected((await NetInfo.fetch()).isConnected)} />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <WebViewScreen ref={webViewRef} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}