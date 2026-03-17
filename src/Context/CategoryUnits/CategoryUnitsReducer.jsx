import { CREATE_CATEGORIES_UNITS, GET_ALL_CATEGORIES_UNITS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_UNITS:
      return {
        ...state,
        categories_units: action.payload,
        ErrorsApi: [],
      };
    case CREATE_CATEGORIES_UNITS:
      return {
        ...state,
        categories_units: [...state.categories_units, action.payload],
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
