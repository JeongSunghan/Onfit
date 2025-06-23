import { useEffect } from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  useEffect(() => {
    console.log('app/_layout.tsx 렌더링됨');
  }, []);

  return <Stack />;
}
