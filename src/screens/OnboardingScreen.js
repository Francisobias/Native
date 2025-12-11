import React from "react";
import { Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"; // Added TouchableOpacity here!
import Onboarding from "react-native-onboarding-swiper";

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ onFinish }) {
  const pages = [
    {
      backgroundColor: "#FFFFFF",
      image: <Image source={require("../../assets/illustration1.png")} style={styles.image} resizeMode="contain" />,
      title: "Welcome to APIMS",
      subtitle: "An automated system designed to manage personnel records with accuracy and efficiency.",
    },
    {
      backgroundColor: "#FFFFFF",
      image: <Image source={require("../../assets/illustration2.png")} style={styles.image} resizeMode="contain" />,
      title: "Centralized Personnel Management",
      subtitle: "Access employee information, update records, and maintain accurate data in one secure platform.",
    },
    {
      backgroundColor: "#FFFFFF",
      image: <Image source={require("../../assets/illustration3.png")} style={styles.image} resizeMode="contain" />,
      title: "Efficient & Accessible Management",
      subtitle: "Built for both web and mobile, empowering SDO personnel with scalable, user-friendly tools to streamline record handling anytime, anywhere.",
    },
  ];

  // Custom Done button — pure "Start" text, walang fade/check animation
  const CustomDoneButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.doneButtonContainer}>
      <Text style={styles.doneButtonText}>Start</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      pages={pages}
      onSkip={onFinish}
      onDone={onFinish}
      showSkipButton={true}
      showNextButton={true}
      showDoneButton={true}
      skipLabel={<Text style={styles.buttonText}>Skip</Text>}
      nextLabel={<Text style={styles.buttonText}>Next</Text>}
      DoneButtonComponent={CustomDoneButton}  // Custom na instant
      bottomBarHighlight={false}
      bottomBarHeight={90}
      transitionDuration={0}                  // No page fade
      pageIndicatorTransitionDelay={0}        // No dot delay
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      allowFontScaling={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    paddingTop: 60,
    marginBottom: 40,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  doneButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#dddddd",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#333333",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});