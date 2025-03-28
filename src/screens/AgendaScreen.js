import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useAgendaLogic } from "../hooks/useAgendaLogic";
import GuideModal from "../components/shared/GuideModal";
import FormModal from "../components/shared/FormModal";
import CustomButton from "../components/shared/CustomButton";
import CustomTextInput from "../components/shared/CustomTextInput";
import {
  mamanRendezVousList,
  babyRendezVousList,
} from "../components/constants/RdvList";
import TemplateView from "../components/Template/TemplateView";
import styles from "../styles/screenStyles/AgendaScreenStyles";

export default function AgendaScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const {
    modalVisible,
    mamanModalVisible,
    babyModalVisible,
    agendaModalVisible,
    searchModalVisible,
    modifierModalVisible,
    svModalVisible,
    selectedDate,
    pourQui,
    setPourQui,
    practicien,
    setPracticien,
    lieu,
    setLieu,
    heure,
    setHeure,
    notes,
    setNotes,
    pourQuiModif,
    setPourQuiModif,
    practicienModif,
    setPracticienModif,
    lieuModif,
    setLieuModif,
    heureModif,
    setHeureModif,
    notesModif,
    setNotesModif,
    searchInput,
    setSearchInput,
    rendezVousDuJour,
    markedDates,
    filteredRendezVous,
    selectedRdvId,
    setModalVisible,
    setMamanModalVisible,
    setBabyModalVisible,
    setAgendaModalVisible,
    setSearchModalVisible,
    setModifierModalVisible,
    setSvModalVisible,
    openModal,
    openMamanModal,
    openBabyModal,
    openAgendaModal,
    openSearchModal,
    openModifierModal,
    openSvModalVisible,
    closeModalGeneric,
    handleDayPress,
    handleSubmit,
    handleSearch,
    handleDelete,
    handleUpdate,
  } = useAgendaLogic(user, navigation);

  return (
    <TemplateView navigation={navigation}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <View style={styles.vwInstructions}>
          <Text style={styles.txtInstructions}>Agenda</Text>
        </View>
        <View style={styles.div_btn}>
          <CustomButton
            title="Rechercher un rendez-vous"
            onPress={openSearchModal}
          />
          <CustomButton title="Voir agenda" onPress={openAgendaModal} />
          <CustomButton
            title="Guide maman rendez-vous"
            onPress={openMamanModal}
          />
          <CustomButton
            title="Guide baby rendez-vous"
            onPress={openBabyModal}
          />
        </View>

        {/* Modal d'ajout */}
        <FormModal
          visible={modalVisible}
          onClose={() => closeModalGeneric(setModalVisible)}
          title="Nouveau Rendez-vous"
          formContent={
            <>
              <Text>Date sélectionnée : {selectedDate}</Text>
              <CustomTextInput
                placeholder="Pour Qui"
                value={pourQui}
                onChangeText={setPourQui}
              />
              <CustomTextInput
                placeholder="Practicien"
                value={practicien}
                onChangeText={setPracticien}
              />
              <CustomTextInput
                placeholder="Lieu"
                value={lieu}
                onChangeText={setLieu}
              />
              <CustomTextInput
                placeholder="Heure"
                value={heure}
                onChangeText={setHeure}
              />
              <CustomTextInput
                placeholder="Notes"
                value={notes}
                onChangeText={setNotes}
              />
            </>
          }
          actions={
            <>
              <CustomButton title="Sauvegarder" onPress={handleSubmit} />
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setModalVisible)}
              />
            </>
          }
        />

        {/* Modal de recherche */}
        <FormModal
          visible={searchModalVisible}
          onClose={() => closeModalGeneric(setSearchModalVisible)}
          title="Rechercher un Rendez-vous"
          formContent={
            <View>
              <CustomTextInput
                placeholder="Rechercher (ex. MAMAN)"
                value={searchInput}
                onChangeText={setSearchInput}
              />
              {Object.keys(filteredRendezVous).length > 0 ? (
                <ScrollView>
                  {Object.keys(filteredRendezVous).map((date) => (
                    <View key={date}>
                      <Text style={{ fontWeight: "bold" }}>{date}</Text>
                      {filteredRendezVous[date].map((rdv) => (
                        <View key={rdv._id} style={styles.rdvItem}>
                          <Text>{`${rdv.pourQui} - ${rdv.heure} - ${rdv.lieu}`}</Text>
                          <View style={styles.buttonRow}>
                            <CustomButton
                              title="Modifier"
                              onPress={() => openModifierModal(rdv)}
                            />
                            <CustomButton
                              title="Supprimer"
                              onPress={() => handleDelete(rdv._id)}
                            />
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text>Aucun rendez-vous trouvé</Text>
              )}
            </View>
          }
          actions={
            <>
              <CustomButton title="Rechercher" onPress={handleSearch} />
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setSearchModalVisible)}
              />
            </>
          }
        />

        {/* Modal guide maman */}
        <GuideModal
          visible={mamanModalVisible}
          onClose={() => closeModalGeneric(setMamanModalVisible)}
          title="Maman Rendez-vous"
          content={<Text>{mamanRendezVousList.join("\n")}</Text>}
        />

        {/* Modal guide bébé */}
        <GuideModal
          visible={babyModalVisible}
          onClose={() => closeModalGeneric(setBabyModalVisible)}
          title="Baby Rendez-vous"
          content={<Text>{babyRendezVousList.join("\n")}</Text>}
        />

        {/* Modal agenda */}
        <FormModal
          visible={agendaModalVisible}
          onClose={() => closeModalGeneric(setAgendaModalVisible)}
          title="Agenda"
          formContent={
            <Calendar
              onDayPress={handleDayPress}
              style={{ borderRadius: 10, elevation: 4, margin: 40 }}
              minDate="2024-10-31"
              maxDate="2035-12-31"
              markedDates={markedDates}
            />
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

        {/* Modal des rendez-vous du jour */}
        <FormModal
          visible={svModalVisible}
          onClose={() => closeModalGeneric(setSvModalVisible)}
          title={`Rendez-vous - ${selectedDate || "Non sélectionné"}`}
          formContent={
            <ScrollView style={styles.scrollView}>
              {rendezVousDuJour.length > 0 ? (
                rendezVousDuJour.map((rdv) => (
                  <View key={rdv._id} style={styles.rdvItem}>
                    <View>
                      <Text>Pour : {rdv.pourQui}</Text>
                      <Text>Praticien : {rdv.practicien}</Text>
                      <Text>Lieu : {rdv.lieu}</Text>
                      <Text>Heure : {rdv.heure}</Text>
                      <Text>Notes : {rdv.notes || "Aucune note"}</Text>
                    </View>
                    <View style={styles.buttonRow}>
                      <CustomButton
                        title="Modifier"
                        onPress={() => openModifierModal(rdv)}
                      />
                      <CustomButton
                        title="Supprimer"
                        onPress={() => handleDelete(rdv._id)}
                      />
                    </View>
                  </View>
                ))
              ) : (
                <Text>Aucun rendez-vous trouvé pour cette date.</Text>
              )}
            </ScrollView>
          }
          actions={
            <>
              <CustomButton title="Ajouter" onPress={openModal} />
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setSvModalVisible)}
              />
            </>
          }
        />

        {/* Modal de modification */}
        <FormModal
          visible={modifierModalVisible}
          onClose={() => closeModalGeneric(setModifierModalVisible)}
          title={`Modifier Rendez-vous - ${selectedDate || "Non sélectionné"}`}
          formContent={
            <>
              <CustomTextInput
                placeholder="Pour Qui"
                value={pourQuiModif}
                onChangeText={setPourQuiModif}
              />
              <CustomTextInput
                placeholder="Practicien"
                value={practicienModif}
                onChangeText={setPracticienModif}
              />
              <CustomTextInput
                placeholder="Lieu"
                value={lieuModif}
                onChangeText={setLieuModif}
              />
              <CustomTextInput
                placeholder="Heure"
                value={heureModif}
                onChangeText={setHeureModif}
              />
              <CustomTextInput
                placeholder="Notes"
                value={notesModif}
                onChangeText={setNotesModif}
              />
            </>
          }
          actions={
            <>
              <CustomButton
                title="Mettre à jour"
                onPress={() => handleUpdate(selectedRdvId)}
              />
              <CustomButton
                title="Fermer"
                onPress={() => closeModalGeneric(setModifierModalVisible)}
              />
            </>
          }
        />
      </KeyboardAvoidingView>
    </TemplateView>
  );
}
