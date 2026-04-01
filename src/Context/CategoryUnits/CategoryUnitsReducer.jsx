import {
  GET_ALL_CATEGORIES_UNITS,
  CREATE_CATEGORIES_UNITS,
  UPDATE_CATEGORIES_UNITS,
  DELETE_CATEGORIES_UNITS,
} from "../../types";

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

    case UPDATE_CATEGORIES_UNITS:
      return {
        ...state,
        categories_units: state.categories_units.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
        ErrorsApi: [],
      };

    case DELETE_CATEGORIES_UNITS:
      return {
        ...state,
        categories_units: state.categories_units.filter(
          (cat) => cat.id !== action.payload
        ),
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
