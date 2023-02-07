import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Import Navigators
import QuoteNavigator from "./QuoteNavigator";
import RecipeNavigator from "./RecipeNavigator";
import IngredientNavigator from "./IngredientNavigator";

//Icons
import IonIcons from "@expo/vector-icons/Ionicons";

//Styles
import styles from "./bottomTabNavigatorStyles.js";

//Instance BottomTabs
const BottomTabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="QuotesTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <BottomTabs.Screen
        name="QuotesTab"
        component={QuoteNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.icon}>
                <IonIcons
                  name="md-wallet-outline"
                  size={30}
                  color="black"
                ></IonIcons>
                <Text>Cotizaciones</Text>
              </View>
            );
            styles;
          },
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="RecipesTab"
        component={RecipeNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.icon}>
                <IonIcons
                  name="md-reader-outline"
                  size={30}
                  color="black"
                ></IonIcons>
                <Text>Recetas</Text>
              </View>
            );
          },
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="IngredientsTab"
        component={IngredientNavigator}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.icon}>
                <IonIcons
                  name="md-restaurant-outline"
                  size={30}
                  color="black"
                ></IonIcons>
                <Text>Ingredientes</Text>
              </View>
            );
          },
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
