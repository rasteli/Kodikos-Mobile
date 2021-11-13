import React from "react"
import { View, Text } from "react-native"

import { styles } from "./styles"
import { UserPhoto } from "../UserPhoto"
import { useAuth } from "../../contexts/AuthContext"
import { InitialScreenProps } from "../../screens/InitialScreen"

export function Header({ navigation }: InitialScreenProps) {
  const { user, logOut } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KODIKOS</Text>
      <Text style={styles.logout} onPress={logOut}>
        SAIR
      </Text>
      <UserPhoto
        imageUri={user?.avatar_url}
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  )
}
