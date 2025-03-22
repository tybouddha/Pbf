import { View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../shared/CustomButton";
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
      <CustomButton onPress={() => pressedProfil()}>
        <FontAwesome name={"user-ninja"} size={25} color={"#FFFFFF"} />
      </CustomButton>
    </View>
  );

  const vwArrière = (
    <View style={styles.containerArrière}>
      <CustomButton onPress={() => allerArrière()}>
        <FontAwesome
          name={"arrow-alt-circle-left"}
          size={25}
          color={"#FFFFFF"}
        />
      </CustomButton>
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
