import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TemplateView from "../components/Template/TemplateView";
import CustomButton from "../components/shared/CustomButton";
import AddRendezVousModal from "../components/modal/AddRendezVousModal";
import SearchRendezVousModal from "../components/modal/SearchRendezVousModal";
import ModifyRendezVousModal from "../components/modal/ModifyRendezVousModal";
import RendezVousModal from "../components/modal/RendezVousModal";
import { useAgendaLogic } from "../hooks/useAgendaLogic";
import styles from "../styles/screenStyles/AgendaScreenStyles";

const mamanRendezVousList = [
  "1er trimestre : Prendre rendez-vous avec un médecin généraliste, gynécologue ou sage-femme pour confirmer la grossesse.",
  "Déclarer la grossesse à la Caf et à l'assurance maladie.",
  "Planifier la 1ère échographie.",
  "Bilan prénatal de prévention avec une sage-femme pour les habitudes de vie.",
  "2ème trimestre : Planifier le 2ème examen prénatal.",
  "Planifier l'entretien prénatal précoce avec sage-femme ou médecin.",
  "3ème trimestre : Prévoir le rendez-vous avec l'anesthésiste.",
  "Déclarer la naissance à l'état civil dans les 5 jours suivant l'accouchement.",
  "Planifier les premiers examens de santé du bébé.",
  "Consulter une sage-femme pour un suivi postnatal.",
  "Prévoir la rééducation périnéale et abdominale.",
];

const babyRendezVousList = [
  "Dans les 8 jours suivant la naissance",
  "Au cours de la 2ème semaine",
  "Avant la fin du 1er mois",
  "1 mois",
  "2 mois",
  "3 mois",
  "4 mois",
  "5 mois",
  "8 mois",
  "11 mois",
  "12 mois",
  "Entre 16 et 18 mois",
  "Entre 23 et 24 mois",
  "2 ans",
  "3 ans",
  "4 ans",
  "5 ans",
  "Entre 8 et 9 ans",
  "Entre 11 et 13 ans",
  "Entre 15 et 16 ans",
];

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
    selectedRdvId, // Récupéré du hook
    openModal,
    closeModal,
    openMamanModal,
    closeMamanModal,
    openBabyModal,
    closeBabyModal,
    openAgendaModal,
    closeAgendaModal,
    openSvModalVisible,
    closeSvModalVisible,
    openSearchModal,
    closeSearchModal,
    openModifierModal,
    closeModifierModal,
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
        <AddRendezVousModal
          visible={modalVisible}
          onClose={closeModal}
          selectedDate={selectedDate}
          pourQui={pourQui}
          setPourQui={setPourQui}
          practicien={practicien}
          setPracticien={setPracticien}
          lieu={lieu}
          setLieu={setLieu}
          heure={heure}
          setHeure={setHeure}
          notes={notes}
          setNotes={setNotes}
          onSubmit={handleSubmit}
        />

        {/* Modal de recherche */}
        <SearchRendezVousModal
          visible={searchModalVisible}
          onClose={closeSearchModal}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          filteredRendezVous={filteredRendezVous}
          onSearch={handleSearch}
          onModify={openModifierModal}
          onDelete={handleDelete}
        />

        {/* Modal guide maman */}
        <Modal visible={mamanModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Maman rendez-vous</Text>
              <ScrollView style={styles.scrollView}>
                {mamanRendezVousList.map((rdv, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>{rdv}</Text>
                  </View>
                ))}
              </ScrollView>
              <CustomButton title="Fermer" onPress={closeMamanModal} />
            </View>
          </View>
        </Modal>

        {/* Modal guide bébé */}
        <Modal visible={babyModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Baby rendez-vous</Text>
              <ScrollView style={styles.scrollView}>
                {babyRendezVousList.map((rdv, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>{rdv}</Text>
                  </View>
                ))}
              </ScrollView>
              <CustomButton title="Fermer" onPress={closeBabyModal} />
            </View>
          </View>
        </Modal>

        {/* Modal agenda */}
        <Modal visible={agendaModalVisible} animationType="slide" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalListView}>
              <Text style={styles.modalTitle}>Agenda</Text>
              <Calendar
                onDayPress={handleDayPress}
                style={{ borderRadius: 10, elevation: 4, margin: 40 }}
                minDate="2024-10-31"
                maxDate="2035-12-31"
                markedDates={markedDates}
              />
              <CustomButton title="Fermer" onPress={closeAgendaModal} />
            </View>
          </View>
        </Modal>

        {/* Modal des rendez-vous du jour */}
        <RendezVousModal
          visible={svModalVisible}
          onClose={closeSvModalVisible}
          selectedDate={selectedDate}
          appointments={rendezVousDuJour}
          onModify={openModifierModal}
          onAdd={openModal}
          onDelete={handleDelete}
        />

        {/* Modal de modification */}
        <ModifyRendezVousModal
          visible={modifierModalVisible}
          onClose={closeModifierModal}
          pourQui={pourQuiModif}
          setPourQui={setPourQuiModif}
          practicien={practicienModif}
          setPracticien={setPracticienModif}
          lieu={lieuModif}
          setLieu={setLieuModif}
          heure={heureModif}
          setHeure={setHeureModif}
          notes={notesModif}
          setNotes={setNotesModif}
          onUpdate={handleUpdate}
          rdvId={selectedRdvId} // Utilise l’ID stocké
        />
      </KeyboardAvoidingView>
    </TemplateView>
  );
}
