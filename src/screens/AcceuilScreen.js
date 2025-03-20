import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import HeaderView from "../components/NavComponents/HeaderView";
import InviteModal from "../components/InviteModal";
import AgendaModal from "../components/AgendaModal";
import NutritionGuideModal from "../components/NutritionGuideModal";
import { useAppointments } from "../hooks/useAppointments";
import styles from "../styles/AccueilStyles";

const guideNutritionMaman = [
  "Les besoins nutritionnels lors de la grossesse sont bien spécifiques : les besoins en énergie augmentent dès le 2e trimestre et surtout lors du 3e et des besoins spécifiques apparaissent : besoins supplémentaires en fer, en calcium et en vitamines.",
  "Une alimentation équilibrée et énergétique essentielle pour le bon développement du bébé.",
  "L'apport énergétique par l'alimentation ne doit pas être inférieur à 1 600 kcal/jour au risque d'avoir une répercussion sur la croissance du fœtus. Pour couvrir les besoins nutritionnels, l'alimentation doit être diversifiée et équilibrée.",
  "Une alimentation équilibrée, c'est manger :cinq fruits et légumes par jour",
  "du pain, des céréales et d'autres sucres lents (légumineuses) à chaque repas selon votre appétit",
  "des produits laitiers trois fois par jour",
  "des protéines (viande, poisson ou œufs), chaque jour ;",
  "de l'eau à volonté.",
  "Il est important également de limiter sa consommation de matières grasses, de sel et de produits sucrés. Pour ces derniers, privilégiez les sucres lents (féculents, céréales, pain, légumes secs) et prenez l'habitude de les intégrer à tous vos repas.",
];
const guideNutritionBebe = [
  "Le lait constitue l’aliment essentiel et unique du bébé de sa naissance à l’âge de 6 mois. Il contient tous les nutriments nécessaires à sa croissance et à la prévention des infections. Que ce soit au sein ou au biberon, la tétée est un moment d'échange privilégié avec votre enfant.",
  "Les bénéfices de l'allaitement maternel pour le bébé Outre le lien relationnel mère-enfant, l'allaitement apporte au nourrisson tout ce dont il a besoin pour se développer.",
  "Même si l'allaitement ne dure que quelques semaines, il est bénéfique à votre enfant. En effet, le lait maternel est facile à digérer et il est vite assimilé. Le lait maternel est riche en anticorps, vitamines, sels minéraux, oligo-éléments, sucres, graisses, protéines... Tout ce dont votre bébé a besoin pour bien démarrer dans la vie.",
  "L'allaitement maternel est également bénéfique pour la maman car il :permet une perte de poids plus rapide dans les 6 premiers mois après l'accouchement,diminue le risque de survenue ultérieure d'un diabète de type 2,réduit à long terme le risque de cancer du sein ou de l'ovaire avant la ménopause,aurait également un rôle dans la prévention de l'ostéoporose après la ménopause.",
];

export default function AcceuilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const { username, tokenProject, role: userRole } = user;

  const [selectedDate, setSelectedDate] = useState("");
  const [agendaModalVisible, setAgendaModalVisible] = useState(false);
  const [rendezVousDuJour, setRendezVousDuJour] = useState([]);
  const [mamanModalVisible, setMamanModalVisible] = useState(false);
  const [babyModalVisible, setBabyModalVisible] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [inviteRole, setInviteRole] = useState("lecteur");
  const [inviteLink, setInviteLink] = useState("");

  const { rendezVous, markedDates } = useAppointments(tokenProject);

  const handleDayPress = (day) => {
    const dateKey = day.dateString;
    setSelectedDate(dateKey);
    const dailyAppointments = rendezVous.rdv.filter(
      (rdv) => rdv.date.split("T")[0] === dateKey
    );
    if (dailyAppointments.length > 0) {
      setRendezVousDuJour(dailyAppointments);
      setAgendaModalVisible(true);
    }
  };

  const handleInviteSubmit = () => {
    if (userRole !== "propriétaire") {
      alert("Accès bloqué : réservé au propriétaire");
    } else {
      setInviteModalVisible(true);
    }
  };

  const generateInviteCode = () => {
    const link = `${tokenProject}/${inviteRole}`;
    setInviteLink(link);
  };
  return (
    <ImageBackground
      source={require("../../assets/images/projectbaby-background.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <HeaderView navigation={navigation} />
        </View>
        <Text style={styles.title}>Bienvenue {username} sur BabyProject!</Text>

        <View style={styles.div_btn}>
          <TouchableOpacity style={styles.btn} onPress={handleInviteSubmit}>
            <Text>Inviter un proche</Text>
          </TouchableOpacity>
        </View>

        <InviteModal
          visible={inviteModalVisible}
          onClose={() => setInviteModalVisible(false)}
          role={inviteRole}
          setRole={setInviteRole}
          link={inviteLink}
          onGenerate={generateInviteCode}
        />

        <View>
          <Text style={styles.title}>Calendrier de votre Projet</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={handleDayPress}
            minDate="2024-10-31"
            maxDate="2035-12-31"
            markedDates={markedDates}
          />
        </View>

        <AgendaModal
          visible={agendaModalVisible}
          onClose={() => setAgendaModalVisible(false)}
          selectedDate={selectedDate}
          appointments={rendezVousDuJour}
        />

        <View style={styles.viewGuide}>
          <TouchableOpacity
            style={styles.alimentationBTN}
            onPress={() => setBabyModalVisible(true)}
          >
            <Text>Conseil alimentation bébé</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alimentationBTN}
            onPress={() => setMamanModalVisible(true)}
          >
            <Text>Conseil alimentation maman</Text>
          </TouchableOpacity>
        </View>

        <NutritionGuideModal
          visible={babyModalVisible}
          onClose={() => setBabyModalVisible(false)}
          title="Conseil nutrition bébé"
          content={guideNutritionBebe}
        />
        <NutritionGuideModal
          visible={mamanModalVisible}
          onClose={() => setMamanModalVisible(false)}
          title="Conseil nutrition maman"
          content={guideNutritionMaman}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
