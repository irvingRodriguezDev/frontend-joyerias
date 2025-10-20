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
  TOTAL_DINERO_GRAMOS,
  TOTAL_DINERO_GRAMOS_DANADOS,
  TOTAL_DINERO_GRAMOS_EXISTENTES,
  TOTAL_DINERO_GRAMOS_TRASPASADOS,
  TOTAL_GRAMOS,
  TOTAL_GRAMOS_DANADOS,
  TOTAL_GRAMOS_EXISTENTES,
  TOTAL_GRAMOS_TRASPASADOS,
  TOTAL_VENTAS_DIA,
} from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const DashboardState = ({ children }) => {
  const initialState = {
    total_ventas_dia: 0,
    total_ventas_semana: 0,
    total_ventas_mes: 0,

    //gramos
    total_gramos: 0,
    total_dinero_gramos: 0,
    total_gramos_existentes: 0,
    total_dinero_gramos_existentes: 0,
    total_gramos_traspasados: 0,
    total_dinero_gramos_traspasados: 0,
    total_gramos_danados: 0,
    total_dinero_gramos_danados: 0,
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

  const totalGramos = () => {
    let url = "/total_gramos";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_GRAMOS,
          payload: res.data.total_gramos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalDineroGramos = () => {
    let url = "/total_dinero_gramos";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_GRAMOS,
          payload: res.data.total_dinero_gramos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalGramosExistentes = () => {
    let url = "/total_gramos_existentes";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_GRAMOS_EXISTENTES,
          payload: res.data.total_gramos_existentes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalDineroGramosExistente = () => {
    let url = "/total_dinero_gramos_existentes";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_GRAMOS_EXISTENTES,
          payload: res.data.total_dinero_gramos_existentes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalGramosTraspasados = () => {
    let url = "/total_gramos_traspasados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_GRAMOS_TRASPASADOS,
          payload: res.data.total_gramos_traspasados,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalDineroGramosTraspasados = () => {
    let url = "/total_dinero_gramos_traspasados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_GRAMOS_TRASPASADOS,
          payload: res.data.total_dinero_gramos_traspasados,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalGramosDanados = () => {
    let url = "/total_gramos_danados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_GRAMOS_DANADOS,
          payload: res.data.total_gramos_danados,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalDineroGramosDanados = () => {
    let url = "/total_dinero_gramos_danados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_GRAMOS_DANADOS,
          payload: res.data.total_dinero_gramos_danados,
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
        total_gramos: state.total_gramos,
        total_dinero_gramos: state.total_dinero_gramos,
        total_gramos_existentes: state.total_gramos_existentes,
        total_dinero_gramos_existentes: state.total_dinero_gramos_existentes,
        total_gramos_traspasados: state.total_gramos_traspasados,
        total_dinero_gramos_traspasados: state.total_dinero_gramos_traspasados,
        total_gramos_danados: state.total_gramos_danados,
        total_dinero_gramos_danados: state.total_dinero_gramos_danados,
        totalVentasDia,
        totalVentasSemana,
        totalVentasMes,
        totalGramos,
        totalDineroGramos,
        totalGramosExistentes,
        totalDineroGramosExistente,
        totalGramosTraspasados,
        totalDineroGramosTraspasados,
        totalGramosDanados,
        totalDineroGramosDanados,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
