import React from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import CustomButton from "../shared/CustomButton";
import styles from "../../styles/modalStyles/RendezVousModalStyles";

const RendezVousModal = ({
  visible,
  onClose,
  selectedDate,
  appointments,
  onModify,
  onAdd,
  onDelete,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.modalTitle}>
              Rendez-vous pour le {selectedDate}
            </Text>
            {appointments.length > 0 ? (
              appointments.map((rdv, index) => (
                <View key={index} style={styles.listItem}>
                  <Text>Pour : {rdv.pourQui}</Text>
                  <Text>Praticien : {rdv.practicien}</Text>
                  <Text>Lieu : {rdv.lieu}</Text>
                  <Text>Heure : {rdv.heure}</Text>
                  <Text>Notes : {rdv.notes}</Text>
                  <CustomButton
                    title="Modifier"
                    onPress={() => onModify(rdv)}
                  />
                  <CustomButton title="Ajouter" onPress={onAdd} />
                  <CustomButton
                    title="Supprimer"
                    onPress={() => onDelete(rdv._id)}
                  />
                </View>
              ))
            ) : (
              <Text>Aucun rendez-vous trouvé pour cette date.</Text>
            )}
          </ScrollView>
          <CustomButton title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default RendezVousModal;
