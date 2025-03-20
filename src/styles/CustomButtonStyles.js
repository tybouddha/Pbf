import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "80%",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: "Caveat",
    fontSize: 30,
  },
});
