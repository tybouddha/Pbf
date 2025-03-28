import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/user";
import { logOutDocument } from "../../reducers/document";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

export const useProfilLogic = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const projectToken = user.tokenProject;
  const userToken = user.token;
  const closeModalGeneric = useCloseModalGeneric();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [grossesse, setGrossesse] = useState("");
  const [menstruation, setMenstruation] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordModalIsVisible, setPasswordModalIsVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = useCallback(() => {
    if (!projectToken) {
      setErrorMessage("Erreur : token de projet manquant");
      return;
    }
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${projectToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUsername(data.user.username || "");
          setEmail(data.user.email || "");
          setGrossesse(data.user.dateDebutGrossesse || "");
          setMenstruation(data.user.derniereMenstruation || "");
        } else {
          setErrorMessage("Erreur : données utilisateur non trouvées");
        }
      })
      .catch((error) => setErrorMessage("Erreur fetchData : " + error.message));
  }, [projectToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (pickedDate) => {
    if (pickedDate) {
      const formattedDate = `${pickedDate.getDate()}-${
        pickedDate.getMonth() + 1
      }-${pickedDate.getFullYear()}`;
      if (currentField === "menstruation") {
        setMenstruation(formattedDate);
      } else if (currentField === "grossesse") {
        setGrossesse(formattedDate);
      }
    }
    hideDatePicker();
  };

  const handleUpdate = useCallback(async () => {
    if (!username || !email) {
      setErrorMessage("Le pseudonyme et l’email sont requis");
      return;
    }
    if (!projectToken || !userToken) {
      setErrorMessage("Erreur : tokens manquants");
      return;
    }
    setErrorMessage(null);

    const updatedUser = {
      username,
      email,
      derniereMenstruation: menstruation,
      dateDebutGrossesse: grossesse,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/${projectToken}/${userToken}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();
      if (data.result) {
        fetchData();
        navigation.navigate("Accueil");
      } else {
        setErrorMessage(data.error || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      setErrorMessage("Erreur réseau : " + error.message);
    }
  }, [
    username,
    email,
    menstruation,
    grossesse,
    projectToken,
    userToken,
    navigation,
  ]);

  const handleUpdatePassword = useCallback(async () => {
    if (!password || !newPassword) {
      setErrorMessage("Les deux mots de passe sont requis");
      return;
    }
    if (!projectToken || !userToken) {
      setErrorMessage("Erreur : tokens manquants");
      return;
    }
    setErrorMessage(null);

    const updatedUserPassword = {
      oldPassword: password,
      newPassword: newPassword,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/password/${projectToken}/${userToken}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserPassword),
        }
      );
      const data = await response.json();
      if (data.result) {
        setPassword("");
        setNewPassword("");
        closeModalGeneric(setPasswordModalIsVisible);
      } else {
        setErrorMessage(
          data.error || "Erreur lors du changement de mot de passe"
        );
      }
    } catch (error) {
      setErrorMessage("Erreur réseau : " + error.message);
    }
  }, [password, newPassword, projectToken, userToken]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    dispatch(logOutDocument());
    navigation.navigate("Welcome");
  }, [dispatch, navigation]);

  return {
    username,
    email,
    grossesse,
    menstruation,
    password,
    newPassword,
    passwordModalIsVisible,
    isDatePickerVisible,
    errorMessage,
    setUsername,
    setEmail,
    setGrossesse,
    setMenstruation,
    setPassword,
    setNewPassword,
    setPasswordModalIsVisible,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    handleUpdate,
    handleUpdatePassword,
    handleLogout,
    userToken,
    closeModalGeneric,
  };
};
