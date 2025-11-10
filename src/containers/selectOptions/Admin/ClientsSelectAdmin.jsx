import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
import ClientsContext from "../../../Context/Clients/ClientsContext";
const ClientsSelectAdmin = (props) => {
  const { clients, allClients } = useContext(ClientsContext);
  useEffect(() => {
    allClients(props.branch_id);
  }, [props.branch_id]);
  const detectarCambiosClientAdmin = (value) => {
    props.detectarCambiosClientAdmin(value);
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
      <Typography textAlign={"start"}>Selecciona un cliente</Typography>
      <Select
        onChange={detectarCambiosClientAdmin}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Selecciona un cliente'
        options={
          clients
            ? clients.map((option) => ({
                label: `${option.name}  ${option.lastname} - ${option.phone}`,
                value: `${option.id}`,
              }))
            : null
        }
      />
    </>
  );
};

export default ClientsSelectAdmin;
