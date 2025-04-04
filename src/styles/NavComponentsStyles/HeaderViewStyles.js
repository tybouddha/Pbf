import { StyleSheet } from "react-native";
import { globalStyles } from "../GlobalStyles";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: globalStyles.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  containerArrière: {
    width: 50,
    alignItems: "flex-start",
  },
  containerProfil: {
    width: 50,
    alignItems: "flex-end",
  },
  containerProfilSolo: {
    width: 50,
    alignItems: "flex-end",
  },
});
