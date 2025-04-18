import { StyleSheet } from "react-native";
import { backgroundColor, textColor, primaryColor } from "../GlobalStyles";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay semi-transparent
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    backgroundColor: backgroundColor,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  textMessage: {
    fontSize: 18,
    color: textColor,
    marginBottom: 20,
  },
  photoContainer: {
    marginBottom: 20,
  },
  imgElemStyle: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  btnModal: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "50%",
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
});
