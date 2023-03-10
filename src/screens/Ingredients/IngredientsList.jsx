import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, Pressable } from "react-native";

//Styles
import styles from "./ingredientsListStyles";

//Components
import Card from "../../components/UI/Card";
import IngredientItem from "../../components/Ingredients/IngredientItem";

//DB
import { getIngredientsFromDB } from "../../../src/store/actions/ingredients-actions";

function sortAscending(a, b) {
  const aUppercase = a.ingredientName.toUpperCase();
  const bUppercase = b.ingredientName.toUpperCase();
  if (aUppercase > bUppercase) {
    return 1;
  }
  if (aUppercase < bUppercase) {
    return -1;
  }
  return 0;
}

const IngredientsList = ({ navigation }) => {
  const dispatchAction = useDispatch();
  const ingredientsList = useSelector((state) => state.ingredientsList);
  const ingredientsSorted = [...ingredientsList].sort(sortAscending);
  useEffect(() => {
    dispatchAction(getIngredientsFromDB());
  }, []);

  // console.log(ingredientsList);

  const renderItem = ({ item }) => {
    return (
      <Card>
        <IngredientItem ingredient={item} />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("createIngredient")}
      >
        <Text style={styles.pressableText}>Crear Ingrediente</Text>
      </Pressable>

      <FlatList
        data={ingredientsSorted}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

export default IngredientsList;
