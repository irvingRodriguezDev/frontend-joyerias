import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
const OperatorSelect = (props) => {
  const operators = [
    {
      value: "*",
      name: "*",
    },
    {
      value: "+",
      name: "+",
    },
  ];
  const detectarCambiosOperator = (value) => {
    props.detectarCambiosOperator(value);
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
      <Typography textAlign={"start"}>Selecciona un operador</Typography>
      <Select
        onChange={detectarCambiosOperator}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona un operador'
        options={
          operators
            ? operators.map((option) => ({
                label: `${option.name}`,
                value: `${option.value}`,
              }))
            : null
        }
      />
    </>
  );
};

export default OperatorSelect;
