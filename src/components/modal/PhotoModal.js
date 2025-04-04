// src/components/modal/PhotoModal.js
import React from "react";
import FormModal from "../shared/FormModal";
import PhotoContent from "./PhotoContent";
import CustomButton from "../shared/CustomButton";

export default function PhotoModal({
  visible,
  documentChoisi,
  onClose,
  ouvrirModalStocker,
}) {
  const photoUri = documentChoisi?.url?.[0] || null;

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title="Prévisualisation de la photo"
      formContent={<PhotoContent documentChoisi={{ url: [photoUri] }} />}
      actions={
        <>
          <CustomButton title="Stocker" onPress={ouvrirModalStocker} />
          <CustomButton title="Annuler" onPress={onClose} />
        </>
      }
    />
  );
}
