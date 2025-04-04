import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import FormModal from "../shared/FormModal";
import styles from "../../styles/TemplateStyles/VwAjouterDocumentStyles";
import { globalStyles } from "../../styles/GlobalStyles";
import { useAjouterDocumentLogic } from "../../hooks/useAjouterDocumentLogic";

export default function VwAjouterDocument({
  navigation,
  fetchDocumentsData,
  visible,
  onClose,
}) {
  const {
    nom,
    setNom,
    practicien,
    setPracticien,
    notes,
    setNotes,
    errorMessage,
    imagesArr,
    handleCameraPress,
    handleSubmit,
    closeModalGeneric,
  } = useAjouterDocumentLogic({ navigation, fetchDocumentsData, onClose });

  const photoElements = imagesArr.map(({ uri, index }) => (
    <View key={index} style={styles.photoContainer}>
      <CustomButton
        onPress={() =>
          dispatch({ type: "document/removePhoto", payload: index })
        }
      >
        <FontAwesome name="times" size={20} color="red" />
      </CustomButton>
      <Image source={{ uri }} style={styles.imgElemStyle} />
    </View>
  ));

  const formContent = (
    <View style={styles.modalBackground}>
      <View style={styles.vwHaut}>
        <Text style={styles.txtTitre}>Ajouter un document</Text>
      </View>
      <View style={styles.vwAuMileu}>
        {errorMessage && (
          <Text style={globalStyles.errorText}>{errorMessage}</Text>
        )}
        <View style={styles.vwInputSuper}>
          <CustomTextInput
            style={styles.listItem}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
          />
        </View>
        <View style={styles.vwInputSuper}>
          <CustomTextInput
            style={styles.listItem}
            placeholder="Practicien"
            value={practicien}
            onChangeText={setPracticien}
          />
        </View>
        <View style={styles.vwInputSuperNotes}>
          <CustomTextInput
            style={styles.listItem}
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
      {photoElements.length > 0 && (
        <View style={styles.vwInputPhotos}>{photoElements}</View>
      )}
      <View style={styles.vwButonsEnBas}>
        <CustomButton
          onPress={handleCameraPress}
          style={styles.btnAjouter}
          activeOpacity={0.8}
        >
          <Text style={styles.btnAjouterText}>Caméra</Text>
        </CustomButton>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.btn}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Soumettre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => closeModalGeneric(onClose)}
          style={styles.btn}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FormModal
      title="Ajouter un document"
      visible={visible}
      onClose={onClose}
      formContent={formContent}
    />
  );
}
