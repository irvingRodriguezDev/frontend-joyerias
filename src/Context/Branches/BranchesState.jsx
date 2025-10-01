import React, { useReducer } from "react";
import BranchesReducer from "./BranchesReducer";
import MethodGet, { MethodPost } from "../../config/Service";
import BranchesContext from "./BranchesContext";
import { GET_ALL_BRANCHES, STORE_BRANCH } from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const BranchesState = ({ children }) => {
  const initialState = {
    branches: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
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

  const storeBranch = (data) => {
    let url = "/branches";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_BRANCH,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La sucursal se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/sucursales");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la sucursal");
      });
  };
  return (
    <BranchesContext.Provider
      value={{
        branches: state.branches,
        getAllBranches,
        storeBranch,
      }}
    >
      {children}
    </BranchesContext.Provider>
  );
};

export default BranchesState;
