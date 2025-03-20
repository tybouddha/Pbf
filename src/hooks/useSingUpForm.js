import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducers/user";

export const useSignupForm = (navigation) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user.value);

  const [formData, setFormData] = useState({
    username: "",
    prenom: "",
    nomDeFamille: "",
    dateDerniereMenstruation: "",
    dateDebutGrossesse: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cachePassword, setCachePassword] = useState(false);
  const [modalEchecVisible, setModalEchecVisible] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const updateFormData = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDatePicked = useCallback(
    (pickedDate) => {
      const formattedDate = `${pickedDate.getDate()}-${
        pickedDate.getMonth() + 1
      }-${pickedDate.getFullYear()}`;
      updateFormData(currentField)(formattedDate);
      hideDatePicker();
    },
    [currentField]
  );

  const submitForm = useCallback(async () => {
    console.log("Soumission déclenchée avec :", formData);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/signupProject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      console.log("Réponse backend :", data);

      if (data.project?.token && formData.password) {
        dispatch(
          loginUser({
            username: formData.username,
            token: data.token,
            projectId: data.project._id,
            prenom: formData.prenom,
            email: formData.email,
            tokenProject: data.project.token,
            role: data.role,
          })
        );
        navigation.navigate("TabNavigator");
      } else if (!formData.password) {
        setMessageError("Le mot de passe est vide");
        setModalEchecVisible(true);
      } else {
        setMessageError(data?.error || "Erreur inattendue");
        setModalEchecVisible(true);
      }
    } catch (error) {
      console.error("Erreur fetch :", error);
      setMessageError("Erreur de connexion au serveur");
      setModalEchecVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, dispatch, navigation]);

  return {
    formData,
    updateFormData,
    cachePassword,
    setCachePassword,
    modalEchecVisible,
    setModalEchecVisible,
    messageError,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleDatePicked,
    submitForm,
    isSubmitting,
  };
};
