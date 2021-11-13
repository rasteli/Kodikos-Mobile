import { StyleSheet } from "react-native"
import { COLORS } from "../../theme"

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",

    position: "relative"
  },

  labelBG: {
    position: "absolute",
    padding: 8,

    color: COLORS.BLUE_QUATERNARY,

    zIndex: 1,
    top: -18,
    left: 0
  },

  input: {
    width: "100%",
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.BLUE_QUINQUENARY,

    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,

    color: COLORS.GRAY_TERTIARY,
    paddingLeft: 15,
    fontSize: 18
  },

  button: {
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.BLUE_QUINQUENARY,

    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  }
})
