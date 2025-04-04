// components/shared/GuideModal.js
import { Modal, Text, View, ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import styles from "../../styles/sharedStyles/ModalStyles";

interface GuideModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
}

const GuideModal: React.FC<GuideModalProps> = ({
  visible,
  onClose,
  title,
  content,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={styles.guideContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <ScrollView style={styles.content}>{content}</ScrollView>
        <CustomButton title="Fermer" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

export default GuideModal;
