// components/shared/CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "../../styles/sharedStyles/CustomButtonStyles";

// Interface pour les props
interface CustomButtonProps extends TouchableOpacityProps {
  title?: string; // Optionnel car parfois remplacé par children
  disabled?: boolean; // Optionnel, hérité de TouchableOpacityProps mais explicite
  children?: React.ReactNode; // Pour contenu personnalisé (ex. icônes)
}

// Composant typé avec React.FC
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled,
  children,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    {children ? children : <Text style={styles.buttonText}>{title}</Text>}
  </TouchableOpacity>
);

export default CustomButton;
