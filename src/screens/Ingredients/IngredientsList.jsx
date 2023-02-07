import { View, Text, Button, FlatList } from "react-native";

const IngredientsList = ({ navigation }) => {
  return (
    <View>
      <Text>Pagina principal de Ingredients</Text>
      <Button
        title="navigate"
        onPress={() => navigation.navigate("createIngredient")}
      ></Button>
    </View>
  );
};

export default IngredientsList;
