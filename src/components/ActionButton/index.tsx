import React from "react"
import { AntDesign } from "@expo/vector-icons"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { styles } from "./styles"

export type ActionButtonProps = TouchableOpacityProps & {
  size: number
  icon: React.ComponentProps<typeof AntDesign>["name"]
}

export function ActionButton({ icon, size, ...rest }: ActionButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <AntDesign name={icon} size={size} style={styles.icon} />
    </TouchableOpacity>
  )
}
