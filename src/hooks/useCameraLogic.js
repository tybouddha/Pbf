import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { documentModalRestOuvert } from "../../reducers/document";

export const useCameraLogic = (navigation) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const documentRedux = useSelector((state) => state.document.value);

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [modalStockerVisible, setModalStockerVisible] = useState(false);
  const [photoCacheUri, setPhotoCacheUri] = useState("");
  const cameraRef = useRef(null);

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
        console.log("echec");
      }
    })();
  }, []);

  const fermerModalStockerImage = () => setModalStockerVisible(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      setPhotoCacheUri(photo?.uri);
      console.log("leaving Camera Screen, and documentModalRestOuvert ");
      dispatch(documentModalRestOuvert());
      setModalStockerVisible(true);
    }
  };

  return {
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
  };
};
