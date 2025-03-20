import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/CustomTextInputStyles";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  editable = true,
  onPress,
  ...props
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={!onPress}
  >
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#555555"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      editable={editable}
      {...props}
    />
  </TouchableOpacity>
);

export default CustomTextInput;
