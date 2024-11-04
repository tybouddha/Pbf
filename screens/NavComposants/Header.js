import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";

export default function HeaderView(props) {
  const userRedux = useSelector((state) => state.user.value);

  const pressedProfil = () => {
    console.log("btn profil 🙍‍♂️");
    props.navigation.navigate("Profil");
  };

  const allerArrière = () => {
    props.navigation.goBack();
  };

  const vwProfil = (
    <View style={styles.containerProfil}>
      <TouchableOpacity style={styles.btn} onPress={() => pressedProfil()}>
        <FontAwesome name={"user"} size={25} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );

  const vwArrière = (
    <View style={styles.containerArrière}>
      <TouchableOpacity style={styles.btn} onPress={() => allerArrière()}>
        <FontAwesome name={"arrow-left"} size={25} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {props.afficherArriére ? vwArrière : null}
      <View style={styles.containerLogo}>
        <Image
          style={styles.image}
          source={require("../../assets/images/logo128.png")}
          alt="logo"
          resizeMode="contain"
        />
      </View>
      {props.cacheProfilevwProfil ? null : vwProfil}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
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
  containerProfil: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  containerArrière: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
