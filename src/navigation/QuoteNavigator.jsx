import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Import components
import EditQuote from "../screens/Quotation/EditQuote";
import QuoteList from "../screens/Quotation/QuoteList";

const Stack = createNativeStackNavigator();
const QuoteNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="QuoteList"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="QuoteList"
        component={QuoteList}
        options={{ title: "Cotización" }}
      ></Stack.Screen>
      <Stack.Screen
        name="editQuote"
        component={EditQuote}
        options={{ title: "Editar ingrediente" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default QuoteNavigator;
