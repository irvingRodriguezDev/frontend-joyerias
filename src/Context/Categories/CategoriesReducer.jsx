import {
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  STORE_CATEGORIES,
} from "../../types";

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
    case DELETE_CATEGORY:
      return {
        ...state,
        success: true,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
};
