import React from "react";
import { Text, View, Button, Modal } from "react-native";

//Icons
import IonIcons from "@expo/vector-icons/Ionicons";

//Import Styles
import styles from "./MessagesModalStyles";

function MessagesModal({ message, icon }) {
  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalStyle}>
          <Text style={styles.modalText}>{`${message}`}</Text>
          <View style={styles.modalOptions}>
            <IonIcons name={icon} size={60} color="black"></IonIcons>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MessagesModal;
