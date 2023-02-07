import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

//Import Navigator
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

//Import Store
import store from "./src/store/index";

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
