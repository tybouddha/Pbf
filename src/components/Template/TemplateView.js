import { View, ImageBackground } from "react-native";

import HeaderView from "../NavComponents/HeaderView";
import styles from "../../styles/TemplateStyles/TemplateViewStyles";

export default function TemplateView(props) {
  return (
    <ImageBackground
      source={require("../../../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <View style={styles.vwHeader}>
        <HeaderView
          navigation={props.navigation}
          afficherArriére={props.afficherArriére}
        />
      </View>
      <View style={styles.vwMain}>{props.children}</View>
      {/* {props.children} sont touts les trucs de le vrai Screen */}
    </ImageBackground>
  );
}
