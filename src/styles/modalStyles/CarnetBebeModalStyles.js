import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: Dimensions.get("screen").width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // btnModal: {
  //   width: "100%",
  //   marginBottom: 10,
  // },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  // btnClose: {
  //   backgroundColor: "#ddd",
  //   padding: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  //   marginVertical: 5,
  // },
  // textButton: {
  //   fontSize: 16,
  // },
});
