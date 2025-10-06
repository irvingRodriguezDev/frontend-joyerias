import { GET_ALL_CLIENTS, STORE_CLIENTS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        ErrorsApi: [],
      };
    case STORE_CLIENTS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
