import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { useNavigate } from "react-router-dom";
import DashboardReducer from "./DashboardReducer";
import DashboardContext from "./DashboardContext";
import { TOTAL_VENTAS_MES, TOTAL_VENTAS_SEMANA } from "../../types";
const DashboardState = ({ children }) => {
  const initialState = {
    total_ventas_dia: 0,
    total_ventas_semana: 0,
    total_ventas_mes: 0,
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  const totalVentasSemana = () => {
    let url = "/ventas/semana";
    return MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_VENTAS_SEMANA,
          payload: res.data.total_vendido_semana ?? 0,
        });
      })
      .catch((error) => console.log(error));
  };
  const totalVentasMes = () => {
    let url = "/ventas/mes";
    return MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_VENTAS_MES,
          payload: res.data.total_vendido_mes ?? 0,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <DashboardContext.Provider
      value={{
        total_ventas_semana: state.total_ventas_semana,
        total_ventas_mes: state.total_ventas_mes,
        totalVentasSemana,
        totalVentasMes,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
