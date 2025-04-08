// components/navComponents/HeaderView.tsx
import React, { useCallback } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import CustomButton from "../shared/CustomButton";
import styles from "../../styles/NavComponentsStyles/HeaderViewStyles";
import { ImageStyles } from "../../styles/NavComponentsStyles/HeaderViewStyles";

import { textColor } from "../../styles/GlobalStyles";
import { NavigationProp } from "@react-navigation/native";
import { RootState } from "../../../store";

const defaultLogo = require("../../../assets/images/images/logo128.png");

type HeaderViewPropsType = {
  navigation: NavigationProp<any>;
  afficherArriere?: boolean;
  cacheProfile?: boolean;
  logo?: ImageSourcePropType;
};

const HeaderView: React.FC<HeaderViewPropsType> = ({
  navigation,
  afficherArriere = false,
  cacheProfile = false,
  logo = defaultLogo,
}) => {
  const userRedux = useSelector((state: RootState) => state.user.value);

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
            <FontAwesome name="arrow-left" size={30} color={textColor} />
          </CustomButton>
        </View>
      )}

      {/* Logo central */}
      <View style={styles.containerLogo}>
        <Image
          style={ImageStyles}
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
};

export default HeaderView;
