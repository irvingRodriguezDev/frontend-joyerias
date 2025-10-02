import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { GET_ALL_CATEGORIES, STORE_CATEGORIES } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CategoriesContext from "./CategoriesContext";
import CategoriesReducer from "./CategoriesReducer";
const CategoriesState = ({ children }) => {
  const initialState = {
    categories: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

  const getAllCategories = () => {
    let url = "/categories";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las categorias");
      });
  };

  const storeCategory = (data) => {
    let url = "/categories";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_CATEGORIES,
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
          history("/categorias");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la categoria");
      });
  };
  return (
    <CategoriesContext.Provider
      value={{
        categories: state.categories,
        getAllCategories,
        storeCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
