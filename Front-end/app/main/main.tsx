import React from "react";
import { View, Text, Button, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { mockWeather } from "./mockup/mockWeather";
import WeatherHeader from "./component/header";
import CarouselSwiper from "./component/CarouselSwiper";

export default function Main() {
  const router = useRouter();
  const isClear = mockWeather.type === "clear";

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    if (Platform.OS === "web") alert("로그아웃 되었습니다.");
    router.replace("/authorization/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="로그아웃" onPress={handleLogout} />

      <ScrollView>
        <WeatherHeader data={mockWeather} userName="성한" />

        {/* 날씨에 따라 바뀌는 기본 텍스트 영역 */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 6 }}>
            {isClear ? "맑은 날엔 이렇게!" : "흐린 날엔‥ 멋은 은은하게"}
          </Text>
          <Text style={{ fontSize: 14, color: "#444" }}>
            {isClear
              ? "페일 데님 + 화이트 스니커즈"
              : "톤온톤 트렌치 + 미니멀 니트"}
          </Text>
        </View>
        <CarouselSwiper />
      </ScrollView>
    </View>
  );
}
