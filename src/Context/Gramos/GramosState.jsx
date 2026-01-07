import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import { useNavigate } from "react-router-dom";
import GramosContext from "./GramosContext";
import GramosReducer from "./GramosReducer";
import {
  TOTAL_DINERO_GRAMOS,
  TOTAL_DINERO_GRAMOS_DANADOS,
  TOTAL_DINERO_GRAMOS_EXISTENTES,
  TOTAL_DINERO_GRAMOS_TRASPASADOS,
  TOTAL_GRAMOS,
  TOTAL_GRAMOS_DANADOS,
  TOTAL_GRAMOS_EXISTENTES,
  TOTAL_GRAMOS_TRASPASADOS,
} from "../../types";
const GramosState = ({ children }) => {
  const initialState = {
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
  const [state, dispatch] = useReducer(GramosReducer, initialState);

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
    <GramosContext.Provider
      value={{
        total_gramos: state.total_gramos,
        total_dinero_gramos: state.total_dinero_gramos,
        total_gramos_existentes: state.total_gramos_existentes,
        total_dinero_gramos_existentes: state.total_dinero_gramos_existentes,
        total_gramos_traspasados: state.total_gramos_traspasados,
        total_dinero_gramos_traspasados: state.total_dinero_gramos_traspasados,
        total_gramos_danados: state.total_gramos_danados,
        total_dinero_gramos_danados: state.total_dinero_gramos_danados,
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
    </GramosContext.Provider>
  );
};

export default GramosState;
