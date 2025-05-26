import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from './services/auth';

export default function LoginScreen() {
  const router = useRouter();

  // 아이디, 비밀번호 상태 변수
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    try {
      // 로그인 API 호출 후 토큰 받기
      const token = await login(username, password);

      // 성공 시 토큰을 알림창으로 보여줌
      Alert.alert('로그인 성공', `토큰: ${token}`);

      // 메인 페이지로 이동, replace 사용해서 뒤로가기 시 로그인 화면 안 나오게 함
      router.replace('/main');
    } catch (error: any) {
      // 에러 발생 시 웹 환경인지 확인 후 각각 alert 처리
      if (typeof window !== 'undefined' && window.alert) {
        window.alert('로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.');
      } else {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 아이디 입력 필드 */}
      <TextInput
        placeholder="아이디"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        autoCapitalize="none" // 자동 대문자 변환 비활성화
      />

      {/* 비밀번호 입력 필드 */}
      <TextInput
        placeholder="비밀번호"
        secureTextEntry // 입력값 숨기기(비밀번호 모드)
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* 로그인 버튼 */}
      <Button title="로그인" onPress={handleLogin} />

      {/* 회원가입 이동 버튼 */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="회원가입 하러 가기"
          onPress={() => router.push('/signup')} // /signup 경로로 이동
        />
      </View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
