import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import styles from "../../styles/modalStyles/SearchRendezVousModalStyles";

const SearchRendezVousModal = ({
  visible,
  onClose,
  searchInput,
  setSearchInput,
  filteredRendezVous,
  onSearch,
  onModify,
  onDelete,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Rechercher</Text>
          <CustomTextInput
            placeholder="Rechercher un rendez-vous"
            value={searchInput}
            onChangeText={setSearchInput}
          />
          <ScrollView style={styles.scrollView}>
            {Object.keys(filteredRendezVous).map((date) => (
              <View key={date} style={styles.listItem}>
                <Text style={styles.dateText}>{date}</Text>
                {filteredRendezVous[date].map((rdv, index) => (
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
                    <CustomButton
                      title="Supprimer"
                      onPress={() => onDelete(rdv._id)}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <CustomButton title="Rechercher" onPress={onSearch} />
          <CustomButton title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default SearchRendezVousModal;
