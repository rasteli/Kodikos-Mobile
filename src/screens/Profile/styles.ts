import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

import { COLORS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK
  },

  headingOne: {
    marginTop: getStatusBarHeight() + 60,

    color: COLORS.BLUE_QUATERNARY,
    fontSize: 36
  },

  headingTwo: {
    color: COLORS.BLUE_PRIMARY,
    fontSize: 26
  },

  actionButtons: {
    flexDirection: "row",
    marginTop: 20
  },

  actionButton: {
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.BLUE_QUINQUENARY
  },

  astronautSvg: {
    alignSelf: "center",
    marginTop: 15
  },

  password: {
    marginHorizontal: 20,
    position: "relative"
  },

  checkbox: {
    position: "absolute",
    top: -20,
    right: -10,
    marginTop: 5
  }
})
