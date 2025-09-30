import React, { useReducer } from "react";
import BranchesReducer from "./BranchesReducer";
import MethodGet from "../../config/Service";
import BranchesContext from "./BranchesContext";
import { GET_ALL_BRANCHES } from "../../types";

const BranchesState = ({ children }) => {
  const initialState = {
    branches: [],
    ErrorsApi: [],
  };
  const [state, dispatch] = useReducer(BranchesReducer, initialState);

  const getAllBranches = () => {
    let url = "/branches";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_BRANCHES,
          payload: res.data.branches,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener la branches");
      });
  };
  return (
    <BranchesContext.Provider
      value={{
        branches: state.branches,
        getAllBranches,
      }}
    >
      {children}
    </BranchesContext.Provider>
  );
};

export default BranchesState;
