import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useCarnetBebeLogic } from "../hooks/useCarnetBebeLogic";
import CustomButton from "../components/shared/CustomButton";
import TemplateView from "../components/Template/TemplateView";
import CarnetBebeModal from "../components/modal/CarnetBebeModal";
import styles from "../styles/screenStyles/CarnetBebeScreenStyles";

export default function CarnetBebeScreen({ navigation }) {
  const {
    modalVisible,
    date,
    coucher,
    selle,
    couleur,
    repas,
    note,
    lastInfos,
    isDatePickerVisible,
    setCoucher,
    setSelle,
    setCouleur,
    setRepas,
    setNote,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    modalCarnetBebe,
    closeModal,
    saveInfos,
    handleDelete,
  } = useCarnetBebeLogic(navigation);

  const lastInfosCard = lastInfos?.map((item) => (
    <View key={item._id} style={styles.card}>
      <Text>Date: {item.date}</Text>
      <Text>Coucher: {item.heureCoucher}</Text>
      <Text>Repas: {item.repas}</Text>
      <Text>Selle: {item.selle}</Text>
      <Text>Couleur Selle: {item.couleurSelle}</Text>
      <Text>Notes: {item.notes}</Text>
      <CustomButton onPress={() => handleDelete(item._id)}>
        <Text>Supprimer</Text>
      </CustomButton>
    </View>
  ));

  return (
    <TemplateView navigation={navigation}>
      <View>
        <View style={styles.vwInstructions}>
          <Text style={styles.txtInstructions}>Carnet Bébé</Text>
        </View>
        <CustomButton
          onPress={modalCarnetBebe}
          title="Ajoute un document carnet Bebe"
        ></CustomButton>

        <CarnetBebeModal
          visible={modalVisible}
          date={date}
          coucher={coucher}
          selle={selle}
          couleur={couleur}
          repas={repas}
          note={note}
          isDatePickerVisible={isDatePickerVisible}
          setCoucher={setCoucher}
          setSelle={setSelle}
          setCouleur={setCouleur}
          setRepas={setRepas}
          setNote={setNote}
          showDatePicker={showDatePicker}
          hideDatePicker={hideDatePicker}
          handleDatePicked={handleDatePicked}
          onSave={saveInfos}
          onClose={closeModal}
        />

        <View style={styles.blocinfos}>{lastInfosCard}</View>
      </View>
    </TemplateView>
  );
}
