import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
const StatusSelect = (props) => {
  const status = [
    { name: "Vendido", value: 1 },
    { name: "Existente", value: 2 },
    {
      name: "Traspaso",
      value: 3,
    },
    {
      name: "Faltante",
      value: 4,
    },
    {
      name: "Dañado",
      value: 5,
    },
    {
      name: "Salida",
      value: 6,
    },
  ];
  const detectarCambiosStatus = (value) => {
    props.detectarCambiosStatus(value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#06121e" : "#06121e",
      boxShadow: state.isFocused ? "0 0 0 1px #06121e" : "none",
      "&:hover": {
        borderColor: "#06121e",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#06121e", // color del placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // texto seleccionado
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#06121e" : "#06121e",
      "&:hover": {
        color: "#06121e",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#06121e"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "#06121e" : "#f5f5f5",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  return (
    <>
      <Typography textAlign={"start"}>Selecciona un Status</Typography>
      <Select
        onChange={detectarCambiosStatus}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona una sucursal'
        options={
          status
            ? status.map((option) => ({
                label: `${option.name}`,
                value: `${option.value}`,
              }))
            : null
        }
      />
    </>
  );
};

export default StatusSelect;
