// styles/modalStyles/PhotoModalStyles.js
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  photoContentContainer: {
    alignItems: "center",
  },
  photoImage: {
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.8,
    borderRadius: 10,
  },
});
