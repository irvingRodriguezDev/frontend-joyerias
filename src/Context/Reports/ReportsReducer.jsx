import { REPORT_INVENTORY_PDF } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REPORT_INVENTORY_PDF:
      return {
        ...state,
        ErrorsApi: [],
      };

    default:
      return state;
  }
};
