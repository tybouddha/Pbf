import React from "react";
import { View, ScrollView, Text, Switch, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../reducers/user";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";
import VwEchec from "../../components/Template/VwEchec";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { useSignupForm } from "../../hooks/useSingUpForm"; // Hook extrait dans un fichier séparé
import styles from "../../styles/CreerProjetStyles";

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
        <Modal visible={modalEchecVisible} animationType="fade" transparent>
          <VwEchec
            closeModal={() => setModalEchecVisible(false)}
            messageError={messageError}
          />
        </Modal>
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
