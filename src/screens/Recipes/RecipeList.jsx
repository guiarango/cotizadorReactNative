import { useSelector } from "react-redux";
import { View, Text, FlatList, Pressable } from "react-native";

//Styles
import styles from "./RecipesListStyles";

//Components
import Card from "../../components/UI/Card";
import RecipeListItem from "../../components/Recipes/RecipeListItem";

function sortAscending(a, b) {
  const aUppercase = a.recipeName.toUpperCase();
  const bUppercase = b.recipeName.toUpperCase();
  if (aUppercase > bUppercase) {
    return 1;
  }
  if (aUppercase < bUppercase) {
    return -1;
  }
  return 0;
}

const RecipesList = ({ navigation }) => {
  const recipesList = useSelector((state) => state.recipesList);
  const recipesSorted = [...recipesList].sort(sortAscending);

  const renderItem = ({ item }) => {
    return (
      <Card>
        <RecipeListItem recipe={item} />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate("createRecipe")}
      >
        <Text style={styles.pressableText}>Crear Receta</Text>
      </Pressable>

      <FlatList
        data={recipesSorted}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

export default RecipesList;
