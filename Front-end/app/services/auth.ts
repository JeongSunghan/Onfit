import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const login = async (username: string, password: string): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/login/`, { username, password });
  await AsyncStorage.setItem('token', data.token);
  return data.token;
};

export const signup = async (username: string, password: string): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/signup/`, { username, password });
  await AsyncStorage.setItem('token', data.token);
  return data.token;
};
