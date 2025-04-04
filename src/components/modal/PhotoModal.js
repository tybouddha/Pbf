import React from "react";
import { Image, Text } from "react-native";
import FormModal from "../shared/FormModal";
import CustomButton from "../shared/CustomButton";
import styles from "../../styles/modalStyles/PhotoModalStyles";

const PhotoModal = ({
  visible,
  documentChoisi,
  onClose,
  ouvrirModalStocker,
}) => {
  const formContent =
    documentChoisi?.url?.length > 0 ? (
      <Image source={{ uri: documentChoisi.url[0] }} style={styles.image} />
    ) : (
      <Text>Aucune image disponible</Text>
    );

  const actions = (
    <>
      <CustomButton title="Stocker" onPress={ouvrirModalStocker} />
      <CustomButton title="Fermer" onPress={onClose} />
    </>
  );

  return (
    <FormModal
      visible={visible}
      onClose={onClose}
      title="Photo du document"
      formContent={formContent}
      actions={actions}
    />
  );
};

export default PhotoModal;
