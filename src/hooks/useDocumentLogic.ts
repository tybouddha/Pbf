import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import {
  documentModalRestOuvert,
  documentModalResterFermer,
  sauvegarderDocumentInfos,
  supprimerTousLesPhotos,
} from "../reducers/document";
import { useModalLogic } from "../hooks/useModalLogic";
import { DocumentPhotoType } from "../reducers/document";
import { RootState } from "../../store";

// Typage de la navigation
type NavigationType = NavigationProp<any>;

// Typage des données utilisateur depuis Redux
type UserValueType = {
  token: string | null;
  tokenProject: string | null;
  role: string | null;
};

// Typage des données du document depuis Redux
type DocumentValueType = {
  nom: string | null;
  practicien: string | null;
  notes: string | null;
  photos: DocumentPhotoType[];
  modalOuvert: boolean;
};

// Typage d'un document individuel (données récupérées via fetch)
type DocumentItemType = {
  _id: string;
  nom: string | null;
  practicien: string | null;
  notes: string | null;
  dateAjoute: string | null;
  photos?: DocumentPhotoType[];
};

// Typage de la réponse API pour fetchData
type FetchDocumentsResponseType = {
  documentsData: DocumentItemType[];
};

// Typage de la réponse API pour suppression
type DeleteDocumentResponseType = {
  result: boolean;
  error?: string;
};

// Typage du retour du hook
type DocumentLogicReturnType = {
  documentRedux: DocumentValueType;
  documentsDonnes: DocumentItemType[];
  documentsDonnesRecherche: DocumentItemType[];
  documentChoisi: DocumentItemType | null;
  searchModalVisible: boolean;
  photoModalVisible: boolean;
  afficherRechercheScrollView: boolean;
  isSearchActive: boolean;
  errorMessage: string | null;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
  fermerModalVwAjouterDoc: () => void;
  cameraScreenFermerModalSansEffacerRedux: () => void;
  poubelleAppuyee: (elem: DocumentItemType) => Promise<void>;
  appuyerPhoto: (doc: DocumentItemType) => void;
  ouvrirModalAjoutDocument: () => void;
  searchDocuments: () => void;
  closePhotoModal: () => void;
  closeSearchModal: () => void;
  openSearchModal: () => void;
  resetSearch: () => void;
};

// Définition du hook avec typage
export const useDocumentLogic = (
  navigation: NavigationType
): DocumentLogicReturnType => {
  const userRedux: UserValueType = useSelector<RootState, UserValueType>(
    (state) => state.user.value
  );
  const documentRedux: DocumentValueType = useSelector<
    RootState,
    DocumentValueType
  >((state) => state.document.value);
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModalLogic();

  const [documentsDonnes, setDocumentsDonnes] = useState<DocumentItemType[]>(
    []
  );
  const [documentsDonnesRecherche, setDocumentsDonnesRecherche] = useState<
    DocumentItemType[]
  >([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false);
  const [afficherRechercheScrollView, setAfficherRechercheScrollView] =
    useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [documentChoisi, setDocumentChoisi] = useState<DocumentItemType | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    if (!userRedux.tokenProject) {
      setErrorMessage("Erreur : token de projet manquant");
      return;
    }
    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/document/${userRedux.tokenProject}`
    )
      .then(
        (response) => response.json() as Promise<FetchDocumentsResponseType>
      )
      .then((data) => {
        const array = data.documentsData || [];
        setDocumentsDonnes(array);
        setDocumentsDonnesRecherche(array);
        setErrorMessage(null);
      })
      .catch((error: Error) =>
        setErrorMessage("Erreur fetchData : " + error.message)
      );
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
    async (elem: DocumentItemType): Promise<void> => {
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
        const data = (await response.json()) as DeleteDocumentResponseType;
        if (data.result) {
          fetchData();
          setErrorMessage(null);
        } else {
          setErrorMessage(data.error || "Erreur lors de la suppression");
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error ? error.message : "Erreur réseau";
        console.error("Erreur réseau:", errorMsg);
        setErrorMessage("Erreur réseau : " + errorMsg);
      }
    },
    [userRedux.role, fetchData]
  );

  const appuyerPhoto = useCallback((doc: DocumentItemType): void => {
    setDocumentChoisi(doc);
    setPhotoModalVisible(true);
  }, []);

  const ouvrirModalAjoutDocument = useCallback((): void => {
    if (userRedux.role === "lecteur") {
      setErrorMessage("Accès bloqué : rôle lecteur uniquement");
    } else {
      dispatch(documentModalRestOuvert());
    }
  }, [userRedux.role, dispatch]);

  const closePhotoModal = useCallback((): void => {
    closeModal(setPhotoModalVisible);
    setDocumentChoisi(null);
  }, [closeModal]);

  const searchDocuments = useCallback((): void => {
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
  }, [searchInput, documentsDonnes]);

  const openSearchModal = useCallback((): void => {
    openModal(setSearchModalVisible);
  }, [openModal]);

  const closeSearchModal = useCallback((): void => {
    closeModal(setSearchModalVisible);
    setSearchInput("");
    setAfficherRechercheScrollView(false);
  }, [closeModal]);

  const resetSearch = useCallback((): void => {
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
