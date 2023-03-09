import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
const styles = StyleSheet.create({
  pressableLocation: {
    height: 50,
    width: 170,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    position: "absolute",
    backgroundColor: colors.primary,
    left: 30,
    top: 30,
  },
  pressableText: {
    textAlign: "center",
    color: "white",
    letterSpacing: 1.1,
    fontWeight: "bold",
  },
});

export default styles;
