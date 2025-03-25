import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../../styles/sharedStyles/CustomButtonStyles";

const CustomButton = ({ title, onPress, disabled, children }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    {children ? children : <Text style={styles.buttonText}>{title}</Text>}
  </TouchableOpacity>
);

export default CustomButton;
