import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp } from "@react-navigation/native";
import { loginUser } from "../reducers/user";
import { RootState } from "../../store";

// Typage de la navigation
type NavigationType = NavigationProp<any>;

// Interface pour le payload de loginUser (fournie par toi)
interface LoginPayload {
  username: string;
  token: string;
  projectId: string;
  email: string;
  tokenProject: string;
  role: string;
}

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
  link: string;
  username: string;
  password: string;
};

// Typage de la réponse API pour l'invitation (adapté à LoginPayload)
type InviteResponse = {
  data?: {
    tokenUser: string; // Correspond à "token" dans LoginPayload
    tokenProject: string;
    role: string;
    projectId: string; // Ajouté pour LoginPayload
    email: string; // Ajouté pour LoginPayload
  };
  error?: string;
};

// Typage du retour du hook
type UseInviteFormReturn = {
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
export const useInviteForm = (
  navigation: NavigationType
): UseInviteFormReturn => {
  const dispatch = useDispatch();
  const userReducer = useSelector<RootState, UserValueType>(
    (state) => state.user.value
  );

  const [formData, setFormData] = useState<FormDataType>({
    link: "",
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
    if (!formData.link || !formData.username || !formData.password) {
      setMessageError("Tous les champs sont requis");
      setModalEchecVisible(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/invites/${formData.link}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );
      const data = (await response.json()) as InviteResponse;

      console.log("Réponse backend :", data);

      if (data.data) {
        dispatch(
          loginUser({
            username: formData.username,
            token: data.data.tokenUser,
            tokenProject: data.data.tokenProject,
            role: data.data.role,
            projectId: data.data.projectId,
            email: data.data.email,
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
