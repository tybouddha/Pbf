import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import TemplateView from "../components/Template/TemplateView";
import VwAjouterDocument from "../components/Template/VwAjouterDocument";
import SearchModal from "../components/modal/SearchDocumentModal";
import PhotoModal from "../components/modal/PhotoModal";
import { useDocumentLogic } from "../hooks/useDocumentLogic";
import styles from "../styles/screenStyles/DocumentScreenStyles";

export default function DocumentsScreen({ navigation }) {
  const {
    documentRedux,
    documentsDonnes,
    documentsDonnesRecherche,
    searchModalVisible,
    photoModalVisible,
    documentChoisi,
    afficherRechercheScrollView,
    fetchData,
    fermerModalVwAjouterDoc,
    cameraScreenFermerModalSansEffacerRedux,
    poubelleAppuyee,
    appuyerPhoto,
    ouvrirModalAjoutDocument,
    setSearchModalVisible,
  } = useDocumentLogic(navigation);

  const createDocumentCard = (elem, index) => (
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
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => appuyerPhoto(elem)}
          >
            <Image source={{ uri: elem.url[0] }} style={styles.imgElemStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.vwButonSupprimer}>
        <TouchableOpacity
          style={styles.btnModal}
          onPress={() => poubelleAppuyee(elem)}
        >
          <Text style={{ color: "white" }}>Supprimer</Text>
        </TouchableOpacity>
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
      <VwAjouterDocument
        visible={documentRedux.modalOuvert}
        fermerModal={fermerModalVwAjouterDoc}
        fermerModalSansEffacer={cameraScreenFermerModalSansEffacerRedux}
        navigation={navigation}
        fetchDocumentsData={fetchData}
      />
      <SearchModal
        visible={searchModalVisible}
        cardArrRecherche={cardArrRecherche}
        afficherRechercheScrollView={afficherRechercheScrollView}
        onClose={() => setSearchModalVisible(false)}
      />
      <PhotoModal
        visible={photoModalVisible}
        documentChoisi={documentChoisi}
        onClose={() => setPhotoModalVisible(false)}
      />
      <View style={styles.container}>
        <View style={styles.vwHaut}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setSearchModalVisible(true)}
          >
            <Text>Rechercher un document</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={ouvrirModalAjoutDocument}
          >
            <Text>Ajoute un document</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>{cardArr}</ScrollView>
      </View>
    </TemplateView>
  );
}
