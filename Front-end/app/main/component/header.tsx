import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherData } from "../type/weather";

interface Props {
  data: WeatherData;
  userName: string;
}

const WeatherHeader = ({ data, userName }: Props) => {
  const isClear = data.type === "clear";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        오늘은 {isClear ? "맑아요" : "흐려요"} {userName} 님!
      </Text>
      <Text style={styles.temp}>{data.temperature}°C</Text>
      <Text style={styles.info}>
        습도: {data.humidity}% 바람: {data.wind}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  greeting: { fontSize: 18, fontWeight: "600" },
  temp: { fontSize: 24, fontWeight: "bold", marginVertical: 4 },
  info: { fontSize: 14, color: "#666" },
});

export default WeatherHeader;
