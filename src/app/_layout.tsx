import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack } from "expo-router";
import * as SplashScrreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../../global.css';

SplashScrreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded,error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScrreen.hideAsync();
    }
  },[loaded,error]);

  if (!loaded && !error) return null;
  return(
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{headerShown:false, contentStyle:{backgroundColor: '#F7F6F2'}}} />
    </>
  );
}
