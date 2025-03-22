import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  vwInstructions: {
    padding: 20,
  },
  txtInstructions: {
    fontSize: 40,
    fontFamily: "Caveat",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  div_btn: {
    display: "flex",
    width: 300,
    height: 500,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "space-around",
    margin: 30,
  },
  // btn: {
  //   display: "flex",
  //   backgroundColor: "white",
  //   width: 300,
  //   height: 50,
  //   alignItems: "center",
  //   borderRadius: 12,
  //   justifyContent: "center",
  //   margin: 5,
  // },
  modalView: {
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
  },
  modalListView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    width: "100%",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  // btnModal: {
  //   backgroundColor: "pink",
  //   color: "white",
  //   borderWidth: 1,
  //   width: 120,
  //   alignItems: "center",
  //   borderRadius: 12,
  //   justifyContent: "center",
  //   marginTop: 10,
  //   paddingVertical: 5,
  //   flexWrap: "nowrap",
  // },
  // input: {
  //   width: 150,
  //   borderBottomColor: "pink",
  //   borderBottomWidth: 1,
  //   fontSize: 16,
  // },
  // textButton: {
  //   color: "#ffffff",
  //   fontWeight: "600",
  //   fontSize: 15,
  // },
});
