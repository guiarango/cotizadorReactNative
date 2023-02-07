import { View, Text, Button, FlatList } from "react-native";

const QuoteList = ({ navigation }) => {
  return (
    <View>
      <Text>Pagina principal de Quote</Text>
      <Button
        title="navigate"
        onPress={() => navigation.navigate("editQuote")}
      ></Button>
    </View>
  );
};

export default QuoteList;
