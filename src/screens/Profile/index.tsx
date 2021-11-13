import React, { useState } from "react"
import Checkbox from "react-native-bouncy-checkbox"
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native"

import { styles } from "./styles"
import { useAuth } from "../../contexts/AuthContext"
import { Modal } from "../../components/AddPasswordModal"
import { CustomInput } from "../../components/CustomInput"
import { ActionButton } from "../../components/ActionButton"
import { usePassword } from "../../contexts/PasswordContext"

import { COLORS } from "../../theme"
import Astronaut from "../../assets/astronaut.svg"
import { copyToClipboard } from "../../utils/copy-to-clipboard"

export function Profile() {
  const { user } = useAuth()

  const {
    userPasswords,
    methods: {
      deletePassword,
      setPasswordsToDelete,
      setPasswords,
      updatePassword
    }
  } = usePassword()

  const [label, setLabel] = useState("")
  const [deleteMode, setDeleteMode] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleFirstButtonClick() {
    if (deleteMode) {
      deletePassword()
      setDeleteMode(false)
    } else setIsModalVisible(true)
  }

  function handleSecondButtonClick() {
    if (deleteMode) {
      setDeleteMode(false)
      setPasswords([])
    } else setDeleteMode(true)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={Platform.OS === "ios"}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={{ marginLeft: 15, marginBottom: 15 }}>
        <Text style={styles.headingOne}>Olá, {user?.name}</Text>
        <Text style={styles.headingTwo}>Aqui estão todas as suas senhas</Text>

        <View style={styles.actionButtons}>
          <ActionButton
            size={35}
            style={styles.actionButton}
            icon={deleteMode ? "check" : "plus"}
            onPress={handleFirstButtonClick}
          />
          <ActionButton
            size={35}
            style={styles.actionButton}
            icon="close"
            onPress={handleSecondButtonClick}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {userPasswords?.map((password, index) => (
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

      <Astronaut style={styles.astronautSvg} />

      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </KeyboardAvoidingView>
  )
}
