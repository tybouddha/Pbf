import React from "react";
import { View, Text } from "react-native";
import { useCarnetBebeLogic } from "../hooks/useCarnetBebeLogic";
import CustomButton from "../components/shared/CustomButton";
import CustomTextInput from "../components/shared/CustomTextInput";
import FormModal from "../components/shared/FormModal";
import TemplateView from "../components/Template/TemplateView";
import CarnetBebeForm from "../components/shared/CarnetBebeForm";
import styles from "../styles/screenStyles/CarnetBebeScreenStyles";

export default function CarnetBebeScreen({ navigation }) {
  const {
    closeModalGeneric,
    selectedId,
    modalVisible,
    modifierModalVisible,
    date,
    coucher,
    selle,
    couleur,
    repas,
    note,
    poids,
    taille,
    dateModif,
    coucherModif,
    selleModif,
    couleurModif,
    repasModif,
    noteModif,
    poidsModif,
    tailleModif,
    lastInfos,
    isDatePickerVisible,
    setDate,
    setCoucher,
    setSelle,
    setCouleur,
    setRepas,
    setNote,
    setPoids,
    setTaille,
    setCoucherModif,
    setSelleModif,
    setCouleurModif,
    setRepasModif,
    setNoteModif,
    setDateModif,
    setPoidsModif,
    setTailleModif,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    handleSearch,
    filteredDocs,
    setFilteredDocs,
    searchModalVisible,
    setSearchModalVisible,
    searchInput,
    setSearchInput,
    openAddModal,
    saveInfos,
    handleDelete,
    openModifierModal,
    handleUpdate,
    setModalVisible,
    setModifierModalVisible,
    errorMessage,
  } = useCarnetBebeLogic(navigation);

  const lastInfosCard = lastInfos?.map((item) => (
    <View key={item._id} style={styles.card}>
      <Text>Date: {item.date}</Text>
      <Text>Coucher: {item.heureCoucher}</Text>
      <Text>Repas: {item.repas}</Text>
      <Text>Selle: {item.selle}</Text>
      <Text>Couleur Selle: {item.couleurSelle}</Text>
      <Text>Notes: {item.notes}</Text>
      <View style={styles.buttonRow}>
        <CustomButton
          title="Modifier"
          onPress={() => openModifierModal(item)}
        />
        <CustomButton
          title="Supprimer"
          onPress={() => handleDelete(item._id)}
        />
      </View>
    </View>
  ));

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.vwInstructions}>
        <Text style={styles.txtInstructions}>Carnet Bébé</Text>
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <CustomButton
        title="Ajoute un document carnet Bébé"
        onPress={openAddModal}
      />

      {/* Modal de recherche */}
      <FormModal
        visible={searchModalVisible}
        title="Rechercher un document"
        onClose={() => closeModalGeneric(setSearchModalVisible)}
        formContent={
          <>
            <CustomTextInput
              placeholder="Rechercher (date, repas, etc.)"
              value={searchInput}
              onChangeText={setSearchInput}
            />
            <CustomButton title="Rechercher" onPress={handleSearch} />
            {Object.keys(filteredDocs).length > 0 ? (
              Object.entries(filteredDocs).map(([date, docs]) => (
                <View key={date}>
                  <Text style={styles.dateHeader}>{date}</Text>
                  {docs.map((doc) => (
                    <View key={doc._id} style={styles.card}>
                      <Text>Date: {doc.date}</Text>
                      <Text>Coucher: {doc.heureCoucher}</Text>
                      <Text>Repas: {doc.repas}</Text>
                      <Text>Selle: {doc.selle}</Text>
                      <Text>Couleur Selle: {doc.couleurSelle}</Text>
                      <Text>Notes: {doc.notes}</Text>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <Text>Aucun résultat</Text>
            )}
          </>
        }
        actions={
          <CustomButton
            title="Fermer"
            onPress={() => closeModalGeneric(setSearchModalVisible)}
          />
        }
      />

      {/* Modal d’ajout */}
      <FormModal
        visible={modalVisible}
        title="Carnet Bébé"
        onClose={() => closeModalGeneric(setModalVisible)}
        formContent={
          <CarnetBebeForm
            dateValue={date}
            setDateValue={setDate}
            coucherValue={coucher}
            setCoucherValue={setCoucher}
            selleValue={selle}
            setSelleValue={setSelle}
            couleurValue={couleur}
            setCouleurValue={setCouleur}
            repasValue={repas}
            setRepasValue={setRepas}
            noteValue={note}
            setNoteValue={setNote}
            poidsValue={poids}
            setPoidsValue={setPoids}
            tailleValue={taille}
            setTailleValue={setTaille}
            showDatePickerField={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            handleDatePicked={handleDatePicked}
            fieldName="date"
          />
        }
        actions={
          <>
            <CustomButton title="Sauvegarder" onPress={saveInfos} />
            <CustomButton
              title="Fermer"
              onPress={() => closeModalGeneric(setModalVisible)}
            />
          </>
        }
      />

      {/* Modal de modification */}
      <FormModal
        visible={modifierModalVisible}
        title="Modifier Carnet Bébé"
        onClose={() => closeModalGeneric(setModifierModalVisible)}
        formContent={
          <CarnetBebeForm
            dateValue={dateModif}
            setDateValue={setDateModif}
            coucherValue={coucherModif}
            setCoucherValue={setCoucherModif}
            selleValue={selleModif}
            setSelleValue={setSelleModif}
            couleurValue={couleurModif}
            setCouleurValue={setCouleurModif}
            repasValue={repasModif}
            setRepasValue={setRepasModif}
            noteValue={noteModif}
            setNoteValue={setNoteModif}
            poidsValue={poidsModif}
            setPoidsValue={setPoidsModif}
            tailleValue={tailleModif}
            setTailleValue={setTailleModif}
            showDatePickerField={showDatePicker}
            isDatePickerVisible={isDatePickerVisible}
            handleDatePicked={handleDatePicked}
            fieldName="dateModif"
          />
        }
        actions={
          <>
            <CustomButton
              title="Mettre à jour"
              onPress={() => handleUpdate(selectedId)}
            />
            <CustomButton
              title="Fermer"
              onPress={() => closeModalGeneric(setModifierModalVisible)}
            />
          </>
        }
      />

      <View style={styles.blocinfos}>{lastInfosCard}</View>
    </TemplateView>
  );
}
