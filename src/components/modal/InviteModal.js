import {
  Modal,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "../../styles/modalStyles/AccueilStyles";

const InviteModal = ({ visible, onClose, role, setRole, link, onGenerate }) => {
  const toggleSwitch = () =>
    setRole(role === "lecteur" ? "editeur" : "lecteur");

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
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
          <TouchableOpacity style={styles.btnModal} onPress={onGenerate}>
            <Text style={styles.textButton}>Générer le code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnModal} onPress={onClose}>
            <Text style={styles.textButton}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InviteModal;
