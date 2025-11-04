import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DeparturesReducer from "./DeparturesReducer";
import DeparturesContext from "./DeparturesContext";
import { GET_ALL_DEPARTURES, STORE_NEW_DEPARTURE } from "../../types";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const DeparturesState = ({ children }) => {
  const initialState = {
    departures: [],
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
  const [state, dispatch] = useReducer(DeparturesReducer, initialState);

  const getAlldepartures = (page, rowsPerPage) => {
    let url = `/departures?page=${page}&rowsPerPage=${rowsPerPage}`;
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_DEPARTURES,
          payload: {
            data: res.data.departures.data,
            total: res.data.departures.total,
            page: res.data.departures.current_page,
            perPage: res.data.departures.per_page,
            next_page_url: res.data.departures.next_page_url,
            prev_page_url: res.data.departures.prev_page_url,
            lastPage: res.data.departures.last_page,
            currentPage: res.data.departures.current_page,
          },
        });
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al obtener las salidas");
      });
  };

  const storeDeparture = (data) => {
    let url = "/departures";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: STORE_NEW_DEPARTURE,
          payload: res.data,
        });
        Swal.fire({
          title: "Exito",
          text: "La salida se ha creado de manera exitosa",
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        if (res.status === 201) {
          history("/salidas");
        }
      })
      .catch((error) => {
        console.log(error, "ocurrio un error al crear la salida");
      });
  };

  const downloadTicketDeparture = async (id) => {
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
      const url = `/departures/${id}/pdf`;
      const res = await clienteAxios.get(url, { responseType: "blob" });

      fileDownload(res.data, `Reporte_salida_#${id}.pdf`);

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
    <DeparturesContext.Provider
      value={{
        departures: state.departures,
        total: state.total,
        perPage: state.perPage,
        page: state.page,
        lastPage: state.lastPage,
        currentPage: state.currentPage,
        next_page_url: state.next_page_url,
        prev_page_url: state.prev_page_url,
        getAlldepartures,
        storeDeparture,
        downloadTicketDeparture,
      }}
    >
      {children}
    </DeparturesContext.Provider>
  );
};

export default DeparturesState;
