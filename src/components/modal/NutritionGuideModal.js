import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../styles/modalStyles/AccueilStyles";

const NutritionGuideModal = ({ visible, onClose, title, content }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.centeredView}>
      <View style={styles.modalListView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <ScrollView style={styles.scrollView}>
          {content.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.btnModal} onPress={onClose}>
          <Text style={styles.textButton}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default NutritionGuideModal;
