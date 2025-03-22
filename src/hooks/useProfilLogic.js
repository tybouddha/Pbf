import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/user";
import { logOutDocument } from "../../reducers/document";

export const useProfilLogic = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const projectToken = user.tokenProject;
  const userToken = user.token;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [grossesse, setGrossesse] = useState("");
  const [menstruation, setMenstruation] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordModalIsVisible, setPasswordModalIsVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const fetchData = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${projectToken}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUsername(data.user.username);
          setEmail(data.user.email);
          setGrossesse(data.user.dateDebutGrossesse);
          setMenstruation(data.user.derniereMenstruation);
        }
      })
      .catch((error) => console.error("Erreur fetchData :", error));
  };

  useEffect(() => {
    fetchData();
  }, [projectToken]);

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = (pickedDate) => {
    const formattedDate = `${pickedDate.getDate()}-${
      pickedDate.getMonth() + 1
    }-${pickedDate.getFullYear()}`;
    if (currentField === "menstruation") {
      setMenstruation(formattedDate);
    } else if (currentField === "grossesse") {
      setGrossesse(formattedDate);
    }
    hideDatePicker();
  };

  const handleUpdate = () => {
    const updatedUser = {
      username,
      email,
      derniereMenstruation: menstruation,
      dateDebutGrossesse: grossesse,
    };

    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/${projectToken}/${userToken}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) fetchData();
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour :", error)
      );
  };

  const handleUpdatePassword = () => {
    const updatedUserPassword = {
      oldPassword: password,
      newPassword: newPassword,
    };

    fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/password/${projectToken}/${userToken}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserPassword),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetchData();
          setPasswordModalIsVisible(false);
          setPassword("");
          setNewPassword("");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du mot de passe :", error)
      );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logOutDocument());
    navigation.navigate("Welcome");
  };

  return {
    username,
    email,
    grossesse,
    menstruation,
    password,
    newPassword,
    passwordModalIsVisible,
    isDatePickerVisible,
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
  };
};
