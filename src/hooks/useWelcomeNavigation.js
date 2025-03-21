import { useCallback } from "react";

export const useWelcomeNavigation = (navigation) => {
  const navigateToLogin = useCallback(() => {
    console.log("- aller à LoginScreen 📢");
    navigation.navigate("Login");
  }, [navigation]);

  const navigateToCreerProjet = useCallback(() => {
    console.log("- aller à pressedCreerProjet 📢");
    navigation.navigate("CreerProjet");
  }, [navigation]);

  const navigateToInviter = useCallback(() => {
    console.log("- pressedInviter 📢");
    navigation.navigate("invite");
  }, [navigation]);

  return {
    navigateToLogin,
    navigateToCreerProjet,
    navigateToInviter,
  };
};
