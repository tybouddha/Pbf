import { StyleSheet } from "react-native";
import { primaryColor } from "../GlobalStyles";

export const ImageStyles = {
  width: 50,
  height: 50,
};

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    ...ImageStyles,
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
