import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ClientsContext from "./ClientsContext";
import ClientsReducer from "./ClientsReducer";
import { GET_ALL_CLIENTS, STORE_CLIENTS } from "../../types";
const ClientsState = ({ children }) => {
  const initialState = {
    clients: [],
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ClientsReducer, initialState);

  const getAllClients = () => {
    let url = "/clients";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CLIENTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las categorias");
      });
  };

  const storeClient = (data) => {
    let url = "/clients";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_CLIENTS,
          payload: res.data,
        });

        Swal.fire({
          title: "Exito",
          text: "Cliente registrado de forma exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/clientes");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear el cliente");
      });
  };
  return (
    <ClientsContext.Provider
      value={{
        clients: state.clients,
        getAllClients,
        storeClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export default ClientsState;
