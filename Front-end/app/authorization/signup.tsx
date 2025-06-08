import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { signup } from "../../src/services/auth";
import { showAlert } from "@/src/utils/alert";

export default function SignupScreen() {
  const router = useRouter();

  // 가입 상태 변수
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async () => {
    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setPasswordError("");

    try {
      // 회원가입 API 호출 후 토큰 받기
      const token = await signup(username, password, passwordError);
      showAlert("회원가입 성공", "로그인 화면으로 이동합니다.");
      router.replace("/authorization/login");
    } catch (e: any) {
      const msg = e.response?.data?.error || "알 수 없는 오류가 발생했습니다.";
      showAlert("회원가입에 실패했습니다.", msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>on fit</Text>
        <Text style={styles.logoTagline}>내 삶의 온도에 맞춘 핏을 입다</Text>
      </View>

      <TextInput
        placeholder="이메일 혹은 아이디"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#b0b0b0"
      />

      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#b0b0b0"
      />

      <TextInput
        placeholder="비밀번호 확인"
        secureTextEntry
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (text !== password) {
            setPasswordError("비밀번호가 일치하지 않습니다.");
          } else {
            setPasswordError("");
          }
        }}
        value={confirmPassword}
        style={[styles.input, passwordError ? styles.inputError : null]}
        autoCapitalize="none"
        placeholderTextColor="#b0b0b0"
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.signupBtn,
          passwordError ? styles.signupBtnDisabled : null,
        ]}
        onPress={handleSignup}
        disabled={!!passwordError}
      >
        <Text style={styles.signupBtnText}>회원가입</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkText}>이미 계정이 있으신가요?</Text>
        <TouchableOpacity onPress={() => router.push("/authorization/login")}>
          <Text style={styles.linkText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 스타일시트 - 추후 따로 관리 예정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  logoBox: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#009f9d",
    letterSpacing: 2,
  },
  logoTagline: {
    marginTop: 8,
    fontSize: 16,
    color: "#009f9d",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderRadius: 6,
    marginBottom: 14,
    backgroundColor: "#fafafa",
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  signupBtn: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#009f9d",
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  signupBtnDisabled: {
    backgroundColor: "#cccccc",
  },
  signupBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  linkText: {
    fontSize: 13,
    color: "#868686",
    marginHorizontal: 4,
  },
});
