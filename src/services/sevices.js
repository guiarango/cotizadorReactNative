import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc } from "firebase/firestore";

export const init = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCDwt0mKhAbEPjw8iJ-84M8YIMJohL5Y-U",
    authDomain: "recetario-8da3e.firebaseapp.com",
    databaseURL: "https://recetario-8da3e-default-rtdb.firebaseio.com",
    projectId: "recetario-8da3e",
    storageBucket: "recetario-8da3e.appspot.com",
    messagingSenderId: "500919026804",
    appId: "1:500919026804:web:a684e1862564c46232bd21",
  };

  try {
    initializeApp(firebaseConfig);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = async () => {
  const db = getFirestore();
  const categoriesRef = doc(db, "categorias", "xaHXhRoVgItyEsEWePaa");
  const result = await getDoc(categoriesRef);
  return result.data();
};

export const fetchMeasureUnits = async () => {
  const db = getFirestore();
  const measureUnitRef = doc(db, "unidad de medida", "Sdb81nyKmiQEgmShd7yt");
  const result = await getDoc(measureUnitRef);
  return result.data();
};
