import {
  GET_ALL_CLIENTS,
  GET_CLIENTS_SELECT,
  STORE_CLIENTS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: Array.isArray(action.payload.data) ? action.payload.data : [],
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

    case GET_CLIENTS_SELECT:
      return {
        ...state,
        clients: action.payload,
      };
    case STORE_CLIENTS:
      return {
        ...state,
        clients: [action.payload, ...state.clients],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
