import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { useNavigate } from "react-router-dom";
import DashboardReducer from "./DashboardReducer";
import DashboardContext from "./DashboardContext";
import {
  TOTAL_DINERO_GRAMOS,
  TOTAL_DINERO_GRAMOS_DANADOS,
  TOTAL_DINERO_GRAMOS_EXISTENTES,
  TOTAL_DINERO_GRAMOS_TRASPASADOS,
  TOTAL_DINERO_PIEZAS,
  TOTAL_DINERO_PIEZAS_DANADOS,
  TOTAL_DINERO_PIEZAS_EXISTENTES,
  TOTAL_DINERO_PIEZAS_TRASPASADOS,
  TOTAL_GRAMOS,
  TOTAL_GRAMOS_DANADOS,
  TOTAL_GRAMOS_EXISTENTES,
  TOTAL_GRAMOS_TRASPASADOS,
  TOTAL_PIEZAS,
  TOTAL_PIEZAS_DANADOS,
  TOTAL_PIEZAS_EXISTENTES,
  TOTAL_PIEZAS_TRASPASADOS,
  TOTAL_VENTAS_DIA,
  TOTAL_VENTAS_MES,
  TOTAL_VENTAS_SEMANA,
} from "../../types";
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
    //piezas
    total_piezas: 0,
    total_dinero_piezas: 0,
    total_piezas_existentes: 0,
    total_dinero_piezas_existentes: 0,
    total_piezas_traspasados: 0,
    total_dinero_piezas_traspasadas: 0,
    total_piezas_danadas: 0,
    total_dinero_piezas_danadas: 0,
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

  //piezas
  const totalPiezas = () => {
    let url = "/total_piezas";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_PIEZAS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalDineroPiezas = () => {
    let url = "/total_dinero_piezas";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_PIEZAS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalPiezasExistentes = () => {
    let url = "/total_piezas_existentes";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_PIEZAS_EXISTENTES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalDineroPiezasExistentes = () => {
    let url = "/total_dinero_piezas_existentes";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_PIEZAS_EXISTENTES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalPiezasTraspasadas = () => {
    let url = "/total_piezas_traspasados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_PIEZAS_TRASPASADOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalDineroPiezasTraspasadas = () => {
    let url = "/total_dinero_piezas_traspasados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_PIEZAS_TRASPASADOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalPiezasDanados = () => {
    let url = "/total_piezas_danados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_PIEZAS_DANADOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalDineroPiezasDanados = () => {
    let url = "/total_dinero_piezas_danados";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: TOTAL_DINERO_PIEZAS_DANADOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DashboardContext.Provider
      value={{
        total_ventas_semana: state.total_ventas_semana,
        total_ventas_mes: state.total_ventas_mes,
        total_gramos: state.total_gramos,
        total_dinero_gramos: state.total_dinero_gramos,
        total_gramos_existentes: state.total_gramos_existentes,
        total_dinero_gramos_existentes: state.total_dinero_gramos_existentes,
        total_gramos_traspasados: state.total_gramos_traspasados,
        total_dinero_gramos_traspasados: state.total_dinero_gramos_traspasados,
        total_gramos_danados: state.total_gramos_danados,
        total_dinero_gramos_danados: state.total_dinero_gramos_danados,
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
