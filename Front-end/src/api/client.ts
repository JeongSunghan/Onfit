import axios from "axios";
import * as SecureStore from "expo-secure-store"; // 모바일 암호화 스토리지
import { Platform } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
if (!API_URL) throw new Error("EXPO_PUBLIC_API_URL is undefined");

export const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});


//요청마다 토큰 자동 부착
api.interceptors.request.use(async (config) => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("token")
      : await SecureStore.getItemAsync("token");
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});
