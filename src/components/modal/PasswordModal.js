import React from "react";
import { Modal, View, Text } from "react-native";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import { useProfilLogic } from "../../hooks/useProfilLogic";
import styles from "../../styles/modalStyles/PasswordModalStyles";

export default function PasswordModal({ visible, onClose, userToken }) {
  const {
    password,
    newPassword,
    setPassword,
    setNewPassword,
    handleUpdatePassword,
  } = useProfilLogic();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalListView}>
          <Text style={styles.modalTitle}>Ancien Mot de Passe</Text>
          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.modalTitle}>Nouveau Mot de Passe</Text>
          <CustomTextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <CustomButton
            title="Sauvegarder"
            onPress={() => handleUpdatePassword(userToken)}
          />
          <CustomButton title="Fermer" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
