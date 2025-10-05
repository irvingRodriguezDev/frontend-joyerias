import { GET_ALL_LINES, STORE_LINE } from "../../types";
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_LINES:
      return {
        ...state,
        lines: action.payload,
        ErrorsApi: [],
      };
    case STORE_LINE:
      return {
        ...state,
        lines: [...state.lines, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
