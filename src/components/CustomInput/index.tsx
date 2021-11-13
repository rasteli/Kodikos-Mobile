import React from "react"
import { Text, TextInput, View, ColorValue } from "react-native"

import { styles } from "./styles"
import { ActionButton, ActionButtonProps } from "../ActionButton"

type CustomInputProps = ActionButtonProps & {
  label: string
  value?: string
  editable?: boolean
  hasButton?: boolean
  backgroundColor: ColorValue
  onChangeText?: ((text: string) => void) | undefined
}

export function CustomInput({
  label,
  icon,
  size,
  value,
  editable = true,
  backgroundColor,
  onChangeText,
  ...rest
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.labelBG, { backgroundColor }]}>{label}</Text>
      <TextInput
        style={styles.input}
        editable={editable}
        defaultValue={value}
        onChangeText={onChangeText}
      />
      <ActionButton size={size} icon={icon} style={styles.button} {...rest} />
    </View>
  )
}
