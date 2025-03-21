import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ajouterPhoto } from "../../../reducers/document";
import styles from "../../styles/TemplateStyles/VwStockerImageStyles";

export default function VwStockerImage(props) {
  const dispatch = useDispatch();
  const documentRedux = useSelector((state) => state.document.value);

  const stockerPhoto = () => {
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri: props.photoCacheUri,
      name: `photo_${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/document/uploadPhoto`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((resJson) => {
        dispatch(ajouterPhoto(resJson.url));
        props.fermerModalStockerImage();
        props.navigation.navigate("TabNavigator", { screen: "Documents" });
      });
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBackground}>
        <Text style={styles.textMessage}>Vouliez-vous garder l'image? </Text>

        <View style={styles.photoContainer}>
          <Image
            source={{ uri: props.photoCacheUri }}
            style={styles.imgElemStyle}
          />
        </View>

        <TouchableOpacity
          onPress={() => stockerPhoto()}
          style={styles.btnModal}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Oui</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.fermerModalStockerImage}
          style={styles.btnModal}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Non</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
