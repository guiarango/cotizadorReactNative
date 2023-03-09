import { useState } from "react";
import { Pressable, Text, Alert, View } from "react-native";
import * as Location from "expo-location";

import styles from "./LocationSelectorStyles";

function LocationSelector(props) {
  const [pickedLocation, setPickedLocation] = useState(null);

  const handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();

    if (!isLocationOk) return;
    let location = await Location.getCurrentPositionAsync({
      timeout: 5000,
    });

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesita dar permisos de localizacion",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <Pressable style={styles.pressableLocation} onPress={handleGetLocation}>
        <Text style={styles.pressableText}>GET LOCATION</Text>
      </Pressable>
      <View>
        {pickedLocation !== null ? (
          <Text>
            {pickedLocation.lat} , {pickedLocation.lng}
          </Text>
        ) : (
          <Text>Waiting for location</Text>
        )}
      </View>
    </>
  );
}

export default LocationSelector;
