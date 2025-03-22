import { Modal, View, Text, ScrollView } from "react-native";
import CustomButton from "../shared/CustomButton";
import styles from "../../styles/modalStyles/AccueilStyles";

const AgendaModal = ({ visible, onClose, selectedDate, appointments }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.centeredView}>
      <View style={styles.modalListView}>
        <Text style={styles.modalTitle}>Agenda</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.modalTitle}>
            Rendez-vous pour le {selectedDate}
          </Text>
          {appointments.map((rdv, index) => (
            <View key={index} style={styles.listItem}>
              <Text>Pour : {rdv.pourQui}</Text>
              <Text>Praticien : {rdv.practicien}</Text>
              <Text>Lieu : {rdv.lieu}</Text>
              <Text>Heure : {rdv.heure}</Text>
              <Text>Notes : {rdv.notes}</Text>
            </View>
          ))}
        </ScrollView>
        <CustomButton title="Fermer" onPress={onClose}></CustomButton>
      </View>
    </View>
  </Modal>
);

export default AgendaModal;
