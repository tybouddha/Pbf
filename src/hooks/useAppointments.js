import { useState, useEffect } from "react";
import { fetchAppointments } from "../services/Api";

export const useAppointments = (projectToken) => {
  const [rendezVous, setRendezVous] = useState({ rdv: [] });
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (projectToken) {
      fetchAppointments(projectToken)
        .then((data) => {
          if (data.rdv) {
            setRendezVous({ rdv: data.rdv });
            const newMarkedDates = {};
            data.rdv.forEach((appointment) => {
              const date = appointment.date.split("T")[0];
              newMarkedDates[date] = { marked: true, dotColor: "blue" };
            });
            setMarkedDates(newMarkedDates);
          } else {
            setRendezVous({ rdv: [] });
            setMarkedDates({});
          }
        })
        .catch((error) => console.error("Erreur fetch appointments:", error));
    }
  }, [projectToken]);

  return { rendezVous, markedDates, setRendezVous };
};
