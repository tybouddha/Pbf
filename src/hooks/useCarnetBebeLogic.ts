import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import {
  useCloseModalGeneric,
  SetModalStateType,
} from "../utils/useCloseModalGeneric";
import { RootState } from "../../store";
import { UserStateType } from "../reducers/user";

// Typage de la navigation
type NavigationType = NavigationProp<any>;

// Typage des valeurs utilisateur extraites du store Redux
type UserValueType = {
  projectId: string | null;
  username: string | null;
  role: string | null;
};

// Typage des champs pour showDatePicker
type FieldType = "date" | "dateModif";

// Typage d'un item du carnet bébé
type ItemType = {
  date: string | null;
  heureCoucher: string | null;
  selle: string | null;
  couleurSelle: string | null;
  repas: string | null;
  notes: string | null;
  poids: string | null;
  taille: string | null;
  _id: number | null;
};

// Typage de l'ID du document bébé
type DocBebeIdType = number | null;

// Typage de la réponse API pour carnetBebe
type CarnetBebeResponse = {
  infos: ItemType[];
};

// Typage de la réponse API pour ajout d'un document
type NewDocBebeResponse = {
  result?: boolean;
  carnetBebe?: ItemType;
  error?: string;
};

// Typage de la réponse API pour mise à jour/suppression
type UpdateDeleteResponse = {
  result: boolean;
  error?: string;
};

type CarnetBebeLogicReturn = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  filteredDocs: Record<string, ItemType[]>;
  setFilteredDocs: React.Dispatch<
    React.SetStateAction<Record<string, ItemType[]>>
  >;
  date: string | null;
  setDate: React.Dispatch<React.SetStateAction<string | null>>;
  coucher: string | null;
  setCoucher: React.Dispatch<React.SetStateAction<string | null>>;
  selectedId: DocBebeIdType;
  selle: string | null;
  setSelle: React.Dispatch<React.SetStateAction<string | null>>;
  couleur: string | null;
  setCouleur: React.Dispatch<React.SetStateAction<string | null>>;
  repas: string | null;
  setRepas: React.Dispatch<React.SetStateAction<string | null>>;
  note: string | null;
  setNote: React.Dispatch<React.SetStateAction<string | null>>;
  poids: string;
  setPoids: React.Dispatch<React.SetStateAction<string>>;
  taille: string;
  setTaille: React.Dispatch<React.SetStateAction<string>>;
  dateModif: string;
  setDateModif: React.Dispatch<React.SetStateAction<string>>;
  coucherModif: string;
  setCoucherModif: React.Dispatch<React.SetStateAction<string>>;
  selleModif: string;
  setSelleModif: React.Dispatch<React.SetStateAction<string>>;
  couleurModif: string;
  setCouleurModif: React.Dispatch<React.SetStateAction<string>>;
  repasModif: string;
  setRepasModif: React.Dispatch<React.SetStateAction<string>>;
  noteModif: string;
  setNoteModif: React.Dispatch<React.SetStateAction<string>>;
  poidsModif: string;
  setPoidsModif: React.Dispatch<React.SetStateAction<string>>;
  tailleModif: string;
  setTailleModif: React.Dispatch<React.SetStateAction<string>>;
  lastInfos: ItemType[];
  errorMessage: string | null;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modifierModalVisible: boolean;
  setModifierModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  searchModalVisible: boolean;
  setSearchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isDatePickerVisible: boolean;
  showDatePicker: (field: FieldType) => void;
  hideDatePicker: () => void;
  handleDatePicked: (event: unknown, pickedDate: Date | undefined) => void;
  handleSearch: () => void;
  openAddModal: () => void;
  saveInfos: () => void;
  handleDelete: (docBebeId: DocBebeIdType) => void;
  openModifierModal: (item: ItemType) => void;
  handleUpdate: (docBebeId: DocBebeIdType) => void;
  closeModalGeneric: (setModalState: SetModalStateType) => void;
};

// Typage du hook personnalisé
export const useCarnetBebeLogic = (
  navigation: NavigationType
): CarnetBebeLogicReturn => {
  const closeModalGeneric = useCloseModalGeneric();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modifierModalVisible, setModifierModalVisible] =
    useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [coucher, setCoucher] = useState<string | null>(null);
  const [selle, setSelle] = useState<string | null>(null);
  const [couleur, setCouleur] = useState<string | null>(null);
  const [repas, setRepas] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [data, setData] = useState<boolean>(false);
  const [poids, setPoids] = useState<string>("");
  const [taille, setTaille] = useState<string>("");
  const [poidsModif, setPoidsModif] = useState<string>("");
  const [tailleModif, setTailleModif] = useState<string>("");
  const [lastInfos, setLastInfos] = useState<ItemType[]>([]);
  const [coucherModif, setCoucherModif] = useState<string>("");
  const [selleModif, setSelleModif] = useState<string>("");
  const [couleurModif, setCouleurModif] = useState<string>("");
  const [repasModif, setRepasModif] = useState<string>("");
  const [noteModif, setNoteModif] = useState<string>("");
  const [dateModif, setDateModif] = useState<string>("");
  const [selectedId, setSelectedId] = useState<DocBebeIdType>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<FieldType | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredDocs, setFilteredDocs] = useState<Record<string, ItemType[]>>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const user: UserValueType = useSelector<RootState, UserValueType>(
    (state) => state.user.value
  );
  const { projectId, username, role } = user;

  const showDatePicker = (field: FieldType) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (
    event: unknown,
    pickedDate: Date | undefined
  ): void => {
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
        .then((response) => response.json() as Promise<CarnetBebeResponse>)
        .then((carnetBebe) => {
          if (carnetBebe && carnetBebe.infos?.length) {
            const lastCarnetBebe = carnetBebe.infos.reverse().slice(0, 3);
            setLastInfos(lastCarnetBebe);
          } else {
            setLastInfos([]);
          }
        })
        .catch((error: Error) =>
          setErrorMessage("Erreur de chargement des données : " + error.message)
        );
    }
  }, [username, projectId]);

  const openAddModal = (): void => {
    if (role === "lecteur") {
      setErrorMessage("Vous n’avez pas les droits pour ajouter un document");
    } else {
      setModalVisible(true);
    }
  };

  const saveInfos = (): void => {
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

  const openModifierModal = useCallback((item: ItemType): void => {
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
    (docBebeId: DocBebeIdType): void => {
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
      const updatedInfo: ItemType = {
        date: dateModif,
        heureCoucher: coucherModif,
        selle: selleModif,
        couleurSelle: couleurModif,
        repas: repasModif,
        notes: noteModif,
        poids: poidsModif,
        taille: tailleModif,
        _id: null, // Non envoyé dans la requête
      };
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${projectId}/${docBebeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedInfo),
        }
      )
        .then((response) => response.json() as Promise<UpdateDeleteResponse>)
        .then((data) => {
          if (data.result) {
            fetchData();
            closeModalGeneric(setModifierModalVisible);
          } else {
            setErrorMessage(data.error || "Erreur lors de la mise à jour");
          }
        })
        .catch((error: Error) =>
          setErrorMessage("Erreur réseau : " + error.message)
        );
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
      closeModalGeneric,
    ]
  );

  const handleDelete = useCallback(
    (docBebeId: DocBebeIdType): void => {
      if (role === "lecteur") {
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
        .then((response) => response.json() as Promise<UpdateDeleteResponse>)
        .then((data) => {
          if (data.result) fetchData();
          else setErrorMessage(data.error || "Erreur lors de la suppression");
        })
        .catch((error: Error) =>
          setErrorMessage("Erreur réseau : " + error.message)
        );
    },
    [role, projectId, fetchData]
  );

  const handleSearch = useCallback((): void => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    if (!Array.isArray(lastInfos)) return;
    const structuredFilteredDocs: Record<string, ItemType[]> = {};
    lastInfos.forEach((doc: ItemType) => {
      const dateKey = doc.date || "unknown";
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
      const bodyObj: ItemType = {
        date,
        heureCoucher: coucher,
        repas,
        selle,
        couleurSelle: couleur,
        notes: note,
        poids,
        taille,
        _id: null, // Non utilisé dans l'ajout
      };
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/ajout/${projectId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...bodyObj, username }),
        }
      )
        .then((response) => response.json() as Promise<NewDocBebeResponse>)
        .then((newDocbebe) => {
          if (newDocbebe.carnetBebe) {
            setLastInfos((prev) =>
              [newDocbebe.carnetBebe as ItemType, ...prev].slice(0, 3)
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
        .catch((error: Error) =>
          setErrorMessage("Erreur réseau : " + error.message)
        );
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
    closeModalGeneric,
  ]);

  return {
    searchInput,
    setSearchInput,
    filteredDocs,
    setFilteredDocs,
    date,
    setDate,
    coucher,
    setCoucher,
    selectedId,
    selle,
    setSelle,
    couleur,
    setCouleur,
    repas,
    setRepas,
    note,
    setNote,
    poids,
    setPoids,
    taille,
    setTaille,
    dateModif,
    setDateModif,
    coucherModif,
    setCoucherModif,
    selleModif,
    setSelleModif,
    couleurModif,
    setCouleurModif,
    repasModif,
    setRepasModif,
    noteModif,
    setNoteModif,
    poidsModif,
    setPoidsModif,
    tailleModif,
    setTailleModif,
    lastInfos,
    errorMessage,
    modalVisible,
    setModalVisible,
    modifierModalVisible,
    setModifierModalVisible,
    searchModalVisible,
    setSearchModalVisible,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    handleSearch,
    openAddModal,
    saveInfos,
    handleDelete,
    openModifierModal,
    handleUpdate,
    closeModalGeneric,
  };
};
