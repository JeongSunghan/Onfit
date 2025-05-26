import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from './services/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const token = await login(username, password);
    Alert.alert('로그인 성공', `토큰: ${token}`);
    router.replace('/main');
  } catch (error: any) {
  if (typeof window !== 'undefined' && window.alert) {
    window.alert('로그인 실패: ' + ('아이디 또는 비밀번호가 틀렸습니다.'));
  } else {
    Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
  }
}
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="아이디"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        autoCapitalize="none"
      />
      <Button title="로그인" onPress={handleLogin} />
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
