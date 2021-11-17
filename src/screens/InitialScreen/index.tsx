import React from "react"

import { Login } from "../Login"
import { Dashboard } from "../Dashboard"
import { useAuth } from "../../contexts/AuthContext"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type RootStackParamList = {
  InitialScreen: undefined
  Profile: undefined
}

export type InitialScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "InitialScreen">
}

export function InitialScreen({ navigation }: InitialScreenProps) {
  const { user } = useAuth()

  return user ? <Dashboard navigation={navigation} /> : <Login />
}
