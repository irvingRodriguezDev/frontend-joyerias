import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
import TransferReducer from "./TransferReducer";
import TransferContext from "./TransferContext";
import {
  CREATE_TRANSFER_ADMIN,
  GET_ALL_TRANSFER_BRANCH_ADMIN,
  GET_INCOMING_TRANSFER_ADMIN,
  GET_OUTGOING_TRANSFER_ADMIN,
  UPDATE_TRANSFER_STATUS,
} from "../../types";
const TransferState = ({ children }) => {
  const initialState = {
    transferIncome: [],
    transferOutgoing: [],

    incomePagination: {
      total: 0,
      perPage: 10,
      lastPage: null,
      currentPage: 1,
      next_page_url: null,
      prev_page_url: null,
    },

    outgoingPagination: {
      total: 0,
      perPage: 10,
      lastPage: null,
      currentPage: 1,
      next_page_url: null,
      prev_page_url: null,
    },
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(TransferReducer, initialState);

  const getIncomeTransferAdmin = (branchId, page, rowsPerPage) => {
    let url = `/transfer/${branchId}/incoming?page=${page}&limit=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_INCOMING_TRANSFER_ADMIN,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOutgoingTransferAdmin = (branchId, page, rowsPerPage) => {
    let url = `/transfer/${branchId}/outgoing?page=${page}&limit=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_OUTGOING_TRANSFER_ADMIN,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const storeTransferAdmin = (data) => {
    MethodPost("/transfer", data)
      .then((res) => {
        dispatch({
          type: CREATE_TRANSFER_ADMIN,
          payload: res.data,
        });

        if (res.status === 200) {
          Swal.fire({
            title: "Correcto",
            text: "El traspaso se creó de forma exitosa",
            icon: "success",
            timer: 2400,
            showConfirmButton: false,
          }).then(() => {
            window.location = `/traspasos/sucursal/${data.branchId}`;
          });
        }
      })
      .catch((error) => {
        console.error("Error al crear el traspaso para el admin:", error);

        Swal.fire({
          title: "Error",
          text: "No se pudo crear el traspaso. Intenta nuevamente.",
          icon: "error",
        });
      });
  };
  const respondTransfer = async (transferId, action) => {
    try {
      const { data } = await MethodPost("/transfers/respond", {
        action,
        transfer_ids: [transferId], // siempre array
      });

      // 🔥 Actualizamos el estado con el traspaso ya actualizado
      if (Array.isArray(data.updated_transfers)) {
        data.updated_transfers.forEach((transfer) => {
          dispatch({
            type: UPDATE_TRANSFER_STATUS,
            payload: transfer,
          });
        });
      }

      // ⬅️ regresamos todo para usar message, success, etc.
      return data;
    } catch (error) {
      console.error("Error respondiendo traspaso:", error);
      throw error;
    }
  };

  return (
    <TransferContext.Provider
      value={{
        // Datos
        transferIncome: state.transferIncome,
        transferOutgoing: state.transferOutgoing,

        // Paginación separada
        incomePagination: state.incomePagination,
        outgoingPagination: state.outgoingPagination,

        // Métodos
        getIncomeTransferAdmin,
        getOutgoingTransferAdmin,
        storeTransferAdmin,
        respondTransfer,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export default TransferState;
