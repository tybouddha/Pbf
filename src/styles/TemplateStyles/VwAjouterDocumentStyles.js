import { StyleSheet } from "react-native";
import { globalStyles } from "../GlobalStyles";

export default StyleSheet.create({
  modalBackground: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff", // Fond blanc pour voir le contenu
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff", // Fond blanc pour les inputs
  },
});
