import React from "react";
import { Modal, Text, View } from "react-native";
import styles from "../../styles/sharedStyles/FormModalStyles";

type FormModalPropsType = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  formContent: React.ReactNode;
  actions?: React.ReactNode;
};

const FormModal: React.FC<FormModalPropsType> = ({
  visible,
  onClose,
  title,
  formContent,
  actions,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.formContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.formContent}>{formContent}</View>
        {actions && <View style={styles.actions}>{actions}</View>}
      </View>
    </View>
  </Modal>
);

export default FormModal;
