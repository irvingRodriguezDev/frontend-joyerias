import { DELETE_BRANCH, GET_ALL_BRANCHES, STORE_BRANCH } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BRANCHES:
      return {
        ...state,
        branches: action.payload,
        ErrorsApi: [],
      };
    case STORE_BRANCH:
      return {
        ...state,
        branches: [...state.branches, action.payload],
        ErrorsApi: [],
      };
    case DELETE_BRANCH:
      return {
        ...state,
        success: true,
        branches: state.branches.filter((b) => b.id !== action.payload),
      };
    default:
      return state;
  }
};
