import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";
import CustomButton from "../shared/CustomButton";
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
        <CustomButton title="Fermer" onPress={onClose}></CustomButton>
      </View>
    </View>
  </Modal>
);

export default NutritionGuideModal;
