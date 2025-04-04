// src/screens/CameraScreen.js
import React from "react";
import { View, Text } from "react-native";
import { CameraView } from "expo-camera"; // Nouvelle importation
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useCameraLogic } from "../hooks/useCameraLogic";
import CustomButton from "../components/shared/CustomButton";
import VwStockerImage from "../components/Template/VwStockerImage";
import PhotoModal from "../components/modal/PhotoModal";
import styles from "../styles/screenStyles/CameraScreenStyles";
import { globalStyles } from "../styles/GlobalStyles";

console.log("CameraView importé :", CameraView); // Vérifie l'importation

export default function CameraScreen({ navigation }) {
  const {
    hasPermission,
    isFocused,
    type,
    flashMode,
    modalStockerVisible,
    photoCacheUri,
    cameraRef,
    errorMessage,
    photoModalVisible,
    setType,
    setFlashMode,
    takePicture,
    fermerModalStockerImage,
    ouvrirModalStocker,
    fermerPhotoModal,
  } = useCameraLogic(navigation);

  if (hasPermission === null) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.textColor}>
          Vérification des permissions...
        </Text>
      </View>
    );
  }

  if (!hasPermission || !isFocused) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.errorText}>
          {errorMessage || "Accès à la caméra refusé ou écran non actif"}
        </Text>
      </View>
    );
  }

  if (type === null || flashMode === null) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.textColor}>
          Initialisation de la caméra...
        </Text>
      </View>
    );
  }

  return (
    <>
      <FontAwesome
        name="star"
        size={50}
        color="red"
        style={{ position: "absolute", top: 20, left: 20 }}
      />
      <CameraView
        facing={type} // "facing" remplace "type"
        flash={flashMode} // "flash" remplace "flashMode"
        ref={(ref) => (cameraRef.current = ref)}
        style={styles.camera}
      >
        {errorMessage && (
          <View style={styles.buttonsContainer}>
            <Text style={globalStyles.errorText}>{errorMessage}</Text>
          </View>
        )}
        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Documents" })
            }
          >
            <FontAwesome name="arrow-left" size={25} color="#ffffff" />
          </CustomButton>
          <CustomButton
            onPress={() => setType(type === "back" ? "front" : "back")}
          >
            <FontAwesome name="rotate-right" size={25} color="#ffffff" />
          </CustomButton>
          <CustomButton
            onPress={() => setFlashMode(flashMode === "off" ? "torch" : "off")}
          >
            <FontAwesome
              name="flash"
              size={25}
              color={flashMode === "off" ? "#ffffff" : "#e8be4b"}
            />
          </CustomButton>
        </View>
        <View style={styles.snapContainer}>
          <CustomButton onPress={takePicture}>
            <FontAwesome name="circle-thin" size={95} color="#ffffff" />
          </CustomButton>
        </View>
      </CameraView>
      <PhotoModal
        visible={photoModalVisible}
        documentChoisi={{ url: [photoCacheUri] }}
        onClose={fermerPhotoModal}
        ouvrirModalStocker={ouvrirModalStocker}
      />
      <VwStockerImage
        photoCacheUri={photoCacheUri}
        navigation={navigation}
        visible={modalStockerVisible}
        onClose={fermerModalStockerImage}
      />
    </>
  );
}
