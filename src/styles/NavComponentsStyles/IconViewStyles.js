import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  sousContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  sousContainerFocused: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    // opacity: 0.3,// <- ne puex pas utiliser opacity, sinon touts les elements dedans le View aurais le meme opacity
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
  },
  textStyle: {
    color: "#FFFFFF",
    fontSize: 10,
  },
});
