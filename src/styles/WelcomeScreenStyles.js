import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vwBtn: {
    display: "flex",
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width * 0.8,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC", // Blue outline
    backgroundColor: "#FFFFFF", // White background
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Caveat",
    fontSize: 30,
  },
});
