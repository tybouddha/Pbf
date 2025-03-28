import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTextInput from "./CustomTextInput";

const CarnetBebeForm = ({
  dateValue,
  setDateValue,
  coucherValue,
  setCoucherValue,
  selleValue,
  setSelleValue,
  couleurValue,
  setCouleurValue,
  repasValue,
  setRepasValue,
  noteValue,
  setNoteValue,
  poidsValue,
  setPoidsValue,
  tailleValue,
  setTailleValue,
  showDatePickerField,
  isDatePickerVisible,
  handleDatePicked,
  fieldName = "date",
}) => (
  <View>
    <TouchableOpacity onPress={() => showDatePickerField(fieldName)}>
      <Text>Date: {dateValue || "Sélectionner une date"}</Text>
    </TouchableOpacity>
    {isDatePickerVisible && (
      <DateTimePicker
        value={
          dateValue &&
          !isNaN(new Date(dateValue.split("-").reverse().join("-")))
            ? new Date(dateValue.split("-").reverse().join("-"))
            : new Date()
        }
        mode="date"
        display="default"
        minimumDate={new Date(2025, 0, 1)}
        onChange={handleDatePicked}
      />
    )}
    <CustomTextInput
      placeholder="Coucher"
      value={coucherValue}
      onChangeText={setCoucherValue}
    />
    <CustomTextInput
      placeholder="Selle"
      value={selleValue}
      onChangeText={setSelleValue}
    />
    <CustomTextInput
      placeholder="Couleur selle"
      value={couleurValue}
      onChangeText={setCouleurValue}
    />
    <CustomTextInput
      placeholder="Repas"
      value={repasValue}
      onChangeText={setRepasValue}
    />
    <CustomTextInput
      placeholder="Note"
      value={noteValue}
      onChangeText={setNoteValue}
    />
    <CustomTextInput
      placeholder="Poids (kg)"
      value={poidsValue}
      onChangeText={setPoidsValue}
    />
    <CustomTextInput
      placeholder="Taille (cm)"
      value={tailleValue}
      onChangeText={setTailleValue}
    />
  </View>
);

export default CarnetBebeForm;
