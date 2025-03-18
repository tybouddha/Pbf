const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchAppointments = async (token) => {
  const response = await fetch(`${API_URL}/rdv/${token}`);
  return response.json();
};
