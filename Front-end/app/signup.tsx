import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signup } from './services/auth';

export default function SignupScreen() {
  const router = useRouter();

  // 회원가입 아이디, 비밀번호 상태 변수
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async () => {
    try {
      // 회원가입 API 호출 후 토큰 받기
      const token = await signup(username, password);

      // 회원가입 성공 시 알림창 띄우기 (웹/네이티브 모두 지원)
      if (typeof window !== 'undefined' && window.alert) {
        window.alert('회원가입 성공!');
      } else {
        Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
      }

      // 로그인 화면으로 이동 (뒤로가기 시 회원가입 화면 안 보이도록 replace 사용)
      router.replace('/login');
    } catch (error: any) {
      // 실패 시 서버에서 보내는 에러 메시지 보여줌
      const message = error.response?.data?.error || '알 수 없는 오류가 발생했습니다.';
      if (typeof window !== 'undefined' && window.alert) {
        window.alert('회원가입 실패: ' + message);
      } else {
        Alert.alert('회원가입 실패', message);
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
      {/* 회원가입 버튼 */}
      <Button title="회원가입" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10, 
    marginBottom: 10,
    borderRadius: 5, 
  },
});
