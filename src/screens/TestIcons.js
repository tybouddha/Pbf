// src/screens/TestIcons.js
import React from "react";
import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function TestIcons() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Test des icônes</Text>
      <FontAwesome name="star" size={50} color="red" />
      <FontAwesome name="arrow-left" size={25} color="blue" />
    </View>
  );
}
