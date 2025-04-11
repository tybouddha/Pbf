import { useState, useCallback } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
import { RootState } from "../../store";

// Typage de la navigation
type NavigationType = NavigationProp<any>;

// Typage des données utilisateur depuis Redux (aligné avec LoginPayload)
type UserValueType = {
  username: string | null;
  token: string | null;
  projectId: string | null;
  email: string | null;
  tokenProject: string | null;
  role: string | null;
};

// Typage des données du formulaire
type FormDataType = {
  username: string;
  password: string;
};

// Typage de la réponse API pour la connexion
type LoginResponseType = {
  result?: boolean;
  response?: {
    token: string;
    project: {
      _id: string;
      token: string;
    };
    role: string;
    email: string; // Ajouté pour correspondre à LoginPayload
  };
  error?: string;
};

// Typage du retour du hook
type LoginFormReturnType = {
  modalEchecVisible: boolean;
  setModalEchecVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormDataType;
  updateFormData: (field: keyof FormDataType) => (value: string) => void;
  cachePassword: boolean;
  setCachePassword: React.Dispatch<React.SetStateAction<boolean>>;
  messageError: string;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
};

// Définition du hook avec typage
export const useLoginForm = (
  navigation: NavigationType
): LoginFormReturnType => {
  const dispatch = useDispatch();
  const userReducer = useSelector<RootState, UserValueType>(
    (state) => state.user.value
  );

  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cachePassword, setCachePassword] = useState<boolean>(false);
  const [modalEchecVisible, setModalEchecVisible] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");

  const updateFormData =
    (field: keyof FormDataType) =>
    (value: string): void =>
      setFormData((prev) => ({ ...prev, [field]: value }));

  const submitForm = useCallback(async (): Promise<void> => {
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
      const data = (await response.json()) as LoginResponseType;

      console.log("Réponse backend :", data);

      if (data.result && data.response) {
        dispatch(
          loginUser({
            username: formData.username,
            token: data.response.token,
            projectId: data.response.project._id,
            email: data.response.email,
            tokenProject: data.response.project.token,
            role: data.response.role,
          })
        );
        navigation.navigate("TabNavigator");
      } else {
        setMessageError(data?.error || "Erreur inattendue");
        setModalEchecVisible(true);
      }
    } catch (error: unknown) {
      console.error("Erreur fetch :", error);
      setMessageError("Erreur de connexion au serveur");
      setModalEchecVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, dispatch, navigation]);

  return {
    modalEchecVisible,
    setModalEchecVisible,
    formData,
    updateFormData,
    cachePassword,
    setCachePassword,
    messageError,
    submitForm,
    isSubmitting,
  };
};
