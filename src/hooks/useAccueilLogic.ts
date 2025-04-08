import React, { useState, useCallback } from "react";
import {
  useCloseModalGeneric,
  SetModalStateType,
} from "../utils/useCloseModalGeneric";

type UserType = {
  token: string | null;
  projectId: string | null;
  username: string | null;
  email: string | null;
  tokenProject: string | null;
  role: string | null;
};

type AppointmentType = {
  date: string;
  pourQui: string;
  practicien: string;
  lieu: string;
  notes: string;
  heure: string;
};

type DayType = {
  dateString: string; // ex. "2023-10-15"
  day: number; // ex. 15
  month: number; // ex. 10
  year: number; // ex. 2023
  timestamp: number; // timestamp Unix
};

type AccueilLogicReturnType = {
  agendaModalVisible: boolean;
  setAgendaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inviteModalVisible: boolean;
  setInviteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mamanModalVisible: boolean;
  setMamanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  babyModalVisible: boolean;
  setBabyModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string;
  rendezVousDuJour: AppointmentType[];
  inviteLink: string;
  inviteRole: "lecteur" | "editeur";
  setInviteRole: React.Dispatch<React.SetStateAction<"lecteur" | "editeur">>;
  handleDayPress: (day: DayType) => void;
  handleInviteSubmit: () => void;
  generateInviteCode: () => void;
  toggleSwitch: () => void;
  closeModalGeneric: (setModalState: SetModalStateType) => void;
};

export const useAccueilLogic = (
  user: UserType,
  appointments: AppointmentType[]
): AccueilLogicReturnType => {
  const { tokenProject, role: userRole } = user;
  const closeModalGeneric = useCloseModalGeneric();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [agendaModalVisible, setAgendaModalVisible] = useState<boolean>(false);
  const [rendezVousDuJour, setRendezVousDuJour] = useState<AppointmentType[]>(
    []
  );
  const [mamanModalVisible, setMamanModalVisible] = useState<boolean>(false);
  const [babyModalVisible, setBabyModalVisible] = useState<boolean>(false);
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [inviteRole, setInviteRole] = useState<"lecteur" | "editeur">(
    "lecteur"
  );
  const [inviteLink, setInviteLink] = useState<string>("");

  const handleDayPress = useCallback(
    (day: DayType) => {
      const dateKey = day.dateString;
      setSelectedDate(dateKey);
      const dailyAppointments = appointments.filter(
        (rdv) => rdv.date.split("T")[0] === dateKey
      );
      if (dailyAppointments.length > 0) {
        setRendezVousDuJour(dailyAppointments);
        setAgendaModalVisible(true);
      }
    },
    [appointments]
  );

  const toggleSwitch = () =>
    setInviteRole((prev) => (prev === "lecteur" ? "editeur" : "lecteur"));

  const handleInviteSubmit = useCallback(() => {
    if (userRole !== "propriétaire") {
      alert("Accès bloqué : réservé au propriétaire");
    } else {
      setInviteModalVisible(true);
    }
  }, [userRole]);

  const generateInviteCode = useCallback(() => {
    const link = `${tokenProject}/${inviteRole}`;
    setInviteLink(link);
    closeModalGeneric(setInviteModalVisible); // Ferme la modal d'invitation
  }, [tokenProject, inviteRole, setInviteLink, setInviteModalVisible]);

  return {
    agendaModalVisible,
    setAgendaModalVisible,
    inviteModalVisible,
    setInviteModalVisible,
    mamanModalVisible,
    setMamanModalVisible,
    babyModalVisible,
    setBabyModalVisible,
    rendezVousDuJour,
    selectedDate,
    inviteLink,
    inviteRole,
    setInviteRole,
    handleDayPress,
    handleInviteSubmit,
    generateInviteCode,
    toggleSwitch,
    closeModalGeneric,
  };
};
