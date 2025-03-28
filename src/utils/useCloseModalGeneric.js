import { useCallback } from "react";

export const closeModalGeneric = (setModalState) => {
  if (typeof setModalState !== "function") {
    throw new Error("setModalState must be a function");
  }
  setModalState(false);
};

// Version avec useCallback si utilisée dans un hook
export const useCloseModalGeneric = () =>
  useCallback((setModalState) => {
    if (typeof setModalState !== "function") {
      throw new Error("setModalState must be a function");
    }
    setModalState(false);
  }, []);
