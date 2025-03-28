// hooks/useAccueilLogic.js
import { useState, useCallback } from "react";
import { useCloseModalGeneric } from "../utils/useCloseModalGeneric";

export const useAccueilLogic = (user, appointments) => {
  const { tokenProject, role: userRole } = user;
  const closeModalGeneric = useCloseModalGeneric();

  const [selectedDate, setSelectedDate] = useState("");
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  const [rendezVousDuJour, setRendezVousDuJour] = useState([]);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);
  const [babyModalVisible, setBabyModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [inviteRole, setInviteRole] = useState("lecteur"); // Rôle de l'invité
  const [inviteLink, setInviteLink] = useState("");

  const handleDayPress = useCallback(
    (day) => {
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
    selectedDate,
    agendaModalVisible,
    inviteModalVisible,
    mamanModalVisible,
    babyModalVisible,
    rendezVousDuJour,
    handleDayPress,
    handleInviteSubmit,
    generateInviteCode,
    toggleSwitch,
    inviteLink,
    inviteRole, // Retourné
    setInviteRole, // Retourné
    setAgendaModalVisible,
    setInviteModalVisible,
    setMamanModalVisible,
    setBabyModalVisible,
    closeModalGeneric,
  };
};
