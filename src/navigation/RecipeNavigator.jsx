import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Import components
import CreateRecipe from "../screens/Recipes/CreateRecipe";
import EditRecipe from "../screens/Recipes/EditRecipe";
import RecipeList from "../screens/Recipes/RecipeList";

const Stack = createNativeStackNavigator();
const RecipeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ingredientsList"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="recipesList"
        component={RecipeList}
        options={{ title: "Recetas" }}
      ></Stack.Screen>
      <Stack.Screen
        name="createRecipe"
        component={CreateRecipe}
        options={{ title: "Crear receta" }}
      ></Stack.Screen>
      <Stack.Screen
        name="editRecipe"
        component={EditRecipe}
        options={{ title: "Editar receta" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecipeNavigator;
