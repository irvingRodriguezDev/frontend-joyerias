import { CREATE_UNIT, GET_ALL_UNITS } from "../../types";

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

    default:
      return state;
  }
};
