import React, { useReducer } from "react";
import MethodGet, { MethodDelete, MethodPost } from "../../config/Service";
import {
  DELETE_LINE,
  GET_ALL_LINES,
  REPORT_BOXCUT_DAYLY,
  REPORT_BOXCUT_RANGE,
  REPORT_INVENTORY_PDF,
  REPORT_SALES_GRAL,
  STORE_LINE,
} from "../../types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReportsReducer from "./ReportsReducer";
import ReportsContext from "./ReportsContext";
import fileDownload from "js-file-download";
import clienteAxios from "../../config/Axios";
const ReportsState = ({ children }) => {
  const initialState = {
    ErrorsApi: [],
  };
  const history = useNavigate();
  const [state, dispatch] = useReducer(ReportsReducer, initialState);

  const downloadReportInventory = (datos) => {
    let url = "/reports/inventory";
    clienteAxios
      .post(url, datos, { responseType: "blob" })
      .then((res) => {
        dispatch({
          type: REPORT_INVENTORY_PDF,
          payload: res.data,
        });
        fileDownload(res.data, "ReporteInventario.pdf");
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
      });
  };

  const donwloadReportSales = (datos) => {
    let url = "/reports/sales-range";
    clienteAxios
      .post(url, datos, { responseType: "blob" })
      .then((res) => {
        dispatch({
          type: REPORT_SALES_GRAL,
          payload: res.data,
        });
        fileDownload(res.data, "Reporte_ventas.pdf");
      })
      .catch((error) => {
        console.log(error, "hubo un error");
      });
  };

  const downloadReportBoxCutRange = (datos) => {
    let url = "/reports/cashcut/range";
    clienteAxios
      .post(url, datos, { responseType: "blob" })
      .then((res) => {
        dispatch({
          type: REPORT_BOXCUT_RANGE,
          payload: res.data,
        });
        fileDownload(res.data, "corte_caja_fechas.pdf");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadReportBoxCutDayli = (datos) => {
    console.log(datos, "corte diario");

    let url = "/reports/cashcut/daily-ticket";
    clienteAxios
      .post(url, datos, { responseType: "blob" })
      .then((res) => {
        dispatch({
          type: REPORT_BOXCUT_DAYLY,
          payload: res.data,
        });
        fileDownload(res.data, "Corte_diario.pdf");
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
      });
  };

  return (
    <ReportsContext.Provider
      value={{
        ErrorsApi: state.ErrorsApi,
        downloadReportInventory,
        donwloadReportSales,
        downloadReportBoxCutDayli,
        downloadReportBoxCutRange,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsState;
