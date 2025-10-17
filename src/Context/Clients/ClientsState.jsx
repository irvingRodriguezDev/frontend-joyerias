import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ClientsContext from "./ClientsContext";
import ClientsReducer from "./ClientsReducer";
import {
  GET_ALL_CLIENTS,
  GET_CLIENTS_SELECT,
  STORE_CLIENTS,
} from "../../types";
const ClientsState = ({ children }) => {
  const initialState = {
    clients: [],
    ErrorsApi: [],
    total: 0,
    page: 0,
    perPage: 0,
    lastPage: 0,
    currentPage: 0,
    next_page_url: null,
    prev_page_url: null,
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ClientsReducer, initialState);

  const getAllClients = (page, rowsPerPage) => {
    let url = `/clients?page=${page}&limit=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CLIENTS,
          payload: {
            data: res.data.data,
            total: res.data.total,
            page: res.data.current_page,
            perPage: res.data.per_page,
            next_page_url: res.data.next_page_url,
            prev_page_url: res.data.prev_page_url,
            lastPage: res.data.last_page,
            currentPage: res.data.current_page,
          },
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las categorias");
      });
  };

  const allClients = () => {
    let url = "all-clients";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_CLIENTS_SELECT,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener los clientes");
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
  const storeClientModal = (data) => {
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
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear el cliente");
      });
  };
  return (
    <ClientsContext.Provider
      value={{
        clients: state.clients,
        total: state.total,
        perPage: state.perPage,
        page: state.page,
        lastPage: state.lastPage,
        currentPage: state.currentPage,
        next_page_url: state.next_page_url,
        prev_page_url: state.prev_page_url,
        getAllClients,
        storeClient,
        storeClientModal,
        allClients,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export default ClientsState;
