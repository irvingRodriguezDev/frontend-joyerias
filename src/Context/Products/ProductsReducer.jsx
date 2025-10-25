import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_NO_PAGINATE,
  GET_ONE_PRODUCT,
  PRODUCTS_FOR_SELECT,
  STORE_PRODUCT,
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: Array.isArray(action.payload.data) ? action.payload.data : [],
        total: action.payload.total,
        perPage: action.payload.perPage,
        // ✅ Corregido: usa lastPage (o el nombre que prefieras)
        lastPage: action.payload.lastPage,
        page: action.payload.currentPage, // Usar currentPage para el número actual
        currentPage: action.payload.currentPage,
        next_page_url: action.payload.next_page_url,
        prev_page_url: action.payload.prev_page_url,
      };
    case GET_ALL_PRODUCTS_NO_PAGINATE:
      return {
        ...state,
        products: action.payload,
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
    case PRODUCTS_FOR_SELECT:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
