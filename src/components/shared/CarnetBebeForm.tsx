import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTextInput from "./CustomTextInput";

type CarnetBebeFormPropsType = {
  dateValue?: string;
  setDateValue?: (date: string) => void;
  coucherValue?: string;
  setCoucherValue?: (value: string) => void;
  selleValue?: string;
  setSelleValue?: (value: string) => void;
  couleurValue?: string;
  setCouleurValue?: (value: string) => void;
  repasValue?: string;
  setRepasValue?: (value: string) => void;
  noteValue?: string;
  setNoteValue?: (value: string) => void;
  poidsValue?: string;
  setPoidsValue?: (value: string) => void;
  tailleValue?: string;
  setTailleValue?: (value: string) => void;
  showDatePicker?: (field: string) => void;
  isDatePickerVisible?: boolean;
  handleDatePicked?: (event: any, date?: Date) => void;
  fieldName?: string;
};

const CarnetBebeForm: React.FC<CarnetBebeFormPropsType> = ({
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
  showDatePicker,
  isDatePickerVisible,
  handleDatePicked,
  fieldName = "date",
}) => {
  const parseDateValue = (dateStr?: string): Date => {
    if (
      dateStr &&
      !isNaN(new Date(dateStr.split("-").reverse().join("-")).getTime())
    ) {
      return new Date(dateStr.split("-").reverse().join("-"));
    }
    return new Date();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => showDatePicker && showDatePicker(fieldName)}
      >
        <Text>Date: {dateValue || "Sélectionner une date"}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={parseDateValue(dateValue)} // Toujours un Date
          mode="date"
          display="default"
          minimumDate={new Date(2025, 0, 1)} // Date valide
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
};

export default CarnetBebeForm;
