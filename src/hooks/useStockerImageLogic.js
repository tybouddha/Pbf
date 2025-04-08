// hooks/useStockerImageLogic.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ajouterPhoto } from "../reducers/document";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric.ts";

export const useStockerImageLogic = ({
  photoCacheUri,
  navigation,
  onClose,
}) => {
  const dispatch = useDispatch();
  const closeModal = useCloseModalGeneric();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const stockerPhoto = useCallback(async () => {
    if (!photoCacheUri) {
      setErrorMessage("Aucune photo à stocker");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri: photoCacheUri,
      name: `photo_${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/document/uploadPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );
      const resJson = await response.json();
      if (resJson.url) {
        dispatch(ajouterPhoto(resJson.url));
        navigation.navigate("TabNavigator", { screen: "Documents" });
        closeModal(onClose); // Ferme la modale après succès
      } else {
        setErrorMessage(resJson.error || "Erreur lors de l’upload");
      }
    } catch (error) {
      setErrorMessage("Erreur réseau : " + error.message);
    } finally {
      setIsUploading(false);
    }
  }, [photoCacheUri, dispatch, navigation, onClose]);

  const closeModalGeneric = useCallback(() => {
    closeModal(onClose);
  }, [onClose]);

  return {
    errorMessage,
    isUploading,
    stockerPhoto,
    closeModalGeneric,
  };
};
