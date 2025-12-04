import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";

export default function OnboardingScreen({ onDone }) {
  return (
    <Onboarding
      onSkip={onDone}
      onDone={onDone}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("./assets/illustration1.png")} style={{ width: 250, height: 250 }} />,
          title: "Welcome!",
          subtitle: "Explore our app with ease and comfort.",
        },
        {
          backgroundColor: "#f7f7f7",
          image: <Image source={require("./assets/illustration2.png")} style={{ width: 250, height: 250 }} />,
          title: "Stay Updated",
          subtitle: "Get real-time information from our website.",
        },
        {
          backgroundColor: "#e0f7fa",
          image: <Image source={require("./assets/illustration3.png")} style={{ width: 250, height: 250 }} />,
          title: "Let’s Get Started",
          subtitle: "Tap Done to begin using the app.",
        },
      ]}
    />
  );
}
