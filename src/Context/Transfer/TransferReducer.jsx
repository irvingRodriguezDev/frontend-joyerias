import {
  CREATE_TRANSFER_ADMIN,
  GET_ALL_TRANSFER_BRANCH_ADMIN,
  GET_INCOMING_TRANSFER_ADMIN,
  GET_ONE_SALE,
  GET_OUTGOING_TRANSFER_ADMIN,
  SALES_FOR_ADMIN,
  STORE_SALE,
  STORE_SALE_BY_ADMIN,
  UPDATE_TRANSFER_STATUS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_INCOMING_TRANSFER_ADMIN:
      return {
        ...state,
        transferIncome: Array.isArray(action.payload.data)
          ? action.payload.data
          : [],
        incomePagination: {
          total: action.payload.total,
          perPage: action.payload.perPage,
          lastPage: action.payload.lastPage,
          currentPage: action.payload.currentPage,
          next_page_url: action.payload.next_page_url,
          prev_page_url: action.payload.prev_page_url,
        },
        ErrorsApi: [],
      };

    case GET_OUTGOING_TRANSFER_ADMIN:
      return {
        ...state,
        transferOutgoing: Array.isArray(action.payload.data)
          ? action.payload.data
          : [],
        outgoingPagination: {
          total: action.payload.total,
          perPage: action.payload.perPage,
          lastPage: action.payload.lastPage,
          currentPage: action.payload.currentPage,
          next_page_url: action.payload.next_page_url,
          prev_page_url: action.payload.prev_page_url,
        },
        ErrorsApi: [],
      };

    case GET_ALL_TRANSFER_BRANCH_ADMIN:
      return {
        ...state,
        transfer: Array.isArray(action.payload.data) ? action.payload.data : [],
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

    // case STORE_SALE:
    //   return {
    //     ...state,
    //     sales: [...state.sales, action.payload],
    //     ErrorsApi: [],
    //   };
    case CREATE_TRANSFER_ADMIN:
      return {
        ...state,
        transfer: [...state.transfer, action.payload],
        ErrorsApi: [],
      };
    case UPDATE_TRANSFER_STATUS:
      return {
        ...state,
        transferIncome: state.transferIncome.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        transferOutgoing: state.transferOutgoing.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    default:
      return state;
  }
};
