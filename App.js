import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as Font from "expo-font";
import { useState, useEffect } from "react";

import AccueilScreen from "./src/screens/AccueilScreen"; // Corrigé "Acceuil" -> "Accueil"
import AgendaScreen from "./src/screens/AgendaScreen";
import DocumentsScreen from "./src/screens/DocumentsScreen";
import CarnetBebeScreen from "./src/screens/CarnetBebeScreen";
import WelcomeScreen from "./src/screens/WelcomeScreens/WelcomeScreen";
import CreerProjetScreen from "./src/screens/WelcomeScreens/CreerProjet";
import ProfilScreen from "./src/screens/ProfilScreen";
import LoginScreen from "./src/screens/WelcomeScreens/LoginScreen";
import CameraScreen from "./src/screens/CameraScreen";
import InviterScreen from "./src/screens/WelcomeScreens/InviterScreen";
import styles from "./src/styles/AppStyles";

import IconView from "./src/components/NavComponents/IconView";

import user from "./reducers/user";
import document from "./reducers/document";

const store = configureStore({
  reducer: { user, document },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          let screenName = "";
          if (route.name === "Accueil") {
            // Corrigé "Acceuil" -> "Accueil"
            iconName = "home";
            screenName = "accueil"; // Uniformisé en minuscules
          } else if (route.name === "Agenda") {
            iconName = "calendar-alt";
            screenName = "agenda";
          } else if (route.name === "Documents") {
            iconName = "file-medical-alt";
            screenName = "documents";
          } else if (route.name === "CarnetBebe") {
            iconName = "baby";
            screenName = "carnet bébé"; // Corrigé "carnet bebé"
          }

          return (
            <IconView
              iconName={iconName}
              size={size}
              color={color}
              focused={focused}
              screenName={screenName}
            />
          );
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#007ACC",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 70,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="CarnetBebe" component={CarnetBebeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null); // Ajouté pour gérer les erreurs de chargement

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Caveat: require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        setLoadingError(
          "Erreur lors du chargement des polices : " + error.message
        );
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        {loadingError ? (
          <Text style={styles.errorText}>{loadingError}</Text>
        ) : (
          <>
            <ActivityIndicator size="large" color="#007ACC" />
            <Text style={styles.loadingText}>Chargement...</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="CreerProjet" component={CreerProjetScreen} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Invite" component={InviterScreen} />{" "}
          {/* Corrigé "invite" -> "Invite" */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
