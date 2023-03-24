import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

//Initializa firebase
import { init } from "./src/services/sevices";
init();

//Import Navigator
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

//Import Store
import store from "./src/store/index";

//SQLite
import {
  initIngredients,
  initRecipes,
  initIntermediateTable,
  deleteIngredientTable,
  deleteRecipeTable,
  deleteIntermediateTable,
} from "./DB/index";

initIngredients()
  .then(() => {
    console.log("Ingredients database initialized");
    // deleteIngredientTable()
    //   .then(() => {
    //     console.log("Database dropped");
    //   })
    //   .catch((err) => {
    //     console.log("Database not dropped");
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log("Ingredients database failed");
    console.log(err);
  });

initRecipes()
  .then(() => {
    console.log("Recipes database initialized");
    // deleteRecipeTable()
    //   .then(() => {
    //     console.log("Database dropped");
    //   })
    //   .catch((err) => {
    //     console.log("Database not dropped");
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log("Recipes database failed");
    console.log(err);
  });

initIntermediateTable()
  .then(() => {
    console.log("Intermediate database initialized");
    // deleteIntermediateTable()
    //   .then(() => {
    //     console.log("Database dropped");
    //   })
    //   .catch((err) => {
    //     console.log("Database not dropped");
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log("Intermediate database failed");
    console.log(err);
  });

export default function App() {
  const [loaded] = useFonts({
    RobotoBoldItalic: require("./src/assets/fonts/Roboto-BoldItalic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
