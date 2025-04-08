import { useCallback } from "react";

export type SetModalStateType = React.Dispatch<React.SetStateAction<boolean>>;

export const closeModalGeneric = (setModalState: SetModalStateType) => {
  if (typeof setModalState !== "function") {
    throw new Error("setModalState must be a function");
  }
  setModalState(false);
};

// Version avec useCallback si utilisée dans un hook
export const useCloseModalGeneric = () =>
  useCallback((setModalState: SetModalStateType) => {
    if (typeof setModalState !== "function") {
      throw new Error("setModalState must be a function");
    }
    console.log("closeModal appelé avec setModalVisible");
    setModalState(false);
  }, []);
