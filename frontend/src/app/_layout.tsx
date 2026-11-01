import { Kablammo_400Regular, useFonts } from '@expo-google-fonts/kablammo';
import { Stack } from "expo-router";
import "../../global.css";
import { AuthProvider } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from "react-native";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Kablammo: Kablammo_400Regular,
  })
  if (!fontsLoaded) return null;

  return <SafeAreaProvider>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Hem" }} />
        <Stack.Screen name="account" options={{ title: "Konto" }} />
        <Stack.Screen name="game" options={{ title: "Spela" }} />
        <Stack.Screen name="login" options={{ title: "Logga in", presentation: Platform.select({ ios: "modal", android: "formSheet" }) }} />
        <Stack.Screen name="register" options={{ title: "Skapa konto", presentation: Platform.select({ ios: "modal", android: "formSheet" }) }} />
      </ Stack>
    </AuthProvider>
  </SafeAreaProvider>
}
