import { useState, useEffect } from "react";
import { fetchAppointments } from "../services/Api";

type AppointementType = {
  pourQui: string;
  practicien: string;
  lieu: string;
  heure: string;
  notes: string;
  _id: number | null;
  date: string;
};

type MarkedDateType = {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
  };
};

type FetchAppointmentsResponse = {
  rdv: AppointementType[];
};

type AppointementLogicReturnType = {
  rendezVous: {
    rdv: AppointementType[];
  };
  markedDates: MarkedDateType;
  setRendezVous: React.Dispatch<
    React.SetStateAction<{
      rdv: AppointementType[];
    }>
  >;
};

export const useAppointments = (
  projectToken: string | null
): AppointementLogicReturnType => {
  const [rendezVous, setRendezVous] = useState<{ rdv: AppointementType[] }>({
    rdv: [],
  });
  const [markedDates, setMarkedDates] = useState<MarkedDateType>({});

  useEffect(() => {
    if (projectToken) {
      fetchAppointments(projectToken)
        .then((data: FetchAppointmentsResponse) => {
          if (data.rdv) {
            setRendezVous({ rdv: data.rdv });
            const newMarkedDates: MarkedDateType = {};
            data.rdv.forEach((appointment: AppointementType) => {
              const date = appointment.date.split("T")[0];
              newMarkedDates[date] = { marked: true, dotColor: "blue" };
            });
            setMarkedDates(newMarkedDates);
          } else {
            setRendezVous({ rdv: [] });
            setMarkedDates({});
          }
        })
        .catch((error: unknown) => {
          console.error(
            "Erreur fetch appointments:",
            error instanceof Error ? error.message : "Erreur inconnue"
          );
        });
    }
  }, [projectToken]);

  return { rendezVous, markedDates, setRendezVous };
};
