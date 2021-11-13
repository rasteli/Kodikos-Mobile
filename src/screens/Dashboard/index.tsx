import React from "react"
import { View } from "react-native"
import { Header } from "../../components/Header"
import { PasswordForm } from "../../components/PasswordForm"

import { styles } from "./styles"
import { InitialScreenProps } from "../InitialScreen"

export function Dashboard({ navigation }: InitialScreenProps) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <PasswordForm />
    </View>
  )
}
