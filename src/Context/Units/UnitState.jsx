import React, { useReducer } from "react";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/Service";
import Swal from "sweetalert2";
import UnitsContext from "./UnitsContext";
import UnitsReducer from "./UnitsReducer";
import {
  GET_ALL_UNITS,
  CREATE_UNIT,
  UPDATE_UNIT,
  DELETE_UNIT,
} from "../../types";

const UnitsState = ({ children }) => {
  const initialState = {
    units: [],
    ErrorsApi: [],
  };

  const [state, dispatch] = useReducer(UnitsReducer, initialState);

  const getAllUnits = () => {
    MethodGet("/unit-types")
      .then((res) => {
        dispatch({ type: GET_ALL_UNITS, payload: res.data.data });
      })
      .catch((error) => {
        console.error("Error al obtener unidades:", error);
      });
  };

  const storeUnits = (data, onSuccess) => {
    MethodPost("/unit-types", data)
      .then((res) => {
        dispatch({ type: CREATE_UNIT, payload: res.data.data });
        Swal.fire({
          title: "¡Éxito!",
          text: "Unidad creada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess?.();
      })
      .catch((error) => {
        console.error("Error al crear unidad:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message ?? "No se pudo crear la unidad.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  const updateUnits = (id, data, onSuccess) => {
    MethodPut(`/unit-types/${id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_UNIT, payload: res.data.data });
        Swal.fire({
          title: "¡Actualizado!",
          text: "Unidad actualizada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess?.();
      })
      .catch((error) => {
        console.error("Error al actualizar unidad:", error);
        Swal.fire({
          title: "Error",
          text:
            error?.response?.data?.message ??
            "No se pudo actualizar la unidad.",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      });
  };

  const deleteUnits = (id) => {
    Swal.fire({
      title: "¿Eliminar unidad?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (!result.isConfirmed) return;
      MethodDelete(`/unit-types/${id}`)
        .then(() => {
          dispatch({ type: DELETE_UNIT, payload: id });
          Swal.fire({
            title: "Eliminada",
            text: "La unidad fue eliminada.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text:
              error?.response?.data?.message ??
              "No se pudo eliminar la unidad.",
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
        });
    });
  };

  return (
    <UnitsContext.Provider
      value={{
        units: state.units,
        getAllUnits,
        storeUnits,
        updateUnits,
        deleteUnits,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
};

export default UnitsState;
