import { StyleSheet } from "react-native";

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
    marginBottom: 30,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    width: "50%",
    borderRadius: 5,
    height: 50,
  },
  submit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  disabled: { backgroundColor: "#9e9b9b" },
});

export default styles;
