import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { COLORS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    // alignSelf: "flex-end",
    marginRight: 15,
    marginTop: getStatusBarHeight() + 10,

    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    fontSize: 42,
    flexGrow: 1,
    marginLeft: 15,
    color: COLORS.BLUE_QUATERNARY
  },

  logout: {
    marginRight: 15,
    fontSize: 18,
    color: COLORS.BLUE_QUATERNARY
  }
})
