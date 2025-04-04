import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 60,
    maxWidth: "90%", // Limite la largeur sans couper
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007ACC",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "Caveat",
    fontSize: 22, // Plus petit pour s’adapter
    textAlign: "center",
    flexShrink: 1,
  },
});
