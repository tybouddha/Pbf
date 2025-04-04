import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  documentModalRestOuvert,
  documentModalResterFermer,
  sauvegarderDocumentInfos,
  supprimerTousLesPhotos,
} from "../reducers/document";
import { useModalLogic } from "../hooks/useModalLogic";

export const useDocumentLogic = (navigation) => {
  const userRedux = useSelector((state) => state.user.value);
  const documentRedux = useSelector((state) => state.document.value);
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModalLogic();

  const [documentsDonnes, setDocumentsDonnes] = useState([]);
  const [documentsDonnesRecherche, setDocumentsDonnesRecherche] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [documentChoisi, setDocumentChoisi] = useState(null);
  const [afficherRechercheScrollView, setAfficherRechercheScrollView] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchData = useCallback(() => {
    if (!userRedux.tokenProject) {
      setErrorMessage("Erreur : token de projet manquant");
      return;
    }
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/document/${userRedux.tokenProject}`
    )
      .then((response) => response.json())
      .then((data) => {
        const array = data.documentsData || [];
        setDocumentsDonnes(array);
        setDocumentsDonnesRecherche(array);
        setErrorMessage(null);
      })
      .catch((error) => setErrorMessage("Erreur fetchData : " + error.message));
  }, [userRedux.tokenProject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fermerModalVwAjouterDoc = useCallback(() => {
    dispatch(sauvegarderDocumentInfos({ nom: "", practicien: "", notes: "" }));
    dispatch(supprimerTousLesPhotos());
    dispatch(documentModalResterFermer());
  }, [dispatch]);

  const cameraScreenFermerModalSansEffacerRedux = useCallback(() => {
    dispatch(documentModalResterFermer());
  }, [dispatch]);

  const poubelleAppuyee = useCallback(
    async (elem) => {
      if (userRedux.role === "lecteur") {
        setErrorMessage("Accès bloqué : rôle lecteur uniquement");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/document/${elem._id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.result) {
          fetchData();
          setErrorMessage(null);
        } else {
          setErrorMessage(data.error || "Erreur lors de la suppression");
        }
      } catch (error) {
        setErrorMessage("Erreur réseau : " + error.message);
      }
    },
    [userRedux.role, fetchData]
  );

  const appuyerPhoto = useCallback((doc) => {
    setDocumentChoisi(doc);
    setPhotoModalVisible(true);
  }, []);

  const ouvrirModalAjoutDocument = useCallback(() => {
    if (userRedux.role === "lecteur") {
      setErrorMessage("Accès bloqué : rôle lecteur uniquement");
    } else {
      dispatch(documentModalRestOuvert());
    }
  }, [userRedux.role, dispatch]);

  const closePhotoModal = useCallback(() => {
    closeModal(setPhotoModalVisible);
    setDocumentChoisi(null);
  }, []);

  const searchDocuments = useCallback(() => {
    setAfficherRechercheScrollView(true);
    const normalizedSearch = searchInput.trim().toLowerCase();
    const newDocumentsDonnes = documentsDonnes.filter((doc) =>
      [doc.nom, doc.practicien, doc.notes, doc.dateAjoute].some((field) =>
        field?.toLowerCase().includes(normalizedSearch)
      )
    );
    console.log("Résultats filtrés :", newDocumentsDonnes);
    setDocumentsDonnesRecherche(newDocumentsDonnes);
    setIsSearchActive(true);
    // Ne ferme pas la modale ici : l'utilisateur verra les résultats
  }, [searchInput, documentsDonnes]);

  const openSearchModal = useCallback(
    () => openModal(setSearchModalVisible),
    [openModal]
  );
  const closeSearchModal = useCallback(() => {
    closeModal(setSearchModalVisible);
    setSearchInput("");
    setAfficherRechercheScrollView(false);
  }, [closeModal]);

  const resetSearch = useCallback(() => {
    setSearchInput("");
    setDocumentsDonnesRecherche(documentsDonnes);
    setIsSearchActive(false);
  }, [documentsDonnes]);

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
    setSearchInput,
    closePhotoModal,
    closeSearchModal,
    openSearchModal,
    isSearchActive,
    resetSearch,
    searchInput,
  };
};
