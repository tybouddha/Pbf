import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/CustomButtonStyles";

const CustomButton = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;
