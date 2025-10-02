import { GET_ALL_CATEGORIES, STORE_CATEGORIES } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        ErrorsApi: [],
      };
    case STORE_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
