// app/main.tsx
import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();

  const handleLogout = async () => {
    console.log('로그아웃 버튼 클릭됨');
    try {
      await AsyncStorage.removeItem('token');
      console.log('토큰 삭제 완료');

      if (Platform.OS === 'web') {
        alert('로그아웃 되었습니다.');
      } else {
        // 모바일에서는 원래 Alert.alert 써도 됨
        // Alert.alert('로그아웃', '로그아웃 되었습니다.');
      }

      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      if (Platform.OS === 'web') {
        alert('오류 발생');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>메인 화면입니다</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}
