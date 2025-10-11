import { GET_ALL_CLIENTS, STORE_CLIENTS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: Array.isArray(action.payload.data) ? action.payload.data : [],
        ErrorsApi: [],
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
