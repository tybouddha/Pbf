import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#007ACC",
    height: 70,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    height: 80,
    aspectRatio: 1,
  },
  containerLogo: {
    alignItems: "center",
    position: "absolute",
    left: Dimensions.get("screen").width * 0.5 - 40,
  },
  containerProfilSolo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  containerProfil: {
    justifyContent: "center",
    marginRight: 10,
  },
  containerArrière: {
    justifyContent: "center",
    marginLeft: 10,
  },
});
