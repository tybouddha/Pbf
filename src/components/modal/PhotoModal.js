// components/PhotoModal.js
import React from "react";
import FormModal from "./shared/FormModal";
import PhotoContent from "./PhotoContent";
import CustomButton from "../shared/CustomButton";

export default function PhotoModal({ visible, documentChoisi, onClose }) {
  const photoUri = documentChoisi?.url?.[0] || null;

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title="Photo sélectionnée"
      formContent={<PhotoContent documentChoisi={{ url: [photoUri] }} />}
      actions={<CustomButton title="Fermer" onPress={onClose} />}
    />
  );
}
