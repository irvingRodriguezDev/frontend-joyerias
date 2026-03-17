import React, { useReducer } from "react";
import MethodGet, { MethodPost, MethodPatch } from "../../config/Service";
import Swal from "sweetalert2";
import QoutationContext from "./QuotationContext";
import QoutationReducer from "./QuotationReducer";
import {
  GET_QOUTATION_PENDING,
  GET_QUOTATION_BY_ID,
  UPDATE_QUOTATION_STATUS,
  PROMOTE_TO_CUSTOMER,
  CONVERT_TO_ORDER,
} from "../../types";

const QuotationState = ({ children }) => {
  const initialState = {
    qoutations: [],
    quotation: null,
    customer: null,
    order: null,
    ErrorsApi: [],
  };

  const [state, dispatch] = useReducer(QoutationReducer, initialState);

  // ─── Listar todas ───────────────────────────────────────────────────────────
  const getAllQoutationsPending = () => {
    MethodGet("/quotation")
      .then((res) => {
        dispatch({ type: GET_QOUTATION_PENDING, payload: res.data.data });
      })
      .catch((error) => {
        console.error("Error al obtener cotizaciones:", error);
      });
  };

  // ─── Obtener una por ID ─────────────────────────────────────────────────────
  const getQuotationById = (id) => {
    MethodGet(`/quotation/${id}`)
      .then((res) => {
        dispatch({ type: GET_QUOTATION_BY_ID, payload: res.data.data });
      })
      .catch((error) => {
        console.error("Error al obtener cotización:", error);
      });
  };

  // ─── Cambiar status ─────────────────────────────────────────────────────────
  const updateQuotationStatus = (id, data) => {
    MethodPatch(`/quotation/${id}/status`, data)
      .then((res) => {
        dispatch({ type: UPDATE_QUOTATION_STATUS, payload: res.data.data });
        Swal.fire({
          title: "¡Listo!",
          text: "El status de la cotización fue actualizado.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error al actualizar status:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ??
            "No se pudo actualizar el status.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  // ─── Promover a cliente ─────────────────────────────────────────────────────
  const promoteToCustomer = (id) => {
    MethodPost(`/quotation/${id}/promote-to-customer`)
      .then((res) => {
        dispatch({ type: PROMOTE_TO_CUSTOMER, payload: res.data.data });
        Swal.fire({
          title: "¡Cliente creado!",
          text: "El contratador fue promovido a cliente exitosamente.",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error al promover a cliente:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ?? "No se pudo promover a cliente.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  // ─── Convertir a orden ──────────────────────────────────────────────────────
  const convertToOrder = (id) => {
    MethodPost(`/quotation/${id}/convert-to-order`)
      .then((res) => {
        dispatch({ type: CONVERT_TO_ORDER, payload: res.data.data });
        Swal.fire({
          title: "¡Orden generada!",
          text: `Orden ${res.data.data.orderNumber} creada exitosamente.`,
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error al convertir a orden:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ?? "No se pudo generar la orden.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  return (
    <QoutationContext.Provider
      value={{
        qoutations: state.qoutations,
        quotation: state.quotation,
        customer: state.customer,
        order: state.order,
        getAllQoutationsPending,
        getQuotationById,
        updateQuotationStatus,
        promoteToCustomer,
        convertToOrder,
      }}
    >
      {children}
    </QoutationContext.Provider>
  );
};

export default QuotationState;
