import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  sauvegarderDocumentInfos,
  documentModalRestOuvert,
} from "../reducers/document";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

export const useAjouterDocumentLogic = ({
  navigation,
  fetchDocumentsData,
  onClose,
}) => {
  const documentRedux = useSelector((state) => state.document.value);
  const userRedux = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const closeModalGeneric = useCloseModalGeneric();

  const [nom, setNom] = useState("");
  const [practicien, setPracticien] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // Synchronisation avec Redux au focus
  useFocusEffect(
    useCallback(() => {
      setNom(documentRedux.nom || "");
      setPracticien(documentRedux.practicien || "");
      setNotes(documentRedux.notes || "");
    }, [documentRedux.nom, documentRedux.practicien, documentRedux.notes])
  );

  // Rendu optimisé des photos
  const imagesArr = useMemo(() => {
    return documentRedux.photos.map((elem, index) => ({
      uri: elem,
      index,
    }));
  }, [documentRedux.photos]);

  // Ouvrir la caméra
  const handleCameraPress = useCallback(() => {
    dispatch(documentModalRestOuvert());
    const payload = { nom, practicien, notes };
    dispatch(sauvegarderDocumentInfos(payload));
    closeModalGeneric(() => onClose(false)); // Garde ouvert pour Camera
    navigation.navigate("Camera");
  }, [nom, practicien, notes, dispatch, navigation, onClose]);

  // Soumettre le document
  const handleSubmit = useCallback(async () => {
    if (!nom || !practicien) {
      setErrorMessage("Le nom et le praticien sont requis");
      return;
    }
    setErrorMessage(null);

    const bodyObj = {
      token: userRedux.token,
      tokenProject: userRedux.tokenProject,
      nom,
      practicien,
      notes,
      url: documentRedux.photos,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/document/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyObj),
        }
      );
      const resJson = await response.json();
      if (resJson.result) {
        fetchDocumentsData();
        closeModalGeneric(onClose); // Ferme complètement
      } else {
        setErrorMessage(resJson.error || "Erreur lors de l’ajout du document");
      }
    } catch (error) {
      setErrorMessage("Erreur réseau : " + error.message);
    }
  }, [
    nom,
    practicien,
    notes,
    userRedux,
    documentRedux.photos,
    fetchDocumentsData,
    onClose,
  ]);

  return {
    nom,
    setNom,
    practicien,
    setPracticien,
    notes,
    setNotes,
    errorMessage,
    imagesArr,
    handleCameraPress,
    handleSubmit,
    closeModalGeneric,
  };
};
