import { DELETE_LINE, GET_ALL_LINES, STORE_LINE } from "../../types";
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
    case DELETE_LINE:
      return {
        ...state,
        success: true,
        lines: state.lines.filter((l) => l.id !== action.payload),
      };
    default:
      return state;
  }
};
