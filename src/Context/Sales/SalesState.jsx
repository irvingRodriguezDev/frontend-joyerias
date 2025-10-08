import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SalesContext from "./SalesContext";
import SalesReducer from "./SalesReducer";
import { GET_ALL_SALES, STORE_SALE } from "../../types";
const SalesState = ({ children }) => {
  const initialState = {
    sales: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(SalesReducer, initialState);

  const getAllSales = () => {
    let url = "/sales";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_SALES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las ventas");
      });
  };

  const storeSale = (data) => {
    let url = "/sales";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_SALE,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La venta se ha creado de forma correcta",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/ventas");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la venta");
      });
  };
  return (
    <SalesContext.Provider
      value={{
        sales: state.sales,
        getAllSales,
        storeSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesState;
