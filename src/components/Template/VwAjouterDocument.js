import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  sauvgaurderDocumentInfos,
  documentModalRestOuvert,
} from "../../../reducers/document";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../../styles/TemplateStyles/VwAjouterDocumentStyles";

export default function VwAjouterDocument(props) {
  const documentRedux = useSelector((state) => state.document.value);
  const userRedux = useSelector((state) => state.user.value);
  const [nom, setNom] = useState("");
  const [practicien, setPracticien] = useState("");
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();

  let imagesArr = [];

  useFocusEffect(
    useCallback(() => {
      console.log("- VwAjouterDocument > useFocusEffect > useCallback");
      setNom(documentRedux.nom);
      setPracticien(documentRedux.practicien);
      setNotes(documentRedux.notes);
    }, [])
  );

  // photosArr.map((elem, index) => {
  documentRedux.photos.map((elem, index) => {
    console.log("documentRedux.photos elem: ", index);
    console.log(elem);

    const imgElem = (
      <View key={index} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
          <FontAwesome name="times" size={20} color="red" />
        </TouchableOpacity>

        <Image source={{ uri: elem }} style={styles.imgElemStyle} />
      </View>
    );
    imagesArr.push(imgElem);
  });

  const appuyerCamera = () => {
    dispatch(documentModalRestOuvert());

    payloadObj = {
      nom: nom,
      practicien: practicien,
      notes: notes,
    };
    dispatch(sauvgaurderDocumentInfos(payloadObj));

    props.fermerModalSansEffacer();
    props.navigation.navigate("Camera");
  };

  const appuyerSoumettre = () => {
    const bodyObj = {
      token: userRedux.token,
      tokenProject: userRedux.tokenProject,
      nom: nom,
      practicien: practicien,
      notes: notes,
      url: documentRedux.photos,
    };
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/document/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => response.json())
      .then((resJson) => {
        if (resJson.result) {
          props.fetchDocumentsData();
          props.fermerModal();
        }
      });
  };

  return (
    <ScrollView>
      <View style={styles.modalOverlayScroll}>
        <View style={styles.modalBackground}>
          <View style={styles.vwHaut}>
            <Text style={styles.txtTitre}>Ajouter une document</Text>
          </View>

          <View style={styles.vwAuMileu}>
            <View style={styles.vwInputSuper}>
              <View style={styles.vwInput}>
                <TextInput
                  style={styles.listItem}
                  onChangeText={(value) => {
                    setNom(value);
                  }}
                  placeholder="Nom"
                  placeholderTextColor="#555555"
                  value={nom}
                />
              </View>
            </View>

            <View style={styles.vwInputSuper}>
              <View style={styles.vwInput}>
                <TextInput
                  style={styles.listItem}
                  onChangeText={(value) => {
                    setPracticien(value);
                  }}
                  placeholder="Practicien"
                  placeholderTextColor="#555555"
                  value={practicien}
                />
              </View>
            </View>
            <View style={styles.vwInputSuperNotes}>
              <View style={styles.vwInputNotes}>
                <TextInput
                  style={styles.listItem}
                  onChangeText={(value) => {
                    setNotes(value);
                  }}
                  placeholder="Notes"
                  placeholderTextColor="#555555"
                  value={notes}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>
          {imagesArr.length > 0 && (
            <View style={styles.vwInputPhotos}>{imagesArr}</View>
          )}
          <View style={styles.vwButonsEnBas}>
            <TouchableOpacity
              onPress={() => appuyerCamera()}
              style={styles.btnAjouter}
              activeOpacity={0.8}
            >
              <Text style={styles.btnAjouterText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => appuyerSoumettre()}
              style={styles.btn}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Soumettre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.fermerModal}
              style={styles.btn}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
}
