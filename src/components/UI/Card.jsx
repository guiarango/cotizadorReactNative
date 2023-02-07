import { View } from "react-native";

//Styles
import styles from "./CardStyles";

const Card = (props) => {
  const newSyles = props.newSyles;
  return <View style={{ ...styles.card, ...newSyles }}>{props.children}</View>;
};

export default Card;
