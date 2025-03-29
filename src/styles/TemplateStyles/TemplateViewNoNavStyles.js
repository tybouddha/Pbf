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
    flex: 1, // Remplace height: "80%" ou similaire pour flexibilité
    width: "100%",
  },
  vwFooter: {
    height: "10%", // Hauteur fixe pour le footer, ajustable si besoin
    width: "100%",
    backgroundColor: globalStyles.primaryColor, // Exemple avec couleur globale
  },
});
