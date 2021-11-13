import { StyleSheet } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { COLORS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: COLORS.BLACK
  },

  rocket: {
    position: "absolute",
    top: "33%",
    right: 0
  },

  kodikos: {
    flex: 1,
    justifyContent: "flex-end",

    marginHorizontal: 20,
    paddingBottom: getBottomSpace() + 32
  },

  title: {
    fontSize: 56,
    color: COLORS.BLUE_QUATERNARY
  },

  description: {
    fontSize: 26,
    color: COLORS.GRAY_SECONDARY,

    marginBottom: 15
  }
})
