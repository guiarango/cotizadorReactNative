import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  addIngredientContainer: {
    display: "flex",
  },
  flatList: {
    display: "flex",
    height: "100%",
    width: "100%",
    padding: 10,
  },
  input: {
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    borderRadius: 5,
    padding: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  dropDown: {
    justifyContent: "center",
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    width: "92%",
    height: 50,
    borderRadius: 5,
    padding: 15,
  },
  dropDownText: { fontSize: 16 },
  submitContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
    marginTop: 20,
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "45%",
    borderRadius: 5,
    height: 50,
  },
  submit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  addIngredient: {
    heigh: 50,
    width: 190,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    textAlign: "center",
    alignContent: "center",
    marginTop: 15,
    marginRight: 15,
  },
  disabled: { backgroundColor: colors.gray },
});

export default styles;
