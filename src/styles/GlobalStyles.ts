// styles/GlobalStyles.ts
import { StyleSheet } from "react-native";

// Constantes pour les couleurs
export const primaryColor: string = "#007ACC";
export const backgroundColor: string = "#fff";
export const errorColor: string = "red";
export const textColor: string = "black"; // Une seule définition

export const globalStyles = StyleSheet.create({
  // Conteneurs communs
  container: {
    flex: 1,
    backgroundColor: backgroundColor, // Utilise la constante
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Textes communs
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: textColor,
  },
  errorText: {
    fontSize: 16,
    color: errorColor,
    textAlign: "center",
    marginBottom: 10,
  },

  // Boutons
  buttonContainer: {
    marginVertical: 10,
  },
});
