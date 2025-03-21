import { useEffect, useState, useCallback } from "react";

export const useAgendaLogic = (user, navigation) => {
  const projectToken = user.tokenProject;

  const [modalVisible, setModalVisible] = useState(false);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);
  const [babyModalVisible, setBabyModalVisible] = useState(false);
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [modifierModalVisible, setModifierModalVisible] = useState(false);
  const [svModalVisible, setSvModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [pourQui, setPourQui] = useState("");
  const [practicien, setPracticien] = useState("");
  const [lieu, setLieu] = useState("");
  const [heure, setHeure] = useState("");
  const [notes, setNotes] = useState("");
  const [pourQuiModif, setPourQuiModif] = useState("");
  const [practicienModif, setPracticienModif] = useState("");
  const [lieuModif, setLieuModif] = useState("");
  const [heureModif, setHeureModif] = useState("");
  const [notesModif, setNotesModif] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [idArray, setIdArray] = useState([]);
  const [rendezVous, setRendezVous] = useState({ rdv: [] });
  const [rendezVousDuJour, setRendezVousDuJour] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [filteredRendezVous, setFilteredRendezVous] = useState({});
  const [selectedRdvId, setSelectedRdvId] = useState(null); // Nouvel état pour l’ID du rendez-vous modifié

  const openModal = useCallback(() => {
    if (user.role === "lecteur") {
      alert("c'est chitos mon acces est bloqué");
    } else {
      setModalVisible(true);
    }
  }, [user.role]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setPourQui("");
    setPracticien("");
    setLieu("");
    setHeure("");
    setNotes("");
  }, []);

  const openMamanModal = () => setMamanModalVisible(true);
  const closeMamanModal = () => setMamanModalVisible(false);
  const openBabyModal = () => setBabyModalVisible(true);
  const closeBabyModal = () => setBabyModalVisible(false);
  const openAgendaModal = () => setAgendaModalVisible(true);
  const closeAgendaModal = () => {
    setAgendaModalVisible(false);
    setRendezVousDuJour([]);
  };
  const openSvModalVisible = () => setSvModalVisible(true);
  const closeSvModalVisible = () => setSvModalVisible(false);
  const openSearchModal = () => setSearchModalVisible(true);
  const closeSearchModal = () => {
    setSearchModalVisible(false);
    setFilteredRendezVous({});
    setSearchInput("");
  };
  const openModifierModal = useCallback(
    (rdvData) => {
      if (user.role === "lecteur") {
        alert("non non non, tu es simple lecteur");
      } else {
        setPourQuiModif(rdvData.pourQui);
        setPracticienModif(rdvData.practicien);
        setLieuModif(rdvData.lieu);
        setHeureModif(rdvData.heure);
        setNotesModif(rdvData.notes);
        setSelectedRdvId(rdvData._id); // Stocke l’ID du rendez-vous à modifier
        setModifierModalVisible(true);
      }
    },
    [user.role]
  );
  const closeModifierModal = useCallback(() => {
    setModifierModalVisible(false);
    setPourQuiModif("");
    setPracticienModif("");
    setLieuModif("");
    setHeureModif("");
    setNotesModif("");
    setSelectedRdvId(null); // Réinitialise l’ID
  }, []);

  const fetchData = useCallback(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.rdv) {
          setIdArray(data.rdv.map((elem) => elem._id));
          setRendezVous({ rdv: data.rdv });
          initializeMarkedDates(data.rdv);
        } else {
          setRendezVous({ rdv: [] });
          setMarkedDates({});
        }
      })
      .catch((error) => console.error("Erreur fetch :", error));
  }, [projectToken]);

  const initializeMarkedDates = useCallback((appointments) => {
    const newMarkedDates = {};
    if (Array.isArray(appointments)) {
      for (const appointment of appointments) {
        const date = appointment.date.split("T")[0];
        newMarkedDates[date] = { marked: true, dotColor: "blue" };
      }
    }
    setMarkedDates(newMarkedDates);
  }, []);

  const handleDayPress = useCallback(
    (day) => {
      const dateKey = day.dateString;
      setSelectedDate(dateKey);
      if (Array.isArray(rendezVous.rdv)) {
        const dailyAppointments = rendezVous.rdv.filter(
          (rdv) => rdv.date.split("T")[0] === dateKey
        );
        if (dailyAppointments.length > 0) {
          setRendezVousDuJour(dailyAppointments);
          openSvModalVisible();
        } else {
          openModal();
        }
      }
    },
    [rendezVous.rdv, openModal, openSvModalVisible]
  );

  const handleSubmit = useCallback(() => {
    if (user.role === "lecteur") {
      alert("Art or Not tu es bloqué");
      return;
    }
    const newRdv = {
      pourQui,
      practicien,
      lieu,
      notes,
      date: selectedDate,
      heure,
    };
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRdv),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetchData();
        }
      })
      .catch((error) => console.error("Erreur submit :", error));
    closeModal();
  }, [
    user.role,
    pourQui,
    practicien,
    lieu,
    notes,
    selectedDate,
    heure,
    projectToken,
    fetchData,
    closeModal,
  ]);

  const handleSearch = useCallback(() => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    if (!Array.isArray(rendezVous.rdv)) return;
    const structuredFilteredRdv = {};
    rendezVous.rdv.forEach((rdv) => {
      const dateKey = rdv.date.split("T")[0];
      const matchesSearch =
        rdv.pourQui.toLowerCase().includes(normalizedSearch) ||
        rdv.practicien.toLowerCase().includes(normalizedSearch) ||
        rdv.lieu.toLowerCase().includes(normalizedSearch) ||
        rdv.notes.toLowerCase().includes(normalizedSearch);
      if (matchesSearch) {
        if (!structuredFilteredRdv[dateKey])
          structuredFilteredRdv[dateKey] = [];
        structuredFilteredRdv[dateKey].push(rdv);
      }
    });
    setFilteredRendezVous(structuredFilteredRdv);
  }, [searchInput, rendezVous.rdv]);

  const handleDelete = useCallback(
    (rdvId) => {
      if (user.role === "lecteur") {
        alert("ne fout pas ta merde, tu es simple lecteur");
        return;
      }
      if (!rdvId) return;
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}/${rdvId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) fetchData();
        })
        .catch((error) => console.error("Erreur delete :", error));
    },
    [user.role, projectToken, fetchData]
  );

  const handleUpdate = useCallback(
    (rdvId) => {
      if (!rdvId) return;
      const updatedRdv = {
        pourQui: pourQuiModif,
        practicien: practicienModif,
        lieu: lieuModif,
        notes: notesModif,
        heure: heureModif,
      };
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}/${rdvId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRdv),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) fetchData();
          closeModifierModal();
        })
        .catch((error) => console.error("Erreur update :", error));
    },
    [
      pourQuiModif,
      practicienModif,
      lieuModif,
      notesModif,
      heureModif,
      projectToken,
      fetchData,
      closeModifierModal,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
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
    selectedRdvId, // Ajouté au retour
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
  };
};
