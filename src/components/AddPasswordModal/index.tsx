import React, { useState } from "react"
import { View } from "react-native"
import ReactNativeModal from "react-native-modal"

import { styles } from "./styles"
import { COLORS } from "../../theme"

import { Button } from "../Button"
import { CustomInput } from "../CustomInput"
import { usePassword } from "../../contexts/PasswordContext"

type AddPasswordModalProps = {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export function Modal({
  isModalVisible,
  setIsModalVisible
}: AddPasswordModalProps) {
  const {
    methods: { createPassword }
  } = usePassword()

  const [label, setLabel] = useState("")
  const [value, setValue] = useState("")

  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      swipeDirection={"down"}
      style={styles.container}
      onSwipeComplete={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContent}>
        <CustomInput
          backgroundColor={COLORS.BLUE_SEXTIARY}
          size={24}
          label="RÓTULO"
          icon="rocket1"
          onChangeText={text => setLabel(text)}
        />
        <CustomInput
          backgroundColor={COLORS.BLUE_SEXTIARY}
          size={24}
          label="SENHA"
          icon="rocket1"
          onChangeText={text => setValue(text)}
        />

        <Button
          title="SALVAR SENHA"
          color={COLORS.GRAY_SECONDARY}
          backgroundColor={COLORS.BLUE_QUINQUENARY}
          onPress={() => createPassword(label, value)}
        />
      </View>
    </ReactNativeModal>
  )
}
