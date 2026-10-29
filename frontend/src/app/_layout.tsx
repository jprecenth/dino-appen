import { Kablammo_400Regular, useFonts } from '@expo-google-fonts/kablammo';
import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Kablammo: Kablammo_400Regular,
  })

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" options={{ title: "Hem" }} />
    <Stack.Screen name="account" options={{ title: "Konto" }} />
    <Stack.Screen name="game" options={{ title: "Spela" }} />
    <Stack.Screen name="login" options={{ title: "Logga in", presentation: "formSheet" }} />
    <Stack.Screen name="register" options={{ title: "Skapa konto", presentation: "formSheet" }} />
  </ Stack>;
}
