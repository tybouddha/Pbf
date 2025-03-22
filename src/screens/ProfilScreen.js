import React from "react";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import TemplateView from "../components/Template/TemplateView";
import CustomButton from "../components/shared/CustomButton";
import CustomTextInput from "../components/shared/CustomTextInput";
import PasswordModal from "../components/modal/PasswordModal";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useProfilLogic } from "../hooks/useProfilLogic";
import styles from "../styles/screenStyles/ProfilScreenStyles";

export default function ProfilScreen({ navigation }) {
  const {
    username,
    email,
    grossesse,
    menstruation,
    passwordModalIsVisible,
    isDatePickerVisible,
    setUsername,
    setEmail,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    setPasswordModalIsVisible,
    handleUpdate,
    handleLogout,
    userToken,
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
        <View style={styles.centeredView}>
          <Text>Pseudonyme</Text>
          <CustomTextInput
            placeholder={username}
            value={username}
            onChangeText={setUsername}
          />
          <Text>Email</Text>
          <CustomTextInput
            placeholder={email}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            placeholder="Date de la dernière menstruation"
            value={menstruation}
            onPressIn={() => showDatePicker("menstruation")}
            editable={false}
          />
          <CustomTextInput
            placeholder="Date de début de grossesse"
            value={grossesse}
            onPressIn={() => showDatePicker("grossesse")}
            editable={false}
          />
          <CustomButton
            title="Mot de passe"
            onPress={() => setPasswordModalIsVisible(true)}
          />
          <PasswordModal
            visible={passwordModalIsVisible}
            onClose={() => setPasswordModalIsVisible(false)}
            userToken={userToken}
          />
          <View>
            <CustomButton title="Sauvegarder" onPress={handleUpdate} />
            <CustomButton title="Déconnexion" onPress={handleLogout} />
          </View>
        </View>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDatePicked}
          onCancel={hideDatePicker}
        />
      </KeyboardAvoidingView>
    </TemplateView>
  );
}
