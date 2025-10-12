import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import {
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  STORE_CATEGORIES,
} from "../../types";
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

  const deleteCategory = (id) => {
    let url = `/category/${id}`;
    MethodDelete(url)
      .then((res) => {
        dispatch({
          type: DELETE_CATEGORY,
          payload: id,
        });
        Swal.fire({
          title: "Eliminado",
          text: res.data.message,
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al eliminar la categoria");
      });
  };
  return (
    <CategoriesContext.Provider
      value={{
        categories: state.categories,
        getAllCategories,
        storeCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesState;
