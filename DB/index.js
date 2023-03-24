import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("recetas.db");

export const initIngredients = () => {
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

export const initRecipes = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS recipes (id integer primary key autoincrement not null, recipeName text not null);",
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

export const initIntermediateTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS intermediateTable (id integer primary key autoincrement not null, recipeId integer not null  REFERENCES recipes(id), ingredientId integer not null  REFERENCES ingredients(id), ingredientQuantity real not null);",
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

//----------------------------INGREDIENTS----------------------------

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

export const deleteIngredientTable = () => {
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

//----------------------------RECIPES----------------------------

export const getRecipes = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT r.id, r.recipeName, it.recipeId, it.ingredientId, it.ingredientQuantity, i.ingredientName FROM recipes AS r LEFT JOIN intermediateTable AS it ON r.id=it.recipeId LEFT JOIN ingredients AS i ON it.ingredientId=i.id",
        // "SELECT * FROM intermediateTable",
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

export const insertRecipe = (name) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO recipes (recipeName) VALUES (?);",
        [name],
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

export const deleteRecipeFromDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM recipes WHERE id=?;`,
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

export const deleteRecipeTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE recipes;",
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

// //----------------------------INTERMEDIATETABLE----------------------------

export const insertIntermediateTableItems = (
  recipeId,
  ingredientId,
  ingredientQuantity
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO intermediateTable (recipeId,ingredientId,ingredientQuantity) VALUES (?,?,?);",
        [recipeId, ingredientId, ingredientQuantity],
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

export const deleteRecipeFromIntermediateDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM intermediateTable WHERE recipeId=?;`,
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

export const deleteIntermediateTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE intermediateTable;",
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
