// src/hooks/useCameraLogic.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "expo-camera"; // Pour les permissions
import { useIsFocused } from "@react-navigation/native";
import { documentModalRestOuvert } from "../reducers/document";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

export const useCameraLogic = (navigation) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const documentRedux = useSelector((state) => state.document.value);
  const closeModalGeneric = useCloseModalGeneric();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(null);
  const [flashMode, setFlashMode] = useState(null);
  const [modalStockerVisible, setModalStockerVisible] = useState(false);
  const [photoCacheUri, setPhotoCacheUri] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const cameraRef = useRef(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

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
      } catch (error) {
        setErrorMessage(
          "Erreur lors de la demande de permissions : " + error.message
        );
        console.log("Erreur dans useEffect:", error.message);
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
    } catch (error) {
      setErrorMessage("Erreur lors de la prise de photo : " + error.message);
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
