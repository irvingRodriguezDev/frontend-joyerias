import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BusinessRuleContext from "./BusinessRuleContext";
import BusinessRuleReducer from "./BusinessRuleReducer";
import { GET_ALL_BUSINESS_RULE, STORE_BUSINESS_RULE } from "../../types";
const BusinessRulesState = ({ children }) => {
  const initialState = {
    business_rules: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(BusinessRuleReducer, initialState);

  const getAllBusiness = () => {
    let url = "/business-rules";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_BUSINESS_RULE,
          payload: res.data.rules,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener la business_rules");
      });
  };

  const storeBusiness = (data) => {
    let url = "/business-rules";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_BUSINESS_RULE,
          payload: res.data.rule,
        });
        Swal.fire({
          title: "Exito",
          text: "La regla se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/reglas-negocio");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la regla");
      });
  };
  return (
    <BusinessRuleContext.Provider
      value={{
        business_rules: state.business_rules,
        getAllBusiness,
        storeBusiness,
      }}
    >
      {children}
    </BusinessRuleContext.Provider>
  );
};

export default BusinessRulesState;
