import React from "react"
import { View, Text } from "react-native"

import { styles } from "./styles"
import { COLORS } from "../../theme"
import { Button } from "../../components/Button"

import RocketSvg from "../../assets/rocket.svg"
import OuterSpace from "../../assets/outer_space.svg"

import { useAuth } from "../../contexts/AuthContext"

export function Login() {
  const { signIn, isLogginIn } = useAuth()

  return (
    <View style={styles.container}>
      <OuterSpace />
      <RocketSvg style={styles.rocket} />

      <View style={styles.kodikos}>
        <Text style={styles.title}>KODIKOS</Text>
        <Text style={styles.description}>Crie e gerencie suas senhas</Text>

        <Button
          title="ENTRAR COM GITHUB"
          backgroundColor={COLORS.BLUE_TERTIARY}
          color={COLORS.GRAY_SECONDARY}
          icon="github"
          disabled={isLogginIn}
          onPress={signIn}
        />
      </View>
    </View>
  )
}
