import React, { useReducer } from "react";
import MethodGet, { MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SalesContext from "./SalesContext";
import SalesReducer from "./SalesReducer";
import {
  GET_ALL_SALES,
  GET_ONE_SALE,
  SALES_FOR_ADMIN,
  STORE_SALE,
  STORE_SALE_BY_ADMIN,
  TOTAL_VENTAS_DIA,
} from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const SalesState = ({ children }) => {
  const initialState = {
    sales: [],
    ErrorsApi: [],
    sale: {},
    total: 0,
    page: 0,
    perPage: 0,
    lastPage: 0,
    currentPage: 0,
    next_page_url: null,
    prev_page_url: null,
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

  const getAllSales = (page, rowsPerPage) => {
    let url = `/sales?page=${page}&limit=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_SALES,
          payload: {
            data: res.data.sales.data,
            total: res.data.sales.total,
            page: res.data.sales.current_page,
            perPage: res.data.sales.per_page,
            next_page_url: res.data.sales.next_page_url,
            prev_page_url: res.data.sales.prev_page_url,
            lastPage: res.data.sales.last_page,
            currentPage: res.data.sales.current_page,
          },
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
          localStorage.removeItem("productsSale");
          history("/ventas");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la venta");
      });
  };

  const storeSaleByAdmin = (data) => {
    let url = "/admin/sales";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_SALE_BY_ADMIN,
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
          localStorage.removeItem("productsSale");
          history(`/ventas-sucursal/${data.branch_id}`);
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la venta con el admin");
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

  const indexForAdmin = (id, page, limit) => {
    console.log(id, "los datos");

    let url = `/admin/sales?page=${page}&limit=${limit}`;
    MethodGet(url, id)
      .then((res) => {
        dispatch({
          type: SALES_FOR_ADMIN,
          payload: {
            data: res.data.sales.data,
            total: res.data.sales.total,
            page: res.data.sales.current_page,
            perPage: res.data.sales.per_page,
            next_page_url: res.data.sales.next_page_url,
            prev_page_url: res.data.sales.prev_page_url,
            lastPage: res.data.sales.last_page,
            currentPage: res.data.sales.current_page,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SalesContext.Provider
      value={{
        sales: state.sales,
        sale: state.sale,
        total: state.total,
        perPage: state.perPage,
        page: state.page,
        lastPage: state.lastPage,
        currentPage: state.currentPage,
        next_page_url: state.next_page_url,
        prev_page_url: state.prev_page_url,
        getAllSales,
        storeSale,
        getOneSale,
        downloadTicketSale,
        indexForAdmin,
        storeSaleByAdmin,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesState;
