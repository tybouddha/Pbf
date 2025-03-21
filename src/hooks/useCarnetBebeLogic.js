import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useCarnetBebeLogic = (navigation) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [coucher, setCoucher] = useState(null);
  const [selle, setSelle] = useState(null);
  const [couleur, setCouleur] = useState(null);
  const [repas, setRepas] = useState(null);
  const [note, setNote] = useState(null);
  const [data, setData] = useState(false);
  const [lastInfos, setLastInfos] = useState([]);
  const [docBebe, setDocBebe] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const user = useSelector((state) => state.user.value);
  const tokenProject = user.tokenProject;
  const username = user.username;

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (pickedDate) => {
    const formattedDate = `${pickedDate.getDate()}-${
      pickedDate.getMonth() + 1
    }-${pickedDate.getFullYear()}`;
    if (currentField === "date") setDate(formattedDate);
    hideDatePicker();
  };

  const fetchData = () => {
    if (username && tokenProject) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${tokenProject}`)
        .then((response) => response.json())
        .then((carnetBebe) => {
          setDocBebe(carnetBebe);
          if (carnetBebe && carnetBebe.infos.length) {
            const lastCarnetBebe = carnetBebe.infos.reverse().slice(0, 3);
            setLastInfos(lastCarnetBebe);
          } else {
            console.log("Pas de données disponibles");
          }
        })
        .catch((error) => console.error("Erreur fetchData :", error));
    }
  };

  const modalCarnetBebe = () => {
    if (user.role === "lecteur") {
      alert("ny pense meme pas, tu na pas le droit");
    } else {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setDate(null);
    setCoucher(null);
    setCouleur(null);
    setSelle(null);
    setRepas(null);
    setNote(null);
  };

  const saveInfos = () => setData(true);

  const handleDelete = (docBebeId) => {
    if (user.role === "lecteur") {
      return alert("Va voir chez Polo Chino, si tu as acces");
    }
    if (!docBebeId) {
      console.error("L'identifiant du document est manquant");
      return;
    }

    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/${tokenProject}/${docBebeId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) fetchData();
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
  };

  useEffect(() => {
    fetchData();
  }, [username, tokenProject]);

  useEffect(() => {
    if (data) {
      const bodyObj = {
        username,
        date,
        heureCoucher: coucher,
        repas,
        selle,
        couleurSelle: couleur,
        notes: note,
      };

      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/carnetbebe/ajout/${tokenProject}`,
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
          setData(false);
          setModalVisible(false);
        })
        .catch((error) => console.error("Erreur saveInfos :", error));
    }
  }, [data]);

  return {
    modalVisible,
    date,
    coucher,
    selle,
    couleur,
    repas,
    note,
    lastInfos,
    isDatePickerVisible,
    setCoucher,
    setSelle,
    setCouleur,
    setRepas,
    setNote,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    modalCarnetBebe,
    closeModal,
    saveInfos,
    handleDelete,
  };
};
