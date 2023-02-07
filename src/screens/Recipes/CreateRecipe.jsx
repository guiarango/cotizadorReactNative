import { View, Text, Button } from "react-native";

const CreateRecipe = ({ navigation }) => {
  return (
    <View>
      <Text>Pagina create Ingredients</Text>
      <Button
        title="navigate"
        onPress={() => navigation.navigate("editRecipe")}
      ></Button>
    </View>
  );
};

export default CreateRecipe;
