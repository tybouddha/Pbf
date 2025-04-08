import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric.ts";

export const useCarnetBebeLogic = (navigation) => {
  const closeModalGeneric = useCloseModalGeneric();
  const [modalVisible, setModalVisible] = useState(false);
  const [modifierModalVisible, setModifierModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [coucher, setCoucher] = useState(null);
  const [selle, setSelle] = useState(null);
  const [couleur, setCouleur] = useState(null);
  const [repas, setRepas] = useState(null);
  const [note, setNote] = useState(null);
  const [data, setData] = useState(false);
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [poidsModif, setPoidsModif] = useState("");
  const [tailleModif, setTailleModif] = useState("");
  const [lastInfos, setLastInfos] = useState([]);
  const [coucherModif, setCoucherModif] = useState("");
  const [selleModif, setSelleModif] = useState("");
  const [couleurModif, setCouleurModif] = useState("");
  const [repasModif, setRepasModif] = useState("");
  const [noteModif, setNoteModif] = useState("");
  const [dateModif, setDateModif] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredDocs, setFilteredDocs] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const user = useSelector((state) => state.user.value);
  const projectId = user.projectId;
  const username = user.username;

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (event, pickedDate) => {
    if (pickedDate) {
      const formattedDate = `${pickedDate.getDate()}-${
        pickedDate.getMonth() + 1
      }-${pickedDate.getFullYear()}`;
      if (currentField === "date") setDate(formattedDate);
      else if (currentField === "dateModif") setDateModif(formattedDate);
    }
    hideDatePicker();
  };

  const fetchData = useCallback(() => {
    if (username && projectId) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${projectId}`)
        .then((response) => response.json())
        .then((carnetBebe) => {
          if (carnetBebe && carnetBebe.infos?.length) {
            const lastCarnetBebe = carnetBebe.infos.reverse().slice(0, 3);
            setLastInfos(lastCarnetBebe);
          } else {
            setLastInfos([]);
          }
        })
        .catch((error) =>
          setErrorMessage("Erreur de chargement des données : " + error.message)
        );
    }
  }, [username, projectId]);

  const openAddModal = () => {
    if (user.role === "lecteur") {
      setErrorMessage("Vous n’avez pas les droits pour ajouter un document");
    } else {
      setModalVisible(true);
    }
  };

  const saveInfos = () => {
    if (!date) {
      setErrorMessage("La date est requise");
      return;
    }
    if (!repas) {
      setErrorMessage("Le repas est requis");
      return;
    }
    setErrorMessage(null);
    setData(true);
  };

  const openModifierModal = useCallback((item) => {
    setCoucherModif(item.heureCoucher || "");
    setSelleModif(item.selle || "");
    setCouleurModif(item.couleurSelle || "");
    setRepasModif(item.repas || "");
    setNoteModif(item.notes || "");
    setDateModif(item.date || "");
    setPoidsModif(item.poids || "");
    setTailleModif(item.taille || "");
    setSelectedId(item._id);
    setModifierModalVisible(true);
  }, []);

  const handleUpdate = useCallback(
    (docBebeId) => {
      if (!docBebeId) {
        setErrorMessage("ID du document manquant");
        return;
      }
      if (!dateModif) {
        setErrorMessage("La date est requise pour la mise à jour");
        return;
      }
      if (!repasModif) {
        setErrorMessage("Le repas est requis pour la mise à jour");
        return;
      }
      setErrorMessage(null);
      const updatedInfo = {
        date: dateModif,
        heureCoucher: coucherModif,
        selle: selleModif,
        couleurSelle: couleurModif,
        repas: repasModif,
        notes: noteModif,
        poids: poidsModif,
        taille: tailleModif,
      };
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${projectId}/${docBebeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedInfo),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            fetchData();
            closeModalGeneric(setModifierModalVisible);
          } else {
            setErrorMessage(data.error || "Erreur lors de la mise à jour");
          }
        })
        .catch((error) => setErrorMessage("Erreur réseau : " + error.message));
    },
    [
      dateModif,
      coucherModif,
      selleModif,
      couleurModif,
      repasModif,
      noteModif,
      poidsModif,
      tailleModif,
      projectId,
      fetchData,
      setModifierModalVisible,
    ]
  );

  const handleDelete = useCallback(
    (docBebeId) => {
      if (user.role === "lecteur") {
        setErrorMessage("Vous n’avez pas les droits pour supprimer");
        return;
      }
      if (!docBebeId) {
        setErrorMessage("ID du document manquant");
        return;
      }
      setErrorMessage(null);
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${projectId}/${docBebeId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) fetchData();
          else setErrorMessage(data.error || "Erreur lors de la suppression");
        })
        .catch((error) => setErrorMessage("Erreur réseau : " + error.message));
    },
    [user.role, projectId, fetchData]
  );

  const handleSearch = useCallback(() => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    if (!Array.isArray(lastInfos)) return;
    const structuredFilteredDocs = {};
    lastInfos.forEach((doc) => {
      const dateKey = doc.date;
      const matchesSearch =
        doc.date?.toLowerCase().includes(normalizedSearch) ||
        doc.heureCoucher?.toLowerCase().includes(normalizedSearch) ||
        doc.repas?.toLowerCase().includes(normalizedSearch) ||
        doc.selle?.toLowerCase().includes(normalizedSearch) ||
        doc.couleurSelle?.toLowerCase().includes(normalizedSearch) ||
        doc.notes?.toLowerCase().includes(normalizedSearch);
      if (matchesSearch) {
        if (!structuredFilteredDocs[dateKey])
          structuredFilteredDocs[dateKey] = [];
        structuredFilteredDocs[dateKey].push(doc);
      }
    });
    setFilteredDocs(structuredFilteredDocs);
  }, [searchInput, lastInfos]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && projectId) {
      const bodyObj = {
        username,
        date,
        heureCoucher: coucher,
        repas,
        selle,
        couleurSelle: couleur,
        notes: note,
        poids,
        taille,
      };
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/ajout/${projectId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyObj),
        }
      )
        .then((response) => response.json())
        .then((newDocbebe) => {
          if (newDocbebe.carnetBebe) {
            setLastInfos((prev) =>
              [newDocbebe.carnetBebe, ...prev].slice(0, 3)
            );
          }
          setDate(null);
          setCoucher(null);
          setCouleur(null);
          setSelle(null);
          setRepas(null);
          setNote(null);
          setPoids("");
          setTaille("");
          setData(false);
          closeModalGeneric(setModalVisible);
        })
        .catch((error) => setErrorMessage("Erreur réseau : " + error.message));
    } else if (data && !projectId) {
      setErrorMessage("Erreur : projectId est undefined");
    }
  }, [
    data,
    username,
    projectId,
    date,
    coucher,
    repas,
    selle,
    couleur,
    note,
    poids,
    taille,
  ]);

  return {
    closeModalGeneric,
    searchInput,
    setSearchInput,
    modalVisible,
    modifierModalVisible,
    filteredDocs,
    setFilteredDocs,
    date,
    coucher,
    searchModalVisible,
    setSearchModalVisible,
    selectedId,
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
    openAddModal,
    saveInfos,
    handleDelete,
    openModifierModal,
    handleUpdate,
    setModalVisible,
    setModifierModalVisible,
    errorMessage,
  };
};
