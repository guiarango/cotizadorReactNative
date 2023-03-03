import { View, Text, Button } from "react-native";

//Components
import CreateRecipeForm from "../../components/Recipes/CreateRecipeForm";

const CreateRecipe = ({ navigation }) => {
  return (
    <View>
      <CreateRecipeForm></CreateRecipeForm>
    </View>
  );
};

export default CreateRecipe;
