import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

//Import Navigator
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

//Import Store
import store from "./src/store/index";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
