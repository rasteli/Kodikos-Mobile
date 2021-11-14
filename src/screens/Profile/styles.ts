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

  searchBox: {
    flex: 1,
    fontSize: 18,
    width: "100%",
    marginHorizontal: 15,
    paddingHorizontal: 15,

    borderWidth: 2,
    borderRadius: 15,
    color: COLORS.BLUE_PRIMARY,
    borderColor: COLORS.BLUE_PRIMARY
  }
})
