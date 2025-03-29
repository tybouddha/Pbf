// screens/DocumentsScreen.js
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useDocumentLogic } from "../hooks/useDocumentLogic";
import CustomButton from "../components/shared/CustomButton";
import TemplateView from "../components/Template/TemplateView";
import VwAjouterDocument from "../components/Template/VwAjouterDocument";
import SearchModal from "../components/modal/SearchDocumentModal";
import PhotoModal from "../components/modal/PhotoModal";
import styles from "../styles/screenStyles/DocumentScreenStyles";
import { globalStyles } from "../styles/globalStyles";

export default function DocumentsScreen({ navigation }) {
  const {
    documentRedux,
    documentsDonnes,
    documentsDonnesRecherche,
    searchModalVisible,
    photoModalVisible,
    documentChoisi,
    afficherRechercheScrollView,
    errorMessage,
    fetchData,
    fermerModalVwAjouterDoc,
    cameraScreenFermerModalSansEffacerRedux,
    poubelleAppuyee,
    appuyerPhoto,
    ouvrirModalAjoutDocument,
    closeSearchModal,
    closePhotoModal,
  } = useDocumentLogic(navigation);

  const createDocumentCard = (elem) => (
    <View key={elem._id} style={styles.card}>
      <View style={styles.cardRayon1}>
        <Text style={styles.txtDate}>{elem.dateAjoute.substring(0, 10)}</Text>
      </View>
      <View style={styles.cardRayon2}>
        <View style={styles.cardRayon2Sous}>
          <View style={styles.cardRayon2SousPracticien}>
            <Text style={styles.txtLabel}>Practicien: </Text>
            <Text style={styles.txtPracticien}>{elem.practicien}</Text>
          </View>
          <View style={styles.cardRayon2SousPracticien}>
            <Text style={styles.txtLabel}>Pour qui: </Text>
            <Text style={styles.txtNom}>{elem.nom}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.txtNotes}>{elem.notes}</Text>
      <View style={styles.vwInputPhotos}>
        <View style={styles.photoContainer}>
          <CustomButton onPress={() => appuyerPhoto(elem)}>
            <Image source={{ uri: elem.url[0] }} style={styles.imgElemStyle} />
          </CustomButton>
        </View>
      </View>
      <View style={styles.vwButonSupprimer}>
        <CustomButton title="Supprimer" onPress={() => poubelleAppuyee(elem)} />
      </View>
    </View>
  );

  const cardArr = documentsDonnes.map(createDocumentCard);
  const cardArrRecherche = documentsDonnesRecherche.map(createDocumentCard);

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.vwInstructions}>
        <Text style={styles.txtInstructions}>Documents</Text>
      </View>
      {errorMessage && (
        <Text style={globalStyles.errorText}>{errorMessage}</Text>
      )}
      <VwAjouterDocument
        navigation={navigation}
        fetchDocumentsData={fetchData}
        visible={documentRedux.modalOuvert}
        onClose={fermerModalVwAjouterDoc}
      />
      <SearchModal
        visible={searchModalVisible}
        cardArrRecherche={cardArrRecherche}
        afficherRechercheScrollView={afficherRechercheScrollView}
        onClose={closeSearchModal}
      />
      <PhotoModal
        visible={photoModalVisible}
        documentChoisi={documentChoisi}
        onClose={closePhotoModal}
      />
      <View style={styles.container}>
        <View style={styles.vwHaut}>
          <CustomButton
            title="Rechercher un Document"
            onPress={() => setSearchModalVisible(true)}
          />
          <CustomButton
            title="Ajouter un document"
            onPress={ouvrirModalAjoutDocument}
          />
        </View>
        <ScrollView>{cardArr}</ScrollView>
      </View>
    </TemplateView>
  );
}
