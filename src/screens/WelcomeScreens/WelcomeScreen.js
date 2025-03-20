import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import TemplateViewNoNav from "../../components/Template/TemplateViewNoNav";

export default function WelcomeScreen({ navigation }) {
  const pressedLogin = () => {
    // console.log("- aller à LoginScreen 📢");
    navigation.navigate("Login");
  };

  const pressedCreerProjet = () => {
    // console.log("- aller à pressedCreerProjet 📢");
    navigation.navigate("CreerProjet");
  };

  const pressedInviter = () => {
    console.log("- pressedInviter 📢");
    navigation.navigate("invite");
  };

  return (
    <TemplateViewNoNav>
      <View style={styles.container}>
        <View style={styles.vwBtn}>
          <TouchableOpacity style={styles.btn} onPress={() => pressedLogin()}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vwBtn}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => pressedCreerProjet()}
          >
            <Text style={styles.btnText}>Créer Projet</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vwBtn}>
          <TouchableOpacity style={styles.btn} onPress={() => pressedInviter()}>
            <Text style={styles.btnText}>Compte inviter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TemplateViewNoNav>
  );
}
