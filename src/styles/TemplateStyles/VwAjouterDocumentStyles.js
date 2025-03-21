import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalOverlayScroll: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: Dimensions.get("screen").height * 1.5,
    width: Dimensions.get("screen").width,
  },

  modalBackground: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  txtTitre: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },

  btnModal: {
    display: "flex",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderColor: "pink",
    borderRadius: 12,
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnModalFermer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  textButtonX: {
    fontSize: 20,
    fontWeight: "700",
  },
  vwHaut: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
  },
  vwAuMileu: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
  },
  vwInputSuper: {
    display: "flex",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  vwInput: {
    display: "flex",
    width: "80%",
    height: 50,
    borderRadius: 12,
    margin: 5,
  },
  txtInput: {
    height: "100%",
    padding: 10,
    fontSize: 16,
  },
  vwInputSuperNotes: {
    display: "flex",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  vwInputNotes: {
    width: "80%",
    borderRadius: 12,
  },
  txtInputNotes: {
    padding: 10,
    fontSize: 16,
  },
  vwInputPhotos: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgElemStyle: {
    width: 100,
    height: 100,
  },
  photoContainer: {
    alignItems: "flex-end",
    margin: 5,
  },

  vwButonsEnBas: {
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginTop: 20,
  },
  btnAjouter: {
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 5,
  },
  btn: {
    backgroundColor: "pink",
    borderWidth: 1,
    width: 120,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
