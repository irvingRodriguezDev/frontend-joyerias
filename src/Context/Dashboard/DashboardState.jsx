import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DashboardReducer from "./DashboardReducer";
import DashboardContext from "./DashboardContext";
import {
  GET_ALL_SALES,
  GET_ONE_SALE,
  STORE_SALE,
  TOTAL_VENTAS_DIA,
} from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const DashboardState = ({ children }) => {
  const initialState = {
    total_ventas_dia: 0,
    total_ventas_semana: 0,
    total_ventas_mes: 0,
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const totalVentasDia = () => {
    let url = "/ventas/hoy";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_VENTAS_DIA,
          payload: res.data.total_vendido_dia,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalVentasMes = () => {
    let url = "/ventas/mes";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_VENTAS_DIA,
          payload: res.data.total_vendido_mes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalVentasSemana = () => {
    let url = "/ventas/semana";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_VENTAS_DIA,
          payload: res.data.total_vendido_semana,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DashboardContext.Provider
      value={{
        total_ventas_dia: state.total_ventas_dia,
        total_ventas_mes: state.total_ventas_mes,
        total_ventas_semana: state.total_ventas_semana,
        totalVentasDia,
        totalVentasSemana,
        totalVentasMes,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
