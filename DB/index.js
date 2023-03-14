import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("recetas.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS ingredients (id integer primary key autoincrement not null ,ingredientName text not null,ingredientBrand text not null,ingredientMeasurementUnit text not null,ingredientQuantity real not null,ingredientCost real not null,ingredientCostPerMeasure real not null,ingredientCategory text not null);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const getIngredients = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, ingredientName, ingredientBrand, ingredientMeasurementUnit, ingredientQuantity, ingredientCost, ingredientCostPerMeasure, ingredientCategory FROM ingredients",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertIngredient = (
  name,
  brand,
  measure_unit,
  quantity,
  cost,
  unit_cost,
  category
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO ingredients (ingredientName, ingredientBrand, ingredientMeasurementUnit, ingredientQuantity, ingredientCost, ingredientCostPerMeasure, ingredientCategory) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [name, brand, measure_unit, quantity, cost, unit_cost, category],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateIngredient = (
  id,
  name,
  brand,
  measure_unit,
  quantity,
  cost,
  unit_cost,
  category
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ingredients SET ingredientName=?, ingredientBrand=?, ingredientMeasurementUnit=?, ingredientQuantity=?, ingredientCost=?, ingredientCostPerMeasure=?, ingredientCategory=? WHERE id=?`,
        [name, brand, measure_unit, quantity, cost, unit_cost, category, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteIngredientFromDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ingredients WHERE id=?;`,
        [id.id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE ingredients;",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
