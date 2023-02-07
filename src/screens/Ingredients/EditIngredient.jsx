import { useEffect } from "react";
import { View, Text } from "react-native";

//Components
import EditIngredientForm from "../../components/Ingredients/EditIngredientForm";

const EditIngredient = ({ route }) => {
  return (
    <View>
      <EditIngredientForm ingredient={route.params}></EditIngredientForm>
    </View>
  );
};

export default EditIngredient;
