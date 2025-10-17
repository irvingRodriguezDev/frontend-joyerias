import {
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
    default:
      return state;
  }
};
