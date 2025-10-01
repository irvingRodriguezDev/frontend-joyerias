import { GET_ALL_USERS, STORE_USERS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        ErrorsApi: [],
      };
    case STORE_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
