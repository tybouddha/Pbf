import React from "react";
import { Modal, View, TouchableOpacity, TextInput, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "../../styles/modalStyles/CarnetBebeModalStyles";

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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.btnModal} activeOpacity={0.8}>
            <TextInput
              placeholder="Date"
              style={styles.input}
              value={date}
              onPressIn={() => showDatePicker("date")}
            />
            <TextInput
              placeholder="Coucher"
              style={styles.input}
              value={coucher}
              onChangeText={setCoucher}
            />
            <TextInput
              placeholder="Selle"
              style={styles.input}
              value={selle}
              onChangeText={setSelle}
            />
            <TextInput
              placeholder="Couleur selle"
              style={styles.input}
              value={couleur}
              onChangeText={setCouleur}
            />
            <TextInput
              placeholder="Repas"
              style={styles.input}
              value={repas}
              onChangeText={setRepas}
            />
            <TextInput
              placeholder="Note"
              style={styles.input}
              value={note}
              onChangeText={setNote}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSave}
            style={styles.btnClose}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Enregistré modification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={styles.btnClose}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Close</Text>
          </TouchableOpacity>
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
