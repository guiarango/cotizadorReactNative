import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  recipeName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    height: "100%",
    backgroundColor: colors.secondary,
  },
  recipeText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  infoRecipe: {
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default styles;
