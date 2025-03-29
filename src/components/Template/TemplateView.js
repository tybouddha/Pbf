import { View, ImageBackground } from "react-native";
import HeaderView from "../NavComponents/HeaderView";
import styles from "../../styles/TemplateStyles/TemplateViewStyles";

// Image de fond par défaut
const defaultBackground = require("../../../assets/images/projectbaby-background.jpg");

export default function TemplateView({
  navigation,
  afficherArriére = false, // Par défaut, pas de bouton retour
  children,
  backgroundImage = defaultBackground, // Prop optionnelle pour personnaliser le fond
  backgroundStyle, // Prop optionnelle pour surcharger le style du fond
}) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.background, backgroundStyle]} // Combine style par défaut et surcharge
    >
      {/* En-tête avec navigation */}
      <View style={styles.vwHeader}>
        <HeaderView navigation={navigation} afficherArriére={afficherArriére} />
      </View>
      {/* Contenu principal */}
      <View style={styles.vwMain}>{children}</View>
    </ImageBackground>
  );
}
