import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
const styles = StyleSheet.create({
  flatList: { height: "100%", width: "90%", marginTop: 40 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    height: 50,
    width: 170,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    position: "absolute",
    backgroundColor: colors.primary,
    right: 30,
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
