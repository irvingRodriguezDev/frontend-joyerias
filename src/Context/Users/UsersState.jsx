import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import UsersReducer from "./UsersReducer";
import { GET_ALL_USERS, STORE_USERS } from "../../types";
import Swal from "sweetalert2";
import UsersContext from "./UsersContext";
import { useNavigate } from "react-router-dom";
const UsersState = ({ children }) => {
  const history = useNavigate();
  const initialState = {
    users: [],
    ErrorsApi: [],
  };
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const getAllUsers = () => {
    let url = "/users";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.users,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los usuarios");
      });
  };

  const storeUser = (data) => {
    let url = "/users";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_USERS,
          payload: res.data.user,
        });
        Swal.fire({
          title: "Exito",
          text: "Usuario creado de forma exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/usuarios");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear el usuario");
      });
  };
  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        getAllUsers,
        storeUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
