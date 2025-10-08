import { GET_ALL_SALES, STORE_SALE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_SALES:
      return {
        ...state,
        sales: action.payload,
        ErrorsApi: [],
      };
    case STORE_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
