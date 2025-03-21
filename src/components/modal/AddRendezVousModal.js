import React from "react";
import { View, Text, Modal } from "react-native";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../../components/shared/CustomTextInput";
import styles from "../../styles/modalStyles/AddRendezVousModalStyles";

const AddRendezVousModal = ({
  visible,
  onClose,
  selectedDate,
  pourQui,
  setPourQui,
  practicien,
  setPracticien,
  lieu,
  setLieu,
  heure,
  setHeure,
  notes,
  setNotes,
  onSubmit,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Nouveau Rendez-vous</Text>
          <Text>Date sélectionnée : {selectedDate}</Text>
          <CustomTextInput
            placeholder="Pour Qui"
            value={pourQui}
            onChangeText={setPourQui}
          />
          <CustomTextInput
            placeholder="Practicien"
            value={practicien}
            onChangeText={setPracticien}
          />
          <CustomTextInput
            placeholder="Lieu"
            value={lieu}
            onChangeText={setLieu}
          />
          <CustomTextInput
            placeholder="Heure"
            value={heure}
            onChangeText={setHeure}
          />
          <CustomTextInput
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
          />
          <CustomButton title="Sauvegarder" onPress={onSubmit} />
          <CustomButton title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default AddRendezVousModal;
