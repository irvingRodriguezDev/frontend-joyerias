import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT, STORE_PRODUCT } from "../../types";
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: Array.isArray(action.payload.data) ? action.payload.data : [],
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case STORE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
