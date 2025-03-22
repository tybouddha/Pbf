import React from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import styles from "../../styles/modalStyles/PhotoModalStyles";

export default function PhotoModal({ visible, documentChoisi, onClose }) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.photoModalContainer}>
        {documentChoisi && (
          <Image
            source={{ uri: documentChoisi.url[0] }}
            style={{
              width: Dimensions.get("screen").width * 0.8,
              height: Dimensions.get("screen").height * 0.8,
            }}
          />
        )}
        <TouchableOpacity onPress={onClose} style={styles.btnModal}>
          <Text style={styles.textButton}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
