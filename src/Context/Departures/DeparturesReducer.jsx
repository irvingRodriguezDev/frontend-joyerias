import { GET_ALL_DEPARTURES, STORE_NEW_DEPARTURE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_DEPARTURES:
      return {
        ...state,
        departures: Array.isArray(action.payload.data)
          ? action.payload.data
          : [],
        total: action.payload.total,
        perPage: action.payload.perPage,
        // ✅ Corregido: usa lastPage (o el nombre que prefieras)
        lastPage: action.payload.lastPage,
        page: action.payload.currentPage, // Usar currentPage para el número actual
        currentPage: action.payload.currentPage,
        next_page_url: action.payload.next_page_url,
        prev_page_url: action.payload.prev_page_url,
      };
    case STORE_NEW_DEPARTURE:
      return {
        ...state,
        departures: [...state.departures, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
