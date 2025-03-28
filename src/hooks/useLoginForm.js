import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducers/user";

export const useLoginForm = (navigation) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user.value);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cachePassword, setCachePassword] = useState(false);
  const [modalEchecVisible, setModalEchecVisible] = useState(false);
  const [messageError, setMessageError] = useState("");

  const updateFormData = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const submitForm = useCallback(async () => {
    console.log("Soumission déclenchée avec :", formData);
    if (!formData.username || !formData.password) {
      setMessageError("Tous les champs sont requis");
      setModalEchecVisible(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      console.log("Réponse backend :", data);

      if (data.result) {
        dispatch(
          loginUser({
            username: formData.username,
            token: data.response.token,
            projectId: data.response.project._id,
            tokenProject: data.response.project.token,
            role: data.response.role,
          })
        );
        navigation.navigate("TabNavigator");
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
    submitForm,
    isSubmitting,
  };
};
