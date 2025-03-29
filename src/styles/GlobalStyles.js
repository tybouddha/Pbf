import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // Couleurs principales
  primaryColor: "#007ACC",
  backgroundColor: "#fff",
  errorColor: "red",
  textColor: "#333",

  // Conteneurs communs
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Textes communs
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },

  // Boutons
  buttonContainer: {
    marginVertical: 10,
  },
});
