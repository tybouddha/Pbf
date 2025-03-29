// styles/modalStyles/PhotoModalStyles.js
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  photoModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  photoContentContainer: {
    alignItems: "center",
  },
  photoImage: {
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.8,
    borderRadius: 10, // Bonus pour un style pro
  },
});
