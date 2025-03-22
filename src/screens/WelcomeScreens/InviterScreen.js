import React from "react";
import { View, Text, Switch, Modal } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../reducers/user";
import { useInviteForm } from "../../hooks/useInviteForm";
import CustomTextInput from "../../components/shared/CustomTextInput";
import CustomButton from "../../components/shared/CustomButton";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";
import VwEchec from "../../components/Template/VwEchec";
import styles from "../../styles/screenStyles/InviterScreenStyles";

export default function InviterScreen({ navigation }) {
  const {
    formData,
    updateFormData,
    cachePassword,
    setCachePassword,
    modalEchecVisible,
    setModalEchecVisible,
    messageError,
    submitForm,
    isSubmitting,
  } = useInviteForm(navigation);

  return (
    <TemplateViewNoNav navigation={navigation} afficherArriére={true}>
      <View style={styles.container}>
        <Modal visible={modalEchecVisible} animationType="fade" transparent>
          <VwEchec
            closeModal={() => setModalEchecVisible(false)}
            messageError={messageError}
          />
        </Modal>
        <View style={styles.vwInstructions}>
          <Text style={styles.txtInstructions}>Invité</Text>
        </View>
        <View style={styles.vwInputSuper}>
          <CustomTextInput
            placeholder="Ajouter lien d'invitation"
            value={formData.link}
            onChangeText={updateFormData("link")}
          />
          <CustomTextInput
            placeholder="Pseudonyme"
            value={formData.username}
            onChangeText={updateFormData("username")}
          />
          <CustomTextInput
            placeholder="Mot de passe"
            value={formData.password}
            onChangeText={updateFormData("password")}
            secureTextEntry={!cachePassword}
          />
          <View style={styles.switchCachePassword}>
            <Text>Afficher mot de passe</Text>
            <Switch value={cachePassword} onValueChange={setCachePassword} />
          </View>
        </View>
        <CustomButton
          title="Connexion"
          onPress={submitForm}
          disabled={isSubmitting}
        />
      </View>
    </TemplateViewNoNav>
  );
}
