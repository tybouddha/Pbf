// components/modal/SearchDocumentModal.js
import React from "react";
import { ScrollView, Text } from "react-native";
import FormModal from "../shared/FormModal";
import CustomTextInput from "../shared/CustomTextInput";
import CustomButton from "../shared/CustomButton";
import { globalStyles } from "../../styles/GlobalStyles";
import styles from "../../styles/modalStyles/SearchDocumentModalStyles";

const SearchDocumentModal = ({
  visible,
  cardArrRecherche,
  afficherRechercheScrollView,
  onClose,
  searchInput,
  setSearchInput,
  searchDocuments,
}) => {
  const formContent = (
    <>
      <CustomTextInput
        placeholder="Rechercher vos documents"
        value={searchInput}
        onChangeText={setSearchInput}
        style={styles.searchInput}
      />
      {afficherRechercheScrollView && cardArrRecherche.length > 0 ? (
        <ScrollView style={styles.scrollView}>{cardArrRecherche}</ScrollView>
      ) : (
        afficherRechercheScrollView && (
          <Text style={globalStyles.errorText}>Aucun résultat trouvé</Text>
        )
      )}
    </>
  );

  const actions = (
    <>
      <CustomButton
        title="Rechercher"
        onPress={() => {
          console.log("Rechercher cliqué");
          searchDocuments();
        }}
      />
      <CustomButton
        title="Fermer"
        onPress={() => {
          console.log("Fermer cliqué");
          onClose();
        }}
      />
    </>
  );

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title="Rechercher un document"
      formContent={formContent}
      actions={actions}
    />
  );
};

export default SearchDocumentModal;
