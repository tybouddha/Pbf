import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, FlashMode } from "expo-camera";
import { useIsFocused, NavigationProp } from "@react-navigation/native";
import { documentModalRestOuvert } from "../reducers/document";
import {
  useCloseModalGeneric,
  SetModalStateType,
} from "../utils/useCloseModalGeneric";
import { DocumentPhotoType } from "../reducers/document";
import { RootState } from "../../store";

type NavigationType = NavigationProp<any>;

type DocumentValueType = {
  nom: string | null;
  practicien: string | null;
  notes: string | null;
  photos: DocumentPhotoType[];
  modalOuvert: boolean;
};

type CameraType = {
  takePictureAsync: (options?: {
    quality?: number;
  }) => Promise<{ uri: string }>;
};

// Type pour le retour du hook (optionnel mais recommandé)
type CameraLogicReturnType = {
  hasPermission: boolean | null;
  isFocused: boolean;
  type: string;
  flashMode: string;
  modalStockerVisible: boolean;
  photoCacheUri: string | null;
  cameraRef: React.MutableRefObject<CameraType | null>;
  errorMessage: string | null;
  photoModalVisible: boolean;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setFlashMode: React.Dispatch<React.SetStateAction<string>>;
  takePicture: () => Promise<void>;
  fermerModalStockerImage: () => void;
  ouvrirModalStocker: () => void;
  fermerPhotoModal: () => void;
};

export const useCameraLogic = (
  navigation: NavigationType
): CameraLogicReturnType => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const documentRedux = useSelector<RootState, DocumentValueType>(
    (state) => state.document.value
  );
  const closeModalGeneric = useCloseModalGeneric();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<string>("back");
  const [flashMode, setFlashMode] = useState<string>("off");
  const [modalStockerVisible, setModalStockerVisible] =
    useState<boolean>(false);
  const [photoCacheUri, setPhotoCacheUri] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cameraRef = useRef<CameraType | null>(null);
  const [photoModalVisible, setPhotoModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      console.log("Début de la demande de permissions");
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("Statut des permissions:", status);
        setHasPermission(status === "granted");
        if (status === "granted") {
          console.log("Permissions accordées, définition de type et flashMode");
          setType("back");
          setFlashMode("off");
          console.log("Type: back, FlashMode: off");
        } else {
          setErrorMessage("Permission d’accès à la caméra refusée");
          console.log("Permissions refusées");
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "Erreur lors de la demande de permissions";
        console.error("Erreur permission :", errorMsg);
        setErrorMessage(
          "Erreur lors de la demande de permissions : " + errorMsg
        );
      }
    })();
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) {
      setErrorMessage("Erreur : caméra non disponible");
      return;
    }
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      setPhotoCacheUri(photo.uri);
      setPhotoModalVisible(true);
      setErrorMessage(null);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erreur lors de la prise de photo";
      console.error("Erreur prise de photo :", errorMsg);
      setErrorMessage("Erreur lors de la prise de photo : " + errorMsg);
    }
  }, []);

  const fermerModalStockerImage = useCallback(() => {
    closeModalGeneric(() => {
      setModalStockerVisible(false);
      setPhotoCacheUri(null);
    });
  }, []);

  const ouvrirModalStocker = useCallback(() => {
    setPhotoModalVisible(false);
    dispatch(documentModalRestOuvert());
    setModalStockerVisible(true);
  }, [dispatch]);

  const fermerPhotoModal = useCallback(() => {
    setPhotoModalVisible(false);
    setPhotoCacheUri(null);
  }, []);

  return {
    hasPermission,
    isFocused,
    type,
    flashMode,
    modalStockerVisible,
    photoCacheUri,
    cameraRef,
    errorMessage,
    photoModalVisible,
    setType,
    setFlashMode,
    takePicture,
    fermerModalStockerImage,
    ouvrirModalStocker,
    fermerPhotoModal,
  };
};
