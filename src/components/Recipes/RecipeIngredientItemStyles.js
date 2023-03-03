import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  recipeName: {
    fontSize: 16,
    color: "black",
    backgroundColor: colors.secondary,
    paddingLeft: 10,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoRecipe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
  },
  delete: { backgroundColor: colors.danger, padding: 10, borderRadius: 5 },
  submit: { color: "white", fontSize: 16 },
});

export default styles;
