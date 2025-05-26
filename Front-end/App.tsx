import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      console.log('현재 navigation 상태: ', navigationRef.getRootState());
    });
    return unsubscribe;
  }, [navigationRef]);
}
