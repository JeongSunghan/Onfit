// import { useEffect } from "react";
// import { useRouter } from "expo-router";
import { Redirect } from "expo-router";

export default function Index() {
  // const router = useRouter();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     router.replace("/authorization/login");
  //   }, 100); // 0.1초 딜레이를 주어 초기 렌더링 안정화

  //   // 컴포넌트 언마운트 시 타임아웃 정리 (메모리 누수 방지)
  //   return () => clearTimeout(timeout);
  // }, [router]);

  // // 아무 UI도 렌더링하지 않음 (빈 화면)
  // return null;
  return <Redirect href="/authorization/login" />;
}
