// components/navComponents/IconView.tsx
import React from "react";
import { Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import styles from "../../styles/NavComponentsStyles/IconViewStyles";

interface IconViewProps {
  iconName: string; // Nom de l'icône FontAwesome
  size: number; // Taille de l'icône
  color: string; // Couleur de l'icône
  focused: boolean; // État focused pour la navigation
  screenName: string; // Nom de l'écran affiché
}

const IconView: React.FC<IconViewProps> = ({
  iconName,
  size,
  color,
  focused,
  screenName,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={focused ? styles.sousContainerFocused : styles.sousContainer}
      >
        <FontAwesome name={iconName} size={size} color={color} />
        <Text style={styles.textStyle}>{screenName}</Text>
      </View>
    </View>
  );
};

export default IconView;
