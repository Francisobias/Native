import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ onFinish }) {
  const pages = [
    {
      backgroundColor: "#fff",
      image: (
        <Image
          source={require("../../assets/illustration1.png")}
          style={styles.image}
        />
      ),
      title: "Welcome to APIMS!",
      subtitle: "Access your school portal anytime, anywhere.",
    },
    {
      backgroundColor: "#f8faff",
      image: (
        <Image
          source={require("../../assets/illustration2.png")}
          style={styles.image}
        />
      ),
      title: "Fast & Secure",
      subtitle: "Built with love for students, teachers, and parents.",
    },
    {
      backgroundColor: "#e3f2fd",
      image: (
        <Image
          source={require("../../assets/illustration3.png")}
          style={styles.image}
        />
      ),
      title: "Ready to Explore?",
      subtitle: "Tap Done and start using the app!",
    },
  ];

  return (
    <Onboarding
      pages={pages}
      onSkip={onFinish}
      onDone={onFinish}
      showSkipButton={true}
      skipLabel="Skip"
      nextLabel="Next"
      doneLabel="Done"
      // Optional: Custom button styles (maganda ‘to!)
      nextButtonProps={{ style: styles.button }}
      skipButtonProps={{ style: styles.button }}
      doneButtonProps={{ style: styles.button }}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});