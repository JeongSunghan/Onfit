import { api } from '../api/client';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type AuthResponse = { token: string };

function saveToken(token: string) {
  return Platform.OS === 'web'
    ? localStorage.setItem('token', token)
    : SecureStore.setItemAsync('token', token);
}

export async function login(username: string, password: string) {
  try {
    const { data } = await api.post<AuthResponse>('/login/', {
      username,
      password,
    });
    await saveToken(data.token);
    return data.token;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error ?? '로그인 요청 실패(네트워크)'
    );
  }  
}

// signup 함수에서 passwordError 제거, location 문자열 인자 추가
export async function signup(username: string, password: string, location: string) {
  try {
    const { data } = await api.post<AuthResponse>('/signup/', {
      username,
      password,
      location,
    });
    await saveToken(data.token);
    return data.token;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error ?? '회원가입 요청 실패(네트워크)'
    );
  }
}
