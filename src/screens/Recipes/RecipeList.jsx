import { View, Text, Button, FlatList } from "react-native";

const RecipeList = ({ navigation }) => {
  return (
    <View>
      <Text>Pagina principal de Recipe</Text>
      <Button
        title="navigate"
        onPress={() => navigation.navigate("createRecipe")}
      ></Button>
    </View>
  );
};

export default RecipeList;
