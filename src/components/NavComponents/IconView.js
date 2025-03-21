import { Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import styles from "../../styles/NavComponentsStyles/IconViewStyles";

export default function IconView(props) {
  return (
    <View style={styles.container}>
      <View
        style={
          props.focused ? styles.sousContainerFocused : styles.sousContainer
        }
      >
        <FontAwesome
          name={props.iconName}
          size={props.size}
          color={props.color}
        />
        <Text style={styles.textStyle}>{props.screenName}</Text>
      </View>
    </View>
  );
}
