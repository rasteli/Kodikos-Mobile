import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { GestureResponderEvent, Image, TouchableOpacity } from "react-native"

import { styles } from "./styles"
import { COLORS } from "../../theme"
import avatar from "../../assets/avatar.png"

const AVATAR_DEFAULT = Image.resolveAssetSource(avatar).uri

type UserPhotoProps = {
  imageUri?: string
  size?: "SMALL" | "NORMAL"
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const SIZES = {
  SMALL: {
    containerSize: 48,
    avatarSize: 42
  },

  NORMAL: {
    containerSize: 68,
    avatarSize: 62
  }
}

export function UserPhoto({
  imageUri,
  size = "NORMAL",
  onPress
}: UserPhotoProps) {
  const { containerSize, avatarSize } = SIZES[size]

  return (
    <LinearGradient
      colors={[COLORS.GRAY_SECONDARY, COLORS.BLUE_PRIMARY]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.8, y: 1 }}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2
        }
      ]}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image
          source={{ uri: imageUri || AVATAR_DEFAULT }}
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2
            }
          ]}
        />
      </TouchableOpacity>
    </LinearGradient>
  )
}
