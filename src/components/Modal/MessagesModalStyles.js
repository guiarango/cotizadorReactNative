import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#424a519c",
  },
  modalStyle: {
    flex: 0.2,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    fontSize: 50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
  },
  modalOptions: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "space-between",
    flexDirection: "row",
    marginTop: 22,
  },
});

export default styles;
