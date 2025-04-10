import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect, NavigationProp } from "@react-navigation/native";
import { DocumentPhotoType } from "../reducers/document";
import { RootState } from "../../store";
import {
  sauvegarderDocumentInfos,
  documentModalRestOuvert,
} from "../reducers/document";
import {
  useCloseModalGeneric,
  SetModalStateType,
} from "../utils/useCloseModalGeneric";

type NavigationType = NavigationProp<any>;

type DocumentValueType = {
  nom: string | null;
  practicien: string | null;
  notes: string | null;
  photos: DocumentPhotoType[];
  modalOuvert: boolean;
};

type UserValueType = {
  token: string | null;
  tokenProject: string | null;
};

type AjouterDocumentLogicReturn = {
  nom: string;
  setNom: React.Dispatch<React.SetStateAction<string>>;
  practicien: string;
  setPracticien: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string | null;
  imagesArr: {
    uri: string; // Corrigé de DocumentPhotoType à string
    index: number;
  }[];
  handleCameraPress: () => void;
  handleSubmit: () => Promise<void>;
  closeModalGeneric: (setModalState: SetModalStateType) => void;
};

export const useAjouterDocumentLogic = ({
  navigation,
  fetchDocumentsData,
  onClose,
}: {
  navigation: NavigationType;
  fetchDocumentsData: () => void;
  onClose: SetModalStateType;
}): AjouterDocumentLogicReturn => {
  const documentRedux: DocumentValueType = useSelector<
    RootState,
    DocumentValueType
  >((state) => state.document.value);
  const userRedux: UserValueType = useSelector<RootState, UserValueType>(
    (state) => state.user.value
  );
  const dispatch = useDispatch();
  const closeModalGeneric = useCloseModalGeneric();

  const [nom, setNom] = useState<string>("");
  const [practicien, setPracticien] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      uri: elem.url, // Corrigé pour utiliser elem.url
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
      url: documentRedux.photos.map((photo) => photo.url), // Corrigé pour envoyer un tableau d'URLs
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
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : "Erreur inconnue";
      console.error("Erreur réseau :", errorMsg);
      setErrorMessage("Erreur réseau : " + errorMsg);
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
