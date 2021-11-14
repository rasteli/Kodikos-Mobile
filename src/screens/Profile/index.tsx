import React, { useState } from "react"
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native"

import { styles } from "./styles"
import { COLORS } from "../../theme"
import { useAuth } from "../../contexts/AuthContext"
import { Modal } from "../../components/AddPasswordModal"
import { ActionButton } from "../../components/ActionButton"
import { usePassword } from "../../contexts/PasswordContext"

import Astronaut from "../../assets/astronaut.svg"
import { PasswordsScrollView } from "../../components/PasswordsScrollView"

export function Profile() {
  const { user } = useAuth()

  const {
    methods: { deletePassword, setPasswords, setPasswordLabel }
  } = usePassword()

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

          <TextInput
            style={styles.searchBox}
            placeholder="Buscar por rótulo"
            placeholderTextColor={COLORS.BLUE_PRIMARY}
            onChangeText={text => setPasswordLabel(text)}
          />
        </View>
      </View>

      <PasswordsScrollView deleteMode={deleteMode} />
      <Astronaut style={styles.astronautSvg} />

      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </KeyboardAvoidingView>
  )
}
