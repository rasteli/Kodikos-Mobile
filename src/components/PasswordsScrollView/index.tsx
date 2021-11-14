import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import Checkbox from "react-native-bouncy-checkbox"

import { styles } from "./styles"
import { COLORS } from "../../theme"
import { CustomInput } from "../../components/CustomInput"
import { copyToClipboard } from "../../utils/copy-to-clipboard"
import { usePassword } from "../../contexts/PasswordContext"

type PasswordScrollViewProps = {
  deleteMode: boolean
}

export function PasswordsScrollView({ deleteMode }: PasswordScrollViewProps) {
  const [label, setLabel] = useState("")

  const {
    userPasswords,
    methods: { setPasswordsToDelete, updatePassword }
  } = usePassword()

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      {userPasswords.map((password, index) => (
        <View
          key={password.id}
          style={[styles.password, { marginBottom: deleteMode ? 50 : 20 }]}
        >
          <CustomInput
            backgroundColor={COLORS.BLACK}
            size={24}
            label="RÓTULO"
            icon="save"
            value={password.label}
            onChangeText={text => setLabel(text)}
            onPress={() => updatePassword(label, password.id)}
          />
          <CustomInput
            backgroundColor={COLORS.BLACK}
            size={24}
            label="SENHA"
            icon="copy1"
            editable={false}
            value={password.value}
            onPress={() => copyToClipboard(password.value)}
          />

          {deleteMode && (
            <Checkbox
              style={styles.checkbox}
              fillColor={COLORS.BLUE_PRIMARY}
              onPress={checked => setPasswordsToDelete(index, checked)}
            />
          )}
        </View>
      ))}
    </ScrollView>
  )
}
