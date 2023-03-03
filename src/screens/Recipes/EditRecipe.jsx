import { View } from "react-native";

import EditRecipeForm from "../../components/Recipes/EditRecipeForm";

const EditRecipe = ({ route }) => {
  const recipe = route.params;
  return (
    <View>
      <EditRecipeForm recipe={recipe}></EditRecipeForm>
    </View>
  );
};

export default EditRecipe;
