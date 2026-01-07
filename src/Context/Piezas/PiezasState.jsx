import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { useNavigate } from "react-router-dom";
import PiezasReducer from "./PiezasReducer";
import PiezasContext from "./PiezasContext";
import {
  TOTAL_DINERO_PIEZAS,
  TOTAL_DINERO_PIEZAS_DANADOS,
  TOTAL_DINERO_PIEZAS_EXISTENTES,
  TOTAL_DINERO_PIEZAS_TRASPASADOS,
  TOTAL_PIEZAS,
  TOTAL_PIEZAS_DANADOS,
  TOTAL_PIEZAS_EXISTENTES,
  TOTAL_PIEZAS_TRASPASADOS,
} from "../../types";
const PiezasState = ({ children }) => {
  const initialState = {
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
  const [state, dispatch] = useReducer(PiezasReducer, initialState);

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
    <PiezasContext.Provider
      value={{
        total_piezas: state.total_piezas,
        total_dinero_piezas: state.total_dinero_piezas,
        total_piezas_existentes: state.total_piezas_existentes,
        total_dinero_piezas_existentes: state.total_dinero_piezas_existentes,
        total_piezas_traspasados: state.total_piezas_traspasados,
        total_dinero_piezas_traspasadas: state.total_dinero_piezas_traspasadas,
        total_piezas_danadas: state.total_piezas_danadas,
        total_dinero_piezas_danadas: state.total_dinero_piezas_danadas,
        totalPiezas,
        totalDineroPiezas,
        totalPiezasExistentes,
        totalDineroPiezasExistentes,
        totalPiezasTraspasadas,
        totalDineroPiezasTraspasadas,
        totalPiezasDanados,
        totalDineroPiezasDanados,
      }}
    >
      {children}
    </PiezasContext.Provider>
  );
};

export default PiezasState;
