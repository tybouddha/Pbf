import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  contentView: {
    alignItems: "center",
    paddingVertical: 20,
  },
  txtInstructions: {
    fontSize: 40,
    fontFamily: "Caveat",
    marginBottom: 20,
  },
  switchCachePassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
});
