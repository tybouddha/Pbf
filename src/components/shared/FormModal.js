// components/shared/FormModal.js
import { Modal, Text, View } from "react-native";
import styles from "../../styles/sharedStyles/FormModalStyles";

const FormModal = ({ visible, onClose, title, formContent, actions }) => (
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
