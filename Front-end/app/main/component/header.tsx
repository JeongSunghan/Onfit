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
      <View style={styles.row}>
        <Text style={styles.hello}>
          안녕하세요 <Text style={styles.accent}>{userName}</Text> 님
        </Text>
        {/* 햄버거 아이콘 등 우측 유틸은 필요 시 여기에 */}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          오늘은 <Text style={styles.bold}>{isClear ? "맑은" : "흐린"}</Text> 날이에요. 😎
        </Text>

        <View style={styles.weatherRow}>
          <View style={styles.colorBar} />
          <View>
            <Text style={styles.temp}>{data.temperature}°C</Text>
            <Text style={styles.sub}>
              습도 {data.humidity}% ‧ 바람 {data.wind}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: { paddingHorizontal: 24, paddingTop: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  hello: { fontSize: 18, fontWeight: "500", color: "#444" },
  accent: { color: "#47c9c4", fontWeight: "700" },
  
  card: {
    marginTop: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.35)",    
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: { fontSize: 17, fontWeight: "600", marginBottom: 12, color: "#222" },
  bold: { fontWeight: "700" },

  weatherRow: { flexDirection: "row", alignItems: "center" },
  colorBar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#FFA7A7",
    marginRight: 14,
  },
  temp: { fontSize: 28, fontWeight: "700", color: "#111" },
  sub: { fontSize: 13, color: "#666", marginTop: 4 },
});

export default WeatherHeader;
