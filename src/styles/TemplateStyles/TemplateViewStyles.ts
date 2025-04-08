import { StyleSheet } from "react-native";
import { globalStyles } from "../GlobalStyles";

export default StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  vwHeader: {
    height: "10%",
    width: "100%",
  },
  vwMain: {
    flex: 1, // Remplace height: "90%" pour plus de flexibilité
    width: "100%",
  },
});
