import {
  GET_ALL_UNITS,
  CREATE_UNIT,
  UPDATE_UNIT,
  DELETE_UNIT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_UNITS:
      return {
        ...state,
        units: action.payload,
        ErrorsApi: [],
      };

    case CREATE_UNIT:
      return {
        ...state,
        units: [...state.units, action.payload],
        ErrorsApi: [],
      };

    case UPDATE_UNIT:
      return {
        ...state,
        units: state.units.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
        ErrorsApi: [],
      };

    case DELETE_UNIT:
      return {
        ...state,
        units: state.units.filter((u) => u.id !== action.payload),
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
