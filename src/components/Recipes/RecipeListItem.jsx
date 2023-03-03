import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./RecipeListStyles";

const RecipeListItem = ({ recipe }) => {
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate("editRecipe", recipe);
  };
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.recipeName}>
        <Text style={styles.recipeText}>{recipe.recipeName}</Text>
      </View>

      {/* <View style={styles.infoContainer}>
        <View style={styles.infoIngredient}>
          <Text style={styles.ingredientText}>
            Marca: {ingredient.ingredientBrand}
          </Text>
          <Text style={styles.ingredientText}>
            Categoria: {ingredient.ingredientCategory}
          </Text>
          <Text style={styles.ingredientText}>
            Medida: {ingredient.ingredientMeasurementUnit}
          </Text>
        </View>
        <View style={styles.infoIngredient}>
          <Text style={styles.ingredientText}>
            Cantidad: {ingredient.ingredientQuantity}
          </Text>
          <Text style={styles.ingredientText}>
            Costo: {`$ ${ingredient.ingredientCost}`}
          </Text>

          <Text style={styles.ingredientText}>
            Costo por unidad: {`$ ${ingredient.ingredientCostPerMeasure}`}
          </Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

export default RecipeListItem;
