import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  imgElemStyle: {
    width: Dimensions.get("screen").width * 0.6,
    height: Dimensions.get("screen").width * 0.6,
  },
  photoContainer: {
    alignItems: "flex-end",
    margin: 5,
  },
  btnModal: {
    display: "flex",
    backgroundColor: "pink",
    borderWidth: 1,
    width: Dimensions.get("screen").width * 0.4,
    padding: 10,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "space-between",
    marginTop: 10,
  },
  textMessage: {
    padding: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
