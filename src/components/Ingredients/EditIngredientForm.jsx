import { useReducer, useState, useRef, useEffect } from "react";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

//Services
import { fetchCategories, fetchMeasureUnits } from "../../services/sevices";

//Actions
import {
  editIngredient,
  deleteIngredient,
} from "../../store/actions/ingredients-actions";

//Styles
import styles from "./editIngredientFormStyles";
import MessagesModal from "../Modal/MessagesModal";

//[{name, brand, unit measure, quantity, cost, unit cost, photo }]
// import categories from "../../../data/categories.json";
// import measureUnit from "../../../data/measureUnits.json";

const initialState = {
  id: "",
  ingredientName: "",
  ingredientBrand: "",
  ingredientQuantity: "",
  ingredientCost: "",
  ingredientCostPerMeasure: "",
  ingredientCategory: null,
  ingredientMeasurementUnit: null,
  ingredientPhoto: "",
};

const formReducer = (state, action) => {
  if (action.type === "CHANGE_NAME") {
    const newState = state;
    return { ...newState, ingredientName: action.value };
  }
  if (action.type === "CHANGE_BRAND") {
    const newState = state;
    return { ...newState, ingredientBrand: action.value };
  }
  if (action.type === "CHANGE_QUANTITY") {
    const newState = state;
    return { ...newState, ingredientQuantity: action.value };
  }
  if (action.type === "CHANGE_COST") {
    const newState = state;
    return { ...newState, ingredientCost: action.value };
  }
  if (action.type === "CHANGE_CATEGORY") {
    const newState = state;
    return { ...newState, ingredientCategory: action.value };
  }

  if (action.type === "CHANGE_MEASUREMENT") {
    const newState = state;
    return { ...newState, ingredientMeasurementUnit: action.value };
  }
  if (action.type === "CHANGE_PHOTO") {
    const newState = state;
    return { ...newState, ingredientPhoto: action.value };
  }
  if (action.type === "CHANGE_COST_PER_UNIT") {
    const newState = state;

    const quantity = newState.ingredientQuantity;
    const cost = newState.ingredientCost;
    const costPerUnit = quantity && cost && cost / quantity;

    if (costPerUnit) {
      return { ...newState, ingredientCostPerMeasure: costPerUnit };
    }

    return { ...newState, ingredientCostPerMeasure: 0 };
  }
  if (action.type === "REFRESH") {
    const newState = initialState;
    return newState;
  }
  if (action.type === "LOAD_VALUES") {
    const newState = state;
    return { ...newState, ...action.value };
  }
  return initialState;
};

const EditIngredientForm = ({ ingredient }) => {
  const navigation = useNavigation();
  const dispatchAction = useDispatch();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Por favor diligencia todos los campos del formulario."
  );
  const [modalIcon, setModalIcon] = useState("close-circle-outline");
  const dropDownCategoryRef = useRef({});
  const dropDownMeasureRef = useRef({});
  const [categories, setCategories] = useState("");
  const [measureUnit, setMeasureUnit] = useState("");

  useEffect(() => {
    async function fetchData() {
      const categoriesFetched = await fetchCategories();
      const measureUnitFetched = await fetchMeasureUnits();

      setCategories(Object.values(categoriesFetched));
      setMeasureUnit(Object.values(measureUnitFetched));
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: "LOAD_VALUES",
      value: {
        id: ingredient.id,
        ingredientName: ingredient.ingredientName,
        ingredientBrand: ingredient.ingredientBrand,
        ingredientQuantity: String(ingredient.ingredientQuantity),
        ingredientCost: String(ingredient.ingredientCost),
        ingredientCostPerMeasure: ingredient.ingredientCostPerMeasure,
        ingredientCategory: ingredient.ingredientCategory,
        ingredientMeasurementUnit: ingredient.ingredientMeasurementUnit,
        ingredientPhoto: "",
      },
    });
  }, []);

  const onChangeBrand = (text) => {
    const newText = text;
    dispatch({ type: "CHANGE_BRAND", value: newText });
  };

  const onChangeQuantity = (text) => {
    const newText = Number(text);
    dispatch({ type: "CHANGE_QUANTITY", value: newText });
    onChangeCostPerUnit();
  };

  const onChangeCost = (text) => {
    const newText = Number(text);
    dispatch({ type: "CHANGE_COST", value: newText });
    onChangeCostPerUnit();
  };

  const onChangeCostPerUnit = () => {
    dispatch({ type: "CHANGE_COST_PER_UNIT" });
  };

  const onChangeCategory = (text) => {
    dispatch({ type: "CHANGE_CATEGORY", value: text });
  };

  const onChangeMeasurementUnit = (text) => {
    dispatch({ type: "CHANGE_MEASUREMENT", value: text });
  };

  const onChangePhoto = (text) => {
    const newText = text.trim();
    dispatch({ type: "CHANGE_PHOTO", value: newText });
  };

  const onEditHandler = () => {
    const ingredientName = state.ingredientName.trim();
    const ingredientBrand = state.ingredientBrand.trim();
    const ingredientQuantity = Number(state.ingredientQuantity);
    const ingredientCost = Number(state.ingredientCost);
    const ingredientCostPerMeasure = Number(state.ingredientCostPerMeasure);
    const ingredientCategory = state.ingredientCategory;
    const ingredientMeasurementUnit = state.ingredientMeasurementUnit;

    const isValid =
      ingredientName !== "" &&
      ingredientBrand !== "" &&
      ingredientQuantity !== "" &&
      ingredientCost !== "" &&
      ingredientCostPerMeasure !== "" &&
      ingredientCategory &&
      ingredientMeasurementUnit &&
      true;
    if (isValid) {
      dispatchAction(editIngredient(state));
      setShowModal(true);
      setModalMessage("Ingrediente editado con exito.");
      setModalIcon("checkmark-circle-outline");
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    } else {
      setShowModal(true);
      setModalMessage("Por favor diligencia todos los campos del formulario.");
      setModalIcon("close-circle-outline");
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    }
  };

  const onDeleteHandler = () => {
    setShowModal(true);
    setModalMessage("Ingrediente eliminado con exito.");
    setModalIcon("checkmark-circle-outline");

    setTimeout(() => {
      setShowModal(false);
      navigation.navigate("ingredientsList");
      dispatchAction(deleteIngredient({ id: state.id }));
    }, 500);
  };

  return (
    <ScrollView style={styles.form}>
      {showModal && <MessagesModal message={modalMessage} icon={modalIcon} />}
      <View>
        <Text
          style={{ ...styles.input, ...styles.disabled }}
        >{`${state.ingredientName}`}</Text>
      </View>
      <View>
        <TextInput
          placeholder="Marca"
          style={styles.input}
          value={state.ingredientBrand}
          onChangeText={onChangeBrand}
        ></TextInput>
      </View>

      <View>
        <TextInput
          keyboardType="numeric"
          placeholder="Cantidad"
          style={styles.input}
          value={state.ingredientQuantity}
          onChangeText={onChangeQuantity}
        ></TextInput>
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          placeholder="Costo"
          style={styles.input}
          value={state.ingredientCost}
          onChangeText={onChangeCost}
        ></TextInput>
      </View>
      <View>
        <Text style={{ ...styles.input, ...styles.disabled }}>
          {`$ ${state.ingredientCostPerMeasure}`}
        </Text>
      </View>
      <SelectDropdown
        ref={dropDownCategoryRef}
        defaultButtonText={"Selecciona una categoría"}
        data={categories}
        buttonStyle={styles.dropDown}
        buttonTextStyle={styles.dropDownText}
        defaultValue={ingredient.ingredientCategory}
        // search={true}
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
        ref={dropDownMeasureRef}
        defaultButtonText={"Selecciona una unidad de medida"}
        data={measureUnit}
        buttonStyle={styles.dropDown}
        buttonTextStyle={styles.dropDownText}
        defaultValue={ingredient.ingredientMeasurementUnit}
        // search={true}
        searchPlaceHolder="Selecciona una unidad de medida"
        onSelect={(selectedItem, index) => {
          onChangeMeasurementUnit(selectedItem);
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

      <View style={styles.submitContainer}>
        <Pressable style={styles.submitButton} onPress={onEditHandler}>
          <Text style={styles.submit}>Editar Ingrediente</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.submitButton, ...styles.delete }}
          onPress={onDeleteHandler}
        >
          <Text style={styles.submit}>Borrar Ingrediente</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EditIngredientForm;
