import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 100);  // 100ms 정도 딜레이

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
