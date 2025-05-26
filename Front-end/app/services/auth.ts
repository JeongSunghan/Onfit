import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.55.105:8000/api/accounts'; // ip주소 변경

export const login = async (username: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_URL}/login/`, { username, password });
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  return token;
};
