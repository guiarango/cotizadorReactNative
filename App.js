import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

//Import Navigator
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

//Import Store
import store from "./src/store/index";

//SQLite
import { init, deleteTable } from "./DB/index";

init()
  .then(() => {
    console.log("Database initialized");
    // deleteTable()
    //   .then(() => {
    //     console.log("Database dropped");
    //   })
    //   .catch((err) => {
    //     console.log("Database not dropped");
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log("Database failed");
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
