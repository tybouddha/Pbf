import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/GlobalStyles";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay semi-transparent
  },
  modalListView: {
    backgroundColor: globalStyles.backgroundColor,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.textColor,
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    marginVertical: 10,
  },
  vwRechercheButons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  btnModal: {
    backgroundColor: globalStyles.primaryColor,
    padding: 10,
    borderRadius: 5,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
