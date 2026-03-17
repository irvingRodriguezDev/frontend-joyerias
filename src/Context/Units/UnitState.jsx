import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UnitsContext from "./UnitsContext";
import UnitsReducer from "./UnitsReducer";
import { CREATE_UNIT, GET_ALL_UNITS } from "../../types";
const UnitsState = ({ children }) => {
  const initialState = {
    units: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(UnitsReducer, initialState);

  const getAllUnits = () => {
    let url = "/unit-types";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_UNITS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las categorias");
      });
  };

  const storeUnits = (data) => {
    let url = "/unit-types";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: CREATE_UNIT,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La unidad se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/unidades");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la categoria");
      });
  };

  return (
    <UnitsContext.Provider
      value={{
        units: state.units,
        getAllUnits,
        storeUnits,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
};

export default UnitsState;
