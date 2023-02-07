import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  form: { marginTop: 30 },
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
    margin: 30,
    alignItems: "center",

    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: 50,
  },
  submit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  disabled: { backgroundColor: colors.gray },
  delete: { backgroundColor: colors.danger },
});

export default styles;
