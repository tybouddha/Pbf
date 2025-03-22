import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useCameraLogic } from "../hooks/useCameraLogic";
import CustomButton from "../components/shared/CustomButton";
import StockerImageModal from "../components/modal/StockerImageModal";
import styles from "../styles/screenStyles/CameraScreenStyles";

export default function CameraScreen({ navigation }) {
  const {
    hasPermission,
    isFocused,
    type,
    flashMode,
    modalStockerVisible,
    photoCacheUri,
    cameraRef,
    setType,
    setFlashMode,
    takePicture,
    fermerModalStockerImage,
  } = useCameraLogic(navigation);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef.current = ref)}
      style={styles.camera}
    >
      <StockerImageModal
        visible={modalStockerVisible}
        onClose={fermerModalStockerImage}
        navigation={navigation}
        photoCacheUri={photoCacheUri}
      />
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Documents" })
          }
          // style={styles.button}
        >
          <FontAwesome name="arrow-left" size={25} color="#ffffff" />
        </CustomButton>

        <CustomButton
          onPress={() => setType(type === "back" ? "front" : "back")}
          // style={styles.button}
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
    </Camera>
  );
}
