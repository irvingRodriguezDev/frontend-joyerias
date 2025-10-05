import { GET_ALL_BUSINESS_RULE, STORE_BUSINESS_RULE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_BUSINESS_RULE:
      return {
        ...state,
        business_rules: action.payload,
        ErrorsApi: [],
      };
    case STORE_BUSINESS_RULE:
      return {
        ...state,
        business_rules: [...state.business_rules, action.payload],
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
