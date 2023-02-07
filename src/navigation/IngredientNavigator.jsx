import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Import components
import CreateIngredient from "../screens/Ingredients/CreateIngredient";
import EditIngredient from "../screens/Ingredients/EditIngredient";
import IngredientsList from "../screens/Ingredients/IngredientsList";

const Stack = createNativeStackNavigator();
const IngredientNavigator = () => {
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
        name="ingredientsList"
        component={IngredientsList}
        options={{ title: "Ingredientes" }}
      ></Stack.Screen>
      <Stack.Screen
        name="createIngredient"
        component={CreateIngredient}
        options={{ title: "Crear ingrediente" }}
      ></Stack.Screen>
      <Stack.Screen
        name="editIngredient"
        component={EditIngredient}
        options={{ title: "Editar ingrediente" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default IngredientNavigator;
