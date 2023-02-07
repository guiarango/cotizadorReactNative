import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  ingredientName: {
    fontSize: 16,
    color: "black",
    backgroundColor: colors.secondary,
    paddingLeft: 10,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoIngredient: {
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  ingredientText: {},
});

export default styles;
