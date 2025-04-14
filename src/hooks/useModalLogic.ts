import { useCallback } from "react";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

type SetModalVisibleType = React.Dispatch<React.SetStateAction<boolean>>;

type ModalLogicType = {
  openModal: (setModalVisible: SetModalVisibleType) => void;
  closeModal: (setModalVisible: SetModalVisibleType) => void;
};

export const useModalLogic = (): ModalLogicType => {
  const closeModal = useCloseModalGeneric();

  const openModal = (setModalVisible: SetModalVisibleType) => {
    setModalVisible(true);
  };

  const closeModalHandler = useCallback(
    (setModalVisible: SetModalVisibleType) => {
      closeModal(setModalVisible);
    },
    [closeModal]
  );

  return { openModal, closeModal: closeModalHandler };
};
