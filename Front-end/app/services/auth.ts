import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Django 백엔드 API 기본 URL (로컬 네트워크 IP 주소 사용, 상황에 맞게 변경 필요)
const API_URL = 'http://192.168.55.105:8000/api/accounts';

/**
 * 로그인 API 호출 함수
 * @param username - 사용자 아이디
 * @param password - 사용자 비밀번호
 * @returns 로그인 성공 시 서버에서 받은 토큰 문자열 반환
 */
export const login = async (username: string, password: string): Promise<string> => {
  // 백엔드 /login/ 엔드포인트에 POST 요청
  const response = await axios.post(`${API_URL}/login/`, { username, password });

  // 응답에서 토큰 추출
  const token = response.data.token;

  // AsyncStorage에 토큰 저장 (앱 내 인증 상태 유지용)
  await AsyncStorage.setItem('token', token);

  // 토큰 반환
  return token;
};

/**
 * 회원가입 API 호출 함수
 * @param username - 새 사용자 아이디
 * @param password - 새 사용자 비밀번호
 * @returns 회원가입 성공 시 서버에서 받은 토큰 문자열 반환
 */
export const signup = async (username: string, password: string): Promise<string> => {
  // 백엔드 /signup/ 엔드포인트에 POST 요청
  const response = await axios.post(`${API_URL}/signup/`, { username, password });

  // 응답에서 토큰 추출
  const token = response.data.token;

  // AsyncStorage에 토큰 저장 (회원가입 후 자동 로그인 상태 유지용)
  await AsyncStorage.setItem('token', token);

  // 토큰 반환
  return token;
};
