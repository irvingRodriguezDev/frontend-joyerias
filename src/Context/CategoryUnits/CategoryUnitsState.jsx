import React, { useReducer } from "react";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/Service";
import Swal from "sweetalert2";
import CategoryUnitsReducer from "./CategoryUnitsReducer";
import CategoryUnitsContext from "./CategoryUnitsContext";
import {
  GET_ALL_CATEGORIES_UNITS,
  CREATE_CATEGORIES_UNITS,
  UPDATE_CATEGORIES_UNITS,
  DELETE_CATEGORIES_UNITS,
} from "../../types";

const CategoryUnitsState = ({ children }) => {
  const initialState = {
    categories_units: [],
    ErrorsApi: [],
  };

  const [state, dispatch] = useReducer(CategoryUnitsReducer, initialState);

  const getAllCategoriesUnits = () => {
    MethodGet("/unit-type-categories")
      .then((res) => {
        dispatch({ type: GET_ALL_CATEGORIES_UNITS, payload: res.data.data });
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  };

  const storeCategoryUnits = (data, onSuccess) => {
    MethodPost("/unit-type-categories", data)
      .then((res) => {
        dispatch({ type: CREATE_CATEGORIES_UNITS, payload: res.data.data });
        Swal.fire({
          title: "¡Éxito!",
          text: "Categoría creada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess?.();
      })
      .catch((error) => {
        console.error("Error al crear categoría:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ?? "No se pudo crear la categoría.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  const updateCategoryUnits = (id, data, onSuccess) => {
    MethodPut(`/unit-type-categories/${id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_CATEGORIES_UNITS, payload: res.data.data });
        Swal.fire({
          title: "¡Actualizado!",
          text: "Categoría actualizada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess?.();
      })
      .catch((error) => {
        console.error("Error al actualizar categoría:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ??
            "No se pudo actualizar la categoría.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  const deleteCategoryUnits = (id) => {
    Swal.fire({
      title: "¿Eliminar categoría?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (!result.isConfirmed) return;
      MethodDelete(`/unit-type-categories/${id}`)
        .then(() => {
          dispatch({ type: DELETE_CATEGORIES_UNITS, payload: id });
          Swal.fire({
            title: "Eliminada",
            text: "La categoría fue eliminada.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text:
              error?.response?.data?.message ??
              "No se pudo eliminar la categoría.",
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
        });
    });
  };

  return (
    <CategoryUnitsContext.Provider
      value={{
        categories_units: state.categories_units,
        getAllCategoriesUnits,
        storeCategoryUnits,
        updateCategoryUnits,
        deleteCategoryUnits,
      }}
    >
      {children}
    </CategoryUnitsContext.Provider>
  );
};

export default CategoryUnitsState;
