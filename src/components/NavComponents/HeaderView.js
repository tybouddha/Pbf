import React, { useCallback } from "react";
import { View, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import CustomButton from "../shared/CustomButton";
import styles from "../../styles/NavComponentsStyles/HeaderViewStyles";
import { globalStyles } from "../../styles/globalStyles";

const defaultLogo = require("../../../assets/images/logo128.png");

export default function HeaderView({
  navigation,
  afficherArriere = false, // Corrigé "Arriére" → "Arriere"
  cacheProfile = false, // Simplifié "cacheProfilevwProfil"
  logo = defaultLogo, // Prop optionnelle pour personnaliser le logo
}) {
  const userRedux = useSelector((state) => state.user.value);

  // Navigation vers Profil
  const handleProfilePress = useCallback(() => {
    navigation.navigate("Profil");
  }, [navigation]);

  // Retour en arrière
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Bouton retour (conditionnel) */}
      {afficherArriere && (
        <View style={styles.containerArrière}>
          <CustomButton onPress={handleBackPress}>
            <FontAwesome
              name="arrow-left"
              size={30}
              color={globalStyles.textColor}
            />
          </CustomButton>
        </View>
      )}

      {/* Logo central */}
      <View style={styles.containerLogo}>
        <Image
          style={styles.image}
          source={logo}
          resizeMode="contain"
          accessibilityLabel="Logo de l’application"
        />
      </View>

      {/* Bouton profil (conditionnel) */}
      {!cacheProfile && (
        <View style={styles.containerProfil}>
          <CustomButton onPress={handleProfilePress}>
            <FontAwesome name="user-ninja" size={25} color="#FFFFFF" />
          </CustomButton>
        </View>
      )}
    </View>
  );
}
