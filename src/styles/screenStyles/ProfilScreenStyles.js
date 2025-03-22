import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  vwInstructions: {
    padding: 50,
  },
  txtInstructions: {
    fontSize: 40,
    fontFamily: "Caveat",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
