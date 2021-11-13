import { StyleSheet } from "react-native"
import { COLORS, FONTS } from "../../theme"

export const styles = StyleSheet.create({
  button: {
    height: 60,
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 20,
    fontFamily: FONTS.REGULAR
  },

  icon: {
    marginRight: 12,
    color: COLORS.GRAY_SECONDARY
  }
})
