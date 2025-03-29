import { View, ImageBackground } from "react-native";
import HeaderView from "../NavComponents/HeaderView";
import styles from "../../styles/TemplateStyles/TemplateViewNoNavStyles";

// Image de fond par défaut
const defaultBackground = require("../../../assets/images/projectbaby-background.jpg");

export default function TemplateViewNoNav({
  navigation,
  afficherArriére = false, // Par défaut, pas de bouton retour
  cacheProfilevwProfil = true, // Par défaut, masque le profil dans HeaderView
  children,
  backgroundImage = defaultBackground, // Prop optionnelle pour personnaliser le fond
  backgroundStyle, // Prop optionnelle pour surcharger le style du fond
  footerContent, // Prop optionnelle pour ajouter du contenu au footer
}) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.background, backgroundStyle]}
    >
      {/* En-tête avec navigation */}
      <View style={styles.vwHeader}>
        <HeaderView
          navigation={navigation}
          afficherArriére={afficherArriére}
          cacheProfilevwProfil={cacheProfilevwProfil}
        />
      </View>
      {/* Contenu principal */}
      <View style={styles.vwMain}>{children}</View>
      {/* Pied de page (optionnel) */}
      <View style={styles.vwFooter}>{footerContent}</View>
    </ImageBackground>
  );
}
