import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    // position: "absolute",
    // bottom: 25,
    // left: 20,
    // right: 20,
    borderRadius: 5,
    height: 80,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
