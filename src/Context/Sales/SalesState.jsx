import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SalesContext from "./SalesContext";
import SalesReducer from "./SalesReducer";
import { GET_ALL_SALES, GET_ONE_SALE, STORE_SALE } from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const SalesState = ({ children }) => {
  const initialState = {
    sales: [],
    ErrorsApi: [],
    sale: {},
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(SalesReducer, initialState);

  const getOneSale = (id) => {
    let url = `/sales/${id}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ONE_SALE,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(
          error,
          "ocurrio un error al obtener la informacion de la venta"
        );
      });
  };

  const getAllSales = () => {
    let url = "/sales";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_SALES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las ventas");
      });
  };

  const storeSale = (data) => {
    let url = "/sales";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_SALE,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La venta se ha creado de forma correcta",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/ventas");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la venta");
      });
  };

  const downloadTicketSale = async (id) => {
    let timerInterval;

    Swal.fire({
      title: "Generando PDF...",
      html: "Por favor espera mientras se genera el ticket.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const url = `/sales/${id}/ticket`;
      const res = await clienteAxios.get(url, { responseType: "blob" });

      fileDownload(res.data, `Ticket_venta_#${id}.pdf`);

      Swal.fire({
        title: "Descargado correctamente",
        text: "El ticket se descargó exitosamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al generar o descargar el ticket.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <SalesContext.Provider
      value={{
        sales: state.sales,
        sale: state.sale,
        getAllSales,
        storeSale,
        getOneSale,
        downloadTicketSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesState;
