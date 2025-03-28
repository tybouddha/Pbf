// styles/sharedStyles/ModalStyles.js
import { StyleSheet, View } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  guideContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    maxHeight: "80%",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    marginBottom: 10,
  },
  formContent: {
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rdvItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  View: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
});
