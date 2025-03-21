import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";
import CustomButton from "../../components/shared/CustomButton"; // Réutilisation
import { useWelcomeNavigation } from "../../hooks/useWelcomeNavigation";
import styles from "../../styles/screenStyles/WelcomeScreenStyles";

export default function WelcomeScreen({ navigation }) {
  const { navigateToLogin, navigateToCreerProjet, navigateToInviter } =
    useWelcomeNavigation(navigation);

  return (
    <TemplateViewNoNav>
      <View style={styles.container}>
        <CustomButton title="Se connecter" onPress={navigateToLogin} />
        <CustomButton title="Créer Projet" onPress={navigateToCreerProjet} />
        <CustomButton title="Compte invité" onPress={navigateToInviter} />
      </View>
    </TemplateViewNoNav>
  );
}
