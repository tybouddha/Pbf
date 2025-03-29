import React from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useCameraLogic } from "../hooks/useCameraLogic";
import CustomButton from "../components/shared/CustomButton";
import VwStockerImage from "../components/Template/VwStockerImage";
import styles from "../styles/screenStyles/CameraScreenStyles";
import { globalStyles } from "../styles/globalStyles";

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
    setType,
    setFlashMode,
    takePicture,
    fermerModalStockerImage,
  } = useCameraLogic(navigation);

  // État de chargement des permissions
  if (hasPermission === null) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.textColor}>
          Vérification des permissions...
        </Text>
      </View>
    );
  }

  // Pas de permission ou écran non actif
  if (!hasPermission || !isFocused) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.errorText}>
          {errorMessage || "Accès à la caméra refusé ou écran non actif"}
        </Text>
      </View>
    );
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef.current = ref)}
      style={styles.camera}
    >
      {errorMessage && (
        <View style={styles.buttonsContainer}>
          <Text style={globalStyles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <VwStockerImage
        photoCacheUri={photoCacheUri}
        navigation={navigation}
        visible={modalStockerVisible}
        onClose={fermerModalStockerImage}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Documents" })
          }
        >
          <FontAwesome name="arrow-left" size={25} color="#ffffff" />
        </CustomButton>
        <CustomButton
          onPress={() =>
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </CustomButton>
        <CustomButton
          onPress={() =>
            setFlashMode(
              flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <FontAwesome
            name="flash"
            size={25}
            color={
              flashMode === Camera.Constants.FlashMode.off
                ? "#ffffff"
                : "#e8be4b"
            }
          />
        </CustomButton>
      </View>
      <View style={styles.snapContainer}>
        <CustomButton onPress={takePicture}>
          <FontAwesome name="circle-thin" size={95} color="#ffffff" />
        </CustomButton>
      </View>
    </Camera>
  );
}
