import {
  TOTAL_DINERO_GRAMOS,
  TOTAL_DINERO_GRAMOS_EXISTENTE,
  TOTAL_GRAMOS,
  TOTAL_GRAMOS_EXISTENTE,
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
        ErrorsApi: [],
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
    case TOTAL_DINERO_GRAMOS:
      return {
        ...state,
        total_dinero_gramos: action.payload,
      };
    case TOTAL_DINERO_GRAMOS_EXISTENTE:
      return {
        ...state,
        total_dinero_gramos_existentes: action.payload,
      };
    case TOTAL_GRAMOS:
      return {
        ...state,
        total_gramos: action.payload,
      };
    case TOTAL_GRAMOS_EXISTENTE:
      return {
        ...state,
        total_gramos_existentes: action.payload,
      };
    default:
      return state;
  }
};
