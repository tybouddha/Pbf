import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDocumentLogic } from "../../hooks/useDocumentLogic";
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
          <TextInput
            style={styles.listItem}
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
            <TouchableOpacity onPress={searchDocuments} style={styles.btnModal}>
              <Text style={styles.textButton}>Rechercher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={fermerSearchModal}
              style={styles.btnModal}
            >
              <Text style={styles.textButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
