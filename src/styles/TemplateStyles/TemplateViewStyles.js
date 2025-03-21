import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    heigth: Dimensions.get("screen").height,
  },
  vwHeader: {
    paddingTop: 20,
  },
  vwMain: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  vwFooter: {
    height: 60,
    backgroundColor: "#007ACC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
