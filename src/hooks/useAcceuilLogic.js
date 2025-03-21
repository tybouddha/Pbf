import { useState, useCallback } from "react";

export const useAccueilLogic = (user, appointments) => {
  const { tokenProject, role: userRole } = user;

  const [selectedDate, setSelectedDate] = useState("");
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  const [rendezVousDuJour, setRendezVousDuJour] = useState([]);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);
  const [babyModalVisible, setBabyModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [inviteRole, setInviteRole] = useState("lecteur");
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
  }, [tokenProject, inviteRole]);

  return {
    selectedDate,
    agendaModalVisible,
    rendezVousDuJour,
    handleDayPress,
    inviteModalVisible,
    inviteRole,
    inviteLink,
    handleInviteSubmit,
    generateInviteCode,
    setInviteModalVisible,
    setInviteRole,
    setMamanModalVisible,
    setBabyModalVisible,
    mamanModalVisible,
    babyModalVisible,
  };
};
