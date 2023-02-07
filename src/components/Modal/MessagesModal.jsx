import React from "react";
import { Text, View, Button, Modal } from "react-native";

//Icons
import IonIcons from "@expo/vector-icons/Ionicons";

//Import Styles
import styles from "./MessagesModalStyles";

function MessagesModal({ message, succesful }) {
  const icon = succesful ? (
    <IonIcons
      name="checkmark-circle-outline"
      size={30}
      color="black"
    ></IonIcons>
  ) : (
    <IonIcons name="close-circle-outline" size={30} color="black"></IonIcons>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalStyle}>
          <Text>{`${message}`}</Text>
          <View style={styles.modalOptions}>{icon}</View>
        </View>
      </View>
    </Modal>
  );
}

export default MessagesModal;
