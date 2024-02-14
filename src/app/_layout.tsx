import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

import { useColorScheme } from "@/src/components/useColorScheme"
import AuthProvider, { useAuthContext } from "../providers/authProvider"
import { CartProvider } from "../providers/cartProvider"

export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary
} from "expo-router"

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   // initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
   return (
      <AuthProvider>
         <RootLayoutNav />
      </AuthProvider>
   )
}

function RootLayoutNav() {
   const colorScheme = useColorScheme()
   const { loading } = useAuthContext()
   const [loaded, error] = useFonts({
      SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
      ...FontAwesome.font,
   })

   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   useEffect(() => {
      if (error) throw error
   }, [error])

   useEffect(() => {
      if (loaded && !loading) {
         SplashScreen.hideAsync()
      }
   }, [loaded, loading])

   if (!loaded) {
      return null
   }

   return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <CartProvider>
            <Stack>
               <Stack.Screen name="index" options={{ title: "Home" }} />
               <Stack.Screen name="(admin)" options={{ headerShown: false }} />
               <Stack.Screen name="(user)" options={{ headerShown: false }} />
               <Stack.Screen name="(auth)" options={{ headerShown: false }} />
               <Stack.Screen name="cart" options={{ presentation: "modal" }} />
            </Stack>
         </CartProvider>
      </ThemeProvider>
   )
}
