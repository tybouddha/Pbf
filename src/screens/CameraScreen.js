import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";

import { useDispatch, useSelector } from "react-redux";
import { documentModalRestOuvert } from "../reducers/document";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import VwStockerImage from "./template/VwStockerImage";

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [modalStockerVisible, setModalStockerVisible] = useState(false);
  const [photoCacheUri, setPhotoCacheUri] = useState("");
  const documentRedux = useSelector((state) => state.document.value);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      console.log("CameraScreen useEffect");
      const result = await Camera.requestCameraPermissionsAsync();

      console.log("documentRedux.nom: ", documentRedux.nom);
      console.log("documentRedux.practicien: ", documentRedux.practicien);
      if (result) {
        setHasPermission(result.status === "granted");
        console.log("reussite");
      } else {
        console.log("echeur");
      }
    })();
  }, []);

  const fermerModalStockerImage = () => setModalStockerVisible(false);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    setPhotoCacheUri(photo?.uri);

    console.log("leaving Camera Screen, and documentModalRestOuvert ");
    dispatch(documentModalRestOuvert());
    setModalStockerVisible(true);
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const modalStocker = (
    <Modal
      visible={modalStockerVisible}
      animationType="fade"
      transparent={true}
    >
      <VwStockerImage
        fermerModalStockerImage={fermerModalStockerImage}
        // fermerModalSansEffacer={cameraScreenFermerModalSansEffacerRedux}
        navigation={navigation}
        // fetchDocumentsData={fetchData}
        photoCacheUri={photoCacheUri}
      />
    </Modal>
  );

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
    >
      {modalStocker ? modalStocker : null}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          // onPress={() => navigation.navigate("Documents")}
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Documents" })
          }
          style={styles.button}
        >
          <FontAwesome name="arrow-left" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => cameraRef && takePicture()}>
          <FontAwesome name="circle-thin" size={95} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
});
