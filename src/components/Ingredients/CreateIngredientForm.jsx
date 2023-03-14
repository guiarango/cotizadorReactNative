import { useReducer, useState, useRef } from "react";
import { Text, View, TextInput, Pressable, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Actions
import { createNewIngredient } from "../../store/actions/ingredients-actions";

//Styles
import styles from "./createIngredientFormStyles";
import MessagesModal from "../Modal/MessagesModal";

//[{name, brand, unit measure, quantity, cost, unit cost, photo }]
import categories from "../../../data/categories.json";
const measureUnit = ["ML", "KG"];

const initialState = {
  ingredientName: "",
  ingredientBrand: "",
  ingredientQuantity: "",
  ingredientCost: "",
  ingredientCostPerMeasure: "",
  ingredientCategory: null,
  ingredientMeasurementUnit: null,
  // ingredientPhoto: "",
};

const formReducer = (state, action) => {
  if (action.type === "CHANGE_NAME") {
    const newState = { ...state };
    return { ...newState, ingredientName: action.value };
  }
  if (action.type === "CHANGE_BRAND") {
    const newState = { ...state };
    return { ...newState, ingredientBrand: action.value };
  }
  if (action.type === "CHANGE_QUANTITY") {
    const newState = { ...state };
    return { ...newState, ingredientQuantity: action.value };
  }
  if (action.type === "CHANGE_COST") {
    const newState = { ...state };
    return { ...newState, ingredientCost: action.value };
  }
  if (action.type === "CHANGE_CATEGORY") {
    const newState = { ...state };
    return { ...newState, ingredientCategory: action.value };
  }

  if (action.type === "CHANGE_MEASUREMENT") {
    const newState = { ...state };
    return { ...newState, ingredientMeasurementUnit: action.value };
  }
  if (action.type === "CHANGE_PHOTO") {
    const newState = { ...state };
    return { ...newState, ingredientPhoto: action.value };
  }
  if (action.type === "CHANGE_COST_PER_UNIT") {
    const newState = { ...state };

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
  return initialState;
};

const CreateIngredientForm = () => {
  const ingredientsListSelector = useSelector((state) => state.ingredientsList);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Por favor diligencia todos los campos del formulario."
  );
  const [modalIcon, setModalIcon] = useState("close-circle-outline");
  const dropDownCategoryRef = useRef({});
  const dropDownMeasureRef = useRef({});
  const dispatchAction = useDispatch();

  const onChangeName = (text) => {
    const newText = text;
    dispatch({ type: "CHANGE_NAME", value: newText });
  };

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

  const onSubmitHandler = () => {
    // const id = "id" + Math.random().toString(16).slice(2);

    const ingredientName = state.ingredientName.trim();
    const ingredientBrand = state.ingredientBrand.trim();
    const ingredientQuantity = state.ingredientQuantity;
    const ingredientCost = state.ingredientCost;
    const ingredientCostPerMeasure = Number(state.ingredientCostPerMeasure);
    const ingredientCategory = state.ingredientCategory;
    const ingredientMeasurementUnit = state.ingredientMeasurementUnit;
    // const ingredientPhoto = state.ingredientPhoto;

    const isValid =
      ingredientName !== "" &&
      ingredientBrand !== "" &&
      ingredientQuantity !== "" &&
      ingredientCost !== "" &&
      ingredientCostPerMeasure !== "" &&
      ingredientCategory &&
      ingredientMeasurementUnit &&
      true;

    const nameAlreadyExist = ingredientsListSelector.some(
      (ingredient) => ingredient.ingredientName === ingredientName
    );

    if (nameAlreadyExist) {
      setShowModal(true);
      setModalMessage("El nombre del ingrediente ya existe.");
      setModalIcon("close-circle-outline");
      setTimeout(() => {
        setShowModal(false);
      }, 500);
      return;
    }

    if (isValid) {
      dispatchAction(createNewIngredient(state));
      dispatch({ type: "REFRESH" });
      dropDownCategoryRef.current.reset();
      dropDownMeasureRef.current.reset();
      setShowModal(true);
      setModalMessage("Ingrediente creado con exito.");
      setModalIcon("checkmark-circle-outline");
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

  return (
    <ScrollView style={styles.form}>
      {showModal && <MessagesModal message={modalMessage} icon={modalIcon} />}
      <View>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={state.ingredientName}
          onChangeText={onChangeName}
        ></TextInput>
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

      {/* <View style={styles.selectImageContainer}>
        <Pressable style={styles.selectImageButton}>
          <Text style={styles.selectImageText}>Cargar imagen</Text>
        </Pressable>
      </View> */}

      <View style={styles.submitContainer}>
        <Pressable style={styles.submitButton} onPress={onSubmitHandler}>
          <Text style={styles.submit}>Guardar Ingrediente</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CreateIngredientForm;
