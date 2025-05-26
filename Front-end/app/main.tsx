// app/main.tsx
import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogout = async () => {
    console.log('로그아웃 버튼 클릭됨');
    try {
      // AsyncStorage에서 토큰 삭제 (로그아웃 처리)
      await AsyncStorage.removeItem('token');
      console.log('토큰 삭제 완료');

      // 플랫폼에 따라 알림 처리
      if (Platform.OS === 'web') {
        alert('로그아웃 되었습니다.');
      } else {
        // 모바일 앱용 Alert (필요시 주석 해제)
        // Alert.alert('로그아웃', '로그아웃 되었습니다.');
      }

      // 로그인 화면으로 이동 (뒤로가기 안 되도록 replace 사용)
      router.replace('/login');
    } catch (error) {
      // 에러 발생 시 콘솔에 출력 및 알림
      console.error('Logout error:', error);
      if (Platform.OS === 'web') {
        alert('오류 발생');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* 메인 화면 텍스트 */}
      <Text>메인 화면입니다</Text>

      {/* 로그아웃 버튼 */}
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}
