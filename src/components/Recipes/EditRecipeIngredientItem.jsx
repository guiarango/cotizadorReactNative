import { Text, View, Pressable } from "react-native";
// import { useSelector } from "react-redux";

import styles from "./RecipeIngredientItemStyles";

const EditRecipeIngredientItem = ({ ingredient, onDeleteIngredient }) => {
  // const ingredientsListSelector = useSelector((state) => state.ingredientsList);
  // const idIngredient = ingredient.ingredientId;
  // const [item] = ingredientsListSelector.filter(
  //   (ingredientItem) => ingredientItem.id == idIngredient
  // );

  const onDeleteItem = () => {
    onDeleteIngredient(ingredient.ingredientId);
  };

  return (
    <View>
      <Text style={styles.recipeName}>{ingredient.ingredientName}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRecipe}>
          <Text style={styles.ingredientText}>
            Cantidad: {ingredient.ingredientQuantity}
          </Text>
        </View>

        <View style={styles.infoRecipe}>
          <Pressable style={styles.delete} onPress={onDeleteItem}>
            <Text style={styles.submit}>Borrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditRecipeIngredientItem;
