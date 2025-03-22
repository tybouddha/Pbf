import React from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import { useDocumentLogic } from "../../hooks/useDocumentLogic";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import styles from "../../styles/modalStyles/SearchDocumentModalStyles";

export default function SearchModal({
  visible,
  cardArrRecherche,
  afficherRechercheScrollView,
  onClose,
}) {
  const { searchInput, setSearchInput, searchDocuments, fermerSearchModal } =
    useDocumentLogic();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Rechercher</Text>
          <CustomTextInput
            placeholder="Rechercher vos documents"
            value={searchInput}
            onChangeText={setSearchInput}
          />
          {afficherRechercheScrollView && (
            <ScrollView style={styles.scrollView}>
              {cardArrRecherche}
            </ScrollView>
          )}
          <View style={styles.vwRechercheButons}>
            <CustomButton
              title="Rechercher"
              onPress={searchDocuments}
            ></CustomButton>
            <CustomButton
              title="Fermer"
              onPress={fermerSearchModal}
              style={styles.btnModal}
            ></CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
