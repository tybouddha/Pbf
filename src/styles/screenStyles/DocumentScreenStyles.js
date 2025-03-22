import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  photoModalContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  photoModalImageStyle: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  container: {
    flex: 1,
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
  vwHaut: {
    display: "flex",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.5,
    justifyContent: "space-around",
  },
  btn: {
    display: "flex",
    backgroundColor: "white",
    width: 300,
    height: 50,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    margin: 5,
  },
  // modalTitle: {
  //   fontSize: 20,
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // modalListView: {
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 20,
  //   width: "90%",
  //   maxHeight: "70%",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  searchBar: {
    flex: 1,
    textAlign: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  // btnModal: {
  //   backgroundColor: "pink",
  //   borderWidth: 1,
  //   width: 120,
  //   alignItems: "center",
  //   borderRadius: 12,
  //   justifyContent: "center",
  //   marginTop: 10,
  //   paddingVertical: 5,
  // },
  scrollView: {
    width: "100%",
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  vwRechercheButons: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "gray",
  },
  vwButonSupprimer: {
    width: "100%",
    alignItems: "center",
  },
  vwBas: {
    width: "100%",
  },
  card: {
    backgroundColor: "#fff", // Background color for the row
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    // width: Dimensions.get("screen").width * 0.8,
    // Shadow for Android
    elevation: 7,
    flex: 1,
    // backgroundColor: "gray",
  },
  cardRayon1: {
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  txtDate: {
    color: "gray",
  },
  cardRayon2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRayon2Sous: {},
  cardRayon2SousPracticien: {
    display: "flex",
    flexDirection: "row",
  },
  txtLabel: {
    fontWeight: "bold",
  },
  vwInputPhotos: {
    // backgroundColor: "gray",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  imgElemStyle: {
    // margin: 10,
    width: 100,
    height: 100,
  },
  photoContainer: {
    alignItems: "flex-end",
    margin: 5,
  },
});
