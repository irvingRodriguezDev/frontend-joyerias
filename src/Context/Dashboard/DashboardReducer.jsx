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

export default (state, action) => {
  switch (action.type) {
    case TOTAL_VENTAS_DIA:
      return {
        ...state,
        total_ventas_dia: action.payload,
      };

    case TOTAL_VENTAS_MES:
      return {
        ...state,
        total_ventas_mes: action.payload,
      };
    case TOTAL_VENTAS_SEMANA:
      return {
        ...state,
        total_ventas_semana: action.payload,
        ErrorsApi: [],
      };
    case TOTAL_GRAMOS:
      return {
        ...state,
        total_gramos: action.payload,
      };
    case TOTAL_DINERO_GRAMOS:
      return {
        ...state,
        total_dinero_gramos: action.payload,
      };
    case TOTAL_GRAMOS_EXISTENTES:
      return {
        ...state,
        total_gramos_existentes: action.payload,
      };
    case TOTAL_DINERO_GRAMOS_EXISTENTES:
      return {
        ...state,
        total_dinero_gramos_existentes: action.payload,
      };
    case TOTAL_GRAMOS_TRASPASADOS:
      return {
        ...state,
        total_gramos_traspasados: action.payload,
      };
    case TOTAL_DINERO_GRAMOS_TRASPASADOS:
      return {
        ...state,
        total_dinero_gramos_traspasados: action.payload,
      };
    case TOTAL_GRAMOS_DANADOS:
      return {
        total_gramos_danados: action.payload,
      };
    case TOTAL_DINERO_GRAMOS_DANADOS:
      return {
        ...state,
        total_dinero_gramos_danados: action.payload,
      };
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
