import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import { DELETE_LINE, GET_ALL_LINES, STORE_LINE } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LinesContext from "./LinesContext";
import LinesReducer from "./LinesReducer";
const LinesState = ({ children }) => {
  const initialState = {
    lines: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(LinesReducer, initialState);

  const getAllLines = () => {
    let url = "/lines";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_LINES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las lineas");
      });
  };

  const storeLine = (data) => {
    let url = "/lines";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_LINE,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La Linea se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/lineas");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la linea");
      });
  };
  const deleteLine = (id) => {
    let url = `/lines/${id}`;
    MethodDelete(url)
      .then((res) => {
        dispatch({
          type: DELETE_LINE,
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
        console.log(error, "ocurrio un error al eliminar la linea");
      });
  };
  return (
    <LinesContext.Provider
      value={{
        lines: state.lines,
        getAllLines,
        storeLine,
        deleteLine,
      }}
    >
      {children}
    </LinesContext.Provider>
  );
};

export default LinesState;
