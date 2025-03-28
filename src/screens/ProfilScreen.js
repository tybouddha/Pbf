import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useProfilLogic } from "../hooks/useProfilLogic";
import CustomButton from "../components/shared/CustomButton";
import CustomTextInput from "../components/shared/CustomTextInput";
import FormModal from "../components/shared/FormModal";
import TemplateView from "../components/Template/TemplateView";
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "../styles/screenStyles/ProfilScreenStyles";

export default function ProfilScreen({ navigation }) {
  const {
    username,
    email,
    grossesse,
    menstruation,
    password,
    newPassword,
    passwordModalIsVisible,
    isDatePickerVisible,
    errorMessage,
    setUsername,
    setEmail,
    setPassword,
    setNewPassword,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    setPasswordModalIsVisible,
    handleUpdate,
    handleUpdatePassword,
    handleLogout,
    userToken,
    closeModalGeneric,
  } = useProfilLogic(navigation);

  return (
    <TemplateView navigation={navigation} afficherArriére>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <View style={styles.vwInstructions}>
          <Text style={styles.txtInstructions}>Profil utilisateur</Text>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <View style={styles.centeredView}>
          <Text>Pseudonyme</Text>
          <CustomTextInput
            placeholder={username || "Pseudonyme"}
            value={username}
            onChangeText={setUsername}
          />
          <Text>Email</Text>
          <CustomTextInput
            placeholder={email || "Email"}
            value={email}
            onChangeText={setEmail}
          />
          <Text>Date de la dernière menstruation</Text>
          <CustomTextInput
            placeholder={menstruation || "Sélectionner une date"}
            value={menstruation}
            onPressIn={() => showDatePicker("menstruation")}
            editable={false}
          />
          <Text>Date de début de grossesse</Text>
          <CustomTextInput
            placeholder={grossesse || "Sélectionner une date"}
            value={grossesse}
            onPressIn={() => showDatePicker("grossesse")}
            editable={false}
          />
          <CustomButton
            title="Mot de passe"
            onPress={() => setPasswordModalIsVisible(true)}
          />
          <FormModal
            title="Modification du mot de passe"
            visible={passwordModalIsVisible}
            onClose={() => closeModalGeneric(setPasswordModalIsVisible)}
            formContent={
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
                  onPress={() => handleUpdatePassword()}
                />
                <CustomButton
                  title="Fermer"
                  onPress={() => closeModalGeneric(setPasswordModalIsVisible)}
                />
              </View>
            }
          />
          <View style={styles.buttonContainer}>
            <CustomButton title="Sauvegarder" onPress={handleUpdate} />
            <CustomButton title="Fermer" onPress={() => navigation.goBack()} />
            <CustomButton title="Déconnexion" onPress={handleLogout} />
          </View>
        </View>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDatePicked}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />
      </KeyboardAvoidingView>
    </TemplateView>
  );
}
