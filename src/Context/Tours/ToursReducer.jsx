import { DELETE_TOUR, GET_ALL_TOURS, STORE_TOURS } from "../../types";
export default (state, action) => {
  switch (action.type) {
    case GET_ALL_TOURS:
      return {
        ...state,
        tours: action.payload.tours,
        ErrorsApi: [],
      };
    case STORE_TOURS:
      return {
        ...state,
        tours: [...state.tours, action.payload],
        ErrorsApi: [],
      };
    case DELETE_TOUR:
      return {
        ...state,
        success: true,
        tours: state.tours.filter((l) => l.id !== action.payload),
      };
    default:
      return state;
  }
};
