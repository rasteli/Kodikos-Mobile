import { StyleSheet } from "react-native"
import { COLORS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0
  },

  modalContent: {
    backgroundColor: COLORS.BLUE_SEXTIARY,
    padding: 20,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  }
})
