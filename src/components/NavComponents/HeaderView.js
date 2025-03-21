import { View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/NavComponentsStyles/HeaderViewStyles";

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
    <View
      style={
        props.afficherArriére
          ? styles.containerProfil
          : styles.containerProfilSolo
      }
    >
      <TouchableOpacity style={styles.btn} onPress={() => pressedProfil()}>
        <FontAwesome name={"user-ninja"} size={25} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );

  const vwArrière = (
    <View style={styles.containerArrière}>
      <TouchableOpacity style={styles.btn} onPress={() => allerArrière()}>
        <FontAwesome
          name={"arrow-alt-circle-left"}
          size={25}
          color={"#FFFFFF"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {props.afficherArriére ? vwArrière : null}
      <View style={styles.containerLogo}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/logo128.png")}
          alt="logo"
          resizeMode="contain"
        />
      </View>
      {props.cacheProfilevwProfil ? null : vwProfil}
    </View>
  );
}
