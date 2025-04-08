import { StyleSheet } from "react-native";
// import { globalStyles } from "../GlobalStyles";

export default StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  snapContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
});
