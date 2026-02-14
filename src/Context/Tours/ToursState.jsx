import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import { DELETE_TOUR, GET_ALL_TOURS, STORE_TOURS } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ToursReducer from "./ToursReducer";
import ToursContext from "./ToursContext";
const ToursState = ({ children }) => {
  const initialState = {
    tours: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ToursReducer, initialState);

  const getAllTours = () => {
    let url = "/tours";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_TOURS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las lineas");
      });
  };

  const storeTours = (data) => {
    let url = "/tours";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_TOURS,
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
  const deleteTour = (id) => {
    let url = `/tours/${id}`;
    MethodDelete(url)
      .then((res) => {
        dispatch({
          type: DELETE_TOUR,
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
    <ToursContext.Provider
      value={{
        tours: state.tours,
        getAllTours,
        storeTours,
        deleteTour,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

export default ToursState;
