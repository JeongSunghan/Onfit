import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "../../src/services/auth";
import { showAlert } from "@/src/utils/alert";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      showAlert("로그인 성공", "메인으로 이동합니다.");
      router.replace("/main/main");
    } catch (e: any) {
      const msg = e.response?.data?.error ?? "알 수 없는 오류가 발생했습니다.";
      showAlert("로그인 실패", msg);
    }
  };

  return (
    // 현재 에셋(onFit 로고, 카카오, 구글 등등 준비가 안되어 있어 텍스트/이모지로 대체했습니다.)
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>on fit</Text>
        <Text style={styles.logoTagline}>내 삶의 온도에 맞춘 핏을 입다</Text>
      </View>

      {/* 아이디/비번 파트 */}
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

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setKeepLogin(!keepLogin)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, keepLogin && styles.checkboxChecked]}>
          {keepLogin && <View style={styles.checkboxDot} />}
        </View>
        <Text style={styles.checkboxLabel}>로그인상태 유지</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkText}>아이디/비밀번호 찾기</Text>
        <Text style={styles.linkDivider}>|</Text>
        <TouchableOpacity onPress={() => router.push("/authorization/signup")}>
          <Text style={styles.linkText}>이메일로 회원가입</Text>
        </TouchableOpacity>
      </View>

      {/* 소셜 로그인 */}
      <TouchableOpacity style={[styles.socialBtn, styles.kakaoBtn]}>
        <Text style={styles.socialIcon}>💬</Text>
        <Text style={styles.kakaoText}>카카오로 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialIcon}>🌐</Text>
        <Text style={styles.socialText}>구글아이디 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialIcon}></Text>
        <Text style={styles.socialText}>Apple로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일shit - 추후 컴포넌트로 분리 예정, 급한관계로 login 하단에 생성했습니다ㅠ
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#595959",
    borderRadius: 11,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#272727",
    borderColor: "#272727",
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#3d3d3d",
  },
  loginBtn: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#009f9d",
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  loginBtnText: {
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
  linkDivider: {
    color: "#c4c4c4",
    fontSize: 13,
    marginHorizontal: 4,
  },
  socialBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dadada",
    marginBottom: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  kakaoBtn: {
    backgroundColor: "#fee500",
    borderColor: "#fee500",
    marginTop: 4,
  },
  kakaoText: {
    color: "#191600",
    fontSize: 16,
    fontWeight: "500",
  },
  socialText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
});
