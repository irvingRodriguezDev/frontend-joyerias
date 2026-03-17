import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CategoryUnitsReducer from "./CategoryUnitsReducer";
import CategoryUnitsContext from "./CategoryUnitsContext";
import { CREATE_CATEGORIES_UNITS, GET_ALL_CATEGORIES_UNITS } from "../../types";
const CategoryUnitsState = ({ children }) => {
  const initialState = {
    categories_units: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(CategoryUnitsReducer, initialState);

  const getAllCategoriesUnits = () => {
    let url = "/unit-type-categories";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CATEGORIES_UNITS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las categorias");
      });
  };

  const storeCategoryUnits = (data) => {
    let url = "/unit-type-categories";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: CREATE_CATEGORIES_UNITS,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La categoria se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/categorias-unidades");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la categoria");
      });
  };

  return (
    <CategoryUnitsContext.Provider
      value={{
        categories_units: state.categories_units,
        getAllCategoriesUnits,
        storeCategoryUnits,
      }}
    >
      {children}
    </CategoryUnitsContext.Provider>
  );
};

export default CategoryUnitsState;
