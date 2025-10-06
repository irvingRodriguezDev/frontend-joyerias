import { GET_ALL_PRODUCTS, STORE_PRODUCT } from "../../types";
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        ErrorsApi: [],
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
