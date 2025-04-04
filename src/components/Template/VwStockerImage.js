import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FormModal from "../shared/FormModal";
import styles from "../../styles/TemplateStyles/VwStockerImageStyles";
import CustomButton from "../shared/CustomButton";
import { globalStyles } from "../../styles/GlobalStyles";
import { useStockerImageLogic } from "../../hooks/useStockerImageLogic";

export default function VwStockerImage({
  photoCacheUri,
  navigation,
  visible,
  onClose,
}) {
  const { errorMessage, stockerPhoto, closeModalGeneric } =
    useStockerImageLogic({
      photoCacheUri,
      navigation,
      onClose,
    });

  const formContent = (
    <View style={styles.modalBackground}>
      <Text style={styles.textMessage}>Vouliez-vous garder l'image ?</Text>
      {errorMessage && (
        <Text style={globalStyles.errorText}>{errorMessage}</Text>
      )}
      <View style={styles.photoContainer}>
        <Image source={{ uri: photoCacheUri }} style={styles.imgElemStyle} />
      </View>
      <CustomButton
        onPress={stockerPhoto}
        style={styles.btnModal}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Oui</Text>
      </CustomButton>
      <CustomButton
        onPress={() => closeModalGeneric(onClose)}
        style={styles.btnModal}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Non</Text>
      </CustomButton>
    </View>
  );

  return (
    <FormModal
      title="Stocker l'image"
      visible={visible}
      onClose={onClose}
      formContent={formContent}
    />
  );
}
