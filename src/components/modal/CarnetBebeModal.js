import React from "react";
import { Modal, View, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import CarnetBebeModalStyles from "../../styles/modalStyles/CarnetBebeModalStyles"; // Ajuste le chemin si nécessaire

export default function CarnetBebeModal({
  visible,
  date,
  coucher,
  selle,
  couleur,
  repas,
  note,
  isDatePickerVisible,
  setCoucher,
  setSelle,
  setCouleur,
  setRepas,
  setNote,
  showDatePicker,
  hideDatePicker,
  handleDatePicked,
  onSave,
  onClose,
}) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={CarnetBebeModalStyles.centeredView}>
        <View style={CarnetBebeModalStyles.modalView}>
          {/* Champs de saisie */}
          <CustomTextInput
            placeholder="Date"
            value={date}
            onPressIn={() => showDatePicker("date")}
            editable={false} // Désactive la saisie manuelle pour la date
          />
          <CustomTextInput
            placeholder="Coucher"
            value={coucher}
            onChangeText={setCoucher}
          />
          <CustomTextInput
            placeholder="Selle"
            value={selle}
            onChangeText={setSelle}
          />
          <CustomTextInput
            placeholder="Couleur selle"
            value={couleur}
            onChangeText={setCouleur}
          />
          <CustomTextInput
            placeholder="Repas"
            value={repas}
            onChangeText={setRepas}
          />
          <CustomTextInput
            placeholder="Note"
            value={note}
            onChangeText={setNote}
          />

          {/* Boutons */}
          <CustomButton title="Enregistré modification" onPress={onSave} />
          <CustomButton title="Close" onPress={onClose} />

          {/* Date Picker */}
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDatePicked}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
    </Modal>
  );
}
