import { GET_ALL_BRANCHES } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BRANCHES:
      return {
        ...state,
        branches: action.payload,
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
