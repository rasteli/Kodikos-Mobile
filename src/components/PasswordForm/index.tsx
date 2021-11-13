import React, { useState } from "react"
import Slider from "@react-native-community/slider"
import { View, Text, TextInput, Switch } from "react-native"

import { styles } from "./styles"
import { Button } from "../Button"
import { COLORS } from "../../theme"
import { CustomInput } from "../CustomInput"
import { copyToClipboard } from "../../utils/copy-to-clipboard"
import { usePassword, SwitchPasswordProp } from "../../contexts/PasswordContext"

export function PasswordForm() {
  const {
    password,
    methods: { setPasswordProps, generatePassword, setPwdLength }
  } = usePassword()

  const [switches, setSwitches] = useState<SwitchPasswordProp[]>([
    { label: "CAIXA ALTA", value: false },
    { label: "CAIXA BAIXA", value: false },
    { label: "SÍMBOLOS", value: false },
    { label: "NÚMEROS", value: false }
  ])

  function toggleSwitch(index: number) {
    const options = [...switches]
    const option = options[index]

    option.value = !option.value

    setSwitches(options)
    setPasswordProps(option)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerar senha</Text>
      <CustomInput
        backgroundColor={COLORS.BLACK}
        label="SENHA GERADA"
        icon="copy1"
        size={24}
        editable={false}
        value={password?.value}
        onPress={() => copyToClipboard(password?.value)}
      />

      <View style={{ marginTop: 30 }}>
        <Text style={styles.label}>QUANTIDADE DE CARACTERES</Text>
        <Slider
          style={{ width: "100%", marginTop: 10 }}
          minimumValue={8}
          maximumValue={61}
          minimumTrackTintColor={COLORS.BLUE_QUINQUENARY}
          maximumTrackTintColor={COLORS.GRAY_PRIMARY}
          thumbTintColor={COLORS.BLUE_QUINQUENARY}
          onValueChange={value => setPwdLength(value)}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 65 }}>
        {switches.map((option, index) => (
          <View key={index} style={styles.switches}>
            <Switch
              key={index}
              trackColor={{
                false: COLORS.GRAY_PRIMARY,
                true: COLORS.BLUE_QUINQUENARY
              }}
              thumbColor={
                option.value ? COLORS.BLUE_QUATERNARY : COLORS.GRAY_SECONDARY
              }
              onValueChange={() => toggleSwitch(index)}
              value={option.value}
            />
            <Text style={styles.label}>{option.label}</Text>
          </View>
        ))}
      </View>

      <Button
        title="GERAR SENHA"
        backgroundColor={COLORS.BLUE_SECONDARY}
        color={COLORS.GRAY_SECONDARY}
        onPress={generatePassword}
      />
    </View>
  )
}
