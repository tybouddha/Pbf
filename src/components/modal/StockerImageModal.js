import React from "react";
import { Modal } from "react-native";
import VwStockerImage from "../Template/VwStockerImage";

const StockerImageModal = ({ visible, onClose, navigation, photoCacheUri }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <VwStockerImage
        fermerModalStockerImage={onClose}
        navigation={navigation}
        photoCacheUri={photoCacheUri}
      />
    </Modal>
  );
};

export default StockerImageModal;
