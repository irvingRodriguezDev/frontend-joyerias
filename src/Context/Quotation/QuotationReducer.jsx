import {
  GET_QOUTATION_PENDING,
  GET_QUOTATION_ACCEPTED,
  GET_QUOTATION_BY_ID,
  UPDATE_QUOTATION_STATUS,
  PROMOTE_TO_CUSTOMER,
  CONVERT_TO_ORDER,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_QOUTATION_PENDING:
      return {
        ...state,
        qoutations: action.payload,
        ErrorsApi: [],
      };

    case GET_QUOTATION_ACCEPTED:
      return {
        ...state,
        qoutations: [...state.qoutations, action.payload],
        ErrorsApi: [],
      };

    case GET_QUOTATION_BY_ID:
      return {
        ...state,
        quotation: action.payload,
      };

    case UPDATE_QUOTATION_STATUS:
      return {
        ...state,
        quotation: action.payload,
        // Actualizamos también en la lista si existe
        qoutations: state.qoutations.map((q) =>
          q.id === action.payload.id ? action.payload : q
        ),
      };

    case PROMOTE_TO_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };

    case CONVERT_TO_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};
