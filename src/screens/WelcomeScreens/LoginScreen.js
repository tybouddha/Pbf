import React from "react";
import { View, Text, Switch } from "react-native";
import { useLoginForm } from "../../hooks/useLoginForm";
import GuideModal from "../../components/shared/GuideModal";
import CustomTextInput from "../../components/shared/CustomTextInput";
import CustomButton from "../../components/shared/CustomButton";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";
import styles from "../../styles/screenStyles/LoginScreenStyles";

export default function LoginScreen({ navigation }) {
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
  } = useLoginForm(navigation);

  return (
    <TemplateViewNoNav navigation={navigation} afficherArriére={true}>
      <View style={styles.container}>
        <GuideModal
          visible={modalEchecVisible}
          onClose={() => setModalEchecVisible(false)}
          title="Erreur"
          content={<Text>{messageError}</Text>}
        />
        <View style={styles.vwInstructions}>
          <Text style={styles.txtInstructions}>Connexion</Text>
        </View>
        <View style={styles.vwInputSuper}>
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
            <Text>Afficher le mot de passe</Text>
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
