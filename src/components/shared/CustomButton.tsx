import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import styles from "../../styles/sharedStyles/CustomButtonStyles";

type CustomButtonPropsType = TouchableOpacityProps & {
  title?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

// Composant typé avec React.FC
const CustomButton: React.FC<CustomButtonPropsType> = ({
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
