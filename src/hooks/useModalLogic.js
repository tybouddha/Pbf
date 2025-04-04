// src/hooks/useModalLogic.js
import { useCallback } from "react";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

export const useModalLogic = () => {
  const closeModal = useCloseModalGeneric();

  const openModal = useCallback((setModalVisible) => {
    setModalVisible(true);
  }, []);

  const closeModalHandler = useCallback(
    (setModalVisible) => {
      closeModal(setModalVisible);
    },
    [closeModal]
  );

  return { openModal, closeModal: closeModalHandler };
};
