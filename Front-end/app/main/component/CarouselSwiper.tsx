import React, { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import { mainFitData } from "../mockup/mockMainFit";

const { width } = Dimensions.get("window");

export default function CarouselSwiper() {  
  const scrollX = useRef(new Animated.Value(0)).current;
  const positionIndex = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe Right
          positionIndex.current =
            (positionIndex.current - 1 + mainFitData.length) %
            mainFitData.length;
        } else if (gestureState.dx < -50) {
          // Swipe Left
          positionIndex.current =
            (positionIndex.current + 1) % mainFitData.length;
        }
        setActiveIndex(positionIndex.current);

        Animated.spring(scrollX, {
          toValue: positionIndex.current,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  // UI
  return (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      {mainFitData.map((item, index) => {
        const inputRange = [index - 1, index, index + 1];
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [width, 0, -width],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.imageContainer,
              {
                transform: [{ translateX }],
                opacity,
              },
            ]}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.badge}>
              {index === activeIndex && (
                <Text style={styles.badgeText}>오늘의 Fit</Text>
              )}
            </View>
            {index === activeIndex && (
              <View style={styles.textBox}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width,
    height: 600,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  imageContainer: {
    width: width * 0.74,
    height: 520,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    resizeMode: "cover",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    paddingTop: 2,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#47c9c4",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },
  textBox: {
    width: "100%",
    paddingHorizontal: 8,
  },
});
