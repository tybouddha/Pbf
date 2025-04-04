import React from "react";
import {
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  TextInputProps,
} from "react-native";
import styles from "../../styles/sharedStyles/CustomTextInputStyles";

//& au lieu d'extend pour éviter les problèmes de typage (ex: onBlur existe TouchableOpacityProps et TextInputProps mais avec des types différents)
type CustomTextInputProps = TouchableOpacityProps &
  TextInputProps & {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    editable?: boolean;
    onPress?: () => void;
  };

const CustomTextInput: React.FC<CustomTextInputProps> = ({
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
