import React from "react";
import { View, Text, Modal } from "react-native";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import styles from "../../styles/modalStyles/ModifyRendezVousModalStyles";

const ModifyRendezVousModal = ({
  visible,
  onClose,
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
  onUpdate,
  rdvId,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Modifier</Text>
          <CustomTextInput value={pourQui} onChangeText={setPourQui} />
          <CustomTextInput value={practicien} onChangeText={setPracticien} />
          <CustomTextInput value={lieu} onChangeText={setLieu} />
          <CustomTextInput value={heure} onChangeText={setHeure} />
          <CustomTextInput value={notes} onChangeText={setNotes} />
          <CustomButton title="Modifier" onPress={() => onUpdate(rdvId)} />
          <CustomButton title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModifyRendezVousModal;
