import React from "react";
import { View, ScrollView, Text, Switch } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import { useSignupForm } from "../../hooks/useSingUpForm"; // Hook extrait dans un fichier séparé
import GuideModal from "../../components/shared/GuideModal";
import CustomTextInput from "../../components/shared/CustomTextInput";
import CustomButton from "../../components/shared/CustomButton";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";
import styles from "../../styles/screenStyles/CreerProjetStyles";

export default function CreerProjetScreen({ navigation }) {
  const {
    formData,
    updateFormData,
    cachePassword,
    setCachePassword,
    modalEchecVisible,
    setModalEchecVisible,
    messageError,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    submitForm,
    isSubmitting,
  } = useSignupForm(navigation);

  return (
    <TemplateViewNoNav navigation={navigation} afficherArriére={true}>
      <View style={styles.container}>
        <GuideModal
          visible={modalEchecVisible}
          onClose={() => setModalEchecVisible(false)}
          title="Erreur"
          content={<Text>{messageError}</Text>}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentView}>
            <Text style={styles.txtInstructions}>Créez votre compte</Text>

            <CustomTextInput
              placeholder="Pseudonyme"
              value={formData.username}
              onChangeText={updateFormData("username")}
            />
            <CustomTextInput
              placeholder="Prénom"
              value={formData.prenom}
              onChangeText={updateFormData("prenom")}
            />
            <CustomTextInput
              placeholder="Nom de famille"
              value={formData.nomDeFamille}
              onChangeText={updateFormData("nomDeFamille")}
            />
            <CustomTextInput
              placeholder="Date de la dernière menstruation"
              value={formData.dateDerniereMenstruation}
              editable={false}
              onPress={() => showDatePicker("dateDerniereMenstruation")}
            />
            <CustomTextInput
              placeholder="Date de début de grossesse"
              value={formData.dateDebutGrossesse}
              editable={false}
              onPress={() => showDatePicker("dateDebutGrossesse")}
            />
            <CustomTextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={updateFormData("email")}
              keyboardType="email-address"
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

            <CustomButton
              title="Créer Projet"
              onPress={submitForm}
              disabled={isSubmitting}
            />

            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDatePicked}
              onCancel={hideDatePicker}
            />
          </View>
        </ScrollView>
      </View>
    </TemplateViewNoNav>
  );
}
