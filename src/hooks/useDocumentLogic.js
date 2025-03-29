// hooks/useDocumentLogic.js
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  documentModalRestOuvert,
  documentModalResterFermer,
  sauvegarderDocumentInfos,
  supprimerTousLesPhotos,
} from "../../reducers/document";
import { useCloseModalGeneric } from "../components/shared/useCloseModalGeneric";

export const useDocumentLogic = (navigation) => {
  const userRedux = useSelector((state) => state.user.value);
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();
  const closeModal = useCloseModalGeneric();

  const [documentsDonnes, setDocumentsDonnes] = useState([]);
  const [documentsDonnesRecherche, setDocumentsDonnesRecherche] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [documentChoisi, setDocumentChoisi] = useState(null);
  const [afficherRechercheScrollView, setAfficherRechercheScrollView] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = useCallback(() => {
    // ... (inchangé)
  }, [userRedux.tokenProject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fermerModalVwAjouterDoc = useCallback(() => {
    // ... (inchangé)
  }, [dispatch]);

  const cameraScreenFermerModalSansEffacerRedux = useCallback(() => {
    // ... (inchangé)
  }, [dispatch]);

  const poubelleAppuyee = useCallback(
    async (elem) => {
      // ... (inchangé)
    },
    [userRedux.role, fetchData]
  );

  const searchDocuments = useCallback(() => {
    setAfficherRechercheScrollView(true);
    const normalizedSearch = searchInput.trim().toLowerCase();
    const newDocumentsDonnes = documentsDonnes.filter((doc) =>
      [doc.nom, doc.practicien, doc.notes, doc.dateAjoute].some((field) =>
        field?.toLowerCase().includes(normalizedSearch)
      )
    );
    setDocumentsDonnesRecherche(newDocumentsDonnes);
    closeModal(setSearchModalVisible); // Ferme après recherche
  }, [searchInput, documentsDonnes]);

  const appuyerPhoto = useCallback((doc) => {
    setDocumentChoisi(doc);
    setPhotoModalVisible(true);
  }, []);

  const ouvrirModalAjoutDocument = useCallback(() => {
    // ... (inchangé)
  }, [userRedux.role, dispatch]);

  const closePhotoModal = useCallback(() => {
    closeModal(setPhotoModalVisible);
    setDocumentChoisi(null);
  }, []);

  const closeSearchModal = useCallback(() => {
    closeModal(setSearchModalVisible);
    setSearchInput("");
    setAfficherRechercheScrollView(false);
  }, []);

  return {
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
    searchDocuments,
    setSearchInput, // Ajouté pour SearchModal
    closePhotoModal, // Centralisé
    closeSearchModal, // Centralisé
  };
};
