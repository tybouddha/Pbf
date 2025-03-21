import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/TemplateStyles/VwEchecStyles";

export default function VwEchec(props) {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBackground}>
        <Text style={styles.textMessage}>{props.messageError}</Text>
        <TouchableOpacity
          onPress={props.closeModal}
          style={styles.btnModal}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
