import { StyleSheet } from "react-native";
import { globalStyles } from "../GlobalStyles";

export default StyleSheet.create({
  modalOverlayScroll: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay semi-transparent
  },
  modalBackground: {
    flex: 1,
    margin: 20,
    backgroundColor: globalStyles.backgroundColor,
    borderRadius: 10,
    padding: 20,
  },
  vwHaut: {
    alignItems: "center",
    marginBottom: 20,
  },
  txtTitre: {
    fontSize: 20,
    fontWeight: "bold",
    color: globalStyles.textColor,
  },
  vwAuMileu: {
    flex: 1,
  },
  vwInputSuper: {
    marginVertical: 10,
  },
  vwInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  vwInputSuperNotes: {
    marginVertical: 10,
  },
  vwInputNotes: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    minHeight: 100, // Pour les notes multilignes
  },
  listItem: {
    fontSize: 16,
    color: globalStyles.textColor,
  },
  vwInputPhotos: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  photoContainer: {
    margin: 5,
    alignItems: "center",
  },
  imgElemStyle: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  vwButonsEnBas: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  btnAjouter: {
    backgroundColor: globalStyles.primaryColor,
    padding: 10,
    borderRadius: 5,
  },
  btnAjouterText: {
    color: "#fff",
    fontSize: 16,
  },
  btn: {
    backgroundColor: globalStyles.primaryColor,
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
