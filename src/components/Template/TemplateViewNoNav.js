import { View, ImageBackground } from "react-native";

import HeaderView from "../NavComponents/HeaderView";
import styles from "../../styles/TemplateStyles/TemplateViewNoNavStyles";

export default function TemplateViewNoNav(props) {
  // console.log("-- TemplateViewNoNav 👀");

  return (
    <ImageBackground
      source={require("../../../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.vwHeader}>
        <HeaderView
          cacheProfilevwProfil={true}
          navigation={props.navigation}
          afficherArriére={props.afficherArriére}
        />
      </View>
      <View style={styles.vwMain}>{props.children}</View>
      <View style={styles.vwFooter}></View>
    </ImageBackground>
  );
}
