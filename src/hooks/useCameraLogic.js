import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "expo-camera"; // Import simplifié
import { useIsFocused } from "@react-navigation/native";
import { documentModalRestOuvert } from "../../reducers/document";
import { useCloseModalGeneric } from "../components/shared/useCloseModalGeneric";

export const useCameraLogic = (navigation) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const documentRedux = useSelector((state) => state.document.value);
  const closeModalGeneric = useCloseModalGeneric();

  const [hasPermission, setHasPermission] = useState(null); // null = en attente
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [modalStockerVisible, setModalStockerVisible] = useState(false);
  const [photoCacheUri, setPhotoCacheUri] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const cameraRef = useRef(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  // Demande de permissions au montage
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        setErrorMessage("Permission d’accès à la caméra refusée");
      }
    })();
  }, []);

  // Prendre une photo
  const takePicture = useCallback(async () => {
    if (!cameraRef.current) {
      setErrorMessage("Erreur : caméra non disponible");
      return;
    }
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      setPhotoCacheUri(photo.uri);
      setPhotoModalVisible(true); // Ouvre PhotoModal au lieu de modalStockerVisible
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Erreur lors de la prise de photo : " + error.message);
    }
  }, [dispatch]);

  // Fermer la modale de stockage
  const fermerModalStockerImage = useCallback(() => {
    closeModalGeneric(() => {
      setModalStockerVisible(false);
      setPhotoCacheUri(null); // Nettoie l’URI
    });
  }, []);

  const ouvrirModalStocker = useCallback(() => {
    setPhotoModalVisible(false); // Ferme PhotoModal
    dispatch(documentModalRestOuvert());
    setModalStockerVisible(true); // Ouvre VwStockerImage
  }, [dispatch]);

  return {
    photoModalVisible,
    fermerPhotoModal,
    ouvrirModalStocker,
    hasPermission,
    isFocused,
    type,
    flashMode,
    modalStockerVisible,
    photoCacheUri,
    cameraRef,
    errorMessage, // Ajouté pour affichage
    setType,
    setFlashMode,
    takePicture,
    fermerModalStockerImage,
  };
};
