import { useReducer, useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

//Actions
import { createNewRecipe } from "../../store/actions/recipes-actions";

//Components
import RecipeIngredientItem from "../Recipes/RecipeIngredientItem";
import Card from "../UI/Card";

//Styles
import styles from "./createRecipeFormStyles";
import MessagesModal from "../Modal/MessagesModal";

//Get Categories
import categories from "../../../data/categories.json";

const initialState = {
  ingredientId: "",
  ingredientCategory: "",
  ingredientQuantity: "",
};

const formReducer = (state, action) => {
  if (action.type === "CHANGE_NAME") {
    const newState = { ...state };
    return { ...newState, ingredientId: action.value };
  }

  if (action.type === "CHANGE_CATEGORY") {
    const newState = { ...state };
    return { ...newState, ingredientCategory: action.value };
  }

  if (action.type === "CHANGE_QUANTITY") {
    const newState = { ...state };
    return { ...newState, ingredientQuantity: action.value };
  }

  if (action.type === "REFRESH") {
    const newState = { ...initialState };
    return newState;
  }
  return initialState;
};

const CreateRecipeForm = () => {
  const navigation = useNavigation();
  const ingredientsListSelector = useSelector((state) => state.ingredientsList);
  const recipesListSelector = useSelector((state) => state.recipesList);

  const [state, dispatch] = useReducer(formReducer, initialState);
  const dispatchAction = useDispatch();
  const [newRecipe, setNewRecipe] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Por favor diligencia todos los campos del formulario."
  );
  const [modalIcon, setModalIcon] = useState("close-circle-outline");
  const dropDownCategoryRef = useRef({});
  const dropDownNameRef = useRef({});

  const onChangeRecipeName = (text) => {
    setNewRecipeName(text);
  };

  const onChangeCategory = (text) => {
    dispatch({ type: "CHANGE_CATEGORY", value: text });
    const ingredientsListFiltered = ingredientsListSelector.filter(
      (ingredient) => ingredient.ingredientCategory == text
    );
    setIngredientsList(ingredientsListFiltered);
  };
  const onChangeIngredientName = (text) => {
    dispatch({ type: "CHANGE_NAME", value: text.id });
  };
  const onChangeQuantity = (text) => {
    const newText = Number(text);
    dispatch({ type: "CHANGE_QUANTITY", value: newText });
  };

  const onDeleteIngredient = (id) => {
    const newArray = newRecipe.filter(
      (ingredient) => ingredient.ingredientId != id
    );

    setNewRecipe((prevState) => newArray);
  };

  const onSubmitHandler = () => {
    const id = "id" + Math.random().toString(16).slice(2);
    const isValid = newRecipeName !== "" && newRecipe.length > 0 && true;
    const nameAlreadyExist = recipesListSelector.some(
      (recipe) => recipe.recipeName === newRecipeName
    );

    if (nameAlreadyExist) {
      setShowModal(true);
      setModalMessage("El nombre de la receta ya existe.");
      setModalIcon("close-circle-outline");
      setTimeout(() => {
        setShowModal(false);
      }, 500);
      return;
    }

    if (isValid) {
      dispatchAction(
        createNewRecipe({
          id: id,
          recipeName: newRecipeName,
          ingredients: newRecipe,
        })
      );
      dispatch({ type: "REFRESH" });
      dropDownCategoryRef.current.reset();
      dropDownNameRef.current.reset();
      setShowModal(true);
      setModalMessage("Receta creada con exito.");
      setModalIcon("checkmark-circle-outline");
      setIngredientsList([]);
      setTimeout(() => {
        setShowModal(false);
        navigation.goBack();
      }, 500);
      return;
    }

    setShowModal(true);
    setModalMessage("Por favor diligencia todos los campos del formulario.");
    setModalIcon("close-circle-outline");
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const onAddIngredientHandler = () => {
    const { ingredientId, ingredientQuantity, ingredientCategory } = state;
    const isValid =
      ingredientId !== "" &&
      ingredientQuantity !== "" &&
      ingredientCategory !== "" &&
      true;

    //Validate that ingredients are not repeating themselves
    const nameAlreadyExist = newRecipe.some(
      (ingredient) => ingredient.ingredientId === ingredientId
    );

    if (nameAlreadyExist) {
      setShowModal(true);
      setModalMessage("El ingrediente ya existe dentro de la lista.");
      setModalIcon("close-circle-outline");
      setTimeout(() => {
        setShowModal(false);
      }, 500);
      return;
    }

    //Validate if it is possible to add an ingredient
    if (isValid) {
      delete state.ingredientCategory;
      setNewRecipe((prevState) => [...prevState, state]);
      dispatch({ type: "REFRESH" });
      dropDownCategoryRef.current.reset();
      dropDownNameRef.current.reset();
      setShowModal(true);
      setModalMessage("Ingrediente agregado con exito.");
      setModalIcon("checkmark-circle-outline");
      setIngredientsList([]);
      setTimeout(() => {
        setShowModal(false);
      }, 500);
      return;
    }

    setShowModal(true);
    setModalMessage("Por favor diligencia todos los campos del formulario.");
    setModalIcon("close-circle-outline");
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  const renderItem = ({ item }) => {
    return (
      <Card>
        <RecipeIngredientItem
          ingredient={item}
          onDeleteIngredient={onDeleteIngredient}
        />
      </Card>
    );
  };

  return (
    <>
      <View style={styles.addIngredientContainer}>
        <Pressable
          style={styles.addIngredient}
          onPress={onAddIngredientHandler}
        >
          <Text style={styles.submit}>Agregar Ingrediente</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.form}>
        {showModal && <MessagesModal message={modalMessage} icon={modalIcon} />}
        <View>
          <TextInput
            placeholder="Nombre de Receta"
            style={styles.input}
            value={newRecipeName}
            onChangeText={onChangeRecipeName}
          ></TextInput>
        </View>

        <SelectDropdown
          ref={dropDownCategoryRef}
          defaultButtonText={"Selecciona una categoría"}
          data={categories}
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          searchPlaceHolder="Selecciona una categoría"
          onSelect={(selectedItem, index) => {
            onChangeCategory(selectedItem);
          }}
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name="search" color={"#444"} size={18} />;
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
        />

        <SelectDropdown
          ref={dropDownNameRef}
          defaultButtonText={"Selecciona un ingrediente"}
          data={ingredientsList}
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          // search={true}
          searchPlaceHolder="Selecciona un ingrediente"
          onSelect={(selectedItem, index) => {
            onChangeIngredientName(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.ingredientName;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.ingredientName;
          }}
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name="search" color={"#444"} size={18} />;
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
        />

        <View>
          <TextInput
            keyboardType="numeric"
            placeholder="Cantidad"
            style={styles.input}
            value={`${state.ingredientQuantity}`}
            onChangeText={onChangeQuantity}
          ></TextInput>
        </View>

        <FlatList
          data={newRecipe}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList}
        />

        <View style={styles.submitContainer}>
          <Pressable style={styles.submitButton} onPress={onSubmitHandler}>
            <Text style={styles.submit}>Guardar Receta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateRecipeForm;
