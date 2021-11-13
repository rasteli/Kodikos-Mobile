import React from "react"

import AppLoading from "expo-app-loading"
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto"

import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { COLORS } from "./src/theme"
import { Profile } from "./src/screens/Profile"
import { AuthProvider } from "./src/contexts/AuthContext"
import { InitialScreen } from "./src/screens/InitialScreen"
import { PasswordProvider } from "./src/contexts/PasswordContext"

const Stack = createNativeStackNavigator()

export default function App() {
  const [loadedFonts] = useFonts({ Roboto_400Regular })

  if (!loadedFonts) return <AppLoading />

  return (
    <NavigationContainer>
      <AuthProvider>
        <PasswordProvider>
          <StatusBar backgroundColor="transparent" style="light" translucent />

          <Stack.Navigator initialRouteName="InitialScreen">
            <Stack.Screen
              options={{ headerShown: false }}
              name="InitialScreen"
              component={InitialScreen}
            />
            <Stack.Screen
              options={{
                headerTransparent: true,
                headerShadowVisible: false,
                headerTitle: "Perfil",
                headerTintColor: COLORS.BLUE_QUATERNARY
              }}
              name="Profile"
              component={Profile}
            />
          </Stack.Navigator>
        </PasswordProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
