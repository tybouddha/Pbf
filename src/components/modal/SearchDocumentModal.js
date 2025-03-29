// components/modal/SearchDocumentModal.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useDocumentLogic } from "../../hooks/useDocumentLogic";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import FormModal from "../shared/FormModal";
import styles from "../../styles/modalStyles/SearchDocumentModalStyles";
import { globalStyles } from "../../styles/globalStyles";

export default function SearchModal({
  visible,
  cardArrRecherche,
  afficherRechercheScrollView,
  onClose,
}) {
  const { searchInput, setSearchInput, searchDocuments, closeSearchModal } =
    useDocumentLogic();

  return (
    <FormModal
      visible={visible}
      onClose={closeSearchModal}
      title="Rechercher un document"
      formContent={
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Rechercher</Text>
          <CustomTextInput
            placeholder="Rechercher vos documents"
            value={searchInput}
            onChangeText={setSearchInput}
            style={{ marginBottom: 10 }}
          />
          {afficherRechercheScrollView && cardArrRecherche.length > 0 ? (
            <ScrollView style={styles.scrollView}>
              {cardArrRecherche}
            </ScrollView>
          ) : (
            afficherRechercheScrollView && (
              <Text style={globalStyles.errorText}>Aucun résultat trouvé</Text>
            )
          )}
          <View style={styles.vwRechercheButons}>
            <CustomButton title="Rechercher" onPress={searchDocuments} />
            <CustomButton title="Fermer" onPress={closeSearchModal} />
          </View>
        </View>
      }
    />
  );
}
