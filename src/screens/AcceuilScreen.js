import { useSelector } from "react-redux";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Switch,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useAppointments } from "../hooks/useAppointments";
import { useAccueilLogic } from "../hooks/useAccueilLogic"; // Import corrigé
import HeaderView from "../components/NavComponents/HeaderView";
import CustomButton from "../components/shared/CustomButton";
import FormModal from "../components/shared/FormModal";
import GuideModal from "../components/shared/GuideModal";
import {
  guideNutritionMaman,
  guideNutritionBebe,
} from "../components/constants/NutritionGuide";
import styles from "../styles/modalStyles/AccueilStyles";

export default function AccueilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const { username } = user;
  const { rendezVous, markedDates } = useAppointments(user.tokenProject);
  console.log("Rendez-vous depuis useAppointments :", rendezVous);

  const {
    selectedDate,
    agendaModalVisible,
    setAgendaModalVisible,
    rendezVousDuJour,
    handleDayPress,
    toggleSwitch,
    inviteModalVisible,
    setInviteModalVisible,
    inviteRole,
    setInviteRole,
    inviteLink,
    handleInviteSubmit,
    generateInviteCode,
    setMamanModalVisible,
    setBabyModalVisible,
    mamanModalVisible,
    babyModalVisible,
    closeModalGeneric,
  } = useAccueilLogic(user, rendezVous.rdv);

  return (
    <ImageBackground
      source={require("../../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <HeaderView navigation={navigation} />
        </View>
        <Text style={styles.title}>Bienvenue {username} sur BabyProject!</Text>

        <View style={styles.div_btn}>
          <CustomButton
            title="Inviter un proche"
            onPress={handleInviteSubmit}
          />
        </View>

        <FormModal
          visible={inviteModalVisible}
          onClose={() => closeModalGeneric(setInviteModalVisible)}
          title="Inviter un proche"
          formContent={
            <View style={styles.switchContainer}>
              <Text>Assigner un rôle ({inviteRole})</Text>
              <Switch
                thumbColor={inviteRole === "lecteur" ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="black"
                onValueChange={toggleSwitch}
                value={inviteRole === "lecteur"}
              />
              <Text>Lien : {inviteLink || "Non généré"}</Text>
            </View>
          }
          actions={
            <>
              <CustomButton title="Générer" onPress={generateInviteCode} />
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setInviteModalVisible)}
              />
            </>
          }
        />

        <View>
          <Text style={styles.title}>Calendrier de votre Projet</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={handleDayPress}
            minDate="2024-10-31"
            maxDate="2035-12-31"
            markedDates={markedDates}
          />
        </View>

        <FormModal
          visible={agendaModalVisible}
          onClose={() => closeModalGeneric(setAgendaModalVisible)}
          title={`Agenda - ${selectedDate || "Non sélectionné"}`}
          formContent={
            <Text>
              {rendezVousDuJour.length
                ? rendezVousDuJour
                    .map(
                      (rdv) =>
                        `${rdv.pourQui} - ${rdv.heure} - ${rdv.lieu} (${
                          rdv.practicien
                        })${rdv.notes ? " - " + rdv.notes : ""}`
                    )
                    .join("\n")
                : "Aucun RDV"}
            </Text>
          }
          actions={
            <>
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setAgendaModalVisible)}
              />
            </>
          }
        />

        <View style={styles.viewGuide}>
          <CustomButton
            title="Conseil alimentation bébé"
            onPress={() => setBabyModalVisible(true)}
          />
          <CustomButton
            title="Conseil alimentation maman"
            onPress={() => setMamanModalVisible(true)}
          />
        </View>

        <GuideModal
          visible={babyModalVisible}
          onClose={() => closeModalGeneric(setBabyModalVisible)}
          title="Conseil nutrition bébé"
          content={<Text>{guideNutritionBebe.join("\n")}</Text>}
        />
        <GuideModal
          visible={mamanModalVisible}
          onClose={() => closeModalGeneric(setMamanModalVisible)}
          title="Conseil nutrition maman"
          content={<Text>{guideNutritionMaman.join("\n")}</Text>}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
