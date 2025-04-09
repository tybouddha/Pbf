import { useEffect, useState, useCallback } from "react";
import {
  useCloseModalGeneric,
  SetModalStateType,
} from "../utils/useCloseModalGeneric";
import { NavigationProp } from "@react-navigation/native";

type UserType = {
  token: string | null;
  projectId: string | null;
  username: string | null;
  email: string | null;
  tokenProject: string | null;
  role: string | null;
};

type NavigationType = NavigationProp<any>;

type RdvDataType = {
  pourQui: string;
  practicien: string;
  lieu: string;
  heure: string;
  notes: string;
  _id: number | null;
  date: string;
};

type MarkedDateType = {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
  };
};

type DayType = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

type FilteredRendezVousType = {
  [date: string]: RdvDataType[];
};

type AgendaLogicReturnType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mamanModalVisible: boolean;
  setMamanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  babyModalVisible: boolean;
  setBabyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  agendaModalVisible: boolean;
  setAgendaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchModalVisible: boolean;
  setSearchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modifierModalVisible: boolean;
  setModifierModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  svModalVisible: boolean;
  setSvModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  openMamanModal: () => void;
  openBabyModal: () => void;
  openAgendaModal: () => void;
  openSearchModal: () => void;
  openModifierModal: (rdvData: RdvDataType) => void; // Corrigé
  openSvModalVisible: () => void;
  selectedDate: string;
  pourQui: string;
  setPourQui: React.Dispatch<React.SetStateAction<string>>;
  practicien: string;
  setPracticien: React.Dispatch<React.SetStateAction<string>>;
  lieu: string;
  setLieu: React.Dispatch<React.SetStateAction<string>>;
  heure: string;
  setHeure: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  pourQuiModif: string;
  setPourQuiModif: React.Dispatch<React.SetStateAction<string>>;
  practicienModif: string;
  setPracticienModif: React.Dispatch<React.SetStateAction<string>>;
  lieuModif: string;
  setLieuModif: React.Dispatch<React.SetStateAction<string>>;
  heureModif: string;
  setHeureModif: React.Dispatch<React.SetStateAction<string>>;
  notesModif: string;
  setNotesModif: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  rendezVousDuJour: RdvDataType[]; // Corrigé
  markedDates: MarkedDateType;
  filteredRendezVous: FilteredRendezVousType;
  selectedRdvId: number | null;
  closeModalGeneric: (setModalState: SetModalStateType) => void;
  handleDayPress: (day: DayType) => void;
  handleSubmit: () => void;
  handleSearch: () => void;
  handleDelete: (rdvId: number | null) => void;
  handleUpdate: (rdvId: number | null) => void;
};

export const useAgendaLogic = (
  user: UserType,
  navigation: NavigationType
): AgendaLogicReturnType => {
  const projectToken = user.tokenProject;
  const closeModalGeneric = useCloseModalGeneric();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [mamanModalVisible, setMamanModalVisible] = useState<boolean>(false);
  const [babyModalVisible, setBabyModalVisible] = useState<boolean>(false);
  const [agendaModalVisible, setAgendaModalVisible] = useState<boolean>(false);
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const [modifierModalVisible, setModifierModalVisible] =
    useState<boolean>(false);
  const [svModalVisible, setSvModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [pourQui, setPourQui] = useState<string>("");
  const [practicien, setPracticien] = useState<string>("");
  const [lieu, setLieu] = useState<string>("");
  const [heure, setHeure] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [pourQuiModif, setPourQuiModif] = useState<string>("");
  const [practicienModif, setPracticienModif] = useState<string>("");
  const [lieuModif, setLieuModif] = useState<string>("");
  const [heureModif, setHeureModif] = useState<string>("");
  const [notesModif, setNotesModif] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [idArray, setIdArray] = useState<(number | null)[]>([]); // Corrigé
  const [rendezVous, setRendezVous] = useState<{ rdv: RdvDataType[] }>({
    rdv: [],
  }); // Corrigé
  const [rendezVousDuJour, setRendezVousDuJour] = useState<RdvDataType[]>([]); // Corrigé
  const [markedDates, setMarkedDates] = useState<MarkedDateType>({});
  const [filteredRendezVous, setFilteredRendezVous] =
    useState<FilteredRendezVousType>({});
  const [selectedRdvId, setSelectedRdvId] = useState<number | null>(null);

  const openModal = useCallback(() => {
    if (user.role === "lecteur") {
      alert("c'est chitos mon acces est bloqué");
    } else {
      setModalVisible(true);
    }
  }, [user.role]);

  const openMamanModal = () => setMamanModalVisible(true);
  const openBabyModal = () => setBabyModalVisible(true);
  const openAgendaModal = () => setAgendaModalVisible(true);
  const openSvModalVisible = () => setSvModalVisible(true);
  const openSearchModal = () => setSearchModalVisible(true);

  const openModifierModal = useCallback(
    (rdvData: RdvDataType) => {
      if (user.role === "lecteur") {
        alert("non non non, tu es simple lecteur");
      } else {
        setPourQuiModif(rdvData.pourQui);
        setPracticienModif(rdvData.practicien);
        setLieuModif(rdvData.lieu);
        setHeureModif(rdvData.heure);
        setNotesModif(rdvData.notes);
        setSelectedRdvId(rdvData._id);
        setModifierModalVisible(true);
      }
    },
    [user.role]
  );

  const fetchData = useCallback(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/rdv/${projectToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.rdv) {
          setIdArray(data.rdv.map((elem: RdvDataType) => elem._id));
          setRendezVous({ rdv: data.rdv });
          initializeMarkedDates(data.rdv);
        } else {
          setRendezVous({ rdv: [] });
          setMarkedDates({});
        }
      })
      .catch((error: unknown) => {
        console.error(
          "Erreur fetch :",
          error instanceof Error ? error.message : "Erreur inconnue"
        );
      });
  }, [projectToken]);

  const initializeMarkedDates = useCallback((appointments: RdvDataType[]) => {
    const newMarkedDates: MarkedDateType = {};
    if (Array.isArray(appointments)) {
      for (const appointment of appointments) {
        const date: string = appointment.date.split("T")[0];
        newMarkedDates[date] = { marked: true, dotColor: "blue" };
      }
    }
    setMarkedDates(newMarkedDates);
  }, []);

  const handleDayPress = useCallback(
    (day: DayType) => {
      const dateKey = day.dateString;
      setSelectedDate(dateKey);
      if (Array.isArray(rendezVous.rdv)) {
        const dailyAppointments = rendezVous.rdv.filter(
          (rdv: RdvDataType) => rdv.date.split("T")[0] === dateKey
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
      .catch((error: unknown) => {
        console.error(
          "Erreur submit :",
          error instanceof Error ? error.message : "Erreur inconnue"
        );
      });
    closeModalGeneric(setModalVisible);
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
    setModalVisible,
  ]);

  const handleSearch = useCallback(() => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    if (!Array.isArray(rendezVous.rdv)) return;
    const structuredFilteredRdv: FilteredRendezVousType = {};
    rendezVous.rdv.forEach((rdv: RdvDataType) => {
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
    (rdvId: number | null) => {
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
        .catch((error: unknown) => {
          console.error(
            "Erreur delete :",
            error instanceof Error ? error.message : "Erreur inconnue"
          );
        });
    },
    [user.role, projectToken, fetchData]
  );

  const handleUpdate = useCallback(
    (rdvId: number | null) => {
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
          if (data.result) {
            fetchData();
            closeModalGeneric(setModifierModalVisible);
          }
        })
        .catch((error: unknown) => {
          console.error(
            "Erreur update :",
            error instanceof Error ? error.message : "Erreur inconnue"
          );
        });
    },
    [
      pourQuiModif,
      practicienModif,
      lieuModif,
      notesModif,
      heureModif,
      projectToken,
      fetchData,
      setModifierModalVisible,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    modalVisible,
    setModalVisible,
    mamanModalVisible,
    setMamanModalVisible,
    babyModalVisible,
    setBabyModalVisible,
    agendaModalVisible,
    setAgendaModalVisible,
    searchModalVisible,
    setSearchModalVisible,
    modifierModalVisible,
    setModifierModalVisible,
    svModalVisible,
    setSvModalVisible,
    openModal,
    openMamanModal,
    openBabyModal,
    openAgendaModal,
    openSearchModal,
    openModifierModal,
    openSvModalVisible,
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
    closeModalGeneric,
    handleDayPress,
    handleSubmit,
    handleSearch,
    handleDelete,
    handleUpdate,
  };
};
