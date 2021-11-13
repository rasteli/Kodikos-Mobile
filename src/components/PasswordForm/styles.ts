import { StyleSheet } from "react-native"
import { COLORS } from "../../theme"
import { getBottomSpace } from "react-native-iphone-x-helper"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 85,
    marginHorizontal: 30,
    justifyContent: "flex-start"
  },

  title: {
    fontSize: 36,
    color: COLORS.BLUE_QUINQUENARY
  },

  label: {
    color: COLORS.BLUE_QUATERNARY
  },

  switches: {
    flexDirection: "row",
    alignItems: "center"
  }
})
