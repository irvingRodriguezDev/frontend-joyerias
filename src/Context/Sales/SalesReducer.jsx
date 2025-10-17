import { GET_ALL_SALES, GET_ONE_SALE, STORE_SALE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_SALES:
      return {
        ...state,
        sales: Array.isArray(action.payload.data) ? action.payload.data : [],
        total: action.payload.total,
        perPage: action.payload.perPage,
        // ✅ Corregido: usa lastPage (o el nombre que prefieras)
        lastPage: action.payload.lastPage,
        page: action.payload.currentPage, // Usar currentPage para el número actual
        currentPage: action.payload.currentPage,
        next_page_url: action.payload.next_page_url,
        prev_page_url: action.payload.prev_page_url,
        ErrorsApi: [],
      };
    case GET_ONE_SALE:
      return {
        ...state,
        sale: action.payload,
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
