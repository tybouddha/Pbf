import { Modal, View, Switch, Text } from "react-native";
import CustomButton from "../shared/CustomButton";
import CustomTextInput from "../shared/CustomTextInput";
import styles from "../../styles/modalStyles/AccueilStyles";

const InviteModal = ({ visible, onClose, role, setRole, link, onGenerate }) => {
  const toggleSwitch = () =>
    setRole(role === "lecteur" ? "editeur" : "lecteur");

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomTextInput
            placeholder="Lien d'invitation"
            value={link}
            style={styles.input}
          />
          <Text style={styles.textrole}>{role}</Text>
          <View style={styles.switchContainer}>
            <Text>Assigner un rôle</Text>
            <Switch
              thumbColor={role === "lecteur" ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="black"
              onValueChange={toggleSwitch}
              value={role === "lecteur"}
            />
          </View>
          <CustomButton
            title="Générer le code"
            onPress={onGenerate}
          ></CustomButton>
          <CustomButton title="Fermer" onPress={onClose}></CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default InviteModal;
