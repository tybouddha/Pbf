// components/PhotoContent.js
import React from "react";
import { View, Image, Text } from "react-native";
import styles from "../../styles/modalStyles/PhotoModalStyles";

const PhotoContent = ({ documentChoisi }) => {
  if (!documentChoisi || !documentChoisi.url || !documentChoisi.url[0]) {
    return <Text>Aucune photo disponible</Text>;
  }

  return (
    <View style={styles.photoContentContainer}>
      <Image
        source={{ uri: documentChoisi.url[0] }}
        style={styles.photoImage}
      />
    </View>
  );
};

export default PhotoContent;
