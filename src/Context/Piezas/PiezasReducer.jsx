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

export default (state, action) => {
  switch (action.type) {
    case TOTAL_PIEZAS:
      return {
        ...state,
        total_piezas: action.payload,
      };
    case TOTAL_DINERO_PIEZAS:
      return {
        ...state,
        total_dinero_piezas: action.payload,
      };
    case TOTAL_PIEZAS_EXISTENTES:
      return {
        ...state,
        total_piezas_existentes: action.payload,
      };
    case TOTAL_DINERO_PIEZAS_EXISTENTES:
      return {
        ...state,
        total_dinero_piezas_existentes: action.payload,
      };
    case TOTAL_PIEZAS_TRASPASADOS:
      return {
        ...state,
        total_piezas_traspasados: action.payload,
      };
    case TOTAL_DINERO_PIEZAS_TRASPASADOS:
      return {
        ...state,
        total_dinero_piezas_traspasadas: action.payload,
      };
    case TOTAL_PIEZAS_DANADOS:
      return {
        ...state,
        total_piezas_danadas: action.payload,
      };
    case TOTAL_DINERO_PIEZAS_DANADOS:
      return {
        ...state,
        total_dinero_piezas_danadas: action.payload,
      };
    default:
      return state;
  }
};
