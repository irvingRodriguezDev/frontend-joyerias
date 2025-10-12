import {
  DELETE_BUSINESS_RULE,
  GET_ALL_BUSINESS_RULE,
  STORE_BUSINESS_RULE,
} from "../../types";

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
    case DELETE_BUSINESS_RULE:
      return {
        ...state,
        success: true,
        business_rules: state.business_rules.filter(
          (b) => b.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
